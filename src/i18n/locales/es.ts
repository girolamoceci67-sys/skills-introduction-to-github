import type { LocaleResource } from '../resourceTypes';

const es: LocaleResource = {
  common: {
    continue: 'Continuar',
    cancel: 'Cancelar',
    save: 'Guardar',
    saving: 'Guardando…',
    retry: 'Reintentar',
    exit: 'Salir',
  },
  language: {
    title: 'Elige tu idioma',
    subtitle: 'Podrás cambiarlo más tarde desde los ajustes.',
    continue: 'Continuar',
  },
  auth: {
    createTitle: 'Crea tu acceso',
    createSubtitle: 'Elige un nombre de usuario y una contraseña para proteger la app en este dispositivo.',
    loginTitle: 'Bienvenido de nuevo',
    loginSubtitle: 'Inicia sesión con las credenciales creadas en este dispositivo.',
    usernameLabel: 'Usuario',
    usernamePlaceholder: 'Tu nombre de usuario',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Tu contraseña',
    confirmPasswordLabel: 'Confirma la contraseña',
    confirmPasswordPlaceholder: 'Repite la contraseña',
    createButton: 'Crear acceso',
    loginButton: 'Iniciar sesión',
    errorUsernameRequired: 'Introduce un nombre de usuario.',
    errorPasswordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
    errorPasswordMismatch: 'Las dos contraseñas no coinciden.',
    errorInvalidCredentials: 'Usuario o contraseña incorrectos.',
    forgotHint: 'Las credenciales se guardan solo en este dispositivo: si las olvidas, no se pueden recuperar de forma remota.',
  },
  onboarding: {
    welcomeTitle: 'Empecemos',
    welcomeBody:
      'Unas preguntas rápidas para crear tu primer plan de entrenamiento con el peso corporal, pensado para casa y sin equipamiento. El plan se irá adaptando según cómo te sientas después de cada sesión.',
    welcomeDisclaimer:
      'Esta app propone ejercicios con el peso corporal a una intensidad accesible y no sustituye el consejo de un médico o fisioterapeuta. Si tienes dudas sobre tu condición física, consulta a un profesional antes de empezar.',
    start: 'Comenzar',
    levelTitle: '¿Desde dónde partes?',
    levelSubtitle: 'Sirve para calibrar la intensidad de tu primer plan.',
    goalTitle: '¿Cuál es tu objetivo principal?',
    goalSubtitle: 'Podrás cambiarlo más tarde desde los ajustes.',
    availabilityTitle: '¿Cuántos días a la semana puedes entrenar?',
    availabilitySubtitle: 'Distribuiremos los entrenamientos a lo largo de la semana dejando espacio para la recuperación.',
    daysPerWeek: '{{count}} días a la semana',
    limitationsTitle: '¿Tienes alguna limitación física que quieras indicar?',
    limitationsSubtitle:
      'Evitaremos o adaptaremos los ejercicios que las involucren directamente. Puedes seleccionar más de una.',
    limitationsDisclaimer:
      'Esta información solo se usa para personalizar la selección de ejercicios y no constituye una evaluación médica.',
    createPlan: 'Crear mi plan',
    preparingPlan: 'Estamos preparando tu plan',
    saveErrorTitle: 'No hemos podido guardar tu perfil',
    saveErrorSubtitle: 'Revisa las respuestas de los pasos anteriores e inténtalo de nuevo.',
    backToStart: 'Volver al inicio',
    levelOptions: {
      sedentary: { title: 'Empiezo de cero', description: 'Hace mucho tiempo que no entreno con regularidad' },
      occasional: { title: 'Me muevo de vez en cuando', description: 'Hago actividad física de forma ocasional' },
      returning: { title: 'Retomándolo tras una pausa', description: 'Entrenaba con constancia y lo dejé' },
    },
    goalOptions: {
      stay_consistent: {
        title: 'Crear un hábito constante',
        description: 'Mi objetivo principal es entrenar con regularidad',
      },
      build_strength_foundation: {
        title: 'Construir una base de fuerza',
        description: 'Quiero sentirme más fuerte en los movimientos del día a día',
      },
      improve_mobility: {
        title: 'Mejorar la movilidad',
        description: 'Me interesa moverme mejor y con más libertad',
      },
      general_energy: {
        title: 'Tener más energía',
        description: 'Busco una actividad que me haga sentir mejor durante el día',
      },
    },
    limitationOptions: {
      knees: { title: 'Rodillas', description: 'Prefiero evitar impactos o cargas directas en las rodillas' },
      back: { title: 'Espalda', description: 'Prefiero evitar movimientos que carguen la zona lumbar' },
      shoulders: { title: 'Hombros', description: 'Prefiero evitar movimientos por encima de la cabeza o con carga directa' },
      wrists: { title: 'Muñecas', description: 'Prefiero evitar el apoyo prolongado sobre las muñecas' },
      none: { title: 'Ninguna limitación', description: 'Por ahora no tengo limitaciones que indicar' },
    },
  },
  notifications: {
    reminderChannelName: 'Recordatorios de entrenamiento',
    reminderTitle: 'Hora de entrenar',
    reminderBody: 'Tu entrenamiento con el peso corporal de hoy te espera.',
  },
  tabs: {
    home: 'Inicio',
    library: 'Biblioteca',
    progress: 'Progreso',
  },
  home: {
    title: 'Tu plan de esta semana',
    subtitle: 'Nivel de dificultad actual: {{tier}} de 3',
    restDay: 'Día de descanso',
    today: 'hoy',
    done: 'completado ✓',
    start: 'Empezar entrenamiento',
    redo: 'Repetir entrenamiento',
    noProfileTitle: 'Perfil no encontrado',
    noProfileSubtitle: 'Reinicia la app para repetir el registro inicial.',
    errorTitle: 'No hemos podido generar tu plan',
  },
  library: {
    title: 'Biblioteca de ejercicios',
    subtitle: 'Todos los ejercicios son con el peso corporal, pensados para un espacio en casa de al menos 2x2 m.',
    levelBadge: 'Nivel base {{tier}} de 3',
    excludedBadge: 'Excluido por algunas limitaciones',
    notFound: 'Ejercicio no encontrado',
    previewCaption: 'Vista previa del movimiento',
    executionCuesHeading: 'Señales de correcta ejecución',
    contraindicationDisclaimer:
      'Este ejercicio se evita automáticamente si has indicado limitaciones en: {{tags}}. No es una evaluación médica: si tienes dudas, consulta a un profesional.',
  },
  session: {
    exitConfirmTitle: '¿Salir del entrenamiento?',
    exitConfirmBody: 'El progreso de esta sesión no terminada se perderá.',
    exitConfirmCancel: 'Seguir entrenando',
    exitConfirmConfirm: 'Salir',
    notAvailableTitle: 'Entrenamiento no disponible',
    notAvailableSubtitle: 'Vuelve al inicio e inténtalo de nuevo.',
    backToHome: 'Volver al inicio',
    energyTitle: '¿Cómo te sientes hoy?',
    energySubtitle: '1 = poca energía · 5 = mucha energía',
    progress: 'Ejercicio {{current}} de {{total}} — Serie {{setCurrent}} de {{setTotal}}',
    holdLabel: 'Mantén la posición',
    reps: '{{count}} repeticiones',
    setComplete: 'Serie completada',
    rest: 'Descanso',
    skipRest: 'Saltar descanso',
    feedbackTitle: '¿Cómo ha ido?',
  },
  celebration: {
    title: '¡Entrenamiento completado!',
    subtitle_one: 'Has completado {{count}} ejercicio de {{total}}. Buen trabajo.',
    subtitle_other: 'Has completado {{count}} ejercicios de {{total}}. Buen trabajo.',
    continue: 'Continuar',
  },
  progress: {
    title: 'Progreso',
    streak_one: '{{count}} entrenamiento consecutivo',
    streak_other: '{{count}} entrenamientos consecutivos',
    weeklyAdherence: 'Adherencia semanal',
    weeklyGoal: 'Objetivo de esta semana',
    goalProgress: '{{completed}} de {{target}} entrenamientos completados',
    goalReminderSuffix: ' · recordatorio a las {{time}}',
    noGoalSet: 'Todavía no has establecido un objetivo para esta semana.',
    editGoal: 'Editar objetivo',
    setGoal: 'Establecer objetivo',
    howManyThisWeek: '¿Cuántos entrenamientos quieres completar esta semana?',
    dailyReminderTitle: 'Recordatorio diario',
    dailyReminderDesc: 'Te avisaremos con una notificación cada día',
    sessionHistory: 'Historial de sesiones',
    noSessions: 'Todavía no hay sesiones registradas.',
    reminderNotEnabledTitle: 'Recordatorio no activado',
    reminderNotEnabledBody:
      'Se ha guardado tu objetivo, pero sin permiso para enviar notificaciones no podemos recordarte que entrenes. Puedes activarlo desde los ajustes del teléfono.',
    noProfile: 'Perfil no encontrado',
    loadErrorTitle: 'No hemos podido cargar tu progreso',
  },
  feedback: {
    easy: 'Fácil',
    right: 'Adecuado',
    hard: 'Difícil',
  },
  sessionStatus: {
    completed: 'Completada',
    abandoned: 'Abandonada',
    skipped: 'Omitida',
  },
  muscleGroups: {
    full_body: 'Cuerpo completo',
    legs_glutes: 'Piernas y glúteos',
    core: 'Core',
    push: 'Empuje',
    pull: 'Tracción',
    mobility_cardio: 'Movilidad y cardio',
  },
  variants: {
    easier: 'Variante facilitada',
    base: 'Variante base',
    harder: 'Variante avanzada',
  },
  limitations: {
    knees: 'rodillas',
    back: 'espalda',
    shoulders: 'hombros',
    wrists: 'muñecas',
  },
  weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  exercises: {
    'legs-squat': {
      name: 'Sentadilla con el peso corporal',
      instructions: [
        'De pie, con los pies a la anchura de los hombros, puntas ligeramente hacia fuera.',
        'Flexiona las rodillas y lleva las caderas hacia atrás como si fueras a sentarte en una silla.',
        'Baja hasta donde controles cómodamente los muslos y luego sube empujando con los talones.',
      ],
      executionCues: [
        'Las rodillas siguen la dirección de las puntas de los pies, sin caer hacia dentro.',
        'El peso se reparte por toda la planta del pie, talones apoyados.',
        'La espalda se mantiene larga, sin arquearse ni curvarse.',
      ],
      easierVariant: {
        name: 'Sentadilla asistida con apoyo',
        instructions: [
          'Colócate frente a una silla estable o el borde de un mueble, con las manos apoyadas suavemente.',
          'Realiza el mismo movimiento de la sentadilla usando el apoyo solo para el equilibrio.',
          'Reduce la profundidad del descenso si es necesario.',
        ],
        executionCues: ['Los brazos ayudan al equilibrio, no levantan el cuerpo.'],
      },
      harderVariant: {
        name: 'Sentadilla con pausa abajo',
        instructions: [
          'Realiza la sentadilla como en la versión base.',
          'En el punto más bajo, haz una pausa de 2 segundos manteniendo el control.',
          'Sube empujando con los talones.',
        ],
        executionCues: ['Durante la pausa, el tronco se mantiene estable, sin balancearse.'],
      },
    },
    'legs-glute-bridge': {
      name: 'Puente de glúteos',
      instructions: [
        'Túmbate boca arriba, rodillas flexionadas, pies apoyados en el suelo cerca de los glúteos.',
        'Empuja con los talones y eleva las caderas hacia arriba.',
        'Aprieta los glúteos arriba y luego baja con control.',
      ],
      executionCues: [
        'El impulso parte de los talones, no de las puntas de los pies.',
        'Arriba, el cuerpo forma una línea recta entre rodillas y hombros, sin arquear demasiado la zona lumbar.',
      ],
      easierVariant: {
        name: 'Puente de glúteos con rango reducido',
        instructions: ['Realiza el mismo movimiento elevando las caderas solo unos centímetros.'],
        executionCues: ['Es mejor un movimiento pequeño y controlado que uno amplio y brusco.'],
      },
      harderVariant: {
        name: 'Puente de glúteos con pausa arriba',
        instructions: [
          'Realiza el puente de glúteos como en la versión base.',
          'Arriba, mantén la posición 2-3 segundos antes de bajar.',
        ],
        executionCues: ['Sigue respirando durante la pausa, sin retener el aire.'],
      },
    },
    'legs-split-squat': {
      name: 'Zancada estática (split squat)',
      instructions: [
        'Da un paso largo hacia delante con un pie, manteniendo el otro atrás.',
        'Flexiona ambas rodillas bajando en vertical.',
        'Sube empujando con la pierna delantera y repite con el lado opuesto.',
      ],
      executionCues: [
        'La rodilla delantera se mantiene sobre el tobillo, sin sobrepasar la punta del pie.',
        'El torso se mantiene erguido durante el descenso.',
      ],
      easierVariant: {
        name: 'Media zancada estática',
        instructions: ['Realiza el mismo movimiento reduciendo la profundidad del descenso.'],
        executionCues: ['Usa un apoyo en una pared o silla si necesitas más equilibrio.'],
      },
      harderVariant: {
        name: 'Zancada estática con talón trasero elevado',
        instructions: [
          'Realiza la zancada estática elevando del suelo el talón del pie trasero.',
          'Mantén el equilibrio durante toda la repetición.',
        ],
        executionCues: ['Movimiento lento: la mayor inestabilidad exige más control, no más velocidad.'],
      },
    },
    'push-wall': {
      name: 'Flexión de brazos en la pared',
      instructions: [
        'De pie, a un paso de la pared, con las manos apoyadas a la altura de los hombros.',
        'Flexiona los codos acercando el pecho a la pared.',
        'Empuja para volver a la posición inicial.',
      ],
      executionCues: [
        'El cuerpo se mantiene en línea recta de la cabeza a los talones, sin arquear la espalda.',
        'Los codos apuntan ligeramente hacia atrás, no completamente hacia fuera.',
      ],
      easierVariant: {
        name: 'Flexión en la pared con manos más arriba',
        instructions: ['Realiza el mismo movimiento con las manos apoyadas más arriba en la pared, para reducir la carga.'],
        executionCues: ['Cuanto más arriba estén las manos, menor será el esfuerzo requerido.'],
      },
      harderVariant: {
        name: 'Flexión sobre superficie elevada estable',
        instructions: [
          'Apoya las manos en una superficie estable y firme más baja que una pared (p. ej. un escalón fijo).',
          'Realiza la flexión manteniendo el cuerpo en línea recta.',
        ],
        executionCues: ['Usa solo superficies estables y antideslizantes.'],
      },
    },
    'push-knee': {
      name: 'Flexión de brazos con rodillas apoyadas',
      instructions: [
        'Manos en el suelo bajo los hombros, rodillas en el suelo, cuerpo en línea de las rodillas a la cabeza.',
        'Flexiona los codos bajando el pecho hacia el suelo.',
        'Empuja para volver a la posición inicial.',
      ],
      executionCues: [
        'El abdomen se mantiene ligeramente contraído para que las caderas no caigan.',
        'Baja solo hasta donde puedas mantener la forma correcta.',
      ],
      easierVariant: {
        name: 'Flexión con rodillas apoyadas, rango reducido',
        instructions: ['Realiza el mismo movimiento bajando solo hasta la mitad del recorrido.'],
        executionCues: ['Es mejor reducir la amplitud que perder la línea del cuerpo.'],
      },
      harderVariant: {
        name: 'Flexión con rodillas apoyadas y pausa abajo',
        instructions: ['Realiza la flexión con rodillas apoyadas y, abajo, haz una pausa de 1-2 segundos.'],
        executionCues: ['La pausa debe ser controlada, no un desplome hacia el suelo.'],
      },
    },
    'push-standard': {
      name: 'Flexión de brazos estándar',
      instructions: [
        'Manos en el suelo bajo los hombros, piernas extendidas, puntas de los pies en el suelo.',
        'Flexiona los codos bajando el pecho hacia el suelo manteniendo el cuerpo en línea recta.',
        'Empuja para volver a la posición inicial.',
      ],
      executionCues: [
        'El cuerpo se mantiene rígido como una tabla de la cabeza a los talones.',
        'Si se pierde la forma correcta, es preferible volver a la variante con rodillas apoyadas.',
      ],
      easierVariant: {
        name: 'Flexión estándar con rango reducido',
        instructions: ['Realiza el mismo movimiento reduciendo la profundidad del descenso.'],
        executionCues: ['Es mejor un movimiento parcial bien ejecutado que uno completo pero incorrecto.'],
      },
      harderVariant: {
        name: 'Flexión estándar con pausa abajo',
        instructions: ['Realiza la flexión estándar y, abajo, haz una pausa de 2 segundos.'],
        executionCues: ['Mantén el cuerpo rígido también durante la pausa.'],
      },
    },
    'push-forearm-wall': {
      name: 'Empuje de antebrazos en la pared',
      instructions: [
        'De pie frente a una pared, apoya los antebrazos en la pared a la altura de los hombros, codos flexionados.',
        'Empuja los antebrazos contra la pared alejando ligeramente el cuerpo, luego suelta con control.',
        'Mantén las muñecas relajadas: la carga pasa por los antebrazos, no por las manos.',
      ],
      executionCues: [
        'El cuerpo se mantiene en línea recta, sin arquear la zona lumbar.',
        'Útil como alternativa cuando el apoyo sobre las manos no es cómodo.',
      ],
      easierVariant: {
        name: 'Empuje de antebrazos, rango reducido',
        instructions: ['Realiza el mismo movimiento con un recorrido más pequeño.'],
        executionCues: ['Un movimiento mínimo está bien para empezar.'],
      },
      harderVariant: {
        name: 'Empuje de antebrazos con pausa',
        instructions: ['Realiza el movimiento y mantén la posición de máximo empuje durante 2 segundos.'],
        executionCues: ['La pausa se mantiene controlada, sin arquear la espalda.'],
      },
    },
    'pull-superman': {
      name: 'Superman (extensión dorsal)',
      instructions: [
        'Túmbate boca abajo, brazos extendidos hacia delante, piernas extendidas.',
        'Levanta al mismo tiempo brazos, pecho y piernas unos centímetros del suelo.',
        'Baja con control.',
      ],
      executionCues: [
        'El cuello se mantiene largo, con la mirada hacia el suelo frente a ti.',
        'El movimiento es pequeño y controlado, no un tirón hacia arriba.',
      ],
      easierVariant: {
        name: 'Superman alterno',
        instructions: ['Levanta un brazo y la pierna opuesta a la vez, alternando lados.'],
        executionCues: ['Mover una sola extremidad a la vez reduce la carga en la zona lumbar.'],
      },
      harderVariant: {
        name: 'Superman con pausa isométrica',
        instructions: ['Realiza el superman y mantén la posición elevada 2-3 segundos.'],
        executionCues: ['Respira con normalidad durante la pausa.'],
      },
    },
    'pull-scapular-retraction': {
      name: 'Retracción escapular de pie',
      instructions: [
        'De pie, brazos extendidos hacia delante a la altura de los hombros, codos ligeramente flexionados.',
        'Lleva los codos hacia atrás acercando las escápulas, como si las apretaras.',
        'Vuelve lentamente a la posición inicial.',
      ],
      executionCues: [
        'El movimiento parte de la espalda, no de los brazos.',
        'Los hombros se mantienen bajos, lejos de las orejas.',
      ],
      easierVariant: {
        name: 'Retracción escapular con movimiento reducido',
        instructions: ['Realiza el mismo movimiento con un recorrido más pequeño.'],
        executionCues: ['Incluso un movimiento pequeño y controlado entrena el gesto correcto.'],
      },
      harderVariant: {
        name: 'Retracción escapular con pausa',
        instructions: ['Realiza la retracción y mantén la posición 2 segundos antes de volver.'],
        executionCues: ['Evita levantar los hombros durante la pausa.'],
      },
    },
    'pull-prone-swimmer': {
      name: 'Nado en el suelo (prone swimmer)',
      instructions: [
        'Túmbate boca abajo, brazos extendidos hacia delante, piernas extendidas.',
        'Levanta ligeramente brazos y piernas del suelo y alterna pequeños movimientos como al nadar.',
        'Mantén un ritmo lento y controlado.',
      ],
      executionCues: [
        'El movimiento es pequeño: no hace falta levantarse mucho para sentirlo trabajar.',
        'El cuello se mantiene relajado, mirada hacia abajo.',
      ],
      easierVariant: {
        name: 'Nado en el suelo solo brazos',
        instructions: ['Realiza el movimiento moviendo solo los brazos, manteniendo las piernas en el suelo.'],
        executionCues: ['Reduce las partes del cuerpo implicadas si la zona lumbar se fatiga demasiado.'],
      },
      harderVariant: {
        name: 'Nado en el suelo con pausa a mitad',
        instructions: ['Realiza el movimiento y, a mitad de la serie, mantén 2 segundos brazos y piernas elevados.'],
        executionCues: ['La pausa no debe generar tensión en el cuello.'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: 'Retracción escapular sentado',
      instructions: [
        'Siéntate en una silla estable, con la espalda apoyada en el respaldo.',
        'Lleva los codos hacia atrás acercando las escápulas, sin levantar los hombros.',
        'Vuelve lentamente a la posición inicial.',
      ],
      executionCues: [
        'La espalda se mantiene apoyada en el respaldo durante todo el movimiento.',
        'Los hombros se mantienen bajos, lejos de las orejas.',
      ],
      easierVariant: {
        name: 'Retracción escapular sentado, movimiento reducido',
        instructions: ['Realiza el mismo movimiento con un recorrido más pequeño.'],
        executionCues: ['Incluso un movimiento pequeño y controlado entrena el gesto correcto.'],
      },
      harderVariant: {
        name: 'Retracción escapular sentado con pausa',
        instructions: ['Realiza la retracción y mantén la posición 2 segundos antes de volver.'],
        executionCues: ['Evita levantar los hombros durante la pausa.'],
      },
    },
    'core-knee-plank': {
      name: 'Plancha con rodillas apoyadas',
      instructions: [
        'Antebrazos en el suelo bajo los hombros, rodillas en el suelo.',
        'Eleva las caderas formando una línea recta de las rodillas a la cabeza.',
        'Mantén la posición respirando con calma.',
      ],
      executionCues: [
        'Las caderas no caen hacia abajo ni suben demasiado.',
        'El abdomen se mantiene ligeramente contraído durante todo el tiempo.',
      ],
      easierVariant: {
        name: 'Plancha con rodillas apoyadas, tiempo reducido',
        instructions: ['Mantén la posición durante menos tiempo, con más pausas entre series.'],
        executionCues: ['Es mejor varias repeticiones breves que una sola larga e incorrecta.'],
      },
      harderVariant: {
        name: 'Plancha estándar (de puntillas)',
        instructions: ['Realiza la misma plancha levantando las rodillas del suelo, apoyándote en las puntas de los pies.'],
        executionCues: ['El cuerpo se mantiene en línea recta de la cabeza a los talones.'],
      },
    },
    'core-dead-bug': {
      name: 'Dead bug',
      instructions: [
        'Túmbate boca arriba, brazos extendidos hacia el techo, rodillas flexionadas a 90 grados sobre las caderas.',
        'Extiende lentamente un brazo detrás de la cabeza y la pierna opuesta hacia el suelo, sin tocarlo.',
        'Vuelve a la posición inicial y repite con el lado opuesto.',
      ],
      executionCues: [
        'La zona lumbar se mantiene en contacto con el suelo durante todo el movimiento.',
        'El movimiento es lento: la velocidad no es el objetivo.',
      ],
      easierVariant: {
        name: 'Dead bug con rango reducido',
        instructions: ['Realiza el mismo movimiento bajando el brazo y la pierna solo parcialmente.'],
        executionCues: ['Reduce la amplitud si la zona lumbar se despega del suelo.'],
      },
      harderVariant: {
        name: 'Dead bug con pausa en extensión',
        instructions: ['Realiza el dead bug y, con el brazo y la pierna extendidos, mantén la posición 1-2 segundos.'],
        executionCues: ['La pausa no debe hacer que la espalda se arquee.'],
      },
    },
    'core-bird-dog': {
      name: 'Bird dog',
      instructions: [
        'Manos y rodillas en el suelo, espalda en posición neutra.',
        'Extiende un brazo hacia delante y la pierna opuesta hacia atrás, manteniendo la pelvis estable.',
        'Vuelve a la posición inicial y repite con el lado opuesto.',
      ],
      executionCues: [
        'La pelvis se mantiene paralela al suelo, sin rotar.',
        'Muévete despacio: el equilibrio importa más que la amplitud del movimiento.',
      ],
      easierVariant: {
        name: 'Bird dog con una extremidad a la vez',
        instructions: ['Extiende solo el brazo o solo la pierna cada vez, en lugar de juntos.'],
        executionCues: ['Es más fácil mantener el equilibrio moviendo una sola extremidad.'],
      },
      harderVariant: {
        name: 'Bird dog con pausa en extensión',
        instructions: ['Realiza el bird dog y mantén la posición extendida 2-3 segundos.'],
        executionCues: ['Sigue respirando durante la pausa.'],
      },
    },
    'core-standing-brace': {
      name: 'Activación abdominal de pie',
      instructions: [
        'De pie, manos en las caderas o cruzadas sobre el pecho, pies a la anchura de las caderas.',
        'Contrae suavemente el abdomen como si alejaras el ombligo del cinturón.',
        'Mantén la contracción unos segundos respirando con normalidad y luego suelta.',
      ],
      executionCues: [
        'La pelvis se mantiene quieta, sin arquear ni curvar la zona lumbar.',
        'La contracción es ligera y sostenible, no una rigidez total.',
      ],
      easierVariant: {
        name: 'Activación abdominal de pie, tiempo reducido',
        instructions: ['Mantén la contracción durante menos tiempo, con más repeticiones breves.'],
        executionCues: ['Es mejor varias repeticiones breves que una larga con pérdida de control.'],
      },
      harderVariant: {
        name: 'Activación abdominal de pie con ligera inclinación del torso',
        instructions: [
          'Realiza la contracción abdominal y, manteniéndola, inclina ligeramente el torso hacia delante.',
          'Vuelve a la posición erguida con control.',
        ],
        executionCues: ['La inclinación se mantiene mínima: el control importa más que la amplitud.'],
      },
    },
    'mobility-march': {
      name: 'Marcha en el sitio',
      instructions: [
        'De pie, empieza a caminar en el sitio levantando los pies alternativamente.',
        'Mueve los brazos de forma natural, como al caminar.',
        'Mantén un ritmo que te permita respirar sin fatiga excesiva.',
      ],
      executionCues: ['Los pasos se mantienen ligeros: sin impacto fuerte contra el suelo.'],
      easierVariant: {
        name: 'Marcha lenta',
        instructions: ['Realiza la marcha a un ritmo más lento, con una elevación mínima de los pies.'],
        executionCues: ['Puedes apoyarte ligeramente en un soporte si necesitas equilibrio.'],
      },
      harderVariant: {
        name: 'Marcha con rodillas altas',
        instructions: ['Realiza la marcha levantando las rodillas más alto, manteniendo el control.'],
        executionCues: ['El torso se mantiene erguido incluso cuando las rodillas suben.'],
      },
    },
    'mobility-step-touch': {
      name: 'Step touch lateral',
      instructions: [
        'De pie, da un paso lateral con un pie, luego acerca el otro pie sin cruzarlo.',
        'Repite con el lado opuesto, alternando.',
        'Mantén las rodillas suaves durante el movimiento.',
      ],
      executionCues: ['Los movimientos se mantienen fluidos, sin tirones bruscos.'],
      easierVariant: {
        name: 'Step touch con paso reducido',
        instructions: ['Realiza el mismo movimiento con pasos laterales más cortos.'],
        executionCues: ['Reduce la amplitud si sientes inestabilidad.'],
      },
      harderVariant: {
        name: 'Step touch con brazos implicados',
        instructions: ['Realiza el step touch añadiendo un movimiento fluido de brazos hacia arriba en cada paso.'],
        executionCues: ['Los brazos se mueven de forma controlada, sin impulsos bruscos.'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: 'Circunducciones de cadera y hombros',
      instructions: [
        'De pie, manos en las caderas, realiza circunducciones lentas de la pelvis en un sentido y luego en el otro.',
        'Después realiza circunducciones de hombros, elevándolos hacia adelante-arriba-atrás-abajo.',
        'Muévete dentro de una amplitud cómoda.',
      ],
      executionCues: ['El movimiento se mantiene lento y controlado, sin forzar el final del recorrido articular.'],
      easierVariant: {
        name: 'Circunducciones con amplitud reducida',
        instructions: ['Realiza el mismo movimiento con círculos más pequeños.'],
        executionCues: ['Está bien reducir la amplitud si una zona está más rígida.'],
      },
      harderVariant: {
        name: 'Circunducciones con mayor amplitud y repeticiones',
        instructions: ['Realiza el mismo movimiento con círculos más amplios, manteniendo el control.'],
        executionCues: ['La amplitud aumenta solo si se mantiene cómoda.'],
      },
    },
    'fullbody-cat-cow': {
      name: 'Cat-cow (movilidad de columna)',
      instructions: [
        'Manos y rodillas en el suelo, espalda en posición neutra.',
        'Inspira arqueando ligeramente la espalda hacia abajo y elevando la mirada.',
        'Espira redondeando la espalda hacia arriba y llevando el mentón hacia el pecho.',
      ],
      executionCues: ['El movimiento sigue la respiración, sin forzar la amplitud.'],
      easierVariant: {
        name: 'Cat-cow con movimiento reducido',
        instructions: ['Realiza el mismo movimiento con un recorrido más pequeño.'],
        executionCues: ['Un movimiento mínimo está bien si la espalda está rígida.'],
      },
      harderVariant: {
        name: 'Cat-cow con pausa al final del recorrido',
        instructions: ['Realiza el movimiento y, al final del recorrido, mantén la posición 1-2 segundos.'],
        executionCues: ['La pausa se mantiene cómoda, sin tensión.'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'Levantarse de la silla (sit-to-stand)',
      instructions: [
        'Siéntate en el borde de una silla estable, con los pies apoyados en el suelo.',
        'Inclínate ligeramente hacia delante y ponte de pie sin usar las manos, si es posible.',
        'Siéntate de nuevo con control, sin dejarte caer.',
      ],
      executionCues: ['El movimiento es lento tanto al subir como al bajar.'],
      easierVariant: {
        name: 'Levantarse de la silla asistido',
        instructions: ['Realiza el mismo movimiento ayudándote con las manos apoyadas en los reposabrazos o las rodillas.'],
        executionCues: ['Usar las manos no es un problema: lo importante es el control del movimiento.'],
      },
      harderVariant: {
        name: 'Levantarse de la silla lento',
        instructions: ['Realiza el movimiento ralentizando tanto la fase de subida como la de bajada.'],
        executionCues: ['Ralentizar aumenta el trabajo requerido sin necesidad de saltar o empujar con fuerza.'],
      },
    },
  },
};

export default es;
