import { createClient } from '@supabase/supabase-js';

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl.length < 10) {
  console.error('CRITICAL ERROR: NEXT_PUBLIC_SUPABASE_URL is missing or invalid!', supabaseUrl);
}

if (!supabaseAnonKey || supabaseAnonKey.length < 10) {
  console.error('CRITICAL ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or invalid!', supabaseAnonKey?.substring(0, 5) + '...');
}

console.log("Initializing Supabase client with URL:", supabaseUrl, "Key starts with:", supabaseAnonKey?.substring(0, 5) + "...");

// Use non-nullable assertion since we'll handle errors at runtime
// Add debug option to help diagnose API issues and disable caching
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (...args) => {
      // Custom fetch to disable caching
      args[1] = {
        ...args[1],
        cache: 'no-store',
      };
      return fetch(...args);
    },
  },
});

// Export a helper function to verify the Supabase connection
export async function verifySupabaseConnection() {
  try {
    // Try a simple query to verify connection
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection verified successfully');
    return { success: true };
  } catch (error) {
    console.error('Supabase connection test exception:', error);
    return { success: false, error };
  }
} 