/* 英検ラボ：頭に つく 部品（接頭辞）を「意味の にた 仲間」で まとめる
   in- im- il- ir-（形は ちがっても 同じ 仲間）、ad- ac- af- ap-（～へ）など。
   単語の core.parts の 先頭の 部品と その 意味を 見て、どの 仲間に 入るか 決める */
(function () {
  'use strict';
  var H = window.EKFIG ? EKFIG.h : null;
  function fig(fn) { return function () { return EKFIG.raw(fn(H)); }; }

  // 図：EKFIG の 前置詞の 図（文字列）か、ここで 描く 図（関数）
  var NOT = fig(function (h) { return h.dot(60, 38, 10) + '<path class="mv" d="M34,12 L86,64"/><path class="mv" d="M86,12 L34,64"/>'; });
  var RINGS = fig(function (h) { return '<circle class="bx" cx="60" cy="38" r="30"/><circle class="bx" cx="60" cy="38" r="20"/>' + h.dot(60, 38, 9); });
  var BETWEEN = fig(function (h) { return h.box(6, 16, 30, 44) + h.box(84, 16, 30, 44) + h.line(38, 38, 82, 38, 'gd dash') + h.dot(60, 38, 7); });
  var WRONG = fig(function (h) { return '<path class="mv" d="M8,58 L36,22 L62,54 L90,20"/>' + h.dot(104, 14, 6, 'dt faint') + h.dot(8, 58, 5); });
  var NUMS = fig(function (h) { return h.dot(18, 38, 6) + h.dot(54, 26, 6) + h.dot(54, 50, 6) + h.dot(92, 20, 6) + h.dot(92, 38, 6) + h.dot(92, 56, 6); });
  var SIZES = fig(function (h) { return h.dot(26, 38, 4) + '<circle class="bx" cx="82" cy="38" r="28"/>'; });
  var GOOD = fig(function (h) { return h.line(60, 12, 60, 64, 'gd thick') + h.line(34, 38, 86, 38, 'gd thick'); });

  // 順番が 大事：上から 順に 当てはめ、最初に 合った 仲間に 入る（強め → 取りのぞく → 否定 → …）
  var FAMS = [
    { id: 'strong', title: '強め（すっかり・完全に）', forms: ['con', 'com', 'per', 'ex', 'de', 're', 'be', 'ob', 'dis', 'e', 'cor', 'col', 'a'], mean: /すっかり|完全|強く|しっかり|強め/, fig: RINGS, pic: '💪',
      image: '意味を ぐっと 強める 部品。「すっかり」「とことん」の 気もち。',
      core: '部品の もとの 意味より「最後まで・完全に」と 強める はたらき。perfect（per＋fect＝すっかり つくる）、exhaust（ex＋haust＝汲み出しきる）。', note: '同じ 形の con- や re- でも、「いっしょに」「ふたたび」の 意味の ときは 別の 仲間に 入っています。' },
    { id: 'undo', title: '取りのぞく・反対にする', forms: ['de', 'dis', 'un', 'a'], mean: /反対|元にもど|取りのぞ|取り去|逆|取り除|とる|外す|はずす|はなす/, fig: 'off', pic: '↩️',
      image: 'くっついて いたものを「とる」「もとに もどす」。',
      core: 'つけるの 反対。do → undo（元に もどす）、connect → disconnect（つなぎを とる）、decrease（下げる・へらす）。', note: 'un- は「もどす」、dis- は「とり去る」、de- は「下げる・はなす」。どれも 反対の 方向の 動きです。' },
    { id: 'not', title: '「〜でない」を つくる', forms: ['un', 'in', 'im', 'il', 'ir', 'non', 'a', 'an', 'dis'], mean: /ない|でない|ず$|なし|否|不/, fig: NOT, pic: '🚫',
      image: '「〜ない」「反対の」という 意味を つくる 部品。',
      core: '形容詞の 前に ついて 反対の 意味に する。happy → unhappy、possible → impossible、legal → illegal、regular → irregular。', note: '同じ 仲間でも 形が かわります：in-（ふつう）→ im-（b・m・p の 前）→ il-（l の 前）→ ir-（r の 前）。言い やすい ように 音を そろえたもの。' },
    { id: 'apart', title: 'はなれる', forms: ['dis', 'di', 'ab', 'abs', 'se', 'de', 'apart'], mean: /はなれ|離|はなし|なしに|～から|ばらばら|分け/, fig: 'apart', pic: '↔️',
      image: '一か所から 左右に はなれていく イメージ。',
      core: 'もとの 場所から 離れる・わかれる。absent（ab＋sent＝はなれて いる）、separate（se＋par＝わけて 用意する）、distance（dis＋stance＝はなれて 立つ）。', note: 'ab- は「〜から はなれて」、dis-・di- は「ばらばらに」、se- は「わきへ」。' },
    { id: 'down', title: '下に・下へ', forms: ['sub', 'sup', 'suc', 'sus', 'suf', 'sug', 'sum', 'under', 'down', 'de', 'infra', 'hypo'], mean: /下/, fig: 'under', pic: '⬇️',
      image: '何かの 下に もぐる・下から 支える。',
      core: 'subway（sub＋way＝地面の 下の 道）、support（sup＋port＝下から 運ぶ→支える）、underline（下に 線を 引く）。', note: 'sub- も 後ろの 文字で 形が かわります：sup-（p の 前）、suc-（c の 前）、sus-（s・t の 前）。' },
    { id: 'to', title: '〜へ（ぐっと 近づく）', forms: ['ad', 'ac', 'af', 'ag', 'al', 'an', 'ap', 'ar', 'as', 'at', 'a'], mean: /～へ|～に向|そばに|近づ|～に$/, fig: 'to', pic: '🎯',
      image: '目指す ところへ 矢印が のびる。「そっちへ 向かう」イメージ。',
      core: 'ad-（～へ）は 次の 文字に 合わせて 形が かわる。ac-cept（～へ 取る→受け入れる）、ap-proach（～へ 近い→近づく）、ar-rive（岸へ→着く）、at-tend（～へ 心を 向ける→出席する）。', note: 'ad- → ac-・af-・ag-・al-・an-・ap-・ar-・as-・at-。後ろの 文字を ダブらせて 言いやすく した 形。単語の つづりが 二重（acc・aff・app・arr・att…）に なっていたら ad- の 仲間です。' },
    { id: 'state', title: '〜の 状態で', forms: ['a'], mean: /状態/, fig: 'on', pic: '🌡️',
      image: 'ある 状態に「のっている」「くっついている」。',
      core: 'asleep（眠りの 状態で）、alive（命の 状態で）、abroad（外の 広い ところに いる状態→外国へ）、aware（見はる 状態で→気づいて）。', note: 'a- は 形容詞や 副詞を つくる 部品。ad-（～へ）の a- とは 別ものです。' },
    { id: 'para', title: 'そばに・わきに', forms: ['para'], fig: 'by', pic: '↔️',
      image: '本体の そばに ならぶ・わきから 助ける。',
      core: 'paragraph（そばに 書く→段落）、parallel（そばで 同じ 向き→平行な）、paramedic（医者の そばで 助ける→救急隊員）、parasol（日ざしの わき→日がさ）。' },
    { id: 'with', title: 'いっしょに', forms: ['con', 'com', 'co', 'col', 'cor', 'syn', 'sym'], fig: 'together', pic: '🤝',
      image: '2 つ（たくさん）が 1 つに 集まる。',
      core: 'connect（con＋nect＝いっしょに 結ぶ）、combine（com＋bine＝2 つを いっしょに する）、cooperate（co＋operate＝いっしょに はたらく）、collect（col＋lect＝いっしょに 集める）。', note: 'con- も 形が かわります：com-（b・m・p の 前）、col-（l の 前）、cor-（r の 前）、co-（母音・h の 前）。' },
    { id: 'in', title: '中へ・〜にする', forms: ['in', 'im', 'il', 'ir', 'en', 'em'], mean: /中|上|入|にする|状態|～へ|～に向|～において/, fig: 'into', pic: '📥',
      image: '中へ 入りこむ。入って「〜の 状態に する」。',
      core: 'import（中へ 運びこむ）、include（中に 閉じこめる→ふくむ）、enjoy（楽しさの 中へ）、enable（できる 状態に する）。', note: 'in- も 形が かわります：im-（b・m・p の 前）、en-・em-（「〜にする」の 動詞を つくる）。否定の in-（impossible など）は「〜でない」の 仲間に 入っています。' },
    { id: 'out', title: '外へ', forms: ['ex', 'e', 'ef', 'out', 'extra', 'exo'], mean: /外|出|上回|こえ/, fig: 'out', pic: '📤',
      image: '中から 外へ 出ていく。出きって 外に 広がる。',
      core: 'export（外へ 運び出す）、exit（外へ 行く→出口）、emerge（外へ うかび出る）、outstanding（外に 目立って 立つ→きわだった）。', note: 'ex- は 後ろの 文字で ef-・e- に かわります（effect＝外へ 作り出す→効果）。' },
    { id: 're', title: 'ふたたび・うしろへ', forms: ['re'], mean: /再|もう一度|後ろ|もどす|もどっ|もどし|あとに|ふり返|もと|うしろ/, fig: 'back', pic: '🔄',
      image: 'もとの ところへ もどる。もう 一度 やる。',
      core: 'return（もどる）、repeat（くり返す）、review（もう一度 見る）、recall（呼び もどす→思い出す）。', note: 're- は「もどる」の 意味だけでなく、「もう一度」の 意味でも たくさん 使われます。' },
    { id: 'pro', title: '前へ・前もって', forms: ['pro', 'pre', 'fore', 'ante', 'anti', 'fro'], mean: /前|先|もって|あらかじ/, fig: 'forward', pic: '⏩',
      image: '前へ 進む。時間でも 場所でも「先に」。',
      core: 'progress（前へ 進む→進歩）、prepare（前もって 用意する）、forecast（前もって 見通す→予報）、project（前へ 投げ出す→計画）。', note: 'pre-・fore-・ante- は「時間的に 先に」、pro- は「前に 向かって」のイメージが 強いです。' },
    { id: 'over', title: 'こえて・上に', forms: ['super', 'sur', 'over', 'hyper', 'ultra', 'up'], mean: /こえ|上|すぎ|超/, fig: 'over', pic: '⬆️',
      image: '上を こえて 向こうへ。ふつうの 量を こえる。',
      core: 'overcome（上を こえる→打ち勝つ）、surface（上の 顔→表面）、superior（上の→すぐれた）、upgrade（上の 等級へ）。', note: 'super-・sur- は「上に・こえて」の 仲間。sub-（下に）の 反対です。' },
    { id: 'through', title: '通りぬけて・向こうへ', forms: ['trans', 'per', 'dia', 'through', 'cross'], mean: /通|こえ|向こう|横切/, fig: 'through', pic: '🛤️',
      image: 'つきぬけて 向こう側へ。',
      core: 'transport（向こうへ 運ぶ）、transform（形を 越えて かえる）、permanent（ずっと 通して とどまる→永久の）、diagram（線を 通して 書く図）。', note: 'trans- は「向こう側へ・形を 変えて」、per- は「ずっと 通して」の イメージ。' },
    { id: 'between', title: 'あいだ・たがいに', forms: ['inter', 'between', 'mid'], fig: BETWEEN, pic: '🔗',
      image: '2 つの あいだに 入る。おたがいに やりとりする。',
      core: 'international（国と 国の あいだの）、interview（おたがいに 見る→面接）、interrupt（あいだで 切る→じゃまする）、Internet（網と 網を つなぐ）。' },
    { id: 'against', title: '向かい合う・さからう', forms: ['anti', 'contra', 'counter', 'ob', 'op', 'oc', 'against'], mean: /反|向かって|向けて|さから|対抗|逆|前に/, fig: 'against', pic: '🛡️',
      image: '正面から ぶつかる。反対の 方向から 向かう。',
      core: 'oppose（向かい合って 置く→反対する）、object（向かって 投げる→反対する・物）、contrast（反対に 立つ→対照）、counter（向かい 合って 打つ）。' },
    { id: 'wrong', title: '悪く・まちがって', forms: ['mis', 'mal', 'dys', 'dis'], mean: /悪|誤|まちが|不/, fig: WRONG, pic: '⚠️',
      image: '目当てから それて、うまく いかない。',
      core: 'mistake（まちがって 取る→まちがい）、misunderstand（まちがって 理解する）、malfunction（悪く 働く→故障）。' },
    { id: 'good', title: 'よく・よい', forms: ['bene', 'bon', 'eu'], fig: GOOD, pic: '➕',
      image: '「よい こと」を する・生む。',
      core: 'benefit（よく する→利益）、benefactor（よい ことを する人）、euphoria（よい 気分）。' },
    { id: 'number', title: '数・量', forms: ['uni', 'mono', 'bi', 'tri', 'quad', 'penta', 'deca', 'cent', 'milli', 'kilo', 'multi', 'poly', 'semi', 'hemi', 'half', 'di'], fig: NUMS, pic: '🔢',
      image: '1 つ・2 つ・3 つ…、たくさん、半分。',
      core: 'unique（1 つだけの）、bicycle（2 つの 輪）、triangle（3 つの 角）、multiple（たくさんの）、semicircle（半分の 円）。', note: 'uni-＝1、bi-・di-＝2、tri-＝3、multi-・poly-＝たくさん、semi-＝半分。' },
    { id: 'size', title: '小さい・大きい', forms: ['micro', 'mini', 'macro', 'mega', 'maxi', 'giga'], fig: SIZES, pic: '🔬',
      image: '小さい 点と 大きい 円。大きさを あらわす 部品。',
      core: 'microscope（小さい ものを 見る 道具）、minimum（いちばん 小さい）、macro（大きな）、megaphone（大きな 声）。' },
    { id: 'self', title: '自分で', forms: ['auto', 'self'], fig: 'around', pic: '🙋',
      image: '自分の まわりで 自分から。',
      core: 'automatic（自分で 動く）、autograph（自分で 書く→サイン）、selfish（自分の ことだけ 考える）。' },
    { id: 'around', title: 'まわり', forms: ['peri', 'circum', 'cir'], fig: 'around', pic: '⭕',
      image: 'ぐるっと まわりを 回る。',
      core: 'perimeter（まわりの 長さ）、circumstance（まわりに 立っている もの→状況）、circle（円）。' },
    { id: 'after', title: 'あと・うしろ', forms: ['post', 'retro', 'back', 'after', 'behind'], mean: /後|うしろ|あと|背/, fig: 'after', pic: '⏪',
      image: '時間でも 場所でも 後ろ・あと。',
      core: 'postpone（後ろに 置く→のばす）、postwar（戦後の）、retrospect（うしろを 見る→回想）、background（うしろの 景色）。' }
  ];


  // ---- 語根：意味の 中心に なる 部品を「意味の 仲間」で まとめる（形が ちがっても 同じ 意味なら 同じ 仲間）----
  var ROOTS = [
    { id: 'see', title: '見る', forms: ['spect', 'spec', 'spic', 'vis', 'vid', 'view', 'scope'], pic: '👀',
      image: '目を 向けて じっと 見る。', core: 'respect（re＋spect＝ふり返って 見る→うやまう）、inspect（中を 見る→調べる）、visible（見える）、video（見る もの）、telescope（遠くを 見る 道具）。', note: 'spect・spec・spic は 同じ 仲間（ラテン語 specere＝見る）。vis・vid は 別の 形（videre＝見る）。' },
    { id: 'carry', title: '運ぶ', forms: ['port', 'fer', 'lat'], pic: '📦',
      image: '荷物を もって 運んで いく。', core: 'transport（向こうへ 運ぶ）、export（外へ 運び出す）、import（中へ 運びこむ）、transfer（向こうへ 運ぶ→うつす）、prefer（前へ 運ぶ→好む）、offer（〜へ 運ぶ→さし出す）。', note: 'port（ラテン語 portare）と fer（ferre）は どちらも「運ぶ」。airport の port（港）とは 別の 語です。' },
    { id: 'pull', title: '引く・導く', forms: ['tract', 'duct', 'duc', 'duce'], pic: '🧲',
      image: '手前へ 引き寄せる。ひっぱって 連れて いく。', core: 'attract（〜へ 引く→引きつける）、extract（外へ 引き出す）、product（前へ 導く→生み出す）、introduce（中へ 導く→紹介する）、educate（外へ 導く→教育する）。' },
    { id: 'say', title: '言う・声・ことば', forms: ['dict', 'voc', 'vok', 'loqu', 'log', 'logy', 'phon', 'lingu'], pic: '🗣️',
      image: '口に 出す・声を 出す・ことばに する。', core: 'predict（前もって 言う→予言する）、dictionary（ことばの 本）、advocate（〜へ 声を 上げる→主張する）、vocal（声の）、dialog（ことばを かわす）、biology（命の 学問）。', note: '-logy は「〜学」。 phone は ギリシャ語で「音・声」です。' },
    { id: 'write', title: '書く', forms: ['graph', 'scrib', 'script', 'writ'], pic: '✍️',
      image: 'ペンで 書きとめる。', core: 'paragraph（そばに 書く→段落）、photograph（光で 書く→写真）、autograph（自分で 書く→サイン）、describe（下に 書く→書き表す）、script（書いた もの→台本）。' },
    { id: 'hold', title: '持つ・保つ', forms: ['tain', 'tin', 'ten'], mean: /持|保/, pic: '🤲',
      image: '手に しっかり 持って はなさない。', core: 'contain（いっしょに 持つ→ふくむ）、maintain（手で 保つ→続ける）、entertain（あいだで 持つ→楽しませる）、container（入れ物）。' },
    { id: 'take', title: '取る・つかむ', forms: ['cept', 'ceive', 'ceipt', 'cap', 'capt', 'cip'], pic: '🙌',
      image: '手を のばして つかみ取る。', core: 'accept（〜へ 取る→受け入れる）、receive（もどして 取る→受け取る）、concept（いっしょに つかむ→考え）、except（外へ 取る→のぞく）、capture（つかまえる）。' },
    { id: 'throw', title: '投げる', forms: ['ject'], pic: '🎯',
      image: '勢いよく 投げ出す。', core: 'project（前へ 投げる→計画・投影）、object（向かって 投げる→反対する・物）、reject（もどして 投げる→断る）、inject（中へ 投げこむ→注入）、subject（下に 投げる→主題）。' },
    { id: 'send', title: '送る', forms: ['miss', 'mit'], mean: /送|^$/, pic: '📨',
      image: 'ある 場所から 別の 場所へ 送り出す。', core: 'admit（〜へ 送る→入れる→認める）、permit（通して 送る→許す）、submit（下に 送る→提出する）、commit（いっしょに 送る→ゆだねる）、mission（送られた 仕事→使命）。' },
    { id: 'come', title: '来る・進む', forms: ['vent', 'ven', 'cess', 'ceed', 'ced', 'gress', 'grad'], pic: '🚶',
      image: '一歩ずつ 近づいて 来る・進んで いく。', core: 'adventure（〜へ 来る こと→冒険）、invent（中へ 来る→見つける→発明）、event（外へ 来る→出来事）、process（前へ 進む→過程）、success（次へ 進む→成功）、exceed（外へ 出る→こえる）。' },
    { id: 'turn', title: '回る・向く', forms: ['vers', 'vert', 'volv', 'volu'], pic: '🔄',
      image: 'くるっと 向きを かえる。', core: 'convert（いっしょに 向きを かえる→変える）、reverse（うしろへ 向ける→逆）、universe（1 つに 向かう もの→宇宙）、anniversary（年ごとに 回る→記念日）。' },
    { id: 'stand', title: '立つ', forms: ['sist', 'stat', 'stit', 'stan'], pic: '🧍',
      image: 'しっかり 立って うごかない。', core: 'insist（上に 立つ→言いはる）、consist（いっしょに 立つ→成り立つ）、resist（向かって 立つ→さからう）、assist（そばに 立つ→助ける）、status（立つ 状態→地位）。' },
    { id: 'make', title: '作る・する', forms: ['fact', 'fect', 'fic', 'fici', 'fac'], pic: '🔨',
      image: '手を 動かして 作り出す。', core: 'factory（作る 場所→工場）、perfect（すっかり 作る→完全な）、effect（外へ 作り出す→結果・効果）、artificial（技で 作った→人工の）、sufficient（下から 作る→十分な）。' },
    { id: 'build', title: '組み立てる', forms: ['struct', 'stru'], pic: '🏗️',
      image: '部品を 積んで 組み立てる。', core: 'construct（いっしょに 組み立てる→建設する）、structure（組み立てた もの→構造）、instruct（中に 組みこむ→教える）、destruct（組み立ての 反対→こわす）。' },
    { id: 'put', title: '置く', forms: ['pos', 'pose', 'pon', 'posit'], pic: '📍',
      image: 'ある 場所に そっと 置く。', core: 'compose（いっしょに 置く→組み立てる）、purpose（前に 置く→目的）、propose（前へ 置く→提案する）、expose（外に 置く→さらす）、position（置かれた 所→位置）、oppose（向かい合って 置く→反対する）。' },
    { id: 'press', title: '押す', forms: ['press', 'puls', 'pel'], pic: '👇',
      image: 'ぐっと 力を かけて 押す。', core: 'express（外へ 押し出す→表現する）、impress（中に 押す→印象を 与える）、pressure（押す 力→圧力）、compel（いっしょに 駆りたてる→無理に させる）。' },
    { id: 'fold', title: '折る・重ねる', forms: ['plic', 'ply', 'plex', 'ploy'], pic: '📄',
      image: '紙のように 折って 重ねる。', core: 'complicate（いっしょに 折る→入り組む）、apply（〜へ 重ねる→あてはめる）、reply（折り返す→返事）、employ（中に 折りこむ→雇う）。' },
    { id: 'break', title: '破る・こわす', forms: ['rupt', 'frag', 'fract'], pic: '💥',
      image: 'ぽきっと 割れる・破れる。', core: 'interrupt（あいだで 破る→じゃまする）、erupt（外へ 破れ出る→噴火する）、bankrupt（店の 台が こわれる→破産）。' },
    { id: 'close', title: '閉じる', forms: ['clus', 'clud', 'clos'], pic: '🚪',
      image: '戸を ぱたんと 閉める。', core: 'conclusion（全部 閉じる→結論）、include（中に 閉じこめる→ふくむ）、exclude（外に 閉め出す→のぞく）、disclose（閉じたのを 開く→あかす）。' },
    { id: 'choose', title: '選ぶ・集める', forms: ['lect'], pic: '🧺',
      image: '多くの 中から 選んで 集める。', core: 'collect（いっしょに 集める）、select（わきへ 選ぶ→選び出す）、elect（外へ 選ぶ→選挙で 選ぶ）、intellect（あいだを 選ぶ→知性）。' },
    { id: 'sit', title: 'すわる', forms: ['sid', 'sess', 'sed'], pic: '🪑',
      image: 'どっかりと すわる。', core: 'president（前に すわる 人→大統領）、resident（住んで すわる 人→住民）、session（すわって 行う→会）、preside（前に すわる→議長を つとめる）。' },
    { id: 'flow', title: '流れる', forms: ['flu', 'fus'], pic: '🌊',
      image: 'さらさらと 流れこむ。', core: 'influence（中へ 流れこむ→影響）、fluent（流れる ような→流ちょうな）、confuse（いっしょに 流す→混乱させる）。' },
    { id: 'life', title: '命・生きる', forms: ['bio', 'viv', 'vit', 'anim'], pic: '🌱',
      image: '生きて 息を している。', core: 'biology（命の 学問→生物学）、survive（上を 生きる→生きのびる）、vital（命に かかわる→重要な）、animal（息を する もの→動物）、revive（もう一度 生きる→よみがえる）。' },
    { id: 'form', title: '形', forms: ['form', 'morph'], pic: '🧩',
      image: '形を つくる・形に する。', core: 'uniform（1 つの 形→制服）、transform（形を こえて かえる）、inform（心に 形を 与える→知らせる）、perform（すっかり 形に する→演じる）。' },
    { id: 'run', title: '走る', forms: ['cur', 'cour', 'curs'], mean: /走/, pic: '🏃',
      image: 'たっと 走って 流れる。', core: 'occur（〜へ 走る→出くわす→起こる）、current（走る もの→流れ・今の）、course（走る 道→進路・講座）、excursion（外へ 走る→遠足）。' },
    { id: 'watch', title: '見守る・守る', forms: ['serv'], pic: '🛡️',
      image: '目を はなさず 見守る。', core: 'observe（〜に 注意して 見守る→観察する）、conserve（いっしょに 守る→保存する）、reserve（うしろに 守る→取っておく）、preserve（前もって 守る→保存する）。' },
    { id: 'stretch', title: 'のばす・向ける', forms: ['tend', 'tens', 'tent'], mean: /のばす|向け|のび/, pic: '↗️',
      image: 'ぐーんと 手を のばして 向ける。', core: 'attend（〜へ 心を のばす→出席する）、extend（外へ のばす→広げる）、intend（〜へ のばす→〜する つもり）、tension（のばした 張り→緊張）、attention（心を 向ける→注意）。' },
    { id: 'work', title: '働く', forms: ['labor', 'oper'], pic: '⚒️',
      image: '手を 動かして 働く。', core: 'laboratory（働く 場所→実験室）、collaborate（いっしょに 働く→協力する）、operate（働かせる→操作する・手術する）。' },
    { id: 'law', title: '法・正しさ', forms: ['leg', 'jud', 'jus', 'jur'], mean: /法|法律|判|正|裁|^$/, pic: '⚖️',
      image: '決まりに 照らして 正しく 裁く。', core: 'legal（法の→合法の）、judge（正しく 言う→裁く）、justice（正しさ）、jury（誓った 人たち→陪審員）。' },
    { id: 'body', title: '手・足', forms: ['manu', 'man', 'ped', 'pod'], mean: /手|足/, pic: '🖐️',
      image: '手と 足の 動きから できた 部品。', core: 'manual（手の→手動の）、manufacture（手で 作る→製造）、pedal（足で ふむ もの）、pedestrian（足で 歩く 人→歩行者）、tripod（3 つの 足）。' },
    { id: 'earth', title: '大地・世界', forms: ['geo', 'terr', 'mund'], pic: '🌍',
      image: '足もとの 大地から 世界まで。', core: 'geography（大地を 書く→地理）、territory（土地→領土）、mundane（世の中の→ありふれた）。' },
    { id: 'sound', title: '音・聞く', forms: ['aud', 'son', 'phon'], pic: '🔊',
      image: '耳に 届く 音を 聞く。', core: 'audience（聞く 人たち→観客）、audio（聞こえる もの→音声）、sonic（音の）、microphone（小さい 音を ひろう もの）。' },
    { id: 'born', title: '生まれる', forms: ['nat', 'gen'], mean: /生|産|種|^$/, pic: '🍼',
      image: '生まれる・うみ出す。', core: 'nature（生まれた まま→自然）、native（生まれた 土地の）、national（生まれた 国の→国民の）、generate（生み出す）、generation（生まれた 世代）。' },
    { id: 'people', title: '人びと・支配', forms: ['dem', 'pop', 'cracy', 'arch'], pic: '👥',
      image: '人びとの 集まりと その まとめ方。', core: 'democracy（人びとの 支配→民主主義）、popular（人びとの→人気の）、population（人びと→人口）、monarchy（ひとりの 支配→君主制）。' }
  ];

  // ---- 後ろに つく 部品：はたらき（品詞）で 仲間に する ----
  var SUFFIX = [
    { id: 'noun', title: '「〜こと」にする（名詞）', forms: ['ation', 'ion', 'tion', 'ition', 'ment', 'ness', 'ity', 'ability', 'ibility', 'ence', 'ance', 'ency', 'ancy', 'ure', 'ism', 'ship', 'ization', 'ty', 'hood'], pic: '📝',
      image: '動作や 状態を「こと・もの」の 名前に する。', core: 'inform → information（知らせる→知らせ）、move → movement（動く→動き）、kind → kindness（親切な→親切さ）、able → ability（できる→能力）、friend → friendship。', note: '名詞を つくる 部品は とても 多い。単語の おしりを 見ると「名詞だ」と 分かります。' },
    { id: 'person', title: '「〜する人」', forms: ['er', 'or', 'ist', 'ian', 'ator', 'ent', 'ant', 'ee', 'eer', 'ess'], mean: /人|者|もの|^$/, pic: '🧑‍🏫',
      image: 'その ことを する 人・もの。', core: 'pianist（ピアノを ひく 人）、musician（音楽を する 人）、assistant（助ける 人）、elevator（上げる もの）、refrigerator（冷やす もの）。' },
    { id: 'full', title: 'いっぱい／ない（形容詞）', forms: ['ful', 'less', 'ous', 'ious'], pic: '⚖️',
      image: '〜が いっぱい（-ful, -ous）か、〜が ない（-less）。', core: 'beautiful（美しさが いっぱい）、careful（注意が いっぱい）、famous（有名さが 多い）、careless（注意が ない）、helpless（助けが ない）。', note: '-ful と -less は 反対の 組み。care → careful ⇔ careless。' },
    { id: 'able', title: '「〜できる」', forms: ['able', 'ible'], pic: '✅',
      image: '〜することが できる・〜される ことが できる。', core: 'comfortable（心地よさを 感じる ことが できる）、available（手に 入れる ことが できる）、visible（見る ことが できる→見える）、responsible（答える ことが できる→責任のある）。' },
    { id: 'adj', title: '「〜の・〜な」（形容詞）', forms: ['al', 'ial', 'ical', 'ual', 'ary', 'ory', 'ic', 'ive', 'ative', 'ent', 'ant', 'ish', 'ar'], mean: /^(?!.*(場所|集まり|人$|する人)).*$/, pic: '🏷️',
      image: '名詞や 動詞に つけて 「〜の」「〜な」と 様子を 表す。', core: 'historical（歴史の）、typical（典型の）、creative（作り出す ような）、expensive（お金を かける ような→高い）、foolish（愚か者の ような）。' },
    { id: 'verb', title: '「〜にする・〜する」（動詞）', forms: ['ate', 'ize', 'ise', 'ify', 'en'], mean: /する|にする|^$/, pic: '🔧',
      image: '名詞や 形容詞を「〜にする」動詞に かえる。', core: 'realize（本当に する→気づく）、organize（組織に する）、simplify（かんたんに する）、activate（活動的に する）。', note: '-ize（アメリカ式）は -ise（イギリス式）とも 書きます。' },
    { id: 'adv', title: '「〜に」（副詞）', forms: ['ly', 'ally', 'ably', 'ively', 'ently', 'ily', 'ibly', 'antly'], pic: '🎬',
      image: '動き方や 様子を 説明する 副詞を つくる。', core: 'quick → quickly（すばやく）、dramatic → dramatically（劇的に）、comfortable → comfortably（心地よく）、impressive → impressively（印象的に）。' }
  ];

  function norm(k) { return String(k).toLowerCase().replace(/[-‐]/g, ''); }
  function strip(m) { return String(m).replace(/（[^）]*）/g, '').trim(); }
  function figSVG(f) { return typeof f.fig === 'function' ? f.fig() : (f.fig && window.EKFIG ? EKFIG.svg(f.fig) : ''); }

  // kind: 'prefix'（先頭の 部品だけ）・'root'（どこでも）・'suffix'（2 番目より 後ろ）
  // words: そのレベルの 単語、coreOf(en): コアデータ。2 語 以上 そろった 仲間だけ 返す
  function groups(words, coreOf, kind) {
    var list = kind === 'root' ? ROOTS : kind === 'suffix' ? SUFFIX : FAMS, by = {};
    words.forEach(function (w) {
      var c = coreOf(w.en); if (!c || !c.parts || c.parts.length < 2) return;
      var done = {};
      c.parts.forEach(function (x, idx) {
        if (kind === 'prefix' && idx > 0) return;
        if (kind === 'suffix' && idx < 1) return;
        var key = norm(x[0]), m = strip(x[1]);
        for (var i = 0; i < list.length; i++) {
          var f = list[i];
          if (f.forms.indexOf(key) >= 0 && (!f.mean || f.mean.test(m))) {
            if (!done[f.id]) { done[f.id] = 1; (by[f.id] = by[f.id] || []).push({ w: w, c: c, key: key }); }
            return;
          }
        }
      });
    });
    return list.filter(function (f) { return (by[f.id] || []).length >= 2; }).map(function (f) {
      var ws = by[f.id], used = {};
      ws.forEach(function (x) { used[x.key] = (used[x.key] || 0) + 1; });
      return { f: f, ws: ws, used: used, svg: figSVG(f) };
    });
  }
  function allForms() { var o = {}; [FAMS, ROOTS, SUFFIX].forEach(function (l) { l.forEach(function (f) { f.forms.forEach(function (k) { o[k] = 1; }); }); }); return o; }
  window.EKPFX = { groups: groups, families: FAMS, roots: ROOTS, suffixes: SUFFIX, allForms: allForms };
})();
