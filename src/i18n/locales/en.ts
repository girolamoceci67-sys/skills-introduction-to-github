import type { LocaleResource } from '../resourceTypes';

const en: LocaleResource = {
  common: {
    continue: 'Continue',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving…',
    retry: 'Retry',
    exit: 'Exit',
  },
  language: {
    title: 'Choose your language',
    subtitle: 'You can change it later from settings.',
    continue: 'Continue',
  },
  auth: {
    createTitle: 'Create your login',
    createSubtitle: 'Choose a username and password to protect the app on this device.',
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in with the credentials created on this device.',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Your username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Your password',
    confirmPasswordLabel: 'Confirm password',
    confirmPasswordPlaceholder: 'Repeat your password',
    createButton: 'Create login',
    loginButton: 'Sign in',
    errorUsernameRequired: 'Enter a username.',
    errorPasswordTooShort: 'Password must be at least 6 characters.',
    errorPasswordMismatch: 'The two passwords don’t match.',
    errorInvalidCredentials: 'Incorrect username or password.',
    forgotHint: 'Credentials are stored only on this device: if you forget them, they cannot be recovered remotely.',
  },
  onboarding: {
    welcomeTitle: 'Let’s get started',
    welcomeBody:
      'A few quick questions to build your first bodyweight workout plan, designed for home with no equipment. The plan will adapt over time based on how you feel after each session.',
    welcomeDisclaimer:
      'This app offers bodyweight exercises at an accessible intensity and does not replace the advice of a doctor or physiotherapist. If you have concerns about your physical condition, consult a professional before starting.',
    start: 'Get started',
    levelTitle: 'Where are you starting from?',
    levelSubtitle: 'This helps calibrate the intensity of your first plan.',
    goalTitle: 'What’s your main goal?',
    goalSubtitle: 'You can change it later from settings.',
    availabilityTitle: 'How many days a week can you train?',
    availabilitySubtitle: 'We’ll spread your workouts across the week, leaving room for recovery.',
    daysPerWeek: '{{count}} days a week',
    limitationsTitle: 'Do you have any physical limitations to flag?',
    limitationsSubtitle: 'We’ll avoid or adapt exercises that involve them directly. You can select more than one.',
    limitationsDisclaimer:
      'This information is only used to personalize exercise selection and is not a medical assessment.',
    equipmentTitle: 'Do you have compact or adjustable dumbbells?',
    equipmentSubtitle:
      'If you do, we’ll unlock a dumbbell exercise module you can alternate or combine with your bodyweight exercises.',
    equipmentYes: 'Yes, I have some',
    equipmentNo: 'No, I don’t',
    equipmentMinLabel: 'Minimum load available (kg)',
    equipmentMaxLabel: 'Maximum load available (kg)',
    createPlan: 'Create my plan',
    preparingPlan: 'Preparing your plan',
    saveErrorTitle: 'We couldn’t save your profile',
    saveErrorSubtitle: 'Check the answers from the previous steps and try again.',
    backToStart: 'Back to start',
    levelOptions: {
      sedentary: { title: 'Starting from scratch', description: 'I haven’t trained regularly in a long time' },
      occasional: { title: 'I move around sometimes', description: 'I do physical activity occasionally' },
      returning: { title: 'Getting back into it', description: 'I used to train consistently and stopped' },
    },
    goalOptions: {
      stay_consistent: {
        title: 'Build a consistent habit',
        description: 'My main goal is to train regularly',
      },
      build_strength_foundation: {
        title: 'Build a strength foundation',
        description: 'I want to feel stronger in everyday movements',
      },
      improve_mobility: {
        title: 'Improve mobility',
        description: 'I’m interested in moving better and more freely',
      },
      general_energy: {
        title: 'Have more energy',
        description: 'I’m looking for an activity that makes me feel better day to day',
      },
    },
    limitationOptions: {
      knees: { title: 'Knees', description: 'I prefer to avoid impact or direct load on my knees' },
      back: { title: 'Back', description: 'I prefer to avoid movements that load the lower back' },
      shoulders: { title: 'Shoulders', description: 'I prefer to avoid overhead or direct-load movements' },
      wrists: { title: 'Wrists', description: 'I prefer to avoid prolonged weight-bearing on my wrists' },
      none: { title: 'No limitations', description: 'I have no limitations to report right now' },
    },
  },
  notifications: {
    reminderChannelName: 'Workout reminders',
    reminderTitle: 'Time to train',
    reminderBody: 'Today’s bodyweight workout is waiting for you.',
  },
  tabs: {
    home: 'Home',
    library: 'Library',
    progress: 'Progress',
  },
  home: {
    title: 'Your plan for this week',
    subtitle: 'Current difficulty level: {{tier}} of 3',
    restDay: 'Rest day',
    today: 'today',
    done: 'done ✓',
    start: 'Start workout',
    redo: 'Redo workout',
    noProfileTitle: 'Profile not found',
    noProfileSubtitle: 'Restart the app to redo onboarding.',
    errorTitle: 'We couldn’t generate your plan',
    dumbbellReaskTitle: 'Do you have dumbbells?',
    dumbbellReaskSubtitle: 'Now that you’ve been training consistently, you could unlock the dumbbell module.',
    dumbbellReaskCta: 'Answer',
    dumbbellReaskDismiss: 'Not now',
    weekCompleteTitle: 'Week complete! 🎉',
    weekCompleteSubtitle: 'You’ve done every planned workout. Your next plan will be ready on Monday.',
  },
  dumbbellReask: {
    title: 'Do you have compact or adjustable dumbbells?',
    subtitle:
      'If you do, we’ll unlock a dumbbell exercise module you can alternate or combine with your bodyweight exercises.',
    yes: 'Yes, I have some',
    no: 'No, I don’t',
    minLabel: 'Minimum load available (kg)',
    maxLabel: 'Maximum load available (kg)',
    confirm: 'Confirm',
    skip: 'Not now',
  },
  library: {
    title: 'Exercise library',
    subtitle: 'All exercises are bodyweight-only, designed for a home space of at least 2x2 m.',
    subtitleWithDumbbell: 'Bodyweight and dumbbell exercises, designed for a home space of at least 2x2 m.',
    levelBadge: 'Base level {{tier}} of 3',
    levelBadgeDumbbell: 'Base level {{tier}} of 3 · {{min}}–{{max}} kg',
    excludedBadge: 'Excluded for some limitations',
    notFound: 'Exercise not found',
    previewCaption: 'Movement preview',
    executionCuesHeading: 'Cues for correct form',
    contraindicationDisclaimer:
      'This exercise is automatically avoided if you’ve flagged limitations to: {{tags}}. This is not a medical assessment: if in doubt, consult a professional.',
  },
  session: {
    exitConfirmTitle: 'Exit workout?',
    exitConfirmBody: 'Progress from this unfinished session will be lost.',
    exitConfirmCancel: 'Keep training',
    exitConfirmConfirm: 'Exit',
    notAvailableTitle: 'Workout not available',
    notAvailableSubtitle: 'Go back to home and try again.',
    backToHome: 'Back to home',
    energyTitle: 'How are you feeling today?',
    energySubtitle: '1 = low energy · 5 = high energy',
    progress: 'Exercise {{current}} of {{total}} — Set {{setCurrent}} of {{setTotal}}',
    holdLabel: 'Hold the position',
    repsTimerLabel: 'Perform the reps',
    reps: '{{count}} reps',
    setComplete: 'Set complete',
    rest: 'Rest',
    skipRest: 'Skip rest',
    feedbackTitle: 'How did it go?',
    loadLabel: 'Load (kg)',
    exerciseFeedbackTitle: 'How did this exercise feel?',
  },
  celebration: {
    title: 'Workout complete!',
    subtitle_one: 'You completed {{count}} exercise out of {{total}}. Great work.',
    subtitle_other: 'You completed {{count}} exercises out of {{total}}. Great work.',
    continue: 'Continue',
  },
  progress: {
    title: 'Progress',
    streak_one: '{{count}} workout in a row',
    streak_other: '{{count}} workouts in a row',
    weeklyAdherence: 'Weekly adherence',
    loadProgression: 'Load per exercise (dumbbell)',
    loadLatest: 'latest: {{kg}} kg',
    weeklyGoal: 'This week’s goal',
    goalProgress: '{{completed}} of {{target}} workouts completed',
    goalReminderSuffix: ' · reminder at {{time}}',
    noGoalSet: 'You haven’t set a goal for this week yet.',
    editGoal: 'Edit goal',
    setGoal: 'Set goal',
    howManyThisWeek: 'How many workouts do you want to complete this week?',
    dailyReminderTitle: 'Daily reminder',
    dailyReminderDesc: 'We’ll notify you every day',
    sessionHistory: 'Session history',
    noSessions: 'No sessions recorded yet.',
    reminderNotEnabledTitle: 'Reminder not enabled',
    reminderNotEnabledBody:
      'Your goal was saved, but without notification permission we can’t remind you to train. You can enable it from your phone settings.',
    noProfile: 'Profile not found',
    loadErrorTitle: 'We couldn’t load your progress',
  },
  feedback: {
    easy: 'Easy',
    right: 'Right',
    hard: 'Hard',
  },
  sessionStatus: {
    completed: 'Completed',
    abandoned: 'Abandoned',
    skipped: 'Skipped',
  },
  muscleGroups: {
    full_body: 'Full body',
    legs_glutes: 'Legs & glutes',
    core: 'Core',
    push: 'Push',
    pull: 'Pull',
    mobility_cardio: 'Mobility & cardio',
    chest: 'Chest',
    back: 'Back',
    shoulders: 'Shoulders',
    arms: 'Arms',
  },
  variants: {
    easier: 'Easier variant',
    base: 'Base variant',
    harder: 'Advanced variant',
  },
  limitations: {
    knees: 'knees',
    back: 'back',
    shoulders: 'shoulders',
    wrists: 'wrists',
  },
  weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  exercises: {
    'legs-squat': {
      name: 'Bodyweight squat',
      instructions: [
        'Stand with feet shoulder-width apart, toes turned slightly outward.',
        'Bend your knees and push your hips back as if sitting on a chair.',
        'Lower until your thighs are comfortable to control, then push through your heels to stand back up.',
      ],
      executionCues: [
        'Your knees track the direction of your toes, without caving inward.',
        'Weight stays spread across the whole foot, heels on the ground.',
        'Your back stays long, without arching or rounding.',
      ],
      easierVariant: {
        name: 'Assisted squat with support',
        instructions: [
          'Stand facing a stable chair or the edge of a piece of furniture, hands resting lightly on it.',
          'Perform the same squat movement, using the support only for balance.',
          'Reduce the depth of the descent if needed.',
        ],
        executionCues: ['Your arms help with balance, not with lifting your body.'],
      },
      harderVariant: {
        name: 'Squat with pause at the bottom',
        instructions: [
          'Perform the squat as in the base version.',
          'At the lowest point, pause for 2 seconds while staying in control.',
          'Push back up through your heels.',
        ],
        executionCues: ['During the pause, your torso stays steady, without wobbling.'],
      },
    },
    'legs-glute-bridge': {
      name: 'Glute bridge',
      instructions: [
        'Lie on your back, knees bent, feet flat on the floor close to your glutes.',
        'Push through your heels and lift your hips upward.',
        'Squeeze your glutes at the top, then lower with control.',
      ],
      executionCues: [
        'The push comes from your heels, not the balls of your feet.',
        'At the top, your body forms a straight line from knees to shoulders, without over-arching your lower back.',
      ],
      easierVariant: {
        name: 'Glute bridge, reduced range',
        instructions: ['Perform the same movement, lifting your hips only a few centimeters.'],
        executionCues: ['A small, controlled movement is better than a wide, abrupt one.'],
      },
      harderVariant: {
        name: 'Glute bridge with pause at the top',
        instructions: [
          'Perform the glute bridge as in the base version.',
          'At the top, hold the position for 2-3 seconds before lowering.',
        ],
        executionCues: ['Keep breathing during the pause, don’t hold your breath.'],
      },
    },
    'legs-split-squat': {
      name: 'Static lunge (split squat)',
      instructions: [
        'Take a long step forward with one foot, keeping the other behind you.',
        'Bend both knees, lowering straight down.',
        'Push back up through your front leg, then repeat on the other side.',
      ],
      executionCues: [
        'Your front knee stays above your ankle, not past your toes.',
        'Your torso stays upright throughout the descent.',
      ],
      easierVariant: {
        name: 'Half static lunge',
        instructions: ['Perform the same movement, reducing the depth of the descent.'],
        executionCues: ['Use a wall or chair for extra balance if needed.'],
      },
      harderVariant: {
        name: 'Static lunge with back-heel raise',
        instructions: [
          'Perform the static lunge while lifting the back foot’s heel off the ground.',
          'Maintain balance throughout the whole rep.',
        ],
        executionCues: ['Move slowly: the added instability calls for more control, not more speed.'],
      },
    },
    'push-wall': {
      name: 'Wall push-up',
      instructions: [
        'Stand about a step away from a wall, hands placed at shoulder height.',
        'Bend your elbows, bringing your chest toward the wall.',
        'Push back to the starting position.',
      ],
      executionCues: [
        'Your body stays in a straight line from head to heels, without arching your back.',
        'Your elbows point slightly backward, not fully out to the sides.',
      ],
      easierVariant: {
        name: 'Wall push-up, hands higher',
        instructions: ['Perform the same movement with your hands placed higher on the wall, to reduce the load.'],
        executionCues: ['The higher your hands, the less effort is required.'],
      },
      harderVariant: {
        name: 'Push-up on a stable raised surface',
        instructions: [
          'Place your hands on a stable, sturdy surface lower than a wall (e.g. a fixed step).',
          'Perform the push-up keeping your body in a straight line.',
        ],
        executionCues: ['Only use stable, non-slip surfaces.'],
      },
    },
    'push-knee': {
      name: 'Knee push-up',
      instructions: [
        'Hands on the ground under your shoulders, knees on the ground, body in a line from knees to head.',
        'Bend your elbows, lowering your chest toward the floor.',
        'Push back to the starting position.',
      ],
      executionCues: [
        'Your core stays gently braced so your hips don’t sag.',
        'Only lower as far as you can while keeping proper form.',
      ],
      easierVariant: {
        name: 'Knee push-up, reduced range',
        instructions: ['Perform the same movement, lowering only halfway.'],
        executionCues: ['Better to reduce the range than to lose your body line.'],
      },
      harderVariant: {
        name: 'Knee push-up with pause at the bottom',
        instructions: ['Perform the knee push-up and pause for 1-2 seconds at the bottom.'],
        executionCues: ['The pause should be controlled, not a collapse toward the floor.'],
      },
    },
    'push-standard': {
      name: 'Standard push-up',
      instructions: [
        'Hands on the ground under your shoulders, legs extended, toes on the ground.',
        'Bend your elbows, lowering your chest toward the floor while keeping your body in a straight line.',
        'Push back to the starting position.',
      ],
      executionCues: [
        'Your body stays as rigid as a plank from head to heels.',
        'If proper form breaks down, it’s better to switch to the knee variant.',
      ],
      easierVariant: {
        name: 'Standard push-up, reduced range',
        instructions: ['Perform the same movement, reducing the depth of the descent.'],
        executionCues: ['A well-executed partial movement is better than a full, sloppy one.'],
      },
      harderVariant: {
        name: 'Standard push-up with pause at the bottom',
        instructions: ['Perform the standard push-up and pause for 2 seconds at the bottom.'],
        executionCues: ['Keep your body rigid during the pause too.'],
      },
    },
    'push-forearm-wall': {
      name: 'Wall forearm push',
      instructions: [
        'Stand facing a wall, forearms resting on the wall at shoulder height, elbows bent.',
        'Push your forearms against the wall, moving your body slightly away, then release with control.',
        'Keep your wrists relaxed: the load passes through your forearms, not your hands.',
      ],
      executionCues: [
        'Your body stays in a straight line, without over-arching your lower back.',
        'A useful alternative when weight-bearing on your hands isn’t comfortable.',
      ],
      easierVariant: {
        name: 'Wall forearm push, reduced range',
        instructions: ['Perform the same movement with a smaller range of motion.'],
        executionCues: ['A minimal movement is fine to start with.'],
      },
      harderVariant: {
        name: 'Wall forearm push with pause',
        instructions: ['Perform the movement and hold the position of maximum push for 2 seconds.'],
        executionCues: ['The pause stays controlled, without arching your back.'],
      },
    },
    'pull-superman': {
      name: 'Superman (back extension)',
      instructions: [
        'Lie face down, arms extended forward, legs extended.',
        'Lift your arms, chest and legs a few centimeters off the ground at the same time.',
        'Lower with control.',
      ],
      executionCues: [
        'Your neck stays long, looking down at the floor ahead of you.',
        'The movement is small and controlled, not a jerk upward.',
      ],
      easierVariant: {
        name: 'Alternating superman',
        instructions: ['Lift one arm and the opposite leg at a time, alternating sides.'],
        executionCues: ['Moving one limb at a time reduces the load on your lower back.'],
      },
      harderVariant: {
        name: 'Superman with isometric pause',
        instructions: ['Perform the superman and hold the lifted position for 2-3 seconds.'],
        executionCues: ['Breathe normally during the pause.'],
      },
    },
    'pull-scapular-retraction': {
      name: 'Standing scapular retraction',
      instructions: [
        'Stand with arms extended forward at shoulder height, elbows slightly bent.',
        'Pull your elbows back, bringing your shoulder blades together, as if squeezing them.',
        'Slowly return to the starting position.',
      ],
      executionCues: [
        'The movement starts from your back, not your arms.',
        'Your shoulders stay low, away from your ears.',
      ],
      easierVariant: {
        name: 'Scapular retraction, reduced range',
        instructions: ['Perform the same movement with a smaller range of motion.'],
        executionCues: ['Even a small, controlled movement trains the right pattern.'],
      },
      harderVariant: {
        name: 'Scapular retraction with pause',
        instructions: ['Perform the retraction and hold the position for 2 seconds before returning.'],
        executionCues: ['Avoid raising your shoulders during the pause.'],
      },
    },
    'pull-prone-swimmer': {
      name: 'Prone swimmer',
      instructions: [
        'Lie face down, arms extended forward, legs extended.',
        'Lift your arms and legs slightly off the ground and alternate small movements like swimming.',
        'Keep a slow, controlled pace.',
      ],
      executionCues: [
        'The movement stays small: you don’t need to lift much to feel it working.',
        'Your neck stays relaxed, looking down.',
      ],
      easierVariant: {
        name: 'Prone swimmer, arms only',
        instructions: ['Perform the movement moving only your arms, keeping your legs on the ground.'],
        executionCues: ['Reduce the body parts involved if your lower back gets too tired.'],
      },
      harderVariant: {
        name: 'Prone swimmer with mid-pause',
        instructions: ['Perform the movement and, halfway through the set, hold your arms and legs lifted for 2 seconds.'],
        executionCues: ['The pause shouldn’t create tension in your neck.'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: 'Seated scapular squeeze',
      instructions: [
        'Sit on a stable chair, back resting against the backrest.',
        'Pull your elbows back, bringing your shoulder blades together, without raising your shoulders.',
        'Slowly return to the starting position.',
      ],
      executionCues: [
        'Your back stays against the backrest throughout the movement.',
        'Your shoulders stay low, away from your ears.',
      ],
      easierVariant: {
        name: 'Seated scapular squeeze, reduced range',
        instructions: ['Perform the same movement with a smaller range of motion.'],
        executionCues: ['Even a small, controlled movement trains the right pattern.'],
      },
      harderVariant: {
        name: 'Seated scapular squeeze with pause',
        instructions: ['Perform the squeeze and hold the position for 2 seconds before returning.'],
        executionCues: ['Avoid raising your shoulders during the pause.'],
      },
    },
    'core-knee-plank': {
      name: 'Knee plank',
      instructions: [
        'Forearms on the ground under your shoulders, knees on the ground.',
        'Lift your hips, forming a straight line from knees to head.',
        'Hold the position, breathing calmly.',
      ],
      executionCues: [
        'Your hips don’t sag down or rise too high.',
        'Your core stays gently braced for the whole duration.',
      ],
      easierVariant: {
        name: 'Knee plank, shorter hold',
        instructions: ['Hold the position for a shorter time, with more breaks between sets.'],
        executionCues: ['Several short, correct holds are better than one long, incorrect one.'],
      },
      harderVariant: {
        name: 'Standard plank (on toes)',
        instructions: ['Perform the same plank lifting your knees off the ground, resting on your toes.'],
        executionCues: ['Your body stays in a straight line from head to heels.'],
      },
    },
    'core-dead-bug': {
      name: 'Dead bug',
      instructions: [
        'Lie on your back, arms extended toward the ceiling, knees bent at 90 degrees above your hips.',
        'Slowly extend one arm behind your head and the opposite leg toward the floor, without touching it.',
        'Return to the starting position and repeat on the other side.',
      ],
      executionCues: [
        'Your lower back stays in contact with the floor throughout the movement.',
        'The movement is slow: speed is not the goal.',
      ],
      easierVariant: {
        name: 'Dead bug, reduced range',
        instructions: ['Perform the same movement, lowering the arm and leg only partway.'],
        executionCues: ['Reduce the range if your lower back lifts off the floor.'],
      },
      harderVariant: {
        name: 'Dead bug with pause at extension',
        instructions: ['Perform the dead bug and, with arm and leg extended, hold the position for 1-2 seconds.'],
        executionCues: ['The pause shouldn’t make your back arch.'],
      },
    },
    'core-bird-dog': {
      name: 'Bird dog',
      instructions: [
        'Hands and knees on the ground, back in a neutral position.',
        'Extend one arm forward and the opposite leg backward, keeping your hips stable.',
        'Return to the starting position and repeat on the other side.',
      ],
      executionCues: [
        'Your hips stay parallel to the floor, without rotating.',
        'Move slowly: balance matters more than range of motion.',
      ],
      easierVariant: {
        name: 'Bird dog, one limb at a time',
        instructions: ['Extend only the arm or only the leg at a time, instead of together.'],
        executionCues: ['It’s easier to keep your balance moving a single limb.'],
      },
      harderVariant: {
        name: 'Bird dog with pause at extension',
        instructions: ['Perform the bird dog and hold the extended position for 2-3 seconds.'],
        executionCues: ['Keep breathing during the pause.'],
      },
    },
    'core-standing-brace': {
      name: 'Standing core brace',
      instructions: [
        'Stand with hands on your hips or crossed over your chest, feet hip-width apart.',
        'Gently brace your core, as if pulling your belly button away from your waistband.',
        'Hold the contraction for a few seconds while breathing normally, then release.',
      ],
      executionCues: [
        'Your hips stay still, without arching or rounding your lower back.',
        'The contraction is light and sustainable, not a total tightening.',
      ],
      easierVariant: {
        name: 'Standing core brace, shorter hold',
        instructions: ['Hold the contraction for a shorter time, with more short reps.'],
        executionCues: ['Several short holds are better than one long one with loss of control.'],
      },
      harderVariant: {
        name: 'Standing core brace with slight forward lean',
        instructions: [
          'Perform the core brace and, while holding it, lean your torso slightly forward.',
          'Return to standing with control.',
        ],
        executionCues: ['The lean stays minimal: control matters more than range.'],
      },
    },
    'mobility-march': {
      name: 'March in place',
      instructions: [
        'Standing, start marching in place, lifting your feet alternately.',
        'Move your arms naturally, as if walking.',
        'Keep a pace that lets you breathe without excessive strain.',
      ],
      executionCues: ['Your steps stay light: no hard impact on the floor.'],
      easierVariant: {
        name: 'Slow march',
        instructions: ['Perform the march at a slower pace, with minimal foot lift.'],
        executionCues: ['You can rest lightly on a support if you need balance.'],
      },
      harderVariant: {
        name: 'High-knee march',
        instructions: ['Perform the march lifting your knees higher, while staying in control.'],
        executionCues: ['Your torso stays upright even as your knees rise.'],
      },
    },
    'mobility-step-touch': {
      name: 'Side step touch',
      instructions: [
        'Standing, take a side step with one foot, then bring the other foot in without crossing it.',
        'Repeat on the other side, alternating.',
        'Keep your knees soft during the movement.',
      ],
      executionCues: ['The movements stay fluid, without sudden jerks.'],
      easierVariant: {
        name: 'Step touch, smaller step',
        instructions: ['Perform the same movement with shorter side steps.'],
        executionCues: ['Reduce the range if you feel unstable.'],
      },
      harderVariant: {
        name: 'Step touch with arms involved',
        instructions: ['Perform the step touch adding a fluid upward arm movement with each step.'],
        executionCues: ['Your arms move in a controlled way, without abrupt swings.'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: 'Hip and shoulder circles',
      instructions: [
        'Standing, hands on your hips, perform slow hip circles in one direction, then the other.',
        'Then perform shoulder circles, lifting them forward-up-back-down.',
        'Move within a comfortable range.',
      ],
      executionCues: ['The movement stays slow and controlled, without forcing the end range of motion.'],
      easierVariant: {
        name: 'Circles, smaller range',
        instructions: ['Perform the same movement with smaller circles.'],
        executionCues: ['It’s fine to reduce the range if an area feels stiffer.'],
      },
      harderVariant: {
        name: 'Circles with larger range and reps',
        instructions: ['Perform the same movement with larger circles, while staying in control.'],
        executionCues: ['Increase the range only if it stays comfortable.'],
      },
    },
    'fullbody-cat-cow': {
      name: 'Cat-cow (spinal mobility)',
      instructions: [
        'Hands and knees on the ground, back in a neutral position.',
        'Inhale, gently arching your back downward and lifting your gaze.',
        'Exhale, rounding your back upward and bringing your chin toward your chest.',
      ],
      executionCues: ['The movement follows your breath, without forcing the range.'],
      easierVariant: {
        name: 'Cat-cow, reduced movement',
        instructions: ['Perform the same movement with a smaller range of motion.'],
        executionCues: ['A minimal movement is fine if your back is stiff.'],
      },
      harderVariant: {
        name: 'Cat-cow with pause at end range',
        instructions: ['Perform the movement and, at the end of the range, hold the position for 1-2 seconds.'],
        executionCues: ['The pause stays comfortable, without tension.'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'Sit-to-stand',
      instructions: [
        'Sit on the edge of a stable chair, feet flat on the ground.',
        'Lean slightly forward and stand up without using your hands, if possible.',
        'Sit back down with control, without dropping into the seat.',
      ],
      executionCues: ['The movement is slow both going up and going down.'],
      easierVariant: {
        name: 'Assisted sit-to-stand',
        instructions: ['Perform the same movement helping yourself with your hands on the armrests or knees.'],
        executionCues: ['Using your hands is not a problem: what matters is control of the movement.'],
      },
      harderVariant: {
        name: 'Slow sit-to-stand',
        instructions: ['Perform the movement slowing down both the rising and lowering phases.'],
        executionCues: ['Slowing down increases the effort required without needing to jump or push hard.'],
      },
    },
    'db-chest-floor-press': {
      name: 'Floor press',
      instructions: [
        'Lie on your back, knees bent, a dumbbell in each hand resting on your chest.',
        'Press the dumbbells upward until your arms are nearly fully extended.',
        'Lower with control until your elbows lightly touch the floor.',
      ],
      executionCues: [
        'Your elbows stay at about 45 degrees from your torso, not fully flared out.',
        'Your wrists stay stacked above your elbows during the press.',
      ],
      easierVariant: {
        name: 'Floor press, lighter load',
        instructions: ['Perform the same movement with a lighter dumbbell, reducing the range if needed.'],
        executionCues: ['A full range with less weight is better than a partial range with more weight.'],
      },
      harderVariant: {
        name: 'Floor press with pause at the bottom',
        instructions: ['Perform the press and, with your elbows near the floor, pause for 2 seconds.'],
        executionCues: ['The pause stays controlled, without bouncing off the floor.'],
      },
    },
    'db-chest-floor-fly': {
      name: 'Floor fly',
      instructions: [
        'Lie on your back, knees bent, a dumbbell in each hand, arms extended above your chest.',
        'Open your arms out to the sides, lowering the dumbbells with elbows slightly bent, until close to the floor.',
        'Bring your arms back together above your chest following the same arc.',
      ],
      executionCues: [
        'Your elbows keep a slight, fixed bend throughout the movement.',
        'The movement is a wide arc, not a vertical press.',
      ],
      easierVariant: {
        name: 'Floor fly, reduced range',
        instructions: ['Perform the same movement opening your arms only partway.'],
        executionCues: ['Reduce the range if you feel tension in your shoulder.'],
      },
      harderVariant: {
        name: 'Floor fly with pause at the open position',
        instructions: ['Perform the fly and, with your arms nearly at the floor, hold the position for 1-2 seconds.'],
        executionCues: ['The pause stays light, without forcing your shoulder.'],
      },
    },
    'db-back-bent-row': {
      name: 'Bent-over row',
      instructions: [
        'Feet hip-width apart, knees slightly bent, torso leaning forward, a dumbbell in each hand.',
        'Pull the dumbbells toward your abdomen, bringing your elbows back and your shoulder blades together.',
        'Lower with control until your arms are nearly fully extended.',
      ],
      executionCues: [
        'Your back stays long throughout the movement, without rounding.',
        'The movement starts from your back, not just a bend of the elbow.',
      ],
      easierVariant: {
        name: 'Bent-over row with less forward lean',
        instructions: ['Perform the same movement leaning your torso less forward, to reduce the load on your back.'],
        executionCues: ['Still keep your back long.'],
      },
      harderVariant: {
        name: 'Bent-over row with pause at the top',
        instructions: ['Perform the row and, with your elbows back, hold the position for 1-2 seconds.'],
        executionCues: ['Your shoulder blades stay together during the pause.'],
      },
    },
    'db-back-single-row': {
      name: 'Single-arm row',
      instructions: [
        'Rest the hand and knee on the same side on a chair or stable surface, torso parallel to the floor.',
        'With your other hand, pull the dumbbell toward your hip, bringing your elbow back.',
        'Lower with control, then repeat on the other side.',
      ],
      executionCues: [
        'Your torso stays still, without rotating during the pull.',
        'Your elbow stays close to your torso during the movement.',
      ],
      easierVariant: {
        name: 'Single-arm row, reduced range',
        instructions: ['Perform the same movement with a smaller range of motion.'],
        executionCues: ['Reduce the range if your torso tends to rotate.'],
      },
      harderVariant: {
        name: 'Single-arm row with pause at the top',
        instructions: ['Perform the pull and, with your elbow back, hold the position for 1-2 seconds.'],
        executionCues: ['Your torso stays stable throughout the pause.'],
      },
    },
    'db-shoulder-press': {
      name: 'Overhead press',
      instructions: [
        'Standing or seated, a dumbbell in each hand at shoulder height, palms facing forward.',
        'Press the dumbbells upward until your arms are nearly fully extended.',
        'Lower with control back to shoulder height.',
      ],
      executionCues: [
        'Avoid arching your back during the press: your torso stays stable.',
        'The dumbbells follow a vertical path, not forward.',
      ],
      easierVariant: {
        name: 'Seated overhead press',
        instructions: ['Perform the same movement seated, with your back supported, to reduce torso involvement.'],
        executionCues: ['Focus only on the arm movement.'],
      },
      harderVariant: {
        name: 'Alternating overhead press',
        instructions: ['Perform the press with one arm at a time, keeping your torso stable.'],
        executionCues: ['Avoid leaning sideways during the single-arm press.'],
      },
    },
    'db-shoulder-lateral-raise': {
      name: 'Lateral raise',
      instructions: [
        'Standing, a dumbbell in each hand at your sides, elbows slightly bent.',
        'Lift your arms out to the sides up to shoulder height.',
        'Lower with control back to the starting position.',
      ],
      executionCues: [
        'The movement starts from your shoulders, not a swing of the arms.',
        'Your wrists stay slightly lower than your elbows as you lift.',
      ],
      easierVariant: {
        name: 'Lateral raise, reduced range',
        instructions: ['Perform the same movement lifting your arms only halfway up.'],
        executionCues: ['Reduce the range if you feel tension in your neck.'],
      },
      harderVariant: {
        name: 'Lateral raise with pause at the top',
        instructions: ['Perform the raise and, with your arms at shoulder height, hold the position for 1-2 seconds.'],
        executionCues: ['Your shoulders stay low even during the pause.'],
      },
    },
    'db-shoulder-front-raise': {
      name: 'Front raise',
      instructions: [
        'Standing, a dumbbell in each hand in front of your thighs, elbows slightly bent.',
        'Lift one arm forward up to shoulder height.',
        'Lower with control, then repeat with the other arm or alternate.',
      ],
      executionCues: [
        'Your torso stays still, without using momentum from your back to lift the weight.',
        'The movement stops at shoulder height, not beyond.',
      ],
      easierVariant: {
        name: 'Front raise, reduced range',
        instructions: ['Perform the same movement lifting your arm only halfway up.'],
        executionCues: ['Reduce the range if your torso tends to lean back.'],
      },
      harderVariant: {
        name: 'Front raise with pause at the top',
        instructions: ['Perform the raise and, with your arm at shoulder height, hold the position for 1-2 seconds.'],
        executionCues: ['Your torso stays still throughout the pause.'],
      },
    },
    'db-arms-bicep-curl': {
      name: 'Bicep curl',
      instructions: [
        'Standing, a dumbbell in each hand at your sides, palms facing forward.',
        'Bend your elbows, lifting the dumbbells toward your shoulders.',
        'Lower with control until your arms are nearly fully extended.',
      ],
      executionCues: [
        'Your elbows stay close to your torso throughout the movement.',
        'Avoid using momentum from your back to lift the weight.',
      ],
      easierVariant: {
        name: 'Bicep curl against a wall',
        instructions: ['Perform the same movement with your back against a wall, to reduce momentum.'],
        executionCues: ['Contact with the wall helps isolate the movement.'],
      },
      harderVariant: {
        name: 'Alternating bicep curl with pause',
        instructions: ['Perform the curl with one arm at a time, holding the top position for 1-2 seconds.'],
        executionCues: ['The resting arm stays extended and relaxed during the alternation.'],
      },
    },
    'db-arms-hammer-curl': {
      name: 'Hammer curl',
      instructions: [
        'Standing, a dumbbell in each hand at your sides, palms facing your body.',
        'Bend your elbows, lifting the dumbbells toward your shoulders, keeping your palms facing inward.',
        'Lower with control until your arms are nearly fully extended.',
      ],
      executionCues: [
        'Your wrists stay still and aligned with your forearms throughout the movement.',
        'Your elbows stay close to your torso.',
      ],
      easierVariant: {
        name: 'Hammer curl against a wall',
        instructions: ['Perform the same movement with your back against a wall.'],
        executionCues: ['Contact with the wall reduces momentum.'],
      },
      harderVariant: {
        name: 'Alternating hammer curl with pause',
        instructions: ['Perform the curl with one arm at a time, holding the top position for 1-2 seconds.'],
        executionCues: ['Your torso stays stable during the alternation.'],
      },
    },
    'db-arms-tricep-extension': {
      name: 'Overhead tricep extension',
      instructions: [
        'Standing or seated, hold a dumbbell with both hands overhead, arms nearly extended.',
        'Bend your elbows, lowering the dumbbell behind your head.',
        'Extend your arms, returning to the starting position.',
      ],
      executionCues: [
        'Your elbows stay pointed forward, without flaring out to the sides.',
        'The movement happens only at the elbow, your torso stays still.',
      ],
      easierVariant: {
        name: 'Tricep extension, reduced range',
        instructions: ['Perform the same movement reducing the depth of the descent.'],
        executionCues: ['Reduce the range if you feel tension in your shoulder.'],
      },
      harderVariant: {
        name: 'Tricep extension with pause at the bottom',
        instructions: ['Perform the extension and, with your elbows bent, hold the position for 1-2 seconds.'],
        executionCues: ['Your elbows stay still during the pause.'],
      },
    },
    'db-legs-goblet-squat': {
      name: 'Goblet squat',
      instructions: [
        'Standing, feet shoulder-width apart, a dumbbell held vertically with both hands in front of your chest.',
        'Bend your knees and lower into a squat, keeping the dumbbell close to your body.',
        'Push through your heels back up to the starting position.',
      ],
      executionCues: [
        'Your knees track the direction of your toes.',
        'Your torso stays as upright as possible during the descent.',
      ],
      easierVariant: {
        name: 'Goblet squat, reduced range',
        instructions: ['Perform the same movement reducing the depth of the descent.'],
        executionCues: ['Use a lighter dumbbell if the full depth is hard to control.'],
      },
      harderVariant: {
        name: 'Goblet squat with pause at the bottom',
        instructions: ['Perform the squat and, at the lowest point, hold the position for 2 seconds.'],
        executionCues: ['Your torso stays stable during the pause.'],
      },
    },
    'db-legs-rdl': {
      name: 'Romanian deadlift',
      instructions: [
        'Standing, a dumbbell in each hand in front of your thighs, knees slightly bent.',
        'Push your hips back, lowering the dumbbells along your legs, keeping your back long.',
        'Push your hips forward back up to standing.',
      ],
      executionCues: [
        'The dumbbells stay close to your legs throughout the movement.',
        'Your back stays long, without rounding during the descent.',
      ],
      easierVariant: {
        name: 'Romanian deadlift, reduced range',
        instructions: ['Perform the same movement lowering only halfway.'],
        executionCues: ['Reduce the range if your back struggles to stay long.'],
      },
      harderVariant: {
        name: 'Romanian deadlift with pause at the bottom',
        instructions: ['Perform the deadlift and, at the lowest point, hold the position for 2 seconds.'],
        executionCues: ['Your back stays long even during the pause.'],
      },
    },
    'db-core-russian-twist': {
      name: 'Weighted Russian twist',
      instructions: [
        'Seated, knees bent, torso leaning slightly back, a dumbbell held with both hands in front of your chest.',
        'Rotate your torso, bringing the dumbbell to one side, then the other.',
        'Keep a controlled pace throughout the set.',
      ],
      executionCues: [
        'The movement starts from your torso, not just your arms.',
        'Keep your back long, without rounding during the rotation.',
      ],
      easierVariant: {
        name: 'Russian twist with feet on the ground',
        instructions: ['Perform the same movement keeping your feet on the ground, for more stability.'],
        executionCues: ['Use a lighter dumbbell if your torso struggles to stay stable.'],
      },
      harderVariant: {
        name: 'Russian twist with feet lifted',
        instructions: ['Perform the twist keeping your feet lifted off the ground for the whole set.'],
        executionCues: ['Balance requires a slower, more controlled pace.'],
      },
    },
    'db-core-suitcase-carry': {
      name: 'Suitcase carry',
      instructions: [
        'Standing, a heavy dumbbell held in one hand at your side, other arm free for balance.',
        'Walk in a straight line or in place, keeping your torso upright and shoulders level.',
        'Switch arms halfway through if the set calls for it.',
      ],
      executionCues: [
        'Your shoulders stay level, without leaning toward the loaded side.',
        'Your steps stay short and controlled, not rushed.',
      ],
      easierVariant: {
        name: 'Suitcase carry, lighter load',
        instructions: ['Perform the same exercise with a lighter dumbbell.'],
        executionCues: ['Reduce the load if your shoulders tend to tilt.'],
      },
      harderVariant: {
        name: 'Suitcase carry with mid-pause',
        instructions: ['Perform the carry and, halfway through, stop and hold the position for 2-3 seconds.'],
        executionCues: ['Your torso stays upright during the pause too.'],
      },
    },
    'db-fullbody-thruster': {
      name: 'Thruster',
      instructions: [
        'Standing, a dumbbell in each hand at shoulder height, feet shoulder-width apart.',
        'Lower into a squat, then push back up through your heels while pressing the dumbbells overhead.',
        'Lower with control, bringing the dumbbells back to shoulder height.',
      ],
      executionCues: [
        'The upward drive comes from your legs, not just your arms.',
        'The movement stays fluid, without abrupt pauses between squat and press.',
      ],
      easierVariant: {
        name: 'Thruster in two steps',
        instructions: ['Perform the full squat first, then the overhead press, as two separate movements.'],
        executionCues: ['It’s fine to break the movement apart until it feels natural.'],
      },
      harderVariant: {
        name: 'Thruster with pause at the bottom',
        instructions: ['Perform the thruster and, at the lowest point of the squat, hold for 1-2 seconds before standing and pressing.'],
        executionCues: ['Your torso stays stable during the pause.'],
      },
    },
    'db-fullbody-renegade-row': {
      name: 'Renegade row',
      instructions: [
        'In a high plank position, a dumbbell in each hand on the floor under your shoulders.',
        'Pull one dumbbell toward your hip, keeping your hips stable, then set it back down.',
        'Repeat on the other side, alternating.',
      ],
      executionCues: [
        'Your hips stay parallel to the floor, without rotating during the pull.',
        'Slightly wider feet help with stability.',
      ],
      easierVariant: {
        name: 'Renegade row on your knees',
        instructions: ['Perform the same movement with your knees on the ground instead of a high plank.'],
        executionCues: ['This reduces the load on your hips while keeping the pulling pattern.'],
      },
      harderVariant: {
        name: 'Renegade row with push-up',
        instructions: ['Perform the pull on each side, then add a push-up before repeating.'],
        executionCues: ['Add the push-up only if you can keep your hips stable.'],
      },
    },
  },
};

export default en;
