// app/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,        // déjà dans ton .env.local
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  // idem
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'montelion.auth'             // clé locale
    }
  }
);
