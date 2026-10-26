window.EK = window.EK || {}; EK.put = EK.put || function (id, o) { EK.data = EK.data || {}; EK.data[id] = Object.assign(EK.data[id] || {}, o); };

EK.put("p1", {
  core: {
    // ---- 動詞 ----
    "alleviate": {
      hint: "levi は「軽い」。重い痛みや負担をどうする？",
      core: "重くのしかかるものを『軽くする』イメージ。痛み・苦しみ・不安を軽くして楽にする。例文では腰の痛みが軽くなった。",
      tip: "al（～へ）＋levi（軽い）＝軽くする。elevator（軽く持ち上げる機械）も同じ lev。"
    },
    "compel": {
      hint: "pel は「押す・追いやる」。プロペラ（propeller）の仲間",
      core: "後ろから『ぐいっと押して』動かすイメージ。本人の気持ちと関係なく、状況や力がそうさせる。例文では大雪が欠航へ押しやった。",
      tip: "com（強く）＋pel（追いやる）。propeller（前へ押す）、dispel も同じ pel。"
    },
    "deteriorate": {
      hint: "質や状態が、時間とともに下へ下へと落ちていく",
      core: "だんだん『下へ・悪い方へ』落ちていくイメージ。健康・関係・天気・建物などが時間とともに悪くなる。",
      tip: "ラテン語 deterior（より悪い）から。de（下へ）とつながる語。improve の反対。"
    },
    "dispel": {
      hint: "dis（ばらばらに）＋pel（追いやる）。うわさや不安を…",
      core: "霧やけむりを『追い散らす』イメージ。心の中のうわさ・不安・誤解をパッと追い払って消す。",
      tip: "dis（離れて）＋pel（追いやる）。compel・propeller と同じ pel＝押す・追う。"
    },
    "endorse": {
      hint: "dorse は「背中」。書類の裏にサインする場面から",
      core: "書類の『裏（背中）にサインする』→『これでいい』と保証する。そこから、人や考えを公に支える・推す意味に。",
      tip: "en（上に）＋dorsum（背中）。小切手の裏書きが元。CMで有名人が商品を推すのも endorse。"
    },
    "abolish": {
      hint: "制度やきまりを、まるごとなくしてしまう",
      core: "制度・法律・習慣を『根こそぎなくす』イメージ。一部を直すのではなく、仕組みそのものを終わりにする。",
      tip: "名詞 abolition は、アメリカの奴隷制度をなくす運動の名前として有名。"
    },
    "accumulate": {
      hint: "cumul は「積み重ね」。少しずつ増えていく",
      core: "少しずつ『積み重なって山になる』イメージ。ほこり・お金・知識・疲れなど、時間をかけてたまっていく。",
      tip: "ac（～へ）＋cumulus（積み重ね）。積乱雲の英語 cumulonimbus も同じ「積み上がる」。"
    },
    "advocate": {
      hint: "voc は「声」。ボーカル（vocal）と同じ仲間",
      core: "ある考えのために『声を上げる』イメージ。意見を人々に呼びかけて広めようとする。名詞では『支持者・弁護者』。",
      tip: "ad（～へ）＋voc（呼ぶ・声）。vocal・voice の仲間。名詞は「弁護人」の意味も。"
    },
    "allocate": {
      hint: "loc は「場所」。ローカル（local）と同じ仲間",
      core: "全体を分けて、それぞれの『場所に置く』イメージ。お金・時間・人などを目的ごとに配る。例文では予算を橋の修理へ。",
      tip: "al（～へ）＋locus（場所）。location・local と同じ loc。"
    },
    "amend": {
      hint: "決まった文書の、まずい所に手を入れる場面で使う",
      core: "できあがった文書の『悪いところを改めて良くする』イメージ。全部作り直すのではなく、一部を書きかえる。",
      tip: "mend（つくろう）と同じ仲間。アメリカ憲法の修正条項は the Amendments。"
    },
    "exert": {
      hint: "ex は「外へ」。内にあるパワーを外へ出すと…",
      core: "内にある力を『外へ出して』相手に向けるイメージ。影響力・圧力・努力をぐっとかける。",
      tip: "ラテン語 exserere（外へ突き出す）から。exert oneself＝全力を出す。"
    },
    "ascertain": {
      hint: "中に certain の形がかくれている",
      core: "あいまいなことを調べて『はっきり確かなものにする』イメージ。原因・事実・真相をつきとめる。",
      tip: "as（～へ）＋certain（確かな）＝確かな状態へもっていく。find out のかたい言い方。"
    },
    "assert": {
      hint: "疑われても、自分の考えをきっぱり言い切る",
      core: "自分の考えを『これは正しい』と強く言い切るイメージ。証拠が弱くても自信を持って言う感じ。",
      tip: "形容詞 assertive（自己主張の強い）。アサーティブ＝自分の意見をはっきり言う態度。"
    },
    "bolster": {
      hint: "もとは名詞で「長いまくら・クッション」のこと",
      core: "まくらを当てて『下から支えて強くする』イメージ。自信・経済・主張などを支えて強める。",
      tip: "名詞 bolster＝長いまくら。弱いところにクッションを入れて支える絵で。"
    },
    "circumvent": {
      hint: "circum は「まわり」。サークル（circle）の仲間",
      core: "正面からぶつからず『ぐるっと回って』通り抜けるイメージ。規則や問題を、うまくよけて切り抜ける。",
      tip: "circum（まわりを）＋vent（来る・行く）。event・adventure の vent も「来る」。"
    },
    "coerce": {
      hint: "脅しや圧力で、相手の意思をねじまげる場面",
      core: "力や脅しで相手を『ぎゅっと押さえこんで』従わせるイメージ。本人の意思に反してさせる。",
      tip: "co（いっしょに）＋arcere（閉じこめる）。名詞 coercion。compel より『脅し』が強い。"
    },
    "commemorate": {
      hint: "memor は「記憶」。メモリー（memory）の仲間",
      core: "大切なできごとを『みんなでいっしょに思い出す』イメージ。像や式典で、記憶にとどめる。",
      tip: "com（いっしょに）＋memor（記憶）。memory・memorial と同じ。"
    },
    "compile": {
      hint: "辞書や名簿、データ集を作る人の作業",
      core: "あちこちから集めた情報を『一つに編み上げる』イメージ。資料・データ・リストを集めて形にする。",
      tip: "パソコンの『コンパイル』（プログラムを一つに組み上げる）と同じ語。"
    },
    "comply": {
      hint: "コンプライアンス（compliance）のもとの動詞",
      core: "決まりや要求に『合わせて動く』イメージ。言われたことに逆らわず、そのとおりにする。comply with ～の形で使う。",
      tip: "名詞 compliance。企業のコンプライアンス＝法律やルールを守ること。"
    },
    "conceal": {
      hint: "人に見られないように、上からそっと覆う",
      core: "見えないように『覆いをかぶせる』イメージ。物だけでなく、気持ちや事実も表に出さない。",
      tip: "con（すっかり）＋celare（隠す）。hide のかたい言い方。reveal の反対。"
    },
    "concede": {
      hint: "cede は「ゆずる・退く」。負けを…",
      core: "相手に一歩『ゆずる』イメージ。言い争いの負けや、いやな事実をしぶしぶ受け入れる。",
      tip: "con＋cedere（ゆずる）。名詞 concession（譲歩）。敗北宣言は concession speech。"
    },
    "condemn": {
      hint: "damn と同じ仲間。悪いことをした相手に向ける強い言葉",
      core: "『これは悪い』と強く判決を下すイメージ。行いを強く責めるほか、刑を言いわたす意味も。",
      tip: "con（強く）＋damnare（罰を下す）。damn（のろう）と同じ語根。"
    },
    "confiscate": {
      hint: "fisc は「国のお金の箱」。先生が授業中のスマホを…",
      core: "持ち主から取り上げて『お上（国・学校）の箱に入れる』イメージ。権限のある人が物を取り上げる。",
      tip: "con（いっしょに）＋fiscus（国庫）。fiscal year（会計年度）の fisc と同じ。"
    },
    "consolidate": {
      hint: "solid（かたい）が入っている",
      core: "ばらばらのものを『固めて一つにする』イメージ。地位やリードを固めるほか、会社を統合する意味も。",
      tip: "con（いっしょに）＋solid（かたい）。ソリッド＝かたくて中身のつまった。"
    },
    "contemplate": {
      hint: "temple（神殿）の形が入っている。じっと見つめて…",
      core: "静かな場所で『じっと見つめて考えをめぐらす』イメージ。すぐ決めず、長くあれこれ考える。",
      tip: "con＋templum（占いのために区切った聖なる場所）。temple と同じ語根。"
    },
    "curtail": {
      hint: "curt は「短い」。予定や量を…",
      core: "長いものを『短く切りつめる』イメージ。時間・お金・活動を減らす。例文では開館時間を短くした。",
      tip: "もとは curtal（しっぽを短く切った馬）。court（短い）が語源で、curt（そっけない）の仲間。"
    },
    "deduce": {
      hint: "de（～から）＋duce（導く）。手がかりから答えを…",
      core: "わかっていることから『答えを引き出す』イメージ。手がかりを積み重ねて、結論を導き出す。",
      tip: "de（～から）＋ducere（導く）。探偵が足あとから犯人を言い当てる場面で。"
    },
    "defer": {
      hint: "fer は「運ぶ」。予定をあとの方へ運ぶと…",
      core: "予定を『あとへ運ぶ』イメージ。今はしないで、決定や行動を先に送る。defer to ～は『相手に判断をゆずる』。",
      tip: "ラテン語 differre（dis 離して＋ferre 運ぶ）から。transfer の fer と同じ。"
    },
    "deplete": {
      hint: "plete は「満たす」。complete の仲間。de が付くと…",
      core: "満ちていたものを『どんどん空にしていく』イメージ。資源・体力・お金を減らしきる。",
      tip: "de（反対・離れて）＋plere（満たす）。complete（満たしきる）と逆の向き。"
    },
    "deter": {
      hint: "ter は「おびえさせる」。terror の仲間",
      core: "こわがらせて『その気をなくさせる』イメージ。防犯カメラが泥棒に『やめておこう』と思わせる。deter A from ～ing。",
      tip: "de（離れて）＋terrere（こわがらせる）。terror・terrible と同じ語根。"
    },
    "devise": {
      hint: "頭をひねって、新しい仕組みをひねり出す場面",
      core: "頭をひねって『新しい方法や仕組みを作り出す』イメージ。計画・装置・システムを工夫して生む。",
      tip: "名詞 device（装置・デバイス）と同じ仲間。デバイスを生み出すのが devise。"
    },
    "diminish": {
      hint: "mini（小さい）が入っている",
      core: "だんだん『小さくなる・小さくする』イメージ。量・力・興味・価値がしぼんでいく。",
      tip: "ラテン語 minuere（小さくする）から。minus・mini と同じ語根。"
    },
    "disclose": {
      hint: "dis（反対）＋close（閉じる）",
      core: "閉じていたふたを『開けて見せる』イメージ。隠していた情報や秘密を公にする。",
      tip: "close（閉じる）の反対。会社の情報開示＝ディスクロージャー（disclosure）。"
    },
    "discern": {
      hint: "dis（離して）＋cern（ふるいにかける）",
      core: "ふるいにかけるように『よく見て分け取る』イメージ。ぼんやりしたものや細かい違いをはっきりとらえる。",
      tip: "dis（離して）＋cernere（ふるい分ける）。discriminate（区別する）も同じ語根。"
    },
    "disrupt": {
      hint: "rupt は「破れる」。順調な流れを…",
      core: "順調な流れを『バリッと破って』乱すイメージ。交通・授業・業界のしくみをかき乱す。",
      tip: "dis（ばらばらに）＋rupt（破る）。bankrupt（破産）・erupt（噴火）も rupt。"
    },
    "divert": {
      hint: "vert は「向きを変える」",
      core: "進む方向を『わきへ向け変える』イメージ。交通・お金・注意などを別の方へ回す。",
      tip: "di（わきへ）＋vertere（回す）。convert・reverse も同じ語根。"
    },
    "embark": {
      hint: "bark は「小舟」。船に乗りこむ場面から",
      core: "船に『乗りこんで出発する』イメージ。そこから、新しい旅・仕事・計画に踏み出す意味に。embark on ～。",
      tip: "em（中へ）＋bark（小舟）。乗船・搭乗は embarkation。"
    },
    "emulate": {
      hint: "あこがれの選手のプレーを追いかける場面",
      core: "あこがれの人に『追いつこうとまねる』イメージ。ただのコピーではなく、同じくらいになりたい気持ち。",
      tip: "エミュレーター（ほかの機械の動きをまねるソフト）と同じ語。"
    },
    "enact": {
      hint: "act には「（議会の）法令」という意味もある",
      core: "法案に『力を与えて動き出させる』イメージ。議会が法律として正式に成立させる。",
      tip: "en（～にする）＋act（法令）。act を作り出すのが enact。"
    },
    "endure": {
      hint: "dur は「長く続く」。durable（長持ちする）の仲間",
      core: "苦しさの中で『長くもちこたえる』イメージ。痛み・寒さ・つらさに負けずに続ける。",
      tip: "en（中で）＋durare（続く）。during・durable と同じ dur＝長く続く。"
    },
    "salvage": {
      hint: "沈んだ船や燃えた家から、何かを…",
      core: "だめになりそうな所から『価値ある物を取り出す』イメージ。船・家・関係などから助け出す。",
      tip: "salvation（救い）と同じ仲間。サルベージ船＝沈没船を引き上げる船。"
    },
    "entail": {
      hint: "ある行動をすると、自然についてくるもの",
      core: "ある行動に『必ずくっついてくる』イメージ。引っ越しをすれば、書類作業もついてくる。",
      tip: "involve のかたい語。A entails B＝A をすれば B が必要になる、の形で覚える。"
    },
    "eradicate": {
      hint: "radic は「根」。ラディッシュ（radish）の仲間",
      core: "雑草を『根っこから引き抜く』イメージ。病気・貧困・犯罪を二度と出ないよう完全になくす。",
      tip: "e（外へ）＋radix（根）。radish・radical（根本的な）と同じ語根。"
    },
    "evade": {
      hint: "vade は「行く」。e（外へ）とあわせて…",
      core: "つかまらないように『するりと外へ抜け出す』イメージ。責任・税金・質問から身をかわす。",
      tip: "e（外へ）＋vadere（行く）。invade（中へ行く＝侵入する）と対で覚える。"
    },
    "exacerbate": {
      hint: "acerb は「苦い・きつい」",
      core: "もともと悪い状態を『さらにひどく、きつくする』イメージ。森林伐採で洪水がもっとひどくなる。",
      tip: "ex（すっかり）＋acerbus（苦い）。worsen のかたい言い方。"
    },
    "exploit": {
      hint: "資源や人を、自分のためにとことん使う",
      core: "持っているものを『とことん利用する』イメージ。資源なら活用、人なら弱みにつけこんで搾り取る。",
      tip: "ゲームの『エクスプロイト』は弱点をついて悪用すること。名詞 exploitation。"
    },
    "fabricate": {
      hint: "fabric は「布・織物」。何かを作り上げる",
      core: "材料を『組み立てて作り上げる』イメージ。本来ない話やデータを作り上げれば、でっち上げになる。",
      tip: "fabric と同じく faber（職人）から。プレハブ＝prefabricated（前もって作った）。"
    },
    "facilitate": {
      hint: "ファシリテーター（会議の進行役）の仲間",
      core: "物事を『簡単に・スムーズにする』イメージ。じゃまを減らして、進みやすくする。",
      tip: "facile（たやすい）から。ファシリテーター＝話し合いを楽に進める人。"
    },
    "forfeit": {
      hint: "ルールを破った罰として手放すことになる場面",
      core: "決まりを破ったせいで『取り上げられて手放す』イメージ。権利・お金・試合などを罰として失う。",
      tip: "スポーツの不戦敗も forfeit。直前キャンセルで手付金が戻らない場面で。"
    },
    "hamper": {
      hint: "足にかせをはめられたように、動きがにぶる",
      core: "手足に『荷物やかせをつけて』動きをにぶらせるイメージ。雨や道路が救助を進みにくくする。",
      tip: "hinder と似た語。名詞 hamper（ふた付きのかご）とは別の語なので注意。"
    },
    "hinder": {
      hint: "behind（後ろ）と同じ仲間。後ろから引っぱる",
      core: "後ろから『引っぱって』前へ進みにくくするイメージ。成長・進歩・勉強をじゃまする。",
      tip: "hind（後ろの）と同じ語根。hind legs＝後ろ足。名詞 hindrance。"
    },
    "waive": {
      hint: "持っている権利や料金を、手放して求めない",
      core: "持っている権利を『手放して、求めない』イメージ。料金・規則などを特別になしにする。",
      tip: "wave（手をふる）と発音が同じ。『いいよ』と手をふって料金をなしにする絵で。"
    },
    "incorporate": {
      hint: "corp は「体」。コーポレーション（会社）の仲間",
      core: "外のものを『体の中に取りこんで一体にする』イメージ。考え・特徴を組みこむ。会社にする意味も。",
      tip: "in（中へ）＋corpus（体）。corporation（法人）も『一つの体』。"
    },
    "induce": {
      hint: "duce は「導く」。in（中へ）とあわせると…",
      core: "ある状態へ『導き入れる』イメージ。薬が眠気を、出来事が変化を生み出す。人を説得してさせる意味も。",
      tip: "in（中へ）＋ducere（導く）。introduce・produce の duce も「導く」。"
    },
    "infringe": {
      hint: "他人の権利や領分に、勝手に踏みこむ",
      core: "他人の権利や領分に『踏みこんで破る』イメージ。著作権・プライバシーなどを犯す。infringe on ～。",
      tip: "in（中へ）＋frangere（壊す）。fragile・fraction も同じ『割れる』の語根。"
    },
    "inhibit": {
      hint: "in（中に）＋hibit（持つ）。外へ出させずに…",
      core: "出ようとするものを『中に押さえておく』イメージ。成長・行動・気持ちにブレーキをかける。",
      tip: "in（中に）＋habere（持つ）。exhibit（外に持ち出す＝展示する）と対で。"
    },
    "instigate": {
      hint: "stig は「突く」。後ろからつついて…",
      core: "人を『つついてけしかける』イメージ。暴動や争いなど、悪いことを起こさせる。",
      tip: "ラテン語 instigare（突いてけしかける）から。instigator＝首謀者。"
    },
    "intervene": {
      hint: "inter（間に）＋vene（来る）",
      core: "二者の『間に入ってくる』イメージ。けんか・市場・問題に割って入り、流れを変えようとする。",
      tip: "inter（間に）＋venire（来る）。インターネットの inter、event の vent と同じ部品。"
    },
    "jeopardize": {
      hint: "大切なものを、失うかもしれない状態に置く",
      core: "大切なものを『失うかもしれない場所に置く』イメージ。チャンス・安全・仕事を危うくする。",
      tip: "名詞 jeopardy（危険）。アメリカの有名なクイズ番組の名前にもなっている。"
    },
    "mitigate": {
      hint: "暑さ対策や災害対策の文でよく出る",
      core: "悪いものの『とげを丸くして弱める』イメージ。なくすのではなく、被害や影響を小さくする。",
      tip: "ラテン語 mitis（やわらかい・おだやかな）から。alleviate と並べて覚える。"
    },
    "nurture": {
      hint: "nurse・nutrition（栄養）と同じ仲間",
      core: "時間をかけて『栄養を与えて育てる』イメージ。子ども・才能・好奇心を大事に伸ばす。",
      tip: "nature or nurture?（生まれか育ちか）という決まり文句で覚える。"
    },
    "obstruct": {
      hint: "ob（前に）＋struct（積み上げる）",
      core: "前に『物を積み上げてふさぐ』イメージ。道・流れ・計画をじゃまして進めなくする。",
      tip: "structure（構造）と同じ struct。道に壁を建ててしまう絵で覚える。"
    },
    "offset": {
      hint: "反対側に同じ重さを置いて、つり合わせる",
      core: "マイナスに『同じだけのプラスを置いて』打ち消すイメージ。損と得がつり合う。",
      tip: "カーボンオフセット＝出したCO2を植林などで打ち消すこと。"
    },
    "outweigh": {
      hint: "weigh は「重さがある」。てんびんで比べると…",
      core: "てんびんにのせると『こっちの方が重い』イメージ。良い点が悪い点より大事、など比べて上回る。",
      tip: "out（～をこえて）＋weigh。outnumber（数で上回る）と同じ out。"
    },
    "persevere": {
      hint: "per（最後まで）＋severe（きびしい）",
      core: "きびしくても『最後まであきらめず続ける』イメージ。つらい練習や困難をこえて続け抜く。",
      tip: "per（通して）＋severus（きびしい・まじめな）。名詞 perseverance（忍耐）。"
    },
    "plummet": {
      hint: "plumb は「鉛（なまり）のおもり」",
      core: "鉛のおもりが『まっすぐストンと落ちる』イメージ。株価・気温・人気が急に大きく下がる。",
      tip: "plumb（鉛のおもり）と同じ語根。soar（急上昇する）と対で覚える。"
    },
    "procure": {
      hint: "cure は「世話・気くばり」。苦労して手に入れる",
      core: "気を配って苦労して『手に入れる』イメージ。必要な物資・資金をそろえる。",
      tip: "pro（～のために）＋curare（世話する）。会社の購買部門は procurement。"
    },
    "prolong": {
      hint: "long が入っている。会議がだらだら…",
      core: "時間を『長く引きのばす』イメージ。会議・命・争いがだらだら続くようにする。",
      tip: "pro（前へ）＋longus（長い）。前へ長くのばす。"
    },
    "provoke": {
      hint: "voke は「呼ぶ」。pro（前へ）とあわせて…",
      core: "相手の感情を『前へ呼び出す』イメージ。怒り・反発・議論などを引き起こす。",
      tip: "pro（前へ）＋vocare（呼ぶ）。voice・vocal も同じ。provocative（挑発的な）。"
    },
    "reconcile": {
      hint: "仲たがいした二人が、ふたたび…",
      core: "離れてしまった人どうしを『もう一度いっしょにする』イメージ。対立する考えをすり合わせる意味も。",
      tip: "re（再び）＋conciliare（結びつける）。council（会議）と同じ仲間。"
    },
    "refute": {
      hint: "相手の主張がまちがいだと、証拠で示す",
      core: "相手の主張を『証拠でたたき返す』イメージ。まちがいだとはっきり示して打ち消す。",
      tip: "ラテン語 refutare（はね返す）から。deny は否定するだけ、refute は証明して否定。"
    },
    "reimburse": {
      hint: "burse は「財布」。re（元へ）とあわせると…",
      core: "使ったお金を『財布に戻す』イメージ。立てかえた交通費などを返してもらう・返す。",
      tip: "re（元へ）＋im（中へ）＋bursa（財布）。purse（財布）も同じ語根。"
    },
    "relinquish": {
      hint: "握っていた権力や地位を、手から離す",
      core: "しっかり握っていたものを『手から離す』イメージ。権力・地位・権利をしぶしぶ手放す。",
      tip: "re（後ろに）＋linquere（残す・置いていく）。give up のかたい言い方。"
    },
    "replenish": {
      hint: "plen は「満ちた」。plenty の仲間",
      core: "減ったものを『もう一度満たす』イメージ。棚の商品・水分・燃料をいっぱいにする。",
      tip: "re（再び）＋plenus（満ちた）。plenty（たくさん）と同じ語根。"
    },
    "rectify": {
      hint: "rect は「まっすぐ」。rectangle（長方形）の仲間",
      core: "曲がったものを『まっすぐにする』イメージ。まちがい・不正をきちんと直す。",
      tip: "rectus（まっすぐ）＋fy（～にする）。correct の rect も同じ。"
    },
    "retaliate": {
      hint: "やられたことを、同じように相手へ返す",
      core: "やられたのと『同じものを返す』イメージ。攻撃・関税などに仕返しをする。",
      tip: "ラテン語 talio（同じだけの罰）から。『目には目を』の考え方と覚える。"
    },
    "revoke": {
      hint: "voke は「呼ぶ」。re（元へ）とあわせて…",
      core: "一度出したものを『呼び戻す』イメージ。免許・許可・決定をなかったことにする。",
      tip: "re（元へ）＋vocare（呼ぶ）。provoke・vocal と同じ voc。"
    },
    "scrutinize": {
      hint: "ぼろくずの中までさがすように、細かく見る",
      core: "すみずみまで『一つ一つ細かく調べる』イメージ。契約書・データを見落としがないように見る。",
      tip: "ラテン語 scrutari（ぼろくずの中までさがす）から。名詞は scrutiny。"
    },
    "soar": {
      hint: "鳥が空高く舞い上がる様子",
      core: "鳥が『空高く舞い上がる』イメージ。物価・人気・気温がぐんぐん上がる。plummet（急落）の反対。",
      tip: "ワシが風に乗って上へ上へ行く絵で。sore（痛い）とつづりの違いに注意。"
    },
    "stipulate": {
      hint: "契約書の中で、条件をはっきり書いて決める",
      core: "契約や法律で『条件をはっきり決めて書く』イメージ。～しなければならない、と定める。",
      tip: "契約書の決まり文句。The contract stipulates that ～ の形で覚える。"
    },
    "substantiate": {
      hint: "substance（中身・実体）が入っている",
      core: "話に『中身（証拠）を入れて』本当だと示すイメージ。うわさや主張を裏づける。",
      tip: "substance（実質）＋ate（～にする）＝実体のあるものにする。"
    },
    "supplement": {
      hint: "サプリメントのもとの言葉",
      core: "足りない部分を『あとから足して満たす』イメージ。収入・食事・授業などに追加する。",
      tip: "サプリメント＝食事で足りない栄養を足すもの。名詞でも使う。"
    },
    "surpass": {
      hint: "sur（上を）＋pass（通る）",
      core: "相手や基準の『上を通りこす』イメージ。予想・記録・能力をこえる。",
      tip: "sur（上に・こえて）＋pass。surface・surplus と同じ sur。"
    },
    "flourish": {
      hint: "flor は「花」。floral・florist の仲間",
      core: "花が『ぱっと咲きほこる』イメージ。文化・商売・植物が勢いよく育ち盛んになる。",
      tip: "ラテン語 florere（花が咲く）から。フローリスト（花屋）と同じ語根。"
    },
    "thrive": {
      hint: "植物がよい環境で、ぐんぐん元気に育つ様子",
      core: "よい環境で『ぐんぐん元気に伸びる』イメージ。植物・会社・人が大きく育ち、うまくいく。",
      tip: "flourish と似た語。thrive in ～（～の中で元気に育つ）の形で覚える。"
    },
    "undermine": {
      hint: "under（下）＋mine（掘る）",
      core: "土台の『下を掘ってくずす』イメージ。信頼・権威・健康を気づかないうちに弱める。",
      tip: "mine＝鉱山・掘る。城の壁の下にトンネルを掘ってくずす戦法から。"
    },
    "verify": {
      hint: "ver は「真実」。very（本当に）と同じ仲間",
      core: "本当かどうか『確かめて真実だと示す』イメージ。メールアドレス・情報・事実をチェックする。",
      tip: "verus（真実の）＋fy（～にする）。very・verdict（評決）も同じ語根。"
    },
    "withstand": {
      hint: "with には古く「～に逆らって」の意味がある",
      core: "強い力に『逆らって立ち続ける』イメージ。地震・風・圧力に負けずに倒れない。",
      tip: "with（逆らって）＋stand（立つ）。嵐の中で足をふんばって立つ絵で。"
    },
    "dwindle": {
      hint: "数や量が、少しずつ細っていく",
      core: "火が『だんだん小さくしぼんでいく』イメージ。人口・お金・支持が少しずつ減り、細っていく。",
      tip: "古い英語 dwine（やせ衰える）から。diminish よりゆっくり細っていく感じ。"
    },
    "retract": {
      hint: "tract は「引く」。トラクターの仲間",
      core: "出したものを『後ろへ引っこめる』イメージ。発言・約束をとり消す。ネコが爪を引っこめるときにも使う。",
      tip: "re（後ろへ）＋trahere（引く）。tractor・attract も同じ tract＝引く。"
    },
    // ---- 名詞 ----
    "scrutiny": {
      hint: "ぼろくずの中までさがすような、きびしい目",
      core: "すみずみまで『じっくり細かく調べる』こと。under scrutiny＝きびしい目で調べられている状態。",
      tip: "ラテン語 scrutari（ぼろくずの中までさがす）から。動詞は scrutinize。"
    },
    "adversity": {
      hint: "vers は「向く」。自分に向かってくる向かい風",
      core: "自分に『向かってくる』つらい状況。病気・失敗・貧しさなど、向かい風の中にいること。",
      tip: "ad（～に）＋versus（向いた）。adverse と同じ。in the face of adversity の形で。"
    },
    "affluence": {
      hint: "flu は「流れる」。お金があふれて流れこむ",
      core: "お金や物が『あふれるほど流れこむ』状態。生活にゆとりがあり、裕福なこと。",
      tip: "af（～へ）＋fluere（流れる）。fluid・influence も同じ flu。形容詞 affluent。"
    },
    "allegation": {
      hint: "ニュースで『疑惑』として報じられる言い分",
      core: "まだ証明されていないのに『あの人が～した』と言い立てること。疑惑・主張。allegedly とセット。",
      tip: "動詞 allege。The allegations were denied.（疑惑は否定された）の形でよく出る。"
    },
    "ambiguity": {
      hint: "ambi は「両方」。2通りにとれる",
      core: "意味が『両方にとれて』はっきりしないこと。言葉・態度がどちらとも決められない状態。",
      tip: "ambi（両方に）＋agere（動かす）。ambivalent（相反する気持ちの）も ambi。"
    },
    "anomaly": {
      hint: "an（～でない）＋homal（そろった）。データの中の…",
      core: "ほかと『そろっていない』もの。いつものパターンからはずれた、変わったこと。",
      tip: "ギリシャ語 an（ない）＋homalos（平らな・そろった）。データ分析の『アノマリー検知』。"
    },
    "apprehension": {
      hint: "prehend は「つかむ」。何かが心をつかんで離さない",
      core: "先のことを『心でつかんで』気にする感じ。これから起こることへの心配。『逮捕・理解』の意味もある。",
      tip: "ap（～を）＋prehendere（つかむ）。犯人をつかむ＝逮捕、意味をつかむ＝理解。"
    },
    "aptitude": {
      hint: "apt は「ぴったり合う」",
      core: "その分野に『ぴったり合った』生まれつきの力。向いていること。have an aptitude for ～。",
      tip: "apt（適した）＋itude（名詞）。aptitude test＝適性検査。"
    },
    "backlash": {
      hint: "lash は「打つ」。back（後ろへ）はね返って…",
      core: "何かをしたら『はね返って』激しく返ってくる強い反応。決定や変化への反対の声。",
      tip: "もとは機械の『はね返り』。値上げを発表してSNSで反対が返ってくる場面で。"
    },
    "breakthrough": {
      hint: "break（破る）＋through（つきぬけて）",
      core: "厚い壁を『突き破って向こうへ出る』こと。研究・治療・交渉での大きな前進。",
      tip: "壁にぶつかっていた状態を突き抜ける絵で。ブレイクスルー＝大きな突破口。"
    },
    "catastrophe": {
      hint: "cata は「下へ」。すべてがひっくり返る",
      core: "物事が『下へひっくり返る』ような大惨事。地震・洪水・取り返しのつかない失敗。",
      tip: "ギリシャ語 kata（下へ）＋strephein（ひっくり返す）。カタストロフィー。"
    },
    "coalition": {
      hint: "選挙で過半数をとれなかった政党どうしが組む",
      core: "別々のグループが『いっしょに組んで一つになる』こと。政党や国の連合。",
      tip: "co（いっしょに）＋alescere（育つ）。coalesce（合体する）と同じ語根。"
    },
    "compensation": {
      hint: "失ったものとつり合うように与えるもの",
      core: "損をした分と『つり合うように』返すもの。けがや被害へのお金、仕事への報酬。",
      tip: "com（いっしょに）＋pensare（重さをはかる）。てんびんをつり合わせる絵で。"
    },
    "consensus": {
      hint: "con（いっしょに）＋sens（感じる）",
      core: "みんなが『同じように感じる』状態。話し合いの末、全員が納得した意見。",
      tip: "sense（感覚）と同じ語根。コンセンサスを得る＝みんなの了解をとる。"
    },
    "contamination": {
      hint: "きれいなものに、有害なものがまざる",
      core: "きれいなものに『有害なものがまざってにごる』こと。水・土・食べ物がよごれる。",
      tip: "contact（接触）と同じ語根から。ふれることでよごれがうつる、と覚える。"
    },
    "controversy": {
      hint: "contro（反対に）＋vers（向く）",
      core: "意見が『反対の向きに分かれて』ぶつかること。多くの人を巻きこむ議論。",
      tip: "contra（反対）＋versus（向いた）。形容詞 controversial（議論を呼ぶ）。"
    },
    "criterion": {
      hint: "critic（批評家）と同じ仲間。判断するときの物差し",
      core: "よいか悪いかを『判断するための物差し』。複数形は criteria。",
      tip: "ギリシャ語 kritērion（判断の手段）。critic・crisis も『見分ける』仲間。"
    },
    "deficit": {
      hint: "お金の出入りで、出る方が多いと…",
      core: "必要な分に『足りない』こと。収入より支出が多いマイナスの状態。",
      tip: "ラテン語 deficit（足りない）そのまま。surplus（余り）の反対。"
    },
    "discrepancy": {
      hint: "報告書と銀行の記録を見比べて気づくもの",
      core: "2つのものが『ぴったり合わずにずれている』こと。数字・話・説明の不一致。",
      tip: "dis（離れて）＋crepare（鳴る）＝音がずれる。2人の話が『ずれる』絵で。"
    },
    "disparity": {
      hint: "dis（～でない）＋par（等しい）",
      core: "本来『等しくない』大きな差。収入・地域などの不公平な開き。",
      tip: "par（等しい）はゴルフの『パー（基準）』と同じ語。そこから離れる＝差。"
    },
    "endeavor": {
      hint: "簡単にはいかない、大きなチャレンジ",
      core: "むずかしいことに『全力で取り組むこと』。挑戦・試み。動詞でも使う。",
      tip: "古いフランス語 en devoir（義務として）が元。本気でやる挑戦のイメージ。"
    },
    "expenditure": {
      hint: "動詞 spend と同じ仲間",
      core: "お金を『外へ出して使う』こと。国・会社・家庭が使ったお金。",
      tip: "動詞 expend（費やす）の名詞。spend も同じ語根。income（収入）の反対。"
    },
    "fatigue": {
      hint: "長時間運転したあとの体の状態",
      core: "力を使いすぎて『もうくたくた』の状態。体だけでなく、心や金属の疲れにも使う。",
      tip: "フランス語から。発音は『ファティーグ』。metal fatigue＝金属疲労。"
    },
    "feat": {
      hint: "fact と同じ語根で「行ったこと」",
      core: "だれにでもはできない『すごいことをやってのけた』行い。an amazing feat の形で。",
      tip: "ラテン語 factum（行い）から。feature も同じ仲間。"
    },
    "fluctuation": {
      hint: "fluct は「波」。波のように…",
      core: "波のように『上がったり下がったり』ゆれ動くこと。為替・気温・数値の変化。",
      tip: "ラテン語 fluctus（波）から。fluid（流体）の仲間。動詞 fluctuate。"
    },
    "hypothesis": {
      hint: "hypo は「下に」。実験の前に置くもの",
      core: "考えの『土台として下に置く』仮の答え。実験で正しいか確かめる。",
      tip: "hypo（下に）＋thesis（置くこと）。thesis（論文・主張）も同じ。"
    },
    "incentive": {
      hint: "やる気を起こさせる、ごほうびのようなもの",
      core: "人を『やる気にさせる』ためのごほうびや理由。ボーナス・割引など。",
      tip: "インセンティブ（報奨金）と日本語でも使う。"
    },
    "influx": {
      hint: "映画のロケ地に観光客がどっとおしよせる場面",
      core: "外から『どっと中へ流れこむ』こと。観光客・移民・資金などがいっきに入ってくる。",
      tip: "in（中へ）＋fluxus（流れ）。fluid・influence と同じ『流れる』。"
    },
    "integrity": {
      hint: "integer（整数）と同じく「欠けていない」",
      core: "心が『欠けずにまるごと一つ』の状態。うそをつかず、まっすぐで正直なこと。",
      tip: "integer（整数＝欠けていない数）と同じ語根。integrate も仲間。"
    },
    "irrigation": {
      hint: "畑や田んぼに水を引く仕組み",
      core: "かわいた土地に『水を引いて流しこむ』こと。農業の水路・スプリンクラーなど。",
      tip: "ir（～へ）＋rigare（水をやる）。乾燥地帯の農業の話でよく出る。"
    },
    "jurisdiction": {
      hint: "juris は「法」、dic は「言う」",
      core: "法を『言いわたせる』範囲。裁判所・警察などの権限が届く地域や分野。",
      tip: "jus（法）＋dicere（言う）。justice・dictionary の部品と同じ。"
    },
    "legislation": {
      hint: "legis は「法」。議会が作り出すもの",
      core: "議会が『法を作り出す』こと、またはそうして作られた法律全体。",
      tip: "legal（合法の）と同じ leg。legislature（議会）は法を作る場所。"
    },
    "liability": {
      hint: "事故が起きたとき『だれが払うか』の話",
      core: "何かが起きたら『しばられて』負わなければならないもの。損害の責任や負債。",
      tip: "ラテン語 ligare（しばる）が元。形容詞 liable for ～。"
    },
    "livelihood": {
      hint: "live（生きる）が入っている",
      core: "生きていくための『暮らしの手段』。漁師なら漁、農家なら畑。",
      tip: "earn a livelihood＝生活費をかせぐ。live（生きる）とつなげて覚える。"
    },
    "merger": {
      hint: "企業の M&A の「M」",
      core: "2つの会社が『とけ合って一つになる』こと。",
      tip: "merge（合わさる）の名詞。道路の合流の標識にも MERGE と書かれる。"
    },
    "misconception": {
      hint: "mis（まちがって）＋concept（考え）",
      core: "まちがって『こうだと思いこんでいる』考え。多くの人が信じているまちがい。",
      tip: "mis（誤り）＋conception（考え）。a common misconception の形でよく出る。"
    },
    "momentum": {
      hint: "動き出したものが持つ、止まりにくい力",
      core: "動き出したものが持つ『止まりにくい力のかたまり』。物理の運動量、物事のはずみ。",
      tip: "物理の『運動量』と同じ語。gain momentum＝はずみがつく。"
    },
    "monopoly": {
      hint: "mono（ひとつ）＋poly（売る）",
      core: "市場を『ひとりじめして売る』こと。1社だけが商品やサービスを支配している状態。",
      tip: "ギリシャ語 monos（ひとつ）＋pōlein（売る）。土地を買い占めるゲーム『モノポリー』。"
    },
    "negligence": {
      hint: "neglect（おろそかにする）と同じ仲間",
      core: "やるべき注意を『おろそかにして放っておく』こと。事故の原因としての不注意（過失）。",
      tip: "neglect の仲間。法律の言葉では『過失』。"
    },
    "outbreak": {
      hint: "out（外へ）＋break（破る）",
      core: "閉じこめられていたものが『外へ破って出る』こと。病気・戦争・火事が急に起こる。",
      tip: "break out（急に起こる）の名詞。an outbreak of flu の形で。"
    },
    "paradox": {
      hint: "para（反して）＋dox（考え）",
      core: "ふつうの考えに『反しているようで、実は本当』のこと。矛盾しているようで正しい話。",
      tip: "para（反して）＋doxa（意見）。パラドックス。orthodox（正統の）の dox も同じ。"
    },
    "perception": {
      hint: "per（すっかり）＋cept（つかむ）",
      core: "見たり聞いたりして『心でつかんだ』とらえ方。物事をどう感じ、理解しているか。",
      tip: "per（すっかり）＋capere（つかむ）。accept・concept と同じ cept。"
    },
    "predicament": {
      hint: "海外でパスポートをなくした旅行者の状態",
      core: "どうしたらいいかわからない『抜け出しにくい困った立場』。",
      tip: "be in a predicament（苦しい立場にいる）の形で覚える。"
    },
    "premise": {
      hint: "pre（前に）＋mise（置く・送る）",
      core: "話の『前に置いておく』考え。それを土台にして計画や議論を組み立てる。",
      tip: "pre（前に）＋mittere（送る）。missile・mission と同じ語根。"
    },
    "prerequisite": {
      hint: "pre（前もって）＋requisite（必要なもの）",
      core: "何かをする『前に満たしておくべき』もの。それがないと先へ進めない。",
      tip: "require（必要とする）と同じ仲間。大学の授業の『履修条件』にも使う。"
    },
    "procrastination": {
      hint: "cras は「明日」。pro（前へ）とあわせて…",
      core: "やるべきことを『明日へ、明日へ』と押しやること。ついあとまわしにするくせ。",
      tip: "pro（前へ）＋crastinus（明日の）。『明日やろう』をくり返す絵で。"
    },
    "proximity": {
      hint: "approximately（およそ）と同じ仲間",
      core: "場所や時間が『すぐそばにある』こと。in close proximity to ～＝～のすぐ近くに。",
      tip: "ラテン語 proximus（いちばん近い）から。approximately＝近い数→およそ。"
    },
    "remedy": {
      hint: "med は「治す」。medicine の仲間",
      core: "悪いところを『治す手だて』。病気の薬から、社会問題の解決策まで。",
      tip: "re（再び）＋mederi（治す）。medical・medicine と同じ語根。"
    },
    "repercussion": {
      hint: "percussion は「打楽器・打つこと」",
      core: "打った衝撃が『はね返って広がる』こと。ある出来事があとに起こす、よくない波紋。",
      tip: "re（はね返って）＋percussion（打つこと）。パーカッション（打楽器）と同じ。"
    },
    "resilience": {
      hint: "re（後ろへ）＋sili（はねる）",
      core: "押されても『ぽんともとにはね返る』力。災害や失敗から立ち直るしなやかさ。",
      tip: "re（後ろへ）＋salire（はねる）。へこんでも戻るゴムボールの絵で。レジリエンス。"
    },
    "sanction": {
      hint: "saint・sanctuary（聖域）と同じ仲間",
      core: "おきてを『神聖なものとして定める』→許可。逆に、おきてを破った者への罰＝制裁。両方の意味がある。",
      tip: "ラテン語 sanctus（神聖な）から。impose sanctions on ～（～に制裁を科す）。"
    },
    "setback": {
      hint: "set（置く）＋back（後ろへ）。進んでいたのに…",
      core: "前へ進んでいたのに『後ろへ戻される』こと。一時的なつまずき・失敗。",
      tip: "a temporary setback（一時的なつまずき）。一歩下がる絵で。"
    },
    "skepticism": {
      hint: "「本当かなあ？」と首をかしげる態度",
      core: "すぐには信じず『本当か？と疑ってかかる』態度。",
      tip: "ギリシャ語 skeptesthai（よく見る・考える）から。形容詞は skeptical。"
    },
    "stimulus": {
      hint: "もとは、家畜をつついて動かす棒",
      core: "動きを起こすために『つつく』もの。体への刺激、経済を動かす対策。複数形は stimuli。",
      tip: "ラテン語 stimulus（家畜を突く棒）。動詞 stimulate。"
    },
    "subsidy": {
      hint: "sub（下に）＋sid（すわる）。下で支える",
      core: "国などが『下から支える』ために出すお金。農家・企業・学生への援助。",
      tip: "ラテン語 subsidium（後ろに控える援軍）。下で控えて助けるイメージ。"
    },
    "surplus": {
      hint: "sur（こえて）＋plus（もっと）",
      core: "必要な分を『こえて余っている』もの。作物・お金・品物の残り。deficit（赤字）の反対。",
      tip: "sur（上に）＋plus（もっと）。必要より上にさらにプラス＝余り。"
    },
    "threshold": {
      hint: "家の入り口の床にある「しきい」",
      core: "家の『しきい』をまたぐと内と外が変わる。そこから、ある値をこえると変わる分かれ目。",
      tip: "もとは戸口の敷居。on the threshold of ～＝～の入り口にいる。"
    },
    "transition": {
      hint: "trans（向こうへ）＋it（行く）",
      core: "ある状態から別の状態へ『向こう側へ渡っていく』こと。急ではなく、移り変わる途中。",
      tip: "trans（こえて）＋ire（行く）。transport・transfer の trans。"
    },
    "turmoil": {
      hint: "大嵐の海のように、かき回された状態",
      core: "嵐の海のように『激しくかき回されている』状態。政治・会社・心の大きな乱れ。",
      tip: "throw ～ into turmoil（～を大混乱におとしいれる）の形で覚える。"
    },
    "vulnerability": {
      hint: "vulner は「傷」",
      core: "外からの攻撃に『傷つけられやすい』ところ。ソフトの欠陥、心や体のもろさ。",
      tip: "ラテン語 vulnus（傷）から。形容詞 vulnerable（傷つきやすい）。"
    },
    "drawback": {
      hint: "draw（引く）＋back（後ろへ）。足を引っぱるもの",
      core: "よいところがあっても『後ろへ引っぱる』マイナス点。不利な点。",
      tip: "advantage（利点）の反対。The main drawback is ～ の形で覚える。"
    },
    "inquiry": {
      hint: "動詞 inquire（たずねる）の名詞",
      core: "知りたいことを『問いかけて調べる』こと。質問・問い合わせから公式の調査まで。",
      tip: "in（中へ）＋quaerere（求める・たずねる）。question・quest も同じ語根。"
    },
    "obligation": {
      hint: "lig は「しばる」。ob（～に）とあわせて…",
      core: "人を『しばりつける』約束やきまり。しなければならないこと。",
      tip: "ob（～に）＋ligare（しばる）。動詞 oblige。ligament（じん帯）も同じ lig。"
    },
    "prosperity": {
      hint: "港ができて、貧しかった町がうるおうと…",
      core: "望みどおりに『どんどん前へ進んで』豊かになること。国・町・人がうまくいっている状態。",
      tip: "動詞 prosper（栄える）、形容詞 prosperous。peace and prosperity の形で。"
    },
    "testimony": {
      hint: "test は「証人」から。法廷で…",
      core: "見たことを『証人として話す』こと。法廷の証言、また何かが本当である証拠。",
      tip: "ラテン語 testis（証人）。動詞 testify（証言する）。protest も同じ語根。"
    },
    // ---- 形容詞 ----
    "feasible": {
      hint: "フランス語 faire（する）＋able",
      core: "実際に『やろうと思えばできる』様子。計画が現実的でうまくいきそう。",
      tip: "faire（する）＋able（できる）＝やれる。feasibility study＝実現できるかの調査。"
    },
    "inevitable": {
      hint: "どんなにがんばっても、いつかそうなる流れ",
      core: "どの道を選んでも『その結果にたどり着く』イメージ。止めようとしても必ず起こる。",
      tip: "in（ない）＋evitare（よける）＝よけられない。Death is inevitable. で覚える。"
    },
    "plausible": {
      hint: "applause（拍手）と同じ仲間",
      core: "聞くと『なるほど』と拍手したくなるような、本当らしい感じ。ただし本当かどうかは別。",
      tip: "ラテン語 plaudere（拍手する）から。applause と同じ語根。"
    },
    "unprecedented": {
      hint: "歴史上だれも見たことのない記録的な出来事",
      core: "これまでに『先にあった例がひとつもない』様子。記録的・初めての出来事。",
      tip: "un（ない）＋precedent（前例）。precede（先に行く）の仲間。"
    },
    "adverse": {
      hint: "vers は「向く」。こちらに向かってくる",
      core: "こちらに『向かってくる』ような、都合の悪い状況。天気・影響・反応がマイナス。",
      tip: "ad（～に）＋versus（向いた）。adversity と同じ。adverse effects＝副作用。"
    },
    "ambiguous": {
      hint: "ambi は「両方」。2通りにとれる言い方",
      core: "意味が『両方にとれる』ため、はっきりしない状態。説明・答え・態度がどちらとも言えない。",
      tip: "ambi（両方に）＋agere（動かす）。名詞 ambiguity。"
    },
    "arbitrary": {
      hint: "arbiter は「判断をくだす人」。その人の気分で…",
      core: "決まりや理由ではなく『その人の気分しだい』で決める感じ。勝手で、筋の通らない選び方。",
      tip: "ラテン語 arbiter（審判・判断する人）。決める人の思いのまま、と覚える。"
    },
    "authentic": {
      hint: "本場のシェフが作る料理の説明でよく使う",
      core: "まねではなく『本当にそこから来た』もの。料理・絵・文書が正真正銘であること。",
      tip: "オーセンティック（本格的な）とカタカナでも使う。fake の反対。"
    },
    "candid": {
      hint: "candle（ろうそく）と同じく「白く光る」",
      core: "白く『何も隠していない』様子。言いにくいことも正直に話す態度。",
      tip: "ラテン語 candidus（白い）。candidate（候補者）も白い服を着たことから。"
    },
    "coherent": {
      hint: "co（いっしょに）＋here（くっつく）",
      core: "部分どうしが『しっかりくっついて』まとまっている様子。話や計画の筋が通っている。",
      tip: "co（いっしょに）＋haerere（くっつく）。adhere（くっつく）も同じ語根。"
    },
    "comprehensive": {
      hint: "com（すっかり）＋prehend（つかむ）",
      core: "大事なことを『すべてつかみこんでいる』様子。広い範囲を全部ふくむ。",
      tip: "comprehend（理解する＝意味をつかむ）と同じ語根。"
    },
    "conspicuous": {
      hint: "spic は「見る」。inspect・spectator の仲間",
      core: "まわりと比べて『ぱっと見える』様子。一目でわかり、目につく。",
      tip: "con（すっかり）＋specere（見る）。暗いスーツの中の赤いジャケットの絵で。"
    },
    "credible": {
      hint: "クレジット（credit）と同じ語根",
      core: "話や人が『信じてよいと思える』様子。情報源・証拠・証人に使う。",
      tip: "credere（信じる）＋ible（できる）。incredible（信じられない）の反対。"
    },
    "detrimental": {
      hint: "detriment は「すり減らすこと」",
      core: "大切なものを『すり減らす』ような、悪い影響を与える様子。be detrimental to ～。",
      tip: "de（離れて）＋terere（こする）。こすってすり減らす絵で。harmful のかたい語。"
    },
    "diligent": {
      hint: "宿題や復習を、毎日コツコツ続ける人",
      core: "大事に思うから『コツコツ手間をかける』様子。まじめに一生懸命取り組む。",
      tip: "ラテン語 diligere（大切に思う）から。lazy（なまけた）の反対。"
    },
    "eloquent": {
      hint: "loqu は「話す」。e（外へ）とあわせて…",
      core: "言葉が『すらすらと外へ流れ出る』様子。人の心を動かす話し方。",
      tip: "e（外へ）＋loqui（話す）。colloquial（話し言葉の）も loqu。"
    },
    "explicit": {
      hint: "ex（外へ）＋plic（たたむ）。たたんだものを広げると…",
      core: "たたんであるものを『広げて全部見せる』様子。はっきり言葉で示されている。",
      tip: "ex（外へ）＋plicare（たたむ）。implicit（中にたたむ＝暗黙の）と対で。"
    },
    "fragile": {
      hint: "fragment（かけら）と同じ語根",
      core: "ちょっとしたことで『割れてしまう』様子。ガラス・関係・平和がもろい。",
      tip: "frangere（壊す）から。荷物の FRAGILE シール＝取り扱い注意。"
    },
    "imminent": {
      hint: "噴火や嵐が、今にも…という場面",
      core: "上から『今にも覆いかぶさってきそう』な様子。危険や出来事がすぐそこまで来ている。",
      tip: "ラテン語 imminere（上に突き出る）。eminent（すぐれた）とつづりが似ているので注意。"
    },
    "impartial": {
      hint: "裁判官に求められる態度",
      core: "どちらの『一部の側にもつかない』様子。全員を同じように扱う。",
      tip: "im（ない）＋partial（かたよった。part＝一部）。fair のかたい語。"
    },
    "indispensable": {
      hint: "会社員にとってのノートパソコンのような存在",
      core: "それが『ないとやっていけない』ほど大切な様子。",
      tip: "in（ない）＋dispensable（なしですませられる）。dispense with ～＝～なしですます。"
    },
    "lucrative": {
      hint: "給料のよい仕事や、大きなビジネスを形容する語",
      core: "お金が『たくさん入ってくる』様子。利益の大きい仕事・商売。",
      tip: "ラテン語 lucrum（利益）から。a lucrative job（給料のよい仕事）の形で。"
    },
    "meticulous": {
      hint: "小さなことまで一つも見のがさない人",
      core: "失敗をおそれて『細かいところまで気をくばる』様子。とてもていねいで正確。",
      tip: "ラテン語 metus（おそれ）から。こわくて何度もチェックする人、と覚える。"
    },
    "obsolete": {
      hint: "スマホが出てから使われなくなった道具たち",
      core: "新しいものが出て『もう使われなくなった』様子。技術・道具・考えが古くなる。",
      tip: "outdated と同じ意味。フロッピーディスクやポケベルの絵で。"
    },
    "prevalent": {
      hint: "pre（前に）＋val（強い）",
      core: "あちこちで『勢いが強く広がっている』様子。病気・考え・習慣がよく見られる。",
      tip: "prevail（広まる・勝つ）の形容詞形。val は value と同じ『強い・価値』。"
    },
    "prudent": {
      hint: "先を見通して、無理をしない人",
      core: "先のことを『よく見通して』用心深く行動する様子。かしこくて慎重。",
      tip: "provident（先を見る）がちぢんだ語。pro（前を）＋videre（見る）。"
    },
    "redundant": {
      hint: "unda は「波」。波があふれ出るほど…",
      core: "波が『あふれ出る』ほど多すぎる様子。なくてもよい言葉・人・部品。",
      tip: "re（再び）＋undare（波立つ）。イギリス英語では『解雇された』の意味も。"
    },
    "reluctant": {
      hint: "lucta は「もがく・逆らう」",
      core: "やりたくなくて『心が逆らっている』様子。be reluctant to ～の形で使う。",
      tip: "re（逆らって）＋luctari（もがく）。willing（進んで～する）の反対。"
    },
    "scarce": {
      hint: "雨の少ない夏の、この地方の水",
      core: "必要なのに『少ししかない』様子。水・食料・仕事などが手に入りにくい。",
      tip: "scarcely（ほとんど～ない）と同じ仲間。scarce resources＝乏しい資源。"
    },
    "skeptical": {
      hint: "「本当に効くの？」とすぐには信じない",
      core: "すぐには信じず『本当か？と疑ってかかる』様子。be skeptical about ～。",
      tip: "名詞 skepticism。ギリシャ語 skeptesthai（よく見る）＝よく見るから疑う。"
    },
    "stringent": {
      hint: "strict と同じ語根。ぎゅっとしめつける",
      core: "『ぎゅっとしめつける』ような、きびしいルール。安全基準・規則に使う。",
      tip: "ラテン語 stringere（しめつける）。strict（厳格な）と同じ語根。"
    },
    "tentative": {
      hint: "tent は「ためしてみる」。あとで変わるかも",
      core: "まず『ためしに』決めておく様子。あとで変わるかもしれない、確定していない計画。",
      tip: "ラテン語 tentare（ためす）。副詞 tentatively とセットで。"
    },
    "versatile": {
      hint: "vers は「回る・向きを変える」。どの方向にも…",
      core: "どの方向にも『くるりと向きを変えられる』様子。人なら多才、道具なら用途が広い。",
      tip: "vertere（回す）から。reverse・convert と同じ。万能選手を思いうかべて。"
    },
    "ubiquitous": {
      hint: "「ユビキタス社会」という言葉で有名",
      core: "『どこを見ても』ある様子。防犯カメラやスマホのように、あちこちに広がっている。",
      tip: "ラテン語 ubique（どこでも）。ユビキタス社会＝いつでもどこでもネットにつながる社会。"
    },
    "vigilant": {
      hint: "vigil は「寝ずの番」",
      core: "夜も『目をさまして見張っている』様子。危険に気をつけ、油断しない。",
      tip: "ラテン語 vigil（目覚めている）。ドラマの『自警団』は vigilante。"
    },
    // ---- 副詞 ----
    "inadvertently": {
      hint: "advert は「注意を向ける」。in で打ち消すと…",
      core: "注意が『向いていなかった』せいで、そのつもりもなくしてしまう様子。",
      tip: "in（ない）＋advertere（注意を向ける）。advertisement（広告）と同じ語根。"
    },
    "predominantly": {
      hint: "dominant（優勢な）が入っている",
      core: "全体の中で『いちばん多くを占めている』様子。大部分が、主として。",
      tip: "pre（前に）＋dominant（支配する）。dominate も同じ『支配』。"
    },
    "deliberately": {
      hint: "libra は「てんびん」。よく量ってから行う",
      core: "よく考えて『わざとそうする』様子。うっかりではなく、意図して。",
      tip: "de＋librare（てんびんで量る）。天秤座は Libra。accidentally（偶然に）の反対。"
    },
    "ostensibly": {
      hint: "ostens は「見せる」。外に見せている顔",
      core: "人に『見せている理由』は～だが、本当は別、という様子。うわべ。",
      tip: "ラテン語 ostendere（見せる）。ostentatious（見せびらかす）も同じ。"
    },
    "reluctantly": {
      hint: "lucta は「もがく」。心が逆らいながら…",
      core: "やりたくないのに『心が逆らいながら』する様子。",
      tip: "形容詞 reluctant に ly。willingly（進んで）の反対。"
    },
    "substantially": {
      hint: "substance（中身・量）が入っている",
      core: "『中身がたっぷりある』ほど大きく、という様子。量や程度がかなり。",
      tip: "substantial（かなりの）＋ly。substance（物質・中身）と同じ。"
    },
    "invariably": {
      hint: "ピクニックの日になると、なぜか雨…",
      core: "どんな場合も『変わることなく』同じ結果になる様子。",
      tip: "in（ない）＋variable（変わりやすい）。vary・variety と同じ語根。"
    },
    "allegedly": {
      hint: "容疑者についてのニュース記事でよく使う",
      core: "まだ証明されていないが『～したと言われている』様子。ニュースで断定を避ける言い方。",
      tip: "動詞 allege（申し立てる）＋ly。名詞 allegation。"
    },
    "tentatively": {
      hint: "tent は「ためしてみる」。あとで変わるかもしれない予定に",
      core: "まず『とりあえずためしに』決めておく様子。確定ではなく、変わるかもしれない。",
      tip: "tentative＋ly。tentatively scheduled＝とりあえずの予定。"
    },
    "scarcely": {
      hint: "scarce（乏しい）に ly がついた形",
      core: "あるにはあるが『ぎりぎりわずか』しかない様子。not なしで否定の意味を表す。",
      tip: "hardly と同じ。I could scarcely see. の形で。not をつけないのがポイント。"
    }
  }
});
