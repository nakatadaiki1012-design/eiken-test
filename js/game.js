/* 英検ラボ：🚀 英単語ロケット（ひとりで遊ぶ タイムアタック）
   ・正解するたびに ロケットが 上がる（点数 ＝ 高度）。論理表現ラボの 英文ロケットと 同じ 景色・効果音
   ・燃料（時間）は 60 秒から。コンボ中の 正解で ふえ、ミスで へる。40 秒をすぎると 減りが 速くなる
   ・まちがえた 問題は 少しあとに もう一度 出る ＋ 復習に入る。終わったら コアの意味で ふり返り */
(function () {
  'use strict';
  var A = function () { return window.EKAPP; };
  function $(s) { return document.querySelector(s); }
  function esc(s) { return A().esc(s); }
  function FX(n, a) { if (window.LXFX) LXFX.play(n, a); }
  function fmt(n) { return Math.round(n).toLocaleString('ja-JP'); }

  var MODES = [
    { id: 'word', ic: '📘', name: '単語ロケット', desc: '英語 → 意味。コンボ 10 からは 意味 → 英語 も まざる', pts: 50, plus: 0.35 },
    { id: 'idiom', ic: '📗', name: '熟語ロケット', desc: '熟語の意味 と 例文の（　）', pts: 60, plus: 0.45 },
    { id: 'cloze', ic: '✏️', name: '穴うめロケット', desc: '大問1 と 同じ 4 択。1 問の 点数が 大きい', pts: 110, plus: 1.0 },
    { id: 'mix', ic: '🌈', name: 'ミックス', desc: '単語・熟語・穴うめ が まざって 出る', pts: 0, plus: 0 }
  ];
  var KIND = { word: { pts: 50, plus: 0.35 }, idiom: { pts: 60, plus: 0.45 }, cloze: { pts: 110, plus: 1.0 } };
  var RULE = { start: 60, calm: 40, ramp: 70, cap: 3, miss: 2, fever: 15, feverSec: 7, hints: 3, missWait: 1800 };
  /* 高度の めじるし：[この点数で 到達, 高さ(km), 絵, 名前]（scene.js の 景色と 同じ ならび） */
  var SKY = [[0, 0, '🛫', '発射台'], [150, 0.333, '🗼', '東京タワー'], [400, 0.634, '🏙', 'スカイツリー'], [900, 3.776, '🗻', '富士山'],
    [1600, 10, '✈️', '飛行機の高さ'], [2500, 20, '🌤', '成層圏'], [4000, 100, '🌌', '宇宙の入口'], [6500, 400, '🛰', '宇宙ステーション'],
    [11000, 384400, '🌕', '月'], [17000, 78000000, '🔴', '火星'], [26000, 630000000, '🟠', '木星'], [38000, 1280000000, '🪐', '土星'],
    [55000, 2700000000, '🔵', '天王星'], [75000, 4300000000, '🌀', '海王星'], [100000, 24000000000, '🛸', '太陽系の外'],
    [140000, 2.46e17, '🌌', '天の川銀河の中心'], [200000, 2.37e19, '🌀', 'アンドロメダ銀河'], [300000, 1.3e23, '✨', '宇宙の果て']];
  function altOf(score) {
    var i = 0; while (i + 1 < SKY.length && score >= SKY[i + 1][0]) i++;
    var a = SKY[i], b = SKY[i + 1], f = b ? (score - a[0]) / (b[0] - a[0]) : 0;
    return { i: i, here: a, next: b || null, pct: b ? f * 100 : 100, km: b ? a[1] + (b[1] - a[1]) * f : a[1] };
  }
  function fmtKm(km) {
    if (km < 1) return Math.round(km * 1000) + ' m';
    if (km < 1000) return (km < 100 ? km.toFixed(1) : Math.round(km)) + ' km';
    if (km < 1e8) return (km < 1e5 ? fmt(km) : fmt(Math.round(km / 1e4)) + '万') + ' km';
    if (km < 1e12) return (km < 1e10 ? (km / 1e8).toFixed(1) : fmt(Math.round(km / 1e8))) + '億 km';
    var ly = km / 9.461e12;
    if (ly < 1e4) return fmt(ly) + ' 光年';
    if (ly < 1e8) return fmt(Math.round(ly / 1e4)) + '万 光年';
    return fmt(Math.round(ly / 1e8)) + '億 光年';
  }

  var G = null;
  function fever() { return G && G.feverUntil > Date.now(); }
  function mult() { var m = G.combo >= 50 ? 3 : G.combo >= 25 ? 2 : G.combo >= 10 ? 1.5 : 1; return m * (fever() ? 2 : 1); }
  function speedNow() { var el = (G.played) / 1000; return Math.min(RULE.cap, 1 + Math.max(0, el - RULE.calm) / RULE.ramp); }
  function bestKey(g, m) { return g.id + ':' + m; }

  // ---------- メニュー ----------
  function menu(g) {
    var S = A().S(), best = S.best || {};
    var html = '<h2>🚀 英単語ロケット</h2><p class="sub">' + g.name + ' の 問題を どんどん 正解して、ロケットを 宇宙へ 飛ばそう。正解するほど 高く 上がります。</p>' +
      MODES.map(function (m) {
        var b = best[bestKey(g, m.id)];
        return '<button class="row" data-rk="' + m.id + '"><span style="font-size:26px">' + m.ic + '</span><span class="t"><b>' + m.name + '</b><small>' + esc(m.desc) + '</small></span>' +
          (b ? '<span class="best"><small>ベスト</small>' + altOf(b.score).here[2] + ' ' + fmt(b.score) + '</span>' : '') + '</button>';
      }).join('') +
      '<h3>あそび方</h3><div class="card"><ul class="miss">' +
      '<li>⛽ 燃料（時間）は 60 秒。<b>コンボ 5 以上</b>で 正解すると 燃料が ふえます。ミスは コンボが 切れて −2 秒。</li>' +
      '<li>🔥 正解で メーターが たまり、満タンで <b>BOOST!!</b>（7 秒間 点数 ×2）。</li>' +
      '<li>🔗 コンボ 10 で ×1.5、25 で ×2、50 で ×3。</li>' +
      '<li>💡 ヒントは 1 回の ゲームで 3 回まで（選択肢を 2 つに しぼる。その問題の 点数は 半分）。</li>' +
      '<li>✕ まちがえた 問題は 少しあとに もう一度 出て、「🔁 復習」にも 入ります。終わったら 🧠 コアの意味で ふり返り。</li>' +
      '<li>⌨️ パソコンでは 1〜4 キーで 答え、H で ヒント。</li></ul></div>' +
      '<div class="btns"><label class="sfx"><input type="checkbox" id="sfx"' + (A().sfx() ? ' checked' : '') + '> 🔊 効果音</label></div>';
    A().view('🚀 ロケット ' + g.name, html, g.color, '#/' + g.id);
    G = null; menu.g = g;
  }

  // ---------- 問題を えらぶ ----------
  function poolOf(g, kind) {
    if (kind === 'word') return g.d.words.map(function (w) { return { k: 'word', w: w }; });
    if (kind === 'idiom') return g.d.idioms.map(function (w) { return { k: 'idiom', w: w }; });
    return g.d.cloze.map(function (o, i) { return { k: 'cloze', w: o, i: i }; });
  }
  function nextItem() {
    // まちがえた 問題は 4 問あとに もう一度
    for (var r = 0; r < G.retry.length; r++) if (G.retry[r].at <= G.n) return G.retry.splice(r, 1)[0].it;
    var kind = G.mode;
    if (kind === 'mix') { var x = Math.random(); kind = x < 0.45 ? 'word' : x < 0.7 ? 'idiom' : 'cloze'; if (!G.pools[kind].length) kind = 'word'; }
    var p = G.pools[kind], it;
    if (!p.items.length) p.items = A().shuffle(p.all);
    it = p.items.pop();
    return it;
  }
  function makeQ(it) {
    var g = G.g;
    if (it.k === 'word') return A().wordQ(g, it.w, G.combo >= 10 && Math.random() < 0.4 ? 'je' : 'ej');
    if (it.k === 'idiom') return A().idiomQ(g, it.w, Math.random() < 0.5 ? 'ex' : 'ja');
    return A().clozeQ(g, it.w, it.i);
  }

  // ---------- ゲーム ----------
  function start(g, mode) {
    quit();
    var pools = {};
    ['word', 'idiom', 'cloze'].forEach(function (k) { var all = poolOf(g, k); pools[k] = { all: all, items: A().shuffle(all) }; pools[k].length = all.length; });
    if (mode !== 'mix' && !pools[mode].all.length) { A().toast('問題が ありません'); return; }
    G = { g: g, mode: mode, pools: pools, retry: [], n: 0, score: 0, combo: 0, maxCombo: 0, ok: 0, miss: 0, meter: 0, feverUntil: 0,
      left: RULE.start * 1000, played: 0, last: 0, hints: RULE.hints, missed: [], missedIds: {}, startAt: 0, over: false, pauseUntil: 0, lastSky: 0 };
    var el = document.createElement('div'); el.className = 'rk c-' + g.color; el.id = 'rk';
    el.innerHTML = '<div class="rk-in">' +
      '<div class="hud"><button class="btn ghost" data-rkq title="やめる" aria-label="やめる">✕</button>' +
      '<div class="tbar" id="tbar"><i id="tfill"></i><span id="tsec"></span></div>' +
      '<div class="hc" id="hcombo"></div><div class="hs"><small>' + esc(MODES.filter(function (m) { return m.id === mode; })[0].name) + '</small><b id="hscore">0</b></div></div>' +
      '<div class="hud2"><span class="mlab">🔥</span><div class="meter2"><i id="hmeter"></i><span id="hmtext"></span></div><span class="spd" id="hspd"></span><span class="altv" id="halt">🛫 0 m</span></div>' +
      '<div class="sky sky0" id="sky"><span class="here" id="skyh"></span><span class="track"><i id="skyt"></i><span class="rkt" id="skyr">🚀</span></span><span class="nxt" id="skyn"></span></div>' +
      '<div class="rk-card" id="rkc"><div class="count" id="count">3</div></div>' +
      '<div class="rk-opts" id="rko"></div>' +
      '<div class="rk-foot"><button class="hintb" type="button" data-rkh id="rkh">💡 ヒント ×' + G.hints + '</button></div>' +
      '</div>';
    document.body.appendChild(el); document.body.classList.add('rk-on');
    if (window.LXSCENE) LXSCENE.start(el, function () {
      if (!G) return null;
      var al = altOf(G.score);
      return { level: al.i + (al.next ? al.pct / 100 : 0), combo: G.combo, boost: fever(), started: G.startAt && !G.over };
    });
    if (window.LXFX) LXFX.unlock();
    // 3・2・1
    var c = 3; FX('beep');
    G.cd = setInterval(function () {
      c--;
      if (c > 0) { $('#count').textContent = c; FX('beep'); return; }
      clearInterval(G.cd); FX('go');
      var r = $('#rkc').getBoundingClientRect();
      if (window.LXFX) LXFX.pop('LIFT OFF!', r.left + r.width / 2, r.top + r.height * 0.4, 'go');
      G.startAt = Date.now(); G.last = performance.now();
      ask();
      G.raf = requestAnimationFrame(tick);
    }, 750);
    drawHud();
  }
  function ask() {
    G.it = nextItem(); G.q = makeQ(G.it); G.n++; G.answered = false; G.usedHint = false;
    var q = G.q;
    $('#rkc').innerHTML = '<div class="qkind">' + esc(q.label) + (q.say ? ' ' + A().sayBtn(q.say) : '') + '</div>' + q.prompt;
    $('#rkc').classList.remove('slidein'); void $('#rkc').offsetWidth; $('#rkc').classList.add('slidein');
    $('#rko').className = 'rk-opts' + (q.en ? ' en' : '') + (q.opts.some(function (o) { return o.length > 22; }) ? ' one' : '');
    $('#rko').innerHTML = q.opts.map(function (o, k) { return '<button class="opt' + (q.en ? ' en-opt' : '') + '" data-rka="' + k + '"><span class="n">' + (k + 1) + '</span><span>' + esc(o) + '</span></button>'; }).join('');
    $('#rkh').disabled = G.hints <= 0;
  }
  function tick(now) {
    if (!G || G.over) return;
    G.raf = requestAnimationFrame(tick);
    var dt = Math.min(100, now - G.last); G.last = now;
    if (document.hidden || Date.now() < G.pauseUntil) { drawHud(); return; }
    G.played += dt;
    G.left -= dt * speedNow();
    if (G.left <= 0) { G.left = 0; drawHud(); return finish(); }
    drawHud();
  }
  function drawHud() {
    if (!G) return;
    var sec = G.left / 1000, al = altOf(G.score);
    $('#tfill').style.width = Math.min(100, sec / RULE.start * 100) + '%';
    $('#tfill').className = sec < 10 ? 'hurry' : '';
    $('#tbar').classList.toggle('hurry', sec < 10);
    $('#tsec').textContent = '⛽ ' + sec.toFixed(1) + ' 秒';
    $('#hscore').textContent = fmt(G.score);
    $('#hcombo').innerHTML = G.combo >= 2 ? '<b>' + G.combo + '</b> COMBO' + (mult() > 1 ? '<i>×' + mult() + '</i>' : '') : '';
    var f = fever();
    $('#hmeter').style.width = (f ? (G.feverUntil - Date.now()) / (RULE.feverSec * 1000) * 100 : G.meter * 100) + '%';
    $('#hmtext').textContent = f ? '🚀 BOOST ×2' : 'BOOST まで ' + Math.max(0, Math.ceil((1 - G.meter) * RULE.fever)) + ' 問';
    var sp = speedNow(); $('#hspd').textContent = sp > 1.05 ? '⏩×' + sp.toFixed(1) : ''; $('#hspd').classList.toggle('fast', sp > 1.8);
    $('#halt').textContent = al.here[2] + ' ' + fmtKm(al.km);
    $('#skyh').textContent = al.here[2] + ' ' + al.here[3];
    $('#skyn').textContent = al.next ? '→ ' + al.next[2] + ' ' + al.next[3] : '🏁';
    $('#skyt').style.width = al.pct + '%'; $('#skyr').style.left = al.pct + '%';
    $('#sky').className = 'sky sky' + Math.min(8, Math.floor(al.i / 2));
    var rk = $('#rk'); rk.classList.toggle('space', al.i >= 6); rk.classList.toggle('boost', f);
  }
  function answer(k) {
    if (!G || G.answered || !G.startAt || G.over) return;
    var btns = document.querySelectorAll('#rko .opt'), el = btns[k];
    if (!el || el.disabled) return; // ヒントで 消した選択肢は えらべない
    G.answered = true;
    var q = G.q, ok = k === q.a;
    btns.forEach(function (b, n) { b.disabled = true; if (n === q.a) b.classList.add('ok'); else if (n === k) b.classList.add('ng'); });
    if (ok) {
      G.combo++; G.ok++; G.maxCombo = Math.max(G.maxCombo, G.combo);
      var kd = KIND[G.it.k], p = Math.round(kd.pts * mult() * (G.usedHint ? 0.5 : 1));
      var before = altOf(G.score).i;
      G.score += p;
      FX('tap', G.combo); if (window.LXFX) { LXFX.sparks(el, Math.min(30, 6 + G.combo)); LXFX.popAt(el, '+' + p); }
      if (G.combo >= 5) { // コンボ中は 燃料が ふえる
        var add = kd.plus * (G.combo >= 20 ? 2 : 1); G.left = Math.min(G.left + add * 1000, 99000);
        if (window.LXFX) LXFX.popAt($('#tbar'), '+' + add.toFixed(1) + '秒', 'tplus');
      }
      if (!fever()) { G.meter += 1 / RULE.fever; if (G.meter >= 1) { G.meter = 0; G.feverUntil = Date.now() + RULE.feverSec * 1000; boostPop(); } }
      if ([10, 25, 50, 100].indexOf(G.combo) >= 0) comboPop(true); else if (G.combo === 5) comboPop(false);
      var after = altOf(G.score);
      if (after.i > before) setTimeout(function () { if (!G) return; var r = $('#rkc').getBoundingClientRect(); if (window.LXFX) LXFX.pop(after.here[2] + ' ' + after.here[3] + ' 突破！', r.left + r.width / 2, r.top + r.height / 2, 'big'); FX('lead'); }, 200);
      setTimeout(function () { if (G && !G.over) ask(); }, 260);
    } else {
      G.combo = 0; G.miss++; G.left -= RULE.miss * 1000; G.meter = Math.max(0, G.meter - 0.25);
      FX('miss'); if (window.LXFX) LXFX.popAt($('#tbar'), '−' + RULE.miss + '秒', 'tminus');
      $('#rkc').classList.add('shake');
      if (G.q.id) A().mark(G.q.id, false);
      if (!G.missedIds[G.q.id || G.n]) { G.missedIds[G.q.id || G.n] = 1; G.missed.push(G.q); }
      G.retry.push({ it: G.it, at: G.n + 4 });
      // 正解と コアの意味を 少し見せる（その間 燃料は 止まる）
      var c = G.it.k === 'cloze' ? null : G.g.core[G.it.w.en];
      var line = G.it.k === 'cloze' ? ((G.g.d.clozeHelp[G.it.i] || {}).think || G.it.w.why) : c ? c.core : G.it.w.ja;
      var tip = document.createElement('div'); tip.className = 'rk-miss';
      tip.innerHTML = '<b>正解：<span class="en">' + esc(q.opts[q.a]) + '</span></b><span>🧠 ' + esc(line) + '</span><small>タップで つぎへ</small>';
      $('#rkc').appendChild(tip);
      G.pauseUntil = Date.now() + RULE.missWait;
      G.missT = setTimeout(missNext, RULE.missWait);
      if (G.left <= 0) { G.left = 0; }
    }
    drawHud();
  }
  function missNext() {
    if (!G || G.over || !G.answered) return;
    clearTimeout(G.missT); G.pauseUntil = 0;
    $('#rkc').classList.remove('shake');
    if (G.left <= 0) return finish();
    ask();
  }
  function useHint() {
    if (!G || G.answered || G.hints <= 0 || G.usedHint || !G.startAt) return;
    G.hints--; G.usedHint = true;
    var q = G.q, wrong = [0, 1, 2, 3].filter(function (n) { return n !== q.a; }), out = A().shuffle(wrong).slice(0, 2);
    document.querySelectorAll('#rko .opt').forEach(function (b, n) { if (out.indexOf(n) >= 0) { b.disabled = true; b.classList.add('gone'); } });
    $('#rkh').textContent = '💡 ヒント ×' + G.hints; $('#rkh').disabled = true;
    FX('pop');
  }
  function comboPop(big) {
    var r = $('#rkc').getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * 0.3;
    if (!window.LXFX) return;
    if (big) { FX('combo'); LXFX.pop(G.combo + ' COMBO!  ×' + mult(), x, y, 'big'); LXFX.burst(40, x, y + 20); }
    else { FX('lead'); LXFX.pop('5 COMBO!', x, y, 'big'); }
  }
  function boostPop() {
    var r = $('#rkc').getBoundingClientRect();
    FX('combo'); if (window.LXFX) { LXFX.pop('🚀 BOOST!! ×2', r.left + r.width / 2, r.top + r.height * 0.4, 'go boost'); LXFX.boost(RULE.feverSec); }
  }

  // ---------- 結果 ----------
  function finish() {
    if (!G || G.over) return;
    G.over = true; cancelAnimationFrame(G.raf); clearTimeout(G.missT);
    FX('whistle');
    var S = A().S(); S.best = S.best || {};
    var key = bestKey(G.g, G.mode), old = S.best[key], rec = !old || G.score > old.score;
    if (rec && G.score > 0) { S.best[key] = { score: G.score, ok: G.ok, combo: G.maxCombo }; A().save(); }
    var al = altOf(G.score), n = G.ok + G.miss, acc = n ? Math.round(G.ok / n * 100) : 0, sec = Math.round(G.played / 1000);
    var ladder = SKY.slice(1).map(function (s, i) { return '<span class="lm' + (i + 1 <= al.i ? ' ok' : i + 1 === al.i + 1 ? ' nx' : '') + '" title="' + s[3] + '">' + s[2] + '</span>'; }).join('');
    var html = '<div class="rk-res">' +
      '<div class="arrive"><span class="ae">' + al.here[2] + '</span><span class="at"><small>到達</small><b>' + al.here[3] + '</b><span>' + fmtKm(al.km) + '</span>' +
      (al.next ? '<i class="togo">あと <i>' + fmt(al.next[0] - G.score) + '</i> 点で ' + al.next[2] + ' ' + al.next[3] + '</i>' : '') + '</span></div>' +
      '<div class="ladder">' + ladder + '</div>' +
      '<div class="score2">' + fmt(G.score) + ' <small>点</small>' + (rec && G.score > 0 ? ' <span class="newrec">🏆 ベスト更新！</span>' : old ? ' <small class="old">ベスト ' + fmt(old.score) + '</small>' : '') + '</div>' +
      '<div class="tstats">正解 <b>' + G.ok + '</b>・ミス <b>' + G.miss + '</b>（正答率 ' + acc + '%）・最大コンボ <b>' + G.maxCombo + '</b>・' + Math.floor(sec / 60) + '分' + (sec % 60) + '秒</div>';
    if (G.missed.length) {
      html += '<h3>✕ まちがえた 問題（復習に 入りました）</h3><div class="rk-list">' + G.missed.map(function (q) {
        return '<div class="row">' + '<div class="t">' + q.recap + '</div>' + (q.say ? A().sayBtn(q.say) : '') + '</div>';
      }).join('') + '</div>';
    } else if (G.ok) html += '<p class="perfect">ミスなし！ 🎉</p>';
    html += '<div class="btns"><button class="btn main grow" data-rkagain>もう 1 回</button><button class="btn grow" data-rkq>メニューへ</button></div></div>';
    var rkc = $('#rkc'); rkc.innerHTML = html; rkc.classList.add('result');
    $('#rko').innerHTML = ''; $('#rkh').hidden = true;
    if (rec && G.score > 0 && window.LXFX) setTimeout(function () { FX('fanfare'); LXFX.rain(3); LXFX.burst(80); }, 500);
  }
  function quit() {
    if (G) { clearInterval(G.cd); cancelAnimationFrame(G.raf); clearTimeout(G.missT); G.over = true; }
    if (window.LXSCENE) LXSCENE.stop();
    if (window.LXFX) LXFX.stop();
    var el = $('#rk'); if (el) el.remove();
    document.body.classList.remove('rk-on');
  }

  // ---------- 操作 ----------
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, input, .rk-card'); if (!t) return;
    if (t.dataset.say != null) return;
    if (t.dataset.rk) return start(menu.g, t.dataset.rk);
    if (t.id === 'sfx') { var S = A().S(); S.sfx = t.checked; A().save(); return; }
    if (t.dataset.rka != null) return answer(+t.dataset.rka);
    if (t.dataset.rkh != null) return useHint();
    if (t.dataset.rkq != null) { var g = G && G.g; quit(); G = null; if (g) menu(g); return; }
    if (t.dataset.rkagain != null) { var g2 = G.g, m = G.mode; return start(g2, m); }
    if (t.classList.contains('rk-card') && G && G.answered && !G.over && G.pauseUntil) return missNext();
  }, true);
  document.addEventListener('keydown', function (e) {
    if (!G || G.over || !$('#rk')) return;
    if (/^[1-4]$/.test(e.key)) { e.preventDefault(); e.stopPropagation(); if (!G.answered) answer(+e.key - 1); }
    else if (e.key === 'h' || e.key === 'H') { e.preventDefault(); e.stopPropagation(); useHint(); }
    else if ((e.key === 'Enter' || e.key === ' ') && G.answered && G.pauseUntil) { e.preventDefault(); e.stopPropagation(); missNext(); }
    else if (e.key === 'Escape') { var g = G.g; quit(); G = null; menu(g); }
  }, true);

  window.EKGAME = { menu: menu, start: start, quit: quit, _G: function () { return G; } };
})();
