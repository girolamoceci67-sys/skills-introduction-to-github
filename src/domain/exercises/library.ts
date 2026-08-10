import type { Exercise } from './types';

/**
 * Contenuti originali. Ogni esercizio è eseguibile a corpo libero in uno spazio
 * domestico ridotto (min. 2x2 m). Il tier massimo (3) resta a intensità accessibile:
 * v1 non include progressioni atletiche/avanzate.
 */
export const exerciseLibrary: Exercise[] = [
  // --- Gambe e glutei ---
  {
    id: 'legs-squat',
    name: 'Squat a corpo libero',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'legs-glute-bridge',
    name: 'Ponte glutei',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'legs-split-squat',
    name: 'Affondo statico (split squat)',
    muscleGroup: 'legs_glutes',
    baseDifficultyTier: 2,
    movementType: 'reps',
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
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },

  // --- Spinta (push) ---
  {
    id: 'push-wall',
    name: 'Push-up al muro',
    muscleGroup: 'push',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['wrists', 'shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-knee',
    name: 'Push-up sulle ginocchia',
    muscleGroup: 'push',
    baseDifficultyTier: 2,
    movementType: 'reps',
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
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-standard',
    name: 'Push-up standard',
    muscleGroup: 'push',
    baseDifficultyTier: 3,
    movementType: 'reps',
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
    contraindicationTags: ['wrists', 'shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'push-forearm-wall',
    name: 'Spinta al muro sugli avambracci',
    muscleGroup: 'push',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Tirata (pull) ---
  {
    id: 'pull-superman',
    name: 'Superman (estensione dorsale)',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-scapular-retraction',
    name: 'Retrazioni scapolari in piedi',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['shoulders'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-prone-swimmer',
    name: 'Nuoto a terra (prone swimmer)',
    muscleGroup: 'pull',
    baseDifficultyTier: 2,
    movementType: 'reps',
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
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'pull-seated-scapular-squeeze',
    name: 'Retrazione scapolare da seduti',
    muscleGroup: 'pull',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Core ---
  {
    id: 'core-knee-plank',
    name: 'Plank sulle ginocchia',
    muscleGroup: 'core',
    baseDifficultyTier: 1,
    movementType: 'hold',
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
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-dead-bug',
    name: 'Dead bug',
    muscleGroup: 'core',
    baseDifficultyTier: 2,
    movementType: 'reps',
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
    contraindicationTags: ['back'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-bird-dog',
    name: 'Bird dog',
    muscleGroup: 'core',
    baseDifficultyTier: 2,
    movementType: 'reps',
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
    contraindicationTags: ['back', 'wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'core-standing-brace',
    name: 'Attivazione addominale in piedi',
    muscleGroup: 'core',
    baseDifficultyTier: 1,
    movementType: 'hold',
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
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },

  // --- Mobilità e cardio a basso impatto ---
  {
    id: 'mobility-march',
    name: 'Marcia sul posto',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['none'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'mobility-step-touch',
    name: 'Step touch laterale',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'mobility-shoulder-hip-circles',
    name: 'Circonduzioni di anche e spalle',
    muscleGroup: 'mobility_cardio',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['shoulders'],
    spaceRequirement: '2x2m',
  },

  // --- Full body (disponibili nella libreria, non ancora usati dal generatore automatico del piano) ---
  {
    id: 'fullbody-cat-cow',
    name: 'Cat-cow (mobilità della colonna)',
    muscleGroup: 'full_body',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['wrists'],
    spaceRequirement: '2x2m',
  },
  {
    id: 'fullbody-sit-to-stand',
    name: 'Alzata da seduto (sit-to-stand)',
    muscleGroup: 'full_body',
    baseDifficultyTier: 1,
    movementType: 'reps',
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
    contraindicationTags: ['knees'],
    spaceRequirement: '2x2m',
  },
];
