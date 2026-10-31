/* クラス対戦のデータベース（Firebase Realtime Database）の URL。
   ここに 書いておくと、先生も 生徒も 設定なしで クラス対戦が 使えます。
   論理表現ラボと 同じ データベースを 使っています（部屋は「e＋番号」で 分けているので ぶつかりません）。
   自分の データベースを 使うときは、ここを 書きかえるか、クラス対戦の ハブの「⚙ データベース」に 入れてください */
window.EK_CONFIG = {
  db: "https://english-logical-default-rtdb.firebaseio.com"
};
