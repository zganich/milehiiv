import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  serverErrorResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'

/**
 * Deadhead Miles Calculator
 * 
 * Deadhead = Total driving miles - Gig platform reported miles
 * 
 * This is the key tax optimization feature:
 * - Gig companies only report paid trip miles
 * - But drivers can deduct ALL business driving
 * - Deadhead (unpaid miles) can be 30-50% of total driving
 * 
 * IRS rate 2024: $0.67/mile
 * Example: 8,000 deadhead miles = $5,360 extra deductions
 */

interface DailyMileage {
  date: string;
  totalMiles: number;      // From Google Timeline or manual
  gigMiles: number;        // From gig platform imports
  deadheadMiles: number;   // Calculated: total - gig
  tripCount: number;
  sources: string[];
}

interface DeadheadSummary {
  totalDays: number;
  totalMiles: number;
  totalGigMiles: number;
  totalDeadheadMiles: number;
  deadheadPercentage: number;
  estimatedDeduction: number; // At IRS rate
  dailyBreakdown: DailyMileage[];
}

const IRS_RATE_2024 = 0.67; // dollars per mile

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const year = searchParams.get('year')

    // Build date filters
    let dateFilter: { start: string; end: string }
    
    if (year) {
      dateFilter = {
        start: `${year}-01-01`,
        end: `${year}-12-31`
      }
    } else if (startDate && endDate) {
      dateFilter = { start: startDate, end: endDate }
    } else {
      // Default to current year
      const currentYear = new Date().getFullYear()
      dateFilter = {
        start: `${currentYear}-01-01`,
        end: `${currentYear}-12-31`
      }
    }

    // Get all trips for the user in date range
    const { data: trips, error: tripsError } = await supabase
      .from('trips')
      .select('date, end_mileage, business, location, notes')
      .eq('user_id', user.id)
      .eq('business', true)
      .gte('date', dateFilter.start)
      .lte('date', dateFilter.end)
      .order('date', { ascending: true })

    if (tripsError) {
      console.error('Trips fetch error:', tripsError)
      return serverErrorResponse('Failed to fetch trip data')
    }

    if (!trips || trips.length === 0) {
      return successResponse({
        summary: {
          totalDays: 0,
          totalMiles: 0,
          totalGigMiles: 0,
          totalDeadheadMiles: 0,
          deadheadPercentage: 0,
          estimatedDeduction: 0,
          dailyBreakdown: []
        },
        dateRange: dateFilter,
        message: 'No trip data found for this period'
      })
    }

    // Group by date and calculate
    const byDate = new Map<string, {
      totalMiles: number;
      gigMiles: number;
      tripCount: number;
      sources: Set<string>;
    }>()

    for (const trip of trips) {
      const existing = byDate.get(trip.date) || {
        totalMiles: 0,
        gigMiles: 0,
        tripCount: 0,
        sources: new Set<string>()
      }

      const miles = trip.end_mileage || 0
      const isGigTrip = isGigPlatformTrip(trip.location, trip.notes)
      const isTimelineTrip = isGoogleTimelineTrip(trip.location, trip.notes)

      if (isTimelineTrip) {
        // Timeline trips are total driving
        existing.totalMiles += miles
        existing.sources.add('timeline')
      } else if (isGigTrip) {
        // Gig platform trips
        existing.gigMiles += miles
        existing.sources.add(getGigPlatform(trip.location, trip.notes))
      } else {
        // Manual entries - count as total
        existing.totalMiles += miles
        existing.sources.add('manual')
      }

      existing.tripCount++
      byDate.set(trip.date, existing)
    }

    // Calculate deadhead for each day
    const dailyBreakdown: DailyMileage[] = []
    let totalMiles = 0
    let totalGigMiles = 0
    let totalDeadheadMiles = 0

    for (const [date, data] of byDate) {
      // If we have both timeline and gig data, calculate deadhead
      // If we only have gig data, deadhead is unknown (0)
      // If we only have timeline/manual, all is potential deadhead
      
      let deadhead = 0
      let effectiveTotal = data.totalMiles

      if (data.totalMiles > 0 && data.gigMiles > 0) {
        // We have both - can calculate real deadhead
        deadhead = Math.max(0, data.totalMiles - data.gigMiles)
      } else if (data.totalMiles > 0 && data.gigMiles === 0) {
        // Only timeline/manual - might all be deadhead or might not have gig data
        // Conservative: don't count as deadhead unless we have gig comparison
        deadhead = 0
        effectiveTotal = data.totalMiles
      } else if (data.gigMiles > 0 && data.totalMiles === 0) {
        // Only gig data - we know gig miles but not total
        effectiveTotal = data.gigMiles
        deadhead = 0 // Can't calculate without total
      }

      const dayTotal = Math.max(effectiveTotal, data.gigMiles)
      
      dailyBreakdown.push({
        date,
        totalMiles: Math.round(dayTotal * 10) / 10,
        gigMiles: Math.round(data.gigMiles * 10) / 10,
        deadheadMiles: Math.round(deadhead * 10) / 10,
        tripCount: data.tripCount,
        sources: Array.from(data.sources)
      })

      totalMiles += dayTotal
      totalGigMiles += data.gigMiles
      totalDeadheadMiles += deadhead
    }

    // Sort by date
    dailyBreakdown.sort((a, b) => a.date.localeCompare(b.date))

    const deadheadPercentage = totalMiles > 0 
      ? Math.round((totalDeadheadMiles / totalMiles) * 1000) / 10 
      : 0

    const summary: DeadheadSummary = {
      totalDays: dailyBreakdown.length,
      totalMiles: Math.round(totalMiles * 10) / 10,
      totalGigMiles: Math.round(totalGigMiles * 10) / 10,
      totalDeadheadMiles: Math.round(totalDeadheadMiles * 10) / 10,
      deadheadPercentage,
      estimatedDeduction: Math.round(totalDeadheadMiles * IRS_RATE_2024 * 100) / 100,
      dailyBreakdown
    }

    return successResponse({
      summary,
      dateRange: dateFilter,
      irsRate: IRS_RATE_2024,
      tips: getDeadheadTips(summary)
    })

  } catch (error: unknown) {
    console.error('Deadhead calculation error:', error)
    return serverErrorResponse('Failed to calculate deadhead miles')
  }
}

