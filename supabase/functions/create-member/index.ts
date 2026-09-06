// Supabase Edge Function: crea l'account di un nuovo iscritto con una password generata.
//
// Gira lato server (Deno), è l'unico posto autorizzato a usare la service_role key: crea
// l'utente Auth e la riga in `profiles`, poi restituisce email+password (mostrate una sola
// volta al master, che le consegna all'iscritto). Il client (app) non vede mai la service_role key.
//
// Deploy (dopo aver creato il progetto Supabase):
//   npx supabase functions deploy create-member
//
// Chiamata dall'app: POST verso <SUPABASE_URL>/functions/v1/create-member
// Header: Authorization: Bearer <access_token del master loggato>
// Body: { "displayName": "Mario Rossi", "email": "mario@esempio.it" }  (email opzionale)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.113.0';
import { corsHeaders } from '../_shared/cors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function randomPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let out = '';
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += chars[b % chars.length];
  return out;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  const authHeader = req.headers.get('Authorization') ?? '';
  const callerToken = authHeader.replace('Bearer ', '');
  if (!callerToken) {
    return jsonResponse({ error: 'missing_authorization' }, 401);
  }

  // Client "come il chiamante": verifica chi è e legge il suo profilo con le RLS normali.
  const asCaller = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userError } = await asCaller.auth.getUser(callerToken);
  if (userError || !userData.user) {
    return jsonResponse({ error: 'invalid_session' }, 401);
  }

  const { data: callerProfile, error: profileError } = await asCaller
    .from('profiles')
    .select('gym_id, role')
    .eq('id', userData.user.id)
    .single();
  if (profileError || !callerProfile || callerProfile.role !== 'master') {
    return jsonResponse({ error: 'not_a_master' }, 403);
  }

  const body = await req.json().catch(() => ({}));
  const displayName = String(body.displayName ?? '').trim();
  if (!displayName) {
    return jsonResponse({ error: 'display_name_required' }, 400);
  }
  const email = String(body.email ?? '').trim() || `member.${crypto.randomUUID()}@iscritti.corposalute.app`;
  const password = randomPassword();

  // Client con service_role: unico punto autorizzato a creare utenti Auth per conto del master.
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created.user) {
    return jsonResponse({ error: createError?.message ?? 'create_user_failed' }, 400);
  }

  const { error: insertError } = await admin.from('profiles').insert({
    id: created.user.id,
    gym_id: callerProfile.gym_id,
    role: 'member',
    display_name: displayName,
  });
  if (insertError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return jsonResponse({ error: insertError.message }, 400);
  }

  return jsonResponse({ memberId: created.user.id, email, password }, 200);
});
