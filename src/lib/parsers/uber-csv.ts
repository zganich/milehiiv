/**
 * Uber Driver CSV Parser
 * Parses Uber driver trip exports (CSV format from driver dashboard)
 */

export interface UberTrip {
  date: string;
  startTime: string;
  endTime: string;
  miles: number;
  earnings: number;
  tripType: 'ride' | 'delivery' | 'unknown';
  pickupAddress?: string;
  dropoffAddress?: string;
  duration: number; // minutes
}

export interface UberParseResult {
  success: boolean;
  trips: UberTrip[];
  totalMiles: number;
  totalEarnings: number;
  totalTrips: number;
  dateRange: { start: string; end: string } | null;
  error?: string;
}

/**
 * Parse Uber driver CSV export
 * Uber CSV typically has columns like:
 * Trip Date, Request Time, Dropoff Time, Distance (miles), Fare Amount, etc.
 */
export function parseUberCSV(csvContent: string): UberParseResult {
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

    // Parse header to find column indices
    const header = parseCSVLine(lines[0]);
    const columnMap = mapUberColumns(header);

    if (!columnMap.date && !columnMap.requestTime) {
      return {
        success: false,
        trips: [],
        totalMiles: 0,
        totalEarnings: 0,
        totalTrips: 0,
        dateRange: null,
        error: 'Could not identify Uber CSV format. Expected columns like "Trip Date" or "Request Time".'
      };
    }

    const trips: UberTrip[] = [];
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
      } else if (columnMap.requestTime !== undefined) {
        dateStr = values[columnMap.requestTime]?.split(' ')[0] || '';
      }
      
      const date = normalizeDate(dateStr);
      if (!date) continue;

      // Track date range
      if (!minDate || date < minDate) minDate = date;
      if (!maxDate || date > maxDate) maxDate = date;

      // Extract times
      const startTime = columnMap.requestTime !== undefined 
        ? extractTime(values[columnMap.requestTime]) 
        : '';
      const endTime = columnMap.dropoffTime !== undefined 
        ? extractTime(values[columnMap.dropoffTime]) 
        : '';

      // Extract distance (miles)
      let miles = 0;
      if (columnMap.distance !== undefined) {
        miles = parseFloat(values[columnMap.distance]?.replace(/[^0-9.]/g, '') || '0');
      }

      // Extract earnings
      let earnings = 0;
      if (columnMap.fare !== undefined) {
        earnings = parseFloat(values[columnMap.fare]?.replace(/[^0-9.]/g, '') || '0');
      } else if (columnMap.total !== undefined) {
        earnings = parseFloat(values[columnMap.total]?.replace(/[^0-9.]/g, '') || '0');
      }

      // Determine trip type
      let tripType: 'ride' | 'delivery' | 'unknown' = 'unknown';
      if (columnMap.tripType !== undefined) {
        const typeStr = values[columnMap.tripType]?.toLowerCase() || '';
        if (typeStr.includes('eats') || typeStr.includes('delivery')) {
          tripType = 'delivery';
        } else if (typeStr.includes('ride') || typeStr.includes('trip')) {
          tripType = 'ride';
        }
      }

      // Calculate duration
      let duration = 0;
      if (startTime && endTime) {
        duration = calculateDuration(startTime, endTime);
      }

      // Extract addresses if available
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
          duration
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
      error: `Failed to parse Uber CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

interface ColumnMap {
  date?: number;
  requestTime?: number;
  dropoffTime?: number;
  distance?: number;
  fare?: number;
  total?: number;
  tripType?: number;
  pickup?: number;
  dropoff?: number;
}

function mapUberColumns(header: string[]): ColumnMap {
  const map: ColumnMap = {};
  
  header.forEach((col, index) => {
    const normalized = col.toLowerCase().trim();
    
    if (normalized.includes('trip date') || normalized === 'date') {
      map.date = index;
    } else if (normalized.includes('request time') || normalized.includes('start time')) {
      map.requestTime = index;
    } else if (normalized.includes('dropoff time') || normalized.includes('end time')) {
      map.dropoffTime = index;
    } else if (normalized.includes('distance') || normalized.includes('miles')) {
      map.distance = index;
    } else if (normalized.includes('fare') && !normalized.includes('total')) {
      map.fare = index;
    } else if (normalized.includes('total') || normalized.includes('amount')) {
      map.total = index;
    } else if (normalized.includes('type') || normalized.includes('product')) {
      map.tripType = index;
    } else if (normalized.includes('pickup') || normalized.includes('origin')) {
      map.pickup = index;
    } else if (normalized.includes('dropoff') || normalized.includes('destination')) {
      map.dropoff = index;
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
  
  // Try various date formats
  const formats = [
    /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    /(\d{2})\/(\d{2})\/(\d{4})/, // MM/DD/YYYY
    /(\d{2})\/(\d{2})\/(\d{2})/, // MM/DD/YY
    /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/, // M/D/YYYY or M/D/YY
  ];

  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      let year: string, month: string, day: string;
      
      if (format.source.startsWith('(\\d{4})')) {
        // YYYY-MM-DD
        [, year, month, day] = match;
      } else {
        // MM/DD/YYYY or variants
        [, month, day, year] = match;
        if (year.length === 2) {
          year = '20' + year;
        }
      }
      
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  // Try Date.parse as fallback
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
  
  // Look for time pattern HH:MM or H:MM (with optional AM/PM)
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
  
  // Handle overnight trips
  if (endTotal < startTotal) {
    endTotal += 24 * 60;
  }
  
  return endTotal - startTotal;
}
