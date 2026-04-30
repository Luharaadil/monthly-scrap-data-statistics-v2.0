async function run() {
  const actions = ['', '?action=get', '?action=read', '?action=getData', '?action=getScrap', '?type=csv', '?type=json'];
  for (const a of actions) {
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec' + a);
      const text = await res.text();
      console.log(a, " => ", text.substring(0, 150));
    } catch (e) {
      console.error(e);
    }
  }
}
run();
