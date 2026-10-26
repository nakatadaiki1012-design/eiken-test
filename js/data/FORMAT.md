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
