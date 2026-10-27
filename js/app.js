// 英検ラボ：画面の切りかえ・問題・記録
(function () {
  'use strict';
  var EK = window.EK, DATA = EK.data || {}, GR = {};
  EK.grades.forEach(function (g) { GR[g.id] = g; g.d = DATA[g.id] || {}; ['words', 'idioms', 'cloze', 'reading', 'writing', 'clozeHelp', 'readHint'].forEach(function (k) { g.d[k] = g.d[k] || []; });
    g.core = Object.assign({}, g.d.core, g.d.icore); // 単語・熟語の ヒント・コアの意味・覚え方
  });

  // ---------- 記録（このブラウザの中だけ） ----------
  var KEY = 'eikenlab-v1';
  function blank() { return { srs: {}, read: {}, write: {}, drafts: {}, theme: '', best: {}, sfx: true }; }
  var S = (function () {
    try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && typeof v === 'object') return Object.assign(blank(), v); } catch (e) { }
    return blank();
  })();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

  // 間をあけてくり返す：○が続くと 1→2→4→7→15→30 日後。✕ はその日のうちにもう一度
  var GAP = [1, 2, 4, 7, 15, 30];
  function today() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function mark(id, ok, soft) { // soft：ヒントを見て 正解した → 次の日に もう一度（段は 上げない）
    var r = S.srs[id], t = today();
    if (!r) r = S.srs[id] = { b: 0, d: t };
    if (ok && soft) { r.d = Math.max(r.d, t + 1); }
    else if (ok) { if (r.d <= t) { r.b = Math.min(r.b + 1, GAP.length); r.d = t + GAP[r.b - 1]; } }
    else { r.b = 0; r.d = t; r.ng = (r.ng || 0) + 1; }
    save(); updateDue();
  }
  function isDue(id) { var r = S.srs[id]; return !!r && r.d <= today(); }
  function fixed(id) { var r = S.srs[id]; return !!r && r.b >= 3; }
  function seen(id) { return !!S.srs[id]; }

  var wid = function (g, w) { return g + ':w:' + w.en; };
  var iid = function (g, w) { return g + ':i:' + w.en; };
  var cid = function (g, i) { return g + ':c:' + i; };
  function dueIds(g) {
    return Object.keys(S.srs).filter(function (id) { return (!g || id.indexOf(g + ':') === 0) && isDue(id) && lookup(id); });
  }
  function lookup(id) {
    var p = id.split(':'), g = GR[p[0]]; if (!g) return null;
    var key = p.slice(2).join(':');
    if (p[1] === 'w') return find(g.d.words, key) && { g: g, t: 'w', o: find(g.d.words, key) };
    if (p[1] === 'i') return find(g.d.idioms, key) && { g: g, t: 'i', o: find(g.d.idioms, key) };
    if (p[1] === 'c') return g.d.cloze[+key] && { g: g, t: 'c', o: g.d.cloze[+key], i: +key };
    return null;
  }
  function find(arr, en) { for (var i = 0; i < arr.length; i++) if (arr[i].en === en) return arr[i]; return null; }
  function updateDue() { $('#dueN').textContent = dueIds().length; }

  // ---------- 小さな道具 ----------
  function $(s) { return document.querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a, n) { return shuffle(a).slice(0, n); }
  function words(s) { return (String(s).match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g) || []).length; }
  function blankify(q, fill) { return esc(q).replace(/\(\s*\)/, '<span class="blank">' + (fill ? esc(fill) : '&nbsp;') + '</span>'); }
  function bracket(ex, mode) { // [ ] の部分を、空所・下線・ふつう にする
    return esc(ex).replace(/\[([^\]]+)\]/g, function (m, x) { return mode === 'blank' ? '<span class="blank">&nbsp;</span>' : mode === 'u' ? '<span class="u">' + x + '</span>' : '<b>' + x + '</b>'; });
  }
  var toastT;
  function toast(m) { var t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2200); }

  // 読み上げ（ブラウザの音声）
  var voice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices().filter(function (v) { return /^en[-_]/i.test(v.lang); });
    voice = vs.filter(function (v) { return /en[-_]US/i.test(v.lang) && /Google|Samantha|Natural|Aria|Jenny/i.test(v.name); })[0] ||
      vs.filter(function (v) { return /en[-_]US/i.test(v.lang); })[0] || vs[0] || null;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text) {
    if (!window.speechSynthesis) { toast('このブラウザは読み上げに対応していません'); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text).replace(/[\[\]]/g, '').replace(/~/g, 'something'));
    u.lang = 'en-US'; u.rate = 0.9; if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }
  function sayBtn(text, big) { return '<button class="say' + (big ? ' big' : '') + '" type="button" data-say="' + esc(text) + '" aria-label="読み上げ">🔊</button>'; }

  // ---------- 画面の切りかえ（#/g2/word のような住所） ----------
  var main = $('#main'), cur = { parts: [] };
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  function view(title, html, color, parent) {
    $('#title').textContent = title;
    main.className = color ? 'c-' + color : '';
    main.innerHTML = html;
    $('#back').hidden = parent == null; $('#back').dataset.to = parent || '';
    window.scrollTo(0, 0);
  }
  function route() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (window.EKGAME) EKGAME.quit();
    quiz = null;
    var p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    cur.parts = p;
    if (p[0] === 'review') return reviewStart();
    var g = GR[p[0]];
    if (!g) return home();
    var sec = p[1];
    if (!sec) return gradeHome(g);
    if (sec === 'word') return wordMenu(g);
    if (sec === 'idiom') return idiomMenu(g);
    if (sec === 'cloze') return clozeMenu(g);
    if (sec === 'read') return p[2] != null ? readOne(g, +p[2]) : readList(g);
    if (sec === 'write') return p[2] != null ? writeOne(g, +p[2]) : writeList(g);
    if (sec === 'mock') return mockStart(g);
    if (sec === 'rocket' && window.EKGAME) return EKGAME.menu(g);
    if (sec === 'list') return wordList(g, p[2] || 'w');
    if (sec === 'parts') return partsPage(g);
    gradeHome(g);
  }

  // ---------- ホーム ----------
  function counts(g) {
    var w = g.d.words, i = g.d.idioms;
    return {
      wFix: w.filter(function (x) { return fixed(wid(g.id, x)); }).length,
      wSeen: w.filter(function (x) { return seen(wid(g.id, x)); }).length,
      iFix: i.filter(function (x) { return fixed(iid(g.id, x)); }).length,
      iSeen: i.filter(function (x) { return seen(iid(g.id, x)); }).length,
      cOk: g.d.cloze.filter(function (x, k) { var r = S.srs[cid(g.id, k)]; return r && r.b > 0; }).length,
      rDone: g.d.reading.filter(function (x, k) { return S.read[g.id + ':' + k] != null; }).length,
      wrDone: g.d.writing.filter(function (x, k) { return S.write[g.id + ':' + k]; }).length
    };
  }
  function meter(n, all, label) {
    var p = all ? Math.round(n / all * 100) : 0;
    return '<div class="meter"><i style="width:' + p + '%"></i></div><div class="meter-l"><span>' + label + '</span><span>' + n + ' / ' + all + '</span></div>';
  }
  function home() {
    var html = '<h2>どの級を 受けますか？</h2><p class="sub">単語・熟語 → 穴うめ → 長文 → 英作文 の順に 進めると、本番の 形に 慣れていきます。</p><div class="grades">';
    EK.grades.forEach(function (g) {
      var c = counts(g), all = g.d.words.length + g.d.idioms.length;
      html += '<button class="grade c-' + g.color + '" data-go="#/' + g.id + '"><div class="nm">' + g.name + '</div>' +
        '<div><div class="lv">' + g.level + '</div><div>単語 ' + g.d.words.length + '・熟語 ' + g.d.idioms.length + '・穴うめ ' + g.d.cloze.length +
        '・長文 ' + g.d.reading.length + (g.d.writing.length ? '・英作文 ' + g.d.writing.length : '') + '</div></div><div aria-hidden="true">›</div>' +
        '<div class="bar">' + meter(c.wFix + c.iFix, all, '定着した 単語・熟語') + '</div></button>';
    });
    html += '</div><p class="note">記録は このブラウザの中だけに 残ります。英検の 問題の形・時間は 変わることがあるので、受ける前に 英検の 公式サイトで 確かめてください。</p>';
    view('英検ラボ', html, null, null);
  }

  function gradeHome(g) {
    var c = counts(g), due = dueIds(g.id).length;
    var html = '<h2>' + g.name + '</h2><p class="sub">' + g.level + '・' + g.time + '</p>' +
      (due ? '<button class="tile wide" data-go="#/review"><span class="ic">🔁</span><b>今日の復習 ' + due + ' 問</b><span>忘れかけたころに もう一度</span></button><div style="height:10px"></div>' : '') +
      '<div class="menu">' +
      tile('#/' + g.id + '/word', '📘', '単語', '学習 ' + c.wSeen + '・定着 ' + c.wFix + ' / ' + g.d.words.length) +
      tile('#/' + g.id + '/idiom', '📗', '熟語', '学習 ' + c.iSeen + '・定着 ' + c.iFix + ' / ' + g.d.idioms.length) +
      tile('#/' + g.id + '/cloze', '✏️', '大問1 穴うめ', '正解 ' + c.cOk + ' / ' + g.d.cloze.length) +
      tile('#/' + g.id + '/read', '📖', '長文', '解いた ' + c.rDone + ' / ' + g.d.reading.length) +
      (Object.keys(g.write).length ? tile('#/' + g.id + '/write', '✍️', '英作文', '書いた ' + c.wrDone + ' / ' + g.d.writing.length) : '') +
      tile('#/' + g.id + '/mock', '🏁', 'ミニ模試', '穴うめ 10 ＋ 長文 1') +
      tile('#/' + g.id + '/parts', '🧩', '部品で覚える', '同じ部品の 単語を まとめて') +
      '<button class="tile wide rocket" data-go="#/' + g.id + '/rocket"><span class="ic">🚀</span><b>英単語ロケット</b><span>単語・熟語・穴うめを どんどん 正解して 宇宙へ</span></button>' +
      '</div><h3>' + g.name + ' の 筆記試験</h3><div class="card"><ul class="parts">' +
      g.parts.map(function (p) { return '<li><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></li>'; }).join('') +
      '</ul><p class="note">リスニング・二次試験（面接）も あります。くわしくは 英検の 公式サイトで。</p></div>';
    view('英検ラボ ' + g.name, html, g.color, '#/');
  }
  function tile(h, ic, b, s) { return '<button class="tile" data-go="' + h + '"><span class="ic">' + ic + '</span><b>' + b + '</b><span>' + s + '</span></button>'; }

  // ---------- 問題を出す しくみ（4択） ----------
  // q = { id, label, prompt(html), opts:[文字], a, en(選択肢が英語か), say, after(html), weak }
  var quiz = null;
  function startQuiz(title, qs, color, parent, onEnd) {
    if (!qs.length) { toast('出せる問題がありません'); return; }
    quiz = { title: title, qs: qs, i: 0, ok: 0, miss: [], color: color, parent: parent, onEnd: onEnd, answered: false };
    showQ();
  }
  function showQ() {
    var z = quiz, q = z.qs[z.i];
    z.answered = false; z.hints = 0;
    var html = '<div class="prog"><span>' + (z.i + 1) + ' / ' + z.qs.length + '</span>' +
      '<div class="meter"><i style="width:' + Math.round(z.i / z.qs.length * 100) + '%"></i></div><span>○ ' + z.ok + '</span></div>' +
      (q.before || '') +
      '<div class="qbox"><div class="qkind">' + esc(q.label) + (q.say ? ' ' + sayBtn(q.say) : '') + (q.hint ? '<button class="hintb" type="button" data-hint>💡 ヒント</button>' : '') + '</div>' + q.prompt +
      '<div class="hintx" id="hintx" hidden></div></div>' +
      '<div class="opts">' + q.opts.map(function (o, k) {
        return '<button class="opt' + (q.en ? ' en-opt' : '') + '" data-opt="' + k + '"><span class="n">' + (k + 1) + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div><div id="fb"></div>';
    view(z.title, html, z.color, z.parent);
  }
  function answer(k) {
    var z = quiz; if (!z || z.answered) return;
    var ob = document.querySelectorAll('.opt')[k]; if (!ob || ob.disabled) return; // ヒントで 消した選択肢は えらべない
    var q = z.qs[z.i], ok = k === q.a;
    z.answered = true;
    if (ok) z.ok++; else z.miss.push(q);
    if (q.id) mark(q.id, ok, ok && z.hints > 0);
    if (q.onAnswer) q.onAnswer(ok);
    var hb = document.querySelector('[data-hint]'); if (hb) hb.hidden = true;
    document.querySelectorAll('.opt').forEach(function (b, n) {
      b.disabled = true;
      if (n === q.a) b.classList.add('ok'); else if (n === k) b.classList.add('ng');
    });
    var last = z.i === z.qs.length - 1;
    var body = q.explain ? q.explain(ok) : (q.after || '');
    if (!ok && q.picked) body = pickedBox(q.picked(k)) + body;
    $('#fb').innerHTML = '<div class="fb' + (ok ? '' : ' ng') + '"><div class="res ' + (ok ? 'ok">○ 正解' + (z.hints ? '（ヒントあり → 明日 もう一度）' : '') : 'ng">✕ 正解は ' + (q.a + 1) + '. ' + esc(q.opts[q.a])) + '</div>' + body + '</div>' +
      '<div class="btns"><button class="btn main grow" data-next>' + (last ? '結果を見る' : '次へ') + '</button></div>';
    if (q.sayAfter && !ok) speak(q.sayAfter);
    var nb = document.querySelector('[data-next]'); if (nb) nb.focus({ preventScroll: true });
    $('#fb').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  // 💡 ヒント：1 回目は 考え方の ヒント、2 回目は 選択肢を 2 つに しぼる
  function showHint() {
    var z = quiz; if (!z || z.answered) return;
    var q = z.qs[z.i], box = $('#hintx'), hb = document.querySelector('[data-hint]');
    z.hints++;
    if (z.hints === 1) { box.hidden = false; box.innerHTML = '💡 ' + esc(q.hint); if (hb) hb.textContent = '🎯 2つにしぼる'; return; }
    var wrong = [0, 1, 2, 3].filter(function (n) { return n !== q.a; }), out = shuffle(wrong).slice(0, 2);
    document.querySelectorAll('.opt').forEach(function (b, n) { if (out.indexOf(n) >= 0) { b.disabled = true; b.classList.add('gone'); } });
    if (hb) hb.hidden = true;
  }
  function next() {
    var z = quiz; if (!z || !z.answered) return;
    if (z.i < z.qs.length - 1) { z.i++; showQ(); return; }
    var n = z.qs.length, pct = Math.round(z.ok / n * 100);
    var msg = pct === 100 ? 'ぜんぶ 正解！' : pct >= 80 ? 'よくできました' : pct >= 60 ? 'もう少し！' : 'まちがえた所は 復習に 入りました';
    var html = '<div class="card score"><div class="big">' + z.ok + ' / ' + n + '</div><p>' + msg + '</p></div>';
    if (z.miss.length) html += '<h3>まちがえた問題</h3><div class="card"><ul class="miss">' + z.miss.map(function (q) { return '<li>' + q.recap + '</li>'; }).join('') + '</ul></div>';
    if (z.onEnd) z.onEnd(z.ok, n);
    html += '<div class="btns"><button class="btn main grow" data-again>もう 1 回</button><button class="btn grow" data-go="' + z.parent + '">もどる</button></div>';
    var again = z.again;
    view(z.title, html, z.color, z.parent);
    quiz = { done: true, again: again };
  }

  // ---------- 単語 ----------
  function sessionPick(list, idf, n) { // 復習の日が来たもの → まだ見ていないもの → 定着していないもの
    var due = [], fresh = [], weak = [];
    list.forEach(function (x) { var id = idf(x); if (isDue(id)) due.push(x); else if (!seen(id)) fresh.push(x); else if (!fixed(id)) weak.push(x); });
    var out = shuffle(due).slice(0, n);
    out = out.concat(fresh.slice(0, n - out.length));
    out = out.concat(shuffle(weak).slice(0, n - out.length));
    if (out.length < n) out = out.concat(pick(list.filter(function (x) { return out.indexOf(x) < 0; }), n - out.length));
    return shuffle(out);
  }
  function distract(list, x, key, n, same) {
    var pool = list.filter(function (y) { return y !== x && y[key] !== x[key] && (!same || same(y)); });
    if (pool.length < n) pool = list.filter(function (y) { return y !== x && y[key] !== x[key]; });
    var out = [], seenV = {}; seenV[x[key]] = 1;
    shuffle(pool).forEach(function (y) { if (out.length < n && !seenV[y[key]] && !alike(y[key], [x[key]].concat(out))) { seenV[y[key]] = 1; out.push(y[key]); } });
    shuffle(pool).forEach(function (y) { if (out.length < n && !seenV[y[key]]) { seenV[y[key]] = 1; out.push(y[key]); } }); // 足りないときだけ
    return out;
  }
  // 意味が ほとんど同じ 選択肢を 並べない（「たくさんの」と「たくさんの～（くだけて）」など）
  function alike(v, others) {
    var core = function (t) { return String(t).replace(/[（(][^）)]*[）)]|[～~・、。\s]/g, ''); };
    var a = core(v);
    return others.some(function (o) {
      var b = core(o); if (!a || !b) return false;
      if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) return true;
      for (var i = 0; i + 4 <= a.length; i++) if (b.indexOf(a.substr(i, 4)) >= 0) return true;
      return false;
    });
  }
  function mc(right, wrong) { var opts = shuffle([right].concat(wrong)); return { opts: opts, a: opts.indexOf(right) }; }

  // 🧠 コアの意味 と 🔑 覚え方（まちがえたときは 大きく、正解のときは 小さく）
  // 🧠 イメージ解説：コアの意味・🎬 場面・🧩 部品・➡️ 意味の広がり・前置詞の図・⚖️ ちがい・👪 仲間・🔑 覚え方
  // full：まちがえた時・覚えるカード・一覧は ぜんぶ。正解の時は コア・部品・広がり だけ見せて 残りは「もっと見る」
  function partsHTML(c, en) {
    if (!c.parts || !c.parts.length) return '';
    var idiom = / /.test(String(en).replace(/\s*~.*$/, '').trim());
    return '<div class="parts2">' + c.parts.map(function (x) {
      return '<span class="pb"><b class="en">' + esc(x[0]) + '</b><small>' + esc(x[1]) + '</small></span>';
    }).join('<span class="op">' + (idiom ? '×' : '＋') + '</span>') + '<span class="op">＝</span><span class="pb res"><b class="en">' + esc(String(en).replace(/\s*~(ing)?/g, ' ～').trim()) + '</b></span></div>';
  }
  function flowHTML(c) {
    if (!c.flow || !c.flow.length) return '';
    // 矢印は 次の 札と いっしょに 折り返す
    return '<div class="flow2">' + c.flow.map(function (f, i) { return (i ? '<span class="fw"><span class="ar">→</span>' : '<span class="fw">') + '<span class="fl' + (i ? '' : ' first') + '">' + esc(f) + '</span></span>'; }).join('') + '</div>';
  }
  function coreBox(c, wrong, en, full) {
    var fig = en && window.EKFIG ? EKFIG.particle(en) : '';
    if (!c && !fig) return '';
    c = c || {};
    var head = (c.core ? '<div class="core-h">🧠 コアの意味</div><div class="core-t">' + (c.pic ? '<span class="pic">' + esc(c.pic) + '</span>' : '') + esc(c.core) + '</div>' : '') +
      (en ? partsHTML(c, en) : '') + flowHTML(c);
    var more = (c.scene ? '<div class="scene2"><span class="core-h">🎬 イメージの場面</span>' + esc(c.scene) + '</div>' : '') + fig +
      (c.pair ? '<div class="pair2"><span class="core-h">⚖️ にている語との ちがい</span>' + esc(c.pair) + '</div>' : '') +
      (c.fam && c.fam.length ? '<div class="fam2"><span class="core-h">👪 なかまの語</span>' + c.fam.map(function (f) { return '<span class="fc en">' + esc(f) + '</span>'; }).join('') + '</div>' : '') +
      (c.tip ? '<div class="core-h tip">🔑 覚え方</div><div>' + esc(c.tip) + '</div>' : '');
    var open = wrong || full;
    return '<div class="core' + (wrong ? ' big' : '') + '">' + head + (more ? (open ? more : '<details class="more"><summary>🎬 場面・ちがい・覚え方を 見る</summary>' + more + '</details>') : '') + '</div>';
  }
  // えらんだ まちがいの 選択肢が、本当は 何の意味か
  function pickedBox(html) { return html ? '<div class="picked">👆 ' + html + '</div>' : ''; }
  function wordByJa(list, ja) { for (var i = 0; i < list.length; i++) if (list[i].ja === ja) return list[i]; return null; }
  function wordByEn(list, en) { return find(list, en); }
  function wordQ(g, w, dir) {
    var list = g.d.words, samePos = function (y) { return y.pos === w.pos; }, c = g.core[w.en];
    var ex = '<div class="ex">' + esc(w.ex) + ' ' + sayBtn(w.ex) + '</div><div class="exja">' + esc(w.exja) + '</div>';
    var recap = '<span class="en">' + esc(w.en) + '</span> … ' + esc(w.ja) + (c ? '<br><small>🧠 ' + esc(c.core) + '</small>' : '');
    // ヒント1：コアのヒント（なければ 例文）。ヒント2：2 つに しぼる
    var hint = c ? c.hint : dir === 'je' ? '頭文字は「' + w.en.charAt(0) + '」' : '例文：' + w.ex;
    var q;
    if (dir === 'je') {
      var m = mc(w.en, distract(list, w, 'en', 3, samePos));
      q = { label: '単語・' + w.pos + '　英語は？', prompt: '<div class="qword ja">' + esc(w.ja) + '</div>', opts: m.opts, a: m.a, en: true,
        head: '<div class="ex"><b>' + esc(w.en) + '</b> ' + sayBtn(w.en) + '　' + esc(w.ja) + '</div>',
        picked: function (k) { var o = wordByEn(list, q.opts[k]); return o && '<b class="en">' + esc(o.en) + '</b> は「' + esc(o.ja) + '」という意味'; } };
    } else {
      var m2 = mc(w.ja, distract(list, w, 'ja', 3, samePos));
      q = { label: '単語・' + w.pos + '　意味は？', say: w.en, prompt: '<div class="qword">' + esc(w.en) + '</div>', opts: m2.opts, a: m2.a,
        head: '<div class="ex"><b>' + esc(w.en) + '</b> ＝ ' + esc(w.ja) + '</div>',
        picked: function (k) { var o = wordByJa(list, q.opts[k]); return o && '「' + esc(o.ja) + '」は <b class="en">' + esc(o.en) + '</b> の意味'; } };
    }
    q.id = wid(g.id, w); q.hint = hint; q.recap = recap;
    q.explain = function (ok) { return q.head + coreBox(c, !ok, w.en) + ex; };
    return q;
  }
  function formOf(w) { return (w.ex.match(/\[([^\]]+)\]/) || [])[1]; }
  function idiomQ(g, w, mode) {
    var list = g.d.idioms, c = g.core[w.en];
    var ex = '<div class="ex">' + bracket(w.ex) + ' ' + sayBtn(w.ex) + '</div><div class="exja">' + esc(w.exja) + '</div>';
    var recap = '<span class="en">' + esc(w.en) + '</span> … ' + esc(w.ja) + (c ? '<br><small>🧠 ' + esc(c.core) + '</small>' : '');
    var q;
    if (mode === 'ex') {
      var form = formOf(w);
      var others = list.filter(function (y) { return y !== w; }).map(function (y) { return { f: formOf(y), o: y }; }).filter(function (y) { return y.f && y.f !== form; });
      var m = mc(form, distract(others, { f: form }, 'f', 3));
      q = { label: '熟語　（　）に入るのは？', prompt: '<div class="qsent">' + bracket(w.ex, 'blank') + '</div><div class="tr" style="margin:8px 0 0">' + esc(w.exja) + '</div>',
        opts: m.opts, a: m.a, en: true,
        picked: function (k) { var o = others.filter(function (y) { return y.f === q.opts[k]; })[0]; return o && '<b class="en">' + esc(o.o.en) + '</b> は「' + esc(o.o.ja) + '」という意味'; } };
    } else {
      var m2 = mc(w.ja, distract(list, w, 'ja', 3));
      q = { label: '熟語　意味は？', say: w.en, prompt: '<div class="qword" style="font-size:26px">' + esc(w.en) + '</div>', opts: m2.opts, a: m2.a,
        picked: function (k) { var o = wordByJa(list, q.opts[k]); return o && '「' + esc(o.ja) + '」は <b class="en">' + esc(o.en) + '</b> の意味'; } };
    }
    q.id = iid(g.id, w); q.recap = recap; q.hint = c ? c.hint : '例文の 場面から 考えよう';
    q.explain = function (ok) { return '<div class="ex"><b>' + esc(w.en) + '</b> ＝ ' + esc(w.ja) + '</div>' + coreBox(c, !ok, w.en) + ex; };
    return q;
  }
  var pref = { dir: 'ej', imode: 'ja', ckind: '' };
  function segBtns(name, items, val) {
    return '<div class="seg">' + items.map(function (it) { return '<button data-seg="' + name + '" data-v="' + it[0] + '" aria-pressed="' + (it[0] === val) + '">' + it[1] + '</button>'; }).join('') + '</div>';
  }
  function wordMenu(g) {
    var c = counts(g);
    var html = '<h2>📘 単語</h2><p class="sub">' + g.name + ' によく出る 単語 ' + g.d.words.length + ' 語。1 回 10 問。○ が 3 回 続くと「定着」です。</p>' +
      '<div class="card">' + meter(c.wFix, g.d.words.length, '定着') + '<div style="height:8px"></div>' + meter(c.wSeen, g.d.words.length, '学習した') + '</div>' +
      segBtns('dir', [['ej', '英語 → 意味'], ['je', '意味 → 英語']], pref.dir) +
      '<div class="btns"><button class="btn grow" data-study="w">📖 覚えるカード（10 語）</button></div>' +
      '<div class="btns"><button class="btn main grow" data-start="word">今日の 10 語 クイズ</button><button class="btn grow" data-start="wordr">ランダム 10 語</button></div>' +
      '<div class="btns"><button class="btn grow" data-go="#/' + g.id + '/list/w">📋 単語の一覧</button></div>';
    view('📘 単語 ' + g.name, html, g.color, '#/' + g.id);
  }
  function idiomMenu(g) {
    var c = counts(g);
    var html = '<h2>📗 熟語</h2><p class="sub">' + g.name + ' によく出る 熟語 ' + g.d.idioms.length + ' 個。例文の（　）で 練習すると、大問1 と同じ 形になります。</p>' +
      '<div class="card">' + meter(c.iFix, g.d.idioms.length, '定着') + '<div style="height:8px"></div>' + meter(c.iSeen, g.d.idioms.length, '学習した') + '</div>' +
      segBtns('imode', [['ja', '熟語 → 意味'], ['ex', '例文の（　）']], pref.imode) +
      '<div class="btns"><button class="btn grow" data-study="i">📖 覚えるカード（10 個）</button></div>' +
      '<div class="btns"><button class="btn main grow" data-start="idiom">今日の 10 個 クイズ</button><button class="btn grow" data-start="idiomr">ランダム 10 個</button></div>' +
      '<div class="btns"><button class="btn grow" data-go="#/' + g.id + '/list/i">📋 熟語の一覧</button></div>';
    view('📗 熟語 ' + g.name, html, g.color, '#/' + g.id);
  }
  function wordList(g, t) {
    var list = t === 'i' ? g.d.idioms : g.d.words, idf = t === 'i' ? iid : wid;
    var html = '<h2>' + (t === 'i' ? '📗 熟語' : '📘 単語') + 'の一覧</h2><p class="sub">✓ は 定着、・は 学習中。🔊 で 発音を 聞けます。</p>' +
      list.map(function (w) {
        var id = idf(g.id, w), st = fixed(id) ? '<span class="done">✓</span>' : seen(id) ? '・' : '';
        var c = g.core[w.en];
        return '<div class="row"><div class="t"><span class="en" style="font-size:18px;font-weight:600">' + esc(w.en) + '</span> ' + (w.pos ? '<span class="tag">' + w.pos + '</span> ' : '') + esc(w.ja) +
          (c && c.pic ? ' <span class="pic">' + esc(c.pic) + '</span>' : '') +
          '<small class="en">' + bracket(w.ex) + '</small><small>' + esc(w.exja) + '</small>' +
          (c || t === 'i' ? '<details class="ld"><summary>🧠 イメージと 覚え方</summary>' + coreBox(c, false, w.en, true) + '</details>' : '') + '</div>' + st + sayBtn(w.en) + '</div>';
      }).join('');
    view((t === 'i' ? '熟語' : '単語') + 'の一覧 ' + g.name, html, g.color, '#/' + g.id + (t === 'i' ? '/idiom' : '/word'));
  }

  // ---------- 📖 覚えるカード：単語 → タップで 意味・イメージ・覚え方 → 覚えた／もう一度 ----------
  var study = null;
  function studyStart(g, t) {
    var list = t === 'i' ? g.d.idioms : g.d.words, idf = t === 'i' ? iid : wid;
    var ws = sessionPick(list, function (w) { return idf(g.id, w); }, 10);
    study = { g: g, t: t, list: ws, i: 0, again: 0, parent: location.hash, all: ws.slice() };
    studyShow(false);
  }
  function studyShow(open) {
    var st = study, w = st.list[st.i], g = st.g, c = g.core[w.en];
    var html = '<div class="prog"><span>' + (st.i + 1) + ' / ' + st.list.length + '</span><div class="meter"><i style="width:' + Math.round(st.i / st.list.length * 100) + '%"></i></div></div>' +
      '<div class="qbox scard"><div class="qkind">' + (st.t === 'i' ? '熟語' : '単語・' + esc(w.pos)) + ' ' + sayBtn(w.en) + '</div>' +
      '<div class="qword"' + (st.t === 'i' ? ' style="font-size:28px"' : '') + '>' + esc(w.en) + '</div>' +
      (open ? '<div class="sja">' + esc(w.ja) + '</div>' + coreBox(c, true, w.en, true) +
        '<div class="ex">' + bracket(w.ex) + ' ' + sayBtn(w.ex) + '</div><div class="exja">' + esc(w.exja) + '</div>'
        : (c ? '<div class="hintx">💡 ' + esc(c.hint) + '</div>' : '') + '<p class="note">意味を 思い出してから めくろう</p>') + '</div>' +
      '<div class="btns">' + (open ? '<button class="btn grow" data-sagain>🔁 もう一度</button><button class="btn main grow" data-snext>覚えた →</button>'
        : '<button class="btn main grow" data-sopen>めくる（意味と イメージを 見る）</button>') + '</div>';
    view((st.t === 'i' ? '📗 熟語' : '📘 単語') + 'カード ' + g.name, html, g.color, st.parent);
    if (!open) speak(w.en);
  }
  function studyNext(again) {
    var st = study; if (!st) return;
    if (again) { st.list.push(st.list[st.i]); st.again++; }
    st.i++;
    if (st.i < st.list.length) return studyShow(false);
    var html = '<div class="card score"><div class="big">' + st.all.length + '</div><p>' + (st.t === 'i' ? '個の 熟語' : '語') + 'を 見ました。<br>すぐに クイズで たしかめると 記憶に 残りやすくなります。</p></div>' +
      '<div class="btns"><button class="btn main grow" data-squiz>このまま クイズで たしかめる</button><button class="btn grow" data-go="' + st.parent + '">もどる</button></div>';
    view('📖 カード ' + st.g.name, html, st.g.color, st.parent);
  }
  function studyQuiz() {
    var st = study, g = st.g;
    var qs = shuffle(st.all).map(function (w) { return st.t === 'i' ? idiomQ(g, w, pref.imode) : wordQ(g, w, pref.dir); });
    startQuiz((st.t === 'i' ? '📗 熟語 ' : '📘 単語 ') + g.name, qs, g.color, st.parent);
    quiz.again = studyQuiz;
  }

  // ---------- 🧩 部品で覚える：同じ部品（語根・接頭辞）を もつ 単語を まとめて 見る ----------
  function partsGroups(g) {
    var map = {};
    g.d.words.forEach(function (w) {
      var c = g.core[w.en]; if (!c || !c.parts) return;
      c.parts.forEach(function (x) {
        var k = x[0].toLowerCase().replace(/[-‐]/g, '');
        if (k.length < 2) return;
        var m = map[k] = map[k] || { k: k, means: {}, ws: [], pos: [0, 0, 0] };
        var i = c.parts.indexOf(x); m.pos[i === 0 ? 0 : i === c.parts.length - 1 ? 2 : 1]++;
        var mean = x[1].replace(/（[^）]*）/g, '').trim() || x[1];
        m.means[mean] = (m.means[mean] || 0) + 1;
        if (m.ws.indexOf(w) < 0) m.ws.push(w);
      });
    });
    return Object.keys(map).map(function (k) {
      var m = map[k]; m.mean = Object.keys(m.means).sort(function (a, b) { return m.means[b] - m.means[a]; })[0]; return m;
    }).filter(function (m) { return m.ws.length >= 2; }).sort(function (a, b) { return b.ws.length - a.ws.length || (a.k < b.k ? -1 : 1); });
  }
  function partsPage(g) {
    var gs = partsGroups(g);
    var pfx = {}; (window.EKPFX ? EKPFX.families : []).forEach(function (f) { f.forms.forEach(function (k) { pfx[k] = 1; }); });
    // 頭の 部品は 仲間で まとめて 出す。仲間に ない 先頭の 部品（bio・geo など）は 語根の ほうへ
    var kind = function (m) { var p = m.pos, k = p[1] >= p[0] && p[1] >= p[2] ? 1 : p[0] >= p[2] ? 0 : 2; return k === 0 && !pfx[m.k] ? 1 : k === 0 ? -1 : k; }; // 1 語根・2 おしり・-1 頭（仲間で 出す）
    var sec = [['🌱 語根（意味の 中心になる 部品）', 1], ['➡️ おしりに つく 部品（接尾辞・品詞を 決める）', 2]];
    var rows = function (ws) {
      return ws.map(function (w) {
        var c = g.core[w.en];
        return '<div class="row"><div class="t"><span class="en" style="font-weight:600">' + esc(w.en) + '</span> ' + esc(w.ja) + (c && c.pic ? ' <span class="pic">' + esc(c.pic) + '</span>' : '') + partsHTML(c, w.en) + '</div>' + sayBtn(w.en) + '</div>';
      }).join('');
    };
    var group = function (m) {
      return '<details class="pg"><summary><b class="en">' + esc(m.k) + '</b> <span>' + esc(m.mean) + '</span><span class="tag">' + m.ws.length + ' 語</span></summary><div class="pw">' + rows(m.ws) + '</div></details>';
    };
    // 頭に つく 部品は「意味の にた 仲間」で まとめる（in- im- il- ir- など）
    var fams = window.EKPFX ? EKPFX.groups(g.d.words, function (en) { return g.core[en]; }) : [];
    var famCard = function (x) {
      var f = x.f, forms = f.forms.filter(function (k) { return x.used[k]; });
      return '<div class="pfam"><div class="pf-h">' + x.svg + '<div><div class="pf-t">' + (f.pic ? '<span class="pic">' + f.pic + '</span> ' : '') + esc(f.title) + '</div>' +
        '<div class="pf-f">' + forms.map(function (k) { return '<span class="fc en">' + esc(k) + '-</span>'; }).join('') + '</div></div></div>' +
        '<p class="pf-i">🖼️ ' + esc(f.image) + '</p><p class="pf-c">' + esc(f.core) + '</p>' + (f.note ? '<p class="note">' + esc(f.note) + '</p>' : '') +
        '<details class="pg"><summary><span>この 仲間の 単語</span><span class="tag">' + x.ws.length + ' 語</span></summary><div class="pw">' + rows(x.ws.map(function (y) { return y.w; })) + '</div></details></div>';
    };
    var html = '<h2>🧩 部品で覚える</h2><p class="sub">英単語は「部品」の 組み合わせで できていることが 多い。同じ イメージの 部品を まとめて 見ると、知らない 単語の 意味も 想像できるように なります。（' + g.name + ' の 単語から）</p>' +
      (fams.length ? '<h3>⬅️ 頭に つく 部品（接頭辞）を イメージで まとめる　<small class="note">' + fams.length + ' 仲間</small></h3>' + fams.map(famCard).join('') : '') +
      (gs.length ? sec.map(function (sc) {
        var list = gs.filter(function (m) { return kind(m) === sc[1]; });
        return list.length ? '<h3>' + sc[0] + '　<small class="note">' + list.length + ' 個</small></h3>' + list.map(group).join('') : '';
      }).join('') : '<div class="card">部品の データを 準備中です。</div>');
    view('🧩 部品 ' + g.name, html, g.color, '#/' + g.id);
  }

  // ---------- 大問1 穴うめ ----------
  function clozeQ(g, o, i) {
    var right = o.c[o.a], h = g.d.clozeHelp[i];
    var q = { id: cid(g.id, i), label: '大問1・' + o.kind, prompt: '<div class="qsent">' + blankify(o.q) + '</div>', opts: o.c, a: o.a, en: true,
      hint: h ? h.hint : '日本語にすると どんな 文になるか 考えよう',
      recap: '<span class="en">' + blankify(o.q, right) + '</span><br><small>' + esc(h ? h.think : o.why) + '</small>',
      picked: function (k) { return h && h.opts[k] ? '<span class="en">' + esc(h.opts[k]) + '</span>' : ''; } };
    q.explain = function (ok) {
      var html = '<div class="ex">' + blankify(o.q, right) + ' ' + sayBtn(o.q.replace(/\(\s*\)/, right)) + '</div><div class="exja">' + esc(o.ja) + '</div>';
      if (h) {
        html += '<div class="core' + (ok ? '' : ' big') + '"><div class="core-h">🧭 考え方</div><div>' + esc(h.think) + '</div>' +
          (ok ? '<details><summary>4 つの 選択肢の 意味</summary>' : '<div class="core-h tip">4 つの 選択肢の 意味</div>') +
          '<ul class="olist">' + h.opts.map(function (t, n) { return '<li class="' + (n === o.a ? 'is-a' : '') + '"><span class="en">' + esc(t) + '</span></li>'; }).join('') + '</ul>' + (ok ? '</details>' : '') + '</div>';
      } else html += '<div class="why">💡 ' + esc(o.why) + '</div>';
      return html;
    };
    return q;
  }
  function clozeMenu(g) {
    var kinds = {}; g.d.cloze.forEach(function (o) { kinds[o.kind] = (kinds[o.kind] || 0) + 1; });
    var c = counts(g);
    var items = [['', 'ぜんぶ']].concat(['単語', '熟語', '文法'].filter(function (k) { return kinds[k]; }).map(function (k) { return [k, k + '（' + kinds[k] + '）']; }));
    if (!kinds[pref.ckind]) pref.ckind = '';
    var html = '<h2>✏️ 大問1 穴うめ</h2><p class="sub">本番の 大問1 と 同じ形。（　）に 入るものを 4 つから えらびます。1 回 10 問。</p>' +
      '<div class="card">' + meter(c.cOk, g.d.cloze.length, '正解したことがある') + '</div>' + segBtns('ckind', items, pref.ckind) +
      '<div class="btns"><button class="btn main grow" data-start="cloze">10 問 解く</button></div>' +
      (g.id === 'p1' ? '<p class="note">準1級の 大問1 は 文法問題がなく、ほとんどが 単語と 句動詞です。</p>' : '');
    view('✏️ 穴うめ ' + g.name, html, g.color, '#/' + g.id);
  }

  function start(kind, g) {
    var parent = location.hash, qs, title;
    if (kind === 'word' || kind === 'wordr') {
      var ws = kind === 'word' ? sessionPick(g.d.words, function (w) { return wid(g.id, w); }, 10) : pick(g.d.words, 10);
      qs = ws.map(function (w) { return wordQ(g, w, pref.dir); }); title = '📘 単語 ' + g.name;
    } else if (kind === 'idiom' || kind === 'idiomr') {
      var is = kind === 'idiom' ? sessionPick(g.d.idioms, function (w) { return iid(g.id, w); }, 10) : pick(g.d.idioms, 10);
      qs = is.map(function (w) { return idiomQ(g, w, pref.imode); }); title = '📗 熟語 ' + g.name;
    } else if (kind === 'cloze') {
      var idx = g.d.cloze.map(function (o, i) { return i; }).filter(function (i) { return !pref.ckind || g.d.cloze[i].kind === pref.ckind; });
      var objs = idx.map(function (i) { return { i: i }; });
      var chosen = sessionPick(objs, function (x) { return cid(g.id, x.i); }, 10);
      qs = chosen.map(function (x) { return clozeQ(g, g.d.cloze[x.i], x.i); }); title = '✏️ 穴うめ ' + g.name;
    }
    startQuiz(title, qs, g.color, parent);
    quiz.again = function () { start(kind, g); };
  }

  // ---------- 復習 ----------
  function reviewStart() {
    var ids = shuffle(dueIds()).slice(0, 20);
    if (!ids.length) {
      view('🔁 復習', '<div class="card score"><div class="big">0</div><p>今日の 復習は ありません。<br>単語・熟語・穴うめで まちがえた 問題や、○ をつけた 問題が、日を あけて ここに 出てきます。</p></div>' +
        '<div class="btns"><button class="btn main grow" data-go="#/">もどる</button></div>', null, '#/');
      return;
    }
    var qs = ids.map(function (id) {
      var x = lookup(id);
      var q = x.t === 'w' ? wordQ(x.g, x.o, 'ej') : x.t === 'i' ? idiomQ(x.g, x.o, 'ja') : clozeQ(x.g, x.o, x.i);
      q.label = x.g.name + '・' + q.label; return q;
    });
    startQuiz('🔁 今日の復習', qs, null, '#/');
    quiz.again = reviewStart;
  }

  // ---------- 長文 ----------
  function readList(g) {
    var html = '<h2>📖 長文</h2><p class="sub">英文を 読んで、質問に 答えます。答えの 根拠は いつも 本文の中に あります。</p>' +
      g.d.reading.map(function (r, i) {
        var best = S.read[g.id + ':' + i];
        return '<button class="row" data-go="#/' + g.id + '/read/' + i + '"><span class="tag">' + (r.type === 'email' ? 'Eメール' : '説明文') + '</span><span class="t en">' + esc(r.title) +
          '<small>' + r.qs.length + ' 問・' + words(r.text.join(' ')) + ' 語</small></span>' + (best != null ? '<span class="done">' + best + '/' + r.qs.length + '</span>' : '') + '</button>';
      }).join('') +
      '<h3>読み方のコツ</h3><div class="card"><ul class="miss"><li>先に 質問を 読んで、何を さがすかを 決めてから 本文へ。</li><li>質問は だいたい 段落の 順番に 出ます。</li><li>正解の 選択肢は、本文の 言葉を 言いかえて いることが 多い（同じ 単語が あるだけの 選択肢に 注意）。</li></ul></div>';
    view('📖 長文 ' + g.name, html, g.color, '#/' + g.id);
  }
  function passageHTML(r, under) {
    return '<div class="card passage' + (r.type === 'email' ? ' mail' : '') + '">' + (r.title ? '<h3 class="en" style="margin-top:0;text-align:center">' + esc(r.title) + '</h3>' : '') +
      r.text.map(function (p, k) { return '<p>' + (r.type === 'email' ? '' : '<span class="pno">' + (k + 1) + '</span>') + (under ? bracket(p, 'u') : esc(p)) + '</p>'; }).join('') + '</div>';
  }
  function readOne(g, i) {
    var r = g.d.reading[i]; if (!r) return readList(g);
    var html = '<div class="btns" style="margin:0 0 10px">' + sayBtn(r.text.join(' '), true) + '<span class="note" style="margin:0;align-self:center">本文を 読み上げ（聞きながら 読む 練習にも）</span></div>' +
      passageHTML(r) + '<div id="rqs">' + r.qs.map(function (q, k) {
        var rh = (g.d.readHint[i] || [])[k];
        return '<div class="rq">(' + (k + 1) + ') ' + esc(q.q) + (rh ? ' <button class="hintb" type="button" data-rhint="' + esc(rh) + '">💡 ヒント</button>' : '') + '</div><div class="opts" data-rq="' + k + '">' + q.c.map(function (c, n) {
          return '<button class="opt en-opt" data-ropt="' + n + '"><span class="n">' + (n + 1) + '</span><span>' + esc(c) + '</span></button>';
        }).join('') + '</div><div class="rfb"></div>';
      }).join('') + '</div><div id="rsum"></div>';
    view('📖 ' + r.title, html, g.color, '#/' + g.id + '/read');
    cur.read = { g: g, i: i, r: r, ok: 0, n: 0 };
  }
  function readAnswer(btn) {
    var box = btn.closest('[data-rq]'), k = +box.dataset.rq, st = cur.read, q = st.r.qs[k], n = +btn.dataset.ropt;
    if (box.dataset.done) return; box.dataset.done = 1;
    var ok = n === q.a; st.n++; if (ok) st.ok++;
    box.querySelectorAll('.opt').forEach(function (b, m) { b.disabled = true; if (m === q.a) b.classList.add('ok'); else if (m === n) b.classList.add('ng'); });
    box.nextElementSibling.innerHTML = '<div class="fb"><div class="res ' + (ok ? 'ok">○ 正解' : 'ng">✕ 正解は ' + (q.a + 1)) + '</div><div class="why">💡 ' + esc(q.why) + '</div></div>';
    if (st.n === st.r.qs.length) {
      var key = st.g.id + ':' + st.i; S.read[key] = Math.max(S.read[key] || 0, st.ok); save();
      $('#rsum').innerHTML = '<div class="card score"><div class="big">' + st.ok + ' / ' + st.n + '</div></div><div class="btns">' +
        (st.r.qs.length && st.i + 1 < st.g.d.reading.length ? '<button class="btn main grow" data-go="#/' + st.g.id + '/read/' + (st.i + 1) + '">次の長文へ</button>' : '') +
        '<button class="btn grow" data-go="#/' + st.g.id + '/read">一覧へ</button></div>';
    }
  }

  // ---------- 英作文 ----------
  var TYPE = { opinion: '意見', email: 'Eメール', summary: '要約' };
  function writeList(g) {
    var types = Object.keys(g.write);
    var html = '<h2>✍️ 英作文</h2><p class="sub">型を 見る → 自分で 書く → チェック → 模範解答 と 比べる。書いた文は このブラウザに 残ります。</p>';
    types.forEach(function (t) {
      var gd = EK.guide[t], rng = g.write[t];
      html += '<h3>' + gd.icon + ' ' + gd.name + '（' + rng[0] + '〜' + rng[1] + '語）</h3><p class="sub" style="margin-bottom:8px">' + esc(gd.one) + '</p>';
      g.d.writing.forEach(function (w, i) {
        if (w.type !== t) return;
        html += '<button class="row" data-go="#/' + g.id + '/write/' + i + '"><span class="t">' + esc(w.topicja) + '</span>' + (S.write[g.id + ':' + i] ? '<span class="done">✓</span>' : '') + '</button>';
      });
    });
    view('✍️ 英作文 ' + g.name, html, g.color, '#/' + g.id);
  }
  function writeOne(g, i) {
    var w = g.d.writing[i]; if (!w) return writeList(g);
    var gd = EK.guide[w.type], steps = gd.steps[g.id] || gd.steps[Object.keys(gd.steps)[0]], rng = g.write[w.type] || [0, 999], key = g.id + ':' + i;
    var html = '<span class="tag">' + gd.icon + ' ' + TYPE[w.type] + '・' + rng[0] + '〜' + rng[1] + '語</span>' +
      '<details class="card" style="margin-top:10px"' + (S.write[key] ? '' : ' open') + '><summary><b>書き方の 型</b>（' + esc(gd.one) + '）</summary><ul class="steps" style="margin-top:10px">' +
      steps.map(function (s) { return '<li><b>' + esc(s[0]) + '</b><span>' + (s[1] ? '<span class="f">' + esc(s[1]) + '</span>' : '') + '<small>' + esc(s[2]) + '</small></span></li>'; }).join('') + '</ul></details>' +
      '<h3>問題</h3>' + (w.passage && w.passage.length ? passageHTML({ type: w.type === 'email' ? 'email' : 'article', text: w.passage, title: '' }, w.type === 'email') : '') +
      '<div class="card"><div class="en" style="font-size:17px">' + esc(w.topic) + '</div><div class="tr" style="margin:6px 0 0">' + esc(w.topicja) + '</div>' +
      (w.points && w.points.length ? '<div class="pointsbox"><b style="font-size:13px">POINTS</b>' + w.points.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('') + '</div>' : '') + '</div>' +
      '<h3>自分で 書く</h3><textarea id="draft" spellcheck="true" autocapitalize="sentences" placeholder="ここに 英語で 書きます">' + esc(S.drafts[key] || '') + '</textarea><div class="wc" id="wc"></div>' +
      '<div class="btns"><button class="btn main grow" data-check>書けた → チェックする</button><button class="btn" data-model>模範解答だけ 見る</button></div><div id="wres"></div>';
    view('✍️ ' + TYPE[w.type] + ' ' + g.name, html, g.color, '#/' + g.id + '/write');
    cur.write = { g: g, i: i, w: w, rng: rng, key: key };
    wordCount();
  }
  function wordCount() {
    var st = cur.write, t = $('#draft'); if (!st || !t) return;
    var n = words(t.value), r = st.rng, el = $('#wc');
    el.textContent = n + ' 語（目安 ' + r[0] + '〜' + r[1] + ' 語）' + (n && n < r[0] ? '　あと ' + (r[0] - n) + ' 語' : n > r[1] ? '　' + (n - r[1]) + ' 語 多い' : '');
    el.className = 'wc' + (!n ? '' : n >= r[0] && n <= r[1] ? ' ok' : ' ng');
  }
  function writeCheck(withList) {
    var st = cur.write, w = st.w, gd = EK.guide[w.type];
    var html = '';
    if (withList) {
      var n = words($('#draft').value);
      html += '<h3>自分で チェック</h3><div class="card checks">' + gd.check.map(function (c, k) {
        var auto = /語数/.test(c) ? (n >= st.rng[0] && n <= st.rng[1]) : null;
        return '<label><input type="checkbox"' + (auto ? ' checked' : '') + '><span>' + esc(c) + (auto === false ? '　<b style="color:var(--ng)">（今 ' + n + ' 語）</b>' : '') + '</span></label>';
      }).join('') + '</div>';
      S.write[st.key] = 1; save();
    }
    html += '<h3>模範解答（' + (w.words || words(w.model.join(' '))) + ' 語）' + sayBtn(w.model.join(' ')) + '</h3><div class="card model">' +
      w.model.map(function (s, k) { return '<p>' + esc(s) + '</p><div class="tr">' + esc(w.modelja[k] || '') + '</div>'; }).join('') + '</div>' +
      '<p class="note">模範解答は 1 つの 例です。言いたいことが 同じなら、ちがう 表現でも かまいません。</p>';
    var gi = st.i, list = st.g.d.writing, nx = -1;
    for (var k = gi + 1; k < list.length; k++) if (list[k].type === w.type) { nx = k; break; }
    html += '<div class="btns">' + (nx >= 0 ? '<button class="btn main grow" data-go="#/' + st.g.id + '/write/' + nx + '">次の問題へ</button>' : '') + '<button class="btn grow" data-go="#/' + st.g.id + '/write">一覧へ</button></div>';
    $('#wres').innerHTML = html;
    $('#wres').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------- ミニ模試 ----------
  function mockStart(g) {
    var cl = pick(g.d.cloze.map(function (o, i) { return i; }), 10).map(function (i) { return clozeQ(g, g.d.cloze[i], i); });
    var ri = Math.floor(Math.random() * g.d.reading.length), r = g.d.reading[ri], qs = cl;
    if (r) {
      var body = passageHTML(r).replace('class="card passage', 'class="passage');
      // 1問目は本文を開いて、2問目からは閉じておく（質問がすぐ見えるように。タップで開く）
      qs = qs.concat(r.qs.map(function (q, k) {
        return { label: '長文', before: '<details class="card"' + (k ? '' : ' open') + '><summary><b>本文</b>' + (k ? '（タップで開く）' : '') + '</summary>' + body + '</details>', prompt: '<div class="qsent">' + esc(q.q) + '</div>', opts: q.c, a: q.a, en: true, after: '<div class="why">💡 ' + esc(q.why) + '</div>',
          recap: '<span class="en">' + esc(q.q) + '</span><br>→ <span class="en">' + esc(q.c[q.a]) + '</span>' };
      }));
    }
    var t0 = Date.now();
    startQuiz('🏁 ミニ模試 ' + g.name, qs, g.color, '#/' + g.id, function () {
      var m = Math.round((Date.now() - t0) / 60000);
      setTimeout(function () { toast('かかった時間：およそ ' + Math.max(1, m) + ' 分'); }, 50);
    });
    quiz.again = function () { mockStart(g); };
  }

  // ---------- 操作 ----------
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, summary'); if (!t) return;
    if (t.dataset.say != null) { e.preventDefault(); e.stopPropagation(); speak(t.dataset.say); return; }
    if (t.dataset.go != null) return go(t.dataset.go);
    if (t.id === 'back') return go(t.dataset.to || '#/');
    if (t.id === 'review') return go('#/review');
    if (t.id === 'theme') {
      var dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      S.theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = S.theme; save(); return;
    }
    if (t.dataset.opt != null) return answer(+t.dataset.opt);
    if (t.dataset.next != null) return next();
    if (t.dataset.hint != null) return showHint();
    if (t.dataset.study) return studyStart(GR[cur.parts[0]], t.dataset.study);
    if (t.dataset.sopen != null) return studyShow(true);
    if (t.dataset.snext != null) return studyNext(false);
    if (t.dataset.sagain != null) return studyNext(true);
    if (t.dataset.squiz != null) return studyQuiz();
    if (t.dataset.rhint != null) { var hx = document.createElement('div'); hx.className = 'hintx'; hx.textContent = '💡 ' + t.dataset.rhint; t.closest('.rq').after(hx); t.remove(); return; }
    if (t.dataset.again != null) { var a = quiz && quiz.again; if (a) a(); return; }
    if (t.dataset.seg) {
      pref[t.dataset.seg] = t.dataset.v;
      t.parentNode.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === t); });
      return;
    }
    if (t.dataset.start) return start(t.dataset.start, GR[cur.parts[0]]);
    if (t.dataset.ropt != null) return readAnswer(t);
    if (t.dataset.check != null) return writeCheck(true);
    if (t.dataset.model != null) return writeCheck(false);
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'draft' && cur.write) { S.drafts[cur.write.key] = e.target.value; save(); wordCount(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!quiz || quiz.done || /TEXTAREA|INPUT/.test(e.target.tagName)) return;
    if (e.key === 'h' && !quiz.answered) { showHint(); e.preventDefault(); return; }
    if (/^[1-4]$/.test(e.key) && !quiz.answered) { answer(+e.key - 1); e.preventDefault(); }
    else if ((e.key === 'Enter' || e.key === ' ') && quiz.answered) { next(); e.preventDefault(); }
  });

  // game.js（英単語ロケット）から使う道具
  window.EKAPP = {
    S: function () { return S; }, save: save, mark: mark, GR: GR, esc: esc, shuffle: shuffle, speak: speak, sayBtn: sayBtn, bracket: bracket, blankify: blankify,
    view: view, toast: toast, go: go, wordQ: wordQ, idiomQ: idiomQ, clozeQ: clozeQ, wid: wid, iid: iid, cid: cid, fixed: fixed,
    sfx: function () { return S.sfx !== false; }
  };
  if (S.theme) document.documentElement.dataset.theme = S.theme;
  window.addEventListener('hashchange', route);
  updateDue();
  route();
})();
