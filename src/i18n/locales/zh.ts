import type { LocaleResource } from '../resourceTypes';

const zh: LocaleResource = {
  common: {
    continue: '继续',
    cancel: '取消',
    save: '保存',
    saving: '保存中…',
    retry: '重试',
    exit: '退出',
  },
  language: {
    title: '选择语言',
    subtitle: '之后可以在设置中修改。',
    continue: '继续',
  },
  auth: {
    createTitle: '创建登录信息',
    createSubtitle: '设置用户名和密码，以保护此设备上的应用。',
    loginTitle: '欢迎回来',
    loginSubtitle: '使用在此设备上创建的账号登录。',
    usernameLabel: '用户名',
    usernamePlaceholder: '你的用户名',
    passwordLabel: '密码',
    passwordPlaceholder: '你的密码',
    confirmPasswordLabel: '确认密码',
    confirmPasswordPlaceholder: '再次输入密码',
    createButton: '创建账号',
    loginButton: '登录',
    errorUsernameRequired: '请输入用户名。',
    errorPasswordTooShort: '密码至少需要 6 个字符。',
    errorPasswordMismatch: '两次输入的密码不一致。',
    errorInvalidCredentials: '用户名或密码不正确。',
    forgotHint: '账号信息仅保存在此设备上：如果忘记，将无法远程找回。',
  },
  onboarding: {
    welcomeTitle: '开始吧',
    welcomeBody:
      '回答几个简单问题，为你制定第一份徒手训练计划，专为居家、无需器械设计。计划会根据你每次训练后的感受不断调整。',
    welcomeDisclaimer:
      '本应用提供强度适中的徒手训练动作，不能替代医生或理疗师的建议。如果你对自己的身体状况有疑虑，请在开始前咨询专业人士。',
    start: '开始',
    levelTitle: '你目前的运动基础是？',
    levelSubtitle: '用于校准第一份计划的强度。',
    goalTitle: '你的主要目标是什么？',
    goalSubtitle: '之后可以在设置中修改。',
    availabilityTitle: '你每周可以训练几天？',
    availabilitySubtitle: '我们会把训练分布在一周内，并留出恢复时间。',
    daysPerWeek: '每周 {{count}} 天',
    limitationsTitle: '有需要注意的身体限制吗？',
    limitationsSubtitle: '我们会避免或调整直接涉及这些部位的动作。可以选择多项。',
    limitationsDisclaimer: '这些信息仅用于个性化选择训练动作，不构成医学评估。',
    createPlan: '生成我的计划',
    preparingPlan: '正在为你准备计划',
    saveErrorTitle: '未能保存你的资料',
    saveErrorSubtitle: '请检查前面几步的回答后重试。',
    backToStart: '返回开始',
    levelOptions: {
      sedentary: { title: '从零开始', description: '很久没有规律运动了' },
      occasional: { title: '偶尔运动', description: '偶尔会进行一些体育活动' },
      returning: { title: '恢复训练中', description: '之前有规律训练，后来中断了' },
    },
    goalOptions: {
      stay_consistent: {
        title: '养成规律运动的习惯',
        description: '主要目标是保持训练的规律性',
      },
      build_strength_foundation: {
        title: '打好力量基础',
        description: '希望在日常动作中感觉更有力量',
      },
      improve_mobility: {
        title: '提升身体灵活性',
        description: '希望活动得更自如、更轻松',
      },
      general_energy: {
        title: '拥有更多精力',
        description: '希望通过运动让每天感觉更好',
      },
    },
    limitationOptions: {
      knees: { title: '膝盖', description: '希望避免膝盖受到冲击或直接负重' },
      back: { title: '背部', description: '希望避免给腰部增加负担的动作' },
      shoulders: { title: '肩膀', description: '希望避免过头动作或直接负重的动作' },
      wrists: { title: '手腕', description: '希望避免长时间用手腕支撑体重' },
      none: { title: '没有限制', description: '目前没有需要说明的身体限制' },
    },
  },
  notifications: {
    reminderChannelName: '训练提醒',
    reminderTitle: '该训练啦',
    reminderBody: '今天的徒手训练在等着你。',
  },
  tabs: {
    home: '首页',
    library: '动作库',
    progress: '进度',
  },
  home: {
    title: '本周训练计划',
    subtitle: '当前难度等级：{{tier}} / 3',
    restDay: '休息日',
    today: '今天',
    done: '已完成 ✓',
    start: '开始训练',
    redo: '重新训练',
    noProfileTitle: '未找到个人资料',
    noProfileSubtitle: '请重启应用重新完成初始设置。',
    errorTitle: '未能生成你的计划',
  },
  library: {
    title: '训练动作库',
    subtitle: '所有动作均为徒手训练，适合至少 2x2 米的居家空间。',
    levelBadge: '基础难度 {{tier}} / 3',
    excludedBadge: '因部分身体限制被排除',
    notFound: '未找到该动作',
    previewCaption: '动作预览',
    executionCuesHeading: '正确动作要点',
    contraindicationDisclaimer:
      '如果你标注了以下身体限制，该动作会被自动避开：{{tags}}。这不是医学评估：如有疑虑，请咨询专业人士。',
  },
  session: {
    exitConfirmTitle: '要退出训练吗？',
    exitConfirmBody: '本次未完成训练的进度将会丢失。',
    exitConfirmCancel: '继续训练',
    exitConfirmConfirm: '退出',
    notAvailableTitle: '训练不可用',
    notAvailableSubtitle: '请返回首页重试。',
    backToHome: '返回首页',
    energyTitle: '今天感觉怎么样？',
    energySubtitle: '1 = 精力不足 · 5 = 精力充沛',
    progress: '第 {{current}} / {{total}} 个动作 — 第 {{setCurrent}} / {{setTotal}} 组',
    holdLabel: '保持姿势',
    reps: '{{count}} 次',
    setComplete: '完成本组',
    rest: '休息',
    skipRest: '跳过休息',
    feedbackTitle: '这次感觉如何？',
  },
  celebration: {
    title: '训练完成！',
    subtitle_one: '你完成了 {{total}} 个动作中的 {{count}} 个。干得漂亮。',
    subtitle_other: '你完成了 {{total}} 个动作中的 {{count}} 个。干得漂亮。',
    continue: '继续',
  },
  progress: {
    title: '进度',
    streak_one: '连续训练 {{count}} 次',
    streak_other: '连续训练 {{count}} 次',
    weeklyAdherence: '每周训练达成率',
    weeklyGoal: '本周目标',
    goalProgress: '已完成 {{completed}} / {{target}} 次训练',
    goalReminderSuffix: ' · 提醒时间 {{time}}',
    noGoalSet: '你还没有设置本周目标。',
    editGoal: '编辑目标',
    setGoal: '设置目标',
    howManyThisWeek: '本周想完成几次训练？',
    dailyReminderTitle: '每日提醒',
    dailyReminderDesc: '我们每天会通过通知提醒你',
    sessionHistory: '训练记录',
    noSessions: '还没有记录到任何训练。',
    reminderNotEnabledTitle: '提醒未开启',
    reminderNotEnabledBody: '目标已保存，但由于没有通知权限，我们无法提醒你训练。你可以在手机设置中开启该权限。',
    noProfile: '未找到个人资料',
    loadErrorTitle: '未能加载你的进度',
  },
  feedback: {
    easy: '轻松',
    right: '刚好',
    hard: '困难',
  },
  sessionStatus: {
    completed: '已完成',
    abandoned: '已放弃',
    skipped: '已跳过',
  },
  muscleGroups: {
    full_body: '全身',
    legs_glutes: '腿部和臀部',
    core: '核心',
    push: '推',
    pull: '拉',
    mobility_cardio: '灵活性与有氧',
  },
  variants: {
    easier: '简化版',
    base: '基础版',
    harder: '进阶版',
  },
  limitations: {
    knees: '膝盖',
    back: '背部',
    shoulders: '肩膀',
    wrists: '手腕',
  },
  weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  exercises: {
    'legs-squat': {
      name: '徒手深蹲',
      instructions: [
        '双脚与肩同宽站立，脚尖略微向外。',
        '弯曲膝盖，将臀部向后推，像是要坐到椅子上。',
        '下蹲到自己能控制的舒适深度，然后用脚跟发力站起。',
      ],
      executionCues: [
        '膝盖始终朝向脚尖方向，不要向内塌陷。',
        '重量均匀分布在整个脚掌上，脚跟贴地。',
        '背部保持自然伸展，不拱背也不塌腰。',
      ],
      easierVariant: {
        name: '扶椅辅助深蹲',
        instructions: [
          '面对一把稳固的椅子或家具边缘站立，双手轻轻扶住。',
          '做与深蹲相同的动作，扶手只用于保持平衡。',
          '如有需要，可以减小下蹲的深度。',
        ],
        executionCues: ['手臂只用来保持平衡，不要用来把身体撑起来。'],
      },
      harderVariant: {
        name: '底部停顿深蹲',
        instructions: [
          '按基础版完成深蹲。',
          '在最低点停顿 2 秒，保持姿势稳定。',
          '用脚跟发力站起。',
        ],
        executionCues: ['停顿期间躯干保持稳定，不要晃动。'],
      },
    },
    'legs-glute-bridge': {
      name: '臀桥',
      instructions: [
        '仰卧，膝盖弯曲，双脚平放在地面上，靠近臀部。',
        '用脚跟发力，将臀部向上抬起。',
        '在最高点收紧臀部，然后有控制地放下。',
      ],
      executionCues: [
        '发力点在脚跟，而不是脚掌前部。',
        '在最高点，身体从膝盖到肩膀应呈一条直线，不要过度拱起腰部。',
      ],
      easierVariant: {
        name: '小幅度臀桥',
        instructions: ['做相同的动作，臀部只抬起几厘米。'],
        executionCues: ['小幅度、可控的动作，比大幅度、急促的动作更好。'],
      },
      harderVariant: {
        name: '顶部停顿臀桥',
        instructions: [
          '按基础版完成臀桥。',
          '在最高点保持姿势 2-3 秒，再放下。',
        ],
        executionCues: ['停顿时继续正常呼吸，不要憋气。'],
      },
    },
    'legs-split-squat': {
      name: '静态弓步蹲（split squat）',
      instructions: [
        '一只脚向前迈一大步，另一只脚留在后方。',
        '弯曲双膝，垂直向下蹲。',
        '用前腿发力站起，然后换另一侧重复。',
      ],
      executionCues: [
        '前腿膝盖始终保持在脚踝正上方，不超过脚尖。',
        '下蹲过程中上身保持挺直。',
      ],
      easierVariant: {
        name: '半程静态弓步蹲',
        instructions: ['做相同的动作，减小下蹲深度。'],
        executionCues: ['如需更多平衡支撑，可以扶墙或椅子。'],
      },
      harderVariant: {
        name: '后脚跟抬起静态弓步蹲',
        instructions: [
          '做静态弓步蹲，同时将后脚的脚跟抬离地面。',
          '整个动作过程中保持平衡。',
        ],
        executionCues: ['动作放慢：稳定性下降需要更多控制，而不是更快的速度。'],
      },
    },
    'push-wall': {
      name: '靠墙俯卧撑',
      instructions: [
        '站立，距离墙壁约一步远，双手扶在与肩同高的位置。',
        '弯曲手肘，让胸部靠近墙壁。',
        '推墙回到起始姿势。',
      ],
      executionCues: [
        '身体从头到脚跟保持一条直线，不要拱背。',
        '手肘略微向后，而不是完全向外张开。',
      ],
      easierVariant: {
        name: '高位靠墙俯卧撑',
        instructions: ['做相同的动作，但双手扶在墙面更高的位置，以降低难度。'],
        executionCues: ['手的位置越高，需要的力量越小。'],
      },
      harderVariant: {
        name: '稳固高台俯卧撑',
        instructions: [
          '双手扶在比墙面更低、稳固牢靠的台面上（例如固定的台阶）。',
          '完成俯卧撑动作，保持身体呈一条直线。',
        ],
        executionCues: ['只使用稳固、防滑的台面。'],
      },
    },
    'push-knee': {
      name: '跪姿俯卧撑',
      instructions: [
        '双手撑地，位于肩膀正下方，膝盖跪地，身体从膝盖到头部呈一条直线。',
        '弯曲手肘，将胸部下降至靠近地面。',
        '推起回到起始姿势。',
      ],
      executionCues: [
        '腹部保持轻微收紧，防止臀部下沉。',
        '只下降到能保持正确姿势的幅度。',
      ],
      easierVariant: {
        name: '半程跪姿俯卧撑',
        instructions: ['做相同的动作，只下降一半的幅度。'],
        executionCues: ['宁可减小幅度，也不要破坏身体的直线。'],
      },
      harderVariant: {
        name: '底部停顿跪姿俯卧撑',
        instructions: ['完成跪姿俯卧撑，在最低点停顿 1-2 秒。'],
        executionCues: ['停顿要保持可控，而不是直接塌向地面。'],
      },
    },
    'push-standard': {
      name: '标准俯卧撑',
      instructions: [
        '双手撑地，位于肩膀正下方，双腿伸直，脚尖着地。',
        '弯曲手肘，将胸部下降至靠近地面，同时保持身体呈一条直线。',
        '推起回到起始姿势。',
      ],
      executionCues: [
        '身体从头到脚跟保持像木板一样挺直。',
        '如果姿势变形，建议改回跪姿俯卧撑。',
      ],
      easierVariant: {
        name: '小幅度标准俯卧撑',
        instructions: ['做相同的动作，减小下降的深度。'],
        executionCues: ['姿势正确的小幅度动作，比姿势变形的完整动作更好。'],
      },
      harderVariant: {
        name: '底部停顿标准俯卧撑',
        instructions: ['完成标准俯卧撑，在最低点停顿 2 秒。'],
        executionCues: ['停顿期间身体也要保持挺直。'],
      },
    },
    'push-forearm-wall': {
      name: '靠墙前臂推',
      instructions: [
        '面对墙壁站立，前臂贴墙，位于与肩同高处，手肘弯曲。',
        '用前臂用力推墙，让身体略微远离墙面，然后有控制地放松。',
        '手腕保持放松：力量通过前臂传递，而不是手部。',
      ],
      executionCues: [
        '身体保持一条直线，不要过度拱起腰部。',
        '当手部支撑不舒服时，这是一个很好的替代动作。',
      ],
      easierVariant: {
        name: '小幅度靠墙前臂推',
        instructions: ['做相同的动作，幅度更小一些。'],
        executionCues: ['刚开始时，很小的动作幅度也没关系。'],
      },
      harderVariant: {
        name: '停顿靠墙前臂推',
        instructions: ['完成动作，并在推力最大的位置保持 2 秒。'],
        executionCues: ['停顿时保持可控，不要拱起背部。'],
      },
    },
    'pull-superman': {
      name: '飞燕式（背部伸展）',
      instructions: [
        '俯卧，双臂向前伸直，双腿伸直。',
        '同时将手臂、胸部和双腿抬离地面几厘米。',
        '有控制地放下。',
      ],
      executionCues: [
        '颈部保持自然伸展，目光看向前方地面。',
        '动作幅度小而可控，不要猛地向上甩动。',
      ],
      easierVariant: {
        name: '交替飞燕式',
        instructions: ['每次只抬起一只手臂和对侧的腿，两侧交替进行。'],
        executionCues: ['每次只移动一侧肢体，可以减轻腰部的负担。'],
      },
      harderVariant: {
        name: '等长停顿飞燕式',
        instructions: ['完成飞燕式动作，并保持抬起姿势 2-3 秒。'],
        executionCues: ['停顿期间保持正常呼吸。'],
      },
    },
    'pull-scapular-retraction': {
      name: '站姿肩胛回缩',
      instructions: [
        '站立，双臂向前伸直至与肩同高，手肘微屈。',
        '将手肘向后拉，靠拢肩胛骨，像是要把它们夹紧一样。',
        '缓慢回到起始姿势。',
      ],
      executionCues: [
        '动作发力来自背部，而不是手臂。',
        '肩膀保持下沉，远离耳朵。',
      ],
      easierVariant: {
        name: '小幅度站姿肩胛回缩',
        instructions: ['做相同的动作，幅度更小一些。'],
        executionCues: ['即使是很小的可控动作，也能训练正确的发力模式。'],
      },
      harderVariant: {
        name: '停顿站姿肩胛回缩',
        instructions: ['完成回缩动作，并保持姿势 2 秒后再回到起始位置。'],
        executionCues: ['停顿时避免耸肩。'],
      },
    },
    'pull-prone-swimmer': {
      name: '俯卧游泳式',
      instructions: [
        '俯卧，双臂向前伸直，双腿伸直。',
        '将手臂和双腿略微抬离地面，像游泳一样交替做小幅度动作。',
        '保持缓慢而可控的节奏。',
      ],
      executionCues: [
        '动作幅度保持较小：不需要抬得很高就能感受到发力。',
        '颈部保持放松，目光看向下方。',
      ],
      easierVariant: {
        name: '仅手臂俯卧游泳式',
        instructions: ['只移动手臂完成动作，双腿保持贴地。'],
        executionCues: ['如果腰部太容易疲劳，可以减少参与的身体部位。'],
      },
      harderVariant: {
        name: '中段停顿俯卧游泳式',
        instructions: ['完成动作，并在组的中段将手臂和双腿抬起保持 2 秒。'],
        executionCues: ['停顿不应给颈部带来紧张感。'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: '坐姿肩胛回缩',
      instructions: [
        '坐在稳固的椅子上，背部靠在椅背上。',
        '将手肘向后拉，靠拢肩胛骨，不要耸肩。',
        '缓慢回到起始姿势。',
      ],
      executionCues: [
        '整个动作过程中背部始终靠在椅背上。',
        '肩膀保持下沉，远离耳朵。',
      ],
      easierVariant: {
        name: '小幅度坐姿肩胛回缩',
        instructions: ['做相同的动作，幅度更小一些。'],
        executionCues: ['即使是很小的可控动作，也能训练正确的发力模式。'],
      },
      harderVariant: {
        name: '停顿坐姿肩胛回缩',
        instructions: ['完成回缩动作，并保持姿势 2 秒后再回到起始位置。'],
        executionCues: ['停顿时避免耸肩。'],
      },
    },
    'core-knee-plank': {
      name: '跪姿平板支撑',
      instructions: [
        '前臂撑地，位于肩膀正下方，膝盖跪地。',
        '抬起臀部，使身体从膝盖到头部呈一条直线。',
        '保持姿势，平稳呼吸。',
      ],
      executionCues: [
        '臀部既不下沉，也不过度抬高。',
        '腹部在整个过程中保持轻微收紧。',
      ],
      easierVariant: {
        name: '短时跪姿平板支撑',
        instructions: ['缩短保持姿势的时间，组间多做几次休息。'],
        executionCues: ['多次短时间、姿势正确的坚持，比一次长时间但姿势变形要好。'],
      },
      harderVariant: {
        name: '标准平板支撑（脚尖支撑）',
        instructions: ['做相同的平板支撑，但将膝盖抬离地面，用脚尖支撑。'],
        executionCues: ['身体从头到脚跟保持一条直线。'],
      },
    },
    'core-dead-bug': {
      name: '死虫式（Dead bug）',
      instructions: [
        '仰卧，双臂伸向天花板，双膝在髋部上方弯曲成 90 度。',
        '缓慢将一只手臂伸向头后方，同时对侧腿伸向地面，但不触地。',
        '回到起始姿势，换另一侧重复。',
      ],
      executionCues: [
        '整个动作过程中腰部始终贴地。',
        '动作要慢：速度不是目标。',
      ],
      easierVariant: {
        name: '小幅度死虫式',
        instructions: ['做相同的动作，手臂和腿只部分下降。'],
        executionCues: ['如果腰部离地，请减小动作幅度。'],
      },
      harderVariant: {
        name: '伸展停顿死虫式',
        instructions: ['完成死虫式动作，在手臂和腿伸展到位时保持 1-2 秒。'],
        executionCues: ['停顿时不要让背部拱起。'],
      },
    },
    'core-bird-dog': {
      name: '鸟狗式（Bird dog）',
      instructions: [
        '双手和双膝撑地，背部保持自然中立。',
        '一只手臂向前伸展，对侧腿向后伸展，同时保持骨盆稳定。',
        '回到起始姿势，换另一侧重复。',
      ],
      executionCues: [
        '骨盆始终与地面平行，不要旋转。',
        '动作放慢：平衡比动作幅度更重要。',
      ],
      easierVariant: {
        name: '单肢鸟狗式',
        instructions: ['每次只伸展手臂或只伸展腿，而不是同时进行。'],
        executionCues: ['只移动一侧肢体，更容易保持平衡。'],
      },
      harderVariant: {
        name: '伸展停顿鸟狗式',
        instructions: ['完成鸟狗式动作，并保持伸展姿势 2-3 秒。'],
        executionCues: ['停顿期间继续呼吸。'],
      },
    },
    'core-standing-brace': {
      name: '站姿核心激活',
      instructions: [
        '站立，双手叉腰或交叉放在胸前，双脚与髋同宽。',
        '轻轻收紧腹部，像是要把肚脐拉离腰带一样。',
        '保持收紧几秒钟，正常呼吸，然后放松。',
      ],
      executionCues: [
        '骨盆保持稳定，不要拱起或弯曲腰部。',
        '收紧力度轻而可持续，而不是全身完全绷紧。',
      ],
      easierVariant: {
        name: '短时站姿核心激活',
        instructions: ['缩短收紧的持续时间，做更多次短时间的重复。'],
        executionCues: ['多次短时间收紧，比一次长时间但失去控制要好。'],
      },
      harderVariant: {
        name: '带轻微前倾的站姿核心激活',
        instructions: [
          '完成腹部收紧，并在保持收紧的同时，让上身略微前倾。',
          '有控制地回到直立姿势。',
        ],
        executionCues: ['前倾幅度保持很小：控制比幅度更重要。'],
      },
    },
    'mobility-march': {
      name: '原地踏步',
      instructions: [
        '站立，开始原地踏步，双脚交替抬起。',
        '手臂自然摆动，就像走路一样。',
        '保持一个让你呼吸不感到吃力的节奏。',
      ],
      executionCues: ['步伐保持轻盈：不要用力踏地。'],
      easierVariant: {
        name: '慢速踏步',
        instructions: ['以更慢的节奏踏步，脚部抬起幅度尽量小。'],
        executionCues: ['如果需要平衡，可以轻轻扶着支撑物。'],
      },
      harderVariant: {
        name: '高抬膝踏步',
        instructions: ['踏步时将膝盖抬得更高，同时保持动作可控。'],
        executionCues: ['即使膝盖抬高，上身也要保持挺直。'],
      },
    },
    'mobility-step-touch': {
      name: '侧向并步',
      instructions: [
        '站立，一只脚向侧面迈一步，然后另一只脚并拢，不要交叉。',
        '换另一侧重复，交替进行。',
        '动作过程中膝盖保持柔软。',
      ],
      executionCues: ['动作保持流畅，不要突然发力。'],
      easierVariant: {
        name: '小步侧向并步',
        instructions: ['做相同的动作，但侧向步幅更小。'],
        executionCues: ['如果感到不稳，请减小幅度。'],
      },
      harderVariant: {
        name: '加手臂侧向并步',
        instructions: ['做侧向并步的同时，每一步都加入流畅的手臂上举动作。'],
        executionCues: ['手臂动作要可控，不要用力甩动。'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: '髋部与肩部绕环',
      instructions: [
        '站立，双手叉腰，先朝一个方向缓慢绕环髋部，再换另一个方向。',
        '接着做肩部绕环，按前-上-后-下的顺序转动。',
        '在自己感觉舒适的幅度内活动。',
      ],
      executionCues: ['动作保持缓慢可控，不要在活动范围的极限处用力。'],
      easierVariant: {
        name: '小幅度绕环',
        instructions: ['做相同的动作，但圈画得更小。'],
        executionCues: ['如果某个部位比较僵硬，减小幅度也没关系。'],
      },
      harderVariant: {
        name: '大幅度多次绕环',
        instructions: ['做相同的动作，圈画得更大，同时保持动作可控。'],
        executionCues: ['只有在感觉舒适的前提下才增加幅度。'],
      },
    },
    'fullbody-cat-cow': {
      name: '猫牛式（脊柱灵活性）',
      instructions: [
        '双手和双膝撑地，背部保持自然中立。',
        '吸气，轻轻向下拱起背部，抬头向上看。',
        '呼气，向上拱圆背部，下巴靠向胸口。',
      ],
      executionCues: ['动作跟随呼吸节奏，不要强求幅度。'],
      easierVariant: {
        name: '小幅度猫牛式',
        instructions: ['做相同的动作，幅度更小一些。'],
        executionCues: ['如果背部比较僵硬，做很小的动作也没关系。'],
      },
      harderVariant: {
        name: '末端停顿猫牛式',
        instructions: ['完成动作，在活动范围末端保持姿势 1-2 秒。'],
        executionCues: ['停顿时保持舒适，不要产生紧张感。'],
      },
    },
    'fullbody-sit-to-stand': {
      name: '坐站转换',
      instructions: [
        '坐在稳固椅子的边缘，双脚平放地面。',
        '身体略微前倾，尽量不用手站起来。',
        '有控制地重新坐下，不要直接跌坐。',
      ],
      executionCues: ['起身和坐下的过程都要缓慢进行。'],
      easierVariant: {
        name: '辅助坐站转换',
        instructions: ['做相同的动作，可以用手扶着扶手或膝盖帮助自己。'],
        executionCues: ['用手辅助没有问题：重要的是动作的可控性。'],
      },
      harderVariant: {
        name: '慢速坐站转换',
        instructions: ['做相同的动作，起身和坐下的过程都放得更慢。'],
        executionCues: ['放慢速度会增加训练强度，而不需要跳起或用力猛推。'],
      },
    },
  },
};

export default zh;
