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
    const resolved = searchParams.get('resolved')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    
    // Build query
    let query = supabase
      .from('gaps')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    
    // Apply filters
    if (resolved !== null) {
      query = query.eq('resolved', resolved === 'true')
    }
    
    if (startDate) {
      query = query.gte('date', startDate)
    }
    
    if (endDate) {
      query = query.lte('date', endDate)
    }
    
    const { data: gaps, error } = await query
    
    if (error) {
      console.error('Get gaps error:', error)
      return errorResponse('Failed to fetch gaps', 500)
    }
    
    return successResponse({ gaps })
    
  } catch (error: any) {
    console.error('Get gaps error:', error)
    return errorResponse('Failed to fetch gaps', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    // Trigger gap detection algorithm
    const gaps = await detectMileageGaps(user.id)
    
    return successResponse({
      gaps_detected: gaps.length,
      gaps
    }, 'Gap detection completed')
    
  } catch (error: any) {
    console.error('Gap detection error:', error)
    return errorResponse('Failed to detect gaps', 500)
  }
}

// Gap detection algorithm
async function detectMileageGaps(userId: string) {
  try {
    // Get all trips for the user, ordered by date
    const { data: trips, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', userId)
      .eq('business', true) // Only business trips
      .order('date', { ascending: true })
    
    if (error || !trips || trips.length === 0) {
      return []
    }
    
    const gaps: any[] = []
    
    // Check for gaps between consecutive trips
    for (let i = 0; i < trips.length - 1; i++) {
      const currentTrip = trips[i]
      const nextTrip = trips[i + 1]
      
      const currentDate = new Date(currentTrip.date)
      const nextDate = new Date(nextTrip.date)
      
      // Calculate days between trips
      const daysBetween = Math.ceil((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
      
      // If there's a gap of more than 1 day, check for missing mileage
      if (daysBetween > 1) {
        const expectedMileage = nextTrip.start_mileage - currentTrip.end_mileage
        const actualDays = daysBetween - 1 // Exclude the trip days themselves
        
        // If there's a significant gap in mileage, create a gap record
        if (expectedMileage > 0 && actualDays > 0) {
          const gapDate = new Date(currentDate)
          gapDate.setDate(gapDate.getDate() + 1) // Next day after current trip
          
          gaps.push({
            user_id: userId,
            date: gapDate.toISOString().split('T')[0],
            expected_miles: Math.floor(expectedMileage / actualDays),
            actual_miles: 0,
            resolved: false
          })
        }
      }
    }
    
    // Save gaps to database
    if (gaps.length > 0) {
      const { error: insertError } = await supabase
        .from('gaps')
        .insert(gaps)
      
      if (insertError) {
        console.error('Gap insertion error:', insertError)
      }
    }
    
    return gaps
    
  } catch (error) {
    console.error('Gap detection algorithm error:', error)
    return []
  }
}
