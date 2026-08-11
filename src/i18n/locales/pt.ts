import type { LocaleResource } from '../resourceTypes';

const pt: LocaleResource = {
  common: {
    continue: 'Continuar',
    cancel: 'Cancelar',
    save: 'Guardar',
    saving: 'A guardar…',
    retry: 'Tentar novamente',
    exit: 'Sair',
  },
  language: {
    title: 'Escolhe o teu idioma',
    subtitle: 'Podes alterá-lo mais tarde nas definições.',
    continue: 'Continuar',
  },
  auth: {
    createTitle: 'Cria o teu acesso',
    createSubtitle: 'Escolhe um nome de utilizador e uma palavra-passe para proteger a app neste dispositivo.',
    loginTitle: 'Bem-vindo de volta',
    loginSubtitle: 'Inicia sessão com as credenciais criadas neste dispositivo.',
    usernameLabel: 'Utilizador',
    usernamePlaceholder: 'O teu nome de utilizador',
    passwordLabel: 'Palavra-passe',
    passwordPlaceholder: 'A tua palavra-passe',
    confirmPasswordLabel: 'Confirma a palavra-passe',
    confirmPasswordPlaceholder: 'Repete a palavra-passe',
    createButton: 'Criar acesso',
    loginButton: 'Iniciar sessão',
    errorUsernameRequired: 'Introduz um nome de utilizador.',
    errorPasswordTooShort: 'A palavra-passe deve ter pelo menos 6 caracteres.',
    errorPasswordMismatch: 'As duas palavras-passe não coincidem.',
    errorInvalidCredentials: 'Utilizador ou palavra-passe incorretos.',
    forgotHint: 'As credenciais ficam guardadas apenas neste dispositivo: se as esqueceres, não é possível recuperá-las remotamente.',
  },
  onboarding: {
    welcomeTitle: 'Vamos começar',
    welcomeBody:
      'Algumas perguntas rápidas para criar o teu primeiro plano de treino com o peso do corpo, pensado para casa e sem equipamento. O plano vai-se adaptando ao longo do tempo com base em como te sentes após cada sessão.',
    welcomeDisclaimer:
      'Esta app propõe exercícios com o peso do corpo a uma intensidade acessível e não substitui o parecer de um médico ou fisioterapeuta. Se tiveres dúvidas sobre a tua condição física, consulta um profissional antes de começar.',
    start: 'Começar',
    levelTitle: 'De onde partes?',
    levelSubtitle: 'Serve para calibrar a intensidade do teu primeiro plano.',
    goalTitle: 'Qual é o teu principal objetivo?',
    goalSubtitle: 'Podes alterá-lo mais tarde nas definições.',
    availabilityTitle: 'Quantos dias por semana podes treinar?',
    availabilitySubtitle: 'Vamos distribuir os treinos ao longo da semana, deixando espaço para a recuperação.',
    daysPerWeek: '{{count}} dias por semana',
    limitationsTitle: 'Tens alguma limitação física a assinalar?',
    limitationsSubtitle:
      'Vamos evitar ou adaptar os exercícios que as envolvam diretamente. Podes selecionar mais do que uma.',
    limitationsDisclaimer:
      'Esta informação serve apenas para personalizar a seleção de exercícios e não constitui uma avaliação médica.',
    createPlan: 'Criar o meu plano',
    preparingPlan: 'Estamos a preparar o teu plano',
    saveErrorTitle: 'Não conseguimos guardar o teu perfil',
    saveErrorSubtitle: 'Verifica as respostas dadas nos passos anteriores e tenta novamente.',
    backToStart: 'Voltar ao início',
    levelOptions: {
      sedentary: { title: 'Começo do zero', description: 'Há muito tempo que não treino com regularidade' },
      occasional: { title: 'Mexo-me de vez em quando', description: 'Faço atividade física de forma ocasional' },
      returning: { title: 'A retomar após uma pausa', description: 'Treinava com constância e parei' },
    },
    goalOptions: {
      stay_consistent: {
        title: 'Criar um hábito constante',
        description: 'O meu objetivo principal é treinar com regularidade',
      },
      build_strength_foundation: {
        title: 'Construir uma base de força',
        description: 'Quero sentir-me mais forte nos movimentos do dia a dia',
      },
      improve_mobility: {
        title: 'Melhorar a mobilidade',
        description: 'Interessa-me mover-me melhor e com mais liberdade',
      },
      general_energy: {
        title: 'Ter mais energia',
        description: 'Procuro uma atividade que me faça sentir melhor ao longo do dia',
      },
    },
    limitationOptions: {
      knees: { title: 'Joelhos', description: 'Prefiro evitar impactos ou cargas diretas nos joelhos' },
      back: { title: 'Costas', description: 'Prefiro evitar movimentos que sobrecarreguem a zona lombar' },
      shoulders: { title: 'Ombros', description: 'Prefiro evitar movimentos acima da cabeça ou com carga direta' },
      wrists: { title: 'Pulsos', description: 'Prefiro evitar o apoio prolongado sobre os pulsos' },
      none: { title: 'Nenhuma limitação', description: 'Por agora não tenho limitações a assinalar' },
    },
  },
  notifications: {
    reminderChannelName: 'Lembretes de treino',
    reminderTitle: 'Hora de treinar',
    reminderBody: 'O teu treino de hoje com o peso do corpo está à tua espera.',
  },
  tabs: {
    home: 'Início',
    library: 'Biblioteca',
    progress: 'Progresso',
  },
  home: {
    title: 'O teu plano desta semana',
    subtitle: 'Nível de dificuldade atual: {{tier}} de 3',
    restDay: 'Dia de descanso',
    today: 'hoje',
    done: 'concluído ✓',
    start: 'Iniciar treino',
    redo: 'Repetir treino',
    noProfileTitle: 'Perfil não encontrado',
    noProfileSubtitle: 'Reinicia a app para refazer o registo inicial.',
    errorTitle: 'Não conseguimos gerar o teu plano',
  },
  library: {
    title: 'Biblioteca de exercícios',
    subtitle: 'Todos os exercícios são com o peso do corpo, pensados para um espaço em casa de pelo menos 2x2 m.',
    levelBadge: 'Nível base {{tier}} de 3',
    excludedBadge: 'Excluído por algumas limitações',
    notFound: 'Exercício não encontrado',
    previewCaption: 'Pré-visualização do movimento',
    executionCuesHeading: 'Sinais de execução correta',
    contraindicationDisclaimer:
      'Este exercício é evitado automaticamente se tiveres assinalado limitações em: {{tags}}. Não é uma avaliação médica: em caso de dúvida, consulta um profissional.',
  },
  session: {
    exitConfirmTitle: 'Sair do treino?',
    exitConfirmBody: 'O progresso desta sessão não concluída será perdido.',
    exitConfirmCancel: 'Continuar treino',
    exitConfirmConfirm: 'Sair',
    notAvailableTitle: 'Treino não disponível',
    notAvailableSubtitle: 'Volta ao início e tenta novamente.',
    backToHome: 'Voltar ao início',
    energyTitle: 'Como te sentes hoje?',
    energySubtitle: '1 = pouca energia · 5 = muita energia',
    progress: 'Exercício {{current}} de {{total}} — Série {{setCurrent}} de {{setTotal}}',
    holdLabel: 'Mantém a posição',
    reps: '{{count}} repetições',
    setComplete: 'Série concluída',
    rest: 'Descanso',
    skipRest: 'Saltar descanso',
    feedbackTitle: 'Como correu?',
  },
  celebration: {
    title: 'Treino concluído!',
    subtitle_one: 'Concluíste {{count}} exercício de {{total}}. Bom trabalho.',
    subtitle_other: 'Concluíste {{count}} exercícios de {{total}}. Bom trabalho.',
    continue: 'Continuar',
  },
  progress: {
    title: 'Progresso',
    streak_one: '{{count}} treino consecutivo',
    streak_other: '{{count}} treinos consecutivos',
    weeklyAdherence: 'Adesão semanal',
    weeklyGoal: 'Objetivo desta semana',
    goalProgress: '{{completed}} de {{target}} treinos concluídos',
    goalReminderSuffix: ' · lembrete às {{time}}',
    noGoalSet: 'Ainda não definiste um objetivo para esta semana.',
    editGoal: 'Editar objetivo',
    setGoal: 'Definir objetivo',
    howManyThisWeek: 'Quantos treinos queres concluir esta semana?',
    dailyReminderTitle: 'Lembrete diário',
    dailyReminderDesc: 'Avisamos-te com uma notificação todos os dias',
    sessionHistory: 'Histórico de sessões',
    noSessions: 'Ainda não há sessões registadas.',
    reminderNotEnabledTitle: 'Lembrete não ativado',
    reminderNotEnabledBody:
      'O teu objetivo foi guardado, mas sem permissão para enviar notificações não conseguimos lembrar-te de treinar. Podes ativá-lo nas definições do telemóvel.',
    noProfile: 'Perfil não encontrado',
    loadErrorTitle: 'Não conseguimos carregar o teu progresso',
  },
  feedback: {
    easy: 'Fácil',
    right: 'Adequado',
    hard: 'Difícil',
  },
  sessionStatus: {
    completed: 'Concluída',
    abandoned: 'Abandonada',
    skipped: 'Ignorada',
  },
  muscleGroups: {
    full_body: 'Corpo inteiro',
    legs_glutes: 'Pernas e glúteos',
    core: 'Core',
    push: 'Empurrar',
    pull: 'Puxar',
    mobility_cardio: 'Mobilidade e cardio',
  },
  variants: {
    easier: 'Variante facilitada',
    base: 'Variante base',
    harder: 'Variante avançada',
  },
  limitations: {
    knees: 'joelhos',
    back: 'costas',
    shoulders: 'ombros',
    wrists: 'pulsos',
  },
  weekdays: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
  exercises: {
    'legs-squat': {
      name: 'Agachamento com peso do corpo',
      instructions: [
        'De pé, com os pés à largura dos ombros, pontas ligeiramente viradas para fora.',
        'Dobra os joelhos e empurra as ancas para trás como se fosses sentar-te numa cadeira.',
        'Desce até onde consigas controlar confortavelmente as coxas e depois sobe empurrando pelos calcanhares.',
      ],
      executionCues: [
        'Os joelhos seguem a direção das pontas dos pés, sem cair para dentro.',
        'O peso mantém-se distribuído por toda a planta do pé, calcanhares no chão.',
        'As costas mantêm-se longas, sem arquear nem curvar.',
      ],
      easierVariant: {
        name: 'Agachamento assistido com apoio',
        instructions: [
          'Coloca-te em frente a uma cadeira estável ou ao rebordo de um móvel, com as mãos apoiadas levemente.',
          'Realiza o mesmo movimento do agachamento usando o apoio só para o equilíbrio.',
          'Reduz a profundidade da descida se necessário.',
        ],
        executionCues: ['Os braços ajudam no equilíbrio, não levantam o corpo.'],
      },
      harderVariant: {
        name: 'Agachamento com pausa em baixo',
        instructions: [
          'Realiza o agachamento como na versão base.',
          'No ponto mais baixo, faz uma pausa de 2 segundos mantendo o controlo.',
          'Sobe empurrando pelos calcanhares.',
        ],
        executionCues: ['Durante a pausa, o tronco mantém-se estável, sem oscilar.'],
      },
    },
    'legs-glute-bridge': {
      name: 'Ponte de glúteos',
      instructions: [
        'Deita-te de costas, joelhos dobrados, pés apoiados no chão perto dos glúteos.',
        'Empurra pelos calcanhares e eleva as ancas para cima.',
        'Aperta os glúteos no topo e depois desce com controlo.',
      ],
      executionCues: [
        'O impulso parte dos calcanhares, não das pontas dos pés.',
        'No topo, o corpo forma uma linha reta entre os joelhos e os ombros, sem arquear demasiado a zona lombar.',
      ],
      easierVariant: {
        name: 'Ponte de glúteos com amplitude reduzida',
        instructions: ['Realiza o mesmo movimento elevando as ancas apenas alguns centímetros.'],
        executionCues: ['É melhor um movimento pequeno e controlado do que um amplo e brusco.'],
      },
      harderVariant: {
        name: 'Ponte de glúteos com pausa no topo',
        instructions: [
          'Realiza a ponte de glúteos como na versão base.',
          'No topo, mantém a posição 2-3 segundos antes de descer.',
        ],
        executionCues: ['Continua a respirar durante a pausa, sem prender a respiração.'],
      },
    },
    'legs-split-squat': {
      name: 'Avanço estático (split squat)',
      instructions: [
        'Dá um passo largo em frente com um pé, mantendo o outro atrás.',
        'Dobra ambos os joelhos descendo na vertical.',
        'Sobe empurrando pela perna da frente e repete do lado oposto.',
      ],
      executionCues: [
        'O joelho da frente mantém-se acima do tornozelo, sem ultrapassar as pontas do pé.',
        'O tronco mantém-se ereto durante a descida.',
      ],
      easierVariant: {
        name: 'Meio avanço estático',
        instructions: ['Realiza o mesmo movimento reduzindo a profundidade da descida.'],
        executionCues: ['Usa um apoio numa parede ou cadeira se precisares de mais equilíbrio.'],
      },
      harderVariant: {
        name: 'Avanço estático com elevação do calcanhar traseiro',
        instructions: [
          'Realiza o avanço estático elevando do chão o calcanhar do pé de trás.',
          'Mantém o equilíbrio durante toda a repetição.',
        ],
        executionCues: ['Movimento lento: a maior instabilidade exige mais controlo, não mais velocidade.'],
      },
    },
    'push-wall': {
      name: 'Flexão na parede',
      instructions: [
        'De pé a cerca de um passo de uma parede, com as mãos apoiadas à altura dos ombros.',
        'Dobra os cotovelos aproximando o peito da parede.',
        'Empurra para voltar à posição inicial.',
      ],
      executionCues: [
        'O corpo mantém-se em linha reta da cabeça aos calcanhares, sem arquear as costas.',
        'Os cotovelos apontam ligeiramente para trás, não totalmente para fora.',
      ],
      easierVariant: {
        name: 'Flexão na parede com mãos mais altas',
        instructions: ['Realiza o mesmo movimento com as mãos apoiadas mais alto na parede, para reduzir a carga.'],
        executionCues: ['Quanto mais altas as mãos, menor o esforço exigido.'],
      },
      harderVariant: {
        name: 'Flexão numa superfície elevada estável',
        instructions: [
          'Apoia as mãos numa superfície estável e firme mais baixa do que uma parede (ex.: um degrau fixo).',
          'Realiza a flexão mantendo o corpo em linha reta.',
        ],
        executionCues: ['Usa apenas superfícies estáveis e antiderrapantes.'],
      },
    },
    'push-knee': {
      name: 'Flexão com joelhos apoiados',
      instructions: [
        'Mãos no chão sob os ombros, joelhos no chão, corpo em linha dos joelhos à cabeça.',
        'Dobra os cotovelos baixando o peito em direção ao chão.',
        'Empurra para voltar à posição inicial.',
      ],
      executionCues: [
        'O abdómen mantém-se ligeiramente contraído para as ancas não caírem.',
        'Desce apenas até onde consigas manter a forma correta.',
      ],
      easierVariant: {
        name: 'Flexão com joelhos apoiados, amplitude reduzida',
        instructions: ['Realiza o mesmo movimento descendo apenas até metade do percurso.'],
        executionCues: ['É melhor reduzir a amplitude do que perder a linha do corpo.'],
      },
      harderVariant: {
        name: 'Flexão com joelhos apoiados e pausa em baixo',
        instructions: ['Realiza a flexão com joelhos apoiados e, em baixo, faz uma pausa de 1-2 segundos.'],
        executionCues: ['A pausa deve ser controlada, não uma queda em direção ao chão.'],
      },
    },
    'push-standard': {
      name: 'Flexão padrão',
      instructions: [
        'Mãos no chão sob os ombros, pernas estendidas, pontas dos pés no chão.',
        'Dobra os cotovelos baixando o peito em direção ao chão mantendo o corpo em linha reta.',
        'Empurra para voltar à posição inicial.',
      ],
      executionCues: [
        'O corpo mantém-se rígido como uma tábua da cabeça aos calcanhares.',
        'Se a forma correta se perder, é preferível voltar à variante com joelhos apoiados.',
      ],
      easierVariant: {
        name: 'Flexão padrão com amplitude reduzida',
        instructions: ['Realiza o mesmo movimento reduzindo a profundidade da descida.'],
        executionCues: ['É melhor um movimento parcial bem executado do que um completo mas incorreto.'],
      },
      harderVariant: {
        name: 'Flexão padrão com pausa em baixo',
        instructions: ['Realiza a flexão padrão e, em baixo, faz uma pausa de 2 segundos.'],
        executionCues: ['Mantém o corpo rígido também durante a pausa.'],
      },
    },
    'push-forearm-wall': {
      name: 'Empurrão de antebraços na parede',
      instructions: [
        'De pé em frente a uma parede, apoia os antebraços na parede à altura dos ombros, cotovelos dobrados.',
        'Empurra os antebraços contra a parede afastando ligeiramente o corpo, depois liberta com controlo.',
        'Mantém os pulsos relaxados: a carga passa pelos antebraços, não pelas mãos.',
      ],
      executionCues: [
        'O corpo mantém-se em linha reta, sem arquear a zona lombar.',
        'Útil como alternativa quando o apoio sobre as mãos não é confortável.',
      ],
      easierVariant: {
        name: 'Empurrão de antebraços, amplitude reduzida',
        instructions: ['Realiza o mesmo movimento com um percurso mais pequeno.'],
        executionCues: ['Um movimento mínimo está bem para começar.'],
      },
      harderVariant: {
        name: 'Empurrão de antebraços com pausa',
        instructions: ['Realiza o movimento e mantém a posição de máximo empurrão durante 2 segundos.'],
        executionCues: ['A pausa mantém-se controlada, sem arquear as costas.'],
      },
    },
    'pull-superman': {
      name: 'Superman (extensão dorsal)',
      instructions: [
        'Deita-te de barriga para baixo, braços estendidos à frente, pernas estendidas.',
        'Levanta ao mesmo tempo braços, peito e pernas alguns centímetros do chão.',
        'Desce com controlo.',
      ],
      executionCues: [
        'O pescoço mantém-se longo, com o olhar para o chão à tua frente.',
        'O movimento é pequeno e controlado, não um puxão para cima.',
      ],
      easierVariant: {
        name: 'Superman alternado',
        instructions: ['Levanta um braço e a perna oposta de cada vez, alternando os lados.'],
        executionCues: ['Mover apenas um membro de cada vez reduz a carga na zona lombar.'],
      },
      harderVariant: {
        name: 'Superman com pausa isométrica',
        instructions: ['Realiza o superman e mantém a posição elevada 2-3 segundos.'],
        executionCues: ['Respira normalmente durante a pausa.'],
      },
    },
    'pull-scapular-retraction': {
      name: 'Retração escapular em pé',
      instructions: [
        'De pé, braços estendidos à frente à altura dos ombros, cotovelos ligeiramente dobrados.',
        'Leva os cotovelos para trás aproximando as omoplatas, como se as apertasses.',
        'Volta lentamente à posição inicial.',
      ],
      executionCues: [
        'O movimento parte das costas, não dos braços.',
        'Os ombros mantêm-se baixos, longe das orelhas.',
      ],
      easierVariant: {
        name: 'Retração escapular com movimento reduzido',
        instructions: ['Realiza o mesmo movimento com um percurso mais pequeno.'],
        executionCues: ['Mesmo um pequeno movimento controlado treina o gesto correto.'],
      },
      harderVariant: {
        name: 'Retração escapular com pausa',
        instructions: ['Realiza a retração e mantém a posição 2 segundos antes de voltar.'],
        executionCues: ['Evita levantar os ombros durante a pausa.'],
      },
    },
    'pull-prone-swimmer': {
      name: 'Nado no chão (prone swimmer)',
      instructions: [
        'Deita-te de barriga para baixo, braços estendidos à frente, pernas estendidas.',
        'Levanta ligeiramente braços e pernas do chão e alterna pequenos movimentos como a nadar.',
        'Mantém um ritmo lento e controlado.',
      ],
      executionCues: [
        'O movimento mantém-se pequeno: não é preciso subir muito para o sentir a trabalhar.',
        'O pescoço mantém-se relaxado, olhar para baixo.',
      ],
      easierVariant: {
        name: 'Nado no chão só com braços',
        instructions: ['Realiza o movimento mexendo apenas os braços, mantendo as pernas no chão.'],
        executionCues: ['Reduz as partes do corpo envolvidas se a zona lombar cansar demasiado.'],
      },
      harderVariant: {
        name: 'Nado no chão com pausa a meio',
        instructions: ['Realiza o movimento e, a meio da série, mantém 2 segundos braços e pernas elevados.'],
        executionCues: ['A pausa não deve criar tensão no pescoço.'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: 'Retração escapular sentado',
      instructions: [
        'Senta-te numa cadeira estável, com as costas apoiadas no encosto.',
        'Leva os cotovelos para trás aproximando as omoplatas, sem levantar os ombros.',
        'Volta lentamente à posição inicial.',
      ],
      executionCues: [
        'As costas mantêm-se apoiadas no encosto durante todo o movimento.',
        'Os ombros mantêm-se baixos, longe das orelhas.',
      ],
      easierVariant: {
        name: 'Retração escapular sentado, movimento reduzido',
        instructions: ['Realiza o mesmo movimento com um percurso mais pequeno.'],
        executionCues: ['Mesmo um pequeno movimento controlado treina o gesto correto.'],
      },
      harderVariant: {
        name: 'Retração escapular sentado com pausa',
        instructions: ['Realiza a retração e mantém a posição 2 segundos antes de voltar.'],
        executionCues: ['Evita levantar os ombros durante a pausa.'],
      },
    },
    'core-knee-plank': {
      name: 'Prancha com joelhos apoiados',
      instructions: [
        'Antebraços no chão sob os ombros, joelhos no chão.',
        'Eleva as ancas formando uma linha reta dos joelhos à cabeça.',
        'Mantém a posição respirando com calma.',
      ],
      executionCues: [
        'As ancas não caem para baixo nem sobem demasiado.',
        'O abdómen mantém-se ligeiramente contraído durante todo o tempo.',
      ],
      easierVariant: {
        name: 'Prancha com joelhos apoiados, tempo reduzido',
        instructions: ['Mantém a posição por menos tempo, com mais pausas entre séries.'],
        executionCues: ['É melhor várias repetições curtas do que uma longa e incorreta.'],
      },
      harderVariant: {
        name: 'Prancha padrão (na ponta dos pés)',
        instructions: ['Realiza a mesma prancha levantando os joelhos do chão, apoiando-te na ponta dos pés.'],
        executionCues: ['O corpo mantém-se em linha reta da cabeça aos calcanhares.'],
      },
    },
    'core-dead-bug': {
      name: 'Dead bug',
      instructions: [
        'Deita-te de costas, braços estendidos em direção ao teto, joelhos dobrados a 90 graus sobre as ancas.',
        'Estende lentamente um braço atrás da cabeça e a perna oposta em direção ao chão, sem tocar nele.',
        'Volta à posição inicial e repete do lado oposto.',
      ],
      executionCues: [
        'A zona lombar mantém-se em contacto com o chão durante todo o movimento.',
        'O movimento é lento: a velocidade não é o objetivo.',
      ],
      easierVariant: {
        name: 'Dead bug com amplitude reduzida',
        instructions: ['Realiza o mesmo movimento baixando o braço e a perna apenas parcialmente.'],
        executionCues: ['Reduz a amplitude se a zona lombar se descolar do chão.'],
      },
      harderVariant: {
        name: 'Dead bug com pausa em extensão',
        instructions: ['Realiza o dead bug e, com o braço e a perna estendidos, mantém a posição 1-2 segundos.'],
        executionCues: ['A pausa não deve fazer as costas arquear.'],
      },
    },
    'core-bird-dog': {
      name: 'Bird dog',
      instructions: [
        'Mãos e joelhos no chão, costas em posição neutra.',
        'Estende um braço para a frente e a perna oposta para trás, mantendo a bacia estável.',
        'Volta à posição inicial e repete do lado oposto.',
      ],
      executionCues: [
        'A bacia mantém-se paralela ao chão, sem rodar.',
        'Move-te devagar: o equilíbrio conta mais do que a amplitude do movimento.',
      ],
      easierVariant: {
        name: 'Bird dog com um membro de cada vez',
        instructions: ['Estende apenas o braço ou apenas a perna de cada vez, em vez de juntos.'],
        executionCues: ['É mais fácil manter o equilíbrio movendo apenas um membro.'],
      },
      harderVariant: {
        name: 'Bird dog com pausa em extensão',
        instructions: ['Realiza o bird dog e mantém a posição estendida 2-3 segundos.'],
        executionCues: ['Continua a respirar durante a pausa.'],
      },
    },
    'core-standing-brace': {
      name: 'Ativação abdominal em pé',
      instructions: [
        'De pé, mãos nas ancas ou cruzadas sobre o peito, pés à largura das ancas.',
        'Contrai suavemente o abdómen como se afastasses o umbigo do cinto.',
        'Mantém a contração por alguns segundos respirando normalmente e depois liberta.',
      ],
      executionCues: [
        'A bacia mantém-se parada, sem arquear ou curvar a zona lombar.',
        'A contração é leve e sustentável, não uma rigidez total.',
      ],
      easierVariant: {
        name: 'Ativação abdominal em pé, tempo reduzido',
        instructions: ['Mantém a contração por menos tempo, com mais repetições curtas.'],
        executionCues: ['É melhor várias repetições curtas do que uma longa com perda de controlo.'],
      },
      harderVariant: {
        name: 'Ativação abdominal em pé com ligeira inclinação do tronco',
        instructions: [
          'Realiza a contração abdominal e, mantendo-a, inclina ligeiramente o tronco para a frente.',
          'Volta à posição ereta com controlo.',
        ],
        executionCues: ['A inclinação mantém-se mínima: o controlo conta mais do que a amplitude.'],
      },
    },
    'mobility-march': {
      name: 'Marcha no lugar',
      instructions: [
        'De pé, começa a caminhar no lugar levantando os pés alternadamente.',
        'Move os braços de forma natural, como ao caminhar.',
        'Mantém um ritmo que te permita respirar sem cansaço excessivo.',
      ],
      executionCues: ['Os passos mantêm-se leves: sem impacto forte no chão.'],
      easierVariant: {
        name: 'Marcha lenta',
        instructions: ['Realiza a marcha a um ritmo mais lento, com elevação mínima dos pés.'],
        executionCues: ['Podes apoiar-te levemente num suporte se precisares de equilíbrio.'],
      },
      harderVariant: {
        name: 'Marcha com joelhos altos',
        instructions: ['Realiza a marcha levantando os joelhos mais alto, mantendo o controlo.'],
        executionCues: ['O tronco mantém-se ereto mesmo quando os joelhos sobem.'],
      },
    },
    'mobility-step-touch': {
      name: 'Step touch lateral',
      instructions: [
        'De pé, dá um passo lateral com um pé, depois aproxima o outro pé sem o cruzar.',
        'Repete do lado oposto, alternando.',
        'Mantém os joelhos macios durante o movimento.',
      ],
      executionCues: ['Os movimentos mantêm-se fluidos, sem puxões repentinos.'],
      easierVariant: {
        name: 'Step touch com passo reduzido',
        instructions: ['Realiza o mesmo movimento com passos laterais mais curtos.'],
        executionCues: ['Reduz a amplitude se sentires instabilidade.'],
      },
      harderVariant: {
        name: 'Step touch com braços envolvidos',
        instructions: ['Realiza o step touch adicionando um movimento fluido dos braços para cima a cada passo.'],
        executionCues: ['Os braços movem-se de forma controlada, sem impulsos bruscos.'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: 'Circunduções de ancas e ombros',
      instructions: [
        'De pé, mãos nas ancas, realiza circunduções lentas da bacia num sentido e depois no outro.',
        'Depois realiza circunduções dos ombros, elevando-os para a frente-cima-trás-baixo.',
        'Move-te dentro de uma amplitude confortável.',
      ],
      executionCues: ['O movimento mantém-se lento e controlado, sem forçar o fim do trajeto articular.'],
      easierVariant: {
        name: 'Circunduções com amplitude reduzida',
        instructions: ['Realiza o mesmo movimento com círculos mais pequenos.'],
        executionCues: ['Está bem reduzir a amplitude se uma zona estiver mais rígida.'],
      },
      harderVariant: {
        name: 'Circunduções com maior amplitude e repetições',
        instructions: ['Realiza o mesmo movimento com círculos mais amplos, mantendo o controlo.'],
        executionCues: ['A amplitude aumenta apenas se se mantiver confortável.'],
      },
    },
    'fullbody-cat-cow': {
      name: 'Cat-cow (mobilidade da coluna)',
      instructions: [
        'Mãos e joelhos no chão, costas em posição neutra.',
        'Inspira arqueando ligeiramente as costas para baixo e elevando o olhar.',
        'Expira arredondando as costas para cima e levando o queixo em direção ao peito.',
      ],
      executionCues: ['O movimento segue a respiração, sem forçar a amplitude.'],
      easierVariant: {
        name: 'Cat-cow com movimento reduzido',
        instructions: ['Realiza o mesmo movimento com um percurso mais pequeno.'],
        executionCues: ['Um movimento mínimo está bem se as costas estiverem rígidas.'],
      },
      harderVariant: {
        name: 'Cat-cow com pausa no fim do percurso',
        instructions: ['Realiza o movimento e, no fim do percurso, mantém a posição 1-2 segundos.'],
        executionCues: ['A pausa mantém-se confortável, sem tensão.'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'Levantar da cadeira (sit-to-stand)',
      instructions: [
        'Senta-te na borda de uma cadeira estável, com os pés apoiados no chão.',
        'Inclina-te ligeiramente para a frente e levanta-te sem usar as mãos, se possível.',
        'Senta-te de novo com controlo, sem te deixares cair.',
      ],
      executionCues: ['O movimento é lento tanto a subir como a descer.'],
      easierVariant: {
        name: 'Levantar da cadeira assistido',
        instructions: ['Realiza o mesmo movimento ajudando-te com as mãos apoiadas nos braços da cadeira ou nos joelhos.'],
        executionCues: ['Usar as mãos não é um problema: o importante é o controlo do movimento.'],
      },
      harderVariant: {
        name: 'Levantar da cadeira lento',
        instructions: ['Realiza o movimento tornando mais lenta tanto a fase de subida como a de descida.'],
        executionCues: ['Ir mais devagar aumenta o esforço exigido sem precisar de saltar ou empurrar com força.'],
      },
    },
  },
};

export default pt;
