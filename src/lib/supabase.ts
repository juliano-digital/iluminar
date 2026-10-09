import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  scheduled_at: string;
  service_type: string;
  created_at: string;
};

export type AppointmentInput = {
  name: string;
  phone: string;
  scheduled_at: string;
  service_type: string;
};
