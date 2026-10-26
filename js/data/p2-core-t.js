window.EK = window.EK || {}; EK.put = EK.put || function (id, o) { EK.data = EK.data || {}; EK.data[id] = Object.assign(EK.data[id] || {}, o); };
EK.put("p2", {
  icore: {
    "be about to ~": {
      hint: "about は『～のすぐそば』。動作の すぐ手前にいる",
      core: "be（状態）＋about（すぐそば）＋to ～（これからする動作）→ 動作の すぐ手前にいる → まさに～しようとしている。",
      tip: "『be about to ～ when …』で『～しようとしたら …』の形でよく出る。出かける直前に電話が鳴る場面。"
    },
    "come up with ~": {
      hint: "up は『下から 表面に 出てくる』。頭の中から 何かが…",
      core: "come（来る）＋up（下から表面へ）＋with（～を持って）→ アイデアを持って 頭の表面に上がってくる → 思いつく。",
      tip: "会議で『いい案がある！』と手をあげる場面。案を出す・提案するときにも使う。",
      pic: "💡"
    },
    "take part in ~": {
      hint: "part は『部分・役』。全体の中の一部を 自分が受け持つ",
      core: "take（取る）＋part（一部分・役）＋in（～の中で）→ 行事の中で 自分の役を受け取る → 参加する。",
      tip: "participate（参加する）にも part が入っている。join より 少しかたい言い方。",
      pic: "🙋"
    },
    "run out of ~": {
      hint: "out は「出きって なくなる」",
      core: "run（流れる）＋out（外へ出きって からっぽ）＋of（～が）→ ～が流れ出て なくなる → 使い切る。",
      tip: "ガソリンが タンクから 流れ出て 空になる 場面で 覚える。",
      pic: "⛽➡️🫙"
    },
    "in advance": {
      hint: "advance は『前へ進む』。その時より 先に進んだところ",
      core: "in（～の状態で）＋advance（前へ進んだ位置）→ 時間的に 先に進んだところで → 前もって。",
      tip: "チケットを前売りで買う場面。advance ticket は『前売り券』。",
      pic: "📅"
    },
    "look forward to ~ing": {
      hint: "forward は『前方へ』。先のことに 目を向ける",
      core: "look（目を向ける）＋forward（前方＝未来へ）＋to（～に向かって）→ 未来のできごとに 目を向けて待つ → 楽しみに待つ。to は前置詞なので あとは ~ing。",
      tip: "メールの結びの I look forward to hearing from you.（お返事を待っています）で覚える。",
      pic: "🤩"
    },
    "get rid of ~": {
      hint: "rid は『取りのぞいて すっきりした』状態",
      core: "get（～の状態になる）＋rid（取りのぞいた）＋of（～から）→ ～から 解放された状態になる → 処分する・取りのぞく。",
      tip: "古いソファを 粗大ごみに出して 部屋がすっきり、の場面。悪いくせにも使える。",
      pic: "🗑️"
    },
    "make sure ~": {
      hint: "sure は『まちがいない』。その状態を 自分でつくる",
      core: "make（つくる）＋sure（確かな・まちがいない）→ まちがいない状態を つくる → 確かめる・必ず～するようにする。",
      tip: "出かける前に 窓のカギを 一つずつ指さして確認する場面。Make sure you ～.＝必ず～してね。",
      pic: "✅"
    },
    "put off ~": {
      hint: "off は『はなれる』。予定を 今から はなして置く",
      core: "put（置く）＋off（はなれて）→ 予定を 今の位置から はなして 先へ置く → 延期する。",
      tip: "宿題を『あとでやろう』と 先へ置いてしまう場面。postpone と同じ意味。",
      pic: "📅➡️"
    },
    "give up ~": {
      hint: "up は『すっかり～しきる』。手の中のものを 全部…",
      core: "give（手放す）＋up（すっかり）→ 持っていたものを すっかり手放す → あきらめる・やめる。",
      tip: "Never give up!（絶対あきらめるな）でおなじみ。give up smoking（たばこをやめる）も出る。"
    },
    "take care of ~": {
      hint: "care は『気にかけること』。それを 引き受ける",
      core: "take（引き受ける）＋care（気にかけること）＋of（～について）→ ～のことを 気にかける役を引き受ける → 世話をする・面倒を見る。",
      tip: "別れぎわの Take care.（気をつけてね）も 同じ care。"
    },
    "be proud of ~": {
      hint: "proud は『胸をはる』気持ち。of は その気持ちの もと",
      core: "be proud（胸をはっている）＋of（～がもとで）→ ～のことで 胸をはる → 誇りに思う。",
      tip: "子どもが賞をとり、親が 胸をはって 拍手する場面。名詞は pride。"
    },
    "be responsible for ~": {
      hint: "respond（答える）の仲間。for は『～に対して』",
      core: "responsible（何かあれば 自分が答える立場の）＋for（～に対して）→ ～について 答える立場だ → 責任がある・担当している。",
      tip: "問題が起きたとき『私が説明します』と前に出る人。名詞は responsibility。"
    },
    "be likely to ~": {
      hint: "likely は『ありそうな』。to のあとの動作が…",
      core: "likely（ありそうな）＋to ～（これからの動作）→ ～する可能性が高い → ～しそうである。",
      tip: "天気予報の『今夜は雪が降りそう』でよく使う。It is likely that ～ の形もある。"
    },
    "be supposed to ~": {
      hint: "suppose は『～だと考える』。みんなが そう考えている",
      core: "suppose（～だと考える）の受け身 →『～すると考えられている』→ 約束や決まりで ～することになっている。",
      tip: "10時に会う約束なのに 友達が来ない…『会うはずだったのに』の場面で使う。"
    },
    "be familiar with ~": {
      hint: "family（家族）と 同じ仲間の語。家族のように 身近",
      core: "familiar（家族のように なじみがある）＋with（～と）→ ～と なじんでいる → よく知っている・くわしい。",
      tip: "毎日通る道は 家族のように なじみがある。はじめての場所は unfamiliar。"
    },
    "be filled with ~": {
      hint: "fill は『満たす』。with は 中に入っている もの",
      core: "fill（満たす）の受け身＋with（～で）→ ～で 満たされている → ～でいっぱいである。",
      tip: "コップに水を fill する場面。be full of ～ もほぼ同じ意味。",
      pic: "🧺"
    },
    "be made from ~": {
      hint: "from は『出発点』。材料が 形を変えて…",
      core: "make（作る）の受け身＋from（～から出発して）→ 元の材料から 形が変わって作られる。見た目で材料がわからないときに使う。",
      tip: "チーズは牛乳 from、ワインはぶどう from。材料が見える木の机は made of wood。",
      pic: "🌾➡️🍞"
    },
    "be satisfied with ~": {
      hint: "satis- は『十分』。with は 気持ちの相手",
      core: "satisfy（十分に満たす）の受け身＋with（～によって）→ ～で 心が十分に満たされている → 満足している。",
      tip: "お店のアンケートの『満足度』は satisfaction。おなかいっぱいの気分で覚える。",
      pic: "😋"
    },
    "by mistake": {
      hint: "by は『～によって』。ねらいではなく うっかりの結果",
      core: "by（～によって・～が原因で）＋mistake（まちがい）→ まちがいによって → まちがえて・うっかり。",
      tip: "かさ立てで 兄のかさを うっかり持ってきた場面。on purpose（わざと）と反対。"
    },
    "by accident": {
      hint: "by は『～によって』。accident は『思いがけないこと』",
      core: "by（～によって）＋accident（思いがけず起こること）→ 予定にない できごとによって → 偶然に。",
      tip: "accident は『事故』でおなじみ。思いがけず起こるのが共通点。by chance も同じ。"
    },
    "on purpose": {
      hint: "purpose は『目的・ねらい』。on は『～にもとづいて』",
      core: "on（～にのって・もとづいて）＋purpose（目的・ねらい）→ ねらいにもとづいて → わざと・故意に。",
      tip: "by accident の反対。『わざとじゃない』は I didn't do it on purpose.",
      pic: "🎯"
    },
    "at least": {
      hint: "least は little の最上級。at は『一点』",
      core: "at（～の一点で）＋least（いちばん少ない）→ いちばん少なく見積もった点で → 少なくとも。",
      tip: "反対は at most（多くても）。least と most のペアで覚える。"
    },
    "in time": {
      hint: "in は『わくの中』。決められた時間のわく",
      core: "in（～の中に）＋time（決められた時間）→ 時間のわくの内側に入っている → 間に合って。",
      tip: "on time は『時間ぴったりに』。in time for ～ で『～に間に合って』。",
      pic: "⏰"
    },
    "for free": {
      hint: "for は『～と引きかえに』。何と 引きかえなのか",
      core: "for（～と引きかえに）＋free（しばられない→お金がいらない）→ お金と引きかえにしないで → 無料で。",
      tip: "店先の『FREE』のポスター。free drink はタダの飲み物。",
      pic: "🆓"
    },
    "in fact": {
      hint: "fact は『事実』。前の文との つながりを見る",
      core: "in（～の中で）＋fact（事実）→ 事実の世界では → 実際は。前の内容を打ち消したり、強めたりする。",
      tip: "『難しそうに見えた、でも実は簡単』のように、思っていたのとちがう本当のことを言う場面。"
    },
    "instead of ~": {
      hint: "stead は『場所』。ほかのものが その場所に入る",
      core: "in（～に）＋stead（場所）＋of（～の）→ ～の場所に（別のものが入る）→ ～の代わりに。",
      tip: "『バス』の場所に『歩き』を入れる場面。instead だけなら『その代わりに』。",
      pic: "🔄"
    },
    "according to ~": {
      hint: "accord は『一致する・合う』。to は その相手",
      core: "accord（合う）＋to（～に）→ ～に合わせると → ～によれば・～にしたがって。情報の出どころを示す。",
      tip: "ニュースや調査を紹介する文の頭でよく見る。According to the survey, …"
    },
    "thanks to ~": {
      hint: "thanks は『ありがとう』。to は その気持ちの行き先",
      core: "thanks（感謝）＋to（～に向けて）→ ～に感謝したくなる結果 → ～のおかげで。",
      tip: "助けてくれた友達に『ありがとう』と言いたくなる場面で使う。",
      pic: "🙏"
    },
    "due to ~": {
      hint: "due は『～が もとになっている』。to は その もと",
      core: "due（～が原因の・～によるべき）＋to（～に）→ ～が原因で → ～のために・～のせいで。because of と同じはたらき。",
      tip: "電車のアナウンスの due to heavy rain（大雨のため）で覚える。"
    },
    "a variety of ~": {
      hint: "テレビの『バラエティ番組』の中身を 思い出そう",
      core: "a variety（ちがうものの集まり）＋of（～の）→ いろいろな種類の～ → さまざまな～。",
      tip: "バラエティ番組には 歌・コント・クイズなど いろいろな出し物が入っている。",
      pic: "🌈"
    },
    "plenty of ~": {
      hint: "plenty は『あふれるほど 十分』",
      core: "plenty（必要より多い量）＋of（～の）→ 十分すぎるほどある～ → たくさんの～。数にも量にも使える。",
      tip: "『時間はたっぷりあるよ』と 安心させる場面。We have plenty of time."
    },
    "no longer ~": {
      hint: "longer は『もっと長く』。それに no がつくと…",
      core: "no（ない）＋longer（それ以上長く）→ それ以上長くは続かない → もはや～ない・もう～ない。",
      tip: "前は売っていたのに 今はもう売っていない、の場面。not ～ any longer も同じ。"
    },
    "as well as ~": {
      hint: "as … as は『同じくらい』。A も B と同じように",
      core: "as well（同じように・～も）＋as（～と）→ ～と同じように…も → ～だけでなく…も。",
      tip: "A as well as B は『B だけでなく A も』。中心は前の A のほう。",
      pic: "➕"
    },
    "at first": {
      hint: "at は『一点』。時間の いちばんはじめの点",
      core: "at（～の一点で）＋first（最初）→ はじめの時点では → 最初は。あとで変わったことが続くことが多い。",
      tip: "『最初は苦手→今は大好き』の流れ。but now とセットで出やすい。"
    },
    "after all": {
      hint: "after は『あと』、all は『全部』。全部が終わったあと",
      core: "after（～のあとで）＋all（全部のこと）→ いろいろあった その全部のあとで → 結局。",
      tip: "予定や迷いが いろいろあって、最後に落ち着いた結果を言う場面。"
    },
    "on one's way to ~": {
      hint: "way は『道』。on は その道の上にいる",
      core: "on（～の上に）＋one's way（自分の道）＋to（～へ向かう）→ ～へ向かう道の上にいる → ～へ行く途中で。",
      tip: "on my way home（家に帰る途中）は to がない。home が副詞だから。",
      pic: "🚶"
    },
    "carry out ~": {
      hint: "carry は『運ぶ』。out は『外へ・最後まで』",
      core: "carry（運ぶ）＋out（外へ・最後まで）→ 計画を 頭の中から外へ運び出し 最後までやる → 実行する。",
      tip: "carry out an experiment（実験を行う）や carry out a plan の形でよく出る。"
    },
    "find out ~": {
      hint: "out は『外へ出てくる』。かくれていたものが…",
      core: "find（見つける）＋out（外へ・表に出てくる）→ かくれていた情報を 表に出して見つける → 知る・わかる。",
      tip: "調べたり聞いたりして 事実を見つける場面。物を見つける find とちがい、情報に使う。",
      pic: "🔍"
    },
    "figure out ~": {
      hint: "figure は『形・数字』。out は『はっきり外に出す』",
      core: "figure（形・数字にする）＋out（はっきり外に出す）→ 考えて 答えの形を はっきりさせる → 理解する・解き明かす。",
      tip: "アプリの使い方を あれこれさわって やっとわかる場面。",
      pic: "🧩"
    },
    "turn down ~": {
      hint: "down は『下へ』。差し出された話を 下に向ける",
      core: "turn（向きを変える）＋down（下へ）→ 差し出された話を 下に向けて おろす → 断る。音量を下げる意味もある。",
      tip: "テレビの音を turn down（小さくする）のと同じ動き。申し出を『下げる』と覚える。",
      pic: "🙅"
    },
    "show up": {
      hint: "show は『見せる』。up は『見えるところに出てくる』",
      core: "show（姿を見せる）＋up（見えるところへ）→ 姿が 見えるところに出てくる → 現れる・（会などに）来る。",
      tip: "集合場所に 友達がやっと姿を見せる場面。会や約束の場所に『来る』の くだけた言い方。"
    },
    "set up ~": {
      hint: "set は『決まった位置に置く』。up は『立てる』",
      core: "set（決まった位置に置く）＋up（立てる・使える状態に）→ 置いて 立ち上げる → 設置する・準備する。",
      tip: "テントを立てる、パソコンの『セットアップ』。会社を『立ち上げる』にも使う。",
      pic: "⛺"
    },
    "catch up with ~": {
      hint: "up は『ぴったり近づく』。with は その相手",
      core: "catch（つかまえる）＋up（すぐそばまで近づいて）＋with（～と）→ 前にいる人の すぐそばまで来る → 追いつく。",
      tip: "おくれた人が 前の友達まで 走っていく場面。keep up with（ついていく）とペアで。",
      pic: "🏃"
    },
    "keep up with ~": {
      hint: "keep は『ずっと保つ』。up は『すぐそばにいる』",
      core: "keep（保つ）＋up（すぐそばに）＋with（～と）→ ～のそばに いつづける → 遅れずについていく。",
      tip: "catch up は『追いつく（その瞬間）』、keep up は『ついていく（ずっと続ける）』。"
    },
    "hand in ~": {
      hint: "hand は動詞で『手わたす』。in は『中へ』",
      core: "hand（手でわたす）＋in（受け取る側の中へ）→ 先生や係の手元へ わたし入れる → 提出する。",
      tip: "教室で 宿題を前に集めて 先生にわたす場面。turn in も同じ意味。",
      pic: "📤"
    },
    "look up ~": {
      hint: "up は『見えるところに出す』。本の中から…",
      core: "look（見る）＋up（表に出す）→ 辞書や本の中から 情報を 見て取り出す → 調べる。",
      tip: "look it up のように、it などの代名詞は look と up の間に入る。",
      pic: "📖"
    },
    "call off ~": {
      hint: "off は『はなれる・切れる』。予定を…",
      core: "call（声に出して言う）＋off（はなれて・切れて）→『予定はなし』と言って 予定を切りはなす → 中止する。",
      tip: "台風で 野外コンサートを とりやめる場面。cancel と同じ意味。",
      pic: "❌"
    },
    "pick up ~": {
      hint: "pick は『つまむ』、up は『持ち上げる』。人を…",
      core: "pick（つまむ）＋up（持ち上げる）→ 拾い上げる。人を車に拾い上げる → 車で迎えに行く。",
      tip: "ゴミを拾うのも、駅で人を乗せるのも pick up。どちらも『拾い上げる』。",
      pic: "🚗"
    },
    "be in charge of ~": {
      hint: "charge は『任された役目』。in は その中にいる",
      core: "in（～の中に）＋charge（任された役目）＋of（～の）→ ～の役目の中にいる → ～を担当している。",
      tip: "お店の『責任者』は the person in charge。部活の顧問の先生の場面。"
    },
    "take place": {
      hint: "place は『場所』。行事が その場所を 取る",
      core: "take（取る）＋place（場所）→ 行事が 予定の時と場所を取る → 行われる・起こる。受け身にしない。",
      tip: "文化祭やイベントの 日時と場所を伝える文でよく出る。The festival will take place in …"
    },
    "on sale": {
      hint: "on は『～の状態が 続いている』",
      core: "on（～の状態で）＋sale（販売・安売り）→ 売りに出されている状態 → 特売で・発売中で。",
      tip: "店の『SALE』の札。for sale は『売り物』で、安いとはかぎらない。",
      pic: "🏷️"
    },
    "out of order": {
      hint: "order は『きちんとした状態』。out of は そこから出る",
      core: "out of（～から外れて）＋order（きちんとした状態）→ 正常な状態から外れている → 故障して。",
      tip: "エレベーターや自動販売機に はってある『OUT OF ORDER』の紙で覚える。",
      pic: "🔧"
    },
    "be tired of ~": {
      hint: "tired は『つかれた』。of は つかれた気持ちの もと",
      core: "be tired（つかれた）＋of（～がもとで）→ ～に 心がつかれた → あきあきしている・うんざりしている。",
      tip: "毎日同じお弁当で あきてしまう場面。体がつかれた be tired from とちがう。",
      pic: "🥱"
    },
    "get along with ~": {
      hint: "along は『～にそって』。いっしょに進むイメージ",
      core: "get along（そって進む・やっていく）＋with（～と）→ ～と 同じ道を うまく進む → 仲よくやる。",
      tip: "新しいクラスのみんなと 楽しく過ごす場面。仲が悪いなら don't get along。",
      pic: "🤝"
    },
    "in the end": {
      hint: "end は『終わり』。in は その中",
      core: "in（～の中で）＋the end（終わり）→ いろいろあった その終わりで → 最後には・結局。",
      tip: "道に迷っても 最後はホテルに着いた、のように 苦労のあとの結果を言う。",
      pic: "🏁"
    },
    "at once": {
      hint: "once は『一度』。at は『一点』",
      core: "at（～の一点で）＋once（一度）→ 一度の その瞬間に → すぐに。",
      tip: "医者が『今すぐ病院へ！』と言う場面。right away と同じ。",
      pic: "⚡"
    },
    "make up one's mind": {
      hint: "mind は『心』。make up は『組み立てて 仕上げる』",
      core: "make up（組み立てて まとめる）＋one's mind（自分の心）→ 迷っていた心を 一つにまとめる → 決心する。",
      tip: "入る部活を 迷いに迷って、ついに決める場面。decide と同じ意味。"
    },
    "keep in touch with ~": {
      hint: "touch は『ふれること』。keep は『保つ』",
      core: "keep（保つ）＋in touch（ふれている状態）＋with（～と）→ ～とつながったままでいる → 連絡を取り合う。",
      tip: "卒業式の別れぎわに Keep in touch!（連絡してね）と言う場面。",
      pic: "📞"
    },
    "take advantage of ~": {
      hint: "advantage は『有利な点』。それを 取る",
      core: "take（取る）＋advantage（有利な点）＋of（～の）→ ～の いいところを 取る → 利用する・活用する。",
      tip: "夏休みの長い時間を 上手に使う場面。人に使うと『人のよさにつけこむ』にもなる。"
    }
  },
  clozeHelp: [
    { hint: "because 以下（休日は混む）と early（早めに）が手がかり",
      think: "休日は混むので、早めに席をどうにかしておくべき、という流れ。reserve のコアは『とっておく』で、席を自分のためにとっておく＝予約する。",
      opts: ["reserve：（席などを）とっておく→予約する", "refuse：断る", "repeat：くり返す", "remove：取りのぞく"] },
    { hint: "2文目『毎朝1時間歩く』が 説明になっている",
      think: "85歳だけど but のあとで『まだとても～』と言い、次の文で毎朝1時間歩くと説明している。active のコアは『act（動く）している』で、よく体を動かす＝活動的な。",
      opts: ["empty：からっぽの", "active：よく動く・活動的な", "silent：静かな・だまった", "nervous：緊張した・不安な"] },
    { hint: "concert で、最後に clapped（拍手した）のは だれか",
      think: "コンサートの最後に拍手するのは、聞きに来た人たち。audience は audio（音）と同じ仲間で『聞く人たち』＝観客・聴衆。",
      opts: ["passenger：（乗り物の）乗客", "patient：患者", "audience：（聞く・見る）観客・聴衆", "customer：（店の）客"] },
    { hint: "because 以下『もう安全ではない』が 理由になっている",
      think: "安全でない古い橋をどうするか考える。replace は re（もう一度）＋place（置く）で、別のものを置きなおす＝取りかえる。新しい橋にするのが自然。",
      opts: ["invite：招待する", "borrow：借りる", "celebrate：祝う", "replace：取りかえる"] },
    { hint: "when 以下：お気に入りの店が閉まったと 聞いたときの気持ち",
      think: "主語は Ken（人）なので、人の気持ちを表す語が入る。disappointed のコアは『期待が外れた』気持ち＝がっかりした。",
      opts: ["disappointed：（期待が外れて）がっかりした", "delicious：（食べ物が）おいしい", "comfortable：心地よい", "convenient：便利な"] },
    { hint: "Before you start the experiment（実験の前に）読むもの",
      think: "実験を始める前に よく読むのは、やり方が書いてあるもの。instruction は instruct（教える・指示する）の名詞で『やり方の指示・説明書』。",
      opts: ["patterns：模様・型", "instructions：指示・説明書", "festivals：祭り", "neighbors：近所の人"] },
    { hint: "空所のあとの『you from the rain』の形に注目",
      think: "動詞＋人＋from ～ の形。protect のコアは『前に立って守る』で、protect A from B＝B から A を守る。雨や風から あなたを守る、で意味が通る。",
      opts: ["remind：思い出させる（remind A of B）", "explain：説明する", "protect：守る（protect A from B）", "describe：（様子を）説明する"] },
    { hint: "so の前『明日は雨』が 理由になっている",
      think: "so の前が理由、あとが結果。雨ならピクニックは とりやめになるかも、という流れ。cancel のコアは『予定を消す』。",
      opts: ["discovered：発見される", "received：受け取られる", "produced：生産される", "canceled：中止される"] },
    { hint: "空所のあとの about と、2文目『50冊以上読んだ』",
      think: "about のあとに日本の歴史、次の文で本を50冊以上読んだとある。curious のコアは『もっと知りたい』気持ちで、be curious about ～＝～に興味がある。",
      opts: ["curious：知りたがる・好奇心がある", "jealous：うらやましい・ねたむ", "ashamed：はずかしい", "afraid：こわい"] },
    { hint: "so のあと『地元の人が喜んでいる』が 手がかり",
      think: "500以上の jobs をどうすると 人が喜ぶか考える。create のコアは『ないものを 新しく生み出す』。仕事を生み出す＝働く場所をつくる。",
      opts: ["destroy：こわす", "create：生み出す・つくる", "imagine：想像する", "pretend：ふりをする"] },
    { hint: "gave a short ( ) の形と『みんなが冗談に笑った』",
      think: "give の目的語で、結婚パーティーで人前で行い、冗談も入るもの。give a speech で『スピーチをする』。",
      opts: ["decision：決定", "direction：方向・指示", "speech：スピーチ・演説", "machine：機械"] },
    { hint: "check it for ～ の形と before I hand it in（提出の前）",
      think: "check A for B は『A に B がないか調べる』。提出する前のレポートで確かめるのは、まちがいがないかどうか。",
      opts: ["opinions：意見", "rumors：うわさ", "purposes：目的", "mistakes：まちがい"] },
    { hint: "so 以下『約10分でよくなる』が 結果になっている",
      think: "薬の効き方を表す副詞が入る。10分ほどで楽になるのだから、効くのが速い。quickly＝すばやく。",
      opts: ["quickly：すばやく", "rarely：めったに～ない", "nearly：ほとんど・もう少しで", "loudly：大声で"] },
    { hint: "2文目『今は約5万人が住んでいる』が 説明になっている",
      think: "The ( ) of this town が大きくなったと言い、次の文で住んでいる人の数を説明している。population は people と同じ仲間で『住んでいる人の数』＝人口。",
      opts: ["temperature：温度・気温", "population：人口", "distance：距離", "attention：注意"] },
    { hint: "until she could buy it（買えるまで）と every month（毎月）",
      think: "お金が足りないので、買えるようになるまで 毎月こづかいの一部をどうするか。save のコアは『とっておく』で、お金をとっておく＝ためる。",
      opts: ["waste：むだにする", "lend：貸す", "save：とっておく・ためる", "throw：投げる"] },
    { hint: "空所のあとの care of に注目",
      think: "～ care of … で『…の世話をする』という決まった形。入る動詞のコアは『引き受ける』で、気にかける役（care）を引き受ける。",
      opts: ["make：作る（care of とは結びつかない）", "have：持っている", "give：あたえる", "take：取る・引き受ける（take care of＝世話をする）"] },
    { hint: "空所のあとの to と、そのあとの seeing（~ing）に注目",
      think: "to のあとが ~ing なので、この to は前置詞。『先のことに目を向けて 楽しみに待つ』という形になる、前方へ向かう語が入る。",
      opts: ["forward：前方へ（look forward to＝楽しみに待つ）", "into：～の中へ（look into＝調べる）", "around：まわりを（look around＝見回す）", "after：あとを（look after＝世話をする）"] },
    { hint: "空所のあとの off と because of the heavy snow（大雪のため）",
      think: "大雪のせいで 試合がどうなったか。call off は『声で 予定を切りはなす』＝中止する。was ～ off と受け身になっている。",
      opts: ["taken：take off＝脱ぐ・離陸する", "called：call off＝中止する", "given：give off＝（においなどを）出す", "turned：turn off＝（電気などを）消す"] },
    { hint: "空所のあとの up smoking と because 以下『健康に悪い』",
      think: "健康に悪いから、たばこを手放した、という流れ。give up は『すっかり手放す』＝やめる・あきらめる。",
      opts: ["took：take up＝（趣味などを）始める", "made：make up＝作り上げる・仲直りする", "gave：give up＝やめる・あきらめる", "put：put up＝かかげる・泊める"] },
    { hint: "afraid のあとに来る前置詞を考える",
      think: "be afraid ～ dogs で『犬をこわがる』。of は気持ちの『もと』を表すので、こわい気持ちのもと＝犬。but now I have two（今は2匹飼っている）とも合う。",
      opts: ["for：～のために", "with：～といっしょに", "in：～の中に", "of：～の・（気持ちの）もと"] },
    { hint: "空所のあとの up と in a dictionary（辞書で）",
      think: "辞書で新しい単語をどうするか。look up は『見て 表に取り出す』＝調べる。",
      opts: ["look：look up＝調べる", "pick：pick up＝拾う・迎えに行く", "wake：wake up＝目を覚ます", "grow：grow up＝成長する"] },
    { hint: "空所のあとの place（場所）に注目",
      think: "～ place で『行われる・開かれる』。入る動詞のコアは『取る』で、行事が日時と場所を取る＝行われる。",
      opts: ["make：作る", "take：取る（take place＝行われる）", "have：持つ", "get：手に入れる"] },
    { hint: "空所のあとの a result（結果）。1文目の事故が 原因になっている",
      think: "1文目が原因、2文目が結果。as のコアは『～として』で、as a result は『結果として』＝その結果。",
      opts: ["In：～の中で", "For：～のために", "As：～として", "On：～の上に"] },
    { hint: "空所のあとの turns ~ing の形と every night（毎晩）",
      think: "兄と私が毎晩 お皿洗いを順番にする場面。turn は『順番』で、順番を取りあう＝take turns ~ing（交代で～する）。",
      opts: ["make：作る", "give：あたえる", "get：手に入れる", "take：取る（take turns＝交代でする）"] },
    { hint: "walking distance（歩いて行ける距離）と so I go there often",
      think: "家から歩いて行ける範囲にあるから、よく行く。within のコアは『わくの内側』で、within walking distance of ～＝～から歩ける範囲内に。",
      opts: ["within：～の内側に・範囲内に", "under：～の下に", "among：（3つ以上）の間に", "toward：～の方へ"] },
    { hint: "2文目『同じ目と笑顔をしている』が 説明になっている",
      think: "父と目や笑顔が同じ＝似ている。take after は『あとを受けつぐ』イメージで、親のあとを受けつぐ＝（親など）に似ている。",
      opts: ["takes over：引きつぐ", "takes after：（親など）に似ている", "takes off：脱ぐ・離陸する", "takes in：取り入れる・だます"] },
    { hint: "『遅れてごめん』の理由。My bus broke ( )",
      think: "遅れた理由は バスが動かなくなったこと。down は『下へ・ダウンする』で、break down＝機械や車が故障する。",
      opts: ["out：break out＝（戦争・火事が）起こる", "off：break off＝折れて取れる・中断する", "down：break down＝故障する", "up：break up＝別れる・ばらばらになる"] },
    { hint: "this form（用紙）と、そのあと受付にわたす流れ",
      think: "用紙をどうしてから 受付にわたすか。out は『最後まで・すっかり』で、fill out＝空らんを最後まで埋める＝記入する。",
      opts: ["off：はなれて", "on：くっついて・続けて", "away：遠くへ・なくなって", "out：外へ・最後まで（fill out＝記入する）"] },
    { hint: "空所のあとの of herself と when 以下『1位になった』",
      think: "1位をとったときの 自分への気持ち。be proud of ～ で『～を誇りに思う』。herself なので 自分を誇らしく思った。",
      opts: ["proud：（proud of）誇りに思う", "short：（short of）足りない", "afraid：（afraid of）こわがる", "careful：（careful of）気をつける"] },
    { hint: "A『箱が重すぎる』に B が『心配しないで』と答えている",
      think: "重い箱に困っている人を助ける場面。give ～ a ( ) は体の部分を使う決まった言い方で、手を貸す＝手伝う。",
      opts: ["foot：足", "hand：手（give ~ a hand＝手伝う）", "head：頭", "face：顔"] },
    { hint: "If で始まる『条件』の部分。tomorrow にまどわされない",
      think: "条件を表す if の中は、未来のことでも現在形で書く。主語が it なので 三単現の s がつく。",
      opts: ["will rain：未来の形（条件の if の中では使わない）", "rained：過去形", "rains：現在形（三単現）", "raining：-ing形（これだけでは文の動詞にならない）"] },
    { hint: "前の The boy（人）と、空所のすぐあとに is が来ること",
      think: "The boy を後ろから説明していて、空所のあとにすぐ動詞 is がある。人を表し、主語のはたらきをする関係代名詞が入る。",
      opts: ["which：物・動物の関係代名詞", "what：『～すること・もの』（前に名詞をとらない）", "whose：『その～の』（あとに名詞が必要）", "who：人の関係代名詞（主格）"] },
    { hint: "空所の前の have と、three times（3回）",
      think: "have＋過去分詞は現在完了で、three times があるので経験。『～へ行ったことがある』は have ( ) to ～ で、be動詞の過去分詞を使う。",
      opts: ["been：be の過去分詞", "go：原形", "went：過去形", "going：-ing形"] },
    { hint: "told me（言う＋人）のあとに来る形",
      think: "tell＋人＋to ～ で『人に～するように言う』。言われた内容は これからする動作なので、to＋動詞の原形。",
      opts: ["clean：原形", "to clean：不定詞（これからすること）", "cleaned：過去形・過去分詞", "cleaning：動名詞・-ing形"] },
    { hint: "空所の前の I have ever に注目",
      think: "the most ～ I have ever … は『今まで…した中でいちばん～』。have のあとなので 過去分詞が入る。",
      opts: ["see：原形", "saw：過去形", "seen：過去分詞", "seeing：-ing形"] },
    { hint: "Do you know のあとに『いつ始まるか』が 文の一部として入る",
      think: "Do you know ～? の中に『いつ映画が始まるか』を入れる。文の中に入った疑問は〈疑問詞＋主語＋動詞〉のふつうの語順になる。",
      opts: ["when does the movie start：ふつうの疑問文の語順", "when did the movie start：疑問文の語順（しかも過去）", "the movie starts when：疑問詞が後ろで語順がちがう", "when the movie starts：〈疑問詞＋主語＋動詞〉の間接疑問"] },
    { hint: "I wish と、2文目の『そうすれば パリで話せるのに』という内容",
      think: "I wish は『今そうではないけど、そうならいいのに』という願い。今の事実とちがうことは 過去形で表すので、can の過去形が入る（仮定法）。",
      opts: ["could：can の過去形（仮定法）", "can：現在形（できる）", "will：未来（～するだろう）", "may：～かもしれない"] },
    { hint: "文の動詞は 後ろの is。空所は The bridge を説明している",
      think: "The bridge ( ) in 1950 が主語で、文の動詞は is。橋は『造られた』側なので、過去分詞が後ろから名詞を説明する。",
      opts: ["building：-ing形（～している）", "built：過去分詞（～された）", "builds：現在形（三単現）", "was built：受け身の文の動詞（動詞が2つになってしまう）"] },
    { hint: "kind（親切な）は 人の性質を表す語",
      think: "It is＋形容詞＋( )＋人＋to ～ の形。kind のように人の性質をほめる語のときは、『その人の』を表す前置詞を使う。",
      opts: ["for：～にとって（It is easy for 人 to ～ など）", "to：～へ", "of：～の（人の性質）", "at：～の地点で"] },
    { hint: "空所のあとの she was ten が〈主語＋動詞〉になっている",
      think: "has been studying は『ずっと続いている』。続きのスタート地点を表し、あとに主語＋動詞をとれる語が入る。",
      opts: ["for：～の間（期間の長さ）", "during：～の間に（名詞が続く）", "until：～まで（ずっと）", "since：～から（ずっと）"] },
    { hint: "空所は 前の a lot of homework を 後ろから説明している",
      think: "『やるべき宿題』のように、名詞を後ろから説明する形。これからすることを表す to＋動詞の原形が合う。",
      opts: ["to do：不定詞（～するべき）", "doing：-ing形（～している）", "do：原形", "did：過去形"] },
    { hint: "前半の had already left（過去完了）が 基準",
      think: "had left は『過去のある時より前』に起きたこと。そのある時（駅に着いたとき）は、ふつうの過去形で表す。",
      opts: ["arrive：現在形", "arrived：過去形", "have arrived：現在完了", "will arrive：未来"] },
    { hint: "than と、空所のあとの other mountain（単数）",
      think: "比較級＋than ( ) other＋単数名詞 で『ほかのどの～よりも』。mountain が単数なので、単数名詞につけられる語が入る。",
      opts: ["all：すべての（複数名詞が続く）", "many：多くの（複数名詞が続く）", "any：どの～でも（単数名詞も可）", "few：ほとんどない（複数名詞が続く）"] },
    { hint: "looking forward to の to は 前置詞か、不定詞か",
      think: "look forward to の to は前置詞。前置詞のあとには 名詞か動名詞（~ing）が来る。",
      opts: ["see：原形", "saw：過去形", "seen：過去分詞", "seeing：動名詞"] },
    { hint: "主語は The movie（映画）。映画が 人に何をしたか",
      think: "so ～ that … で『とても～なので…』。映画は 人を退屈させる側なので -ing の形。人が退屈したなら -ed になる。",
      opts: ["boring：（物が人を）退屈させる", "bored：（人が）退屈した", "bore：退屈させる（動詞の原形）", "bores：退屈させる（動詞の三単現）"] }
  ],
  readHint: [
    ["第2段落。いつ・どこで・だれが教えるかを 選択肢と1つずつくらべる", "第3段落の discount のあたり", "第4段落の後半、Could you … ? の文"],
    ["第1段落の最後の文（However のあと）", "第2段落の large farms のあたり", "第3段落の Parks, gardens のあたり", "第4段落の最後の文（should のあと）"],
    ["第2段落の最後の文（but のあと）", "第3段落の a bigger front wheel のあたり", "第4段落の最後の文（Now, many more people …）"],
    ["第2段落の to remember his mother のあたり", "第3段落の Instead, they are asked to … の文", "第4段落の no bookstores or public libraries のあたり"]
  ]
});
