import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// 서버 사이드에서만 사용하는 Admin 클라이언트 (API Routes용)
// Service Role Key를 사용하여 RLS를 우회
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
