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

  function norm(k) { return String(k).toLowerCase().replace(/[-‐]/g, ''); }
  function strip(m) { return String(m).replace(/（[^）]*）/g, '').trim(); }
  function figSVG(f) { return typeof f.fig === 'function' ? f.fig() : (f.fig && window.EKFIG ? EKFIG.svg(f.fig) : ''); }

  // words: そのレベルの 単語、coreOf(en): コアデータ。2 語 以上 そろった 仲間だけ 返す
  function groups(words, coreOf) {
    var by = {};
    words.forEach(function (w) {
      var c = coreOf(w.en); if (!c || !c.parts || c.parts.length < 2) return;
      var key = norm(c.parts[0][0]), m = strip(c.parts[0][1]);
      for (var i = 0; i < FAMS.length; i++) {
        var f = FAMS[i];
        if (f.forms.indexOf(key) >= 0 && (!f.mean || f.mean.test(m))) { (by[f.id] = by[f.id] || []).push({ w: w, c: c, key: key }); return; }
      }
    });
    return FAMS.filter(function (f) { return (by[f.id] || []).length >= 2; }).map(function (f) {
      var ws = by[f.id], used = {};
      ws.forEach(function (x) { used[x.key] = (used[x.key] || 0) + 1; });
      return { f: f, ws: ws, used: used, svg: figSVG(f) };
    });
  }
  window.EKPFX = { groups: groups, families: FAMS };
})();
