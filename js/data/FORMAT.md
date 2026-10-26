# データの形（英検ラボ）

級ごとに 2 つのファイルがあります。

- `js/data/<級>-words.js` … 単語・熟語
- `js/data/<級>-test.js`  … 文法・語彙の穴うめ・長文・英作文

級の id: `p2`（準2級）, `g2`（2級）, `p1`（準1級）

どのファイルも、はじめに次の 1 行を書き、そのあと `EK.put("<級>", { ... })` で中身を足します。

```js
window.EK = window.EK || {}; EK.put = EK.put || function (id, o) { EK.data = EK.data || {}; EK.data[id] = Object.assign(EK.data[id] || {}, o); };
```

## words.js

```js
EK.put("g2", {
  words: [
    // pos は 名・動・形・副 のどれか。ja は 4択で使うので短く（12字まで）。
    { en: "achieve", pos: "動", ja: "達成する", ex: "She finally achieved her goal.", exja: "彼女はついに目標を達成した。" },
  ],
  idioms: [
    // en は熟語そのもの（〜 は「～」でなく「~」）。ex の中で熟語の部分を [ ] でかこむ。
    { en: "look forward to ~ing", ja: "～するのを楽しみに待つ", ex: "I'm [looking forward to] seeing you.", exja: "あなたに会えるのを楽しみにしています。" },
  ]
});
```

## test.js

```js
EK.put("g2", {
  // 大問1と同じ形の 4 択。kind は 単語・熟語・文法 のどれか。空所は ( ) と書く。
  cloze: [
    { kind: "文法", q: "If I ( ) more time, I would travel abroad.", ja: "もっと時間があれば、海外を旅行するのに。",
      c: ["have", "had", "will have", "having"], a: 1,
      why: "「今～ならいいのに」は仮定法過去。if のあとは過去形 had。" },
  ],
  // 長文。type は email（Eメール）か article（説明文）。text は段落ごとに配列。
  reading: [
    { title: "The History of Chocolate", type: "article",
      text: ["段落1", "段落2", "段落3"],
      qs: [ { q: "Why did ...?", c: ["...", "...", "...", "..."], a: 2, why: "第2段落に ... とある。" } ] },
  ],
  // 英作文。type は opinion（意見）・email（Eメール）・summary（要約）。
  writing: [
    { type: "opinion", topic: "Some people say that ... Do you agree with this opinion?",
      topicja: "（問題文の日本語訳）",
      points: ["Cost", "Health", "Convenience"],     // 2級・準1級の POINTS。なければ []
      passage: [],                                   // summary：要約する英文（段落の配列）。email：届いたEメール（段落の配列。下線部を [ ] でかこむ）
      model: ["I agree with this opinion.", "First, ...", "..."],   // 模範解答（1文ずつ）
      modelja: ["私はこの意見に賛成です。", "まず、...", "..."],     // model と同じ数
      words: 85 }                                    // 模範解答の語数（だいたい）
  ]
});
```

## きまり

- 問題はすべて自作（過去問・市販の問題集を写さない）。
- 4 択は答えが 1 つだけ。ほかの 3 つは、同じ品詞・同じ形で「まちがいだとはっきり言える」もの。
- `a` は 0〜3（正解の位置）。正解の位置はばらばらに。
- 解説（why）はやさしい日本語で 1〜2 文。
- `node tools/check.js` でまちがいがないか調べられます。

## core.js（ヒント・コアの意味・覚え方）

2 つのファイルに分けます（`EK.put` は 同じ名前の項目を 上書きするので、キーを 分けています）。

- `js/data/<級>-core-w.js` … 単語のコア：`EK.put("g2", { core: { ... } })`
- `js/data/<級>-core-t.js` … 熟語のコア・穴うめ・長文：`EK.put("g2", { icore: { ... }, clozeHelp: [...], readHint: [...] })`（icore の中身は core と 同じ形）

words.js・test.js の問題に「ヒント」と「まちがえたあとの解説」を足します。

