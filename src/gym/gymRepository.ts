import { supabase } from './supabaseClient';
import type { ExerciseSource, Gym, GymExercise, GymProfile, MemberPlanExercise } from './types';

function requireClient() {
  if (!supabase) throw new Error('Supabase non configurato: EXPO_PUBLIC_SUPABASE_URL/ANON_KEY mancanti.');
  return supabase;
}

function toGym(row: { id: string; name: string; created_at: string }): Gym {
  return { id: row.id, name: row.name, createdAt: row.created_at };
}

function toProfile(row: {
  id: string;
  gym_id: string;
  role: string;
  display_name: string;
  created_at: string;
}): GymProfile {
  return {
    id: row.id,
    gymId: row.gym_id,
    role: row.role as GymProfile['role'],
    displayName: row.display_name,
    createdAt: row.created_at,
  };
}

function toGymExercise(row: {
  id: string;
  gym_id: string;
  created_by: string;
  name: string;
  instructions: string;
  muscle_group: string;
  movement_type: string;
  equipment: string;
  created_at: string;
}): GymExercise {
  return {
    id: row.id,
    gymId: row.gym_id,
    createdBy: row.created_by,
    name: row.name,
    instructions: row.instructions,
    muscleGroup: row.muscle_group as GymExercise['muscleGroup'],
    movementType: row.movement_type as GymExercise['movementType'],
    equipment: row.equipment as GymExercise['equipment'],
    createdAt: row.created_at,
  };
}

function toPlanExercise(row: {
  id: string;
  gym_id: string;
  member_id: string;
  exercise_source: string;
  exercise_ref: string;
  sort_order: number;
  created_at: string;
}): MemberPlanExercise {
  return {
    id: row.id,
    gymId: row.gym_id,
    memberId: row.member_id,
    exerciseSource: row.exercise_source as ExerciseSource,
    exerciseRef: row.exercise_ref,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export interface NewGymResult {
  gymId: string;
  masterId: string;
}

/**
 * Registra una nuova palestra + il suo primo account master, tramite l'Edge Function `create-gym`
 * (unico punto autorizzato: nessuna policy permette di creare gym/profiles direttamente dal client).
 * Non richiede una sessione: è il punto di ingresso, chi lo chiama non è ancora autenticato.
 */
export async function createGymAccount(input: {
  gymName: string;
  masterEmail: string;
  masterPassword: string;
  masterDisplayName: string;
}): Promise<NewGymResult> {
  const client = requireClient();
  const { data, error } = await client.functions.invoke('create-gym', {
    body: {
      gymName: input.gymName,
      masterEmail: input.masterEmail,
      masterPassword: input.masterPassword,
      masterDisplayName: input.masterDisplayName,
    },
  });
  if (error) throw error;
  return data as NewGymResult;
}

export async function signInMember(email: string, password: string): Promise<void> {
  const client = requireClient();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOutGym(): Promise<void> {
  const client = requireClient();
  await client.auth.signOut();
}

export async function getMyGymProfile(): Promise<GymProfile | null> {
  const client = requireClient();
  const { data: auth } = await client.auth.getUser();
  if (!auth.user) return null;
  const { data, error } = await client.from('profiles').select('*').eq('id', auth.user.id).single();
  if (error) return null;
  return toProfile(data);
}

export async function getGym(gymId: string): Promise<Gym | null> {
  const client = requireClient();
  const { data, error } = await client.from('gyms').select('*').eq('id', gymId).single();
  if (error) return null;
  return toGym(data);
}

export async function updateGymName(gymId: string, name: string): Promise<void> {
  const client = requireClient();
  const { error } = await client.from('gyms').update({ name }).eq('id', gymId);
  if (error) throw error;
}

export async function listGymMembers(gymId: string): Promise<GymProfile[]> {
  const client = requireClient();
  const { data, error } = await client
    .from('profiles')
    .select('*')
    .eq('gym_id', gymId)
    .eq('role', 'member')
    .order('display_name', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toProfile);
}

export async function listGymExercises(gymId: string): Promise<GymExercise[]> {
  const client = requireClient();
  const { data, error } = await client
    .from('gym_exercises')
    .select('*')
    .eq('gym_id', gymId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toGymExercise);
}

export async function createGymExercise(input: {
  gymId: string;
  createdBy: string;
  name: string;
  instructions: string;
  muscleGroup: string;
  movementType: string;
  equipment: string;
}): Promise<GymExercise> {
  const client = requireClient();
  const { data, error } = await client
    .from('gym_exercises')
    .insert({
      gym_id: input.gymId,
      created_by: input.createdBy,
      name: input.name,
      instructions: input.instructions,
      muscle_group: input.muscleGroup,
      movement_type: input.movementType,
      equipment: input.equipment,
    })
    .select('*')
    .single();
  if (error) throw error;
  return toGymExercise(data);
}

export interface NewMemberCredentials {
  memberId: string;
  email: string;
  password: string;
}

/**
 * Crea l'account di un nuovo iscritto tramite l'Edge Function `create-member` (unico punto
 * autorizzato a farlo: usa la service_role key lato server, mai esposta nell'app). Ritorna
 * email e password generate, da mostrare una sola volta al master.
 */
export async function createMemberAccount(displayName: string, email?: string): Promise<NewMemberCredentials> {
  const client = requireClient();
  const { data, error } = await client.functions.invoke('create-member', {
    body: { displayName, email },
  });
  if (error) throw error;
  return data as NewMemberCredentials;
}

export async function listMemberPlan(memberId: string): Promise<MemberPlanExercise[]> {
  const client = requireClient();
  const { data, error } = await client
    .from('member_plan_exercises')
    .select('*')
    .eq('member_id', memberId)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toPlanExercise);
}

/** Sostituisce l'intero piano assegnato all'iscritto con la nuova selezione (ordine = ordine dell'array). */
export async function setMemberPlan(
  gymId: string,
  memberId: string,
  items: { source: ExerciseSource; ref: string }[]
): Promise<void> {
  const client = requireClient();
  const { error: deleteError } = await client.from('member_plan_exercises').delete().eq('member_id', memberId);
  if (deleteError) throw deleteError;
  if (items.length === 0) return;
  const { error: insertError } = await client.from('member_plan_exercises').insert(
    items.map((item, index) => ({
      gym_id: gymId,
      member_id: memberId,
      exercise_source: item.source,
      exercise_ref: item.ref,
      sort_order: index,
    }))
  );
  if (insertError) throw insertError;
}
