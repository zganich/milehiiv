/**
 * Google Timeline Parser
 * Parses Google Takeout Location History JSON to extract all driving segments
 * 
 * User flow:
 * 1. Go to takeout.google.com
 * 2. Select "Location History" 
 * 3. Export as JSON
 * 4. Upload to MileHiiv
 */

export interface DrivingSegment {
  date: string;
  startTime: string;
  endTime: string;
  startLocation: { lat: number; lng: number } | null;
  endLocation: { lat: number; lng: number } | null;
  distanceMeters: number;
  distanceMiles: number;
  durationMinutes: number;
  confidence: string;
}

export interface TimelineParseResult {
  success: boolean;
  totalDrivingMiles: number;
  totalDrivingMinutes: number;
  segments: DrivingSegment[];
  dateRange: { start: string; end: string } | null;
  error?: string;
}

interface GoogleActivitySegment {
  startLocation?: {
    latitudeE7?: number;
    longitudeE7?: number;
  };
  endLocation?: {
    latitudeE7?: number;
    longitudeE7?: number;
  };
  duration?: {
    startTimestamp?: string;
    endTimestamp?: string;
  };
  distance?: number;
  activityType?: string;
  confidence?: string;
}

interface GoogleTimelineObject {
  activitySegment?: GoogleActivitySegment;
}

interface GoogleTimelineExport {
  timelineObjects?: GoogleTimelineObject[];
  // Newer format
  semanticSegments?: any[];
}

const METERS_TO_MILES = 0.000621371;

/**
 * Parse Google Takeout Location History JSON
 */
export function parseGoogleTimeline(jsonContent: string): TimelineParseResult {
  try {
    const data: GoogleTimelineExport = JSON.parse(jsonContent);
    
    // Handle different export formats
    const timelineObjects = data.timelineObjects || [];
    
    if (timelineObjects.length === 0) {
      // Try newer semantic segments format
      if (data.semanticSegments) {
        return parseSemanticSegments(data.semanticSegments);
      }
      return {
        success: false,
        totalDrivingMiles: 0,
        totalDrivingMinutes: 0,
        segments: [],
        dateRange: null,
        error: 'No timeline data found in export. Make sure you exported Location History from Google Takeout.'
      };
    }

    const drivingSegments: DrivingSegment[] = [];
    let totalMeters = 0;
    let totalMinutes = 0;
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    for (const obj of timelineObjects) {
      const segment = obj.activitySegment;
      
      if (!segment) continue;
      
      // Only include driving/vehicle segments
      const activityType = segment.activityType?.toUpperCase() || '';
      const isDriving = [
        'IN_VEHICLE',
        'IN_PASSENGER_VEHICLE', 
        'DRIVING',
        'IN_CAR',
        'IN_TAXI',
        'IN_RIDESHARE'
      ].includes(activityType);
      
      if (!isDriving) continue;
      
      const distance = segment.distance || 0;
      if (distance <= 0) continue;
      
      const startTimestamp = segment.duration?.startTimestamp;
      const endTimestamp = segment.duration?.endTimestamp;
      
      if (!startTimestamp) continue;
      
      const startDate = new Date(startTimestamp);
      const endDate = endTimestamp ? new Date(endTimestamp) : startDate;
      
      // Track date range
      if (!minDate || startDate < minDate) minDate = startDate;
      if (!maxDate || endDate > maxDate) maxDate = endDate;
      
      const durationMs = endDate.getTime() - startDate.getTime();
      const durationMinutes = Math.round(durationMs / 60000);
      
      const distanceMiles = distance * METERS_TO_MILES;
      
      totalMeters += distance;
      totalMinutes += durationMinutes;
      
      drivingSegments.push({
        date: startDate.toISOString().split('T')[0],
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        startLocation: segment.startLocation ? {
          lat: (segment.startLocation.latitudeE7 || 0) / 1e7,
          lng: (segment.startLocation.longitudeE7 || 0) / 1e7
        } : null,
        endLocation: segment.endLocation ? {
          lat: (segment.endLocation.latitudeE7 || 0) / 1e7,
          lng: (segment.endLocation.longitudeE7 || 0) / 1e7
        } : null,
        distanceMeters: distance,
        distanceMiles: Math.round(distanceMiles * 10) / 10,
        durationMinutes,
        confidence: segment.confidence || 'UNKNOWN'
      });
    }

    return {
      success: true,
      totalDrivingMiles: Math.round(totalMeters * METERS_TO_MILES * 10) / 10,
      totalDrivingMinutes: totalMinutes,
      segments: drivingSegments,
      dateRange: minDate && maxDate ? {
        start: minDate.toISOString().split('T')[0],
        end: maxDate.toISOString().split('T')[0]
      } : null
    };
    
  } catch (error) {
    return {
      success: false,
      totalDrivingMiles: 0,
      totalDrivingMinutes: 0,
      segments: [],
      dateRange: null,
      error: `Failed to parse Google Timeline: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Parse newer semantic segments format
 */
function parseSemanticSegments(segments: any[]): TimelineParseResult {
  // Implement if needed for newer export format
  return {
    success: false,
    totalDrivingMiles: 0,
    totalDrivingMinutes: 0,
    segments: [],
    dateRange: null,
    error: 'Semantic segments format not yet supported. Please export in standard format.'
  };
}

/**
 * Aggregate driving segments by date
 */
export function aggregateByDate(segments: DrivingSegment[]): Map<string, { miles: number; minutes: number; trips: number }> {
  const byDate = new Map<string, { miles: number; minutes: number; trips: number }>();
  
  for (const segment of segments) {
    const existing = byDate.get(segment.date) || { miles: 0, minutes: 0, trips: 0 };
    byDate.set(segment.date, {
      miles: existing.miles + segment.distanceMiles,
      minutes: existing.minutes + segment.durationMinutes,
      trips: existing.trips + 1
    });
  }
  
  return byDate;
}

/**
 * Calculate deadhead miles by comparing Google Timeline to gig platform data
 */
export function calculateDeadhead(
  timelineByDate: Map<string, { miles: number; minutes: number; trips: number }>,
  gigTripsByDate: Map<string, { miles: number }>
): Map<string, { totalMiles: number; gigMiles: number; deadheadMiles: number }> {
  const result = new Map<string, { totalMiles: number; gigMiles: number; deadheadMiles: number }>();
  
  for (const [date, timeline] of timelineByDate) {
    const gigData = gigTripsByDate.get(date) || { miles: 0 };
    const deadhead = Math.max(0, timeline.miles - gigData.miles);
    
    result.set(date, {
      totalMiles: Math.round(timeline.miles * 10) / 10,
      gigMiles: Math.round(gigData.miles * 10) / 10,
      deadheadMiles: Math.round(deadhead * 10) / 10
    });
  }
  
  return result;
}
