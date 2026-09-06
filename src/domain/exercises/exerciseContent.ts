import { useTranslation } from 'react-i18next';

import type { ExerciseContent } from './types';

/** Risolve il contenuto localizzato (nome, istruzioni, segnali, varianti) di un esercizio nella lingua corrente. */
export function useExerciseContent(exerciseId: string): ExerciseContent {
  const { t } = useTranslation();
  return t(`exercises.${exerciseId}`, { returnObjects: true }) as ExerciseContent;
}
