import { createClient } from '@supabase/supabase-js'
import config from 'src/configs'

export const supabase = createClient('https://inkryqrjlvcrdegmzhwi.supabase.co', config.supabaseKey)
