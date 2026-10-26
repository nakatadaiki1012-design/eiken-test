window.EK = window.EK || {}; EK.put = EK.put || function (id, o) { EK.data = EK.data || {}; EK.data[id] = Object.assign(EK.data[id] || {}, o); };

EK.put("g2", {
  icore: {
    "in favor of ~": {
      hint: "favor は『好意・味方すること』。in は その中にいる",
      core: "in（～の中に）＋favor（好意・味方）＋of（～に対する）→ ～を応援する側の中にいる → ～に賛成して。",
      tip: "favorite（お気に入り）と同じ仲間。投票で 好きな案の側に 手をあげる場面。"
    },
    "be concerned about ~": {
      hint: "concern は『気にかかる』。about は『～のまわり』",
      core: "concern（気にかけさせる）の受け身＋about（～のまわりに）→ ～のことで 気持ちがいっぱい → ～を心配している。",
      tip: "親が 子どものゲーム時間を 気にして そわそわする場面。concern＝気がかり。"
    },
    "be involved in ~": {
      hint: "involve は『包みこむ・巻きこむ』。in は 中",
      core: "involve（中に巻きこむ）の受け身＋in（～の中に）→ ～の中に入って 一部になっている → ～に関わっている。",
      tip: "ウミガメを守るプロジェクトの 輪の中に 入っている自分を 想像しよう。"
    },
    "in terms of ~": {
      hint: "term は『区切った範囲・用語』。どの ものさしで 見る？",
      core: "in（～の中で）＋terms（ことば・範囲）＋of → ～ということばの範囲で 言うと → ～の点で・～に関して。",
      tip: "In terms of price＝『値段という ものさしで 見ると』。比べる観点を 先に言う表現。"
    },
    "on behalf of ~": {
      hint: "behalf は『～の側』。on は その立場に のっている",
      core: "on（～の上に＝立場にのって）＋behalf（～の側）＋of → ～の立場にのって 話す・動く → ～を代表して・～の代わりに。",
      tip: "キャプテンが チーム全員の気持ちを 背負って スピーチする場面。"
    },
    "as a result of ~": {
      hint: "result は『あとに出てくるもの』。as は『～として』",
      core: "as（～として）＋a result（あとから出てきたもの）＋of（～から）→ ～から生まれたものとして → ～の結果として。",
      tip: "大雪→休校。of の後ろには『原因』が来る、と覚える。"
    },
    "be aware of ~": {
      hint: "aware は『心のアンテナが 立っている』状態",
      core: "aware（意識が向いている）＋of（～について）→ ～のことが 頭に入っている → ～に気づいている・知っている。",
      tip: "beware（用心せよ）と同じ仲間の語。注意が向いている イメージ。"
    },
    "be capable of ~": {
      hint: "capacity（容量）と同じ仲間。中に入れる力",
      core: "capable（～を入れる器がある）＋of（～を）→ ～をこなす器がある → ～する能力がある。of の後ろは 名詞か -ing。",
      tip: "家じゅうのそうじを こなせるロボット。can を かたく言った形と 思えばよい。"
    },
    "be based on ~": {
      hint: "base は『土台』。on は 上に のっている",
      core: "base（土台を置く）の受け身＋on（～の上に）→ ～を土台にして その上にのっている → ～に基づいている。",
      tip: "実話という土台の上に 映画が建っている絵。ベース（base）＝土台。"
    },
    "bring about ~": {
      hint: "bring は『持ってくる』。about は『まわりに』",
      core: "bring（持ってくる）＋about（まわりに）→ 変化を 身のまわりに 持ってくる → ～を引き起こす・もたらす。",
      tip: "インターネットが 話し方の世界に 大きな変化を 運んできた、と覚える。"
    },
    "be in danger of ~": {
      hint: "in は『ある状態の中に いる』。どんな状態か？",
      core: "in（～の中に）＋danger（あぶないこと）＋of（～という）→ ～という あぶない状態の中にいる → ～の危険がある。of のあとは -ing が多い。",
      tip: "絶滅しそうな動物＝in danger of dying out。ニュースで よく見る形。"
    },
    "come across ~": {
      hint: "across は『横切って 向こうへ』",
      core: "come（来る）＋across（横切って）→ 道を横切ったところで ばったり → ～に偶然出会う・見つける。",
      tip: "部屋の片づけ中、古い写真が 目の前を 横切って出てくる場面。"
    },
    "cope with ~": {
      hint: "with は『～と 向き合って』。なんとか やっていく",
      core: "cope（なんとか やっていく）＋with（～と向き合って）→ 困ったことと 向き合いながら やっていく → ～にうまく対処する。",
      tip: "ストレスと 組み合って たえるイメージ。deal with より『大変さ』が強い。"
    },
    "deal with ~": {
      hint: "deal は『分ける・配る』。with は『～を相手に』",
      core: "deal（配る・取り分ける）＋with（～を相手に）→ ～を相手に 手を動かして 片づける → ～を処理する・扱う。",
      tip: "トランプを配る ディーラー（dealer）。客や問題を 手ぎわよく さばく人。"
    },
    "depend on ~": {
      hint: "depend は『ぶら下がる』。on は くっついている",
      core: "depend（ぶら下がる）＋on（～にくっついて）→ ～にぶら下がっている → ～に頼る／～によって決まる（～しだい）。",
      tip: "ペンダント（pendant）＝ぶら下がるもの、と同じ仲間。予定は 天気にぶら下がっている。"
    },
    "be suitable for ~": {
      hint: "suit は『ぴったり合う』。for は『～に向けて』",
      core: "suitable（ぴったり合う）＋for（～に向けて）→ ～に向けて ぴったり → ～に適している・向いている。",
      tip: "スーツ（suit）は 体にぴったり合う服。小さい子ども連れに ぴったりのコース。"
    },
    "by chance": {
      hint: "chance は『めぐり合わせ』。by は『～によって』",
      core: "by（～によって）＋chance（めぐり合わせ）→ 計画ではなく めぐり合わせによって → 偶然に・たまたま。",
      tip: "チャンス＝たまたま来た機会。外国の空港で 旧友に会うのは 計画外。"
    },
    "for good": {
      hint: "good は『よい』の意味ではない。一時的か、それっきりか",
      core: "for（～の期間）＋good → 『ちょっとの間』ではなく『それっきり、もう もどらない』→ 永久に・ずっと。",
      tip: "return to Japan for good＝帰国して もう海外に もどらない。for a while と対で。"
    },
    "in place of ~": {
      hint: "place は『場所・位置』。その位置に 入る",
      core: "in（～の中に）＋place（位置）＋of（～の）→ ～がいた位置に 入る → ～の代わりに。",
      tip: "プラスチックのストローがあった場所に 紙ストローが入る絵。instead of と同じ。"
    },
    "in return for ~": {
      hint: "return は『返す』。for は『～と交換に』",
      core: "in（～の形で）＋return（返すこと）＋for（～に対して）→ ～に対して 返すものとして → ～のお返しに。",
      tip: "農場を手伝った→野菜をもらった。for は buy it for 100 yen の『交換』の for。"
    },
    "in addition to ~": {
      hint: "add は『足す』。to は『～に』",
      core: "in（～の形で）＋addition（足すこと）＋to（～に）→ ～に足して → ～に加えて。",
      tip: "add（足す）の名詞形 addition＝足し算。英語に 中国語を 足す。"
    },
    "in the long run": {
      hint: "run は『走ること』。長く走った その先は？",
      core: "in（～の中で）＋the long run（長い走り）→ マラソンのように 長い道のりで見ると → 長い目で見れば・最終的には。",
      tip: "短い距離では損でも 長い距離では得。ソーラーパネルは 最初は高いが あとで得をする。"
    },
    "in charge of ~": {
      hint: "charge は『荷を負わせる・責任』。in は その中",
      core: "in（～の中に）＋charge（負わされた責任）＋of（～の）→ ～の責任を 背負っている状態 → ～を担当して。",
      tip: "体育祭の運営を 背負っている 佐藤先生。person in charge＝担当者。"
    },
    "in spite of ~": {
      hint: "spite は『いじわる・さからう気持ち』",
      core: "in（～の中で）＋spite（さからう気持ち）＋of（～に）→ ～にさからってでも → ～にもかかわらず。",
      tip: "雨に さからってでも 人が集まった野外コンサート。despite 1語でも 同じ意味。"
    },
    "in the meantime": {
      hint: "mean には『まん中・あいだ』の意味もある",
      core: "in（～の中で）＋the mean（あいだの）＋time（時間）→ 2つのできごとの あいだの時間に → その間に・それまでに。",
      tip: "夕食まで30分。その すき間の時間に 宿題。meanwhile も 同じ。"
    },
    "out of date": {
      hint: "out of は『～から外れて』。date は『日付』",
      core: "out of（～から外へ）＋date（日付・今の時点）→ 今の日付から 外れている → 時代遅れの・古くなった。",
      tip: "反対は up to date（最新の）。古いままの ウェブサイトの情報。"
    },
    "lead to ~": {
      hint: "lead は『導く・連れて行く』。to は 到着点",
      core: "lead（導く）＋to（～へ・到着点）→ ～まで 連れて行く → ～につながる・～を引き起こす。",
      tip: "リーダー（leader）＝導く人。食べすぎが 病気へ 道案内してしまう。"
    },
    "look into ~": {
      hint: "into は『～の中へ』。中を のぞく",
      core: "look（目を向ける）＋into（～の中へ）→ 問題の 中まで のぞきこむ → ～を調べる。",
      tip: "箱の中を のぞきこむ動作。会社が 不具合の原因を のぞきこむ。"
    },
    "in response to ~": {
      hint: "respond は『反応する・返事をする』。to は 相手の方向",
      core: "in（～の形で）＋response（返事・反応）＋to（～に）→ ～への 返事として → ～に応えて。",
      tip: "『レスポンスが速い』＝返事が速い。客の声への返事として 朝7時に開店。"
    },
    "make sense": {
      hint: "sense は『感覚・筋道』。make は『生み出す』",
      core: "make（作り出す）＋sense（筋道・意味）→ 筋の通った 意味を 作り出している → 意味をなす・理にかなう。",
      tip: "That makes sense.（なるほどね）は 会話でよく使う。『センスがいい』とは別物。"
    },
    "apart from ~": {
      hint: "apart は『はなれて・別に』",
      core: "apart（はなれて）＋from（～から）→ ～を わきに置いて → ～を除いて／～は別として・～のほかに。",
      tip: "小さなミスを 横に置けば、作文は とてもよい。"
    },
    "as long as ~": {
      hint: "long は『長さ』。同じ長さだけ 続く 条件",
      core: "as long as（～と同じ長さだけ）→ ～が続く間だけ → ～する限り・～さえすれば。後ろには 文（S＋V）が来る。",
      tip: "6時までに 返してくれる間は 自転車を貸せる。『条件つきの OK』の形。"
    },
    "bring up ~": {
      hint: "bring は『持ってくる』。up は『上へ』",
      core: "bring（持ってくる）＋up（上へ）→ 子どもを 下から上へ 持ち上げていく → ～を育てる。話を 表に持ち上げる → 話題を持ち出す。",
      tip: "赤ちゃんを 抱き上げて 大きくしていく絵。grow up（育つ）とセットで。"
    },
    "put up with ~": {
      hint: "with は『いやなものと いっしょに いる』感じ",
      core: "put up（その場で 持ちこたえる）＋with（いやなものと いっしょに）→ いやなものと いっしょでも 耐えている → ～をがまんする。",
      tip: "工事の騒音と 同じ場所にいて ぐっとこらえる場面。stand・bear と同じ。"
    },
    "regardless of ~": {
      hint: "regard は『目を向ける』。-less は『～がない』",
      core: "regard（目を向ける・気にかける）＋-less（～なしの）＋of → ～に 目を向けずに → ～に関係なく。",
      tip: "年齢も経験も 気にしない クラブ。careless（不注意な）の -less と同じ。"
    },
    "result in ~": {
      hint: "result は『結果として出てくる』。in は 行き着く先",
      core: "result（結果として出てくる）＋in（～の中に）→ 最後に ～の中に 行き着く → ～という結果になる。",
      tip: "『原因 result in 結果』。result from は逆で『結果 result from 原因』。"
    },
    "carry on ~": {
      hint: "carry は『運ぶ』。on は『止まらず 先へ』",
      core: "carry（運ぶ）＋on（止まらず先へ）→ 止めずに 運び続ける → ～を続ける。carry on ～ing の形もある。",
      tip: "音楽が止まっても ダンスを運び続けた。Keep calm and carry on. は有名な言葉。"
    },
    "cut down on ~": {
      hint: "cut down は『切って 下げる』。on は『～について』",
      core: "cut（切る）＋down（下げて）＋on（～について）→ ～の量を 切りつめて下げる → ～の量を減らす。",
      tip: "医者に『塩をカットダウンして』と言われる場面。"
    },
    "stand for ~": {
      hint: "stand は『立つ』。for は『～の代わりに』",
      core: "stand（立つ）＋for（～の代わりに）→ ～の代わりに そこに立っている → ～を表す・～の略である。",
      tip: "UN の2文字は United Nations の代わりに 立っている。"
    },
    "do without ~": {
      hint: "without は『～がない状態』。do は『やっていく』",
      core: "do（やっていく）＋without（～がなくて）→ ～がなくても やっていく → ～なしで済ませる。cannot do without＝ないと やっていけない。",
      tip: "スマホがないと 1日も やっていけない若者。can't do without の形で よく出る。"
    },
    "keep track of ~": {
      hint: "track は『通ったあと・道すじ』",
      core: "keep（保ち続ける）＋track（通ったあと）＋of（～の）→ ～の足あとを 見失わずに 追い続ける → ～の記録をつける・把握する。",
      tip: "毎月の出費の足あとを 追いかけるアプリ。反対は lose track of（見失う）。"
    },
    "look over ~": {
      hint: "over は『上を こえて 全体に』",
      core: "look（見る）＋over（上をこえて 全体に）→ 上から さっと 全体を見わたす → ～にざっと目を通す。",
      tip: "上司に出す前に さっと見てもらう場面。look into（中まで調べる）との ちがいに注意。"
    },
    "pass away": {
      hint: "pass は『通りすぎる』。away は『遠くへ』",
      core: "pass（通りすぎる）＋away（遠くへ去って）→ この世を 通りすぎて 遠くへ行く → 亡くなる（die の やわらかい言い方）。",
      tip: "die と 直接言わない、ていねいな言い方。ニュースや 手紙で使う。"
    },
    "by no means": {
      hint: "means は『方法・手段』。no がつくと？",
      core: "by（～によって）＋no means（どんな手段でもない）→ どんな方法をとっても …ではない → 決して～ない（強い否定）。",
      tip: "by all means（ぜひどうぞ）と 反対の形で セットで覚える。"
    },
    "for the sake of ~": {
      hint: "sake は『利益・目的』。for は『～に向けて』",
      core: "for（～に向けて）＋the sake（利益・目的）＋of（～の）→ ～の利益に 向けて → ～のために。",
      tip: "子どもの健康を 一番に考えて 田舎へ引っこす父親の場面。"
    },
    "in contrast": {
      hint: "contrast は『並べて ちがいを はっきりさせる』",
      core: "in（～の形で）＋contrast（くらべて ちがいが目立つこと）→ くらべてみると 逆に → 対照的に。前の文と 反対の内容が来る合図。",
      tip: "コントラストが強い写真＝明暗の差がはっきり。北は寒い、南は暖かい。"
    },
    "be eager to ~": {
      hint: "eager は『気持ちが 前のめり』。to は 向かう先",
      core: "eager（前のめりに ほしがる）＋to（～へ向かって）→ ～することへ 気持ちが前のめり → しきりに～したがる。",
      tip: "新入生が 友だちづくりに わくわくして 身を乗り出す場面。"
    },
    "point out ~": {
      hint: "point は『指さす』。out は『外へ はっきり出す』",
      core: "point（指さす）＋out（外へはっきり出す）→ ～を指さして 見えるようにする → ～を指摘する。",
      tip: "先生が スピーチの文法ミスを 指でさして 示す絵。ポイント＝点・指すこと。"
    },
    "stand out": {
      hint: "stand は『立つ』。out は『外へ 飛び出す』",
      core: "stand（立つ）＋out（外へ飛び出して）→ まわりから 飛び出して 立っている → 目立つ。",
      tip: "人ごみで 赤いコートだけ 浮き出る場面。outstanding（ずばぬけた）も 同じ仲間。"
    },
    "break down": {
      hint: "break は『こわれる』。down は『下へ落ちて 止まる』",
      core: "break（こわれる）＋down（下へ落ちて止まる）→ こわれて 動きが止まる → 故障する。人なら『泣きくずれる』。",
      tip: "高速道路で 車が止まって 動かない場面。話し合いが 決裂するときにも使う。"
    },
    "take over ~": {
      hint: "take は『取る』。over は『向こうから こちらへ 移って』",
      core: "take（取る）＋over（向こうからこちらへ移って）→ 前の人のものを こちらへ取って移す → ～を引き継ぐ。",
      tip: "父が引退し、店が ケンの手に移る。会社を 乗っ取るときにも使う。"
    },
    "turn out to be ~": {
      hint: "turn は『くるっと 変わる』。out は『外に出てくる』",
      core: "turn（くるっと変わる）＋out（外に出てくる）→ ふたを開けたら 中身が 外に出てくる → 結局～だとわかる。",
      tip: "うわさは 結局うそだった、のように『最後に 正体が出る』場面。"
    },
    "apply for ~": {
      hint: "apply は『ぴったり くっつける』。for は『～を求めて』",
      core: "apply（くっつける・あてる）＋for（～を求めて）→ ～を求めて 自分を 差し出す → ～に応募する・申し込む。",
      tip: "application は『申し込み』。求人に 自分の書類を くっつけて 出す場面。"
    },
    "focus on ~": {
      hint: "focus は『ピント』。on は『一点に くっつく』",
      core: "focus（ピントを合わせる）＋on（～にくっついて）→ ～に ピントを ぴたりと合わせる → ～に集中する。",
      tip: "カメラのフォーカス。スマホを切って 宿題だけに ピントを合わせる。"
    },
    "prior to ~": {
      hint: "priority（優先）と同じ仲間。先に来るのは どっち？",
      core: "prior（先の）＋to（～に対して）→ ～に対して 先に → ～より前に（before の かたい言い方）。",
      tip: "priority（優先＝先にすること）と仲間。飛行機の 2時間前には 空港へ。"
    },
    "make use of ~": {
      hint: "use は 名詞で『使い道』",
      core: "make（作る）＋use（使い道）＋of（～の）→ ～の使い道を 作り出す → ～を利用する・活用する。",
      tip: "空いた校舎の 使い道を作り 集会所に。make good use of で『うまく活用する』。"
    },
    "keep in mind ~": {
      hint: "keep は『ずっと持っておく』。in mind は どこ？",
      core: "keep（持ち続ける）＋in mind（心の中に）→ ～を 心の中に 置いたままにする → ～を心に留めておく・覚えておく。",
      tip: "『美術館は第1月曜休み』と 頭の中に メモを貼っておく場面。"
    },
    "be short of ~": {
      hint: "short は『長さが 届かない』イメージ",
      core: "short（届かない・短い）＋of（～が）→ ～の量が 必要なところまで 届かない → ～が不足している。",
      tip: "看護師の数が 届かず 残業続きの病院。run short of（足りなくなる）も 仲間。"
    },
    "in case of ~": {
      hint: "case は『ケース＝起こること』。in は『その中で』",
      core: "in（～の中で）＋case（起こるケース）＋of（～という）→ ～というケースが 起きたときには → ～の場合には。",
      tip: "In case of fire（火事の際は）は 建物の注意書きで よく見る。"
    },
    "on the whole": {
      hint: "whole は『まるごと』。細かい点より 何を見る？",
      core: "on（～の上に立って）＋the whole（まるごと全部）→ 細かい所でなく 全部をながめると → 全体として・概して。",
      tip: "小さな問題はあったが、まるごと見れば 成功。as a whole とも言う。"
    }
  },

  clozeHelp: [
    { hint: "後半の『ファンが すでに わくわく』から、新しいスマホを どうする予定か考える",
      think: "ファンが楽しみにしているのは、新しいスマホが 世に出ること。release のコアは『はなして 外に出す』で、製品を 世の中に出す＝発売する。来春の予定に ぴったり。",
      opts: ["release：はなして外に出す→発売する", "refuse：はねつける・断る", "reduce：へらす", "remind：思い出させる"] },
    { hint: "前半の Because of the heavy snow が原因、for three hours が長さ",
      think: "大雪が原因で、3時間という時間がついている。delay のコアは『あとへ のばす』で、be delayed は『遅らされる→遅れる』。電車が3時間遅れた、で文が通る。",
      opts: ["defeated：負かされた", "delayed：遅らされた→遅れた", "deserved：（受けるに）値した", "decorated：かざられた"] },
    { hint: "空所のあとの of a new kind of insect と『驚かせた』に注目",
      think: "『新種の昆虫の ( )』が 世界を驚かせたので、新しいものを見つける話。discovery は dis-（取る）＋cover（おおい）→ おおいを取る＝発見。誰も知らなかった虫なので合う。",
      opts: ["complaint：不満・苦情", "permission：許可", "discovery：おおいを取る→発見", "emergency：緊急事態"] },
    { hint: "so 以下の『念のため かさを』が、前半の 結果になっている",
      think: "かさを持っていくのは、予報が はずれることがあるから。accurate のコアは『細かいところまで ぴったり合っている』＝正確な。not always と組んで『いつも正確とは限らない』。",
      opts: ["patient：がまん強い", "generous：気前がよい", "curious：好奇心が強い", "accurate：ぴったり合って正確な"] },
    { hint: "B の No のあとの『大阪で客をたずねる』が 断る理由",
      think: "B は別の用事があると答えているので、A は 会議に『行くか』を聞いている。attend のコアは『～に 体を向けて その場にいる』＝出席する。the meeting を 直接 目的語にとれる。",
      opts: ["attend：その場に出向いている→出席する", "admire：感心する・ほめる", "arrest：逮捕する", "adopt：取り入れる・養子にする"] },
    { hint: "空所のあとの from と knee operation に注目",
      think: "『手術から』元にもどるまでの 期間の話。recover のコアは『失ったものを 取りもどす』で、recover from ～ は『～から（健康を）取りもどす』＝回復する。",
      opts: ["refer：（～に）ふれる・参照する", "recover：取りもどす→回復する", "retire：引退する", "respect：尊敬する"] },
    { hint: "such as のあとの onions, carrots, salt が 具体例",
      think: "such as のあとは 空所の具体例。タマネギ・ニンジン・塩は スープの『中に入れるもの』。ingredient のコアは『中に入っているもの』＝料理の材料。",
      opts: ["instruments：道具・楽器", "incidents：できごと・事件", "ingredients：中に入るもの→材料", "institutions：機関・施設"] },
    { hint: "for the summer vacation と before returning to university が 期間を区切っている",
      think: "夏休みのあいだだけ、大学にもどる前までの仕事。temporary のコアは『ある時間（tempo）だけ』＝一時的な。期間限定の アルバイトに ぴったり。",
      opts: ["violent：乱暴な", "ancient：大昔の", "silent：静かな", "temporary：その時だけの→一時的な"] },
    { hint: "空所のあとの the spread of colds and flu（病気が広がること）",
      think: "手洗いは 病気が広がることに対して 何をするか。prevent のコアは『先回りして 立ちふさがる』＝防ぐ。広がる前に止めるので合う。",
      opts: ["prevent：先回りして止める→防ぐ", "pretend：ふりをする", "predict：予測する", "promote：前へ進める・宣伝する"] },
    { hint: "because 以下の prices と、前半の『学生に人気』のつながり",
      think: "学生に人気の理由は 値段。reasonable のコアは『reason（理屈）に合っている』で、値段なら『納得できる→手ごろな』。高すぎないので 学生が来る。",
      opts: ["anxious：心配な", "reasonable：理屈に合う→（値段が）手ごろな", "jealous：しっとした", "awful：ひどい"] },
    { hint: "2文目の They were not paid（お金をもらわなかった）",
      think: "2文目で『お金をもらっていない』と説明している。volunteer のコアは『自分から 進んでする人』。お金のためでなく 自分の意思で 浜辺をそうじした人たち。",
      opts: ["customers：（店の）客", "passengers：乗客", "volunteers：自分から進んで手伝う人", "opponents：対戦相手"] },
    { hint: "空所のあと that I read の read が 原形になっている点と、to improve my vocabulary",
      think: "that 節の動詞が reads ではなく 原形 read。これは『提案・要求』の動詞のあとの形。suggest のコアは『考えを そっと 差し出す』＝提案する。先生が 本を読むアイデアを 差し出した。",
      opts: ["denied：否定した", "refused：断った", "complained：不満を言った", "suggested：考えを差し出した→提案した"] },
    { hint: "to protect the ( ) と plastic waste のつながり",
      think: "プラスチックごみを減らして 守るもの。environment のコアは『まわりを ぐるりと 取り巻くもの』＝環境。ごみが 自然を傷つけるのを 防ぐ流れ。",
      opts: ["environment：まわりを取り巻くもの→環境", "equipment：設備・道具", "entrance：入り口", "experiment：実験"] },
    { hint: "空所のあとの to the customer for the long wait と『無料のコーヒー』",
      think: "『客に』『長く待たせたことで』の形と、おわびのコーヒー。apologize のコアは『自分の悪かった点を 認めて言う』＝あやまる。apologize to 人 for ～ の形に ぴったり。",
      opts: ["approved：認めた・賛成した", "apologized：あやまった", "applied：申し込んだ・当てはめた", "appealed：うったえた"] },
    { hint: "because 以下の『10分で 職場に着ける』",
      think: "10分で通勤できるのは よい点。convenient のコアは『自分の都合に ぴったり合う』＝便利な。駅の近くに住む 利点を表す。",
      opts: ["dangerous：危険な", "ordinary：ふつうの", "convenient：都合に合う→便利な", "modest：ひかえめな"] },
    { hint: "Have you seen ～? という形と、B の last week",
      think: "現在完了の疑問文で『ここしばらくの間に』を聞き、B は 先週と答えている。recently のコアは『今に近い 過去に』＝最近。",
      opts: ["finally：ついに", "exactly：正確に・ちょうど", "nearly：ほとんど", "recently：今に近い過去に→最近"] },
    { hint: "had a great ( ) on her decision の on に注目",
      think: "have a ( ) on ～ の形で、祖母が 進路の決定に どう関わったか。influence のコアは『中に 流れこむ』で、人の考えに 流れこむ＝影響。",
      opts: ["influence：中に流れこむ→影響", "instance：例", "insurance：保険", "incident：できごと・事件"] },
    { hint: "after I started ... every morning から、よくなり方の 様子を考える",
      think: "毎朝ストレッチを 続けた結果なので、急にではなく 少しずつ。gradually のコアは『段（grade）を 一段ずつ』＝だんだんと。",
      opts: ["rudely：失礼に", "gradually：一段ずつ→だんだんと", "loudly：大声で", "bravely：勇かんに"] },
    { hint: "主語の This factory と about 5,000 cars a month",
      think: "工場が 1か月に 5,000台の車を どうするか。produce のコアは『前へ 引き出す』＝生み出す・生産する。工場が 車を生み出す数の話。",
      opts: ["consume：使う・消費する", "pretend：ふりをする", "produce：前へ出す→生産する", "propose：提案する"] },
    { hint: "空所のあとの its business to Southeast Asia（新しい場所へ）",
      think: "事業を 新しい地域『へ』どうするか。expand のコアは『外へ 広げる』。expand A to B で『A を B まで広げる』。",
      opts: ["shrink：縮む・縮める", "bury：うめる", "borrow：借りる", "expand：外へ広げる→拡大する"] },
    { hint: "because of the typhoon が原因。コンサートは どうなった？",
      think: "台風が理由なので、コンサートは なくなった。call off のコアは『声をかけて（call）予定から 切りはなす（off）』＝中止する。ここは 受け身で『中止された』。",
      opts: ["called off：予定から切りはなされた→中止された", "given off：（におい・熱を）出された", "taken off：取り外された（take off は 脱ぐ・離陸する）", "shown off：見せびらかされた"] },
    { hint: "空所のあとの in a dictionary に注目",
      think: "辞書の中で 新しい単語を どうするか。look up は『目を向けて 探し出し、見えるところに 出す』イメージ。辞書や本で 調べるときの 決まった言い方。",
      opts: ["put up：上げる・泊める", "look up：（辞書などで）調べる", "give up：あきらめる・やめる", "bring up：育てる・話題を出す"] },
    { hint: "so 以下の『カフェに移った』が 結果になっている",
      think: "騒音のせいで 場所を変えたので、騒音に『たえられなかった』。put up with のコアは『いやなものと いっしょでも 持ちこたえる』＝がまんする。couldn't とつながって『がまんできなかった』。",
      opts: ["take after：（親）に似ている", "look after：世話をする", "put up with：がまんする", "catch up with：追いつく"] },
    { hint: "セミコロンのあとの curly hair and blue eyes",
      think: "後半で、母と同じ髪と目だと 説明している。take after は『あと（after）に続く者が 受けつぐ（take）』イメージで、（親など）に似ている。見た目の話なので合う。",
      opts: ["looks into：調べる", "runs into：偶然会う・ぶつかる", "gets over：乗りこえる・回復する", "takes after：（親）に似ている"] },
    { hint: "主語の The new rule と next month",
      think: "主語は『新しい規則』で、来月から 何が起こるか。take effect のコアは『効果（effect）を 持つ（take）』＝効力を生じる。規則が 来月から はたらき始める。",
      opts: ["take effect：効力を生じる", "make sense：意味が通る", "take place：（行事が）行われる", "make progress：進歩する"] },
    { hint: "空所のあとの of running the school festival と『忙しかった』",
      think: "文化祭の運営『の』何だったから 忙しいか。in charge of のコアは『責任（charge）の中にいる』＝担当している。担当者なら 忙しいのは当然。",
      opts: ["in danger：危険な状態で", "in charge：担当して", "out of order：故障して", "in front：前に"] },
    { hint: "at the supermarket と an old friend の 出会い方",
      think: "スーパーは 友人と会う約束の場所ではないので、思いがけない出会い。run into のコアは『走っていて 中へ（into）ぶつかる』＝偶然出会う。",
      opts: ["came up with：思いついた", "made up for：うめ合わせた・つぐなった", "ran into：ぶつかった→偶然会った", "got along with：仲よくやった"] },
    { hint: "so 以下の『帰りに 買ってきて』に注目",
      think: "買ってきてほしいのは、もう ないから。run out of のコアは『流れ出て（run out）からっぽ』＝使い切る・切らす。牛乳がなくなった状態に ぴったり。",
      opts: ["made use of：利用した", "kept up with：遅れずについていった", "taken care of：世話をした", "run out of：使い切った・切らした"] },
    { hint: "目的語の this form と、そのあと 受付に渡す流れ",
      think: "用紙に 何かしてから 渡す。fill out のコアは『空らんを うめて（fill）全部 しあげる（out）』＝記入する。",
      opts: ["fill out：（用紙に）記入する", "break out：（戦争・火事が）起こる", "work out：うまくいく・運動する・解く", "hand out：配る"] },
    { hint: "前半の the rain と、後半の『最後まで 続けられた』の関係",
      think: "雨なら 中止になりそうなのに、試合は続いた。予想と逆の結果。in spite of のコアは『～に さからってでも』＝～にもかかわらず。",
      opts: ["Because of：～のせいで（理由）", "In spite of：～にもかかわらず", "Instead of：～の代わりに", "In addition to：～に加えて"] },
    { hint: "目的語の a great idea に注目",
      think: "アイデアを どうしたか。come up with のコアは『頭の中から 上がってきて（come up）手にする（with）』＝思いつく。",
      opts: ["got rid of：取りのぞいた", "looked down on：見下した", "came up with：思いついた", "dropped out of：（学校などを）やめた"] },
    { hint: "B の Sure. と『忙しくない』が いつのことか",
      think: "手伝えるのは 今ひまだから。at the moment のコアは『その瞬間（moment）に』＝今のところ。現在形の I'm not busy と合う。",
      opts: ["by chance：偶然に", "at least：少なくとも", "in advance：前もって", "at the moment：今のところ"] },
    { hint: "空所のあとの smoking と、because 以下の『医者に言われた』",
      think: "医者に言われて たばこを どうしたか。give up のコアは『手から放して 差し出す』＝手放す・やめる。give up ～ing で『～するのをやめる』。",
      opts: ["gave up：手放した→やめた", "took up：（趣味などを）始めた", "picked up：拾い上げた", "set up：設立した"] },
    { hint: "主語の The success と how well 以下の関係",
      think: "成功は チームの協力の仕方で 決まる。depend on のコアは『～に ぶら下がる』で、結果が ～に ぶら下がっている＝～しだいである。",
      opts: ["belongs to：～に属する", "depends on：～しだいである", "consists of：～から成る", "insists on：～を言い張る"] },
    { hint: "空所のあとの too late と、遅刻した理由",
      think: "遅刻の原因は 夜おそくまで テレビを見たこと。stay up のコアは『起きた状態（up）のまま とどまる（stay）』＝寝ないで 起きている。",
      opts: ["showed up：現れた", "grew up：育った", "stayed up：起きていた", "turned up：現れた・（音量を）上げた"] },
    { hint: "後半の would have joined（過去の『～したのに』）",
      think: "would have＋過去分詞は『あのとき ～したのに』という 過去の事実と反対の想像。if のほうも 過去より 一歩前に下げて『had＋過去分詞』にする（仮定法過去完了）。",
      opts: ["know：現在形", "knew：過去形（仮定法なら 今の想像）", "have known：現在完了", "had known：過去完了（過去の事実と反対の if）"] },
    { hint: "空所のあとの in 1950 と、後ろの 本当の動詞 is",
      think: "文の動詞は is still used なので、空所は the bridge を説明する語。橋は『建てられる』側なので、受け身の意味の 過去分詞が 後ろから説明する。",
      opts: ["build：原形（建てる）", "built：過去分詞（建てられた）", "building：-ing形（建てている）", "to build：不定詞（建てるための）"] },
    { hint: "looking forward to の to が 何の to か考える",
      think: "look forward to の to は『～の方へ』を表す 前置詞。前置詞のあとには 名詞のなかま（動名詞）が来るので、-ing 形にする。",
      opts: ["seeing：動名詞（会うこと）", "see：原形", "saw：過去形", "be seen：受け身の原形（会われる）"] },
    { hint: "空所のあとの my grandfather was born に 欠けている語が あるか",
      think: "my grandfather was born は 主語も動詞もそろい、欠けた名詞がない 完全な文。こういうときは 関係代名詞ではなく、場所を表す 関係副詞（＝in which）を使う。the town は 場所なので合う。",
      opts: ["which：関係代名詞（後ろに 欠けた名詞が必要）", "what：『～するもの』（先行詞をふくむ）", "where：場所を表す関係副詞", "who：人を表す関係代名詞"] },
    { hint: "空所の前の I wish に注目",
      think: "I wish のあとは『実際には そうでない』願い。今のことでも、現実から 一歩はなすために 過去形を使う（仮定法過去）。今は時間がないので『あればいいのに』となる。",
      opts: ["have：現在形（事実）", "will have：未来", "having：-ing形", "had：過去形（今の事実と反対の願い）"] },
    { hint: "前半の By the time we arrived（過去の時点）と already",
      think: "『着いたとき』という 過去の点より前に、映画は もう始まっていた。過去のある点までに 完了したことは、さらに一歩前の過去＝過去完了（had＋過去分詞）で表す。",
      opts: ["has：現在完了（今までに）", "had：過去完了（過去の時点までに）", "have：現在完了（主語が複数のとき）", "having：-ing形"] },
    { hint: "空所の前の made me の形に注目",
      think: "make は『人に（むりに）させる』使役動詞。make＋人＋動詞の原形 の形で、to はつけない。母が 私に 部屋のそうじを させた。",
      opts: ["clean：原形", "to clean：to不定詞", "cleaning：-ing形", "cleaned：過去形・過去分詞"] },
    { hint: "カンマのあとの主語 the city が『見る』側か『見られる』側か",
      think: "分詞構文の 意味上の主語は 文の主語 the city。町は 人に『見られる』側なので、受け身の意味の 過去分詞を使う。",
      opts: ["See：原形（命令文の形）", "Seeing：現在分詞（～が見る）", "Seen：過去分詞（見られる）", "To see：不定詞（見るために）"] },
    { hint: "空所のあとの a beautiful day の語順と、後ろの that",
      think: "あとに『a＋形容詞＋名詞』と that が続いている。この語順で『とても…なので～』を表すのは such a … that。so なら so beautiful a day の語順になる。",
      opts: ["very：とても（that と組まない）", "too：～すぎる（too … to の形）", "so：so＋形容詞＋that（名詞は so beautiful a day の語順）", "such：such＋a＋形容詞＋名詞＋that"] },
    { hint: "空所のあとの than に注目",
      think: "than があるので 比較の形が必要。No other ～ 比較級 than A で『A より…な人は ほかにいない』＝A がいちばん…という 最上級の意味になる。",
      opts: ["fast：原級", "faster：比較級（than と組む）", "fastest：最上級", "the fastest：最上級（the つき）"] }
  ],

  readHint: [
    ["第2段落の後半、Most of the vegetables we grow のあたり",
     "第3段落の You told me that のあたり",
     "第4段落の If you are interested, please let me know のあたり"],
    ["第1段落の For a long time, scientists believed のあたり",
     "第2段落の後半 In one experiment 以下と The next day の文",
     "第3段落の In 2013, researchers studying mice のあたり",
     "第4段落の Experts recommend / They also advise のあたり"],
    ["第2段落の chemicals ということばと、その前の since の部分",
     "第3段落の pollution ということばと、その前の文",
     "第4段落の For this reason と、その前の文とのつながり"],
    ["第1段落の It had two wheels のあたり",
     "第2段落の large front wheel の説明の but 以下",
     "第3段落の women が出てくるあたり",
     "第4段落の Many cities around the world のあたり"]
  ]
});