```js
EK.put("g2", {
  // 単語・熟語：キーは words / idioms の en と まったく同じ文字
  core: {
    "issue": {
      hint: "中から 外へ「出てくる」イメージ",                   // 💡 答える前のヒント。答えの日本語（ja）を書かない。40字まで
      core: "中から『外へ出てくる』もの。雑誌が世に出る→発行する、話し合いに出てきた→問題。", // 🧠 コアの意味。いくつかの意味が 1 つのイメージでつながるように
      tip: "ex-（外へ）と同じ仲間の語源。exit（出口）と 同じ「外へ」。"  // 🔑 覚え方。本当の語源・カタカナ語・知っている語とのつながり。60字まで
    },
    "run out of ~": {
      hint: "out は「出きって なくなる」",
      core: "run（流れる）＋out（外へ出きって からっぽ）＋of（～が）→ ～が流れ出て なくなる → 使い切る。",
      tip: "ガソリンが タンクから 流れ出て 空になる 場面で 覚える。"
    }
  },
  // 穴うめ：cloze と 同じ数・同じ順番
  clozeHelp: [
    { hint: "空所のあとの to に注目",                                // 答えを書かない
      think: "後ろに to＋動詞 があるので…。コアは『～』なので、この文では…。", // 考え方（2〜3 文）
      opts: ["have：持っている（今のこと）", "had：仮定法の過去形", "will have：未来", "having：-ing形"] } // c と 同じ順番で、それぞれの意味・はたらき
  ],
  // 長文：reading と 同じ数。中は qs と 同じ数
  readHint: [ ["第2段落の the first machine のあたり", "…"] ]
});
```

- 語源は 本当のものだけ。あやしいときは 語源を書かず、イメージや 知っている語で。
- やさしい日本語で。辞書の 意味を ならべるのではなく「なぜ その意味になるのか」がわかるように。

## 単語・熟語を 足すとき（more ファイル）

`js/data/<級>-more-<番号>.js`。`_init.js` の `EK.put` は 配列を つなげ、オブジェクトを まぜるので、
同じ級に 何ファイル 足しても 上書きされません。1 ファイルに 単語（または熟語）と、そのコアを まとめて書きます。

```js
EK.put("g2", {
  words: [ { en: "...", pos: "動", ja: "...", ex: "...", exja: "..." } ],
  idioms: [ { en: "...", ja: "...", ex: "... [ ] ...", exja: "..." } ],
  core: { "...": { hint: "...", core: "...", tip: "...", pic: "🏔️" } }   // 単語も熟語も core に入れてよい
});
```

- `pic`（なくてもよい）：コアのイメージを あらわす 絵文字 1〜3 個。ぴったりの絵が あるときだけ。
- `ja` は 同じ級の ほかの単語と 同じ文字に しない（4 択で 同じ意味が 2 つ 並ぶため）。

## イメージ解説（core に 足す 項目）

単語・熟語の core エントリーに、次の項目を 足します（どれも なくてもよいが、scene と flow は できるだけ）。

```js
"accumulate": {
  hint: "...", core: "...", tip: "...", pic: "🏔️",
  scene: "使っていない部屋に、ほこりが毎日うっすら重なり、いつのまにか白い層になる。", // 🎬 頭に絵を描く場面（70字まで）
  flow: ["少しずつ重なる", "お金・知識がたまる", "疲れ・ストレスがたまる"],          // ➡️ コアから 意味が広がる順（2〜4 個、各 20字まで）
  parts: [["ac", "～へ（ad）"], ["cumul", "積み重ね"], ["ate", "～する"]],        // 🧩 本当の部品だけ。単語は 部品の文字が 単語の中に そのまま ある形で
  fam: ["cumulative（累積の）", "cumulus（積雲）"],                              // 👪 同じ部品・同じコアの 仲間（本当のものだけ、4 個まで）
  pair: "collect は「わざと集める」、accumulate は「自然にたまっていく」。"         // ⚖️ まぎらわしい語との ちがい（60字まで）
}
```

- 熟語の parts は 語ごと：`[["run", "流れる・走る"], ["out", "外へ出きって なくなる"], ["of", "～の"]]`
- parts の 意味は 12 字まで。語源が あやしいときは parts を 書かない。
