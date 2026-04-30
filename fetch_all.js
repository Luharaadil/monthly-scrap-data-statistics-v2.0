async function run() {
  const actions = [
    '',
    '?action=getData',
    '?action=read',
    '?action=getScrap',
    '?action=get'
  ];
  for (const a of actions) {
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec' + a, { redirect: 'follow' });
      const text = await res.text();
      console.log("action", a, ":", text.substring(0, 150));
    } catch(e) {}
  }
}
run();
