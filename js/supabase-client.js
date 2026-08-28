const SUPABASE_URL = "https://fubhsnsseanesejwuzke.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_PHAMQmzfu7c2kJT4Q0m-Xg_-DVLILYd";

if (!window.supabase) {
  throw new Error("Biblioteca do Supabase não foi carregada.");
}

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
