"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// ✅ version “historique” pour ton ancien code :
//    import * as s from "@/lib/supabaseBrowser";
//    const supabase = s.createBrowserSupabaseClient();
export function createBrowserSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

// ✅ bonus : instance déjà créée si on veut un client direct
export const supabase = createBrowserSupabaseClient();

// pour pouvoir faire: import supabase from "@/lib/supabaseBrowser";
export default supabase;
