
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvvvfkhqbqwfqhtxifbx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dnZma2hxYnF3ZnFodHhpZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzc4MjcsImV4cCI6MjA2Mjg1MzgyN30.2GLEaB4QHcj251bWsWA-KGwPqVZc3-9JrPMOlSn5aLc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
