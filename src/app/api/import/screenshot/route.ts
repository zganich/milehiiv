import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  serverErrorResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'
import { parseScreenshot, validateExtraction } from '@/lib/parsers/screenshot-ocr'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    // Check for OpenAI API key
    const openaiKey = process.env.OPENAI_API_KEY
    if (!openaiKey) {
      return errorResponse('Screenshot OCR is not configured. Please add OPENAI_API_KEY.', 503)
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return errorResponse('No file provided', 400)
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return errorResponse('Only image files (JPEG, PNG, WebP, GIF) are allowed', 400)
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`, 400)
    }

    // Convert to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Parse with AI Vision
    const rawResult = await parseScreenshot(dataUrl, openaiKey, 'gpt-4o')
    
    if (!rawResult.success) {
      return errorResponse(rawResult.error || 'Failed to parse screenshot', 400)
    }

    // Validate and clean
    const result = validateExtraction(rawResult)

    // Create upload record
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .insert([{
        user_id: user.id,
        filename: file.name,
        file_size: file.size,
        status: 'completed',
        processed_at: new Date().toISOString(),
        trips_extracted: result.trips.length
      }])
      .select()
      .single()

    if (uploadError) {
      console.error('Upload record error:', uploadError)
    }

    // Save trips to database
    if (result.trips.length > 0) {
      const tripsToInsert = result.trips.map(trip => ({
        user_id: user.id,
        date: trip.date || result.date || new Date().toISOString().split('T')[0],
        start_mileage: 0,
        end_mileage: Math.round(trip.miles || 0),
        business: true,
        location: [trip.pickupLocation, trip.dropoffLocation].filter(Boolean).join(' → ') || 
                  `${result.platform || 'Gig'} trip`,
        notes: `Extracted from screenshot. Platform: ${result.platform || 'Unknown'}. Earnings: $${trip.earnings || 0}`
      }))

      const { error: insertError } = await supabase
        .from('trips')
        .insert(tripsToInsert)

      if (insertError) {
        console.error('Trips insert error:', insertError)
      }
    }

    return successResponse({
      upload_id: upload?.id,
      filename: file.name,
      platform: result.platform,
      date: result.date,
      totalMiles: result.totalMiles,
      totalEarnings: result.totalEarnings,
      tripsExtracted: result.trips.length,
      trips: result.trips,
      rawText: result.rawText
    }, 'Screenshot parsed successfully')

  } catch (error: unknown) {
    console.error('Screenshot parse error:', error)
    return serverErrorResponse('Failed to parse screenshot')
  }
}
