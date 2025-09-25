import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get user from token
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    const body = await request.json()
    const { actual_miles, notes } = body
    
    // Validate actual_miles if provided
    if (actual_miles !== undefined && actual_miles < 0) {
      return errorResponse('Actual miles must be positive', 400)
    }
    
    // Update gap as resolved
    const { data: gap, error } = await supabase
      .from('gaps')
      .update({
        resolved: true,
        ...(actual_miles !== undefined && { actual_miles }),
        ...(notes && { notes })
      })
      .eq('id', (await params).id)
      .eq('user_id', user.id)
      .select()
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFoundResponse('Gap not found')
      }
      console.error('Resolve gap error:', error)
      return errorResponse('Failed to resolve gap', 500)
    }
    
    return successResponse(gap, 'Gap resolved successfully')
    
  } catch (error: unknown) {
    console.error('Resolve gap error:', error)
    return errorResponse('Failed to resolve gap', 500)
  }
}
