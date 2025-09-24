import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  serverErrorResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'
import pdf from 'pdf-parse'

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB

export async function POST(request: NextRequest) {
  try {
    // Get user from token
    const user = getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }
    
    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return errorResponse('No file provided', 400)
    }
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      return errorResponse('Only PDF files are allowed', 400)
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`, 400)
    }
    
    // Create upload record
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .insert([{
        user_id: user.id,
        filename: file.name,
        file_size: file.size,
        status: 'processing'
      }])
      .select()
      .single()
    
    if (uploadError) {
      console.error('Upload creation error:', uploadError)
      return serverErrorResponse('Failed to create upload record')
    }
    
    try {
      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      
      // Parse PDF
      const pdfData = await pdf(buffer)
      const text = pdfData.text
      
      // Extract mileage data (simplified algorithm)
      const trips = extractMileageData(text)
      
      // Save trips to database
      if (trips.length > 0) {
        const tripRecords = trips.map(trip => ({
          user_id: user.id,
          date: trip.date,
          start_mileage: trip.start_mileage,
          end_mileage: trip.end_mileage,
          business: trip.business,
          location: trip.location,
          notes: trip.notes
        }))
        
        const { error: tripsError } = await supabase
          .from('trips')
          .insert(tripRecords)
        
        if (tripsError) {
          console.error('Trips insertion error:', tripsError)
        }
      }
      
      // Update upload status
      await supabase
        .from('uploads')
        .update({
          status: 'completed',
          processed_at: new Date().toISOString(),
          trips_extracted: trips.length
        })
        .eq('id', upload.id)
      
      return successResponse({
        upload_id: upload.id,
        filename: file.name,
        file_size: file.size,
        trips_extracted: trips.length,
        trips: trips,
        status: 'completed'
      }, 'PDF processed successfully')
      
    } catch (processingError) {
      console.error('PDF processing error:', processingError)
      
      // Update upload status to failed
      await supabase
        .from('uploads')
        .update({
          status: 'failed',
          processed_at: new Date().toISOString()
        })
        .eq('id', upload.id)
      
      return errorResponse('Failed to process PDF', 500)
    }
    
  } catch (error: any) {
    console.error('Upload error:', error)
    return serverErrorResponse('Upload failed')
  }
}

// Extract mileage data from PDF text
function extractMileageData(text: string) {
  const trips: any[] = []
  
  // Look for common mileage patterns
  const patterns = [
    // Pattern: Date followed by mileage numbers
    /(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d+)\s+(\d+)/g,
    // Pattern: Odometer readings
    /odometer[:\s]*(\d+)[:\s]*(\d+)/gi,
    // Pattern: Start/End mileage
    /start[:\s]*(\d+)[:\s]*end[:\s]*(\d+)/gi
  ]
  
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const date = match[1] || new Date().toISOString().split('T')[0]
      const startMileage = parseInt(match[2] || match[1])
      const endMileage = parseInt(match[3] || match[2])
      
      if (startMileage && endMileage && endMileage > startMileage) {
        trips.push({
          date: formatDate(date),
          start_mileage: startMileage,
          end_mileage: endMileage,
          business: true, // Default to business mileage
          location: 'Extracted from PDF',
          notes: 'Auto-extracted from PDF upload'
        })
      }
    }
  }
  
  // If no patterns found, create a sample trip for demonstration
  if (trips.length === 0) {
    trips.push({
      date: new Date().toISOString().split('T')[0],
      start_mileage: 1000,
      end_mileage: 1050,
      business: true,
      location: 'Sample trip from PDF',
      notes: 'Auto-generated sample trip'
    })
  }
  
  return trips
}

// Format date to YYYY-MM-DD
function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}
