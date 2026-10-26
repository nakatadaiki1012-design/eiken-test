/* 英検ラボ：ロケットの 背景（論理表現ラボの 英文ロケットと 同じ絵）
   ・建物は 地面に 建っている（東京タワー・スカイツリーの 横を 上って、てっぺんを 追いこす）
   ・富士山と 遠くの街は 地平線に。遠いほど ゆっくり 流れる（奥行き）
   ・カメラは「ばね」で 高度を 追う → 正解で グッと加速して なめらかに 落ち着く
   ・絵は 最初に 1 回だけ 描いて（スプライト）、画面に 見える 部分だけ 貼る → 軽い
   ・重いときは 自動で 細かさを 下げて 1 秒 30 回に。見ていない時は 止まる */
(function () {
  'use strict';

  var cv = null, cx = null, raf = 0, get = null, W = 0, H = 0, RS = 1;
  var cam = 0, vel = 0, cruise = 0, thr = 0, t0 = 0, lastT = 0, q = 1, ft = [], level = 0, lastDraw = 0;
  var skyKey = -1, skyGrad = null, SP = {}, smoke = [], CL = [];
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // めじるしの 番号（game.js の SKY と 同じ ならび）
  var LV = { tower: 1, skytree: 2, fuji: 3, plane: 4, strato: 5, karman: 6, iss: 7, moon: 8, mars: 9, jupiter: 10, saturn: 11, uranus: 12, neptune: 13, voyager: 14, milky: 15, andromeda: 16, edge: 17 };

  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function off(w, h) { var c = document.createElement('canvas'); c.width = Math.max(2, Math.ceil(w)); c.height = Math.max(2, Math.ceil(h)); return c; }
  function hex(c) { var n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function mixc(a, b, f) { var A = hex(a), B = hex(b); return 'rgb(' + Math.round(A[0] + (B[0] - A[0]) * f) + ',' + Math.round(A[1] + (B[1] - A[1]) * f) + ',' + Math.round(A[2] + (B[2] - A[2]) * f) + ')'; }

  /* 空の色：[地平線, 真ん中, てっぺん] */
  var SKY = [
    ['#dcedf7', '#a2cdec', '#6aa6db'], ['#d6eaf7', '#97c6ea', '#5c9cd6'], ['#d0e6f6', '#8bbde6', '#4f91d0'],
    ['#c6e0f4', '#7fb3e0', '#4184c8'], ['#b4d4ee', '#6a9fd4', '#2c69b0'], ['#8db7e0', '#3d72b5', '#163f7e'],
    ['#4a78b5', '#14305f', '#050c1f'], ['#1c2f55', '#060b1a', '#010205'], ['#0d1428', '#03050c', '#000002'],
    ['#120a10', '#040206', '#000000'], ['#140c06', '#050302', '#000000'], ['#120e08', '#040302', '#000000'],
    ['#06121a', '#020508', '#000000'], ['#050a1c', '#02040b', '#000000'], ['#030308', '#010103', '#000000'],
    ['#160b26', '#080410', '#020106'], ['#120922', '#05030c', '#010103'], ['#0a0614', '#030208', '#000000']];

  /* ---------- 見える部分だけ 貼る ---------- */
  function draw(img, dx, dy, dw, dh) {
    var x0 = Math.max(0, dx), y0 = Math.max(0, dy), x1 = Math.min(W, dx + dw), y1 = Math.min(H, dy + dh);
    if (x1 <= x0 || y1 <= y0) return;
    var kx = img.width / dw, ky = img.height / dh;
    cx.drawImage(img, (x0 - dx) * kx, (y0 - dy) * ky, (x1 - x0) * kx, (y1 - y0) * ky, x0, y0, x1 - x0, y1 - y0);
  }
  function ball(r, stops, fn) { // 球（惑星など）の 下書き
    var c = off(r * 2, r * 2), g = c.getContext('2d'), gr = g.createRadialGradient(r * 0.68, r * 0.62, r * 0.08, r, r, r);
    stops.forEach(function (s, i) { gr.addColorStop(i / (stops.length - 1), s); });
    g.fillStyle = gr; g.beginPath(); g.arc(r, r, r, 0, Math.PI * 2); g.fill();
    g.save(); g.clip(); if (fn) fn(g, r);
    var sh = g.createLinearGradient(0, 0, r * 2, 0); sh.addColorStop(0.5, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.6)'); g.fillStyle = sh; g.fillRect(0, 0, r * 2, r * 2);
    g.restore(); return c;
  }

  /* ---------- スプライト（最初に 1 回だけ） ---------- */
  function buildSprites() {
    seed = 11; SP = {};
    var s = RS, U = Math.min(W, H);

    // 東京タワー（地面から てっぺんまで：高さ ≒ 1.01H）
    (function () {
      var h = H * 1.01 * s, w = h * 0.3, c = off(w, h), g = c.getContext('2d'), m = w / 2;
      function hw(t) { // t：上 0 → 下 1。半分の はば
        if (t < 0.17) return w * 0.008;
        if (t < 0.25) return w * 0.03;
        if (t < 0.36) return w * (0.03 + (t - 0.25) / 0.11 * 0.035);
        return w * (0.065 + Math.pow((t - 0.36) / 0.64, 1.7) * 0.425);
      }
      // 外の形（赤と白の 帯）
      var B = [0.17, 0.25, 0.33, 0.41, 0.49, 0.57, 0.65, 0.73, 0.81, 0.89, 1.0];
      for (var i = 0; i < B.length - 1; i++) {
        var a = B[i], b = B[i + 1], y0 = a * h, y1 = b * h;
        g.fillStyle = i % 2 ? '#f1eee8' : '#e4532a';
        g.beginPath(); g.moveTo(m - hw(a), y0); g.lineTo(m + hw(a), y0); g.lineTo(m + hw(b), y1); g.lineTo(m - hw(b), y1); g.closePath(); g.fill();
        // 鉄骨の すじかい
        g.strokeStyle = 'rgba(60,30,20,0.28)'; g.lineWidth = Math.max(1, w * 0.006);
        var n = Math.max(1, Math.round(hw(b) / (w * 0.06)));
        for (var k = -n; k < n; k++) {
          var xa = m + hw(a) * k / n, xb = m + hw(b) * (k + 1) / n, xc = m + hw(a) * (k + 1) / n, xd = m + hw(b) * k / n;
          g.beginPath(); g.moveTo(xa, y0); g.lineTo(xb, y1); g.moveTo(xc, y0); g.lineTo(xd, y1); g.stroke();
        }
        g.beginPath(); g.moveTo(m - hw(b), y1); g.lineTo(m + hw(b), y1); g.stroke();
      }
      // アンテナ
      g.fillStyle = '#e4532a'; g.fillRect(m - w * 0.006, 0, w * 0.012, h * 0.17); g.fillStyle = '#ff6a4a'; g.fillRect(m - w * 0.01, 0, w * 0.02, h * 0.006);
      // 展望台（メインデッキ 150m・トップデッキ 250m）
      [[0.25, 0.018, 1.6], [0.55, 0.03, 1.25]].forEach(function (d) {
        var yy = d[0] * h, ww = hw(d[0]) * d[2];
        g.fillStyle = '#d9d4cc'; g.fillRect(m - ww, yy - h * d[1] / 2, ww * 2, h * d[1]);
        g.fillStyle = '#5a6a7a'; g.fillRect(m - ww * 0.92, yy - h * d[1] * 0.18, ww * 1.84, h * d[1] * 0.36);
      });
      // 脚の あいだ（アーチ）
      g.globalCompositeOperation = 'destination-out';
      g.beginPath(); g.moveTo(m - w * 0.33, h); g.quadraticCurveTo(m, h * 0.72, m + w * 0.33, h); g.closePath(); g.fill();
      // 右が かげ
      g.globalCompositeOperation = 'source-atop';
      var lg = g.createLinearGradient(0, 0, w, 0); lg.addColorStop(0.45, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(0,0,0,0.25)'); g.fillStyle = lg; g.fillRect(0, 0, w, h);
      SP.tower = c;
    })();
    // スカイツリー（高さ ≒ 1.96H）
    (function () {
      var h = H * 1.96 * s, w = h * 0.1, c = off(w, h), g = c.getContext('2d'), m = w / 2;
      function hw(t) {
        if (t < 0.1) return w * 0.012;
        if (t < 0.45) return w * (0.07 + (t - 0.1) / 0.35 * 0.04);
        return w * (0.11 + Math.pow((t - 0.45) / 0.55, 1.4) * 0.39);
      }
      var steps = 60;
      g.fillStyle = '#e9eef4'; g.beginPath(); g.moveTo(m - hw(0), 0);
      for (var i = 0; i <= steps; i++) g.lineTo(m - hw(i / steps), h * i / steps);
      for (i = steps; i >= 0; i--) g.lineTo(m + hw(i / steps), h * i / steps);
      g.closePath(); g.fill();
      // 鉄骨（ななめの 格子）
      g.save(); g.clip(); g.strokeStyle = 'rgba(70,90,115,0.22)'; g.lineWidth = Math.max(1, w * 0.012);
      for (var y = h * 0.1; y < h; y += w * 0.22) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y + w * 0.5); g.moveTo(w, y); g.lineTo(0, y + w * 0.5); g.stroke(); }
      g.restore();
      // 展望台（天望回廊 450m・天望デッキ 350m）
      [[0.29, 0.012, 1.35], [0.45, 0.022, 1.45]].forEach(function (d) {
        var yy = d[0] * h, ww = hw(d[0]) * d[2];
        g.fillStyle = '#dfe6ee'; g.fillRect(m - ww, yy - h * d[1] / 2, ww * 2, h * d[1]);
        g.fillStyle = '#62748a'; g.fillRect(m - ww * 0.95, yy - h * d[1] * 0.2, ww * 1.9, h * d[1] * 0.4);
      });
      g.globalCompositeOperation = 'source-atop';
      var lg = g.createLinearGradient(0, 0, w, 0); lg.addColorStop(0.4, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(20,40,70,0.28)'); g.fillStyle = lg; g.fillRect(0, 0, w, h);
      SP.skytree = c;
    })();
    // 富士山（とても大きいので 半分の 細かさで 描いて、広げて 貼る）
    (function () {
      var hs = 0.5, h = H * 1.71 * s * hs, w = h * 2.6, c = off(w, h), g = c.getContext('2d');
      var body = g.createLinearGradient(0, 0, 0, h); body.addColorStop(0, '#4f6890'); body.addColorStop(0.55, '#6a85a8'); body.addColorStop(1, '#93abc4');
      g.fillStyle = body; g.beginPath(); g.moveTo(0, h); g.bezierCurveTo(w * 0.28, h * 0.72, w * 0.42, h * 0.1, w * 0.47, h * 0.02); g.lineTo(w * 0.53, h * 0.02); g.bezierCurveTo(w * 0.58, h * 0.1, w * 0.72, h * 0.72, w, h); g.closePath(); g.fill();
      g.save(); g.clip();
      // ふもとの 森
      var fo = g.createLinearGradient(0, h * 0.6, 0, h); fo.addColorStop(0, 'rgba(60,90,80,0)'); fo.addColorStop(1, 'rgba(60,90,80,0.45)'); g.fillStyle = fo; g.fillRect(0, 0, w, h);
      // 雪（下の ふちを ぎざぎざに）
      g.fillStyle = '#f5f8fc'; g.beginPath(); g.moveTo(0, 0); g.lineTo(w, 0); g.lineTo(w, h * 0.2);
      for (var i = 0; i <= 40; i++) { var x = w * (1 - i / 40), base = 0.2 + Math.abs(x / w - 0.5) * 0.25; g.lineTo(x, h * (base + (i % 2 ? 0.05 : -0.02) + rnd() * 0.06)); }
      g.closePath(); g.fill();
      // 右側の かげ・すじ（尾根）
      var sh = g.createLinearGradient(w * 0.4, 0, w, 0); sh.addColorStop(0, 'rgba(20,35,70,0)'); sh.addColorStop(1, 'rgba(20,35,70,0.3)'); g.fillStyle = sh; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(40,60,95,0.18)'; g.lineWidth = 2;
      for (i = 0; i < 18; i++) { var sx = w * (0.45 + rnd() * 0.1); g.beginPath(); g.moveTo(sx, h * 0.05); var ex = sx + (rnd() - 0.5) * w * 0.5; g.quadraticCurveTo((sx + ex) / 2, h * 0.3, ex, h * (0.35 + rnd() * 0.3)); g.stroke(); }
      g.restore();
      SP.fuji = c; SP.fujiH = H * 1.71; SP.fujiW = H * 1.71 * 2.6;
    })();
    // 街（遠く・近く）
    SP.city = [0, 1].map(function (near) {
      var w = W * s, h = H * (near ? 0.26 : 0.18) * s, c = off(w, h), g = c.getContext('2d'), x = 0;
      var cols = near ? ['#56677a', '#4b5a6b', '#617387', '#6c7d90'] : ['#8fa3b9', '#97aac0', '#a3b5c9'];
      while (x < w) {
        var bw = (near ? 16 + rnd() * 34 : 10 + rnd() * 22) * s, bh = h * (near ? 0.2 + rnd() * 0.6 : 0.2 + rnd() * 0.55);
        if (near && rnd() < 0.08) bh = h * 0.95;
        g.fillStyle = cols[Math.floor(rnd() * cols.length)]; g.fillRect(x, h - bh, bw - 1 * s, bh);
        if (near) {
          g.fillStyle = 'rgba(210,225,240,0.16)';
          for (var yy = h - bh + 4 * s; yy < h - 3 * s; yy += 6 * s) for (var xx = x + 3 * s; xx < x + bw - 5 * s; xx += 5 * s) g.fillRect(xx, yy, 2.5 * s, 2.5 * s);
          g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(x + bw * 0.7, h - bh, bw * 0.3 - 1 * s, bh);
        }
        x += bw;
      }
      var hz = g.createLinearGradient(0, 0, 0, h); hz.addColorStop(0, 'rgba(215,230,245,' + (near ? 0 : 0.15) + ')'); hz.addColorStop(1, 'rgba(215,230,245,' + (near ? 0.25 : 0.6) + ')');
      g.globalCompositeOperation = 'source-atop'; g.fillStyle = hz; g.fillRect(0, 0, w, h);
      return c;
    });
    // 雲・すじ雲・けむり
    SP.cloud = [0, 1, 2].map(function (v) {
      var w = W * (0.42 + v * 0.1) * s, h = w * 0.36, c = off(w, h), g = c.getContext('2d');
      for (var i = 0; i < 12; i++) {
        var px = w * (0.15 + rnd() * 0.7), py = h * (0.42 + rnd() * 0.3), r = h * (0.2 + rnd() * 0.24);
        var gr = g.createRadialGradient(px, py - r * 0.3, r * 0.1, px, py, r);
        gr.addColorStop(0, 'rgba(255,255,255,0.97)'); gr.addColorStop(0.6, 'rgba(248,251,255,0.75)'); gr.addColorStop(1, 'rgba(238,244,251,0)');
        g.fillStyle = gr; g.beginPath(); g.arc(px, py, r, 0, Math.PI * 2); g.fill();
      }
      var sh = g.createLinearGradient(0, h * 0.4, 0, h); sh.addColorStop(0, 'rgba(160,178,203,0)'); sh.addColorStop(1, 'rgba(140,160,188,0.4)');
      g.globalCompositeOperation = 'source-atop'; g.fillStyle = sh; g.fillRect(0, 0, w, h);
      return c;
    });
    (function () {
      var w = W * 0.7 * s, h = w * 0.1, c = off(w, h), g = c.getContext('2d');
      g.strokeStyle = 'rgba(255,255,255,0.22)'; g.lineCap = 'round';
      for (var i = 0; i < 26; i++) { var y = h * (0.2 + rnd() * 0.6), x = w * rnd() * 0.4; g.lineWidth = 1 + rnd() * 3 * s; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w * 0.25, y - h * 0.2 * rnd(), x + w * (0.4 + rnd() * 0.5), y + h * 0.1); g.stroke(); }
      SP.cirrus = c;
    })();
    (function () {
      var r = 32 * s, c = off(r * 2, r * 2), g = c.getContext('2d'), gr = g.createRadialGradient(r, r, 0, r, r, r);
      gr.addColorStop(0, 'rgba(235,235,235,0.75)'); gr.addColorStop(0.5, 'rgba(215,215,215,0.4)'); gr.addColorStop(1, 'rgba(200,200,200,0)');
      g.fillStyle = gr; g.fillRect(0, 0, r * 2, r * 2); SP.puff = c;
    })();
    // 星（2 枚）
    SP.stars = [0, 1].map(function (layer) {
      var c = off(W * s, H * s), g = c.getContext('2d'), n = layer ? 70 : 170;
      for (var i = 0; i < n; i++) {
        var x = rnd() * W * s, y = rnd() * H * s, r = (layer ? 0.9 + rnd() * 1.1 : 0.4 + rnd() * 0.7) * s, a = layer ? 0.75 + rnd() * 0.25 : 0.35 + rnd() * 0.45;
        g.fillStyle = 'rgba(255,' + (238 + Math.round(rnd() * 17)) + ',' + (222 + Math.round(rnd() * 33)) + ',' + a + ')';
        g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
        if (layer && rnd() < 0.12) { g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(x - r * 4, y - 0.3 * s, r * 8, 0.6 * s); g.fillRect(x - 0.3 * s, y - r * 4, 0.6 * s, r * 8); }
      }
      return c;
    });
    // 天の川（帯）
    (function () {
      var w = W * s, h = H * s, c = off(w, h), g = c.getContext('2d');
      g.save(); g.translate(w / 2, h / 2); g.rotate(-0.5);
      var L = Math.hypot(w, h), bg = g.createLinearGradient(0, -h * 0.25, 0, h * 0.25);
      bg.addColorStop(0, 'rgba(120,90,160,0)'); bg.addColorStop(0.5, 'rgba(225,205,240,0.38)'); bg.addColorStop(1, 'rgba(120,90,160,0)');
      g.fillStyle = bg; g.fillRect(-L / 2, -h * 0.25, L, h * 0.5);
      for (var i = 0; i < 900; i++) { var x = (rnd() - 0.5) * L, y = (rnd() + rnd() + rnd() - 1.5) * h * 0.12; g.fillStyle = 'rgba(255,248,240,' + (0.25 + rnd() * 0.6) + ')'; g.fillRect(x, y, s * (0.6 + rnd()), s * (0.6 + rnd())); }
      g.strokeStyle = 'rgba(30,15,40,0.45)'; g.lineWidth = h * 0.03; g.beginPath(); g.moveTo(-L / 2, h * 0.01); g.bezierCurveTo(-L / 6, -h * 0.04, L / 6, h * 0.05, L / 2, -h * 0.01); g.stroke();
      g.restore(); SP.milky = c;
    })();
    // アンドロメダ銀河
    (function () {
      var w = U * 0.9 * s, h = w * 0.5, c = off(w, h), g = c.getContext('2d');
      g.save(); g.translate(w / 2, h / 2); g.rotate(-0.35); g.scale(1, 0.32);
      var gr = g.createRadialGradient(0, 0, 0, 0, 0, w * 0.48); gr.addColorStop(0, 'rgba(255,245,225,1)'); gr.addColorStop(0.12, 'rgba(250,225,200,0.75)'); gr.addColorStop(0.5, 'rgba(170,160,220,0.28)'); gr.addColorStop(1, 'rgba(120,110,200,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(0, 0, w * 0.48, 0, Math.PI * 2); g.fill();
      g.strokeStyle = 'rgba(40,25,50,0.35)'; g.lineWidth = w * 0.012; [0.2, 0.3].forEach(function (k) { g.beginPath(); g.ellipse(0, 0, w * k, w * k * 0.9, 0, 0.2, 2.6); g.stroke(); });
      g.restore(); SP.andromeda = c;
    })();
    // たくさんの 銀河（宇宙の果て）
    (function () {
      var w = W * s, h = H * s, c = off(w, h), g = c.getContext('2d');
      for (var i = 0; i < 70; i++) {
        var x = rnd() * w, y = rnd() * h, r = (2 + rnd() * 9) * s, hue = rnd() < 0.5 ? '255,220,190' : '190,205,255';
        g.save(); g.translate(x, y); g.rotate(rnd() * 3); g.scale(1, 0.35 + rnd() * 0.6);
        var gr = g.createRadialGradient(0, 0, 0, 0, 0, r); gr.addColorStop(0, 'rgba(' + hue + ',0.9)'); gr.addColorStop(1, 'rgba(' + hue + ',0)');
        g.fillStyle = gr; g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill(); g.restore();
      }
      SP.galaxies = c;
    })();
    // 地球の ふち
    (function () {
      var w = W * s, h = H * 0.7 * s, c = off(w, h), g = c.getContext('2d'), R = w * 2.4, cy = h * 0.35 + R;
      var og = g.createRadialGradient(w / 2, cy, R * 0.94, w / 2, cy, R); og.addColorStop(0, '#173f78'); og.addColorStop(0.85, '#2f6fb0'); og.addColorStop(1, '#79b6e6');
      g.fillStyle = og; g.beginPath(); g.arc(w / 2, cy, R, 0, Math.PI * 2); g.fill();
      for (var i = 0; i < 40; i++) { g.fillStyle = 'rgba(255,255,255,' + (0.1 + rnd() * 0.25) + ')'; g.beginPath(); g.ellipse(w * rnd(), h * (0.42 + rnd() * 0.55), w * (0.04 + rnd() * 0.12), h * (0.008 + rnd() * 0.02), 0, 0, Math.PI * 2); g.fill(); }
      var at = g.createRadialGradient(w / 2, cy, R * 0.995, w / 2, cy, R * 1.03); at.addColorStop(0, 'rgba(120,190,255,0.85)'); at.addColorStop(0.4, 'rgba(90,160,240,0.35)'); at.addColorStop(1, 'rgba(60,120,220,0)');
      g.globalCompositeOperation = 'destination-over'; g.fillStyle = at; g.beginPath(); g.arc(w / 2, cy, R * 1.03, 0, Math.PI * 2); g.fill();
      SP.earth = c;
    })();
    // 太陽の 光
    (function () {
      var r = U * 0.5 * s, c = off(r * 2, r * 2), g = c.getContext('2d'), gr = g.createRadialGradient(r, r, 0, r, r, r);
      gr.addColorStop(0, 'rgba(255,255,245,1)'); gr.addColorStop(0.06, 'rgba(255,250,225,0.9)'); gr.addColorStop(0.2, 'rgba(255,240,200,0.3)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
      g.fillStyle = gr; g.fillRect(0, 0, r * 2, r * 2); SP.sun = c;
    })();
    // 旅客機
    (function () {
      var w = W * 0.16 * s, h = w * 0.36, c = off(w, h), g = c.getContext('2d');
      g.fillStyle = '#f3f5f8'; g.beginPath(); g.ellipse(w * 0.5, h * 0.5, w * 0.48, h * 0.09, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#d8dde4'; g.beginPath(); g.moveTo(w * 0.45, h * 0.5); g.lineTo(w * 0.3, h * 0.95); g.lineTo(w * 0.38, h * 0.95); g.lineTo(w * 0.6, h * 0.5); g.fill();
      g.beginPath(); g.moveTo(w * 0.45, h * 0.5); g.lineTo(w * 0.32, h * 0.05); g.lineTo(w * 0.39, h * 0.05); g.lineTo(w * 0.6, h * 0.5); g.fill();
      g.beginPath(); g.moveTo(w * 0.05, h * 0.45); g.lineTo(w * 0.0, h * 0.15); g.lineTo(w * 0.08, h * 0.15); g.lineTo(w * 0.16, h * 0.45); g.fill();
      SP.plane = c;
    })();
    // 宇宙ステーション
    (function () {
      var w = W * 0.34 * s, h = w * 0.5, c = off(w, h), g = c.getContext('2d');
      g.fillStyle = '#9aa3ad'; g.fillRect(w * 0.08, h * 0.47, w * 0.84, h * 0.06);
      [0.1, 0.27, 0.62, 0.79].forEach(function (x) {
        var pg = g.createLinearGradient(0, 0, 0, h); pg.addColorStop(0, '#c99a2e'); pg.addColorStop(1, '#8a6414'); g.fillStyle = pg;
        g.fillRect(w * x, h * 0.05, w * 0.11, h * 0.38); g.fillRect(w * x, h * 0.57, w * 0.11, h * 0.38);
        g.strokeStyle = 'rgba(60,40,10,0.4)'; g.lineWidth = 1; for (var yy = h * 0.05; yy < h * 0.95; yy += h * 0.05) { g.beginPath(); g.moveTo(w * x, yy); g.lineTo(w * (x + 0.11), yy); g.stroke(); }
      });
      g.fillStyle = '#e4e8ed'; g.fillRect(w * 0.43, h * 0.35, w * 0.14, h * 0.3); g.fillRect(w * 0.38, h * 0.44, w * 0.24, h * 0.12);
      SP.iss = c;
    })();
    // 探査機（太陽系の外）
    (function () {
      var w = U * 0.28 * s, h = w * 0.6, c = off(w, h), g = c.getContext('2d');
      g.fillStyle = '#d8dce2'; g.beginPath(); g.ellipse(w * 0.35, h * 0.45, w * 0.2, w * 0.2 * 0.95, -0.2, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#aab1bb'; g.beginPath(); g.ellipse(w * 0.36, h * 0.46, w * 0.15, w * 0.14, -0.2, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#c8cdd4'; g.lineWidth = 2 * s; g.beginPath(); g.moveTo(w * 0.45, h * 0.6); g.lineTo(w * 0.98, h * 0.9); g.moveTo(w * 0.4, h * 0.65); g.lineTo(w * 0.2, h * 0.98); g.stroke();
      g.fillStyle = '#8f7c55'; g.fillRect(w * 0.4, h * 0.6, w * 0.12, h * 0.12);
      SP.probe = c;
    })();
    // 月・惑星
    SP.moon = ball(U * 0.24 * s, ['#f1eee4', '#cfcabd', '#a7a294'], function (g, r) {
      for (var i = 0; i < 28; i++) { var x = r * 2 * rnd(), y = r * 2 * rnd(), cr = r * (0.04 + rnd() * 0.12); g.fillStyle = 'rgba(120,115,105,0.28)'; g.beginPath(); g.arc(x, y, cr, 0, Math.PI * 2); g.fill(); g.strokeStyle = 'rgba(255,255,255,0.18)'; g.lineWidth = s; g.beginPath(); g.arc(x - cr * 0.15, y - cr * 0.15, cr, Math.PI, Math.PI * 1.5); g.stroke(); }
    });
    SP.mars = ball(U * 0.2 * s, ['#f3a06a', '#c55a2e', '#7a2c16'], function (g, r) {
      for (var i = 0; i < 12; i++) { g.fillStyle = 'rgba(90,30,15,0.25)'; g.beginPath(); g.ellipse(r * 2 * rnd(), r * 2 * rnd(), r * (0.1 + rnd() * 0.3), r * (0.04 + rnd() * 0.1), rnd() * 3, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = 'rgba(255,255,255,0.75)'; g.beginPath(); g.ellipse(r, r * 0.12, r * 0.3, r * 0.1, 0, 0, Math.PI * 2); g.fill();
    });
    SP.jupiter = ball(U * 0.3 * s, ['#f0dcc0', '#d8b48c', '#9c7450'], function (g, r) {
      ['#c99a6c', '#e8d3b5', '#b6845a', '#efe0c8', '#c08d63', '#e5cfae', '#a87c56'].forEach(function (col, i) { g.fillStyle = col; g.globalAlpha = 0.55; g.fillRect(0, r * 2 * (0.12 + i * 0.11) + (rnd() - 0.5) * r * 0.05, r * 2, r * 0.13); });
      g.globalAlpha = 1; g.fillStyle = 'rgba(190,80,50,0.75)'; g.beginPath(); g.ellipse(r * 1.25, r * 1.25, r * 0.2, r * 0.11, 0, 0, Math.PI * 2); g.fill();
    });
    (function () { // 土星（輪つき）
      var r = U * 0.16 * s, w = r * 5, h = r * 2.6, c = off(w, h), g = c.getContext('2d'), mx = w / 2, my = h / 2;
      function ring(front) {
        g.save(); g.beginPath(); if (front) g.rect(0, my, w, h); else g.rect(0, 0, w, my); g.clip();
        [[2.3, 'rgba(210,190,150,0.55)', 0.22], [1.95, 'rgba(230,212,170,0.75)', 0.3], [1.55, 'rgba(190,170,130,0.5)', 0.18]].forEach(function (x) { g.strokeStyle = x[1]; g.lineWidth = r * x[2]; g.beginPath(); g.ellipse(mx, my, r * x[0], r * x[0] * 0.28, -0.25, 0, Math.PI * 2); g.stroke(); });
        g.restore();
      }
      ring(false);
      var gr = g.createLinearGradient(mx, my - r, mx, my + r); ['#e9d5a8', '#d2b47c', '#e6cf9d', '#c9a96f', '#e2c994'].forEach(function (col, i) { gr.addColorStop(i / 4, col); });
      g.fillStyle = gr; g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.fill();
      var sh = g.createLinearGradient(mx - r, 0, mx + r, 0); sh.addColorStop(0.5, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.5)'); g.fillStyle = sh; g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.fill();
      ring(true); SP.saturn = c;
    })();
    SP.uranus = ball(U * 0.18 * s, ['#d6f3f5', '#9fdde3', '#5aa9b6'], function (g, r) {
      g.strokeStyle = 'rgba(220,245,250,0.35)'; g.lineWidth = r * 0.04; g.beginPath(); g.ellipse(r, r, r * 0.25, r * 0.98, 0, 0, Math.PI * 2); g.stroke();
    });
    SP.neptune = ball(U * 0.18 * s, ['#8fb2ff', '#3d63d8', '#1b2f86'], function (g, r) {
      g.fillStyle = 'rgba(20,30,90,0.6)'; g.beginPath(); g.ellipse(r * 0.8, r * 0.85, r * 0.2, r * 0.1, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(230,240,255,0.5)'; g.fillRect(r * 0.3, r * 0.6, r * 0.5, r * 0.03);
    });
    // ロケット
    (function () {
      var h = Math.max(54, Math.min(100, H * 0.12)) * s, w = h * 0.36, c = off(w, h), g = c.getContext('2d'), m = w / 2;
      var bd = g.createLinearGradient(0, 0, w, 0); bd.addColorStop(0, '#d8dde3'); bd.addColorStop(0.35, '#ffffff'); bd.addColorStop(1, '#a9b2bc');
      g.fillStyle = '#c0392b'; g.beginPath(); g.moveTo(m - w * 0.2, h * 0.72); g.lineTo(m - w * 0.5, h * 0.95); g.lineTo(m - w * 0.2, h * 0.9); g.fill(); g.beginPath(); g.moveTo(m + w * 0.2, h * 0.72); g.lineTo(m + w * 0.5, h * 0.95); g.lineTo(m + w * 0.2, h * 0.9); g.fill();
      g.fillStyle = bd; g.beginPath(); g.moveTo(m, 0); g.bezierCurveTo(m + w * 0.32, h * 0.14, m + w * 0.24, h * 0.5, m + w * 0.22, h * 0.9); g.lineTo(m - w * 0.22, h * 0.9); g.bezierCurveTo(m - w * 0.24, h * 0.5, m - w * 0.32, h * 0.14, m, 0); g.fill();
      g.fillStyle = '#d0392b'; g.beginPath(); g.moveTo(m, 0); g.bezierCurveTo(m + w * 0.2, h * 0.07, m + w * 0.25, h * 0.15, m + w * 0.26, h * 0.2); g.lineTo(m - w * 0.26, h * 0.2); g.bezierCurveTo(m - w * 0.25, h * 0.15, m - w * 0.2, h * 0.07, m, 0); g.fill();
      g.fillStyle = '#2a3440'; g.beginPath(); g.arc(m, h * 0.38, w * 0.13, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#7cc4f0'; g.beginPath(); g.arc(m, h * 0.38, w * 0.09, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#5c6670'; g.fillRect(m - w * 0.14, h * 0.9, w * 0.28, h * 0.08);
      SP.rocket = c; SP.rh = h / s; SP.rw = w / s;
    })();
    // 雲の 置き場所
    CL = [];
    for (var i = 0; i < 26; i++) CL.push({ lv: 0.7 + rnd() * 3.8, x: rnd() * 1.2 - 0.1, v: Math.floor(rnd() * 3), d: 0.6 + rnd() * 0.8, k: 'c' });
    for (i = 0; i < 8; i++) CL.push({ lv: 4.4 + rnd() * 1.3, x: rnd() * 1.1 - 0.1, v: 0, d: 0.5 + rnd() * 0.5, k: 'ci' });
  }

  function size() {
    if (!cv || !cv.parentNode) return;
    var r = cv.parentNode.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    RS = Math.min(1, window.devicePixelRatio || 1) * q;
    cv.width = Math.round(W * RS); cv.height = Math.round(H * RS); cx.setTransform(RS, 0, 0, RS, 0, 0);
    skyKey = -1; buildSprites();
  }
  // 高度 L の物が いま 画面の どこ（y）に 見えるか（d：奥行き。小さいほど ゆっくり）
  function Y(L, d) { return H * 0.86 - (L - cam) * H * 0.95 * (d || 1); }

  function drawSky() {
    var k = Math.max(0, Math.min(SKY.length - 1.001, cam)), key = Math.round(k * 60);
    if (key !== skyKey) {
      skyKey = key; var i0 = Math.floor(k), f = k - i0, a = SKY[i0], b = SKY[i0 + 1];
      skyGrad = cx.createLinearGradient(0, H, 0, 0);
      skyGrad.addColorStop(0, mixc(a[0], b[0], f)); skyGrad.addColorStop(0.5, mixc(a[1], b[1], f)); skyGrad.addColorStop(1, mixc(a[2], b[2], f));
    }
    cx.fillStyle = skyGrad; cx.fillRect(0, 0, W, H);
  }
  function fade(lo, hi, L) { return Math.max(0, Math.min(1, (L - lo) / (hi - lo))); }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!cv || !get || document.hidden) { lastT = 0; return; }
    if (lastDraw) { ft.push(now - lastDraw); if (ft.length > 40) ft.shift(); }
    if (ft.length === 40 && level < 2) {
      var avg = ft.reduce(function (m, x) { return m + x; }, 0) / 40, lim = level === 0 ? 22 : 40;
      if (avg > lim) { level++; q = level === 1 ? 0.7 : 0.5; ft = []; size(); }
    }
    if (level > 0 && now - lastDraw < 30) return;
    lastDraw = now;
    var st = get() || {}, dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0.016; lastT = now;
    var lite = level > 0;

    // カメラ（ばね）
    var target = st.level || 0;
    if (reduce) { cam = target; vel = 0; }
    else { var acc = 16 * (target - cam) - 7.5 * vel; vel += acc * dt; cam += vel * dt; }
    var th = st.started ? Math.min(1, 0.25 + (st.combo || 0) / 40) * (st.boost ? 1.6 : 1) : 0;
    thr += (th - thr) * Math.min(1, dt * 3);
    var speed = (reduce ? 0 : 0.05 + thr * 0.32 + Math.max(0, vel) * 0.9);
    cruise += speed * dt;
    var tsec = (now - t0) / 1000, U = Math.min(W, H);

    cx.save();
    if (st.boost && !reduce) cx.translate((Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 2.2);
    drawSky();

    // ---- 遠い宇宙（銀河・天の川・星） ----
    var gA = fade(16.3, 17, cam); if (gA > 0) { cx.globalAlpha = gA; draw(SP.galaxies, 0, ((cruise * 0.08 * H) % H) - H, W, H); draw(SP.galaxies, 0, (cruise * 0.08 * H) % H, W, H); }
    var mA = fade(13.6, 14.6, cam) * (1 - fade(16.4, 17.2, cam)); if (mA > 0) { cx.globalAlpha = mA; draw(SP.milky, 0, 0, W, H); }
    cx.globalAlpha = 1;
    var sa = fade(5.0, 6.2, cam);
    if (sa > 0) {
      SP.stars.forEach(function (c, layer) {
        if (lite && !layer) return;
        var d = layer ? 0.6 : 0.25, oy = ((cruise * d * H * 0.6) % H + H) % H;
        cx.globalAlpha = sa * (layer ? 1 : 0.8); draw(c, 0, oy - H, W, H); draw(c, 0, oy, W, H);
      });
      cx.globalAlpha = 1;
    }
    // 太陽（遠くへ 行くほど 小さな 星に）
    var sunR = U * (cam < 5.5 ? 0.9 : cam < 13.5 ? 0.55 : Math.max(0.08, 0.55 - (cam - 13.5) * 0.3));
    cx.globalAlpha = cam < 16 ? 0.9 : Math.max(0, 1 - (cam - 16)); draw(SP.sun, W * 0.12 - sunR / 2, H * 0.12 - sunR / 2 + Math.max(0, 5 - cam) * 4, sunR, sunR); cx.globalAlpha = 1;

    // ---- 惑星・月・探査機・銀河 ----
    function body(img, L, x, w, h, d) { var y = Y(L, d || 0.85); if (y + h / 2 > 0 && y - h / 2 < H) draw(img, x - w / 2, y - h / 2, w, h); }
    // 地球（下に 青い ふち。上るほど ゆっくり 沈む）
    if (cam > 4.8 && cam < 8.6) { cx.globalAlpha = fade(4.8, 5.4, cam); draw(SP.earth, 0, H * 0.5 + (cam - 6) * H * 0.16, W, H * 0.7); cx.globalAlpha = 1; }
    if (cam > 5.8 && cam < 8.4) { var isy = Y(LV.iss + 0.1, 0.9); if (isy > -H * 0.3 && isy < H * 1.2) { cx.save(); cx.translate(W * 0.3, isy); cx.rotate(Math.sin(tsec * 0.2) * 0.05); cx.drawImage(SP.iss, -W * 0.17, -W * 0.085, W * 0.34, W * 0.17); cx.restore(); } }
    body(SP.moon, LV.moon + 0.05, W * 0.3, U * 0.48, U * 0.48);
    body(SP.mars, LV.mars + 0.05, W * 0.28, U * 0.4, U * 0.4);
    body(SP.jupiter, LV.jupiter + 0.05, W * 0.32, U * 0.6, U * 0.6);
    body(SP.saturn, LV.saturn + 0.05, W * 0.34, U * 0.8, U * 0.42);
    body(SP.uranus, LV.uranus + 0.05, W * 0.3, U * 0.36, U * 0.36);
    body(SP.neptune, LV.neptune + 0.05, W * 0.3, U * 0.36, U * 0.36);
    if (cam > LV.voyager - 1.2 && cam < LV.voyager + 1.2) { var vy = Y(LV.voyager + 0.05, 0.85); cx.save(); cx.translate(W * 0.32, vy); cx.rotate(Math.sin(tsec * 0.3) * 0.08); cx.drawImage(SP.probe, -U * 0.14, -U * 0.084, U * 0.28, U * 0.168); cx.restore(); }
    body(SP.andromeda, LV.andromeda + 0.05, W * 0.38, U * 0.9, U * 0.45, 0.6);

    // ---- 地上（地平線の 遠い景色 → 建物 → 近い街） ----
    if (cam < 4.8) {
      // 3 つの 層：地平線（とても遠い）・タワーの 並ぶ 街（少し遠い）・手前の 街。それぞれ 自分の 地面に 立つ
      var DF = 0.15, DM = 0.8, HY = Y(0, DF) + H * 0.06, GM = Y(0, DM) + H * 0.06, GY = Y(0) + H * 0.06;
      // 富士山（地平線から 立ち上がる。遠いので 小さく、ゆっくり 動く）
      var ftop = Y(LV.fuji, DF), fh = HY - ftop;
      if (ftop < H && HY > 0) draw(SP.fuji, W * 0.42 - fh * 1.3, ftop, fh * 2.6, fh);
      // 地平線の かすみと 遠い 地面
      if (HY < H + H * 0.2) {
        if (HY - H * 0.08 < H) draw(SP.city[0], 0, HY - H * 0.08, W, H * 0.08);
        var hz = cx.createLinearGradient(0, HY - H * 0.2, 0, HY + 2);
        hz.addColorStop(0, 'rgba(226,237,248,0)'); hz.addColorStop(1, 'rgba(226,237,248,0.75)');
        cx.fillStyle = hz; cx.fillRect(0, HY - H * 0.2, W, H * 0.2 + 2);
        if (HY < H) { cx.fillStyle = '#a3b2a4'; cx.fillRect(0, HY, W, H - HY); }
      }
      // スカイツリー・東京タワー（街の 地面に 建っている。てっぺんが その めじるしの 高さ）
      var stTop = Y(LV.skytree, DM); if (stTop < H) { var sh = GM - stTop; draw(SP.skytree, W * 0.58, stTop, sh * 0.1, sh); }
      var twTop = Y(LV.tower, DM); if (twTop < H) { var th2 = GM - twTop; draw(SP.tower, W * 0.1, twTop, th2 * 0.3, th2); }
      if (GM - H * 0.18 < H) draw(SP.city[0], 0, GM - H * 0.18, W, H * 0.18);
      if (GM < H) { cx.fillStyle = '#8c9b8a'; cx.fillRect(0, GM, W, H - GM); }
      // 近い街と 地面
      if (GY - H * 0.26 < H) draw(SP.city[1], 0, GY - H * 0.26, W, H * 0.26);
      if (GY < H) { var gg = cx.createLinearGradient(0, GY, 0, H); gg.addColorStop(0, '#6c7a69'); gg.addColorStop(1, '#3f4a3e'); cx.fillStyle = gg; cx.fillRect(0, GY, W, H - GY + 4); }
    }

    // ---- 飛行機・雲 ----
    var py = Y(LV.plane, 0.9);
    if (py > -60 && py < H + 60) {
      var px = ((tsec * 0.06) % 1.5 - 0.25) * W;
      var cg = cx.createLinearGradient(px - W * 0.5, 0, px, 0); cg.addColorStop(0, 'rgba(255,255,255,0)'); cg.addColorStop(1, 'rgba(255,255,255,0.6)');
      cx.fillStyle = cg; cx.fillRect(px - W * 0.5, py - 2, W * 0.5, 3);
      cx.drawImage(SP.plane, px - 4, py - W * 0.16 * 0.18, W * 0.16, W * 0.16 * 0.36);
    }
    var ca = Math.max(0, 1 - Math.max(0, cam - 5.4) / 0.8);
    if (ca > 0) {
      for (var i = 0; i < CL.length; i++) {
        if (lite && i % 2) continue;
        var c = CL[i], base = c.k === 'c' ? 0.7 : 4.4, band = c.k === 'c' ? 3.8 : 1.3;
        var lv = base + (((c.lv - base - cruise * 0.35 * c.d) % band) + band) % band;
        var y = Y(lv, c.d), sp = c.k === 'c' ? SP.cloud[c.v] : SP.cirrus;
        var cw = (c.k === 'c' ? W * (0.42 + c.v * 0.1) : W * 0.7) * (0.6 + c.d * 0.5), ch = cw * (c.k === 'c' ? 0.36 : 0.1);
        if (y < -ch || y > H + ch) continue;
        cx.globalAlpha = ca * (c.k === 'c' ? 0.95 : 0.8);
        draw(sp, c.x * W - cw / 2, y - ch / 2, cw, ch * (1 + Math.max(0, vel) * 0.25));
      }
      cx.globalAlpha = 1;
    }
    var fog = Math.max(0, 1 - Math.abs(cam - 4.15) / 0.35);
    if (fog > 0 && !reduce) { cx.fillStyle = 'rgba(245,248,252,' + (fog * 0.45) + ')'; cx.fillRect(0, 0, W, H); }

    // ---- 速さの線 ----
    var vv = Math.max(0, vel) + (st.boost ? 0.8 : 0);
    if (!reduce && vv > 0.45) {
      cx.strokeStyle = cam > 5.5 ? 'rgba(200,220,255,' + Math.min(0.35, (vv - 0.45) * 0.4) + ')' : 'rgba(255,255,255,' + Math.min(0.3, (vv - 0.45) * 0.35) + ')';
      cx.lineWidth = 1.2;
      for (var k2 = 0; k2 < (lite ? 6 : 12); k2++) { var lx = ((k2 * 0.1379 + 0.03) % 1) * W, ly = ((cruise * 2.2 + k2 * 0.317) % 1) * H; cx.beginPath(); cx.moveTo(lx, ly); cx.lineTo(lx, ly + 30 + vv * 70); cx.stroke(); }
    }

    // ---- ロケット・炎・けむり ----
    var rw = SP.rw, rh = SP.rh, rx = W - Math.max(30, Math.min(56, W * 0.075)), ry0 = H * 0.72 - Math.min(H * 0.05, Math.max(0, vel) * H * 0.05);
    var sway = st.started ? Math.sin(tsec * 1.3) * 0.03 : 0, nozzleY = ry0 + rh * 0.97;
    if (st.started) {
      var inSpace = cam > 5.8;
      if (!inSpace && !reduce && smoke.length < (lite ? 22 : 48) && Math.random() < 0.3 + thr * 0.6) smoke.push({ x: rx + (Math.random() - 0.5) * 4, y: nozzleY + rh * 0.3, r: rw * 0.6, a: 0.55, vx: (Math.random() - 0.5) * 12 });
      var L = rh * (0.55 + thr * 1.25) * (0.9 + Math.random() * 0.2), wid = rw * (inSpace ? 0.55 + thr * 0.5 : 0.36);
      var og = cx.createLinearGradient(0, nozzleY, 0, nozzleY + L);
      og.addColorStop(0, inSpace ? 'rgba(190,220,255,0.95)' : 'rgba(255,245,200,0.98)'); og.addColorStop(0.25, inSpace ? 'rgba(140,170,255,0.7)' : 'rgba(255,170,40,0.9)'); og.addColorStop(1, 'rgba(255,90,40,0)');
      cx.fillStyle = og; cx.beginPath(); cx.moveTo(rx - rw * 0.14, nozzleY); cx.quadraticCurveTo(rx - wid, nozzleY + L * 0.45, rx, nozzleY + L); cx.quadraticCurveTo(rx + wid, nozzleY + L * 0.45, rx + rw * 0.14, nozzleY); cx.closePath(); cx.fill();
      cx.fillStyle = 'rgba(255,255,240,0.95)'; cx.beginPath(); cx.moveTo(rx - rw * 0.08, nozzleY); cx.quadraticCurveTo(rx, nozzleY + L * 0.5, rx + rw * 0.08, nozzleY); cx.fill();
    }
    for (var si = smoke.length - 1; si >= 0; si--) {
      var p = smoke[si]; p.y += (60 + speed * H * 0.9) * dt; p.x += p.vx * dt; p.r += rw * 0.9 * dt; p.a -= 0.28 * dt;
      if (p.a <= 0 || p.y > H + 40) { smoke.splice(si, 1); continue; }
      cx.globalAlpha = p.a * (cam > 5.5 ? 0.3 : 1); cx.drawImage(SP.puff, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    cx.globalAlpha = 1;
    cx.save(); cx.translate(rx, ry0 + rh / 2); cx.rotate(sway); cx.drawImage(SP.rocket, -rw / 2, -rh / 2, rw, rh); cx.restore();
    cx.restore();
  }

  function start(parent, getter) {
    stop();
    get = getter; cam = 0; vel = 0; cruise = 0; thr = 0; smoke = []; ft = []; t0 = performance.now(); lastT = 0; lastDraw = 0;
    cv = document.createElement('canvas'); cv.className = 'scene'; cv.setAttribute('aria-hidden', 'true');
    parent.insertBefore(cv, parent.firstChild); cx = cv.getContext('2d', { alpha: false });
    size(); window.addEventListener('resize', size);
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf); raf = 0;
    window.removeEventListener('resize', size);
    if (cv && cv.parentNode) cv.parentNode.removeChild(cv);
    cv = null; get = null; smoke = [];
  }
  window.LXSCENE = { start: start, stop: stop, _q: function () { return q; }, _lv: function () { return level; } };
})();
