// Supabase Edge Function: registra una nuova palestra + il suo primo account master.
//
// È l'unico modo per "bootstrappare" una palestra (nessuna RLS permette di creare gym/profiles
// direttamente dal client, per evitare che chiunque si auto-assegni un ruolo master).
//
// Deploy:
//   npx supabase functions deploy create-gym
//
// Chiamata dall'app (nessuna autenticazione richiesta: è il punto di ingresso):
//   POST verso <SUPABASE_URL>/functions/v1/create-gym
//   Body: { "gymName": "Palestra Rossi", "masterEmail": "...", "masterPassword": "...", "masterDisplayName": "..." }

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.113.0';
import { corsHeaders } from '../_shared/cors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const body = await req.json().catch(() => ({}));
  const gymName = String(body.gymName ?? '').trim();
  const masterEmail = String(body.masterEmail ?? '').trim();
  const masterPassword = String(body.masterPassword ?? '');
  const masterDisplayName = String(body.masterDisplayName ?? '').trim();

  if (!gymName || !masterEmail || masterPassword.length < 6 || !masterDisplayName) {
    return new Response(JSON.stringify({ error: 'invalid_input' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: masterEmail,
    password: masterPassword,
    email_confirm: true,
  });
  if (createError || !created.user) {
    return new Response(JSON.stringify({ error: createError?.message ?? 'create_user_failed' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data: gym, error: gymError } = await admin.from('gyms').insert({ name: gymName }).select('*').single();
  if (gymError || !gym) {
    await admin.auth.admin.deleteUser(created.user.id);
    return new Response(JSON.stringify({ error: gymError?.message ?? 'create_gym_failed' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { error: profileError } = await admin.from('profiles').insert({
    id: created.user.id,
    gym_id: gym.id,
    role: 'master',
    display_name: masterDisplayName,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    await admin.from('gyms').delete().eq('id', gym.id);
    return new Response(JSON.stringify({ error: profileError.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ gymId: gym.id, masterId: created.user.id }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
