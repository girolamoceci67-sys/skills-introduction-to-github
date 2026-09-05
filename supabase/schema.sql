-- Corpo e Salute — schema multi-palestra (master + iscritti)
-- Da eseguire una sola volta nel progetto Supabase: dashboard -> SQL Editor -> New query -> incolla ed esegui.
--
-- Modello:
--   gyms              una riga per palestra (nome/branding)
--   profiles          un profilo per utente autenticato (master o iscritto), sempre legato a una palestra
--   gym_exercises     esercizi personalizzati aggiunti dal master, oltre alla libreria integrata nell'app
--   member_plan_exercises   selezione di esercizi (libreria integrata o personalizzati) assegnata dal master a un iscritto
--
-- La libreria dei 36 esercizi "di base" resta quella già inclusa nell'app (nessuna riga qui):
-- il master la usa com'è, oppure aggiunge esercizi propri in gym_exercises.

create extension if not exists "pgcrypto";

create table if not exists gyms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  gym_id uuid not null references gyms (id) on delete cascade,
  role text not null check (role in ('master', 'member')),
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists gym_exercises (
  id uuid primary key default gen_random_uuid(),
  gym_id uuid not null references gyms (id) on delete cascade,
  created_by uuid not null references profiles (id),
  name text not null,
  instructions text not null,
  muscle_group text not null,
  movement_type text not null check (movement_type in ('reps', 'hold')),
  equipment text not null check (equipment in ('bodyweight', 'dumbbell')),
  created_at timestamptz not null default now()
);

create table if not exists member_plan_exercises (
  id uuid primary key default gen_random_uuid(),
  gym_id uuid not null references gyms (id) on delete cascade,
  member_id uuid not null references profiles (id) on delete cascade,
  -- 'builtin' = id testuale della libreria gia' nell'app (es. 'bw-squat'); 'gym_custom' = riga di gym_exercises
  exercise_source text not null check (exercise_source in ('builtin', 'gym_custom')),
  exercise_ref text not null,
  sort_order int not null default 0,
  -- Volume scelto dal master per questo esercizio in questo piano: numero di serie, target (ripetizioni
  -- o secondi di mantenimento a seconda di target_unit) e riposo tra le serie.
  sets int not null default 2,
  target int not null default 9,
  target_unit text not null default 'reps' check (target_unit in ('reps', 'seconds')),
  rest_seconds int not null default 60,
  created_at timestamptz not null default now()
);

-- Migrazione: se la tabella esisteva già senza queste colonne (versione precedente dello schema),
-- questa aggiunta è sicura da rieseguire anche più volte o su un'installazione già aggiornata.
alter table member_plan_exercises add column if not exists sets int not null default 2;
alter table member_plan_exercises add column if not exists target int not null default 9;
alter table member_plan_exercises add column if not exists target_unit text not null default 'reps';
alter table member_plan_exercises add column if not exists rest_seconds int not null default 60;

-- Row Level Security: ogni master vede/gestisce solo la propria palestra; ogni iscritto vede solo se stesso.

alter table gyms enable row level security;
alter table profiles enable row level security;
alter table gym_exercises enable row level security;
alter table member_plan_exercises enable row level security;

-- Funzione helper: ruolo e palestra dell'utente autenticato corrente.
create or replace function auth_profile()
returns table (gym_id uuid, role text)
language sql
security definer
stable
as $$
  select gym_id, role from profiles where id = auth.uid();
$$;

create policy "gym visibile a chi ne fa parte" on gyms
  for select using (id in (select gym_id from auth_profile()));

create policy "gym modificabile solo dal master" on gyms
  for update using (id in (select gym_id from auth_profile() where role = 'master'));

create policy "profilo proprio sempre leggibile" on profiles
  for select using (id = auth.uid());

create policy "master legge i profili della propria palestra" on profiles
  for select using (gym_id in (select gym_id from auth_profile() where role = 'master'));

create policy "esercizi personalizzati visibili alla propria palestra" on gym_exercises
  for select using (gym_id in (select gym_id from auth_profile()));

create policy "solo il master crea/modifica esercizi personalizzati" on gym_exercises
  for all using (gym_id in (select gym_id from auth_profile() where role = 'master'))
  with check (gym_id in (select gym_id from auth_profile() where role = 'master'));

create policy "iscritto legge il proprio piano assegnato" on member_plan_exercises
  for select using (member_id = auth.uid());

create policy "master legge/scrive i piani della propria palestra" on member_plan_exercises
  for all using (gym_id in (select gym_id from auth_profile() where role = 'master'))
  with check (gym_id in (select gym_id from auth_profile() where role = 'master'));
