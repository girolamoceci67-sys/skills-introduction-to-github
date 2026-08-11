import type { Exercise } from './types';

/**
 * Dati strutturali della libreria esercizi (id, gruppo muscolare, tier, tipo di
 * movimento, controindicazioni). Il contenuto localizzabile (nome, istruzioni,
 * segnali di corretta esecuzione, varianti) vive nelle risorse i18n per lingua,
 * chiave `exercises.<id>` — vedi src/domain/exercises/exerciseContent.ts.
 *
 * Ogni esercizio è eseguibile a corpo libero in uno spazio domestico ridotto
 * (min. 2x2 m). Il tier massimo (3) resta a intensità accessibile: v1 non
 * include progressioni atletiche/avanzate.
 */
export const exerciseLibrary: Exercise[] = [
  // --- Gambe e glutei ---
  {
    id: 'legs-squat',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'legs-glute-bridge',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'legs-split-squat',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 2,
    movementType: 'reps',
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },

  // --- Spinta (push) ---
  {
    id: 'push-wall',
    muscleGroup: 'push',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['wrists', 'shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-knee',
    muscleGroup: 'push',
    baseDifficultyTier: 2,
    movementType: 'reps',
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-standard',
    muscleGroup: 'push',
    baseDifficultyTier: 3,
    movementType: 'reps',
    contraindicationTags: ['wrists', 'shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-forearm-wall',
    muscleGroup: 'push',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Tirata (pull) ---
  {
    id: 'pull-superman',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-scapular-retraction',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-prone-swimmer',
    muscleGroup: 'pull',
    baseDifficultyTier: 2,
    movementType: 'reps',
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-seated-scapular-squeeze',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Core ---
  {
    id: 'core-knee-plank',
    muscleGroup: 'core',
    baseDifficultyTier: 1,
    movementType: 'hold',
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-dead-bug',
    muscleGroup: 'core',
    baseDifficultyTier: 2,
    movementType: 'reps',
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-bird-dog',
    muscleGroup: 'core',
    baseDifficultyTier: 2,
    movementType: 'reps',
    contraindicationTags: ['back', 'wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-standing-brace',
    muscleGroup: 'core',
    baseDifficultyTier: 1,
    movementType: 'hold',
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Mobilità e cardio a basso impatto ---
  {
    id: 'mobility-march',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'mobility-step-touch',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'mobility-shoulder-hip-circles',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['shoulders'],
    spaceRequirement: '2x2m',
  },

  // --- Full body (disponibili nella libreria, non ancora usati dal generatore automatico del piano) ---
  {
    id: 'fullbody-cat-cow',
    muscleGroup: 'full_body',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'fullbody-sit-to-stand',
    muscleGroup: 'full_body',
    baseDifficultyTier: 1,
    movementType: 'reps',
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
];
