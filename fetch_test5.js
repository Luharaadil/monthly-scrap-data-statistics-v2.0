async function run() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getData');
    const text = await res.text();
    console.log("data:", text);
  } catch(e) {
    console.error(e);
  }
}
run();
