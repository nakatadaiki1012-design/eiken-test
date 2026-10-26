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
