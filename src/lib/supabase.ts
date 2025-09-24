import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  user_id: string
  date: string
  start_mileage: number
  end_mileage: number
  business: boolean
  location?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Gap {
  id: string
  user_id: string
  date: string
  expected_miles: number
  actual_miles: number
  resolved: boolean
  created_at: string
  updated_at: string
}

export interface Upload {
  id: string
  user_id: string
  filename: string
  file_size: number
  processed_at: string
  status: 'processing' | 'completed' | 'failed'
  trips_extracted: number
  created_at: string
  updated_at: string
}
