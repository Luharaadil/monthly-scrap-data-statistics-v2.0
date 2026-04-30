async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec";
  try {
    const r1 = await fetch(url);
    const t1 = await r1.text();
    console.log("GET no params length: ", t1.length, t1.substring(0, 100));
  } catch (e) {
    console.error(e);
  }
}
test();
