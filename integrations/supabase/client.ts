
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://my-supabase-url.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'my-supabase-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
