// データを 足していく 入れ物。同じ級に 何回 EK.put しても、配列は つなげ、オブジェクトは まぜる（上書きしない）
window.EK = window.EK || {};
EK.put = function (id, o) {
  EK.data = EK.data || {};
  var d = EK.data[id] = EK.data[id] || {};
  Object.keys(o).forEach(function (k) {
    var v = o[k];
    if (Array.isArray(v)) d[k] = (d[k] || []).concat(v);
    else if (v && typeof v === 'object') d[k] = Object.assign(d[k] || {}, v);
    else d[k] = v;
  });
};

// 下の級でも 出る語を 下の級へ 移す（外部の 級別リストで たしかめた語。データの ファイルは そのまま）
// EK.move("g2", "p2", ["disaster", ...])：単語・熟語と その core を 移す
EK.move = function (from, to, list) {
  var A = EK.data[from], B = EK.data[to]; if (!A || !B) return;
  list.forEach(function (en) {
    ['words', 'idioms'].forEach(function (k) {
      var arr = A[k] || [], i = arr.findIndex(function (w) { return w.en === en; });
      if (i < 0) return;
      (B[k] = B[k] || []).push(arr.splice(i, 1)[0]);
      ['core', 'icore'].forEach(function (ck) {
        if (A[ck] && A[ck][en]) { (B[ck] = B[ck] || {})[en] = A[ck][en]; delete A[ck][en]; }
      });
    });
  });
};

// 上の級に 入っている語を、下の級でも 学べるように 写す（移さない。上の級にも 残る）
// EK.share("p2", "g3", ["agree", ...])：単語・熟語と その core を 写す。shared に もとの級を 書いておく
EK.share = function (from, to, list) {
  var A = EK.data[from], B = EK.data[to]; if (!A || !B) return;
  B.shared = B.shared || {};
  list.forEach(function (en) {
    ['words', 'idioms'].forEach(function (k) {
      var w = (A[k] || []).filter(function (x) { return x.en === en; })[0];
      if (!w || (B[k] || []).some(function (x) { return x.en === en; })) return;
      (B[k] = B[k] || []).push(w);
      var c = (A.core && A.core[en]) || (A.icore && A.icore[en]);
      if (c) (B.core = B.core || {})[en] = c;
      B.shared[en] = from;
    });
  });
};

// 同じ語が 書き方ちがいで 2 つ入ったときに、片方を はずす
EK.drop = function (grade, list) {
  var A = EK.data[grade]; if (!A) return;
  list.forEach(function (en) {
    ['words', 'idioms'].forEach(function (k) { if (A[k]) A[k] = A[k].filter(function (w) { return w.en !== en; }); });
    ['core', 'icore'].forEach(function (ck) { if (A[ck]) delete A[ck][en]; });
  });
};
