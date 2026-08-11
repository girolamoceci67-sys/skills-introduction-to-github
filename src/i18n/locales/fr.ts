import type { LocaleResource } from '../resourceTypes';

const fr: LocaleResource = {
  common: {
    continue: 'Continuer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    retry: 'Réessayer',
    exit: 'Quitter',
  },
  language: {
    title: 'Choisissez votre langue',
    subtitle: 'Vous pourrez la changer plus tard dans les paramètres.',
    continue: 'Continuer',
  },
  auth: {
    createTitle: 'Créez votre accès',
    createSubtitle: 'Choisissez un nom d’utilisateur et un mot de passe pour protéger l’application sur cet appareil.',
    loginTitle: 'Bon retour',
    loginSubtitle: 'Connectez-vous avec les identifiants créés sur cet appareil.',
    usernameLabel: 'Nom d’utilisateur',
    usernamePlaceholder: 'Votre nom d’utilisateur',
    passwordLabel: 'Mot de passe',
    passwordPlaceholder: 'Votre mot de passe',
    confirmPasswordLabel: 'Confirmer le mot de passe',
    confirmPasswordPlaceholder: 'Répétez votre mot de passe',
    createButton: 'Créer l’accès',
    loginButton: 'Se connecter',
    errorUsernameRequired: 'Entrez un nom d’utilisateur.',
    errorPasswordTooShort: 'Le mot de passe doit contenir au moins 6 caractères.',
    errorPasswordMismatch: 'Les deux mots de passe ne correspondent pas.',
    errorInvalidCredentials: 'Nom d’utilisateur ou mot de passe incorrect.',
    forgotHint:
      'Les identifiants sont enregistrés uniquement sur cet appareil : si vous les oubliez, ils ne peuvent pas être récupérés à distance.',
  },
  onboarding: {
    welcomeTitle: 'Commençons',
    welcomeBody:
      'Quelques questions rapides pour construire votre premier programme d’entraînement au poids du corps, pensé pour la maison sans équipement. Le programme s’adaptera dans le temps selon votre ressenti après chaque séance.',
    welcomeDisclaimer:
      'Cette application propose des exercices au poids du corps à une intensité accessible et ne remplace pas l’avis d’un médecin ou d’un kinésithérapeute. En cas de doute sur votre condition physique, consultez un professionnel avant de commencer.',
    start: 'Commencer',
    levelTitle: 'D’où partez-vous ?',
    levelSubtitle: 'Cela permet de calibrer l’intensité de votre premier programme.',
    goalTitle: 'Quel est votre objectif principal ?',
    goalSubtitle: 'Vous pourrez le changer plus tard dans les paramètres.',
    availabilityTitle: 'Combien de jours par semaine pouvez-vous vous entraîner ?',
    availabilitySubtitle: 'Nous répartirons vos séances dans la semaine, en laissant de la place à la récupération.',
    daysPerWeek: '{{count}} jours par semaine',
    limitationsTitle: 'Avez-vous des limitations physiques à signaler ?',
    limitationsSubtitle:
      'Nous éviterons ou adapterons les exercices qui les sollicitent directement. Vous pouvez en sélectionner plusieurs.',
    limitationsDisclaimer:
      'Ces informations servent uniquement à personnaliser la sélection des exercices et ne constituent pas une évaluation médicale.',
    equipmentTitle: 'Avez-vous des haltères compacts ou réglables ?',
    equipmentSubtitle:
      'Si c’est le cas, nous débloquerons un module d’exercices avec haltères à alterner ou combiner avec vos exercices au poids du corps.',
    equipmentYes: 'Oui, j’en ai',
    equipmentNo: 'Non, je n’en ai pas',
    equipmentMinLabel: 'Charge minimale disponible (kg)',
    equipmentMaxLabel: 'Charge maximale disponible (kg)',
    createPlan: 'Créer mon programme',
    preparingPlan: 'Préparation de votre programme',
    saveErrorTitle: 'Nous n’avons pas pu enregistrer votre profil',
    saveErrorSubtitle: 'Vérifiez les réponses des étapes précédentes et réessayez.',
    backToStart: 'Retour au début',
    levelOptions: {
      sedentary: { title: 'Je pars de zéro', description: 'Je ne me suis pas entraîné régulièrement depuis longtemps' },
      occasional: { title: 'Je bouge de temps en temps', description: 'Je fais de l’activité physique occasionnellement' },
      returning: { title: 'Je reprends le sport', description: 'Je m’entraînais régulièrement et j’ai arrêté' },
    },
    goalOptions: {
      stay_consistent: {
        title: 'Créer une habitude régulière',
        description: 'Mon objectif principal est de m’entraîner régulièrement',
      },
      build_strength_foundation: {
        title: 'Développer une base de force',
        description: 'Je veux me sentir plus fort dans les mouvements du quotidien',
      },
      improve_mobility: {
        title: 'Améliorer ma mobilité',
        description: 'Je souhaite bouger mieux et plus librement',
      },
      general_energy: {
        title: 'Avoir plus d’énergie',
        description: 'Je cherche une activité qui me fait sentir mieux au quotidien',
      },
    },
    limitationOptions: {
      knees: { title: 'Genoux', description: 'Je préfère éviter les impacts ou les charges directes sur mes genoux' },
      back: { title: 'Dos', description: 'Je préfère éviter les mouvements qui sollicitent le bas du dos' },
      shoulders: { title: 'Épaules', description: 'Je préfère éviter les mouvements en hauteur ou à charge directe' },
      wrists: { title: 'Poignets', description: 'Je préfère éviter un appui prolongé sur mes poignets' },
      none: { title: 'Aucune limitation', description: 'Je n’ai aucune limitation à signaler pour le moment' },
    },
  },
  notifications: {
    reminderChannelName: 'Rappels d’entraînement',
    reminderTitle: 'C’est l’heure de s’entraîner',
    reminderBody: 'Votre séance au poids du corps du jour vous attend.',
  },
  tabs: {
    home: 'Accueil',
    library: 'Bibliothèque',
    progress: 'Progrès',
  },
  home: {
    title: 'Votre programme de la semaine',
    subtitle: 'Niveau de difficulté actuel : {{tier}} sur 3',
    restDay: 'Jour de repos',
    today: 'aujourd’hui',
    done: 'terminé ✓',
    start: 'Démarrer la séance',
    redo: 'Refaire la séance',
    noProfileTitle: 'Profil introuvable',
    noProfileSubtitle: 'Redémarrez l’application pour refaire l’inscription.',
    errorTitle: 'Nous n’avons pas pu générer votre programme',
    dumbbellReaskTitle: 'Avez-vous des haltères ?',
    dumbbellReaskSubtitle: 'Maintenant que vous vous entraînez avec régularité, vous pourriez débloquer le module haltères.',
    dumbbellReaskCta: 'Répondre',
    dumbbellReaskDismiss: 'Pas maintenant',
    weekCompleteTitle: 'Semaine terminée ! 🎉',
    weekCompleteSubtitle: 'Vous avez fait toutes les séances prévues. Votre prochain programme sera prêt lundi.',
  },
  dumbbellReask: {
    title: 'Avez-vous des haltères compacts ou réglables ?',
    subtitle:
      'Si c’est le cas, nous débloquerons un module d’exercices avec haltères à alterner ou combiner avec vos exercices au poids du corps.',
    yes: 'Oui, j’en ai',
    no: 'Non, je n’en ai pas',
    minLabel: 'Charge minimale disponible (kg)',
    maxLabel: 'Charge maximale disponible (kg)',
    confirm: 'Confirmer',
    skip: 'Pas maintenant',
  },
  library: {
    title: 'Bibliothèque d’exercices',
    subtitle: 'Tous les exercices se font au poids du corps, pensés pour un espace domestique d’au moins 2x2 m.',
    subtitleWithDumbbell:
      'Exercices au poids du corps et avec haltères, pensés pour un espace domestique d’au moins 2x2 m.',
    levelBadge: 'Niveau de base {{tier}} sur 3',
    levelBadgeDumbbell: 'Niveau de base {{tier}} sur 3 · {{min}}–{{max}} kg',
    excludedBadge: 'Exclu pour certaines limitations',
    notFound: 'Exercice introuvable',
    previewCaption: 'Aperçu du mouvement',
    executionCuesHeading: 'Repères pour une bonne exécution',
    contraindicationDisclaimer:
      'Cet exercice est automatiquement évité si vous avez signalé des limitations : {{tags}}. Ceci n’est pas une évaluation médicale : en cas de doute, consultez un professionnel.',
  },
  session: {
    exitConfirmTitle: 'Quitter la séance ?',
    exitConfirmBody: 'La progression de cette séance non terminée sera perdue.',
    exitConfirmCancel: 'Continuer l’entraînement',
    exitConfirmConfirm: 'Quitter',
    notAvailableTitle: 'Séance non disponible',
    notAvailableSubtitle: 'Retournez à l’accueil et réessayez.',
    backToHome: 'Retour à l’accueil',
    energyTitle: 'Comment vous sentez-vous aujourd’hui ?',
    energySubtitle: '1 = peu d’énergie · 5 = beaucoup d’énergie',
    progress: 'Exercice {{current}} sur {{total}} — Série {{setCurrent}} sur {{setTotal}}',
    holdLabel: 'Maintenez la position',
    reps: '{{count}} répétitions',
    setComplete: 'Série terminée',
    rest: 'Repos',
    skipRest: 'Passer le repos',
    feedbackTitle: 'Comment ça s’est passé ?',
    loadLabel: 'Charge (kg)',
    exerciseFeedbackTitle: 'Comment avez-vous ressenti cet exercice ?',
  },
  celebration: {
    title: 'Séance terminée !',
    subtitle_one: 'Vous avez complété {{count}} exercice sur {{total}}. Bravo.',
    subtitle_other: 'Vous avez complété {{count}} exercices sur {{total}}. Bravo.',
    continue: 'Continuer',
  },
  progress: {
    title: 'Progrès',
    streak_one: '{{count}} séance d’affilée',
    streak_other: '{{count}} séances d’affilée',
    weeklyAdherence: 'Assiduité hebdomadaire',
    loadProgression: 'Charge par exercice (haltères)',
    loadLatest: 'dernière : {{kg}} kg',
    weeklyGoal: 'Objectif de cette semaine',
    goalProgress: '{{completed}} séances sur {{target}} complétées',
    goalReminderSuffix: ' · rappel à {{time}}',
    noGoalSet: 'Vous n’avez pas encore défini d’objectif pour cette semaine.',
    editGoal: 'Modifier l’objectif',
    setGoal: 'Définir un objectif',
    howManyThisWeek: 'Combien de séances voulez-vous compléter cette semaine ?',
    dailyReminderTitle: 'Rappel quotidien',
    dailyReminderDesc: 'Nous vous préviendrons chaque jour',
    sessionHistory: 'Historique des séances',
    noSessions: 'Aucune séance enregistrée pour le moment.',
    reminderNotEnabledTitle: 'Rappel non activé',
    reminderNotEnabledBody:
      'Votre objectif a été enregistré, mais sans autorisation de notification nous ne pouvons pas vous rappeler de vous entraîner. Vous pouvez l’activer depuis les paramètres de votre téléphone.',
    noProfile: 'Profil introuvable',
    loadErrorTitle: 'Nous n’avons pas pu charger vos progrès',
  },
  feedback: {
    easy: 'Facile',
    right: 'Juste',
    hard: 'Difficile',
  },
  sessionStatus: {
    completed: 'Terminée',
    abandoned: 'Abandonnée',
    skipped: 'Ignorée',
  },
  muscleGroups: {
    full_body: 'Corps entier',
    legs_glutes: 'Jambes et fessiers',
    core: 'Gainage',
    push: 'Poussée',
    pull: 'Tirage',
    mobility_cardio: 'Mobilité et cardio',
    chest: 'Pectoraux',
    back: 'Dos',
    shoulders: 'Épaules',
    arms: 'Bras',
  },
  variants: {
    easier: 'Variante facilitée',
    base: 'Variante de base',
    harder: 'Variante avancée',
  },
  limitations: {
    knees: 'genoux',
    back: 'dos',
    shoulders: 'épaules',
    wrists: 'poignets',
  },
  weekdays: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  exercises: {
    'legs-squat': {
      name: 'Squat au poids du corps',
      instructions: [
        'Tenez-vous debout, pieds à largeur d’épaules, orteils légèrement tournés vers l’extérieur.',
        'Pliez les genoux et poussez les hanches vers l’arrière comme pour vous asseoir sur une chaise.',
        'Descendez jusqu’à une profondeur que vous contrôlez confortablement, puis remontez en poussant sur les talons.',
      ],
      executionCues: [
        'Vos genoux suivent la direction de vos orteils, sans s’effondrer vers l’intérieur.',
        'Le poids reste réparti sur tout le pied, talons au sol.',
        'Votre dos reste long, sans se cambrer ni s’arrondir.',
      ],
      easierVariant: {
        name: 'Squat assisté avec appui',
        instructions: [
          'Tenez-vous face à une chaise stable ou au bord d’un meuble, mains posées légèrement dessus.',
          'Effectuez le même mouvement de squat, en utilisant l’appui seulement pour l’équilibre.',
          'Réduisez la profondeur de la descente si nécessaire.',
        ],
        executionCues: ['Vos bras aident à l’équilibre, pas à soulever votre corps.'],
      },
      harderVariant: {
        name: 'Squat avec pause en bas',
        instructions: [
          'Effectuez le squat comme dans la version de base.',
          'Au point le plus bas, marquez une pause de 2 secondes en gardant le contrôle.',
          'Remontez en poussant sur les talons.',
        ],
        executionCues: ['Pendant la pause, votre buste reste stable, sans vaciller.'],
      },
    },
    'legs-glute-bridge': {
      name: 'Pont fessier',
      instructions: [
        'Allongez-vous sur le dos, genoux pliés, pieds à plat au sol près des fessiers.',
        'Poussez sur les talons et soulevez les hanches vers le haut.',
        'Contractez les fessiers en haut, puis redescendez avec contrôle.',
      ],
      executionCues: [
        'La poussée vient des talons, pas de l’avant du pied.',
        'En haut, votre corps forme une ligne droite des genoux aux épaules, sans trop cambrer le bas du dos.',
      ],
      easierVariant: {
        name: 'Pont fessier, amplitude réduite',
        instructions: ['Effectuez le même mouvement en ne soulevant les hanches que de quelques centimètres.'],
        executionCues: ['Un mouvement petit et contrôlé vaut mieux qu’un mouvement large et brusque.'],
      },
      harderVariant: {
        name: 'Pont fessier avec pause en haut',
        instructions: [
          'Effectuez le pont fessier comme dans la version de base.',
          'En haut, maintenez la position pendant 2 à 3 secondes avant de redescendre.',
        ],
        executionCues: ['Continuez à respirer pendant la pause, ne bloquez pas votre respiration.'],
      },
    },
    'legs-split-squat': {
      name: 'Fente statique (split squat)',
      instructions: [
        'Faites un grand pas en avant avec un pied, en gardant l’autre derrière vous.',
        'Pliez les deux genoux, en descendant tout droit.',
        'Remontez en poussant sur la jambe avant, puis répétez de l’autre côté.',
      ],
      executionCues: [
        'Votre genou avant reste au-dessus de la cheville, pas au-delà des orteils.',
        'Votre buste reste droit pendant toute la descente.',
      ],
      easierVariant: {
        name: 'Demi-fente statique',
        instructions: ['Effectuez le même mouvement en réduisant la profondeur de la descente.'],
        executionCues: ['Utilisez un mur ou une chaise pour plus d’équilibre si nécessaire.'],
      },
      harderVariant: {
        name: 'Fente statique avec talon arrière levé',
        instructions: [
          'Effectuez la fente statique en soulevant le talon du pied arrière du sol.',
          'Maintenez l’équilibre pendant toute la répétition.',
        ],
        executionCues: ['Bougez lentement : l’instabilité ajoutée demande plus de contrôle, pas plus de vitesse.'],
      },
    },
    'push-wall': {
      name: 'Pompe contre le mur',
      instructions: [
        'Tenez-vous à environ un pas d’un mur, mains placées à hauteur d’épaules.',
        'Pliez les coudes, en rapprochant la poitrine du mur.',
        'Repoussez pour revenir à la position de départ.',
      ],
      executionCues: [
        'Votre corps reste en ligne droite de la tête aux talons, sans cambrer le dos.',
        'Vos coudes pointent légèrement vers l’arrière, pas complètement sur les côtés.',
      ],
      easierVariant: {
        name: 'Pompe contre le mur, mains plus hautes',
        instructions: ['Effectuez le même mouvement avec les mains placées plus haut sur le mur, pour réduire la charge.'],
        executionCues: ['Plus vos mains sont hautes, moins l’effort demandé est important.'],
      },
      harderVariant: {
        name: 'Pompe sur une surface surélevée stable',
        instructions: [
          'Placez vos mains sur une surface stable et solide, plus basse qu’un mur (par exemple une marche fixe).',
          'Effectuez la pompe en gardant le corps en ligne droite.',
        ],
        executionCues: ['Utilisez uniquement des surfaces stables et antidérapantes.'],
      },
    },
    'push-knee': {
      name: 'Pompe sur les genoux',
      instructions: [
        'Mains au sol sous les épaules, genoux au sol, corps en ligne des genoux à la tête.',
        'Pliez les coudes, en abaissant la poitrine vers le sol.',
        'Repoussez pour revenir à la position de départ.',
      ],
      executionCues: [
        'Votre gainage reste légèrement engagé pour que les hanches ne s’affaissent pas.',
        'Ne descendez qu’aussi bas que vous le pouvez en gardant une bonne posture.',
      ],
      easierVariant: {
        name: 'Pompe sur les genoux, amplitude réduite',
        instructions: ['Effectuez le même mouvement en ne descendant qu’à mi-chemin.'],
        executionCues: ['Mieux vaut réduire l’amplitude que perdre l’alignement du corps.'],
      },
      harderVariant: {
        name: 'Pompe sur les genoux avec pause en bas',
        instructions: ['Effectuez la pompe sur les genoux et marquez une pause de 1 à 2 secondes en bas.'],
        executionCues: ['La pause doit être contrôlée, pas un affaissement vers le sol.'],
      },
    },
    'push-standard': {
      name: 'Pompe classique',
      instructions: [
        'Mains au sol sous les épaules, jambes tendues, orteils au sol.',
        'Pliez les coudes, en abaissant la poitrine vers le sol tout en gardant le corps en ligne droite.',
        'Repoussez pour revenir à la position de départ.',
      ],
      executionCues: [
        'Votre corps reste aussi rigide qu’une planche de la tête aux talons.',
        'Si la posture se dégrade, il vaut mieux passer à la variante sur les genoux.',
      ],
      easierVariant: {
        name: 'Pompe classique, amplitude réduite',
        instructions: ['Effectuez le même mouvement en réduisant la profondeur de la descente.'],
        executionCues: ['Un mouvement partiel bien exécuté vaut mieux qu’un mouvement complet mal exécuté.'],
      },
      harderVariant: {
        name: 'Pompe classique avec pause en bas',
        instructions: ['Effectuez la pompe classique et marquez une pause de 2 secondes en bas.'],
        executionCues: ['Gardez le corps rigide pendant la pause aussi.'],
      },
    },
    'push-forearm-wall': {
      name: 'Poussée des avant-bras contre le mur',
      instructions: [
        'Tenez-vous face à un mur, avant-bras posés sur le mur à hauteur d’épaules, coudes pliés.',
        'Poussez vos avant-bras contre le mur, en éloignant légèrement votre corps, puis relâchez avec contrôle.',
        'Gardez les poignets détendus : la charge passe par les avant-bras, pas par les mains.',
      ],
      executionCues: [
        'Votre corps reste en ligne droite, sans trop cambrer le bas du dos.',
        'Une alternative utile quand l’appui sur les mains n’est pas confortable.',
      ],
      easierVariant: {
        name: 'Poussée des avant-bras contre le mur, amplitude réduite',
        instructions: ['Effectuez le même mouvement avec une amplitude plus petite.'],
        executionCues: ['Un mouvement minimal convient bien pour commencer.'],
      },
      harderVariant: {
        name: 'Poussée des avant-bras contre le mur avec pause',
        instructions: ['Effectuez le mouvement et maintenez la position de poussée maximale pendant 2 secondes.'],
        executionCues: ['La pause reste contrôlée, sans cambrer le dos.'],
      },
    },
    'pull-superman': {
      name: 'Superman (extension du dos)',
      instructions: [
        'Allongez-vous sur le ventre, bras tendus devant vous, jambes tendues.',
        'Soulevez les bras, la poitrine et les jambes de quelques centimètres du sol en même temps.',
        'Redescendez avec contrôle.',
      ],
      executionCues: [
        'Votre nuque reste longue, le regard dirigé vers le sol devant vous.',
        'Le mouvement est petit et contrôlé, pas une secousse vers le haut.',
      ],
      easierVariant: {
        name: 'Superman en alternance',
        instructions: ['Soulevez un bras et la jambe opposée à la fois, en alternant les côtés.'],
        executionCues: ['Bouger un membre à la fois réduit la charge sur le bas du dos.'],
      },
      harderVariant: {
        name: 'Superman avec pause isométrique',
        instructions: ['Effectuez le superman et maintenez la position soulevée pendant 2 à 3 secondes.'],
        executionCues: ['Respirez normalement pendant la pause.'],
      },
    },
    'pull-scapular-retraction': {
      name: 'Rétraction scapulaire debout',
      instructions: [
        'Tenez-vous debout, bras tendus devant vous à hauteur d’épaules, coudes légèrement pliés.',
        'Tirez les coudes vers l’arrière, en rapprochant les omoplates comme pour les serrer.',
        'Revenez lentement à la position de départ.',
      ],
      executionCues: [
        'Le mouvement part du dos, pas des bras.',
        'Vos épaules restent basses, loin des oreilles.',
      ],
      easierVariant: {
        name: 'Rétraction scapulaire, amplitude réduite',
        instructions: ['Effectuez le même mouvement avec une amplitude plus petite.'],
        executionCues: ['Même un petit mouvement contrôlé entraîne le bon schéma moteur.'],
      },
      harderVariant: {
        name: 'Rétraction scapulaire avec pause',
        instructions: ['Effectuez la rétraction et maintenez la position pendant 2 secondes avant de revenir.'],
        executionCues: ['Évitez de soulever les épaules pendant la pause.'],
      },
    },
    'pull-prone-swimmer': {
      name: 'Nageur au sol',
      instructions: [
        'Allongez-vous sur le ventre, bras tendus devant vous, jambes tendues.',
        'Soulevez légèrement les bras et les jambes du sol et alternez de petits mouvements comme en nageant.',
        'Gardez un rythme lent et contrôlé.',
      ],
      executionCues: [
        'Le mouvement reste petit : pas besoin de soulever beaucoup pour le sentir travailler.',
        'Votre nuque reste détendue, le regard vers le bas.',
      ],
      easierVariant: {
        name: 'Nageur au sol, bras seulement',
        instructions: ['Effectuez le mouvement en ne bougeant que les bras, en gardant les jambes au sol.'],
        executionCues: ['Réduisez les parties du corps impliquées si votre bas du dos fatigue trop.'],
      },
      harderVariant: {
        name: 'Nageur au sol avec pause à mi-série',
        instructions: ['Effectuez le mouvement et, à mi-série, maintenez bras et jambes soulevés pendant 2 secondes.'],
        executionCues: ['La pause ne doit pas créer de tension dans la nuque.'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: 'Serrage scapulaire assis',
      instructions: [
        'Asseyez-vous sur une chaise stable, dos appuyé contre le dossier.',
        'Tirez les coudes vers l’arrière, en rapprochant les omoplates, sans soulever les épaules.',
        'Revenez lentement à la position de départ.',
      ],
      executionCues: [
        'Votre dos reste appuyé contre le dossier pendant tout le mouvement.',
        'Vos épaules restent basses, loin des oreilles.',
      ],
      easierVariant: {
        name: 'Serrage scapulaire assis, amplitude réduite',
        instructions: ['Effectuez le même mouvement avec une amplitude plus petite.'],
        executionCues: ['Même un petit mouvement contrôlé entraîne le bon schéma moteur.'],
      },
      harderVariant: {
        name: 'Serrage scapulaire assis avec pause',
        instructions: ['Effectuez le serrage et maintenez la position pendant 2 secondes avant de revenir.'],
        executionCues: ['Évitez de soulever les épaules pendant la pause.'],
      },
    },
    'core-knee-plank': {
      name: 'Planche sur les genoux',
      instructions: [
        'Avant-bras au sol sous les épaules, genoux au sol.',
        'Soulevez les hanches, en formant une ligne droite des genoux à la tête.',
        'Maintenez la position en respirant calmement.',
      ],
      executionCues: [
        'Vos hanches ne s’affaissent pas et ne se soulèvent pas trop.',
        'Votre gainage reste légèrement engagé pendant toute la durée.',
      ],
      easierVariant: {
        name: 'Planche sur les genoux, maintien plus court',
        instructions: ['Maintenez la position moins longtemps, avec plus de pauses entre les séries.'],
        executionCues: ['Plusieurs maintiens courts et corrects valent mieux qu’un long et incorrect.'],
      },
      harderVariant: {
        name: 'Planche classique (sur les orteils)',
        instructions: ['Effectuez la même planche en soulevant les genoux du sol, en appui sur les orteils.'],
        executionCues: ['Votre corps reste en ligne droite de la tête aux talons.'],
      },
    },
    'core-dead-bug': {
      name: 'Dead bug (insecte mort)',
      instructions: [
        'Allongez-vous sur le dos, bras tendus vers le plafond, genoux pliés à 90 degrés au-dessus des hanches.',
        'Étendez lentement un bras derrière la tête et la jambe opposée vers le sol, sans le toucher.',
        'Revenez à la position de départ et répétez de l’autre côté.',
      ],
      executionCues: [
        'Votre bas du dos reste en contact avec le sol pendant tout le mouvement.',
        'Le mouvement est lent : la vitesse n’est pas l’objectif.',
      ],
      easierVariant: {
        name: 'Dead bug, amplitude réduite',
        instructions: ['Effectuez le même mouvement en n’abaissant le bras et la jambe qu’à mi-chemin.'],
        executionCues: ['Réduisez l’amplitude si votre bas du dos se soulève du sol.'],
      },
      harderVariant: {
        name: 'Dead bug avec pause en extension',
        instructions: ['Effectuez le dead bug et, bras et jambe tendus, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['La pause ne doit pas faire cambrer votre dos.'],
      },
    },
    'core-bird-dog': {
      name: 'Bird dog (chien oiseau)',
      instructions: [
        'Mains et genoux au sol, dos en position neutre.',
        'Étendez un bras vers l’avant et la jambe opposée vers l’arrière, en gardant les hanches stables.',
        'Revenez à la position de départ et répétez de l’autre côté.',
      ],
      executionCues: [
        'Vos hanches restent parallèles au sol, sans rotation.',
        'Bougez lentement : l’équilibre compte plus que l’amplitude.',
      ],
      easierVariant: {
        name: 'Bird dog, un membre à la fois',
        instructions: ['Étendez seulement le bras ou seulement la jambe à la fois, plutôt qu’ensemble.'],
        executionCues: ['Il est plus facile de garder l’équilibre en bougeant un seul membre.'],
      },
      harderVariant: {
        name: 'Bird dog avec pause en extension',
        instructions: ['Effectuez le bird dog et maintenez la position étendue pendant 2 à 3 secondes.'],
        executionCues: ['Continuez à respirer pendant la pause.'],
      },
    },
    'core-standing-brace': {
      name: 'Gainage debout',
      instructions: [
        'Tenez-vous debout, mains sur les hanches ou croisées sur la poitrine, pieds à largeur de hanches.',
        'Contractez doucement votre gainage, comme pour tirer le nombril loin de la ceinture.',
        'Maintenez la contraction quelques secondes en respirant normalement, puis relâchez.',
      ],
      executionCues: [
        'Vos hanches restent immobiles, sans cambrer ni arrondir le bas du dos.',
        'La contraction est légère et tenable, pas un serrage total.',
      ],
      easierVariant: {
        name: 'Gainage debout, maintien plus court',
        instructions: ['Maintenez la contraction moins longtemps, avec plus de répétitions courtes.'],
        executionCues: ['Plusieurs maintiens courts valent mieux qu’un long avec perte de contrôle.'],
      },
      harderVariant: {
        name: 'Gainage debout avec légère inclinaison avant',
        instructions: [
          'Effectuez le gainage et, en le maintenant, inclinez légèrement le buste vers l’avant.',
          'Revenez à la position debout avec contrôle.',
        ],
        executionCues: ['L’inclinaison reste minimale : le contrôle compte plus que l’amplitude.'],
      },
    },
    'mobility-march': {
      name: 'Marche sur place',
      instructions: [
        'Debout, commencez à marcher sur place, en soulevant les pieds alternativement.',
        'Bougez les bras naturellement, comme en marchant.',
        'Gardez un rythme qui vous permet de respirer sans effort excessif.',
      ],
      executionCues: ['Vos pas restent légers : pas d’impact fort au sol.'],
      easierVariant: {
        name: 'Marche lente',
        instructions: ['Effectuez la marche à un rythme plus lent, avec un levé de pied minimal.'],
        executionCues: ['Vous pouvez vous appuyer légèrement sur un support si besoin d’équilibre.'],
      },
      harderVariant: {
        name: 'Marche avec genoux hauts',
        instructions: ['Effectuez la marche en soulevant les genoux plus haut, tout en restant contrôlé.'],
        executionCues: ['Votre buste reste droit même quand les genoux se lèvent.'],
      },
    },
    'mobility-step-touch': {
      name: 'Pas chassé latéral',
      instructions: [
        'Debout, faites un pas de côté avec un pied, puis ramenez l’autre pied sans le croiser.',
        'Répétez de l’autre côté, en alternant.',
        'Gardez les genoux souples pendant le mouvement.',
      ],
      executionCues: ['Les mouvements restent fluides, sans à-coups soudains.'],
      easierVariant: {
        name: 'Pas chassé, pas plus petit',
        instructions: ['Effectuez le même mouvement avec des pas de côté plus courts.'],
        executionCues: ['Réduisez l’amplitude si vous vous sentez instable.'],
      },
      harderVariant: {
        name: 'Pas chassé avec mouvement des bras',
        instructions: ['Effectuez le pas chassé en ajoutant un mouvement fluide des bras vers le haut à chaque pas.'],
        executionCues: ['Vos bras bougent de façon contrôlée, sans balancements brusques.'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: 'Cercles de hanches et d’épaules',
      instructions: [
        'Debout, mains sur les hanches, effectuez de lents cercles de hanches dans un sens, puis dans l’autre.',
        'Puis effectuez des cercles d’épaules, en les levant vers l’avant-haut-arrière-bas.',
        'Bougez dans une amplitude confortable.',
      ],
      executionCues: ['Le mouvement reste lent et contrôlé, sans forcer les limites d’amplitude.'],
      easierVariant: {
        name: 'Cercles, amplitude plus petite',
        instructions: ['Effectuez le même mouvement avec des cercles plus petits.'],
        executionCues: ['Il est normal de réduire l’amplitude si une zone est plus raide.'],
      },
      harderVariant: {
        name: 'Cercles avec plus d’amplitude et de répétitions',
        instructions: ['Effectuez le même mouvement avec des cercles plus grands, tout en restant contrôlé.'],
        executionCues: ['Augmentez l’amplitude seulement si cela reste confortable.'],
      },
    },
    'fullbody-cat-cow': {
      name: 'Chat-vache (mobilité vertébrale)',
      instructions: [
        'Mains et genoux au sol, dos en position neutre.',
        'Inspirez, en cambrant doucement le dos vers le bas et en levant le regard.',
        'Expirez, en arrondissant le dos vers le haut et en amenant le menton vers la poitrine.',
      ],
      executionCues: ['Le mouvement suit la respiration, sans forcer l’amplitude.'],
      easierVariant: {
        name: 'Chat-vache, mouvement réduit',
        instructions: ['Effectuez le même mouvement avec une amplitude plus petite.'],
        executionCues: ['Un mouvement minimal convient si votre dos est raide.'],
      },
      harderVariant: {
        name: 'Chat-vache avec pause en fin d’amplitude',
        instructions: ['Effectuez le mouvement et, en fin d’amplitude, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['La pause reste confortable, sans tension.'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'Assis-debout',
      instructions: [
        'Asseyez-vous au bord d’une chaise stable, pieds à plat au sol.',
        'Penchez-vous légèrement en avant et levez-vous sans utiliser les mains, si possible.',
        'Rasseyez-vous avec contrôle, sans vous laisser tomber sur le siège.',
      ],
      executionCues: ['Le mouvement est lent, à la montée comme à la descente.'],
      easierVariant: {
        name: 'Assis-debout assisté',
        instructions: ['Effectuez le même mouvement en vous aidant des mains sur les accoudoirs ou les genoux.'],
        executionCues: ['Utiliser les mains n’est pas un problème : ce qui compte, c’est le contrôle du mouvement.'],
      },
      harderVariant: {
        name: 'Assis-debout lent',
        instructions: ['Effectuez le mouvement en ralentissant les phases de montée et de descente.'],
        executionCues: ['Ralentir augmente l’effort demandé sans avoir besoin de sauter ou de pousser fort.'],
      },
    },
    'db-chest-floor-press': {
      name: 'Développé au sol',
      instructions: [
        'Allongez-vous sur le dos, genoux pliés, un haltère dans chaque main posé sur la poitrine.',
        'Poussez les haltères vers le haut jusqu’à ce que vos bras soient presque totalement tendus.',
        'Redescendez avec contrôle jusqu’à ce que vos coudes touchent légèrement le sol.',
      ],
      executionCues: [
        'Vos coudes restent à environ 45 degrés du buste, pas complètement écartés.',
        'Vos poignets restent alignés au-dessus des coudes pendant la poussée.',
      ],
      easierVariant: {
        name: 'Développé au sol, charge plus légère',
        instructions: ['Effectuez le même mouvement avec un haltère plus léger, en réduisant l’amplitude si nécessaire.'],
        executionCues: ['Une amplitude complète avec moins de poids vaut mieux qu’une amplitude partielle avec plus de poids.'],
      },
      harderVariant: {
        name: 'Développé au sol avec pause en bas',
        instructions: ['Effectuez la poussée et, coudes proches du sol, marquez une pause de 2 secondes.'],
        executionCues: ['La pause reste contrôlée, sans rebondir sur le sol.'],
      },
    },
    'db-chest-floor-fly': {
      name: 'Écarté couché au sol',
      instructions: [
        'Allongez-vous sur le dos, genoux pliés, un haltère dans chaque main, bras tendus au-dessus de la poitrine.',
        'Ouvrez les bras sur les côtés, en abaissant les haltères avec les coudes légèrement pliés, jusqu’à approcher le sol.',
        'Ramenez les bras ensemble au-dessus de la poitrine en suivant le même arc de mouvement.',
      ],
      executionCues: [
        'Vos coudes gardent une légère flexion fixe pendant tout le mouvement.',
        'Le mouvement est un large arc, pas une poussée verticale.',
      ],
      easierVariant: {
        name: 'Écarté couché au sol, amplitude réduite',
        instructions: ['Effectuez le même mouvement en n’ouvrant les bras qu’à moitié.'],
        executionCues: ['Réduisez l’amplitude si vous sentez une tension à l’épaule.'],
      },
      harderVariant: {
        name: 'Écarté couché au sol avec pause en position ouverte',
        instructions: ['Effectuez l’écarté et, bras presque au sol, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['La pause reste légère, sans forcer l’épaule.'],
      },
    },
    'db-back-bent-row': {
      name: 'Rowing buste penché',
      instructions: [
        'Pieds à largeur de hanches, genoux légèrement pliés, buste penché en avant, un haltère dans chaque main.',
        'Tirez les haltères vers l’abdomen, en amenant les coudes vers l’arrière et en rapprochant les omoplates.',
        'Redescendez avec contrôle jusqu’à ce que vos bras soient presque totalement tendus.',
      ],
      executionCues: [
        'Votre dos reste long pendant tout le mouvement, sans s’arrondir.',
        'Le mouvement part du dos, pas d’une simple flexion du coude.',
      ],
      easierVariant: {
        name: 'Rowing buste penché avec inclinaison réduite',
        instructions: ['Effectuez le même mouvement en penchant le buste moins en avant, pour réduire la charge sur le dos.'],
        executionCues: ['Gardez quand même le dos long.'],
      },
      harderVariant: {
        name: 'Rowing buste penché avec pause en haut',
        instructions: ['Effectuez le rowing et, coudes vers l’arrière, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['Vos omoplates restent rapprochées pendant la pause.'],
      },
    },
    'db-back-single-row': {
      name: 'Rowing à un bras',
      instructions: [
        'Posez la main et le genou du même côté sur une chaise ou une surface stable, buste parallèle au sol.',
        'Avec l’autre main, tirez l’haltère vers la hanche, en amenant le coude vers l’arrière.',
        'Redescendez avec contrôle, puis répétez de l’autre côté.',
      ],
      executionCues: [
        'Votre buste reste immobile, sans rotation pendant la traction.',
        'Votre coude reste proche du buste pendant le mouvement.',
      ],
      easierVariant: {
        name: 'Rowing à un bras, amplitude réduite',
        instructions: ['Effectuez le même mouvement avec une amplitude de mouvement plus petite.'],
        executionCues: ['Réduisez l’amplitude si votre buste a tendance à tourner.'],
      },
      harderVariant: {
        name: 'Rowing à un bras avec pause en haut',
        instructions: ['Effectuez la traction et, coude vers l’arrière, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['Votre buste reste stable pendant toute la pause.'],
      },
    },
    'db-shoulder-press': {
      name: 'Développé militaire',
      instructions: [
        'Debout ou assis, un haltère dans chaque main à hauteur d’épaules, paumes vers l’avant.',
        'Poussez les haltères vers le haut jusqu’à ce que vos bras soient presque totalement tendus.',
        'Redescendez avec contrôle jusqu’à hauteur d’épaules.',
      ],
      executionCues: [
        'Évitez de cambrer le dos pendant la poussée : votre buste reste stable.',
        'Les haltères suivent une trajectoire verticale, pas vers l’avant.',
      ],
      easierVariant: {
        name: 'Développé militaire assis',
        instructions: ['Effectuez le même mouvement assis, dos soutenu, pour réduire l’implication du buste.'],
        executionCues: ['Concentrez-vous uniquement sur le mouvement des bras.'],
      },
      harderVariant: {
        name: 'Développé militaire en alternance',
        instructions: ['Effectuez la poussée avec un bras à la fois, en gardant le buste stable.'],
        executionCues: ['Évitez de vous pencher sur le côté pendant la poussée à un bras.'],
      },
    },
    'db-shoulder-lateral-raise': {
      name: 'Élévation latérale',
      instructions: [
        'Debout, un haltère dans chaque main le long du corps, coudes légèrement pliés.',
        'Levez les bras sur les côtés jusqu’à hauteur d’épaules.',
        'Redescendez avec contrôle jusqu’à la position de départ.',
      ],
      executionCues: [
        'Le mouvement part des épaules, pas d’un balancement des bras.',
        'Vos poignets restent légèrement plus bas que les coudes pendant la levée.',
      ],
      easierVariant: {
        name: 'Élévation latérale, amplitude réduite',
        instructions: ['Effectuez le même mouvement en ne levant les bras qu’à mi-hauteur.'],
        executionCues: ['Réduisez l’amplitude si vous sentez une tension dans la nuque.'],
      },
      harderVariant: {
        name: 'Élévation latérale avec pause en haut',
        instructions: ['Effectuez l’élévation et, bras à hauteur d’épaules, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['Vos épaules restent basses même pendant la pause.'],
      },
    },
    'db-shoulder-front-raise': {
      name: 'Élévation frontale',
      instructions: [
        'Debout, un haltère dans chaque main devant les cuisses, coudes légèrement pliés.',
        'Levez un bras vers l’avant jusqu’à hauteur d’épaules.',
        'Redescendez avec contrôle, puis répétez avec l’autre bras ou en alternant.',
      ],
      executionCues: [
        'Votre buste reste immobile, sans utiliser l’élan du dos pour soulever le poids.',
        'Le mouvement s’arrête à hauteur d’épaules, pas au-delà.',
      ],
      easierVariant: {
        name: 'Élévation frontale, amplitude réduite',
        instructions: ['Effectuez le même mouvement en ne levant le bras qu’à mi-hauteur.'],
        executionCues: ['Réduisez l’amplitude si votre buste a tendance à se pencher en arrière.'],
      },
      harderVariant: {
        name: 'Élévation frontale avec pause en haut',
        instructions: ['Effectuez l’élévation et, bras à hauteur d’épaules, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['Votre buste reste immobile pendant toute la pause.'],
      },
    },
    'db-arms-bicep-curl': {
      name: 'Curl biceps',
      instructions: [
        'Debout, un haltère dans chaque main le long du corps, paumes vers l’avant.',
        'Pliez les coudes, en levant les haltères vers les épaules.',
        'Redescendez avec contrôle jusqu’à ce que vos bras soient presque totalement tendus.',
      ],
      executionCues: [
        'Vos coudes restent proches du buste pendant tout le mouvement.',
        'Évitez d’utiliser l’élan du dos pour soulever le poids.',
      ],
      easierVariant: {
        name: 'Curl biceps contre un mur',
        instructions: ['Effectuez le même mouvement dos contre un mur, pour réduire l’élan.'],
        executionCues: ['Le contact avec le mur aide à isoler le mouvement.'],
      },
      harderVariant: {
        name: 'Curl biceps en alternance avec pause',
        instructions: ['Effectuez le curl avec un bras à la fois, en maintenant la position haute pendant 1 à 2 secondes.'],
        executionCues: ['Le bras au repos reste tendu et détendu pendant l’alternance.'],
      },
    },
    'db-arms-hammer-curl': {
      name: 'Curl marteau',
      instructions: [
        'Debout, un haltère dans chaque main le long du corps, paumes tournées vers le corps.',
        'Pliez les coudes, en levant les haltères vers les épaules, en gardant les paumes tournées vers l’intérieur.',
        'Redescendez avec contrôle jusqu’à ce que vos bras soient presque totalement tendus.',
      ],
      executionCues: [
        'Vos poignets restent immobiles et alignés avec vos avant-bras pendant tout le mouvement.',
        'Vos coudes restent proches du buste.',
      ],
      easierVariant: {
        name: 'Curl marteau contre un mur',
        instructions: ['Effectuez le même mouvement dos contre un mur.'],
        executionCues: ['Le contact avec le mur réduit l’élan.'],
      },
      harderVariant: {
        name: 'Curl marteau en alternance avec pause',
        instructions: ['Effectuez le curl avec un bras à la fois, en maintenant la position haute pendant 1 à 2 secondes.'],
        executionCues: ['Votre buste reste stable pendant l’alternance.'],
      },
    },
    'db-arms-tricep-extension': {
      name: 'Extension triceps au-dessus de la tête',
      instructions: [
        'Debout ou assis, tenez un haltère à deux mains au-dessus de la tête, bras presque tendus.',
        'Pliez les coudes, en abaissant l’haltère derrière la tête.',
        'Tendez les bras, en revenant à la position de départ.',
      ],
      executionCues: [
        'Vos coudes restent pointés vers l’avant, sans s’écarter sur les côtés.',
        'Le mouvement se fait uniquement au niveau du coude, votre buste reste immobile.',
      ],
      easierVariant: {
        name: 'Extension triceps, amplitude réduite',
        instructions: ['Effectuez le même mouvement en réduisant la profondeur de la descente.'],
        executionCues: ['Réduisez l’amplitude si vous sentez une tension à l’épaule.'],
      },
      harderVariant: {
        name: 'Extension triceps avec pause en bas',
        instructions: ['Effectuez l’extension et, coudes pliés, maintenez la position pendant 1 à 2 secondes.'],
        executionCues: ['Vos coudes restent immobiles pendant la pause.'],
      },
    },
    'db-legs-goblet-squat': {
      name: 'Squat goblet',
      instructions: [
        'Debout, pieds à largeur d’épaules, un haltère tenu verticalement à deux mains devant la poitrine.',
        'Pliez les genoux et descendez en squat, en gardant l’haltère près du corps.',
        'Remontez en poussant sur les talons jusqu’à la position de départ.',
      ],
      executionCues: [
        'Vos genoux suivent la direction de vos orteils.',
        'Votre buste reste aussi droit que possible pendant la descente.',
      ],
      easierVariant: {
        name: 'Squat goblet, amplitude réduite',
        instructions: ['Effectuez le même mouvement en réduisant la profondeur de la descente.'],
        executionCues: ['Utilisez un haltère plus léger si la profondeur complète est difficile à contrôler.'],
      },
      harderVariant: {
        name: 'Squat goblet avec pause en bas',
        instructions: ['Effectuez le squat et, au point le plus bas, maintenez la position pendant 2 secondes.'],
        executionCues: ['Votre buste reste stable pendant la pause.'],
      },
    },
    'db-legs-rdl': {
      name: 'Soulevé de terre roumain',
      instructions: [
        'Debout, un haltère dans chaque main devant les cuisses, genoux légèrement pliés.',
        'Poussez les hanches vers l’arrière, en abaissant les haltères le long des jambes, en gardant le dos long.',
        'Poussez les hanches vers l’avant pour revenir debout.',
      ],
      executionCues: [
        'Les haltères restent proches des jambes pendant tout le mouvement.',
        'Votre dos reste long, sans s’arrondir pendant la descente.',
      ],
      easierVariant: {
        name: 'Soulevé de terre roumain, amplitude réduite',
        instructions: ['Effectuez le même mouvement en ne descendant qu’à mi-chemin.'],
        executionCues: ['Réduisez l’amplitude si votre dos a du mal à rester long.'],
      },
      harderVariant: {
        name: 'Soulevé de terre roumain avec pause en bas',
        instructions: ['Effectuez le soulevé et, au point le plus bas, maintenez la position pendant 2 secondes.'],
        executionCues: ['Votre dos reste long même pendant la pause.'],
      },
    },
    'db-core-russian-twist': {
      name: 'Rotation russe lestée',
      instructions: [
        'Assis, genoux pliés, buste légèrement penché en arrière, un haltère tenu à deux mains devant la poitrine.',
        'Faites pivoter le buste, en amenant l’haltère d’un côté, puis de l’autre.',
        'Gardez un rythme contrôlé pendant toute la série.',
      ],
      executionCues: [
        'Le mouvement part du buste, pas seulement des bras.',
        'Gardez le dos long, sans s’arrondir pendant la rotation.',
      ],
      easierVariant: {
        name: 'Rotation russe, pieds au sol',
        instructions: ['Effectuez le même mouvement en gardant les pieds au sol, pour plus de stabilité.'],
        executionCues: ['Utilisez un haltère plus léger si votre buste a du mal à rester stable.'],
      },
      harderVariant: {
        name: 'Rotation russe, pieds levés',
        instructions: ['Effectuez la rotation en gardant les pieds levés du sol pendant toute la série.'],
        executionCues: ['L’équilibre demande un rythme plus lent et plus contrôlé.'],
      },
    },
    'db-core-suitcase-carry': {
      name: 'Portage valise',
      instructions: [
        'Debout, un haltère lourd tenu d’une main le long du corps, l’autre bras libre pour l’équilibre.',
        'Marchez en ligne droite ou sur place, en gardant le buste droit et les épaules de niveau.',
        'Changez de bras à mi-série si celle-ci le prévoit.',
      ],
      executionCues: [
        'Vos épaules restent de niveau, sans se pencher vers le côté chargé.',
        'Vos pas restent courts et contrôlés, pas précipités.',
      ],
      easierVariant: {
        name: 'Portage valise, charge plus légère',
        instructions: ['Effectuez le même exercice avec un haltère plus léger.'],
        executionCues: ['Réduisez la charge si vos épaules ont tendance à s’incliner.'],
      },
      harderVariant: {
        name: 'Portage valise avec pause à mi-parcours',
        instructions: ['Effectuez le portage et, à mi-parcours, arrêtez-vous et maintenez la position pendant 2 à 3 secondes.'],
        executionCues: ['Votre buste reste droit pendant la pause aussi.'],
      },
    },
    'db-fullbody-thruster': {
      name: 'Thruster',
      instructions: [
        'Debout, un haltère dans chaque main à hauteur d’épaules, pieds à largeur d’épaules.',
        'Descendez en squat, puis remontez en poussant sur les talons tout en poussant les haltères au-dessus de la tête.',
        'Redescendez avec contrôle, en ramenant les haltères à hauteur d’épaules.',
      ],
      executionCues: [
        'La poussée vers le haut vient des jambes, pas seulement des bras.',
        'Le mouvement reste fluide, sans pauses brusques entre le squat et la poussée.',
      ],
      easierVariant: {
        name: 'Thruster en deux temps',
        instructions: ['Effectuez d’abord le squat complet, puis la poussée au-dessus de la tête, comme deux mouvements séparés.'],
        executionCues: ['Il est normal de décomposer le mouvement jusqu’à ce qu’il devienne naturel.'],
      },
      harderVariant: {
        name: 'Thruster avec pause en bas',
        instructions: [
          'Effectuez le thruster et, au point le plus bas du squat, marquez une pause de 1 à 2 secondes avant de vous relever et pousser.',
        ],
        executionCues: ['Votre buste reste stable pendant la pause.'],
      },
    },
    'db-fullbody-renegade-row': {
      name: 'Rowing renegade',
      instructions: [
        'En position de planche haute, un haltère dans chaque main au sol sous les épaules.',
        'Tirez un haltère vers la hanche, en gardant les hanches stables, puis reposez-le au sol.',
        'Répétez de l’autre côté, en alternant.',
      ],
      executionCues: [
        'Vos hanches restent parallèles au sol, sans rotation pendant la traction.',
        'Des pieds légèrement plus écartés aident à la stabilité.',
      ],
      easierVariant: {
        name: 'Rowing renegade sur les genoux',
        instructions: ['Effectuez le même mouvement avec les genoux au sol au lieu d’une planche haute.'],
        executionCues: ['Cela réduit la charge sur les hanches tout en gardant le schéma de traction.'],
      },
      harderVariant: {
        name: 'Rowing renegade avec pompe',
        instructions: ['Effectuez la traction de chaque côté, puis ajoutez une pompe avant de répéter.'],
        executionCues: ['N’ajoutez la pompe que si vous pouvez garder les hanches stables.'],
      },
    },
  },
};

export default fr;
