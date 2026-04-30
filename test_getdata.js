async function run() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getData";
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("Summaries:", json.summaries ? json.summaries.length : 0);
    if (json.summaries && json.summaries.length > 0) {
      console.log(json.summaries[0]);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
