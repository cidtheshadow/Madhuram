import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.EXPO_PUBLIC_SUPABASE_URL || 'your_supabase_url_here'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your_anon_key_here'

export const supabase = createClient(supabaseUrl, supabaseKey)
