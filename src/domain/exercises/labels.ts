import type { ExerciseVariantKind, MuscleGroup } from './types';

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
