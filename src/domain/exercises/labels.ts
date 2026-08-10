import type { ExerciseVariantKind, LimitationTag, MuscleGroup } from './types';

export const muscleGroupLabels: Record<MuscleGroup, string> = {
  full_body: 'Corpo intero',
  legs_glutes: 'Gambe e glutei',
  core: 'Core',
  push: 'Spinta',
  pull: 'Tirata',
  mobility_cardio: 'Mobilità e cardio',
};

export const variantLabels: Record<ExerciseVariantKind, string> = {
  easier: 'Variante facilitata',
  base: 'Variante base',
  harder: 'Variante avanzata',
};

/** Esclude deliberatamente 'none': non è una limitazione da mostrare all'utente, ma l'assenza di controindicazioni. */
export const limitationLabels: Record<Exclude<LimitationTag, 'none'>, string> = {
  knees: 'ginocchia',
  back: 'schiena',
  shoulders: 'spalle',
  wrists: 'polsi',
};
