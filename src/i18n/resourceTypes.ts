export interface ExerciseVariantResource {
  name: string;
  instructions: string[];
  executionCues: string[];
}

export interface ExerciseResource {
  name: string;
  instructions: string[];
  executionCues: string[];
  easierVariant: ExerciseVariantResource;
  harderVariant: ExerciseVariantResource;
}

export interface OnboardingOptionResource {
  title: string;
  description: string;
}

export interface LocaleResource {
  common: {
    continue: string;
    cancel: string;
    save: string;
    saving: string;
    retry: string;
    exit: string;
  };
  language: {
    title: string;
    subtitle: string;
    continue: string;
  };
  auth: {
    createTitle: string;
    createSubtitle: string;
    loginTitle: string;
    loginSubtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    createButton: string;
    loginButton: string;
    errorUsernameRequired: string;
    errorPasswordTooShort: string;
    errorPasswordMismatch: string;
    errorInvalidCredentials: string;
    forgotHint: string;
  };
  onboarding: {
    welcomeTitle: string;
    welcomeBody: string;
    welcomeDisclaimer: string;
    start: string;
    levelTitle: string;
    levelSubtitle: string;
    goalTitle: string;
    goalSubtitle: string;
    availabilityTitle: string;
    availabilitySubtitle: string;
    daysPerWeek: string;
    limitationsTitle: string;
    limitationsSubtitle: string;
    limitationsDisclaimer: string;
    equipmentTitle: string;
    equipmentSubtitle: string;
    equipmentYes: string;
    equipmentNo: string;
    equipmentMinLabel: string;
    equipmentMaxLabel: string;
    createPlan: string;
    preparingPlan: string;
    saveErrorTitle: string;
    saveErrorSubtitle: string;
    backToStart: string;
    levelOptions: Record<'sedentary' | 'occasional' | 'returning', OnboardingOptionResource>;
    goalOptions: Record<
      'stay_consistent' | 'build_strength_foundation' | 'improve_mobility' | 'general_energy',
      OnboardingOptionResource
    >;
    limitationOptions: Record<'knees' | 'back' | 'shoulders' | 'wrists' | 'none', OnboardingOptionResource>;
  };
  notifications: {
    reminderChannelName: string;
    reminderTitle: string;
    reminderBody: string;
  };
  tabs: {
    home: string;
    library: string;
    progress: string;
  };
  home: {
    title: string;
    subtitle: string;
    restDay: string;
    today: string;
    done: string;
    start: string;
    redo: string;
    noProfileTitle: string;
    noProfileSubtitle: string;
    errorTitle: string;
    dumbbellReaskTitle: string;
    dumbbellReaskSubtitle: string;
    dumbbellReaskCta: string;
    dumbbellReaskDismiss: string;
  };
  dumbbellReask: {
    title: string;
    subtitle: string;
    yes: string;
    no: string;
    minLabel: string;
    maxLabel: string;
    confirm: string;
    skip: string;
  };
  library: {
    title: string;
    subtitle: string;
    subtitleWithDumbbell: string;
    levelBadge: string;
    levelBadgeDumbbell: string;
    excludedBadge: string;
    notFound: string;
    previewCaption: string;
    executionCuesHeading: string;
    contraindicationDisclaimer: string;
  };
  session: {
    exitConfirmTitle: string;
    exitConfirmBody: string;
    exitConfirmCancel: string;
    exitConfirmConfirm: string;
    notAvailableTitle: string;
    notAvailableSubtitle: string;
    backToHome: string;
    energyTitle: string;
    energySubtitle: string;
    progress: string;
    holdLabel: string;
    reps: string;
    setComplete: string;
    rest: string;
    skipRest: string;
    feedbackTitle: string;
    loadLabel: string;
    exerciseFeedbackTitle: string;
  };
  celebration: {
    title: string;
    subtitle_one: string;
    subtitle_other: string;
    continue: string;
  };
  progress: {
    title: string;
    streak_one: string;
    streak_other: string;
    weeklyAdherence: string;
    loadProgression: string;
    loadLatest: string;
    weeklyGoal: string;
    goalProgress: string;
    goalReminderSuffix: string;
    noGoalSet: string;
    editGoal: string;
    setGoal: string;
    howManyThisWeek: string;
    dailyReminderTitle: string;
    dailyReminderDesc: string;
    sessionHistory: string;
    noSessions: string;
    reminderNotEnabledTitle: string;
    reminderNotEnabledBody: string;
    noProfile: string;
    loadErrorTitle: string;
  };
  feedback: {
    easy: string;
    right: string;
    hard: string;
  };
  sessionStatus: {
    completed: string;
    abandoned: string;
    skipped: string;
  };
  muscleGroups: {
    full_body: string;
    legs_glutes: string;
    core: string;
    push: string;
    pull: string;
    chest: string;
    back: string;
    shoulders: string;
    arms: string;
    mobility_cardio: string;
  };
  variants: {
    easier: string;
    base: string;
    harder: string;
  };
  limitations: {
    knees: string;
    back: string;
    shoulders: string;
    wrists: string;
  };
  weekdays: [string, string, string, string, string, string, string];
  exercises: Record<string, ExerciseResource>;
}
