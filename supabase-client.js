import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from "./supabase-config.js";

export const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            detectSessionInUrl: true,
            persistSession: true
        }
    })
    : null;
