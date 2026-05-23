async function run() {
  const url = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getData&startDate=2010-01-01&endDate=2030-12-31";
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log("Summaries:", json.summaries ? json.summaries.length : 0);
    console.log("Scraps:", json.scraps ? json.scraps.length : 0);
    
    const summaryYears = {};
    if (json.summaries) {
      json.summaries.forEach(s => {
        const y = s.date.substring(0, 4);
        summaryYears[y] = (summaryYears[y] || 0) + 1;
      });
    }
    console.log("Summary years distribution:", summaryYears);

    const scrapYears = {};
    if (json.scraps) {
      json.scraps.forEach(s => {
        const y = s.date.substring(0, 4);
        scrapYears[y] = (scrapYears[y] || 0) + 1;
      });
    }
    console.log("Scrap years distribution:", scrapYears);
  } catch (e) {
    console.error(e);
  }
}
run();
