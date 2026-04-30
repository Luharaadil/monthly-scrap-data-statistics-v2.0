async function run() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getRawScrap";
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("Keys:", Object.keys(json));
    if (json.data && json.data.length > 0) {
      console.log("Headers:", json.data[0]);
      console.log("Row 1:", json.data[1]);
    } else {
      console.log("Data:", json);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
