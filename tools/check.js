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

  // core.js
  const core = Object.assign({}, d.core, d.icore); const has = Object.keys(core).length;
  if (has) {
    (d.words || []).concat(d.idioms || []).forEach(w => {
      const c = core[w.en]; if (!c) return err(g, 'core: ' + w.en + ' がない');
      if (!isStr(c.hint) || !isStr(c.core) || !isStr(c.tip)) err(g, 'core: ' + w.en + ' の hint/core/tip');
      if (c.hint && c.hint.length > 40) err(g, 'core: ' + w.en + ' の hint が長い（' + c.hint.length + '字）');
      if (c.tip && c.tip.length > 60) err(g, 'core: ' + w.en + ' の tip が長い（' + c.tip.length + '字）');
      (w.ja || '').split(/[・、（）()～~]/).filter(t => t.length >= 2).forEach(t => { if ((c.hint || '').includes(t)) err(g, 'core: ' + w.en + ' の hint に答え「' + t + '」'); });
    });
    const keys = new Set((d.words || []).concat(d.idioms || []).map(w => w.en));
    Object.keys(core).forEach(k => { if (!keys.has(k)) err(g, 'core: ' + k + ' は words/idioms にない'); });
  }
  if (d.clozeHelp) {
    if (d.clozeHelp.length !== (d.cloze || []).length) err(g, 'clozeHelp の数が cloze とちがう');
    d.clozeHelp.forEach((h, i) => {
      if (!isStr(h.hint) || !isStr(h.think) || !Array.isArray(h.opts) || h.opts.length !== 4) err(g, 'clozeHelp[' + i + ']');
      const o = (d.cloze || [])[i]; if (o && h.hint && new RegExp('\\b' + o.c[o.a].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(h.hint)) err(g, 'clozeHelp[' + i + '] hint に答え');
    });
  }
  if (d.readHint) {
    if (d.readHint.length !== (d.reading || []).length) err(g, 'readHint の数が reading とちがう');
    d.readHint.forEach((a, i) => { if (!Array.isArray(a) || a.length !== ((d.reading[i] || {}).qs || []).length) err(g, 'readHint[' + i + '] の数'); });
  }
  const ans = (d.cloze || []).map(o => o.a); const dist = [0, 1, 2, 3].map(n => ans.filter(a => a === n).length);
  console.log('○ [' + g + '] 単語 ' + (d.words || []).length + '・熟語 ' + (d.idioms || []).length + '・穴うめ ' + (d.cloze || []).length +
    '（正解の位置 ' + dist.join('/') + '）・長文 ' + (d.reading || []).length + '・英作文 ' + (d.writing || []).length + '・コア ' + Object.keys(Object.assign({}, d.core, d.icore)).length + '・穴うめ解説 ' + (d.clozeHelp || []).length);
}
if (bad) { console.log('まちがい ' + bad + ' 件'); process.exitCode = 1; } else console.log('まちがいなし');
