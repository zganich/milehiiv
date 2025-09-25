import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  validationErrorResponse,
  validateRequiredFields,
  validateEmail
} from '@/lib/api-utils'
import { getUserByEmail, verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['email', 'password']
    const missingFields = validateRequiredFields(body, requiredFields)
    
    if (missingFields.length > 0) {
      return validationErrorResponse({ 
        fields: missingFields 
      })
    }
    
    const { email, password } = body
    
    // Validate email format
    if (!validateEmail(email)) {
      return errorResponse('Invalid email format', 400)
    }
    
    // Get user from database
    const user = await getUserByEmail(email)
    if (!user) {
      return errorResponse('Invalid email or password', 401)
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return errorResponse('Invalid email or password', 401)
    }
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    })
    
    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at
      },
      token
    }, 'Login successful')
    
  } catch (error: unknown) {
    console.error('Login error:', error)
    return errorResponse('Login failed', 500)
  }
}
