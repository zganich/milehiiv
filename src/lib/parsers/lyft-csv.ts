/**
 * Lyft Driver CSV Parser
 * Parses Lyft driver trip exports (CSV format from driver dashboard)
 */

export interface LyftTrip {
  date: string;
  startTime: string;
  endTime: string;
  miles: number;
  earnings: number;
  tripType: 'ride' | 'delivery' | 'unknown';
  pickupAddress?: string;
  dropoffAddress?: string;
  duration: number;
  rideType?: string; // 'Lyft', 'Lyft XL', 'Lux', etc.
}

export interface LyftParseResult {
  success: boolean;
  trips: LyftTrip[];
  totalMiles: number;
  totalEarnings: number;
  totalTrips: number;
  dateRange: { start: string; end: string } | null;
  error?: string;
}

/**
 * Parse Lyft driver CSV export
 */
export function parseLyftCSV(csvContent: string): LyftParseResult {
  try {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      return {
        success: false,
        trips: [],
        totalMiles: 0,
        totalEarnings: 0,
        totalTrips: 0,
        dateRange: null,
        error: 'CSV file is empty or has no data rows'
      };
    }

    const header = parseCSVLine(lines[0]);
    const columnMap = mapLyftColumns(header);

    if (!columnMap.date && !columnMap.startTime) {
      return {
        success: false,
        trips: [],
        totalMiles: 0,
        totalEarnings: 0,
        totalTrips: 0,
        dateRange: null,
        error: 'Could not identify Lyft CSV format. Expected columns like "Date" or "Ride Start Time".'
      };
    }

    const trips: LyftTrip[] = [];
    let totalMiles = 0;
    let totalEarnings = 0;
    let minDate: string | null = null;
    let maxDate: string | null = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = parseCSVLine(line);

      // Extract date
      let dateStr = '';
      if (columnMap.date !== undefined) {
        dateStr = values[columnMap.date] || '';
      } else if (columnMap.startTime !== undefined) {
        dateStr = values[columnMap.startTime]?.split(' ')[0] || '';
      }

      const date = normalizeDate(dateStr);
      if (!date) continue;

      if (!minDate || date < minDate) minDate = date;
      if (!maxDate || date > maxDate) maxDate = date;

      // Extract times
      const startTime = columnMap.startTime !== undefined
        ? extractTime(values[columnMap.startTime])
        : '';
      const endTime = columnMap.endTime !== undefined
        ? extractTime(values[columnMap.endTime])
        : '';

      // Extract distance
      let miles = 0;
      if (columnMap.distance !== undefined) {
        const distStr = values[columnMap.distance] || '';
        miles = parseFloat(distStr.replace(/[^0-9.]/g, '') || '0');
      }

      // Extract earnings
      let earnings = 0;
      if (columnMap.earnings !== undefined) {
        earnings = parseFloat(values[columnMap.earnings]?.replace(/[^0-9.]/g, '') || '0');
      } else if (columnMap.total !== undefined) {
        earnings = parseFloat(values[columnMap.total]?.replace(/[^0-9.]/g, '') || '0');
      }

      // Ride type
      const rideType = columnMap.rideType !== undefined ? values[columnMap.rideType] : undefined;

      // Determine trip type
      let tripType: 'ride' | 'delivery' | 'unknown' = 'ride';

      // Duration
      let duration = 0;
      if (columnMap.duration !== undefined) {
        duration = parseInt(values[columnMap.duration]?.replace(/[^0-9]/g, '') || '0');
      } else if (startTime && endTime) {
        duration = calculateDuration(startTime, endTime);
      }

      // Addresses
      const pickupAddress = columnMap.pickup !== undefined ? values[columnMap.pickup] : undefined;
      const dropoffAddress = columnMap.dropoff !== undefined ? values[columnMap.dropoff] : undefined;

      if (miles > 0 || earnings > 0) {
        trips.push({
          date,
          startTime,
          endTime,
          miles,
          earnings,
          tripType,
          pickupAddress,
          dropoffAddress,
          duration,
          rideType
        });

        totalMiles += miles;
        totalEarnings += earnings;
      }
    }

    return {
      success: true,
      trips,
      totalMiles: Math.round(totalMiles * 10) / 10,
      totalEarnings: Math.round(totalEarnings * 100) / 100,
      totalTrips: trips.length,
      dateRange: minDate && maxDate ? { start: minDate, end: maxDate } : null
    };

  } catch (error) {
    return {
      success: false,
      trips: [],
      totalMiles: 0,
      totalEarnings: 0,
      totalTrips: 0,
      dateRange: null,
      error: `Failed to parse Lyft CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

interface ColumnMap {
  date?: number;
  startTime?: number;
  endTime?: number;
  distance?: number;
  earnings?: number;
  total?: number;
  rideType?: number;
  pickup?: number;
  dropoff?: number;
  duration?: number;
}

function mapLyftColumns(header: string[]): ColumnMap {
  const map: ColumnMap = {};

  header.forEach((col, index) => {
    const normalized = col.toLowerCase().trim();

    if (normalized === 'date' || normalized.includes('ride date')) {
      map.date = index;
    } else if (normalized.includes('start time') || normalized.includes('pickup time')) {
      map.startTime = index;
    } else if (normalized.includes('end time') || normalized.includes('dropoff time')) {
      map.endTime = index;
    } else if (normalized.includes('distance') || normalized.includes('miles')) {
      map.distance = index;
    } else if (normalized.includes('earnings') || normalized.includes('driver earnings')) {
      map.earnings = index;
    } else if (normalized.includes('total')) {
      map.total = index;
    } else if (normalized.includes('ride type') || normalized.includes('service')) {
      map.rideType = index;
    } else if (normalized.includes('pickup') || normalized.includes('origin')) {
      map.pickup = index;
    } else if (normalized.includes('dropoff') || normalized.includes('destination')) {
      map.dropoff = index;
    } else if (normalized.includes('duration')) {
      map.duration = index;
    }
  });

  return map;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function normalizeDate(dateStr: string): string | null {
  if (!dateStr) return null;

  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/,
    /(\d{2})\/(\d{2})\/(\d{4})/,
    /(\d{2})\/(\d{2})\/(\d{2})/,
    /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/,
  ];

  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      let year: string, month: string, day: string;

      if (format.source.startsWith('(\\d{4})')) {
        [, year, month, day] = match;
      } else {
        [, month, day, year] = match;
        if (year.length === 2) {
          year = '20' + year;
        }
      }

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  } catch {}

  return null;
}

function extractTime(dateTimeStr: string): string {
  if (!dateTimeStr) return '';

  const timeMatch = dateTimeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i);

  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = timeMatch[2];
    const ampm = timeMatch[4]?.toUpperCase();

    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  return '';
}

function calculateDuration(startTime: string, endTime: string): number {
  const [startHours, startMins] = startTime.split(':').map(Number);
  const [endHours, endMins] = endTime.split(':').map(Number);

  let startTotal = startHours * 60 + startMins;
  let endTotal = endHours * 60 + endMins;

  if (endTotal < startTotal) {
    endTotal += 24 * 60;
  }

  return endTotal - startTotal;
}
