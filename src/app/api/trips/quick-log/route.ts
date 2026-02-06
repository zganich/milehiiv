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
 * Quick Log API
 * Allows drivers to quickly log total miles for a day with minimal input
 * 
 * Use cases:
 * - "I drove 45 miles today"
 * - "Log 30 business miles for yesterday"
 * - End-of-day quick entry
 */

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    const body = await request.json()
    const { 
      miles, 
      date, 
      business = true, 
      platform,
      notes 
    } = body

    // Validate miles
    if (miles === undefined || miles === null) {
      return errorResponse('Miles is required', 400)
    }

    const numMiles = parseFloat(miles)
    if (isNaN(numMiles) || numMiles < 0) {
      return errorResponse('Miles must be a positive number', 400)
    }

    if (numMiles > 1000) {
      return errorResponse('Miles seems too high. Please check and try again.', 400)
    }

    // Validate/default date
    let tripDate = date
    if (!tripDate) {
      tripDate = new Date().toISOString().split('T')[0]
    } else {
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(tripDate)) {
        return errorResponse('Date must be in YYYY-MM-DD format', 400)
      }
    }

    // Create trip record
    const tripData = {
      user_id: user.id,
      date: tripDate,
      start_mileage: 0,
      end_mileage: Math.round(numMiles),
      business: business,
      location: platform ? `${platform} - Quick Log` : 'Quick Log',
      notes: notes || `Quick logged ${numMiles} miles`
    }

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert([tripData])
      .select()
      .single()

    if (tripError) {
      console.error('Trip creation error:', tripError)
      return serverErrorResponse('Failed to log trip')
    }

    // Get updated stats for the day
    const { data: dayTrips } = await supabase
      .from('trips')
      .select('end_mileage, business')
      .eq('user_id', user.id)
      .eq('date', tripDate)

    const dayStats = {
      totalMiles: dayTrips?.reduce((sum, t) => sum + (t.end_mileage || 0), 0) || numMiles,
      businessMiles: dayTrips?.filter(t => t.business).reduce((sum, t) => sum + (t.end_mileage || 0), 0) || (business ? numMiles : 0),
      tripCount: dayTrips?.length || 1
    }

    return successResponse({
      trip_id: trip.id,
      date: tripDate,
      miles: numMiles,
      business,
      dayStats
    }, `Logged ${numMiles} miles for ${tripDate}`)

  } catch (error: unknown) {
    console.error('Quick log error:', error)
    return serverErrorResponse('Failed to log trip')
  }
}

/**
 * GET - Get quick log suggestions based on recent activity
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    // Get recent trips to calculate averages
    const { data: recentTrips } = await supabase
      .from('trips')
      .select('date, end_mileage, business')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(30)

    if (!recentTrips || recentTrips.length === 0) {
      return successResponse({
        suggestions: {
          averageDailyMiles: 50, // Default suggestion
          averageBusinessMiles: 40,
          recentDays: 0
        }
      })
    }

    // Calculate averages
    const uniqueDates = new Set(recentTrips.map(t => t.date))
    const totalMiles = recentTrips.reduce((sum, t) => sum + (t.end_mileage || 0), 0)
    const businessMiles = recentTrips
      .filter(t => t.business)
      .reduce((sum, t) => sum + (t.end_mileage || 0), 0)

    const avgDaily = Math.round(totalMiles / uniqueDates.size)
    const avgBusiness = Math.round(businessMiles / uniqueDates.size)

    // Check if today already has trips
    const today = new Date().toISOString().split('T')[0]
    const todayTrips = recentTrips.filter(t => t.date === today)
    const todayMiles = todayTrips.reduce((sum, t) => sum + (t.end_mileage || 0), 0)

    return successResponse({
      suggestions: {
        averageDailyMiles: avgDaily,
        averageBusinessMiles: avgBusiness,
        recentDays: uniqueDates.size,
        todayMiles,
        todayTrips: todayTrips.length
      }
    })

  } catch (error: unknown) {
    console.error('Quick log suggestions error:', error)
    return serverErrorResponse('Failed to get suggestions')
  }
}
