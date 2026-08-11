import type { LocaleResource } from '../resourceTypes';

const ja: LocaleResource = {
  common: {
    continue: '続ける',
    cancel: 'キャンセル',
    save: '保存',
    saving: '保存中…',
    retry: '再試行',
    exit: '終了',
  },
  language: {
    title: '言語を選択',
    subtitle: '後から設定で変更できます。',
    continue: '続ける',
  },
  auth: {
    createTitle: 'ログイン情報を作成',
    createSubtitle: 'このデバイスでアプリを保護するために、ユーザー名とパスワードを設定してください。',
    loginTitle: 'おかえりなさい',
    loginSubtitle: 'このデバイスで作成したアカウントでログインしてください。',
    usernameLabel: 'ユーザー名',
    usernamePlaceholder: 'ユーザー名を入力',
    passwordLabel: 'パスワード',
    passwordPlaceholder: 'パスワードを入力',
    confirmPasswordLabel: 'パスワード（確認）',
    confirmPasswordPlaceholder: 'もう一度パスワードを入力',
    createButton: 'アカウントを作成',
    loginButton: 'ログイン',
    errorUsernameRequired: 'ユーザー名を入力してください。',
    errorPasswordTooShort: 'パスワードは6文字以上にしてください。',
    errorPasswordMismatch: '2つのパスワードが一致しません。',
    errorInvalidCredentials: 'ユーザー名またはパスワードが正しくありません。',
    forgotHint: 'ログイン情報はこのデバイスにのみ保存されます。忘れてしまうと、遠隔で復元することはできません。',
  },
  onboarding: {
    welcomeTitle: 'はじめましょう',
    welcomeBody:
      '器具を使わず自宅でできる、あなた専用の自重トレーニングプランを作成するために、いくつか簡単な質問にお答えください。プランは毎回のトレーニング後の感覚をもとに、時間とともに調整されていきます。',
    welcomeDisclaimer:
      'このアプリは無理のない強度の自重トレーニングを提案するものであり、医師や理学療法士の助言に代わるものではありません。体の状態に不安がある場合は、始める前に専門家にご相談ください。',
    start: 'はじめる',
    levelTitle: '現在の運動習慣は？',
    levelSubtitle: '最初のプランの強度を調整するために使用します。',
    goalTitle: '主な目標は何ですか？',
    goalSubtitle: '後から設定で変更できます。',
    availabilityTitle: '1週間に何日トレーニングできますか？',
    availabilitySubtitle: '回復のための休息日を確保しながら、1週間にトレーニングを配分します。',
    daysPerWeek: '週{{count}}日',
    limitationsTitle: '気になる身体的な制限はありますか？',
    limitationsSubtitle: '該当する部位に直接負担がかかる種目は避けるか調整します。複数選択できます。',
    limitationsDisclaimer: 'この情報は種目選択を個別に調整するためだけに使用し、医学的な診断ではありません。',
    createPlan: 'プランを作成',
    preparingPlan: 'プランを準備しています',
    saveErrorTitle: 'プロフィールを保存できませんでした',
    saveErrorSubtitle: '前のステップの回答を確認して、もう一度お試しください。',
    backToStart: '最初に戻る',
    levelOptions: {
      sedentary: { title: 'ゼロから始める', description: '長い間、定期的に運動していません' },
      occasional: { title: 'たまに体を動かす', description: '不定期に運動しています' },
      returning: { title: '休止後の再開', description: '以前は継続的に運動していましたが、中断しました' },
    },
    goalOptions: {
      stay_consistent: {
        title: '継続的な習慣をつくる',
        description: '主な目標は、規則的にトレーニングを続けること',
      },
      build_strength_foundation: {
        title: '筋力の土台をつくる',
        description: '日常の動作でもっと力強さを感じたい',
      },
      improve_mobility: {
        title: '柔軟性を高める',
        description: 'もっと自由に、快適に体を動かせるようになりたい',
      },
      general_energy: {
        title: 'もっと活力がほしい',
        description: '毎日をより良い気分で過ごせる運動を探している',
      },
    },
    limitationOptions: {
      knees: { title: '膝', description: '膝への衝撃や直接的な負荷はできるだけ避けたい' },
      back: { title: '背中', description: '腰に負担がかかる動作はできるだけ避けたい' },
      shoulders: { title: '肩', description: '頭上での動作や肩への直接的な負荷はできるだけ避けたい' },
      wrists: { title: '手首', description: '手首に長時間体重をかけることはできるだけ避けたい' },
      none: { title: '制限はありません', description: '現時点で申告する身体的な制限はありません' },
    },
  },
  notifications: {
    reminderChannelName: 'トレーニングリマインダー',
    reminderTitle: 'トレーニングの時間です',
    reminderBody: '今日の自重トレーニングがあなたを待っています。',
  },
  tabs: {
    home: 'ホーム',
    library: 'ライブラリ',
    progress: '進捗',
  },
  home: {
    title: '今週のトレーニングプラン',
    subtitle: '現在の難易度レベル：{{tier}} / 3',
    restDay: '休息日',
    today: '今日',
    done: '完了 ✓',
    start: 'トレーニング開始',
    redo: 'もう一度行う',
    noProfileTitle: 'プロフィールが見つかりません',
    noProfileSubtitle: 'アプリを再起動して、初期設定をやり直してください。',
    errorTitle: 'プランを生成できませんでした',
  },
  library: {
    title: '種目ライブラリ',
    subtitle: 'すべての種目は自重トレーニングで、最低2x2mのスペースがあるご自宅を想定しています。',
    levelBadge: '基本レベル {{tier}} / 3',
    excludedBadge: '一部の制限により除外',
    notFound: '種目が見つかりません',
    previewCaption: '動作プレビュー',
    executionCuesHeading: '正しいフォームのポイント',
    contraindicationDisclaimer:
      'この種目は、あなたが申告した以下の制限がある場合、自動的に除外されます：{{tags}}。これは医学的な診断ではありません。不安な場合は専門家にご相談ください。',
  },
  session: {
    exitConfirmTitle: 'トレーニングを終了しますか？',
    exitConfirmBody: '未完了のこのセッションの記録は失われます。',
    exitConfirmCancel: 'トレーニングを続ける',
    exitConfirmConfirm: '終了する',
    notAvailableTitle: 'トレーニングを利用できません',
    notAvailableSubtitle: 'ホームに戻ってもう一度お試しください。',
    backToHome: 'ホームに戻る',
    energyTitle: '今日の調子はどうですか？',
    energySubtitle: '1 = 元気がない · 5 = 元気いっぱい',
    progress: '種目 {{current}} / {{total}} — セット {{setCurrent}} / {{setTotal}}',
    holdLabel: '姿勢をキープ',
    reps: '{{count}} 回',
    setComplete: 'セット完了',
    rest: '休憩',
    skipRest: '休憩をスキップ',
    feedbackTitle: '今日の感覚はどうでしたか？',
  },
  celebration: {
    title: 'トレーニング完了！',
    subtitle_one: '{{total}} 種目中 {{count}} 種目を完了しました。よくがんばりました。',
    subtitle_other: '{{total}} 種目中 {{count}} 種目を完了しました。よくがんばりました。',
    continue: '続ける',
  },
  progress: {
    title: '進捗',
    streak_one: '{{count}}回連続でトレーニング中',
    streak_other: '{{count}}回連続でトレーニング中',
    weeklyAdherence: '週間トレーニング達成率',
    weeklyGoal: '今週の目標',
    goalProgress: '{{target}}回中 {{completed}}回のトレーニングを完了',
    goalReminderSuffix: ' ・リマインダー {{time}}',
    noGoalSet: 'まだ今週の目標が設定されていません。',
    editGoal: '目標を編集',
    setGoal: '目標を設定',
    howManyThisWeek: '今週は何回トレーニングしたいですか？',
    dailyReminderTitle: '毎日のリマインダー',
    dailyReminderDesc: '毎日通知でお知らせします',
    sessionHistory: 'トレーニング履歴',
    noSessions: 'まだ記録されたトレーニングはありません。',
    reminderNotEnabledTitle: 'リマインダーが有効になっていません',
    reminderNotEnabledBody:
      '目標は保存されましたが、通知の許可がないためトレーニングのお知らせができません。スマートフォンの設定から有効にできます。',
    noProfile: 'プロフィールが見つかりません',
    loadErrorTitle: '進捗を読み込めませんでした',
  },
  feedback: {
    easy: '簡単だった',
    right: 'ちょうどよかった',
    hard: 'きつかった',
  },
  sessionStatus: {
    completed: '完了',
    abandoned: '中断',
    skipped: 'スキップ',
  },
  muscleGroups: {
    full_body: '全身',
    legs_glutes: '脚・お尻',
    core: '体幹',
    push: 'プッシュ',
    pull: 'プル',
    mobility_cardio: 'モビリティ・有酸素',
  },
  variants: {
    easier: '簡単バリエーション',
    base: '基本バリエーション',
    harder: '上級バリエーション',
  },
  limitations: {
    knees: '膝',
    back: '背中',
    shoulders: '肩',
    wrists: '手首',
  },
  weekdays: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
  exercises: {
    'legs-squat': {
      name: '自重スクワット',
      instructions: [
        '足を肩幅に開いて立ち、つま先をわずかに外側に向けます。',
        '膝を曲げ、椅子に座るように股関節を後ろに引きます。',
        'コントロールできる深さまでしゃがみ、かかとで押すように立ち上がります。',
      ],
      executionCues: [
        '膝はつま先と同じ方向を向いたまま、内側に入らないようにします。',
        '体重は足裏全体に均等にかけ、かかとは地面につけたままにします。',
        '背中は長く保ち、反らしたり丸めたりしないようにします。',
      ],
      easierVariant: {
        name: '椅子に手を添えたスクワット',
        instructions: [
          '安定した椅子や家具の端の前に立ち、軽く手を添えます。',
          'スクワットと同じ動きを行い、支えはバランスを取るためだけに使います。',
          '必要に応じてしゃがむ深さを浅くします。',
        ],
        executionCues: ['腕はバランスを取るためだけに使い、体を持ち上げないようにします。'],
      },
      harderVariant: {
        name: '底で静止するスクワット',
        instructions: [
          '基本のスクワットを行います。',
          '一番下の位置で2秒間、姿勢を安定させたまま静止します。',
          'かかとで押すように立ち上がります。',
        ],
        executionCues: ['静止中も体幹はぐらつかせず安定させます。'],
      },
    },
    'legs-glute-bridge': {
      name: 'グルートブリッジ',
      instructions: [
        '仰向けに寝て膝を曲げ、足をお尻の近くの床につけます。',
        'かかとで床を押し、お尻を持ち上げます。',
        '一番上でお尻を締め、コントロールしながら下ろします。',
      ],
      executionCues: [
        '力を入れるのはかかとで、つま先ではありません。',
        '一番上の位置では、膝から肩までが一直線になるようにし、腰を反らしすぎないようにします。',
      ],
      easierVariant: {
        name: '可動域を小さくしたグルートブリッジ',
        instructions: ['同じ動きを、お尻を数センチだけ持ち上げて行います。'],
        executionCues: ['大きく急な動きより、小さくコントロールされた動きの方が良いです。'],
      },
      harderVariant: {
        name: '上で静止するグルートブリッジ',
        instructions: [
          '基本のグルートブリッジを行います。',
          '一番上の位置で2〜3秒静止してから下ろします。',
        ],
        executionCues: ['静止中も呼吸を止めずに続けます。'],
      },
    },
    'legs-split-squat': {
      name: 'スタティックランジ（スプリットスクワット）',
      instructions: [
        '片足を大きく前に踏み出し、もう片方の足は後ろに残します。',
        '両膝を曲げて、まっすぐ下にしゃがみます。',
        '前足で押して立ち上がり、反対側でも同様に行います。',
      ],
      executionCues: [
        '前の膝はつま先より前に出ず、足首の真上をキープします。',
        'しゃがむ間、上体はまっすぐ保ちます。',
      ],
      easierVariant: {
        name: 'ハーフスタティックランジ',
        instructions: ['同じ動きを、しゃがむ深さを浅くして行います。'],
        executionCues: ['バランスが必要な場合は、壁や椅子に手を添えます。'],
      },
      harderVariant: {
        name: '後ろかかと上げスタティックランジ',
        instructions: [
          'スタティックランジを行いながら、後ろ足のかかとを床から浮かせます。',
          '動作の間、バランスを保ちます。',
        ],
        executionCues: ['ゆっくり動きましょう：不安定さが増す分、スピードより丁寧なコントロールが必要です。'],
      },
    },
    'push-wall': {
      name: '壁腕立て伏せ',
      instructions: [
        '壁から一歩ほど離れて立ち、肩の高さで両手を壁につきます。',
        '肘を曲げて胸を壁に近づけます。',
        '押して元の姿勢に戻ります。',
      ],
      executionCues: [
        '頭からかかとまで一直線を保ち、背中を反らさないようにします。',
        '肘はやや後ろ向きにし、完全に外側に開かないようにします。',
      ],
      easierVariant: {
        name: '手の位置を高くした壁腕立て伏せ',
        instructions: ['同じ動きを、壁に手をつく位置を高くして負荷を減らして行います。'],
        executionCues: ['手の位置が高いほど、必要な力は小さくなります。'],
      },
      harderVariant: {
        name: '安定した高い台での腕立て伏せ',
        instructions: [
          '壁より低い、安定してしっかりした台（固定された段差など）に手をつきます。',
          '体を一直線に保ちながら腕立て伏せを行います。',
        ],
        executionCues: ['安定していて滑らない台だけを使用してください。'],
      },
    },
    'push-knee': {
      name: '膝つき腕立て伏せ',
      instructions: [
        '両手を肩の真下の床につき、膝を床につけ、膝から頭まで一直線にします。',
        '肘を曲げて胸を床に近づけます。',
        '押して元の姿勢に戻ります。',
      ],
      executionCues: [
        'お尻が落ちないよう、お腹を軽く締めておきます。',
        '正しいフォームを保てる範囲だけ下ろします。',
      ],
      easierVariant: {
        name: '可動域を小さくした膝つき腕立て伏せ',
        instructions: ['同じ動きを、半分の深さだけ下ろして行います。'],
        executionCues: ['体のラインが崩れるより、可動域を小さくする方が良いです。'],
      },
      harderVariant: {
        name: '下で静止する膝つき腕立て伏せ',
        instructions: ['膝つき腕立て伏せを行い、一番下で1〜2秒静止します。'],
        executionCues: ['静止はコントロールされたもので、床に崩れ落ちないようにします。'],
      },
    },
    'push-standard': {
      name: '標準腕立て伏せ',
      instructions: [
        '両手を肩の真下の床につき、脚を伸ばし、つま先を床につけます。',
        '肘を曲げて胸を床に近づけながら、体を一直線に保ちます。',
        '押して元の姿勢に戻ります。',
      ],
      executionCues: [
        '頭からかかとまで、板のように体を固く保ちます。',
        '正しいフォームが崩れる場合は、膝つきバリエーションに戻る方が良いです。',
      ],
      easierVariant: {
        name: '可動域を小さくした標準腕立て伏せ',
        instructions: ['同じ動きを、下ろす深さを浅くして行います。'],
        executionCues: ['フォームが崩れた完全な動きより、正しく行う部分的な動きの方が良いです。'],
      },
      harderVariant: {
        name: '下で静止する標準腕立て伏せ',
        instructions: ['標準腕立て伏せを行い、一番下で2秒静止します。'],
        executionCues: ['静止中も体を固く保ちます。'],
      },
    },
    'push-forearm-wall': {
      name: '壁前腕プッシュ',
      instructions: [
        '壁に向かって立ち、肩の高さで前腕を壁につけ、肘を曲げます。',
        '前腕で壁を押して体をわずかに離し、コントロールしながら戻します。',
        '手首はリラックスさせ、負荷は手ではなく前腕にかけます。',
      ],
      executionCues: [
        '体は一直線を保ち、腰を反らしすぎないようにします。',
        '手をつくのが快適でないときの良い代替になります。',
      ],
      easierVariant: {
        name: '可動域を小さくした壁前腕プッシュ',
        instructions: ['同じ動きを、より小さな可動域で行います。'],
        executionCues: ['最初はごく小さな動きで問題ありません。'],
      },
      harderVariant: {
        name: '静止する壁前腕プッシュ',
        instructions: ['動作を行い、最大に押した状態で2秒間キープします。'],
        executionCues: ['キープ中も背中を反らさず、コントロールを保ちます。'],
      },
    },
    'pull-superman': {
      name: 'スーパーマン（背中の伸展）',
      instructions: [
        'うつ伏せになり、腕を前に伸ばし、脚も伸ばします。',
        '腕、胸、脚を同時に床から数センチ持ち上げます。',
        'コントロールしながら下ろします。',
      ],
      executionCues: [
        '首は長く保ち、視線は前方の床に向けます。',
        '動きは小さくコントロールされたもので、勢いよく引き上げないようにします。',
      ],
      easierVariant: {
        name: '交互スーパーマン',
        instructions: ['片方の腕と反対側の脚を交互に持ち上げます。'],
        executionCues: ['一度に一本の腕・脚だけ動かすことで、腰への負担が減ります。'],
      },
      harderVariant: {
        name: 'アイソメトリック静止スーパーマン',
        instructions: ['スーパーマンを行い、持ち上げた姿勢を2〜3秒キープします。'],
        executionCues: ['キープ中も通常通り呼吸します。'],
      },
    },
    'pull-scapular-retraction': {
      name: '立位肩甲骨引き寄せ',
      instructions: [
        '立った状態で、腕を肩の高さに前に伸ばし、肘を軽く曲げます。',
        '肩甲骨を寄せるように肘を後ろに引きます。',
        'ゆっくり元の姿勢に戻ります。',
      ],
      executionCues: [
        '動きは腕からではなく、背中から始めます。',
        '肩は下げたまま、耳から離しておきます。',
      ],
      easierVariant: {
        name: '可動域を小さくした立位肩甲骨引き寄せ',
        instructions: ['同じ動きを、より小さな可動域で行います。'],
        executionCues: ['小さくコントロールされた動きでも、正しい動作パターンを鍛えられます。'],
      },
      harderVariant: {
        name: '静止する立位肩甲骨引き寄せ',
        instructions: ['引き寄せを行い、2秒間キープしてから戻します。'],
        executionCues: ['キープ中に肩を上げないようにします。'],
      },
    },
    'pull-prone-swimmer': {
      name: 'プローンスイマー',
      instructions: [
        'うつ伏せになり、腕を前に伸ばし、脚も伸ばします。',
        '腕と脚を床からわずかに浮かせ、水泳のような小さな動きを交互に行います。',
        'ゆっくりコントロールされたペースを保ちます。',
      ],
      executionCues: [
        '動きは小さく保ちます。大きく浮かせなくても効果を感じられます。',
        '首はリラックスさせ、視線は下に向けます。',
      ],
      easierVariant: {
        name: '腕だけのプローンスイマー',
        instructions: ['脚は床につけたまま、腕だけを動かします。'],
        executionCues: ['腰が疲れすぎる場合は、動かす部位を減らします。'],
      },
      harderVariant: {
        name: '中間で静止するプローンスイマー',
        instructions: ['動作を行い、セットの途中で腕と脚を持ち上げたまま2秒間キープします。'],
        executionCues: ['キープ中、首に緊張を作らないようにします。'],
      },
    },
    'pull-seated-scapular-squeeze': {
      name: '座位肩甲骨スクイーズ',
      instructions: [
        '安定した椅子に座り、背もたれに背中をつけます。',
        '肩を上げないようにしながら、肩甲骨を寄せるように肘を後ろに引きます。',
        'ゆっくり元の姿勢に戻ります。',
      ],
      executionCues: [
        '動作の間ずっと背中を背もたれにつけたままにします。',
        '肩は下げたまま、耳から離しておきます。',
      ],
      easierVariant: {
        name: '可動域を小さくした座位肩甲骨スクイーズ',
        instructions: ['同じ動きを、より小さな可動域で行います。'],
        executionCues: ['小さくコントロールされた動きでも、正しい動作パターンを鍛えられます。'],
      },
      harderVariant: {
        name: '静止する座位肩甲骨スクイーズ',
        instructions: ['スクイーズを行い、2秒間キープしてから戻します。'],
        executionCues: ['キープ中に肩を上げないようにします。'],
      },
    },
    'core-knee-plank': {
      name: '膝つきプランク',
      instructions: [
        '肩の真下に前腕をつき、膝を床につけます。',
        '膝から頭までが一直線になるようお尻を持ち上げます。',
        '落ち着いて呼吸しながら姿勢をキープします。',
      ],
      executionCues: [
        'お尻は落としすぎず、上げすぎもしないようにします。',
        'キープ中はずっとお腹を軽く締めておきます。',
      ],
      easierVariant: {
        name: '短時間の膝つきプランク',
        instructions: ['キープする時間を短くし、セット間に休憩を増やします。'],
        executionCues: ['長く不正確に行うより、短く正確に何度も行う方が良いです。'],
      },
      harderVariant: {
        name: '標準プランク（つま先で支える）',
        instructions: ['同じプランクを、膝を床から離してつま先で支えて行います。'],
        executionCues: ['頭からかかとまで一直線を保ちます。'],
      },
    },
    'core-dead-bug': {
      name: 'デッドバグ',
      instructions: [
        '仰向けに寝て腕を天井に向けて伸ばし、膝を股関節の上で90度に曲げます。',
        '片方の腕をゆっくり頭の後ろに、反対側の脚を床に触れないように床の方へ伸ばします。',
        '元の姿勢に戻り、反対側で繰り返します。',
      ],
      executionCues: [
        '動作の間ずっと腰は床につけたままにします。',
        '動きはゆっくりと：スピードは目的ではありません。',
      ],
      easierVariant: {
        name: '可動域を小さくしたデッドバグ',
        instructions: ['同じ動きを、腕と脚を部分的にだけ下ろして行います。'],
        executionCues: ['腰が床から浮く場合は、可動域を小さくします。'],
      },
      harderVariant: {
        name: '伸展位で静止するデッドバグ',
        instructions: ['デッドバグを行い、腕と脚を伸ばした状態で1〜2秒キープします。'],
        executionCues: ['キープ中に背中を反らさないようにします。'],
      },
    },
    'core-bird-dog': {
      name: 'バードドッグ',
      instructions: [
        '両手と両膝を床につき、背中は中立の姿勢を保ちます。',
        '骨盤を安定させたまま、片方の腕を前に、反対側の脚を後ろに伸ばします。',
        '元の姿勢に戻り、反対側で繰り返します。',
      ],
      executionCues: [
        '骨盤は床と平行に保ち、回転させないようにします。',
        'ゆっくり動きましょう：動きの大きさよりバランスの方が大切です。',
      ],
      easierVariant: {
        name: '片肢ずつのバードドッグ',
        instructions: ['腕と脚を同時にではなく、どちらか片方だけを伸ばします。'],
        executionCues: ['片方の肢だけ動かす方がバランスを保ちやすくなります。'],
      },
      harderVariant: {
        name: '伸展位で静止するバードドッグ',
        instructions: ['バードドッグを行い、伸ばした姿勢を2〜3秒キープします。'],
        executionCues: ['キープ中も呼吸を続けます。'],
      },
    },
    'core-standing-brace': {
      name: '立位での体幹活性化',
      instructions: [
        '立った状態で、手を腰に当てるか胸の前で組み、足を腰幅に開きます。',
        'おへそをベルトから離すようなイメージで、お腹をやさしく締めます。',
        '普通に呼吸しながら数秒間締めをキープし、その後緩めます。',
      ],
      executionCues: [
        '骨盤は動かさず、腰を反らしたり丸めたりしないようにします。',
        '締める強さは軽く持続可能な範囲にし、全身を完全に硬くしないようにします。',
      ],
      easierVariant: {
        name: '短時間の立位体幹活性化',
        instructions: ['締める時間を短くし、短い回数を多く行います。'],
        executionCues: ['長時間で崩れるより、短時間を何度も行う方が良いです。'],
      },
      harderVariant: {
        name: '軽い前傾を加えた立位体幹活性化',
        instructions: [
          'お腹を締めた状態を保ちながら、上体をわずかに前に傾けます。',
          'コントロールしながら直立の姿勢に戻ります。',
        ],
        executionCues: ['前傾は最小限に：動きの大きさよりコントロールが大切です。'],
      },
    },
    'mobility-march': {
      name: 'その場足踏み',
      instructions: [
        '立った状態から、足を交互に上げてその場で足踏みを始めます。',
        '歩くときのように、腕も自然に動かします。',
        '息が上がりすぎないペースを保ちます。',
      ],
      executionCues: ['足取りは軽く：床を強く踏みつけないようにします。'],
      easierVariant: {
        name: 'ゆっくり足踏み',
        instructions: ['より遅いペースで、足の上げ幅も最小限にして足踏みします。'],
        executionCues: ['バランスが必要な場合は、軽く支えに手を添えても構いません。'],
      },
      harderVariant: {
        name: '高い膝上げ足踏み',
        instructions: ['コントロールを保ちながら、膝をより高く上げて足踏みします。'],
        executionCues: ['膝が上がっても上体はまっすぐ保ちます。'],
      },
    },
    'mobility-step-touch': {
      name: 'サイドステップタッチ',
      instructions: [
        '立った状態から、片足を横に踏み出し、もう片方の足を交差させずに寄せます。',
        '反対側でも同様に、交互に繰り返します。',
        '動作中は膝を柔らかく保ちます。',
      ],
      executionCues: ['動きは滑らかに、急な動きをしないようにします。'],
      easierVariant: {
        name: '小さいステップのステップタッチ',
        instructions: ['同じ動きを、横へのステップを小さくして行います。'],
        executionCues: ['不安定さを感じたら幅を小さくします。'],
      },
      harderVariant: {
        name: '腕を使ったステップタッチ',
        instructions: ['ステップタッチに合わせて、一歩ごとに腕を滑らかに上げる動きを加えます。'],
        executionCues: ['腕は急に振らず、コントロールしながら動かします。'],
      },
    },
    'mobility-shoulder-hip-circles': {
      name: '股関節と肩の回旋運動',
      instructions: [
        '立った状態で手を腰に当て、骨盤をゆっくり一方向、その後反対方向に回します。',
        '続いて肩を前・上・後ろ・下の順にゆっくり回します。',
        '無理のない範囲で動かします。',
      ],
      executionCues: ['動きはゆっくりコントロールしながら、可動域の限界で無理に力を入れないようにします。'],
      easierVariant: {
        name: '小さい範囲での回旋運動',
        instructions: ['同じ動きを、より小さな円で行います。'],
        executionCues: ['ある部位が硬い場合は、範囲を小さくしても構いません。'],
      },
      harderVariant: {
        name: 'より大きな範囲・回数での回旋運動',
        instructions: ['コントロールを保ちながら、より大きな円で同じ動きを行います。'],
        executionCues: ['快適に感じる範囲でのみ動きを大きくします。'],
      },
    },
    'fullbody-cat-cow': {
      name: 'キャットカウ（背骨のモビリティ）',
      instructions: [
        '両手と両膝を床につき、背中は中立の姿勢を保ちます。',
        '息を吸いながら背中を軽く下に反らせ、視線を上げます。',
        '息を吐きながら背中を上に丸め、あごを胸に近づけます。',
      ],
      executionCues: ['動きは呼吸に合わせ、可動域を無理に広げないようにします。'],
      easierVariant: {
        name: '可動域を小さくしたキャットカウ',
        instructions: ['同じ動きを、より小さな可動域で行います。'],
        executionCues: ['背中が硬い場合は、ごく小さな動きでも構いません。'],
      },
      harderVariant: {
        name: '可動域の端で静止するキャットカウ',
        instructions: ['動作を行い、可動域の端で1〜2秒姿勢をキープします。'],
        executionCues: ['キープ中も快適さを保ち、緊張させないようにします。'],
      },
    },
    'fullbody-sit-to-stand': {
      name: 'シット・トゥ・スタンド（立ち座り）',
      instructions: [
        '安定した椅子の端に座り、足を床につけます。',
        'わずかに前傾し、可能であれば手を使わずに立ち上がります。',
        'コントロールしながら再び座り、崩れ落ちないようにします。',
      ],
      executionCues: ['立ち上がるときも座るときも、動きはゆっくり行います。'],
      easierVariant: {
        name: '補助ありのシット・トゥ・スタンド',
        instructions: ['ひじ掛けや膝に手を添えて助けを借りながら同じ動きを行います。'],
        executionCues: ['手を使うこと自体は問題ありません。大切なのは動きのコントロールです。'],
      },
      harderVariant: {
        name: 'ゆっくり行うシット・トゥ・スタンド',
        instructions: ['立ち上がる動作と座る動作の両方をより遅く行います。'],
        executionCues: ['ゆっくり行うことで、跳ねたり強く押したりせずに負荷を高められます。'],
      },
    },
  },
};

export default ja;
