import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse,
  validationErrorResponse,
  validateRequiredFields
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    const { data: trip, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFoundResponse('Trip not found')
      }
      console.error('Get trip error:', error)
      return errorResponse('Failed to fetch trip', 500)
    }
    
    return successResponse(trip)
    
  } catch (error: any) {
    console.error('Get trip error:', error)
    return errorResponse('Failed to fetch trip', 500)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    const body = await request.json()
    const { date, start_mileage, end_mileage, business, location, notes } = body
    
    // Validate mileage values if provided
    if (start_mileage !== undefined && end_mileage !== undefined) {
      if (start_mileage < 0 || end_mileage < 0) {
        return errorResponse('Mileage values must be positive', 400)
      }
      
      if (end_mileage < start_mileage) {
        return errorResponse('End mileage must be greater than or equal to start mileage', 400)
      }
    }
    
    // Update trip
    const { data: trip, error } = await supabase
      .from('trips')
      .update({
        ...(date && { date }),
        ...(start_mileage !== undefined && { start_mileage }),
        ...(end_mileage !== undefined && { end_mileage }),
        ...(business !== undefined && { business }),
        ...(location !== undefined && { location }),
        ...(notes !== undefined && { notes })
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFoundResponse('Trip not found')
      }
      console.error('Update trip error:', error)
      return errorResponse('Failed to update trip', 500)
    }
    
    return successResponse(trip, 'Trip updated successfully')
    
  } catch (error: any) {
    console.error('Update trip error:', error)
    return errorResponse('Failed to update trip', 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    // Delete trip
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id)
    
    if (error) {
      console.error('Delete trip error:', error)
      return errorResponse('Failed to delete trip', 500)
    }
    
    return successResponse(null, 'Trip deleted successfully')
    
  } catch (error: any) {
    console.error('Delete trip error:', error)
    return errorResponse('Failed to delete trip', 500)
  }
}
