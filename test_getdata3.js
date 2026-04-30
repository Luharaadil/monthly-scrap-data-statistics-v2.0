async function run() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getRawSummary";
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log(text.substring(0, 300));
  } catch (e) {
    console.error(e);
  }
}
run();