function isGigPlatformTrip(location?: string | null, notes?: string | null): boolean {
  const text = `${location || ''} ${notes || ''}`.toLowerCase()
  return text.includes('uber') || 
         text.includes('lyft') || 
         text.includes('doordash') ||
         text.includes('instacart') ||
         text.includes('grubhub') ||
         text.includes('amazon flex') ||
         text.includes('spark') ||
         text.includes('imported from') ||
         text.includes('extracted from')
}

function isGoogleTimelineTrip(location?: string | null, notes?: string | null): boolean {
  const text = `${location || ''} ${notes || ''}`.toLowerCase()
  return text.includes('timeline') || text.includes('google')
}

function getGigPlatform(location?: string | null, notes?: string | null): string {
  const text = `${location || ''} ${notes || ''}`.toLowerCase()
  if (text.includes('uber')) return 'uber'
  if (text.includes('lyft')) return 'lyft'
  if (text.includes('doordash')) return 'doordash'
  if (text.includes('instacart')) return 'instacart'
  if (text.includes('grubhub')) return 'grubhub'
  if (text.includes('amazon')) return 'amazon_flex'
  if (text.includes('spark')) return 'spark'
  return 'gig'
}

function getDeadheadTips(summary: DeadheadSummary): string[] {
  const tips: string[] = []

  if (summary.totalDeadheadMiles === 0 && summary.totalGigMiles > 0) {
    tips.push('Import your Google Timeline to calculate deadhead miles - this could add 30-50% more deductions!')
  }

  if (summary.deadheadPercentage > 0 && summary.deadheadPercentage < 20) {
    tips.push('Your deadhead percentage seems low. Make sure you\'re importing all your driving, not just gig trips.')
  }

  if (summary.deadheadPercentage > 60) {
    tips.push('High deadhead percentage detected. Double-check that your Google Timeline is accurate and only includes business driving days.')
  }

  if (summary.estimatedDeduction > 1000) {
    tips.push(`You could save ~$${Math.round(summary.estimatedDeduction * 0.25)} in taxes from deadhead miles alone (at 25% bracket)!`)
  }

  if (summary.totalDays < 30) {
    tips.push('Keep tracking! More data = more accurate deadhead calculations.')
  }

  return tips
}
