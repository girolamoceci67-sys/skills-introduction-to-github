export interface StickPoint {
  x: number;
  y: number;
}

export interface StickPose {
  head: StickPoint;
  neck: StickPoint;
  hip: StickPoint;
  elbow: StickPoint;
  hand: StickPoint;
  knee: StickPoint;
  foot: StickPoint;
}

export interface ExerciseAvatarAnimation {
  poseStart: StickPose;
  poseEnd: StickPose;
  viewBoxWidth: number;
  viewBoxHeight: number;
  groundY: number;
  durationMs: number;
}

/**
 * Pose in vista laterale (stick figure a un solo braccio/gamba visibili) per
 * l'anteprima animata del movimento. Fase pilota: solo 3 esercizi.
 */
export const avatarPoses: Record<string, ExerciseAvatarAnimation> = {
  'legs-squat': {
    viewBoxWidth: 100,
    viewBoxHeight: 150,
    groundY: 134,
    durationMs: 1300,
    poseStart: {
      head: { x: 50, y: 18 },
      neck: { x: 50, y: 32 },
      hip: { x: 50, y: 66 },
      elbow: { x: 36, y: 46 },
      hand: { x: 30, y: 62 },
      knee: { x: 50, y: 100 },
      foot: { x: 52, y: 132 },
    },
    poseEnd: {
      head: { x: 52, y: 46 },
      neck: { x: 53, y: 59 },
      hip: { x: 36, y: 80 },
      elbow: { x: 16, y: 58 },
      hand: { x: 4, y: 68 },
      knee: { x: 60, y: 98 },
      foot: { x: 62, y: 132 },
    },
  },
  'push-standard': {
    viewBoxWidth: 160,
    viewBoxHeight: 100,
    groundY: 86,
    durationMs: 1200,
    poseStart: {
      head: { x: 18, y: 34 },
      neck: { x: 32, y: 38 },
      hip: { x: 74, y: 42 },
      elbow: { x: 32, y: 56 },
      hand: { x: 34, y: 82 },
      knee: { x: 108, y: 45 },
      foot: { x: 142, y: 48 },
    },
    poseEnd: {
      head: { x: 18, y: 58 },
      neck: { x: 32, y: 60 },
      hip: { x: 75, y: 62 },
      elbow: { x: 24, y: 68 },
      hand: { x: 34, y: 82 },
      knee: { x: 108, y: 63 },
      foot: { x: 142, y: 60 },
    },
  },
  'core-knee-plank': {
    viewBoxWidth: 160,
    viewBoxHeight: 100,
    groundY: 86,
    durationMs: 1800,
    poseStart: {
      head: { x: 20, y: 40 },
      neck: { x: 36, y: 43 },
      hip: { x: 76, y: 47 },
      elbow: { x: 36, y: 62 },
      hand: { x: 36, y: 80 },
      knee: { x: 116, y: 70 },
      foot: { x: 130, y: 82 },
    },
    poseEnd: {
      head: { x: 20, y: 41 },
      neck: { x: 36, y: 44 },
      hip: { x: 76, y: 48 },
      elbow: { x: 36, y: 62 },
      hand: { x: 36, y: 80 },
      knee: { x: 116, y: 70 },
      foot: { x: 130, y: 82 },
    },
  },
};
