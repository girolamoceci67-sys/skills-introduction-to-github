import { useTranslation } from 'react-i18next';

import type { ExerciseVariantKind, LimitationTag, MuscleGroup } from './types';

/** Etichette localizzate per gruppo muscolare, variante ed esercizio, nella lingua corrente. */
export function useLabels() {
  const { t } = useTranslation();

  const muscleGroupLabels: Record<MuscleGroup, string> = {
    full_body: t('muscleGroups.full_body'),
    legs_glutes: t('muscleGroups.legs_glutes'),
    core: t('muscleGroups.core'),
    push: t('muscleGroups.push'),
    pull: t('muscleGroups.pull'),
    mobility_cardio: t('muscleGroups.mobility_cardio'),
    chest: t('muscleGroups.chest'),
    back: t('muscleGroups.back'),
    shoulders: t('muscleGroups.shoulders'),
    arms: t('muscleGroups.arms'),
  };

  const variantLabels: Record<ExerciseVariantKind, string> = {
    easier: t('variants.easier'),
    base: t('variants.base'),
    harder: t('variants.harder'),
  };

  /** Esclude deliberatamente 'none': non è una limitazione da mostrare all'utente, ma l'assenza di controindicazioni. */
  const limitationLabels: Record<Exclude<LimitationTag, 'none'>, string> = {
    knees: t('limitations.knees'),
    back: t('limitations.back'),
    shoulders: t('limitations.shoulders'),
    wrists: t('limitations.wrists'),
  };

  return { muscleGroupLabels, variantLabels, limitationLabels };
}
