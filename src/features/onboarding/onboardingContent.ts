import type { GoalType, LimitationTag, StartingLevel } from '../../domain/exercises/types';

export const startingLevelOptions: { value: StartingLevel; title: string; description: string }[] = [
  {
    value: 'sedentary',
    title: 'Parto da zero',
    description: 'Non mi alleno regolarmente da molto tempo',
  },
  {
    value: 'occasional',
    title: 'Mi muovo ogni tanto',
    description: 'Faccio attività fisica in modo saltuario',
  },
  {
    value: 'returning',
    title: 'Riprendo dopo una pausa',
    description: 'Mi allenavo con costanza e mi sono fermato/a',
  },
];

export const goalOptions: { value: GoalType; title: string; description: string }[] = [
  {
    value: 'stay_consistent',
    title: 'Creare un’abitudine costante',
    description: 'L’obiettivo principale è allenarmi con regolarità',
  },
  {
    value: 'build_strength_foundation',
    title: 'Costruire una base di forza',
    description: 'Voglio sentirmi più forte nei movimenti di tutti i giorni',
  },
  {
    value: 'improve_mobility',
    title: 'Migliorare la mobilità',
    description: 'Mi interessa muovermi meglio e con più libertà',
  },
  {
    value: 'general_energy',
    title: 'Avere più energia',
    description: 'Cerco un’attività che mi faccia sentire meglio nella giornata',
  },
];

export const limitationOptions: { value: LimitationTag; title: string; description: string }[] = [
  { value: 'knees', title: 'Ginocchia', description: 'Preferisco evitare impatti o carichi diretti sulle ginocchia' },
  { value: 'back', title: 'Schiena', description: 'Preferisco evitare movimenti che caricano la zona lombare' },
  { value: 'shoulders', title: 'Spalle', description: 'Preferisco evitare movimenti sopra la testa o a carico diretto' },
  { value: 'wrists', title: 'Polsi', description: 'Preferisco evitare l’appoggio prolungato sui polsi' },
  { value: 'none', title: 'Nessuna limitazione', description: 'Al momento non ho limitazioni da segnalare' },
];

export const daysPerWeekOptions = [2, 3, 4, 5, 6];
