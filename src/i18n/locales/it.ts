import type { LocaleResource } from '../resourceTypes';

const it: LocaleResource = {
  common: {
    continue: 'Continua',
    cancel: 'Annulla',
    save: 'Salva',
    saving: 'Salvataggio…',
    retry: 'Riprova',
    exit: 'Esci',
  },
  language: {
    title: 'Scegli la tua lingua',
    subtitle: 'Potrai cambiarla in seguito dalle impostazioni.',
    continue: 'Continua',
  },
  auth: {
    createTitle: 'Crea il tuo accesso',
    createSubtitle: 'Scegli username e password per proteggere l’app su questo dispositivo.',
    loginTitle: 'Bentornato',
    loginSubtitle: 'Accedi con le credenziali create su questo dispositivo.',
    usernameLabel: 'Username',
    usernamePlaceholder: 'Il tuo username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'La tua password',
    confirmPasswordLabel: 'Conferma password',
    confirmPasswordPlaceholder: 'Ripeti la password',
    createButton: 'Crea accesso',
    loginButton: 'Accedi',
    errorUsernameRequired: 'Inserisci uno username.',
    errorPasswordTooShort: 'La password deve avere almeno 6 caratteri.',
    errorPasswordMismatch: 'Le due password non coincidono.',
    errorInvalidCredentials: 'Username o password non corretti.',
    forgotHint: 'Le credenziali sono salvate solo su questo dispositivo: se le dimentichi non è possibile recuperarle da remoto.',
  },
  onboarding: {
    welcomeTitle: 'Iniziamo',
    welcomeBody:
      'Qualche domanda veloce per costruire il tuo primo piano di allenamento a corpo libero, pensato per casa e senza attrezzi. Il piano si adatterà nel tempo in base a come ti senti dopo ogni sessione.',
    welcomeDisclaimer:
      'Questa app propone esercizi a corpo libero a intensità accessibile e non sostituisce il parere di un medico o di un fisioterapista. Se hai dubbi sulla tua condizione fisica, consulta un professionista prima di iniziare.',
    start: 'Comincia',
    levelTitle: 'Da dove parti?',
    levelSubtitle: 'Serve per calibrare l’intensità del primo piano.',
    goalTitle: 'Qual è il tuo obiettivo principale?',
    goalSubtitle: 'Puoi cambiarlo in seguito dalle impostazioni.',
    availabilityTitle: 'Quanti giorni a settimana puoi allenarti?',
    availabilitySubtitle: 'Distribuiremo gli allenamenti nella settimana lasciando spazio al recupero.',
    daysPerWeek: '{{count}} giorni a settimana',
    limitationsTitle: 'Hai limitazioni fisiche da segnalare?',
    limitationsSubtitle:
      'Eviteremo o adatteremo gli esercizi che le coinvolgono direttamente. Puoi selezionarne più di una.',
    limitationsDisclaimer:
      'Queste informazioni servono solo a personalizzare la selezione degli esercizi e non costituiscono una valutazione medica.',
    createPlan: 'Crea il mio piano',
    preparingPlan: 'Stiamo preparando il tuo piano',
    saveErrorTitle: 'Non siamo riusciti a salvare il profilo',
    saveErrorSubtitle: 'Controlla le risposte date nei passaggi precedenti e riprova.',
    backToStart: 'Torna all’inizio',
    levelOptions: {
      sedentary: { title: 'Parto da zero', description: 'Non mi alleno regolarmente da molto tempo' },
      occasional: { title: 'Mi muovo ogni tanto', description: 'Faccio attività fisica in modo saltuario' },
      returning: {
        title: 'Riprendo dopo una pausa',
        description: 'Mi allenavo con costanza e mi sono fermato/a',
      },
    },
    goalOptions: {
      stay_consistent: {
        title: 'Creare un’abitudine costante',
        description: 'L’obiettivo principale è allenarmi con regolarità',
      },
      build_strength_foundation: {
        title: 'Costruire una base di forza',
        description: 'Voglio sentirmi più forte nei movimenti di tutti i giorni',
      },
      improve_mobility: {
        title: 'Migliorare la mobilità',
        description: 'Mi interessa muovermi meglio e con più libertà',
      },
      general_energy: {
        title: 'Avere più energia',
        description: 'Cerco un’attività che mi faccia sentire meglio nella giornata',
      },
    },
    limitationOptions: {
      knees: { title: 'Ginocchia', description: 'Preferisco evitare impatti o carichi diretti sulle ginocchia' },
      back: { title: 'Schiena', description: 'Preferisco evitare movimenti che caricano la zona lombare' },
      shoulders: {
        title: 'Spalle',
        description: 'Preferisco evitare movimenti sopra la testa o a carico diretto',
      },
      wrists: { title: 'Polsi', description: 'Preferisco evitare l’appoggio prolungato sui polsi' },
      none: { title: 'Nessuna limitazione', description: 'Al momento non ho limitazioni da segnalare' },
    },
  },
  notifications: {
    reminderChannelName: 'Promemoria allenamento',
    reminderTitle: 'È ora di allenarti',
    reminderBody: 'Il tuo allenamento a corpo libero di oggi ti aspetta.',
  },
  tabs: {
    home: 'Home',
    library: 'Libreria',
    progress: 'Progressi',
  },
  home: {
    title: 'Il tuo piano di questa settimana',
    subtitle: 'Livello di difficoltà attuale: {{tier}} di 3',
    restDay: 'Giorno di riposo',
    today: 'oggi',
    done: 'completato ✓',
    start: 'Avvia allenamento',
    redo: 'Rifai allenamento',
    noProfileTitle: 'Profilo non trovato',
    noProfileSubtitle: 'Riavvia l’app per rifare l’onboarding.',
    errorTitle: 'Non siamo riusciti a generare il piano',
  },
  library: {
    title: 'Libreria esercizi',
    subtitle: 'Tutti gli esercizi sono a corpo libero, pensati per uno spazio domestico di almeno 2x2 m.',
    levelBadge: 'Livello base {{tier}} di 3',
    excludedBadge: 'Escluso per alcune limitazioni',
    notFound: 'Esercizio non trovato',
    previewCaption: 'Anteprima del movimento',
    executionCuesHeading: 'Segnali di corretta esecuzione',
    contraindicationDisclaimer:
      'Questo esercizio viene evitato automaticamente se hai segnalato limitazioni a: {{tags}}. Non è una valutazione medica: in caso di dubbi, consulta un professionista.',
  },
  session: {
    exitConfirmTitle: 'Uscire dall’allenamento?',
    exitConfirmBody: 'I progressi di questa sessione non completata andranno persi.',
    exitConfirmCancel: 'Continua allenamento',
    exitConfirmConfirm: 'Esci',
    notAvailableTitle: 'Allenamento non disponibile',
    notAvailableSubtitle: 'Torna alla home e riprova.',
    backToHome: 'Torna alla home',
    energyTitle: 'Come ti senti oggi?',
    energySubtitle: '1 = poca energia · 5 = tanta energia',
    progress: 'Esercizio {{current}} di {{total}} — Serie {{setCurrent}} di {{setTotal}}',
    holdLabel: 'Mantieni la posizione',
    reps: '{{count}} ripetizioni',
    setComplete: 'Serie completata',
    rest: 'Riposo',
    skipRest: 'Salta riposo',
    feedbackTitle: 'Come è andata?',
  },
  celebration: {
    title: 'Allenamento completato!',
    subtitle_one: 'Hai portato a termine {{count}} esercizio su {{total}}. Bel lavoro.',
    subtitle_other: 'Hai portato a termine {{count}} esercizi su {{total}}. Bel lavoro.',
    continue: 'Continua',
  },
  progress: {
    title: 'Progressi',
    streak_one: '{{count}} allenamento consecutivo',
    streak_other: '{{count}} allenamenti consecutivi',
    weeklyAdherence: 'Aderenza settimanale',
    weeklyGoal: 'Obiettivo di questa settimana',
    goalProgress: '{{completed}} di {{target}} allenamenti completati',
    goalReminderSuffix: ' · promemoria alle {{time}}',
    noGoalSet: 'Non hai ancora impostato un obiettivo per questa settimana.',
    editGoal: 'Modifica obiettivo',
    setGoal: 'Imposta obiettivo',
    howManyThisWeek: 'Quanti allenamenti vuoi completare questa settimana?',
    dailyReminderTitle: 'Promemoria giornaliero',
    dailyReminderDesc: 'Ti avvisiamo con una notifica ogni giorno',
    sessionHistory: 'Storico sessioni',
    noSessions: 'Nessuna sessione registrata ancora.',
    reminderNotEnabledTitle: 'Promemoria non attivato',
    reminderNotEnabledBody:
      'L’obiettivo è stato salvato, ma senza il permesso di inviare notifiche non possiamo ricordarti di allenarti. Puoi abilitarlo dalle impostazioni del telefono.',
    noProfile: 'Profilo non trovato',
    loadErrorTitle: 'Non siamo riusciti a caricare i progressi',
  },
  feedback: {
    easy: 'Facile',
    right: 'Giusto',
    hard: 'Difficile',
  },
  sessionStatus: {
    completed: 'Completata',
    abandoned: 'Abbandonata',
    skipped: 'Saltata',
  },
  muscleGroups: {
    full_body: 'Corpo intero',
    legs_glutes: 'Gambe e glutei',
    core: 'Core',
    push: 'Spinta',
    pull: 'Tirata',
    mobility_cardio: 'Mobilità e cardio',
  },
  variants: {
    easier: 'Variante facilitata',
    base: 'Variante base',
    harder: 'Variante avanzata',
  },
  limitations: {
    knees: 'ginocchia',
    back: 'schiena',
    shoulders: 'spalle',
    wrists: 'polsi',
  },
  weekdays: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
  exercises: {
    'legs-squat': {
      name: 'Squat a corpo libero',
      instructions: [
        'In piedi, piedi larghi quanto le spalle, punte leggermente verso l’esterno.',
        'Piega le ginocchia e spingi i fianchi indietro come per sederti su una sedia.',
        'Scendi finché le cosce sono comode da controllare, poi risali spingendo sui talloni.',
      ],
      executionCues: [
        'Le ginocchia seguono la direzione delle punte dei piedi, senza cadere verso l’interno.',
        'Il peso resta distribuito su tutta la pianta del piede, talloni a terra.',
        'La schiena resta lunga, senza inarcarsi né incurvarsi.',
      ],
      easierVariant: {
        name: 'Squat assistito con appoggio',
        instructions: [
          'Mettiti di fronte a una sedia stabile o al bordo di un mobile, mani appoggiate leggere.',
          'Esegui lo stesso movimento dello squat usando l’appoggio solo per l’equilibrio.',
          'Riduci la profondità della discesa se necessario.',
        ],
        executionCues: ['Le braccia aiutano l’equilibrio, non sollevano il corpo.'],
      },
      harderVariant: {
        name: 'Squat con pausa in basso',
        instructions: [
          'Esegui lo squat come di base.',
          'Nel punto più basso, fai una pausa di 2 secondi mantenendo la posizione controllata.',
          'Risali spingendo sui talloni.',
        ],
        executionCues: ['Durante la pausa il tronco resta stabile, senza oscillare.'],
      },
    },
    'legs-glute-bridge': {
      name: 'Ponte glutei',
      instructions: [
        'Sdraiati sulla schiena, ginocchia piegate, piedi appoggiati a terra vicino ai glutei.',
        'Spingi i talloni a terra e solleva i fianchi verso l’alto.',
        'Stringi i glutei in alto, poi scendi con controllo.',
      ],
      executionCues: [
        'La spinta parte dai talloni, non dalle punte dei piedi.',
        'In alto il corpo forma una linea dritta tra ginocchia e spalle, senza inarcare troppo la zona lombare.',
      ],
      easierVariant: {
        name: 'Ponte glutei a range ridotto',
        instructions: ['Esegui lo stesso movimento sollevando i fianchi solo di pochi centimetri.'],
        executionCues: ['Meglio un movimento piccolo e controllato che uno ampio e brusco.'],
      },
      harderVariant: {
        name: 'Ponte glutei con pausa in alto',
        instructions: [
          'Esegui il ponte glutei come di base.',
          'In alto, mantieni la posizione per 2-3 secondi prima di scendere.',
        ],
        executionCues: ['Continua a respirare durante la pausa, senza trattenere il fiato.'],
      },
    },
    'legs-split-squat': {
      name: 'Affondo statico (split squat)',
      instructions: [
        'Fai un passo lungo in avanti con un piede, mantenendo l’altro dietro.',
        'Piega entrambe le ginocchia scendendo verso il basso in verticale.',
        'Risali spingendo sulla gamba davanti, poi ripeti dal lato opposto.',
      ],
      executionCues: [
        'Il ginocchio davanti resta sopra la caviglia, non oltre le punte del piede.',
        'Il busto resta eretto durante la discesa.',
      ],
      easierVariant: {
        name: 'Mezzo affondo statico',
        instructions: ['Esegui lo stesso movimento riducendo la profondità della discesa.'],
        executionCues: ['Usa un appoggio a una parete o sedia se serve equilibrio in più.'],
      },
      harderVariant: {
        name: 'Affondo statico con sollevamento del tallone posteriore',
        instructions: [
          'Esegui l’affondo statico sollevando il tallone del piede posteriore da terra.',
          'Mantieni l’equilibrio durante tutta la ripetizione.',
        ],
        executionCues: ['Movimento lento: la maggiore instabilità richiede più controllo, non più velocità.'],
      },
    },
    'push-wall': {
      name: 'Push-up al muro',
      instructions: [
        'In piedi a circa un passo da un muro, mani appoggiate all’altezza delle spalle.',
        'Piega i gomiti avvicinando il petto al muro.',
        'Spingi per tornare alla posizione di partenza.',
      ],
      executionCues: [
        'Il corpo resta in linea retta dalla testa ai talloni, senza inarcare la schiena.',
        'I gomiti puntano leggermente indietro, non completamente verso l’esterno.',
      ],
      easierVariant: {
        name: 'Push-up al muro con mani più in alto',
        instructions: ['Esegui lo stesso movimento con le mani appoggiate più in alto sul muro, per ridurre il carico.'],
        executionCues: ['Più le mani sono in alto, minore è lo sforzo richiesto.'],
      },
      harderVariant: {
        name: 'Push-up su superficie rialzata stabile',
        instructions: [
          'Appoggia le mani su una superficie stabile e robusta più bassa di un muro (es. un gradino fermo).',
          'Esegui il piegamento mantenendo il corpo in linea retta.',
        ],
        executionCues: ['Usa solo superfici stabili e antiscivolo.'],
      },
    },
    'push-knee': {
      name: 'Push-up sulle ginocchia',
      instructions: [
        'Mani a terra sotto le spalle, ginocchia a terra, corpo in linea da ginocchia a testa.',
        'Piega i gomiti abbassando il petto verso il pavimento.',
        'Spingi per tornare alla posizione di partenza.',
      ],
      executionCues: [
        'Gli addominali restano leggermente contratti per non far cadere i fianchi.',
        'Scendi solo fino a dove riesci a mantenere la forma corretta.',
      ],
      easierVariant: {
        name: 'Push-up sulle ginocchia a range ridotto',
        instructions: ['Esegui lo stesso movimento scendendo solo per metà del percorso.'],
        executionCues: ['Meglio ridurre l’ampiezza che perdere la linea del corpo.'],
      },
      harderVariant: {
        name: 'Push-up sulle ginocchia con pausa in basso',
        instructions: ['Esegui il push-up sulle ginocchia e, in basso, fai una pausa di 1-2 secondi.'],
        executionCues: ['La pausa deve essere controllata, non un crollo verso il pavimento.'],
      },
    },
    'push-standard': {
      name: 'Push-up standard',
      instructions: [
        'Mani a terra sotto le spalle, gambe distese, punte dei piedi a terra.',
        'Piega i gomiti abbassando il petto verso il pavimento mantenendo il corpo in linea retta.',
        'Spingi per tornare alla posizione di partenza.',
      ],
      executionCues: [
        'Il corpo resta rigido come una tavola dalla testa ai talloni.',
        'Se la forma corretta si perde, è preferibile tornare alla variante sulle ginocchia.',
      ],
      easierVariant: {
        name: 'Push-up standard a range ridotto',
        instructions: ['Esegui lo stesso movimento riducendo la profondità della discesa.'],
        executionCues: ['Meglio un movimento parziale ben eseguito che uno completo scorretto.'],
      },
      harderVariant: {
        name: 'Push-up standard con pausa in basso',
        instructions: ['Esegui il push-up standard e, in basso, fai una pausa di 2 secondi.'],
        executionCues: ['Mantieni il corpo rigido anche durante la pausa.'],
      },
    },
    'push-forearm-wall': {
      name: 'Spinta al muro sugli avambracci',
      instructions: [
        'In piedi di fronte a un muro, appoggia gli avambracci al muro all’altezza delle spalle, gomiti piegati.',
        'Spingi gli avambracci contro il muro allontanando leggermente il corpo, poi rilascia con controllo.',
        'Mantieni i polsi rilassati: il carico passa dagli avambracci, non dalle mani.',
      ],
      executionCues: [
        'Il corpo resta in linea retta, senza inarcare la zona lombare.',
        'Utile come alternativa quando l’appoggio sulle mani non è comodo.',
      ],
      easierVariant: {
        name: 'Spinta al muro sugli avambracci a range ridotto',
        instructions: ['Esegui lo stesso movimento con un’escursione più piccola.'],
        executionCues: ['Va bene un movimento minimo per iniziare.'],
      },
      harderVariant: {
        name: 'Spinta al muro sugli avambracci con pausa',
        instructions: ['Esegui il movimento e mantieni la posizione di massima spinta per 2 secondi.'],
        executionCues: ['La pausa resta controllata, senza inarcare la schiena.'],
      },
    },
    'pull-superman': {
      name: 'Superman (estensione dorsale)',
      instructions: [
        'Sdraiati a pancia in giù, braccia distese in avanti, gambe distese.',
        'Solleva contemporaneamente braccia, petto e gambe di pochi centimetri da terra.',
        'Scendi con controllo.',
      ],
      executionCues: [
        'Il collo resta lungo, lo sguardo verso il pavimento davanti a te.',
        'Il movimento è piccolo e controllato, non uno strappo verso l’alto.',
      ],
      easierVariant: {
        name: 'Superman alternato',
        instructions: ['Solleva un braccio e la gamba opposta alla volta, alternando i lati.'],
        executionCues: ['Muovere un solo arto alla volta riduce il carico sulla zona lombare.'],
      },
      harderVariant: {
        name: 'Superman con pausa isometrica',
        instructions: ['Esegui il Superman e mantieni la posizione sollevata per 2-3 secondi.'],
        executionCues: ['Respira normalmente durante la pausa.'],
      },
    },
    'pull-scapular-retraction': {
      name: 'Retrazioni scapolari in piedi',
      instructions: [
        'In piedi, braccia distese in avanti all’altezza delle spalle, gomiti leggermente piegati.',
        'Porta i gomiti indietro avvicinando le scapole, come per stringerle insieme.',
        'Torna lentamente alla posizione di partenza.',
      ],
      executionCues: [
        'Il movimento parte dalla schiena, non dalle braccia.',
        'Le spalle restano basse, lontane dalle orecchie.',
      ],
      easierVariant: {
        name: 'Retrazioni scapolari a movimento ridotto',
        instructions: ['Esegui lo stesso movimento con un’escursione più piccola.'],
        executionCues: ['Anche un piccolo movimento controllato allena il gesto corretto.'],
      },
      harderVariant: {
        name: 'Retrazioni scapolari con pausa',
        instructions: ['Esegui la retrazione e mantieni la posizione per 2 secondi prima di tornare indietro.'],
        executionCues: ['Evita di alzare le spalle durante la pausa.'],
      },
    },
    'pull-prone-swimmer': {
      name: 'Nuoto a terra (prone swimmer)',
      instructions: [
        'Sdraiati a pancia in giù, braccia distese in avanti, gambe distese.',
        'Solleva leggermente braccia e gambe da terra e alterna piccoli movimenti come nel nuoto.',
        'Mantieni un ritmo lento e controllato.',
      ],
      executionCues: [
        'Il movimento resta piccolo: non serve sollevarsi molto per sentirlo lavorare.',
        'Il collo resta rilassato, sguardo verso il basso.',
      ],
      easierVariant: {
        name: 'Nuoto a terra solo braccia',
        instructions: ['Esegui il movimento muovendo solo le braccia, mantenendo le gambe a terra.'],
        executionCues: ['Riduci la parte di corpo coinvolta se la zona lombare si affatica troppo.'],
      },
      harderVariant: {
        name: 'Nuoto a terra con pausa a metà',
        instructions: ['Esegui il movimento e, a metà serie, mantieni per 2 secondi braccia e gambe sollevate.'],
        executionCues: ['La pausa non deve creare tensione al collo.'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: 'Retrazione scapolare da seduti',
      instructions: [
        'Siediti su una sedia stabile, schiena appoggiata allo schienale.',
        'Porta i gomiti indietro avvicinando le scapole, senza sollevare le spalle.',
        'Torna lentamente alla posizione di partenza.',
      ],
      executionCues: [
        'La schiena resta appoggiata allo schienale per tutto il movimento.',
        'Le spalle restano basse, lontane dalle orecchie.',
      ],
      easierVariant: {
        name: 'Retrazione scapolare da seduti a movimento ridotto',
        instructions: ['Esegui lo stesso movimento con un’escursione più piccola.'],
        executionCues: ['Anche un piccolo movimento controllato allena il gesto corretto.'],
      },
      harderVariant: {
        name: 'Retrazione scapolare da seduti con pausa',
        instructions: ['Esegui la retrazione e mantieni la posizione per 2 secondi prima di tornare indietro.'],
        executionCues: ['Evita di alzare le spalle durante la pausa.'],
      },
    },
    'core-knee-plank': {
      name: 'Plank sulle ginocchia',
      instructions: [
        'Avambracci a terra sotto le spalle, ginocchia a terra.',
        'Solleva i fianchi formando una linea retta da ginocchia a testa.',
        'Mantieni la posizione respirando con calma.',
      ],
      executionCues: [
        'I fianchi non cadono verso il basso né si alzano troppo.',
        'Gli addominali restano leggermente contratti per tutta la durata.',
      ],
      easierVariant: {
        name: 'Plank sulle ginocchia a tempo ridotto',
        instructions: ['Mantieni la posizione per una durata più breve, con più pause tra le serie.'],
        executionCues: ['Meglio più ripetizioni brevi che una sola lunga e scorretta.'],
      },
      harderVariant: {
        name: 'Plank standard (sulle punte dei piedi)',
        instructions: ['Esegui lo stesso plank sollevando le ginocchia da terra, in appoggio sulle punte dei piedi.'],
        executionCues: ['Il corpo resta in linea retta dalla testa ai talloni.'],
      },
    },
    'core-dead-bug': {
      name: 'Dead bug',
      instructions: [
        'Sdraiati sulla schiena, braccia tese verso il soffitto, ginocchia piegate a 90 gradi sopra i fianchi.',
        'Estendi lentamente un braccio dietro la testa e la gamba opposta verso il pavimento, senza toccarlo.',
        'Torna alla posizione di partenza e ripeti dal lato opposto.',
      ],
      executionCues: [
        'La zona lombare resta a contatto con il pavimento per tutto il movimento.',
        'Il movimento è lento: la velocità non è l’obiettivo.',
      ],
      easierVariant: {
        name: 'Dead bug a range ridotto',
        instructions: ['Esegui lo stesso movimento abbassando braccio e gamba solo parzialmente.'],
        executionCues: ['Riduci l’ampiezza se la zona lombare si stacca dal pavimento.'],
      },
      harderVariant: {
        name: 'Dead bug con pausa in estensione',
        instructions: ['Esegui il dead bug e, con braccio e gamba estesi, mantieni la posizione per 1-2 secondi.'],
        executionCues: ['La pausa non deve far inarcare la schiena.'],
      },
    },
    'core-bird-dog': {
      name: 'Bird dog',
      instructions: [
        'Mani e ginocchia a terra, schiena in posizione neutra.',
        'Estendi un braccio in avanti e la gamba opposta indietro, mantenendo il bacino stabile.',
        'Torna alla posizione di partenza e ripeti dal lato opposto.',
      ],
      executionCues: [
        'Il bacino resta parallelo al pavimento, senza ruotare.',
        'Muoviti lentamente: l’equilibrio conta più dell’ampiezza del movimento.',
      ],
      easierVariant: {
        name: 'Bird dog un arto alla volta',
        instructions: ['Estendi solo il braccio o solo la gamba per volta, invece che insieme.'],
        executionCues: ['Più semplice mantenere l’equilibrio muovendo un solo arto.'],
      },
      harderVariant: {
        name: 'Bird dog con pausa in estensione',
        instructions: ['Esegui il bird dog e mantieni la posizione estesa per 2-3 secondi.'],
        executionCues: ['Continua a respirare durante la pausa.'],
      },
    },
    'core-standing-brace': {
      name: 'Attivazione addominale in piedi',
      instructions: [
        'In piedi, mani sui fianchi o incrociate sul petto, piedi larghi quanto i fianchi.',
        'Contrai dolcemente gli addominali come per allontanare l’ombelico dalla cintura.',
        'Mantieni la contrazione per qualche secondo respirando normalmente, poi rilascia.',
      ],
      executionCues: [
        'Il bacino resta fermo, senza inarcare o incurvare la zona lombare.',
        'La contrazione è leggera e sostenibile, non un irrigidimento totale.',
      ],
      easierVariant: {
        name: 'Attivazione addominale in piedi a tempo ridotto',
        instructions: ['Mantieni la contrazione per un tempo più breve, con più ripetizioni brevi.'],
        executionCues: ['Meglio più ripetizioni brevi che una lunga con perdita di controllo.'],
      },
      harderVariant: {
        name: 'Attivazione addominale in piedi con leggero piegamento del busto',
        instructions: [
          'Esegui la contrazione addominale e, mantenendola, inclina leggermente il busto in avanti.',
          'Torna alla posizione eretta con controllo.',
        ],
        executionCues: ['L’inclinazione resta minima: il controllo conta più dell’ampiezza.'],
      },
    },
    'mobility-march': {
      name: 'Marcia sul posto',
      instructions: [
        'In piedi, inizia a camminare sul posto sollevando alternativamente i piedi.',
        'Muovi le braccia in modo naturale, come in una camminata.',
        'Mantieni un ritmo che ti permetta di respirare senza affanno eccessivo.',
      ],
      executionCues: ['I passi restano leggeri: nessun impatto forte sul pavimento.'],
      easierVariant: {
        name: 'Marcia lenta',
        instructions: ['Esegui la marcia a un ritmo più lento, con sollevamento minimo dei piedi.'],
        executionCues: ['Puoi rimanere in appoggio leggero a un supporto se serve equilibrio.'],
      },
      harderVariant: {
        name: 'Marcia con ginocchia alte',
        instructions: ['Esegui la marcia sollevando le ginocchia più in alto, mantenendo il controllo.'],
        executionCues: ['Il busto resta eretto anche quando le ginocchia salgono.'],
      },
    },
    'mobility-step-touch': {
      name: 'Step touch laterale',
      instructions: [
        'In piedi, fai un passo laterale con un piede, poi avvicina l’altro piede senza incrociarlo.',
        'Ripeti dal lato opposto, alternando.',
        'Mantieni le ginocchia morbide durante il movimento.',
      ],
      executionCues: ['I movimenti restano fluidi, senza scatti improvvisi.'],
      easierVariant: {
        name: 'Step touch a passo ridotto',
        instructions: ['Esegui lo stesso movimento con passi laterali più corti.'],
        executionCues: ['Riduci l’ampiezza se senti instabilità.'],
      },
      harderVariant: {
        name: 'Step touch con braccia coinvolte',
        instructions: ['Esegui lo step touch aggiungendo un movimento fluido delle braccia verso l’alto ad ogni passo.'],
        executionCues: ['Le braccia si muovono in modo controllato, senza slanci bruschi.'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: 'Circonduzioni di anche e spalle',
      instructions: [
        'In piedi, mani sui fianchi, esegui lente circonduzioni del bacino in un senso e poi nell’altro.',
        'Poi esegui circonduzioni delle spalle, sollevandole verso avanti-alto-indietro-basso.',
        'Muoviti entro un’ampiezza confortevole.',
      ],
      executionCues: ['Il movimento resta lento e controllato, senza forzare fine corsa articolare.'],
      easierVariant: {
        name: 'Circonduzioni a ampiezza ridotta',
        instructions: ['Esegui lo stesso movimento con cerchi più piccoli.'],
        executionCues: ['Va bene ridurre l’ampiezza se una zona è più rigida.'],
      },
      harderVariant: {
        name: 'Circonduzioni con maggiore ampiezza e ripetizioni',
        instructions: ['Esegui lo stesso movimento con cerchi più ampi, mantenendo il controllo.'],
        executionCues: ['L’ampiezza aumenta solo se resta confortevole.'],
      },
    },
    'fullbody-cat-cow': {
      name: 'Cat-cow (mobilità della colonna)',
      instructions: [
        'Mani e ginocchia a terra, schiena in posizione neutra.',
        'Inspira inarcando leggermente la schiena verso il basso e sollevando lo sguardo.',
        'Espira arrotondando la schiena verso l’alto e portando il mento verso il petto.',
      ],
      executionCues: ['Il movimento segue il respiro, senza forzare l’ampiezza.'],
      easierVariant: {
        name: 'Cat-cow a movimento ridotto',
        instructions: ['Esegui lo stesso movimento con un’escursione più piccola.'],
        executionCues: ['Va bene un movimento minimo se la schiena è rigida.'],
      },
      harderVariant: {
        name: 'Cat-cow con pausa a fine escursione',
        instructions: ['Esegui il movimento e, a fine escursione, mantieni la posizione per 1-2 secondi.'],
        executionCues: ['La pausa resta confortevole, senza tensione.'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'Alzata da seduto (sit-to-stand)',
      instructions: [
        'Siediti sul bordo di una sedia stabile, piedi appoggiati a terra.',
        'Sporgiti leggermente in avanti e alzati in piedi senza usare le mani, se possibile.',
        'Siediti di nuovo con controllo, senza lasciarti cadere.',
      ],
      executionCues: ['Il movimento è lento sia in salita che in discesa.'],
      easierVariant: {
        name: 'Alzata da seduto assistita',
        instructions: ['Esegui lo stesso movimento aiutandoti con le mani appoggiate ai braccioli o alle ginocchia.'],
        executionCues: ['Usare le mani non è un problema: l’importante è il controllo del movimento.'],
      },
      harderVariant: {
        name: 'Alzata da seduto lenta',
        instructions: ['Esegui il movimento rallentando sia la fase di salita che quella di discesa.'],
        executionCues: ['Rallentare aumenta il lavoro richiesto senza bisogno di saltare o spingere con forza.'],
      },
    },
  },
};

export default it;
