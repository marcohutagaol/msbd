import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Employee {
  id: string;
  name: string;
  employee_id: string;
  photo_url: string | null;
  created_at: string;
}

export interface Attendance {
  id: string;
  employee_id: string;
  check_in_time: string;
  photo_url: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}
