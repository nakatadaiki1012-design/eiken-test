/* 英検ラボ：演出（効果音・紙吹雪・ポップアップ）。論理表現ラボと 同じもの
   効果音は音声ファイルを使わず Web Audio でその場でつくる。⚙ 設定の「効果音」でオフにできる */
(function () {
  'use strict';

  var ctx = null;
  function enabled() { return !window.EKAPP || EKAPP.sfx(); }
  function ac() {
    if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(f, t0, dur, type, vol) {
    var c = ac(); if (!c) return;
    var t = c.currentTime + t0, o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
  }
  var nbuf = null;
  function noise(t0, dur, vol, freq) {
    var c = ac(); if (!c) return;
    if (!nbuf) { nbuf = c.createBuffer(1, c.sampleRate, c.sampleRate); var d = nbuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    var t = c.currentTime + t0, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = nbuf; f.type = 'bandpass'; f.frequency.value = freq || 300; f.Q.value = 0.8;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(t); s.stop(t + dur + 0.02);
  }
  var SFX = {
    tap: function (combo) { tone(520 + Math.min(combo || 0, 40) * 16, 0, 0.07, 'triangle', 0.12); },
    ok: function () { tone(784, 0, 0.12, 'triangle', 0.16); tone(1175, 0.07, 0.22, 'triangle', 0.16); },
    miss: function () { tone(140, 0, 0.2, 'sawtooth', 0.09); tone(110, 0.05, 0.2, 'sawtooth', 0.07); },
    beep: function () { tone(660, 0, 0.14, 'square', 0.08); },
    go: function () { tone(1046, 0, 0.5, 'square', 0.09); tone(1568, 0, 0.5, 'triangle', 0.08); },
    combo: function () { [659, 784, 988, 1319].forEach(function (f, i) { tone(f, i * 0.06, 0.16, 'triangle', 0.14); }); },
    whistle: function () { tone(2100, 0, 0.18, 'square', 0.06); tone(2100, 0.24, 0.55, 'square', 0.06); },
    pop: function () { tone(880, 0, 0.06, 'sine', 0.1); tone(1320, 0.04, 0.08, 'sine', 0.08); },
    medal: function () { tone(880, 0, 0.18, 'triangle', 0.15); tone(1320, 0.12, 0.35, 'triangle', 0.15); },
    lead: function () { [784, 988, 1175].forEach(function (f, i) { tone(f, i * 0.07, 0.2, 'triangle', 0.13); }); },
    drum: function (sec) { // ドラムロール（だんだん大きく）
      var n = Math.floor((sec || 2) / 0.045);
      for (var i = 0; i < n; i++) noise(i * 0.045, 0.06, 0.05 + 0.25 * i / n, 220 + 80 * Math.random());
      noise(n * 0.045, 0.5, 0.5, 120); tone(98, n * 0.045, 0.6, 'sine', 0.35);
    },
    spark: function (n) { // 火花の音（シュッ）
      for (var i = 0; i < Math.min(3, n || 1); i++) noise(i * 0.04, 0.05, 0.12, 2500 + Math.random() * 2500);
    },
    boost: function () { // ブースト（ゴーッと 上がる）
      for (var i = 0; i < 14; i++) noise(i * 0.05, 0.09, 0.08 + i * 0.012, 160 + i * 40);
      [392, 523, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.1 + i * 0.07, 0.22, 'square', 0.06); });
      tone(1568, 0.5, 0.7, 'triangle', 0.08);
    },
    fanfare: function () { // ファンファーレ
      var seq = [[523, 0, .12], [523, .14, .12], [523, .28, .12], [659, .42, .35], [587, .8, .12], [659, .94, .12], [784, 1.08, .9]];
      seq.forEach(function (x) { tone(x[0], x[1], x[2] + 0.1, 'square', 0.07); tone(x[0] * 2, x[1], x[2] + 0.1, 'triangle', 0.06); });
      [523, 659, 784, 1046].forEach(function (f) { tone(f, 1.08, 1.4, 'triangle', 0.07); });
    }
  };
  function play(name, a) { if (!enabled()) return; try { SFX[name](a); } catch (e) { } }

  /* ---------- 紙吹雪 ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = null, cx = null, parts = [], raf = 0, rainUntil = 0, boostUntil = 0;
  var COLORS = ['#e9b730', '#d9603b', '#2f8f6f', '#3f74c4', '#c35fa8', '#f2e6c9', '#7bc6a4'];
  function canvas() {
    if (!cv) {
      cv = document.createElement('canvas'); cv.className = 'fxcanvas'; document.body.appendChild(cv); cx = cv.getContext('2d');
      window.addEventListener('resize', size);
    }
    size(); return cv;
  }
  function size() { if (!cv) return; var r = window.devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); }
  function spawn(n, x, y, spread) {
    for (var i = 0; i < n; i++) {
      var a = (spread ? -Math.PI / 2 + (Math.random() - 0.5) * spread : Math.random() * Math.PI * 2);
      var sp = spread ? 6 + Math.random() * 9 : 0;
      parts.push({
        x: x == null ? Math.random() * innerWidth : x, y: y == null ? -20 - Math.random() * 80 : y,
        vx: spread ? Math.cos(a) * sp : (Math.random() - 0.5) * 3, vy: spread ? Math.sin(a) * sp : 2 + Math.random() * 3,
        w: 6 + Math.random() * 8, h: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: COLORS[Math.floor(Math.random() * COLORS.length)], life: 0
      });
    }
  }
  /* 火花：押したカードから 光の粒が 飛び散って 消える ／ 炎：画面の下から 上へ ／ 星：上から 下へ 流れる（ロケットが 上がっている感じ） */
  var SPK = ['#ffd166', '#ff9f1c', '#ff6b6b', '#fff3b0'];
  function spawnSpark(n, x, y) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 5;
      parts.push({ k: 'spk', x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, w: 2 + Math.random() * 3, c: SPK[i % 4], life: 0, max: 26 + Math.random() * 18 });
    }
  }
  function spawnFlame(x) {
    // 炎は 画面の いちばん下で ゆらめくだけ（答えのカードに かからない）
    parts.push({ k: 'fl', x: x, y: innerHeight + 6, vx: (Math.random() - 0.5) * 1.2, vy: -(2.5 + Math.random() * 3), w: 6 + Math.random() * 9, c: SPK[Math.floor(Math.random() * 3)], life: 0, max: 14 + Math.random() * 10 });
  }
  function spawnStar() {
    parts.push({ k: 'st', x: Math.random() * innerWidth, y: -10, vx: 0, vy: 9 + Math.random() * 9, w: 1 + Math.random() * 2, c: '#ffffff', life: 0, max: 200 });
  }
  function drawGlow(p) {
    var f = Math.max(0, 1 - p.life / p.max);
    cx.save(); cx.globalAlpha = p.k === 'fl' ? f * 0.7 : f; cx.fillStyle = p.c;
    if (p.k === 'st') { cx.fillRect(p.x, p.y, p.w, p.w * 9); }
    else { cx.shadowColor = p.c; cx.shadowBlur = p.k === 'fl' ? 18 : 8; cx.beginPath(); cx.arc(p.x, p.y, p.w * (p.k === 'fl' ? f : 1), 0, Math.PI * 2); cx.fill(); }
    cx.restore();
  }
  function loop() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    if (Date.now() < rainUntil) spawn(reduce ? 1 : 4);
    if (Date.now() < boostUntil && !reduce) { for (var q = 0; q < 2; q++) spawnFlame(innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.8); if (Math.random() < 0.6) spawnStar(); }
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      if (p.k === 'spk' || p.k === 'fl' || p.k === 'st') {
        if (p.k === 'spk') p.vy += 0.15;
        p.vx *= 0.97; p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.max || p.y > innerHeight + 40) { parts.splice(i, 1); continue; }
        drawGlow(p); continue;
      }
      p.vy += 0.12; p.vx *= 0.99; p.vy = Math.min(p.vy, 6); p.x += p.vx + Math.sin(p.life / 12) * 0.6; p.y += p.vy; p.r += p.vr; p.life++;
      if (p.y > innerHeight + 30) { parts.splice(i, 1); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c;
      cx.scale(1, Math.abs(Math.cos(p.life / 8)) + 0.2); cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
    }
    if (parts.length || Date.now() < rainUntil || Date.now() < boostUntil) raf = requestAnimationFrame(loop);
    else { raf = 0; cx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  function start() { canvas(); if (!raf) raf = requestAnimationFrame(loop); }
  function burst(n, x, y) { spawn(reduce ? Math.ceil(n / 5) : n, x == null ? innerWidth / 2 : x, y == null ? innerHeight * 0.6 : y, 1.6); start(); }
  function rain(sec) { rainUntil = Math.max(rainUntil, Date.now() + sec * 1000); start(); }
  function stop() { rainUntil = 0; boostUntil = 0; parts = []; }
  function sparks(el, n) {
    var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null; if (!r) return;
    spawnSpark(reduce ? 2 : Math.min(30, n * 3), r.left + r.width / 2, r.top + r.height / 2);
    start(); play('spark', n);
  }
  function boost(sec) { boostUntil = Math.max(boostUntil, Date.now() + sec * 1000); start(); }

  /* ---------- 文字のポップアップ（+30 など） ---------- */
  function pop(text, x, y, cls) {
    var d = document.createElement('div'); d.className = 'fxpop ' + (cls || ''); d.textContent = text;
    d.style.left = x + 'px'; d.style.top = y + 'px'; document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 900);
  }
  function popAt(el, text, cls) { if (!el) return; var r = el.getBoundingClientRect(); pop(text, r.left + r.width / 2, r.top, cls); }

  window.LXFX = { play: play, burst: burst, rain: rain, stop: stop, pop: pop, popAt: popAt, unlock: ac, sparks: sparks, boost: boost };
})();
