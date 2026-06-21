/**
 * IRS Standard Mileage Rates (business use) — single source of truth.
 *
 * The deduction a driver can claim depends on the TAX YEAR the miles were
 * driven in, not the year the report is generated. A tax product MUST apply
 * the correct per-year rate or every dollar figure it shows is wrong.
 *
 * Source: IRS standard mileage rate announcements (business rate, cents/mile).
 * Update this table each December when the IRS announces the next year's rate.
 *
 *   2023: 65.5¢   2024: 67¢   2025: 70¢
 *
 * Rates not in the table fall back to the most recent KNOWN rate and are
 * flagged `verified: false` so the UI/report can warn instead of silently
 * presenting an unconfirmed number as fact.
 */

export const IRS_BUSINESS_MILEAGE_RATES: Record<number, number> = {
  2023: 0.655,
  2024: 0.67,
  2025: 0.70,
  // 2026: <add when IRS announces — usually mid-December 2025>
}

const KNOWN_YEARS = Object.keys(IRS_BUSINESS_MILEAGE_RATES).map(Number)
const LATEST_KNOWN_YEAR = Math.max(...KNOWN_YEARS)
const EARLIEST_KNOWN_YEAR = Math.min(...KNOWN_YEARS)

export interface IrsRateResult {
  year: number
  rate: number
  /** true when `year` has an IRS-confirmed rate in the table */
  verified: boolean
  /** when unverified, the year whose rate we actually applied */
  appliedYear: number
  note?: string
}

/**
 * Resolve the IRS business mileage rate for a given tax year.
 * Never throws — unknown years return the nearest known rate, flagged unverified.
 */
export function getIrsRate(year: number): IrsRateResult {
  if (IRS_BUSINESS_MILEAGE_RATES[year] !== undefined) {
    return {
      year,
      rate: IRS_BUSINESS_MILEAGE_RATES[year],
      verified: true,
      appliedYear: year,
    }
  }

  // Unknown year: apply the nearest known rate (latest for future years,
  // earliest for years before our table) and flag it for verification.
  const appliedYear = year > LATEST_KNOWN_YEAR ? LATEST_KNOWN_YEAR : EARLIEST_KNOWN_YEAR
  return {
    year,
    rate: IRS_BUSINESS_MILEAGE_RATES[appliedYear],
    verified: false,
    appliedYear,
    note:
      `The IRS standard mileage rate for ${year} is not yet confirmed in MileHiIV. ` +
      `Figures use the ${appliedYear} rate ($${IRS_BUSINESS_MILEAGE_RATES[appliedYear].toFixed(2)}/mi) ` +
      `as a placeholder — verify before filing.`,
  }
}

/** Compute a deduction in dollars, rounded to cents. */
export function mileageDeduction(miles: number, year: number): number {
  const { rate } = getIrsRate(year)
  return Math.round(miles * rate * 100) / 100
}
