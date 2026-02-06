/**
 * MileHiiv Parsers
 * Data extraction modules for various mileage sources
 */

export { parseGoogleTimeline, aggregateByDate, calculateDeadhead } from './google-timeline'
export type { DrivingSegment, TimelineParseResult } from './google-timeline'

export { parseScreenshot, validateExtraction } from './screenshot-ocr'
export type { ExtractedTrip, ScreenshotParseResult } from './screenshot-ocr'

export { parseUberCSV } from './uber-csv'
export type { UberTrip, UberParseResult } from './uber-csv'

export { parseLyftCSV } from './lyft-csv'
export type { LyftTrip, LyftParseResult } from './lyft-csv'
