import { NextRequest } from 'next/server'
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  serverErrorResponse
} from '@/lib/api-utils'
import { getUserFromRequest } from '@/lib/api-utils'
import { supabase } from '@/lib/supabase'
import { parseGoogleTimeline, aggregateByDate } from '@/lib/parsers/google-timeline'

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB - Timeline files can be large

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return unauthorizedResponse()
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return errorResponse('No file provided', 400)
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`, 400)
    }

    // Read file content
    const content = await file.text()

    // Parse Google Timeline
    const result = parseGoogleTimeline(content)

    if (!result.success) {
      return errorResponse(result.error || 'Failed to parse Google Timeline', 400)
    }

    // Aggregate by date
    const byDate = aggregateByDate(result.segments)

    // Create upload record
    const { data: upload, error: uploadError } = await supabase
      .from('uploads')
      .insert([{
        user_id: user.id,
        filename: file.name,
        file_size: file.size,
        status: 'completed',
        processed_at: new Date().toISOString(),
        trips_extracted: result.segments.length
      }])
      .select()
      .single()

    if (uploadError) {
      console.error('Upload record error:', uploadError)
    }

    // Convert driving segments to trips and save
    const tripsToInsert = result.segments.map(segment => ({
      user_id: user.id,
      date: segment.date,
      start_mileage: 0, // Timeline doesn't have odometer readings
      end_mileage: Math.round(segment.distanceMiles),
      business: true, // Default to business, user can classify later
      location: `Timeline: ${segment.durationMinutes} min drive`,
      notes: `Imported from Google Timeline. Duration: ${segment.durationMinutes} minutes.`
    }))

    // Insert in batches of 100
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

    // Convert byDate map to array for response
    const dailySummary = Array.from(byDate.entries()).map(([date, data]) => ({
      date,
      miles: Math.round(data.miles * 10) / 10,
      minutes: data.minutes,
      trips: data.trips
    })).sort((a, b) => a.date.localeCompare(b.date))

    return successResponse({
      upload_id: upload?.id,
      filename: file.name,
      totalDrivingMiles: result.totalDrivingMiles,
      totalDrivingMinutes: result.totalDrivingMinutes,
      totalSegments: result.segments.length,
      tripsImported: insertedCount,
      dateRange: result.dateRange,
      dailySummary
    }, 'Google Timeline imported successfully')

  } catch (error: unknown) {
    console.error('Timeline import error:', error)
    return serverErrorResponse('Failed to import Google Timeline')
  }
}
