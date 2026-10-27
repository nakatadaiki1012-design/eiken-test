// index.html が読みこむ ファイルの うしろに「?v=日時」を つける（更新のたびに 古いデータが 混ざらないように）
const fs = require('fs');
const v = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);
let h = fs.readFileSync('index.html', 'utf8');
h = h.replace(/((?:src|href)="(?:js|css)\/[^"?]+)(?:\?v=\d+)?"/g, '$1?v=' + v + '"');
fs.writeFileSync('index.html', h);
console.log('v=' + v);
