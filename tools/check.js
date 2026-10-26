// データのまちがいを調べる： node tools/check.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.join(__dirname, '..', 'js', 'data');
const ctx = { window: {} }; ctx.EK = undefined; vm.createContext(ctx);
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
  try { vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^window\.EK = window\.EK \|\| \{\};/m, 'window.EK = window.EK || {}; EK = window.EK;'), ctx, { filename: f }); }
  catch (e) { console.log('✕ ' + f + ': ' + e.message); process.exitCode = 1; }
}
const EK = ctx.window.EK || ctx.EK || {};
const data = EK.data || {};
let bad = 0; const err = (g, m) => { bad++; console.log('✕ [' + g + '] ' + m); };
const isStr = s => typeof s === 'string' && s.trim().length > 0;
function checkMC(g, where, o, ja) {
  if (!Array.isArray(o.c) || o.c.length !== 4) return err(g, where + ': c は 4 つ');
  if (o.c.some(x => !isStr(x))) err(g, where + ': 空の選択肢');
  if (new Set(o.c.map(x => x.trim().toLowerCase())).size !== 4) err(g, where + ': 同じ選択肢がある');
  if (!(o.a >= 0 && o.a <= 3 && Number.isInteger(o.a))) err(g, where + ': a は 0〜3');
  if (!isStr(o.q)) err(g, where + ': q がない');
  if (!isStr(o.why)) err(g, where + ': why がない');
}
for (const g of Object.keys(data)) {
  const d = data[g], seen = new Set();
  (d.words || []).forEach((w, i) => {
    const k = 'words[' + i + '] ' + w.en;
    if (!isStr(w.en) || !isStr(w.ja) || !isStr(w.ex) || !isStr(w.exja)) err(g, k + ': 欠けている項目');
    if (!['名', '動', '形', '副'].includes(w.pos)) err(g, k + ': pos');
    if (w.ja && w.ja.length > 12) err(g, k + ': ja が長い（' + w.ja.length + '字）');
    const key = (w.en || '').toLowerCase(); if (seen.has(key)) err(g, k + ': 重複'); seen.add(key);
  });
  (d.idioms || []).forEach((w, i) => {
    const k = 'idioms[' + i + '] ' + w.en;
    if (!isStr(w.en) || !isStr(w.ja) || !isStr(w.ex) || !isStr(w.exja)) err(g, k + ': 欠けている項目');
    if (!/\[[^\]]+\]/.test(w.ex || '')) err(g, k + ': ex に [ ] がない');
    const key = (w.en || '').toLowerCase(); if (seen.has(key)) err(g, k + ': 重複'); seen.add(key);
  });
  (d.cloze || []).forEach((o, i) => {
    const k = 'cloze[' + i + ']';
    checkMC(g, k, o);
    if (!/\(\s*\)/.test(o.q || '')) err(g, k + ': q に ( ) がない');
    if (!['単語', '熟語', '文法'].includes(o.kind)) err(g, k + ': kind');
    if (!isStr(o.ja)) err(g, k + ': ja がない');
  });
  (d.reading || []).forEach((r, i) => {
    const k = 'reading[' + i + '] ' + r.title;
    if (!['email', 'article'].includes(r.type)) err(g, k + ': type');
    if (!Array.isArray(r.text) || !r.text.length) err(g, k + ': text');
    (r.qs || []).forEach((o, j) => checkMC(g, k + ' qs[' + j + ']', o));
    if (!(r.qs || []).length) err(g, k + ': qs がない');
  });
  (d.writing || []).forEach((w, i) => {
    const k = 'writing[' + i + ']';
    if (!['opinion', 'email', 'summary'].includes(w.type)) err(g, k + ': type');
    if (!isStr(w.topic) || !isStr(w.topicja)) err(g, k + ': topic');
    if (!Array.isArray(w.model) || !Array.isArray(w.modelja) || w.model.length !== w.modelja.length) err(g, k + ': model と modelja の数');
    if (w.type !== 'opinion' && !(w.passage || []).length) err(g, k + ': passage がない');
    if (w.type === 'email' && !/\[[^\]]+\]/.test((w.passage || []).join(' '))) err(g, k + ': 下線部 [ ] がない');
  });
  const ans = (d.cloze || []).map(o => o.a); const dist = [0, 1, 2, 3].map(n => ans.filter(a => a === n).length);
  console.log('○ [' + g + '] 単語 ' + (d.words || []).length + '・熟語 ' + (d.idioms || []).length + '・穴うめ ' + (d.cloze || []).length +
    '（正解の位置 ' + dist.join('/') + '）・長文 ' + (d.reading || []).length + '・英作文 ' + (d.writing || []).length);
}
if (bad) { console.log('まちがい ' + bad + ' 件'); process.exitCode = 1; } else console.log('まちがいなし');
