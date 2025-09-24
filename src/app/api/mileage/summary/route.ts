import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    
    // Build date filter
    let dateFilter = ''
    if (startDate && endDate) {
      dateFilter = `AND date BETWEEN '${startDate}' AND '${endDate}'`
    } else if (startDate) {
      dateFilter = `AND date >= '${startDate}'`
    } else if (endDate) {
      dateFilter = `AND date <= '${endDate}'`
    }
    
    // Get business trips summary
    const { data: businessTrips, error: businessError } = await supabase
      .from('trips')
      .select('start_mileage, end_mileage, date')
      .eq('user_id', user.id)
      .eq('business', true)
      .not('date', 'is', null)
    
    if (businessError) {
      console.error('Business trips error:', businessError)
      return errorResponse('Failed to fetch business trips', 500)
    }
    
    // Get personal trips summary
    const { data: personalTrips, error: personalError } = await supabase
      .from('trips')
      .select('start_mileage, end_mileage, date')
      .eq('user_id', user.id)
      .eq('business', false)
      .not('date', 'is', null)
    
    if (personalError) {
      console.error('Personal trips error:', personalError)
      return errorResponse('Failed to fetch personal trips', 500)
    }
    
    // Get unresolved gaps
    const { data: gaps, error: gapsError } = await supabase
      .from('gaps')
      .select('*')
      .eq('user_id', user.id)
      .eq('resolved', false)
    
    if (gapsError) {
      console.error('Gaps error:', gapsError)
      return errorResponse('Failed to fetch gaps', 500)
    }
    
    // Calculate totals
    const businessMiles = calculateTotalMiles(businessTrips || [])
    const personalMiles = calculateTotalMiles(personalTrips || [])
    const totalMiles = businessMiles + personalMiles
    
    // Get trip counts
    const businessTripCount = businessTrips?.length || 0
    const personalTripCount = personalTrips?.length || 0
    const totalTripCount = businessTripCount + personalTripCount
    
    // Calculate average miles per trip
    const avgBusinessMiles = businessTripCount > 0 ? businessMiles / businessTripCount : 0
    const avgPersonalMiles = personalTripCount > 0 ? personalMiles / personalTripCount : 0
    
    // Get date range
    const allTrips = [...(businessTrips || []), ...(personalTrips || [])]
    const dates = allTrips.map(trip => new Date(trip.date)).sort()
    const firstTrip = dates[0]
    const lastTrip = dates[dates.length - 1]
    
    return successResponse({
      summary: {
        total_miles: totalMiles,
        business_miles: businessMiles,
        personal_miles: personalMiles,
        total_trips: totalTripCount,
        business_trips: businessTripCount,
        personal_trips: personalTripCount,
        avg_business_miles: Math.round(avgBusinessMiles),
        avg_personal_miles: Math.round(avgPersonalMiles),
        first_trip_date: firstTrip?.toISOString().split('T')[0] || null,
        last_trip_date: lastTrip?.toISOString().split('T')[0] || null
      },
      gaps: {
        unresolved_count: gaps?.length || 0,
        gaps: gaps || []
      }
    })
    
  } catch (error: any) {
    console.error('Summary error:', error)
    return errorResponse('Failed to generate summary', 500)
  }
}

// Calculate total miles from trips
function calculateTotalMiles(trips: any[]): number {
  return trips.reduce((total, trip) => {
    const miles = trip.end_mileage - trip.start_mileage
    return total + (miles > 0 ? miles : 0)
  }, 0)
}
