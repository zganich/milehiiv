import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  serverErrorResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'
import { parseUberCSV } from '@/lib/parsers/uber-csv'
import { parseLyftCSV } from '@/lib/parsers/lyft-csv'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

type Platform = 'uber' | 'lyft' | 'auto'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const platform = (formData.get('platform') as Platform) || 'auto'

    if (!file) {
      return errorResponse('No file provided', 400)
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      return errorResponse('Only CSV files are allowed', 400)
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`, 400)
    }

    const content = await file.text()

    // Detect or use specified platform
    let detectedPlatform: 'uber' | 'lyft' = 'uber'
    let result: any

    if (platform === 'auto') {
      // Try to detect from content
      const lowerContent = content.toLowerCase()
      if (lowerContent.includes('lyft') || lowerContent.includes('ride type')) {
        detectedPlatform = 'lyft'
      } else {
        detectedPlatform = 'uber'
      }
    } else {
      detectedPlatform = platform as 'uber' | 'lyft'
    }

    // Parse based on platform
    if (detectedPlatform === 'lyft') {
      result = parseLyftCSV(content)
    } else {
      result = parseUberCSV(content)
    }

    if (!result.success) {
      // Try the other parser as fallback
      const fallbackResult = detectedPlatform === 'uber' 
        ? parseLyftCSV(content) 
        : parseUberCSV(content)
      
      if (fallbackResult.success) {
        result = fallbackResult
        detectedPlatform = detectedPlatform === 'uber' ? 'lyft' : 'uber'
      } else {
        return errorResponse(result.error || 'Failed to parse CSV', 400)
      }
    }

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
      const tripsToInsert = result.trips.map((trip: any) => ({
        user_id: user.id,
        date: trip.date,
        start_mileage: 0,
        end_mileage: Math.round(trip.miles || 0),
        business: true,
        location: [trip.pickupAddress, trip.dropoffAddress].filter(Boolean).join(' → ') ||
                  `${detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)} trip`,
        notes: `Imported from ${detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)} CSV. ` +
               `Duration: ${trip.duration || 0} min. Earnings: $${trip.earnings || 0}`
      }))

      // Insert in batches
      const batchSize = 100
      let insertedCount = 0

      for (let i = 0; i < tripsToInsert.length; i += batchSize) {
        const batch = tripsToInsert.slice(i, i + batchSize)
        const { error: insertError } = await supabase
          .from('trips')
          .insert(batch)

        if (!insertError) {
          insertedCount += batch.length
        } else {
          console.error('Batch insert error:', insertError)
        }
      }

      result.tripsImported = insertedCount
    }

    return successResponse({
      upload_id: upload?.id,
      filename: file.name,
      platform: detectedPlatform,
      totalMiles: result.totalMiles,
      totalEarnings: result.totalEarnings,
      totalTrips: result.totalTrips,
      tripsImported: result.tripsImported || result.trips.length,
      dateRange: result.dateRange,
      trips: result.trips.slice(0, 10) // Return first 10 for preview
    }, `${detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)} CSV imported successfully`)

  } catch (error: unknown) {
    console.error('CSV import error:', error)
    return serverErrorResponse('Failed to import CSV')
  }
}
