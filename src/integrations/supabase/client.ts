
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oglvdtfixqlejpojykwm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbHZkdGZpeHFsZWpwb2p5a3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTkxNTEsImV4cCI6MjA1NzY5NTE1MX0.5vmiupFPDMufOSDWmMA5sqXqPx_cSiBbR2kaVxUW1t4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
