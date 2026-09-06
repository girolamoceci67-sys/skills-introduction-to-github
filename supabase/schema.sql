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
  logo_url text,
  created_at timestamptz not null default now()
);

-- Migrazione: aggiunge la colonna se la tabella esisteva già senza (sicura da rieseguire).
alter table gyms add column if not exists logo_url text;

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

-- Storico allenamenti: una riga per ogni sessione guidata avviata da un iscritto (completata o
-- abbandonata a metà), così il master può vedere chi si è allenato e quanto.
create table if not exists workout_sessions (
  id uuid primary key default gen_random_uuid(),
  gym_id uuid not null references gyms (id) on delete cascade,
  member_id uuid not null references profiles (id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null check (status in ('completed', 'abandoned')),
  exercises_completed int not null default 0,
  exercises_total int not null default 0,
  created_at timestamptz not null default now()
);

-- Row Level Security: ogni master vede/gestisce solo la propria palestra; ogni iscritto vede solo se stesso.

alter table gyms enable row level security;
alter table profiles enable row level security;
alter table gym_exercises enable row level security;
alter table member_plan_exercises enable row level security;
alter table workout_sessions enable row level security;

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

create policy "iscritto crea e legge le proprie sessioni" on workout_sessions
  for all using (member_id = auth.uid())
  with check (member_id = auth.uid());

create policy "master legge le sessioni della propria palestra" on workout_sessions
  for select using (gym_id in (select gym_id from auth_profile() where role = 'master'));

-- Storage: bucket pubblico per i loghi delle palestre. Ogni file è salvato come "<gym_id>/logo.<ext>",
-- così le policy possono controllare che un master carichi solo dentro la cartella della propria palestra.
-- Il bucket è pubblico in lettura (i loghi non sono dati sensibili e devono essere visibili anche a
-- iscritti/schermate senza bisogno di URL firmati).
insert into storage.buckets (id, name, public)
values ('gym-logos', 'gym-logos', true)
on conflict (id) do nothing;

create policy "loghi palestra leggibili da chiunque" on storage.objects
  for select using (bucket_id = 'gym-logos');

create policy "il master carica/sostituisce solo il logo della propria palestra" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'gym-logos'
    and (storage.foldername(name))[1]::uuid in (select gym_id from auth_profile() where role = 'master')
  );

create policy "il master aggiorna solo il logo della propria palestra" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'gym-logos'
    and (storage.foldername(name))[1]::uuid in (select gym_id from auth_profile() where role = 'master')
  );
