/* 英検ラボ：前置詞・副詞の コアイメージ図
   熟語の 意味は「動詞 ＋ out / up / off …」の 小さな語の イメージで 決まることが 多い。
   その イメージを 小さな 図にして、熟語の 解説・一覧・覚えるカードに 出す */
(function () {
  'use strict';
  // 矢印（線 ＋ 先の三角）
  function arrow(x1, y1, x2, y2, cls) {
    var a = Math.atan2(y2 - y1, x2 - x1), L = 9, W = 5;
    var p1 = [x2 - L * Math.cos(a) + W * Math.sin(a), y2 - L * Math.sin(a) - W * Math.cos(a)];
    var p2 = [x2 - L * Math.cos(a) - W * Math.sin(a), y2 - L * Math.sin(a) + W * Math.cos(a)];
    return '<line class="' + (cls || 'mv') + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + (x2 - 4 * Math.cos(a)) + '" y2="' + (y2 - 4 * Math.sin(a)) + '"/>' +
      '<polygon class="' + (cls || 'mv') + 'h" points="' + x2 + ',' + y2 + ' ' + p1.join(',') + ' ' + p2.join(',') + '"/>';
  }
  function head(x, y, ang) { // 曲線の 先に つける 三角
    var L = 9, W = 5, c = Math.cos(ang), s = Math.sin(ang);
    return '<polygon class="mvh" points="' + x + ',' + y + ' ' + (x - L * c + W * s) + ',' + (y - L * s - W * c) + ' ' + (x - L * c - W * s) + ',' + (y - L * s + W * c) + '"/>';
  }
  var dot = function (x, y, r, cls) { return '<circle class="' + (cls || 'dt') + '" cx="' + x + '" cy="' + y + '" r="' + (r || 6) + '"/>'; };
  var box = function (x, y, w, h, cls) { return '<rect class="' + (cls || 'bx') + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4"/>'; };
  var line = function (x1, y1, x2, y2, cls) { return '<line class="' + (cls || 'gd') + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>'; };

  // [図, ことば]
  var P = {
    up: [line(10, 64, 110, 64) + line(30, 8, 90, 8, 'gd dash') + dot(60, 56) + arrow(60, 48, 60, 12), '上へ。てっぺん（いっぱい）まで → 完全に・すっかり'],
    down: [line(10, 64, 110, 64) + dot(60, 12) + arrow(60, 20, 60, 58), '下へ。おさえつける・へらす・しずめる'],
    out: [box(14, 14, 52, 46) + dot(36, 37) + arrow(46, 37, 108, 37), '中から 外へ。出てくる → 出きって なくなる・最後まで'],
    off: [line(10, 30, 70, 30) + box(28, 18, 26, 12, 'bx dash') + arrow(56, 34, 98, 58) + box(92, 54, 20, 10, 'bx fill'), 'くっついていた 所から 離れる → 取れる・やめる・出発する'],
    on: [line(10, 52, 110, 52) + dot(36, 45) + arrow(56, 40, 104, 40), 'くっついている。そのまま 続ける'],
    in: [box(56, 14, 52, 46) + arrow(6, 37, 80, 37), '中へ・中に。入りこむ・ふくまれる'],
    into: [box(56, 14, 52, 46) + arrow(6, 37, 80, 37), '中へ 入りこむ → ～の状態に なる'],
    over: [box(46, 40, 28, 24) + line(10, 64, 110, 64) + '<path class="mv" d="M14,60 Q60,-8 102,58"/>' + head(104, 62, 1.15), '上を こえて 向こうへ。全体を おおう → 終わる・くり返す'],
    through: [line(36, 24, 86, 24) + line(36, 52, 86, 52) + arrow(6, 38, 114, 38), 'つきぬける → 最初から 最後まで・やりとげる'],
    away: [dot(16, 38) + arrow(26, 38, 92, 38) + dot(102, 38, 3, 'dt faint') + dot(112, 38, 2, 'dt faint'), '離れて 遠くへ → 消える・どんどん 続ける'],
    back: ['<path class="mv" d="M18,52 H82 A14,14 0 0 0 82,24 H30"/>' + head(22, 24, Math.PI) + dot(18, 52, 5), 'もとの 所へ もどる・うしろへ'],
    forward: [line(10, 60, 110, 60) + dot(20, 40) + arrow(30, 40, 108, 40), '前へ。先の ことへ 向かう'],
    for: ['<circle class="bx" cx="100" cy="38" r="12"/>' + arrow(8, 38, 76, 38) + line(78, 38, 88, 38, 'gd dash'), '～に 向かって（求めて）。まだ 届いていない'],
    to: ['<circle class="bx" cx="98" cy="38" r="12"/>' + arrow(8, 38, 86, 38), '～に 向かって 届く（到達）'],
    with: [dot(42, 38) + dot(78, 38) + line(48, 38, 72, 38, 'gd thick'), 'いっしょに・持って・つながって'],
    by: [box(18, 18, 44, 40) + dot(82, 38), '～の そばに → ～によって・～までに'],
    about: [dot(60, 38) + dot(30, 20, 3, 'dt faint') + dot(92, 22, 3, 'dt faint') + dot(26, 56, 3, 'dt faint') + dot(96, 54, 3, 'dt faint') + dot(60, 10, 3, 'dt faint') + dot(60, 66, 3, 'dt faint'), 'まわり・周辺 → ～について・すぐ そばに'],
    around: [dot(60, 38) + '<path class="mv" d="M60,10 A28,28 0 1 1 33,30"/>' + head(36, 25, -1.0), 'ぐるっと まわりを 回る'],
    across: ['<rect class="band" x="44" y="6" width="32" height="62"/>' + arrow(10, 38, 110, 38), '横切って 向こう側へ'],
    along: [line(8, 56, 112, 56) + arrow(14, 40, 106, 40), '～に 沿って 進む'],
    of: ['<circle class="bx" cx="54" cy="38" r="26"/>' + dot(76, 26, 7, 'dt') , '全体の 一部・つながり（～の）'],
    at: [line(96, 22, 96, 54, 'gd') + line(80, 38, 112, 38, 'gd') + dot(96, 38, 4) + arrow(10, 38, 88, 38), 'ある 一点に ねらいを つける'],
    from: [dot(18, 38, 7, 'dt') + arrow(30, 38, 108, 38), '～から（出発点・もとに なる所）'],
    under: [line(10, 24, 110, 24) + dot(60, 46), '～の 下に → ～を 受けて（～中）'],
    after: [dot(84, 38) + dot(40, 38, 6, 'dt faint') + arrow(48, 38, 74, 38), 'あとを 追いかける'],
    apart: [dot(60, 38, 4, 'dt faint') + arrow(54, 38, 12, 38) + arrow(66, 38, 108, 38), 'ばらばらに 離れる'],
    behind: [box(54, 10, 44, 54) + dot(30, 38, 6, 'dt faint'), '～の うしろに・おくれて'],
    against: [box(84, 10, 14, 54) + arrow(10, 38, 80, 38), '～に 向かって ぶつかる → 反対して'],
    together: [arrow(10, 38, 52, 38) + arrow(110, 38, 68, 38), 'ひとつに 集まる'],
    ahead: [line(10, 60, 110, 60) + dot(24, 40, 5, 'dt faint') + dot(98, 40) + arrow(34, 40, 86, 40, 'mv dash'), 'ほかより 前に・先に']
  };
  var ORDER = ['up', 'down', 'out', 'off', 'over', 'through', 'away', 'back', 'forward', 'apart', 'together', 'ahead', 'around', 'across', 'along', 'behind', 'into', 'on', 'in', 'after', 'against', 'for', 'to', 'with', 'by', 'about', 'of', 'at', 'from', 'under'];

  var NOTVERB = ['as', 'in', 'on', 'at', 'by', 'for', 'of', 'to', 'with', 'from', 'under', 'be', 'a', 'an', 'the', 'no', 'not', 'so', 'all', 'out', 'up', 'off', 'over', 'after', 'about', 'according', 'due', 'instead', 'because', 'once', 'every', 'more', 'most', 'at', 'none', 'nothing', 'little', 'few', 'such', 'than', 'rather', 'regardless', 'on', 'one', 'each', 'other', 'it', 'there', 'that', 'what', 'apart', 'aside', 'along', 'prior', 'thanks', 'whether', 'even', 'as'];
  // 熟語の中で いちばん 意味を きめる 小さな語（動詞のあとの 副詞を 先に）
  function particleOf(en) {
    var ws = String(en).toLowerCase().replace(/[~.,!?]/g, ' ').split(/\s+/).filter(Boolean);
    // 「動詞 ＋ 小さな語」の 熟語だけ（as a result of・be familiar with・in advance などの 決まり文句には 出さない）
    if (!ws.length || NOTVERB.indexOf(ws[0]) >= 0) return null;
    var found = ws.filter(function (w) { return P[w]; });
    if (!found.length) return null;
    found.sort(function (a, b) { return ORDER.indexOf(a) - ORDER.indexOf(b); });
    return found[0];
  }
  function svg(k) { return '<svg class="pfig" viewBox="0 0 120 72" aria-hidden="true">' + P[k][0] + '</svg>'; }
  function particle(en) {
    var k = particleOf(en); if (!k) return '';
    return '<div class="pimg">' + svg(k) + '<div><b class="en">' + k + '</b> の イメージ<br><span>' + P[k][1] + '</span></div></div>';
  }
  function raw(inner) { return '<svg class="pfig" viewBox="0 0 120 72" aria-hidden="true">' + inner + '</svg>'; }
  window.EKFIG = { particle: particle, particleOf: particleOf, svg: svg, raw: raw, h: { arrow: arrow, head: head, dot: dot, box: box, line: line }, list: Object.keys(P) };
})();
