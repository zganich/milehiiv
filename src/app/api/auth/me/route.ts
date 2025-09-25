import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { getUserById } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get user from token
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    // Get full user data from database
    const userData = await getUserById(user.id)
    
    return successResponse({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      created_at: userData.created_at,
      updated_at: userData.updated_at
    })
    
  } catch (error: unknown) {
    console.error('Get user error:', error)
    return errorResponse('Failed to get user data', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get user from token
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    const body = await request.json()
    const { name, email } = body
    
    // Validate input
    if (!name || name.trim() === '') {
      return errorResponse('Name is required', 400)
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errorResponse('Invalid email format', 400)
    }
    
    // Update user
    const updatedUser = await updateUser(user.id, {
      name: name.trim(),
      email: email?.trim()
    })
    
    return successResponse({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      updated_at: updatedUser.updated_at
    }, 'Profile updated successfully')
    
  } catch (error: unknown) {
    console.error('Update user error:', error)
    return errorResponse('Failed to update profile', 500)
  }
}

// Import updateUser from auth module
import { updateUser } from '@/lib/auth'
