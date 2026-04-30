async function run() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec";
  const res = await fetch(url + "?action=get");
  const text = await res.text();
  console.log("With ?action=get", text.substring(0, 100));

  const res2 = await fetch(url);
  const text2 = await res2.text();
  console.log("Without params", text2.substring(0, 500));
}
run();
