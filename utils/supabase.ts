import { createClient } from '@supabase/supabase-js'

// 환경 변수가 없을 때 기본값 사용 (개발용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co`
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
