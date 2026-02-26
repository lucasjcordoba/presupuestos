import { createClient } from '@supabase/supabase-js';

// Server-only client — uses service_role key, never import in client components
export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
