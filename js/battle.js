/* 英検ラボ：🏆 クラス対戦（先生の部屋 ＋ 生徒の参加）
   ・🚀 ロケット対戦：時間は 先生が えらんだ 長さで 固定。全員 同じ 順番の 問題。ランキングが リアルタイムで 動く
   ・🎯 クイズ大会：先生ペースの 4 択（早く 正解するほど 高得点）
   Firebase Realtime Database（無料）の REST ＋ ストリーム。設定は js/config.js か ハブの「データベース」
   rooms/e{4けた} = { cfg, state: lobby|play|end（クイズは q|reveal|board|end）, round, seed, startAt, qi, qAt, players: { pid: { n, s, b, k, w, r, d, a, h } } }
   論理表現ラボの クラス対戦と 同じ データベースを 使えるように、部屋の 名前の 頭に e を つけて ぶつからないように している */
(function () {
  'use strict';
  function A() { return window.EKAPP; }
  function S() { return A().S(); }
  function esc(t) { return A().esc(t); }
  function $(s, r) { return (r || document).querySelector(s); }
  function fmt(n) { return Math.round(n).toLocaleString('ja-JP'); }
  function FX(n, a) { if (window.LXFX) LXFX.play(n, a); }
  function toast(m) { A().toast(m); }
  function save() { A().save(); }

  var KINDS = [['race', '🚀 ロケット対戦'], ['quiz', '🎯 クイズ大会']];
  var TIMES = [[30, '30 秒'], [60, '1 分'], [90, '1 分半'], [120, '2 分'], [180, '3 分'], [300, '5 分']];
  var TOPS = [[3, '上位 3 人'], [5, '上位 5 人'], [10, '上位 10 人'], [0, '全員']];
  var TYPES = [['mix', '🌈 ミックス'], ['word', '📘 単語'], ['idiom', '📗 熟語'], ['cloze', '✏️ 穴うめ']];
  var QNS = [[5, '5 問'], [10, '10 問'], [15, '15 問'], [20, '20 問']];
  var QTS = [[10, '10 秒'], [20, '20 秒'], [30, '30 秒']];
  var QCOL = [['▲', 'qa0'], ['◆', 'qa1'], ['●', 'qa2'], ['■', 'qa3']]; // 赤・青・黄・緑
  var QREAD = 3000; // 問題を 読む 時間（このあと ボタンが 押せる）
  var KEYP = 'e';

  /* =========================================================
     つながり（Firebase Realtime Database の REST ＋ ストリーム）
     ========================================================= */
  function base() {
    var u = String(S().db || (window.EK_CONFIG && EK_CONFIG.db) || '').trim().replace(/\/+$/, '');
    return /^https:\/\/[^\s]+$/.test(u) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(u) ? u : '';
  }
  function pid() { var s = S(); if (!s.pid) { s.pid = 'p' + Math.random().toString(36).slice(2, 10); save(); } return s.pid; }
  function rpath(code) { return 'rooms/' + KEYP + code; }
  function api(method, path, body) {
    var o = { method: method };
    if (body !== undefined) o.body = JSON.stringify(body);
    return fetch(base() + '/' + path + '.json', o).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }
  function listen(path, cb) {
    var tree = null, es = null, poll = null, closed = false;
    function setAt(p, val) {
      var keys = p.split('/').filter(Boolean);
      if (!keys.length) { tree = val; return; }
      if (tree === null || typeof tree !== 'object') tree = {};
      var o = tree;
      for (var i = 0; i < keys.length - 1; i++) { if (o[keys[i]] == null || typeof o[keys[i]] !== 'object') o[keys[i]] = {}; o = o[keys[i]]; }
      if (val === null) delete o[keys[keys.length - 1]]; else o[keys[keys.length - 1]] = val;
    }
    function net(ok) { document.body.classList.toggle('offline', !ok && !closed); }
    function startPoll() {
      if (poll || closed) return;
      poll = setInterval(function () { api('GET', path).then(function (v) { net(true); tree = v; cb(tree); }, function () { net(false); }); }, 1500);
    }
    try {
      es = new EventSource(base() + '/' + path + '.json');
      es.addEventListener('put', function (e) { net(true); var d = JSON.parse(e.data); setAt(d.path, d.data); cb(tree); });
      es.addEventListener('keep-alive', function () { net(true); });
      es.onopen = function () { net(true); };
      es.addEventListener('patch', function (e) {
        net(true); var d = JSON.parse(e.data), p = d.path.replace(/\/$/, '');
        Object.keys(d.data || {}).forEach(function (k) { setAt(p + '/' + k, d.data[k]); }); cb(tree);
      });
      es.onerror = function () { net(false); if (es.readyState === 2) startPoll(); };
    } catch (e) { startPoll(); }
    return function () { closed = true; document.body.classList.remove('offline'); if (es) es.close(); clearInterval(poll); };
  }
  /* 端末の 時計と 先生の 時計の ずれ（サーバーの 時刻で そろえる） */
  var OFF = 0;
  function now() { return Date.now() + OFF; }
  function syncClock(code) {
    var t0 = Date.now(), p = rpath(code) + '/clock/' + pid();
    return api('PUT', p, { '.sv': 'timestamp' }).then(function (ts) {
      var t1 = Date.now();
      if (typeof ts === 'number') OFF = ts - (t0 + t1) / 2;
      api('DELETE', p).catch(function () { });
    }, function () { });
  }
  function joinUrl(code) {
    var u = location.origin + location.pathname + '#/join=' + code;
    if (S().db && !(window.EK_CONFIG && EK_CONFIG.db === base())) u += '&db=' + encodeURIComponent(base());
    return u;
  }

  /* =========================================================
     問題（先生も 生徒も 同じ 順番に なるように seed から 作る）
     ========================================================= */
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function gradesOf(cfg) { return String(cfg.g || '').split(',').filter(function (id) { return A().GR[id]; }); }
  function gradeName(cfg) { return gradesOf(cfg).map(function (id) { return A().GR[id].name; }).join('・') || '（級が 未選択）'; }
  function typeName(cfg) { return (TYPES.filter(function (t) { return t[0] === (cfg.m || 'mix'); })[0] || TYPES[0])[1]; }
  /* 出題の もと：{ word: [...], idiom: [...], cloze: [...] }（級を またいで 同じ 語は 1 つに） */
  function poolsOf(cfg) {
    var out = { word: [], idiom: [], cloze: [] }, seen = {}, m = cfg.m || 'mix';
    gradesOf(cfg).forEach(function (id) {
      var g = A().GR[id];
      if (m === 'mix' || m === 'word') g.d.words.forEach(function (w) { if (!seen['w:' + w.en]) { seen['w:' + w.en] = 1; out.word.push({ k: 'word', w: w, g: g }); } });
      if (m === 'mix' || m === 'idiom') g.d.idioms.forEach(function (w) { if (!seen['i:' + w.en]) { seen['i:' + w.en] = 1; out.idiom.push({ k: 'idiom', w: w, g: g }); } });
      if (m === 'mix' || m === 'cloze') g.d.cloze.forEach(function (o, i) { out.cloze.push({ k: 'cloze', w: o, i: i, g: g }); });
    });
    return out;
  }
  function poolAll(cfg) { var p = poolsOf(cfg); return p.word.concat(p.idiom, p.cloze); }
  /* 先生と 生徒の アプリの 内容が 同じか（古い 画面だと 問題が ずれる）をたしかめる 目印 */
  function sigOf(cfg) { var p = poolsOf(cfg); return [p.word.length, p.idiom.length, p.cloze.length, (p.word[0] || { w: {} }).w.en || '', (p.word[p.word.length - 1] || { w: {} }).w.en || ''].join('|'); }
  function isQuiz(cfg) { return cfg && cfg.kind === 'quiz'; }
  function qN(cfg) { return +cfg.qn || 10; }
  function qT(cfg) { return +cfg.qt || 20; }
  function topN(cfg) { return cfg.top === 0 ? 9999 : (+cfg.top || 10); }
  function tName(t) { return (TIMES.filter(function (x) { return x[0] === t; })[0] || [0, t + ' 秒'])[1]; }
  function cfgName(cfg) { return gradeName(cfg) + '・' + typeName(cfg); }
  function roundName(room) { return isQuiz(room.cfg) ? '🎯 クイズ大会' + (room.round > 1 ? '（' + room.round + ' 回目）' : '') : '第' + room.round + '回戦'; }

  /* クイズの 問題：部屋の seed から 全員が 同じ ものを 作る。出題・選択肢の 順番は 乱数を seed に して 作る */
  var QC = {};
  function quizQs(cfg, seed) {
    var key = seed + '|' + JSON.stringify(cfg);
    if (QC.key === key) return QC.qs;
    var R = rng(seed), orig = Math.random, qs = [];
    Math.random = R;
    try {
      var src = poolAll(cfg), list = [];
      while (list.length < qN(cfg) && src.length) list = list.concat(A().shuffle(src));
      qs = list.slice(0, qN(cfg)).map(function (it) {
        var q = it.k === 'word' ? A().wordQ(it.g, it.w, R() < 0.35 ? 'je' : 'ej') : it.k === 'idiom' ? A().idiomQ(it.g, it.w, R() < 0.5 ? 'ex' : 'ja') : A().clozeQ(it.g, it.w, it.i);
        return { q: q, it: it };
      });
    } finally { Math.random = orig; }
    QC = { key: key, qs: qs };
    return qs;
  }
  function qPts(ms, limit, streak) { return Math.round(1000 * (1 - Math.min(1, ms / limit) / 2)) + Math.min(5, streak) * 100; }
  function qLong(q) { return q.opts.some(function (o) { return String(o).length > 14; }); }
  function qStem(x) { var q = x.q; return '<p class="bt-qlab">' + esc(q.label) + '</p><div class="bt-qprompt">' + q.prompt + '</div>'; }

  /* =========================================================
     ランキングの 表（先生・生徒 共通）
     ========================================================= */
  function playersOf(room, round) {
    var ps = room && room.players || {};
    return Object.keys(ps).map(function (k) { var p = ps[k]; p.id = k; return p; })
      .filter(function (p) { return p && p.n && (round == null || p.r === round); })
      .sort(function (a, b) { return round == null ? (b.b || 0) - (a.b || 0) : (b.s || 0) - (a.s || 0); });
  }
  function rowData(list, mode, top) {
    if (!top) top = Math.max(1, list.reduce(function (m, p) { return Math.max(m, mode === 'best' ? p.b || 0 : p.s || 0); }, 0));
    var rank = 0, last = -1;
    return list.map(function (p, i) {
      var v = mode === 'best' ? p.b || 0 : p.s || 0;
      if (v !== last) { rank = i + 1; last = v; }
      return { p: p, v: v, rank: rank, top: rank <= 3 && v > 0, medal: rank <= 3 && v > 0 ? ['🥇', '🥈', '🥉'][rank - 1] : rank, pct: (v / top * 100).toFixed(1) };
    });
  }
  function rankOf(lst, id) { var d = rowData(lst, 'now').filter(function (x) { return x.p.id === id; })[0]; return d ? d.rank : 0; }
  function cut(list, n) { return list.length <= n ? list : list.slice(0, n); }
  function nmHTML(d, mode) { return esc(d.p.n) + (mode !== 'best' && d.p.k >= 10 ? ' <i class="fire">🔥' + d.p.k + '</i>' : ''); }
  /* 広さ（W×H）を 測って、入る 列数・行数・文字の 大きさを きめる（40 人でも スクロールなし） */
  function rows(list, mode, W, Hh, hid) {
    var top = Math.max(1, list.reduce(function (m, p) { return Math.max(m, mode === 'best' ? p.b || 0 : p.s || 0); }, 0));
    var n = list.length + (hid ? 1 : 0), cols = n <= 10 ? 1 : n <= 24 ? 2 : 3, rowsN = n, more = 0, style = '';
    if (W && Hh) {
      var maxRows = Math.max(1, Math.floor(Hh / 24)), roomy = Math.max(1, Math.floor(Hh / 44));
      cols = Math.max(1, Math.min(3, Math.floor(W / 230), Math.ceil(n / roomy)));
      rowsN = Math.ceil(n / cols);
      if (rowsN > maxRows) { rowsN = maxRows; more = list.length - (cols * rowsN - 1); list = list.slice(0, cols * rowsN - 1); }
      rowsN = Math.max(Math.min(8, maxRows), rowsN);
      var fs = Math.max(11, Math.min(26, Hh / rowsN * 0.55));
      style = ' style="grid-template-columns:repeat(' + cols + ',minmax(0,1fr));grid-template-rows:repeat(' + rowsN + ',minmax(0,1fr));font-size:' + fs.toFixed(1) + 'px"';
    }
    return '<ol class="bt-rk"' + style + '>' +
      rowData(list, mode, top).map(function (d) {
        return '<li data-id="' + esc(d.p.id) + '" class="' + (d.top ? 'top top' + d.rank : '') + (d.p.id === pid() ? ' me' : '') + '"><span class="rn">' + d.medal + '</span><span class="nm">' + nmHTML(d, mode) + '</span>' +
          '<span class="bar"><i style="width:' + d.pct + '%"></i></span><span class="sc">' + fmt(d.v) + '</span></li>';
      }).join('') + (more || hid ? '<li class="more">…ほか ' + ((more || 0) + (hid || 0)) + ' 人' + (hid ? '（順位は 自分の 画面で）' : '') + '</li>' : '') + '</ol>';
  }
  function patchRows(bb, list, mode) {
    rowData(list, mode).forEach(function (d) {
      var li = bb.querySelector('li[data-id="' + (window.CSS && CSS.escape ? CSS.escape(d.p.id) : d.p.id) + '"]'); if (!li) return;
      var sc = li.querySelector('.sc'), t = fmt(d.v);
      if (sc.textContent !== t) { sc.textContent = t; li.classList.remove('up'); void li.offsetWidth; li.classList.add('up'); }
      li.querySelector('.bar i').style.width = d.pct + '%';
      li.querySelector('.nm').innerHTML = nmHTML(d, mode);
      li.querySelector('.rn').innerHTML = d.medal;
      li.classList.remove('top', 'top1', 'top2', 'top3'); if (d.top) li.classList.add('top', 'top' + d.rank);
    });
  }
  function flip(bb, old) { // 順位が 入れかわったら 行が すべって 動く
    bb.querySelectorAll('li[data-id]').forEach(function (li) {
      var o = old[li.dataset.id]; if (!o) { li.classList.add('enter'); return; }
      var n = li.getBoundingClientRect(), dx = o.left - n.left, dy = o.top - n.top;
      if (!dx && !dy) return;
      li.style.transition = 'none'; li.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      requestAnimationFrame(function () { requestAnimationFrame(function () { li.style.transition = 'transform .55s cubic-bezier(.2,.8,.2,1)'; li.style.transform = ''; }); });
    });
  }
  function banner(text, cls) {
    var b = document.createElement('div'); b.className = 'bt-banner ' + (cls || ''); b.textContent = text;
    document.body.appendChild(b); setTimeout(function () { b.remove(); }, 2200);
  }
  function hueOf(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return h; }

  /* =========================================================
     画面の入れもの（先生・生徒の 部屋）と ダイアログ
     ========================================================= */
  var H = null, B = null;
  function overlay() {
    var o = $('#bt');
    if (!o) { o = document.createElement('div'); o.id = 'bt'; o.className = 'bt'; document.body.appendChild(o); }
    o.hidden = false; document.body.classList.add('bt-on');
    return o;
  }
  function closeOverlay() { var o = $('#bt'); if (o) o.remove(); document.body.classList.remove('bt-on'); }
  var dlg = null;
  function dlgOpen(html) {
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.className = 'bt-dlg'; dlg.innerHTML = '<div id="btdlgIn"></div>';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', function (e) {
        if (e.target === dlg) { dlg.close(); return; }
        var b = e.target.closest('button'); if (!b) return;
        if (b.hasAttribute('data-x')) dlg.close();
        else if (b.dataset.hs) hostSetClick(b.dataset.hs);
      });
    }
    $('#btdlgIn').innerHTML = html; if (!dlg.open) dlg.showModal();
  }
  function leave() {
    if (window.EKGAME && EKGAME.playing()) EKGAME.quit();
    if ($('#btshow')) closeShow();
    if (H) { clearInterval(H.timer); if (H.stop) H.stop(); H = null; }
    if (B) { if (B.stop) B.stop(); clearTimeout(B.push); clearInterval(B.qzT); B = null; }
    if (dlg && dlg.open) dlg.close();
    closeOverlay();
  }
  function route(p) {
    var h = p[0] || '', m;
    if (h === 'battle') { leave(); renderHub(''); return true; }
    if ((m = h.match(/^join(?:=(\d*))?(?:&db=(.+))?$/))) { leave(); if (m[2]) { S().db = decodeURIComponent(m[2]); save(); } renderHub(m[1] || ''); return true; }
    if (h === 'host' && /^\d{4}$/.test(p[1] || '')) { leave(); if (!base()) { renderHub(''); return true; } openHost(p[1]); return true; }
    if (h === 'room' && /^\d{4}$/.test(p[1] || '')) { if (B && B.code === p[1]) return true; leave(); if (!base()) { renderHub(''); return true; } openBattle(p[1]); return true; }
    leave();
    return false;
  }

  /* =========================================================
     ハブ（先生：部屋を つくる／生徒：部屋に 入る）
     ========================================================= */
  function renderHub(code) {
    var s = S(), ok = !!base(), rooms = (s.hostRooms || []).slice().reverse();
    var html = '<h2>🏆 クラス対戦</h2><p class="sub">クラスみんなで いっせいに 遊ぶ。先生の 大画面に ランキングが 出ます（部屋番号は 4 けた）。</p>' +
      (ok ? '' : '<div class="card bt-warn">⚠️ データベースが 未設定です。先生は 下の「⚙ データベース」を 設定してください（生徒は 先生の QR・リンクから 入れば 設定は いりません）。</div>') +
      '<div class="bt-hub">' +
      '<section class="card bt-hp"><h3>👩‍🏫 先生：部屋を つくる</h3>' +
      '<p class="note">プロジェクターに 映して 使います。QR コードで 生徒が 参加します。</p>' +
      '<div class="btns"><button class="btn main grow" data-bt="mk:race"' + (ok ? '' : ' disabled') + '>🚀 ロケット対戦の 部屋</button></div>' +
      '<div class="btns"><button class="btn grow" data-bt="mk:quiz"' + (ok ? '' : ' disabled') + '>🎯 クイズ大会の 部屋</button></div>' +
      (rooms.length ? rooms.map(function (c) { return '<div class="btns"><button class="btn ghost grow" data-bt="hback:' + c + '">↩ 部屋 ' + c + ' に もどる</button></div>'; }).join('') : '') +
      '</section>' +
      '<section class="card bt-hp"><h3>🧑‍🎓 生徒：部屋に 入る</h3>' +
      '<div class="bt-fld"><input type="text" id="jCode" class="bt-bigin" inputmode="numeric" maxlength="4" value="' + esc(code || '') + '" placeholder="0000" aria-label="部屋番号"></div>' +
      '<div class="bt-fld"><input type="text" id="jName" maxlength="10" placeholder="ニックネーム（10文字まで）" value="' + esc(s.nick || '') + '" aria-label="ニックネーム"></div>' +
      '<p class="note">本名ではなく ニックネームで OK。ランキングに 出ます。</p>' +
      '<div class="btns"><button class="btn main grow" data-bt="join"' + (ok ? '' : ' disabled') + '>参加する ▶</button></div>' +
      '</section></div>' +
      '<details class="bt-db"><summary>⚙ データベース（先生が 1 回だけ）</summary>' +
      '<div class="bt-fld"><input type="text" id="dbUrl" placeholder="https://〇〇-default-rtdb.〇〇.firebasedatabase.app" value="' + esc(s.db || '') + '"><button class="btn" data-bt="dbtest">保存して 接続テスト</button></div>' +
      '<p class="note">' + (window.EK_CONFIG && EK_CONFIG.db ? 'js/config.js に 設定ずみです（ここが 空なら そちらを 使います）。' : '作り方は README の「クラス対戦の 準備」を 見てください。') + '</p></details>';
    A().view('🏆 クラス対戦', html, null, '#/');
    if (code) { var n = $('#jName'); if (n && !n.value) n.focus(); }
  }
  function dbTest() {
    var s = S(); s.db = $('#dbUrl').value.trim().replace(/\/+$/, ''); save();
    if (!base()) { toast('https:// で はじまる URL を 入れてください'); return; }
    var k = 'rooms/ping_' + pid();
    api('PUT', k, { t: { '.sv': 'timestamp' } }).then(function () { return api('DELETE', k); })
      .then(function () { toast('✅ つながりました'); renderHub(''); }, function (e) { toast('✕ つながりません（' + e.message + '）'); });
  }
  function join() {
    var code = ($('#jCode').value || '').replace(/\D/g, ''), name = ($('#jName').value || '').trim().slice(0, 10);
    if (code.length !== 4) { toast('部屋番号は 4 けたです'); return; }
    if (!name) { toast('ニックネームを 入れてください'); return; }
    var s = S(); s.nick = name; save();
    var me = rpath(code) + '/players/' + pid();
    api('GET', rpath(code) + '/state').then(function (st) {
      if (!st) throw new Error('nf');
      return api('GET', me);
    }).then(function (old) {
      return api('PATCH', me, { n: name, s: old && old.s || 0, b: old && old.b || 0, r: old && old.r || 0, k: 0 });
    }).then(function () { return syncClock(code); }).then(function () {
      location.hash = '#/room/' + code;
    }).catch(function (e) { toast(e.message === 'nf' ? '部屋 ' + code + ' が 見つかりません' : 'つながりません（' + e.message + '）'); });
  }

  /* =========================================================
     先生：部屋
     ========================================================= */
  function makeRoom(kind) {
    var cfg = { kind: kind, g: S().lastGrade || 'p2', m: 'mix', t: 60, top: 10 };
    if (kind === 'quiz') { cfg.qn = 10; cfg.qt = 20; }
    var tryOne = function (n) {
      var code = String(1000 + Math.floor(Math.random() * 9000));
      return api('GET', rpath(code)).then(function (v) {
        if (v && n < 6) return tryOne(n + 1);
        return api('PUT', rpath(code), { cfg: cfg, state: 'lobby', round: 0, seed: 0, startAt: 0, host: pid(), created: { '.sv': 'timestamp' } })
          .then(function () { var s = S(); s.hostRooms = (s.hostRooms || []).concat(code).slice(-5); save(); location.hash = '#/host/' + code; });
      });
    };
    tryOne(0).catch(function (e) { toast('部屋を つくれませんでした（' + e.message + '）。データベースを たしかめてください'); });
  }
  function openHost(code) {
    H = { code: code, room: null, tab: 'now', ending: false, timer: null, stop: null };
    var o = overlay();
    o.innerHTML = '<button class="bt-x" data-bt="exit" title="この画面を とじる（部屋は のこります）" aria-label="とじる">✕</button><div class="bt-host"><aside class="bt-panel bt-hl" id="bthl"></aside><section class="bt-panel bt-board" id="btboard"><div class="bt-count"><b>…</b></div></section></div>';
    syncClock(code).then(function () {
      if (!H || H.code !== code) return;
      H.stop = listen(rpath(code), function (room) {
        if (!H) return;
        if (!room) { var sv = S(); sv.hostRooms = (sv.hostRooms || []).filter(function (c) { return c !== code; }); save(); toast('この部屋は 閉じられました'); location.hash = '#/battle'; return; }
        var first = !H.room, prev = H.st; H.room = room; H.st = room.state + '|' + room.round;
        if (!first && prev && prev !== H.st && prev.split('|')[1] === String(room.round) && room.state === 'end') setTimeout(function () { if (H && H.room) showPodium(H.room); }, 300);
        drawHostL(!first);
        drawBoard();
      });
      H.timer = setInterval(function () {
        if (!H || !H.room) return;
        var r = H.room;
        if (!isQuiz(r.cfg) && r.state === 'play' && now() > r.startAt + r.cfg.t * 1000 + 2500 && !H.ending) {
          H.ending = true; api('PATCH', rpath(code), { state: 'end' }).then(function () { H && (H.ending = false); }, function () { H && (H.ending = false); });
        }
        if (r.state === 'play') drawBoard();
        if (isQuiz(r.cfg)) quizTick();
      }, 250);
    });
  }
  function drawHostL(soft) {
    var r = H.room, el = $('#bthl'); if (!el) return;
    var cfg = r.cfg, qz = isQuiz(cfg), busy = r.state === 'play' || (qz && /^(q|reveal|board)$/.test(r.state));
    var n = playersOf(r).length;
    var qrOld = soft && $('#btqr') ? $('#btqr').innerHTML : '';
    el.innerHTML =
      '<div class="bt-roomhd"><small>部屋番号</small><div class="bt-code">' + H.code + '</div></div>' +
      '<div class="bt-qr" id="btqr">' + qrOld + '</div>' +
      '<p class="note bt-joinhow">QR を 読みとる か、英検ラボ →「🏆 クラス対戦」→ 部屋番号と ニックネーム →「参加する」</p>' +
      '<div class="bt-hsum">' +
      (qz ? '<p><span>🎯</span><b>クイズ大会・' + qN(cfg) + ' 問・1 問 ' + qT(cfg) + ' 秒</b></p>' : '<p><span>⏱</span><b>' + esc(tName(cfg.t)) + '</b></p>') +
      '<p><span>📚</span><b>' + esc(cfgName(cfg)) + '</b></p>' +
      '<p><span>🏆</span><b>' + esc((TOPS.filter(function (t) { return t[0] === (cfg.top === 0 ? 0 : (+cfg.top || 10)); })[0] || TOPS[2])[1]) + ' を 映す</b></p>' +
      '<button type="button" class="btn bt-setbtn" data-bt="hset"' + (busy ? ' disabled' : '') + '>⚙ 出題の 設定（遊び方・級・時間・映す人数）</button>' +
      '</div>' +
      '<div class="bt-hbtns"><span class="bt-ppl">👥 <b>' + n + '</b> 人</span>' +
      (qz && busy ? '<span class="bt-busy">🎯 クイズ中（第 ' + ((r.qi || 0) + 1) + ' 問 / ' + qN(cfg) + '）</span>' : '<button type="button" class="btn main big" data-bt="hstart"' + (busy ? ' disabled' : '') + '>' + (qz ? (r.round ? '▶ もう一度 クイズ' : '▶ クイズ スタート') : r.round ? '▶ 第' + (r.round + 1) + '回戦 スタート' : '▶ スタート') + '</button>') + '</div>' +
      '<div class="bt-hbtns sm"><button type="button" class="btn ghost" data-bt="hcopy">🔗 参加リンクを コピー</button><button type="button" class="btn ghost" data-bt="hclose">部屋を 閉じる</button></div>';
    if (!qrOld) drawQR(joinUrl(H.code));
  }
  var qrLib = null;
  function drawQR(url) {
    var put = function () {
      var el = $('#btqr'); if (!el || !window.qrcode) return;
      var q = window.qrcode(0, 'M'); q.addData(url); q.make();
      el.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    };
    if (window.qrcode) { put(); return; }
    if (!qrLib) { qrLib = document.createElement('script'); qrLib.src = 'js/vendor/qrcode.js'; document.head.appendChild(qrLib); } // qrcode-generator 1.4.4（MIT）
    qrLib.addEventListener('load', put);
  }
  function hostCfg(v) {
    var i = v.indexOf(':'), key = v.slice(0, i), raw = v.slice(i + 1), o = {};
    if (key === 'g') { // 級は いくつでも えらべる（ON/OFF）。かならず 1 つは のこす
      var cur = gradesOf(H.room.cfg), idx = cur.indexOf(raw);
      if (idx >= 0) { if (cur.length === 1) return; cur.splice(idx, 1); } else cur.push(raw);
      var order = A().ORDER; cur.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
      o.g = cur.join(','); S().lastGrade = o.g; save();
    } else if (key === 'kind' || key === 'm') o[key] = raw;
    else o[key] = +raw;
    var old = {}; Object.keys(o).forEach(function (k) { old[k] = H.room.cfg[k]; H.room.cfg[k] = o[k]; if (k === 'kind' && o[k] === 'quiz') { H.room.cfg.qn = H.room.cfg.qn || 10; H.room.cfg.qt = H.room.cfg.qt || 20; o.qn = H.room.cfg.qn; o.qt = H.room.cfg.qt; } });
    api('PATCH', rpath(H.code) + '/cfg', o).catch(function () {
      if (!H || !H.room) return; Object.keys(old).forEach(function (k) { H.room.cfg[k] = old[k]; });
      toast('変更できませんでした。電波を たしかめて もう一度'); drawHostL(true); if (dlg && dlg.open) openHostSet();
    });
    if (dlg && dlg.open) openHostSet();
    drawHostL(true);
  }
  function openHostSet() {
    if (!H || !H.room) return;
    var cfg = H.room.cfg, qz = isQuiz(cfg), gs = gradesOf(cfg), n = poolAll(cfg).length;
    var seg = function (key, opts, cur) {
      return '<div class="seg">' + opts.map(function (o) { return '<button type="button" data-hs="' + key + ':' + o[0] + '" aria-pressed="' + (String(cur) === String(o[0])) + '">' + o[1] + '</button>'; }).join('') + '</div>';
    };
    dlgOpen('<div class="bt-dh"><h2>⚙ 出題の 設定</h2><button type="button" class="btn ghost" data-x>✕ とじる</button></div>' +
      '<div class="bt-dbody">' +
      '<div class="bt-hrow"><span class="hl">🎮 遊び方</span>' + seg('kind', KINDS, qz ? 'quiz' : 'race') + '</div>' +
      (qz ? '<div class="bt-hrow"><span class="hl">❓ 問題数</span>' + seg('qn', QNS, qN(cfg)) + '</div><div class="bt-hrow"><span class="hl">⏱ 1 問の 時間</span>' + seg('qt', QTS, qT(cfg)) + '</div>'
        : '<div class="bt-hrow"><span class="hl">⏱ 時間</span>' + seg('t', TIMES, cfg.t) + '</div>') +
      '<div class="bt-hrow"><span class="hl">📚 級</span><div class="seg">' + A().grades().map(function (g) { return '<button type="button" data-hs="g:' + g.id + '" aria-pressed="' + (gs.indexOf(g.id) >= 0) + '">' + g.name + '</button>'; }).join('') + '</div></div>' +
      '<div class="bt-hrow"><span class="hl">📖 出す問題</span>' + seg('m', TYPES, cfg.m || 'mix') + '</div>' +
      '<div class="bt-hrow"><span class="hl">🏆 映す人数</span><div class="bt-hcol">' + seg('top', TOPS, cfg.top === 0 ? 0 : (+cfg.top || 10)) + '<span class="note">大画面の ランキングに 出す 人数。自分の 順位は 生徒の 画面に いつも 出ます</span></div></div>' +
      '<div class="bt-dfoot"><span>出題される 問題：<b>' + n + '</b></span><button type="button" class="btn main" data-x>決定 ▶</button></div></div>');
  }
  function hostSetClick(v) { if (H) hostCfg(v); }
  function hostStart() {
    var r = H.room; if (!r || r.state === 'play') return;
    if (!poolAll(r.cfg).length) { toast('問題が ありません。級を えらんでください'); return; }
    if (isQuiz(r.cfg)) { if (!/^(q|reveal|board)$/.test(r.state)) quizStart(); return; }
    api('PATCH', rpath(H.code), { state: 'play', round: (r.round || 0) + 1, seed: Math.floor(Math.random() * 1e9), startAt: Math.round(now() + 5000), sig: sigOf(r.cfg), stat: null })
      .catch(function () { toast('スタートできませんでした'); });
  }
  function drawBoard() {
    var el = $('#btboard'), r = H && H.room; if (!el || !r) return;
    if (isQuiz(r.cfg) && /^(q|reveal|board)$/.test(r.state) && H.tab === 'now') { H.bkey = ''; drawQuizBoard(el, r); return; }
    el.classList.remove('quiz', 'open'); H.qkey = '';
    var t = now(), head, body, bl, lst = null, lmode = 'now', hid = 0;
    var tabs = '<div class="bt-tabs"><button type="button" data-bt="tab:now" aria-selected="' + (H.tab === 'now') + '">今回</button><button type="button" data-bt="tab:best" aria-selected="' + (H.tab === 'best') + '">🏆 ハイスコア</button></div>';
    if (H.tab === 'best') {
      head = '<div class="bt-bhead"><b>🏆 この 部屋の ハイスコア</b>' + tabs + '</div>';
      bl = playersOf(r).filter(function (p) { return p.b > 0; });
      if (bl.length) { lst = cut(bl, topN(r.cfg)); hid = bl.length - lst.length; lmode = 'best'; } else body = '<div class="bt-count"><small>まだ 記録が ありません</small></div>';
    } else if (r.state === 'lobby' || !r.round) {
      var ps = playersOf(r), seen = H.seen || (H.seen = {});
      if (ps.length > (H.lastN || 0) && H.lastN != null) FX('pop');
      H.lastN = ps.length;
      head = '<div class="bt-bhead"><b>' + (ps.length ? '👥 <span class="bt-bign">' + ps.length + '</span> 人 参加中！' : '参加者を 待っています') + '</b>' + tabs + '</div>';
      body = ps.length ? '<div class="bt-chips">' + ps.map(function (p) {
        var nw = !seen[p.id]; seen[p.id] = 1;
        return '<button type="button" class="bt-chip' + (nw ? ' new' : '') + '" style="--h:' + hueOf(p.n) + '" data-kick="' + esc(p.id) + '" title="タップで この人を 部屋から はずす">' + esc(p.n) + '</button>';
      }).join('') + '</div><p class="note bt-kicknote">ふさわしくない 名前は タップで 部屋から はずせます</p>'
        : '<div class="bt-count"><b class="bt-wave">👋</b><small>生徒が 入ってくると ここに 名前が 出ます</small></div>';
      body = '<div class="bt-howjoin"><span>📱 英検ラボ →「🏆 クラス対戦」→ 部屋番号</span><b>' + H.code + '</b><span>→ ニックネーム →「参加する」（左の QR でも OK）</span></div>' + body +
        '<p class="note bt-rangeinfo">' + (isQuiz(r.cfg) ? '🎯 クイズ大会・' + qN(r.cfg) + ' 問・1 問 ' + qT(r.cfg) + ' 秒・' : '🚀 ロケット対戦・' + esc(tName(r.cfg.t)) + '・') + esc(cfgName(r.cfg)) + '</p>';
    } else if (r.state === 'play' && t < r.startAt) {
      var cn = Math.max(1, Math.ceil((r.startAt - t) / 1000));
      if (cn !== H.cdN) { H.cdN = cn; if (cn <= 3) FX('beep'); }
      head = '<div class="bt-bhead"><b>第' + r.round + '回戦　' + esc(cfgName(r.cfg)) + '</b>' + tabs + '</div>';
      body = '<div class="bt-count"><b class="cd" data-n="' + cn + '">' + cn + '</b><small>まもなく スタート！</small></div>';
    } else {
      lst = playersOf(r, r.round);
      var all = lst.length; lst = cut(lst, topN(r.cfg)); hid = all - lst.length;
      var end = r.state === 'end', left = Math.max(0, r.startAt + r.cfg.t * 1000 - t);
      head = '<div class="bt-bhead"><b>' + (end ? '🎉 ' + roundName(r) + ' 結果発表' : '⏱ 残り ' + Math.ceil(left / 1000) + ' 秒') + '</b>' + tabs + '</div>' +
        (end ? '' : '<div class="bt-tbar host"><i style="width:' + (left / (r.cfg.t * 1000) * 100) + '%"' + (left < 10000 ? ' class="hurry"' : '') + '></i></div>');
      if (end && lst[0] && lst[0].s > 0) head += '<div class="bt-champ">👑 ' + esc(lst[0].n) + ' さん　' + fmt(lst[0].s) + ' 点 <button type="button" class="btn ghost" data-bt="podium">🎉 表彰式を もう一度</button>' +
        (isQuiz(r.cfg) && r.stat ? '<button type="button" class="btn ghost" data-bt="qstat">📊 問題ごとの 正答率</button>' : '') +
        '<button type="button" class="btn ghost" data-bt="hcsv">📋 結果を コピー</button></div>';
      if (!lst.length) { lst = null; body = '<div class="bt-count"><small>まだ だれも 答えていません</small></div>'; }
    }
    if (r.state === 'play' && t >= r.startAt && H.goR !== r.round) { H.goR = r.round; FX('go'); banner('スタート！', 'go'); }
    if (r.state === 'play' && t >= r.startAt + r.cfg.t * 1000 && H.whR !== r.round) { H.whR = r.round; FX('whistle'); banner('そこまで！', 'stop'); }
    var key = H.tab + '|' + r.state + '|' + r.round + '|' + hid + '|' + (lst ? lst.map(function (p) { return p.id; }).join(',') : body);
    var bb = el.querySelector('.bt-bbody');
    if (H.bkey === key && bb) {
      var bh = el.querySelector('.bt-bh'); if (bh && bh.innerHTML !== head) bh.innerHTML = head;
      if (lst) patchRows(bb, lst, lmode);
      return;
    }
    var old = {};
    if (bb) bb.querySelectorAll('li[data-id]').forEach(function (li) { old[li.dataset.id] = li.getBoundingClientRect(); });
    el.innerHTML = '<div class="bt-bh">' + head + '</div><div class="bt-bbody">' + (lst ? '' : body) + '</div>';
    if (lst) { bb = el.querySelector('.bt-bbody'); bb.innerHTML = rows(lst, lmode, bb.clientWidth, bb.clientHeight, hid); if (H.bkey && H.bkey.split('|')[1] === r.state) flip(bb, old); }
    H.bkey = key;
    if (r.state === 'play' && H.tab === 'now' && lst && lst[0] && lst[0].s > 0) { // トップ交代
      if (H.leader && H.leader !== lst[0].id && (!lst[1] || lst[1].s < lst[0].s)) { banner('👑 トップ交代！ ' + lst[0].n + ' さん', 'lead'); FX('lead'); }
      H.leader = lst[0].id;
    }
  }

  /* ---------- 表彰式 ---------- */
  function showPodium(room) {
    var lst = playersOf(room, room.round).filter(function (p) { return p.s > 0; }).slice(0, 3);
    if (!lst.length) return;
    closeShow();
    var pd = function (p, k) {
      if (!p) return '<div class="pd p' + k + ' empty"></div>';
      return '<div class="pd p' + k + '">' + (k === 1 ? '<div class="crown">👑</div>' : '') +
        '<div class="who"><span class="medal">' + ['', '🥇', '🥈', '🥉'][k] + '</span><b style="--len:' + Math.max(3, Array.from(p.n).length) + '">' + esc(p.n) + '</b>' +
        '<small><span class="cnt" data-to="' + p.s + '">' + (k === 1 ? '0' : fmt(p.s)) + '</span> 点</small></div>' +
        '<div class="block"><span>' + k + '</span></div></div>';
    };
    var d = document.createElement('div'); d.className = 'bt-show'; d.id = 'btshow';
    d.innerHTML = '<div class="rays"></div><div class="showin">' +
      '<p class="stitle">🎉 ' + roundName(room) + ' 結果発表</p><p class="drum">ドゥルルルル…</p>' +
      '<div class="podium">' + pd(lst[1], 2) + pd(lst[0], 1) + pd(lst[2], 3) + '</div>' +
      '<div class="sbtns"><button type="button" class="btn" data-sh="close">ランキングを 見る ▶</button></div></div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) { if (e.target.closest('[data-sh=close]')) closeShow(); });
    var T = H.showT = [], at = function (ms, fn) { T.push(setTimeout(fn, ms)); };
    FX('drum', 2.4);
    at(2500, function () { d.classList.add('s3'); if (lst[2]) FX('medal'); });
    at(3700, function () { d.classList.add('s2'); if (lst[1]) FX('medal'); });
    at(4900, function () { d.classList.add('dark'); });
    at(6100, function () {
      d.classList.add('s1'); FX('fanfare');
      if (window.LXFX) { LXFX.rain(8); LXFX.burst(180, innerWidth / 2, innerHeight * 0.45); }
      countUp(d.querySelector('.p1 .cnt'), 1400);
    });
    at(7600, function () { d.classList.add('done'); });
  }
  function closeShow() {
    var d = $('#btshow'); if (d) d.remove();
    if (H && H.showT) H.showT.forEach(clearTimeout);
    if (window.LXFX) LXFX.stop();
  }
  function countUp(el, ms) {
    if (!el) return;
    var to = +el.dataset.to, t0 = Date.now();
    (function f() { var k = Math.min(1, (Date.now() - t0) / ms); el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })();
  }
  function copyResult() {
    var r = H && H.room; if (!r) return;
    var lst = playersOf(r, r.round), qz = isQuiz(r.cfg);
    var txt = ['順位\t名前\t点数\t' + (qz ? '正解数' : '正解数')].concat(rowData(lst, 'now').map(function (d) { var n = String(d.p.n).replace(/[\t\r\n]/g, ' '); if (/^[=+\-@]/.test(n)) n = "'" + n; return d.rank + '\t' + n + '\t' + (d.p.s || 0) + '\t' + (d.p.w || 0); })).join('\n');
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast('結果を コピーしました（Excel・スプレッドシートに 貼れます）'); }, function () { toast('コピーできませんでした'); });
    else toast('コピーできませんでした');
  }

  /* =========================================================
     生徒：参加 → ロケット対戦
     ========================================================= */
  function openBattle(code) {
    B = { code: code, room: null, played: 0, last: 0, push: null, awarded: {} };
    overlay().innerHTML = '<div class="bt-stu" id="btstu"></div>';
    drawWait();
    syncClock(code).then(function () {
      if (!B || B.code !== code) return;
      B.stop = listen(rpath(code), onRoom);
    });
  }
  function onRoom(room) {
    if (!B) return;
    if (!room) { toast('先生が 部屋を 閉じました'); location.hash = '#/battle'; return; }
    B.room = room;
    var me = room.players && room.players[pid()];
    if (!me) { if (B.played || B.seen) toast('部屋から はずれました。ニックネームを 入れ直して 参加してね'); location.hash = '#/join=' + B.code; return; }
    B.seen = 1;
    if (isQuiz(room.cfg) && /^(q|reveal|board)$/.test(room.state) && room.round) { quizStudent(room); return; }
    clearInterval(B.qzT);
    if (room.state === 'play' && room.round !== B.played && now() < room.startAt + room.cfg.t * 1000 - 3000) {
      if (room.sig && room.sig !== sigOf(room.cfg)) { toast('先生と アプリの 内容が ちがいます。ページを 再読み込みして もう一度 入ってね'); return; }
      B.played = room.round;
      startRace(room);
      return;
    }
    if (room.state === 'end' && B.played === room.round && !B.awarded[room.round]) {
      B.awarded[room.round] = 1;
      var lst = playersOf(room, room.round), my = lst.map(function (p) { return p.id; }).indexOf(pid()), myRank = rankOf(lst, pid());
      setTimeout(function () {
        if (!window.LXFX || !B) return;
        if (my === 0 && lst[0].s > 0) { FX('fanfare'); LXFX.rain(5); LXFX.burst(120); }
        else if (my > 0 && myRank <= 3 && lst[my].s > 0) { FX('medal'); LXFX.burst(60); }
        else FX('pop');
      }, 400);
    }
    if (!window.EKGAME || !EKGAME.playing()) drawWait();
    else rankChip(room);
  }
  function startRace(room) {
    var o = $('#bt'); if (o) o.hidden = true;
    var pools = poolsOf(room.cfg);
    EKGAME.startBattle({
      mode: room.cfg.m || 'mix', pools: pools, seed: room.seed, dur: room.cfg.t, startAt: room.startAt, endAt: room.startAt + room.cfg.t * 1000, now: now,
      onScore: function (G, fin) { pushScore(G, fin); },
      onEnd: function (G) { clearTimeout(B && B.push); pushScore(G, true); var oo = $('#bt'); if (oo) oo.hidden = false; setTimeout(drawWait, 300); },
      onQuit: function () { location.hash = '#/battle'; }
    });
    api('PATCH', rpath(B.code) + '/players/' + pid(), { s: 0, k: 0, w: 0, r: room.round, d: 0 }).catch(function () { });
    rankChip(room);
  }
  function rankChip(room) {
    if (!window.EKGAME || !EKGAME.playing()) return;
    var lst = playersOf(room, room.round), rk = rankOf(lst, pid());
    EKGAME.setRank('<small>いま</small><b>' + (rk || '－') + '</b><small>位 / ' + lst.length + '人</small>');
  }
  function pushScore(G, final) {
    if (!G || !B) return;
    var t = Date.now();
    if (!final && t - B.last < 600) { clearTimeout(B.push); B.push = setTimeout(function () { pushScore(G); }, 650); return; }
    B.last = t;
    var me = B.room && B.room.players && B.room.players[pid()] || {};
    api('PATCH', rpath(B.code) + '/players/' + pid(), { s: G.score, k: G.combo, w: G.ok, r: B.played, b: Math.max(me.b || 0, G.score), d: final ? 1 : 0 }).catch(function () { });
  }
  function drawWait() {
    if (!B) return;
    var room = B.room, el = $('#btstu'); if (!el) return;
    var head = '<div class="bt-ubar"><button type="button" class="btn ghost" data-bt="bleave">◀ ぬける</button><div class="bt-ut"><small>クラス対戦</small><b>🏆 部屋 ' + B.code + '</b></div><span class="bt-ppl">👥 ' + (room ? playersOf(room).length : 0) + ' 人</span></div><section class="bt-ucard">';
    var tail = '</section>', mid;
    if (!room) mid = '<p class="bt-h">つないでいます…</p>';
    else if (room.state === 'play' && room.round !== B.played) mid = '<p class="bt-h">いま 第' + room.round + '回戦の 最中です</p><p class="note">次の 回から 参加できます。少し 待ってね</p>';
    else if (B.played && room.round === B.played) {
      var lst = playersOf(room, room.round), my = lst.map(function (p) { return p.id; }).indexOf(pid()), meP = lst[my] || {};
      var fin = room.state === 'end';
      var rk = rankOf(lst, pid()) || my + 1, show = cut(lst, Math.min(topN(room.cfg) || 5, 5)).slice(0, 5);
      var mine = show.some(function (p) { return p.id === pid(); }) ? '' : '<ol class="bt-rk mine"><li class="me"><span class="rn">' + rk + '</span><span class="nm">' + esc(meP.n || S().nick || '') + '</span><span class="bar"><i style="width:' + ((meP.s || 0) / Math.max(1, (lst[0] || {}).s || 1) * 100).toFixed(1) + '%"></i></span><span class="sc">' + fmt(meP.s || 0) + '</span></li></ol>';
      var win = fin && rk === 1 && (meP.s || 0) > 0, med = fin && rk <= 3 && (meP.s || 0) > 0;
      mid = '<p class="note">' + roundName(room) + ' ' + (fin ? '結果' : '（集計中… みんなが 終わるのを 待っています）') + '</p>' +
        (win ? '<div class="bt-winner"><span class="crown">👑</span><b>優勝！</b></div>' : med ? '<div class="bt-winner m' + rk + '"><span class="crown">' + ['', '🥇', '🥈', '🥉'][rk] + '</span><b>' + (rk === 2 ? '準優勝！' : 'メダル獲得！') + '</b></div>' : fin ? '<p class="bt-h">おつかれさま！</p>' : '') +
        '<div class="bt-score' + (win ? ' gold' : '') + '">' + rk + '<small> 位 / ' + lst.length + ' 人</small></div>' +
        '<p class="bt-tstats">' + fmt(meP.s || 0) + ' 点　' + (isQuiz(room.cfg) ? '⭕ ' + (meP.w || 0) + ' 問 正解' : '✅ ' + (meP.w || 0) + ' 問 正解') + '</p>' +
        rows(show, 'now') + mine + (fin ? quizMissed(room) : '') +
        '<p class="note">' + (fin ? '先生が 次の スタートを おすと 始まります' : '') + '</p>';
    } else mid = '<div class="bt-stamp">参加中</div><p class="bt-h">' + esc(S().nick || '') + ' さん、ようこそ！</p><p class="note">' + (isQuiz(room.cfg) ? '🎯 クイズ大会：先生の 大画面に 問題が 出たら、手元の 4 色の ボタンで 答えよう。早く 正解するほど 高得点！' : '先生が スタートを おすと 3・2・1 で 全員 いっせいに 始まります。1〜4 キーでも 答えられます。') + '</p>' +
      '<div class="bt-chips small">' + playersOf(room).slice(0, 40).map(function (p) { return '<span class="bt-chip' + (p.id === pid() ? ' me' : '') + '">' + esc(p.n) + '</span>'; }).join('') + '</div>';
    el.innerHTML = head + mid + tail;
  }

  /* =========================================================
     🎯 クイズ大会（先生ペースの 早押し 4 択）
     ========================================================= */
  function qRead() { return QREAD + 500; }
  function qAnswered(room) { return playersOf(room, room.round).filter(function (p) { return p.a && p.a.q === room.qi; }); }
  function quizStart() {
    var r = H.room; if (!poolAll(r.cfg).length) { toast('問題が ありません'); return; }
    H.rk0 = {};
    api('PATCH', rpath(H.code), { state: 'q', round: (r.round || 0) + 1, seed: Math.floor(Math.random() * 1e9), qi: 0, stat: null, sig: sigOf(r.cfg), qAt: Math.round(now() + qRead() + 2000) })
      .catch(function () { toast('スタートできませんでした'); });
  }
  function quizNext() {
    var r = H.room; if (!r || H.qbusy) return;
    var o = r.state === 'q' ? { state: 'reveal' }
      : r.state === 'reveal' ? { state: 'board' }
      : r.qi + 1 >= qN(r.cfg) ? { state: 'end' }
      : { state: 'q', qi: r.qi + 1, qAt: Math.round(now() + qRead()) };
    if (o.state === 'board') { var ans = qAnswered(r); o['stat/' + r.qi] = { ok: ans.filter(function (p) { return p.a.ok; }).length, n: playersOf(r, r.round).length }; }
    H.qbusy = true;
    api('PATCH', rpath(H.code), o).then(function () { H && (H.qbusy = false); }, function () { H && (H.qbusy = false); toast('つながりません'); });
  }
  function quizTick() {
    var r = H.room; if (r.state !== 'q') return;
    var n = playersOf(r, r.round).length, done = qAnswered(r).length;
    if (now() > r.qAt + qT(r.cfg) * 1000 + 600 || (n && done >= n && now() > r.qAt)) quizNext();
    else drawBoard();
  }
  function quizStat() {
    var r = H && H.room; if (!r || !r.stat) return;
    var qs = quizQs(r.cfg, r.seed), st = r.stat;
    var list = qs.map(function (x, i) { var y = st[i]; return y && y.n ? { i: i, x: x, pc: Math.round(y.ok / y.n * 100) } : null; }).filter(Boolean);
    dlgOpen('<div class="bt-dh"><h2>📊 問題ごとの 正答率</h2><button type="button" class="btn ghost" data-x>✕ とじる</button></div>' +
      '<div class="bt-dbody bt-qstat"><p class="note">正答率が 低い 問題は、授業で もう一度 ふれると 効果的です（赤：50% 未満）</p><ol>' +
      list.map(function (d) {
        var w = d.x.it.w, nm = d.x.it.k === 'cloze' ? (w.q || '').replace(/\(\s*\)/, '（　）') : w.en;
        return '<li class="' + (d.pc < 50 ? 'lo' : d.pc < 80 ? 'mid' : 'hi') + '"><span class="no">' + (d.i + 1) + '</span><span class="tx"><b>' + esc(nm) + '</b><small>' + esc(d.x.q.label) + '</small></span><span class="pc"><i style="width:' + d.pc + '%"></i><b>' + d.pc + '%</b></span></li>';
      }).join('') + '</ol></div>');
  }
  function markMoves(bb, ps, fresh) {
    var now0 = {}; rowData(ps, 'now').forEach(function (d) { now0[d.p.id] = d.rank; });
    H.rk0 = H.rk0 || {};
    if (fresh) { H.rkShow = H.rk0; H.rk0 = now0; }
    bb.querySelectorAll('li[data-id]').forEach(function (li) {
      var a = H.rkShow && H.rkShow[li.dataset.id], b = now0[li.dataset.id];
      if (a && b && a !== b) li.querySelector('.nm').insertAdjacentHTML('beforeend', ' <i class="' + (b < a ? 'rup' : 'rdn') + '">' + (b < a ? '▲' : '▼') + Math.abs(a - b) + '</i>');
    });
  }
  function drawQuizBoard(el, r) {
    var x = quizQs(r.cfg, r.seed)[r.qi], t = now(), key = r.state + '|' + r.round + '|' + r.qi;
    if (!x) return;
    var q = x.q, ps = playersOf(r, r.round), ans = qAnswered(r), lim = qT(r.cfg) * 1000;
    if (H.qkey === key && r.state === 'q') { // 時計と 回答数だけ 書きかえる
      var left = Math.max(0, r.qAt + lim - t), tf = $('#qzt'), tn = $('#qzs'), an = $('#qzn');
      if (tf) tf.style.width = (t < r.qAt ? 100 : left / lim * 100).toFixed(1) + '%';
      var sec = Math.ceil(left / 1000);
      if (tn) tn.textContent = t < r.qAt ? 'よーい…' : sec;
      if (t >= r.qAt && sec <= 3 && sec > 0 && H.qsec !== key + sec) { H.qsec = key + sec; FX('beep'); }
      if (tf) tf.classList.toggle('hurry', t >= r.qAt && sec <= 5);
      if (an) an.textContent = ans.length + ' / ' + ps.length;
      if (t >= r.qAt && H.qgo !== key) { H.qgo = key; FX('go'); el.classList.add('open'); }
      return;
    }
    if (H.qkey === key && r.state === 'reveal' && H.qrevN === ans.length) return;
    H.qrevN = ans.length;
    if (H.qkey === key && r.state === 'board' && el.querySelector('.bt-qzrk')) {
      var bb0 = el.querySelector('.bt-qzrk'), lst0 = cut(ps, topN(r.cfg));
      bb0.innerHTML = rows(lst0, 'now', bb0.clientWidth, bb0.clientHeight, ps.length - lst0.length); markMoves(bb0, ps, false);
      return;
    }
    var fresh = H.qkey !== key;
    var head = '<div class="bt-bhead"><b>🎯 第 ' + (r.qi + 1) + ' 問 <small>/ ' + qN(r.cfg) + '</small></b>', body;
    if (r.state === 'board') {
      var all = ps.length, lst = cut(ps, topN(r.cfg));
      head += '<span class="bt-qzsub">ランキング</span></div>';
      body = '<div class="bt-bbody bt-qzrk"></div><div class="bt-qzfoot"><button type="button" class="btn main big" data-bt="qnext">' + (r.qi + 1 >= qN(r.cfg) ? '🏆 結果発表 ▶' : '▶ 次の問題') + '</button></div>';
      el.innerHTML = '<div class="bt-bh">' + head + '</div>' + body;
      var bb = el.querySelector('.bt-bbody');
      bb.innerHTML = lst.length ? rows(lst, 'now', bb.clientWidth, bb.clientHeight, all - lst.length) : '<div class="bt-count"><small>まだ だれも 答えていません</small></div>';
      markMoves(bb, ps, fresh);
    } else {
      var rev = r.state === 'reveal', cnt = [0, 0, 0, 0];
      ans.forEach(function (p) { if (p.a.c >= 0 && p.a.c < 4) cnt[p.a.c]++; });
      var mx = Math.max(1, Math.max.apply(null, cnt)), okN = ans.filter(function (p) { return p.a.ok; }).length;
      head += rev ? '<span class="bt-qzsub">正解 <b>' + okN + '</b> 人 / ' + ps.length + ' 人</span></div>'
        : '<span class="bt-qzsub">回答 <b id="qzn">' + ans.length + ' / ' + ps.length + '</b></span><span class="bt-qzsec" id="qzs">' + (t < r.qAt ? 'よーい…' : Math.ceil(lim / 1000)) + '</span></div>' +
          '<div class="bt-tbar host"><i id="qzt" style="width:100%"></i></div>';
      body = '<div class="bt-qzq">' + qStem(x) + '</div>' +
        '<div class="bt-qzopts' + (qLong(q) ? ' long' : '') + (rev ? ' rev' : '') + '">' + q.opts.map(function (o, i) {
          return '<div class="bt-qo ' + QCOL[i][1] + (rev ? (i === q.a ? ' ok' : ' no') : '') + '"><span class="sh">' + QCOL[i][0] + '</span><span class="tx">' + esc(o) + '</span>' +
            (rev ? '<span class="ct"><i style="width:' + (cnt[i] / mx * 100).toFixed(0) + '%"></i><b>' + cnt[i] + '</b></span>' + (i === q.a ? '<span class="ck">✓</span>' : '') : '') + '</div>';
        }).join('') + '</div>' +
        (rev ? '<div class="bt-qzwhy">' + (q.recap || '') + '</div><div class="bt-qzfoot">' + (x.it.k === 'cloze' ? '' : '<button type="button" class="btn ghost" data-bt="qsay">🔊 英語を 聞く</button>') + '<button type="button" class="btn main big" data-bt="qnext">ランキング ▶</button></div>'
          : '<div class="bt-qzfoot"><button type="button" class="btn ghost" data-bt="qnext">⏭ しめきる</button></div>');
      el.innerHTML = '<div class="bt-bh">' + head + '</div>' + body;
      if (rev && fresh) FX('lead'); else if (t >= r.qAt) el.classList.add('open');
    }
    el.classList.toggle('quiz', true); if (r.state !== 'q') el.classList.remove('open');
    H.qkey = key;
  }
  /* ----- 生徒 ----- */
  function quizStudent(room) {
    var Z = B.qz;
    if (!Z || Z.round !== room.round) {
      var me0 = room.players && room.players[pid()] || {};
      if (window.EKGAME && EKGAME.playing()) EKGAME.quit();
      Z = B.qz = { round: room.round, s: 0, k: 0, got: {}, ok: 0 };
      B.played = room.round; B.qzKey = '';
      if (me0.r === room.round) { // 読みこみ直し：つづきから
        Z.s = me0.s || 0; Z.k = me0.k || 0; Z.ok = me0.w || 0;
        var hh = me0.h || {}; Object.keys(hh).forEach(function (i) { if (hh[i] != null) Z.got[i] = { c: -1, ok: !!hh[i], p: 0 }; });
        if (me0.a && me0.a.q === room.qi) Z.got[room.qi] = { c: me0.a.c, ok: !!me0.a.ok, p: me0.a.p || 0 };
      } else api('PATCH', rpath(B.code) + '/players/' + pid(), { s: 0, k: 0, r: room.round, a: null, h: null, w: 0, d: 0 }).catch(function () { });
    }
    if (room.sig && room.sig !== sigOf(room.cfg)) { $('#btstu').innerHTML = '<section class="bt-ucard"><p class="bt-h">先生と アプリの 内容が ちがいます</p><p class="note">ページを 再読み込みして、もう一度 部屋に 入ってください。</p></section>'; return; }
    if (room.state !== 'q' && !Z.got[room.qi]) qMiss(room);
    var x = quizQs(room.cfg, room.seed)[room.qi]; if (!x) return;
    var q = x.q, mine = Z.got[room.qi], lim = qT(room.cfg) * 1000;
    var lst = playersOf(room, room.round), rk = rankOf(lst, pid()) || lst.length;
    var key = room.state + '|' + room.round + '|' + room.qi + '|' + !!mine;
    if (B.qzKey === key && $('.bt-qzs')) {
      var e1 = $('#qzrk'), e2 = $('#qzrn'); if (e1) e1.textContent = rk; if (e2) e2.textContent = lst.length;
      return;
    }
    B.qzKey = key;
    clearInterval(B.qzT);
    var head = '<div class="bt-ubar"><button type="button" class="btn ghost" data-bt="bleave">◀ ぬける</button><div class="bt-ut"><small>🎯 クイズ大会・部屋 ' + B.code + '</small><b>第 ' + (room.qi + 1) + ' 問 / ' + qN(room.cfg) + '</b></div><span class="bt-ppl"><b>' + fmt(Z.s) + '</b> 点</span></div><section class="bt-ucard bt-qzs">';
    var mid;
    if (room.state === 'q' && !mine) {
      var open = now() >= room.qAt;
      mid = '<div class="bt-tbar"><i id="qzt" style="width:100%"></i><span id="qzs"></span></div>' +
        '<div class="bt-qzq">' + qStem(x) + '</div>' +
        '<div class="bt-qzbtns' + (qLong(q) ? ' long' : '') + '">' + q.opts.map(function (o, i) {
          return '<button type="button" class="bt-qb ' + QCOL[i][1] + '" data-qa="' + i + '"' + (open ? '' : ' disabled') + '><span class="sh">' + QCOL[i][0] + '</span><span class="tx">' + esc(o) + '</span></button>';
        }).join('') + '</div>';
      B.qzT = setInterval(function () {
        var t = now(), tf = $('#qzt'), ts = $('#qzs'); if (!tf) { clearInterval(B.qzT); return; }
        if (t < room.qAt) { ts.textContent = 'よーい…'; return; }
        if (!B.qzOpen || B.qzOpen !== room.qi + '|' + room.round) { B.qzOpen = room.qi + '|' + room.round; FX('go'); document.querySelectorAll('.bt-qb').forEach(function (b) { b.disabled = false; }); }
        var left = Math.max(0, room.qAt + lim - t); tf.style.width = (left / lim * 100).toFixed(1) + '%'; ts.textContent = Math.ceil(left / 1000) + ' 秒';
        if (!left) { clearInterval(B.qzT); qMiss(room); quizStudent(room); }
      }, 100);
    } else if (room.state === 'q') {
      var cc = mine.c;
      mid = '<div class="bt-qzwait"><span class="bt-qb big ' + (cc >= 0 ? QCOL[cc][1] : 'none') + '"><span class="sh">' + (cc >= 0 ? QCOL[cc][0] : '⌛') + '</span></span>' +
        '<p class="bt-h">' + (cc !== -1 ? '回答しました！' : '時間切れ…') + '</p><p class="note">先生の 画面で 答え合わせを 待っています</p></div>';
    } else if (room.state === 'reveal') {
      var ok = mine && mine.ok, awk = B.code + '|' + room.round + '|' + room.qi;
      if (Z.shown !== awk) { Z.shown = awk; FX(ok ? 'ok' : 'miss'); if (ok && window.LXFX) LXFX.burst(40); }
      mid = '<div class="bt-qzres ' + (ok ? 'ok' : 'ng') + '"><b class="mk">' + (ok ? '⭕ 正解！' : mine && mine.c !== -1 ? '❌ ざんねん' : '⌛ 時間切れ') + '</b>' +
        (ok ? '<p class="pt">+' + fmt(mine.p) + ' 点' + (Z.k >= 2 ? '　<span class="fire">🔥 ' + Z.k + ' 連続</span>' : '') + '</p>' : '') +
        (!ok && mine && mine.c >= 0 ? '<p class="mine">あなたの 答え：' + QCOL[mine.c][0] + ' ' + esc(q.opts[mine.c]) + '</p><p class="note">正しい 答え ↓</p>' : '') +
        '<p class="ans"><span class="sh ' + QCOL[q.a][1] + '">' + QCOL[q.a][0] + '</span> ' + esc(q.opts[q.a]) + '</p>' +
        '<div class="bt-qzwhy sm">' + (q.recap || '') + '</div>' +
        '<p class="rkline"><small>いま</small><b id="qzrk">' + rk + '</b><small>位 / <span id="qzrn">' + lst.length + '</span> 人</small></p></div>';
    } else {
      mid = '<div class="bt-qzres"><p class="rkline big"><small>いま</small><b id="qzrk">' + rk + '</b><small>位 / <span id="qzrn">' + lst.length + '</span> 人</small></p><p class="pt">' + fmt(Z.s) + ' 点</p><p class="note">次の 問題を 待っています</p></div>';
    }
    $('#btstu').innerHTML = head + mid + '</section>';
  }
  function quizMissed(room) {
    if (!isQuiz(room.cfg) || !B || !B.qz || B.qz.round !== room.round) return '';
    var qs = quizQs(room.cfg, room.seed), miss = Object.keys(B.qz.got).filter(function (i) { return !B.qz.got[i].ok && qs[i]; });
    if (!miss.length) return B.qz.ok >= qN(room.cfg) ? '<p class="bt-qmiss ok">🎉 全問 正解！</p>' : '';
    return '<div class="bt-qmiss"><b>📝 まちがえた 問題（' + miss.length + '）</b>' + miss.slice(0, 3).map(function (i) {
      return '<p>' + qs[i].q.recap + '</p>';
    }).join('') + (miss.length > 3 ? '<small>ほか ' + (miss.length - 3) + ' 問</small>' : '') + '</div>';
  }
  function qMiss(room) {
    var Z = B.qz; if (!Z || Z.got[room.qi]) return;
    Z.got[room.qi] = { c: -1, ok: false, p: 0 }; Z.k = 0;
    var o = { k: 0, a: { q: room.qi, c: -1, ok: 0, p: 0 } }; o['h/' + room.qi] = 0;
    api('PATCH', rpath(B.code) + '/players/' + pid(), o).catch(function () { });
  }
  function quizAnswer(i) {
    var room = B && B.room; if (!room || room.state !== 'q' || !B.qz) return;
    var Z = B.qz, t = now() - room.qAt, lim = qT(room.cfg) * 1000;
    if (Z.got[room.qi] || t < 0 || t > lim + 300) return;
    var x = quizQs(room.cfg, room.seed)[room.qi], q = x.q;
    var ok = i === q.a, p = ok ? qPts(t, lim, Z.k) : 0;
    if (!ok && q.id) A().mark(q.id, false); // まちがえた 問題は 復習に 入る
    Z.k = ok ? Z.k + 1 : 0; Z.s += p; if (ok) Z.ok++;
    Z.got[room.qi] = { c: i, ok: ok, p: p };
    FX('tap', 0);
    var me = room.players && room.players[pid()] || {};
    var body = { s: Z.s, k: Z.k, r: room.round, b: Math.max(me.b || 0, Z.s), w: Z.ok, a: { q: room.qi, c: i, ok: ok ? 1 : 0, p: p } }, path = rpath(B.code) + '/players/' + pid();
    body['h/' + room.qi] = ok ? 1 : 0;
    api('PATCH', path, body).catch(function () { setTimeout(function () { api('PATCH', path, body).catch(function () { toast('答えを 送れませんでした。電波を たしかめてね'); }); }, 800); });
    quizStudent(room);
  }

  /* =========================================================
     操作
     ========================================================= */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) return;
    var d = b.dataset;
    if (d.qa != null && B) { quizAnswer(+d.qa); return; }
    if (d.kick && H) {
      var kp = H.room && H.room.players && H.room.players[d.kick];
      if (kp && confirm('「' + kp.n + '」さんを 部屋から はずしますか？（その生徒は 名前を 入れ直して 入れます）')) api('DELETE', rpath(H.code) + '/players/' + d.kick).catch(function () { toast('はずせませんでした'); });
      return;
    }
    if (!d.bt) return;
    var k = d.bt.split(':')[0], v = d.bt.split(':')[1];
    switch (k) {
      case 'mk': makeRoom(v); break;
      case 'hback': location.hash = '#/host/' + v; break;
      case 'join': join(); break;
      case 'dbtest': dbTest(); break;
      case 'exit': location.hash = '#/battle'; break;
      case 'hset': openHostSet(); break;
      case 'hstart': hostStart(); break;
      case 'qnext': quizNext(); break;
      case 'qstat': quizStat(); break;
      case 'qsay': { b.blur(); var rq = H && H.room, qq = rq && quizQs(rq.cfg, rq.seed)[rq.qi]; if (qq && qq.it.k !== 'cloze') A().speak(qq.it.w.en); break; }
      case 'hcsv': copyResult(); break;
      case 'tab': H.tab = v; drawBoard(); break;
      case 'podium': if (H && H.room) showPodium(H.room); break;
      case 'hcopy': {
        var u = joinUrl(H.code);
        if (navigator.clipboard) navigator.clipboard.writeText(u).then(function () { toast('参加リンクを コピーしました'); }, function () { toast(u); }); else toast(u);
        break;
      }
      case 'hclose':
        if (confirm('部屋 ' + H.code + ' を 閉じますか？（ランキングも 消えます）')) { var c = H.code, sv = S(); sv.hostRooms = (sv.hostRooms || []).filter(function (x) { return x !== c; }); save(); leave(); api('DELETE', rpath(c)).then(function () { location.hash = '#/battle'; }, function () { location.hash = '#/battle'; }); }
        break;
      case 'bleave': location.hash = '#/battle'; break;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && $('#btshow')) closeShow();
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName || '')) { if (e.key === 'Enter' && (e.target.id === 'jName' || e.target.id === 'jCode')) join(); return; }
    // 生徒：クイズは 1〜4 キー
    if (B && B.qz && (!window.EKGAME || !EKGAME.playing()) && /^[1-4]$/.test(e.key) && $('.bt-qb:not([disabled])')) { quizAnswer(+e.key - 1); return; }
    // 先生：クイズは → ・スペース・PageDown（プレゼン用リモコンも）で 次へ
    if (!H || !H.room || !isQuiz(H.room.cfg) || (dlg && dlg.open) || $('#btshow')) return;
    if (e.target.tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return;
    if (/^(q|reveal|board)$/.test(H.room.state) && (e.key === 'PageDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter')) {
      if (H.room.state === 'q' && now() < H.room.qAt) return;
      e.preventDefault(); quizNext();
    }
  });

  window.EKBATTLE = { route: route, leave: leave, _H: function () { return H; }, _B: function () { return B; }, _q: function () { var r = B && B.room; return r && isQuiz(r.cfg) ? quizQs(r.cfg, r.seed)[r.qi] : null; } };
})();
