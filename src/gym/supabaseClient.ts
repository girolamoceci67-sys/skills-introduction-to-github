import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/** true solo quando le variabili d'ambiente Supabase sono configurate: la modalità palestra resta nascosta finché non lo sono. */
export const gymBackendConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Client Supabase per la modalità "palestra" (master + iscritti). Usato solo da quel modulo:
 * la modalità individuale offline esistente non lo tocca e continua a funzionare senza rete.
 * Se le variabili d'ambiente non sono configurate, `supabase` è null: chi lo usa deve controllare
 * `gymBackendConfigured` prima.
 */
export const supabase = gymBackendConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
