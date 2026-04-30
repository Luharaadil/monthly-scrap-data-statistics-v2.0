async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec";
  try {
    const r1 = await fetch(url);
    console.log("GET no params: ", await r1.text());
  } catch (e) {}
  try {
    const r2 = await fetch(url + "?action=get");
    console.log("GET action=get: ", await r2.text());
  } catch (e) {}
  try {
    const r3 = await fetch(url + "?action=getData");
    console.log("GET action=getData: ", await r3.text());
  } catch (e) {}
  try {
    const r4 = await fetch(url + "?action=read");
    console.log("GET action=read: ", await r4.text());
  } catch (e) {}
  try {
    const r5 = await fetch(url + "?type=csv");
    console.log("GET type=csv: ", await r5.text());
  } catch (e) {}
}
test();
