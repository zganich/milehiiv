import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  validationErrorResponse,
  validateRequiredFields
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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const business = searchParams.get('business')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    
    // Build query
    let query = supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
    
    // Apply filters
    if (business !== null) {
      query = query.eq('business', business === 'true')
    }
    
    if (startDate) {
      query = query.gte('date', startDate)
    }
    
    if (endDate) {
      query = query.lte('date', endDate)
    }
    
    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)
    
    const { data: trips, error } = await query
    
    if (error) {
      console.error('Get trips error:', error)
      return errorResponse('Failed to fetch trips', 500)
    }
    
    return successResponse({
      trips,
      pagination: {
        page,
        limit,
        total: trips?.length || 0
      }
    })
    
  } catch (error: any) {
    console.error('Get trips error:', error)
    return errorResponse('Failed to fetch trips', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['date', 'start_mileage', 'end_mileage']
    const missingFields = validateRequiredFields(body, requiredFields)
    
    if (missingFields.length > 0) {
      return validationErrorResponse({ 
        fields: missingFields 
      })
    }
    
    const { date, start_mileage, end_mileage, business = true, location, notes } = body
    
    // Validate mileage values
    if (start_mileage < 0 || end_mileage < 0) {
      return errorResponse('Mileage values must be positive', 400)
    }
    
    if (end_mileage < start_mileage) {
      return errorResponse('End mileage must be greater than or equal to start mileage', 400)
    }
    
    // Create trip
    const { data: trip, error } = await supabase
      .from('trips')
      .insert([{
        user_id: user.id,
        date,
        start_mileage,
        end_mileage,
        business,
        location,
        notes
      }])
      .select()
      .single()
    
    if (error) {
      console.error('Create trip error:', error)
      return errorResponse('Failed to create trip', 500)
    }
    
    return successResponse(trip, 'Trip created successfully')
    
  } catch (error: any) {
    console.error('Create trip error:', error)
    return errorResponse('Failed to create trip', 500)
  }
}
