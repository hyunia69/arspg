import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// 서버 사이드에서만 사용하는 Admin 클라이언트 (API Routes용)
// RLS를 우회하지 않고 일반 anon key 사용
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}
