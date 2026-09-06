import type { UserProfile } from '../exercises/types';

/**
 * Soglia di difficultyScore nel modulo a corpo libero oltre la quale, se l'utente non ha
 * confermato di possedere manubri in onboarding, l'app propone di nuovo la domanda una sola
 * volta. Valore scelto perché coincide con il raggiungimento del tier 2 (intermedio); non
 * derivabile dal codice esistente, quindi decisione autonoma da validare.
 */
export const DUMBBELL_REASK_DIFFICULTY_THRESHOLD = 2;

/** True quando l'app deve mostrare il banner "hai dei manubri?" nella home. */
export function shouldOfferDumbbellReask(user: UserProfile): boolean {
  return (
    !user.hasDumbbells &&
    !user.dumbbellModuleUnlocked &&
    !user.dumbbellReaskDismissed &&
    user.difficultyScore >= DUMBBELL_REASK_DIFFICULTY_THRESHOLD
  );
}
