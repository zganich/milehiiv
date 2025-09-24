import { NextRequest, NextResponse } from 'next/server'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Success response helper
export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message
  })
}

// Error response helper
export function errorResponse(error: string, status: number = 400): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error
  }, { status })
}

// Validation error response
export function validationErrorResponse(errors: Record<string, string[]>): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: 'Validation failed',
    data: { errors }
  }, { status: 422 })
}

// Unauthorized response
export function unauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: 'Unauthorized'
  }, { status: 401 })
}

// Not found response
export function notFoundResponse(message: string = 'Resource not found'): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error: message
  }, { status: 404 })
}

// Server error response
export function serverErrorResponse(error: string = 'Internal server error'): NextResponse<ApiResponse> {
  return NextResponse.json({
    success: false,
    error
  }, { status: 500 })
}

// Extract user from request
export function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  try {
    const jwt = require('jsonwebtoken')
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name
    }
  } catch (error) {
    return null
  }
}

// Validate required fields
export function validateRequiredFields(data: any, requiredFields: string[]): string[] {
  const errors: string[] = []
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`${field} is required`)
    }
  }
  
  return errors
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
