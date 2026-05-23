import Papa from 'papaparse';

async function run() {
  const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUYQGdhyZVe--2uuwb4dgfi44pBg_Rk6yj7zdlNmWg0F_rAJg2z2V7gkBWHsGznsg-VsEWAjNeUG5q/pub?output=csv";
  const PROD_URL = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec?action=getData&startDate=2020-01-01&endDate=2030-12-31";

  console.log("Fetching CSV...");
  const csvRes = await fetch(CSV_URL);
  const csvText = await csvRes.text();
  const oldData = Papa.parse(csvText, { header: false });

  console.log("Fetching JSON from Apps Script...");
  const probRes = await fetch(PROD_URL);
  const prodDataReq = await probRes.json();

  console.log("Summaries record count:", prodDataReq.summaries?.length);
  console.log("Scrap record count:", prodDataReq.scraps?.length);

  // Re-run the client range initialization to get natural month distribution
  // (We simulate customMonthRanges as empty or as defined in the Google Sheet)
  const customMonthRanges = {
    "2026-05": { "year": "2026", "month": "05", "start": "2026-04-28", "end": "2026-05-28" },
    "2026-04": { "year": "2026", "month": "04", "start": "2026-04-01", "end": "2026-04-30" }
  };

  function getTargetMonthYear(d, useUTC = false) {
    let monthNum = useUTC ? d.getUTCMonth() + 1 : d.getMonth() + 1;
    let yearNum = useUTC ? d.getUTCFullYear() : d.getFullYear();
    
    try {
      const ranges = customMonthRanges;
      for (const key in ranges) {
        const r = ranges[key];
        if (r.start && r.end) {
          const [sY, sM, sD] = r.start.split('-').map(Number);
          const [eY, eM, eD] = r.end.split('-').map(Number);
          
          let start = new Date(sY, sM - 1, sD, 0, 0, 0);
          let end = new Date(eY, eM - 1, eD, 23, 59, 59, 999);
          if (useUTC) {
            start = new Date(Date.UTC(sY, sM - 1, sD, 0, 0, 0));
            end = new Date(Date.UTC(eY, eM - 1, eD, 23, 59, 59, 999));
          }
          
          if (d >= start && d <= end) {
            return { month: r.month.toString().padStart(2, "0"), year: String(r.year || yearNum) };
          }
        }
      }
      
      const naturalKey = `${yearNum}-${monthNum.toString().padStart(2, "0")}`;
      if (ranges[naturalKey]) {
        const r = ranges[naturalKey];
        if (r.start && r.end) {
          const [sY, sM, sD] = r.start.split('-').map(Number);
          const [eY, eM, eD] = r.end.split('-').map(Number);
          
          let start = new Date(sY, sM - 1, sD, 0, 0, 0);
          let end = new Date(eY, eM - 1, eD, 23, 59, 59, 999);
          if (useUTC) {
            start = new Date(Date.UTC(sY, sM - 1, sD, 0, 0, 0));
            end = new Date(Date.UTC(eY, eM - 1, eD, 23, 59, 59, 999));
          }
          
          if (d < start) {
            monthNum -= 1;
            if (monthNum < 1) {
              monthNum = 12;
              yearNum -= 1;
            }
          } else if (d > end) {
            monthNum += 1;
            if (monthNum > 12) {
              monthNum = 1;
              yearNum += 1;
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    
    return {
      month: monthNum.toString().padStart(2, "0"),
      year: yearNum.toString()
    };
  }

  // category: "RUBBER ALL"
  const category = "RUBBER ALL";
  const monthlyDataMap = {};
  for (let i = 1; i <= 12; i++) {
    const monthStr = i.toString().padStart(2, "0");
    monthlyDataMap[monthStr] = {};
  }

  const oldRows = oldData.data ? oldData.data.slice(2) : [];
  oldRows.forEach((row) => {
    if (!row[0] || !row[0].includes("/")) return;
    const dateParts = row[0].split("/");
    let month, year;
    if (dateParts.length === 2) {
      month = dateParts[0].padStart(2, "0");
      year = dateParts[1];
    } else if (dateParts.length === 3) {
      let d = new Date(row[0]);
      if (isNaN(d.getTime())) {
         d = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
      }
      if (!isNaN(d.getTime())) {
        const targetInfo = getTargetMonthYear(d);
        month = targetInfo.month;
        year = targetInfo.year;
      } else {
        month = dateParts[1].padStart(2, "0");
        year = dateParts[2];
      }
    }
    if (!month || !year) return;

    const getVal = (idx) => {
      const val = parseFloat(row[idx]);
      return isNaN(val) ? null : val;
    };

    let prodWeight = null;
    if (category === 'MX_RB' || category === 'MX_CB' || category === 'MX_CHM' || category === 'RUBBER ALL') prodWeight = getVal(2);
    // (Other categories omitted in simulation for brevity)

    if (!monthlyDataMap[month][year]) {
      monthlyDataMap[month][year] = { prodWeight: null, scrapPercentRubber: null, scrapPercentPlyChafer: null, scrapPercentBW: null };
      const fields = ['mxRubber','mxCbRubber','mxChmRubber','exRubber','clPlyRubber','clFabricRubber','clRbRubber','clRubber','clChRubber','ctChRubber','ctRbRubber','ctRubber','ctPlyRubber','ctBwRubber','bdRbRubber','bdPlyRubber','bdChRubber','bdBwRubber','curingRubber','rispRubber','rispPlyRubber','rispChRubber','exPlyRubber'];
      fields.forEach(f => { monthlyDataMap[month][year][f] = 0; });
    }
    
    monthlyDataMap[month][year].prodWeight = prodWeight;
    monthlyDataMap[month][year].scrapPercentRubber = getVal(39);
    monthlyDataMap[month][year].scrapPercentPlyChafer = getVal(40);
    monthlyDataMap[month][year].scrapPercentBW = getVal(41);
  });

  if (prodDataReq && prodDataReq.summaries) {
    prodDataReq.summaries.forEach((row) => {
      const dateStr = row.date;
      if (!dateStr) return;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return;
      d.setUTCHours(d.getUTCHours() + 12);
      const targetInfo = getTargetMonthYear(d, true);
      const month = targetInfo.month;
      const year = targetInfo.year;

      if (!monthlyDataMap[month]) monthlyDataMap[month] = {};
      if (!monthlyDataMap[month][year]) {
        monthlyDataMap[month][year] = { prodWeight: null, scrapPercentRubber: null, scrapPercentPlyChafer: null, scrapPercentBW: null };
        const fields = ['mxRubber','mxCbRubber','mxChmRubber','exRubber','clPlyRubber','clFabricRubber','clRbRubber','clRubber','clChRubber','ctChRubber','ctRbRubber','ctRubber','ctPlyRubber','ctBwRubber','bdRbRubber','bdPlyRubber','bdChRubber','bdBwRubber','curingRubber','rispRubber','rispPlyRubber','rispChRubber','exPlyRubber'];
        fields.forEach(f => { monthlyDataMap[month][year][f] = 0; });
      }

      let addedProdWeight = 0;
      const isRubber = ['MX_RB', 'MX_CB', 'MX_CHM', 'EX_RB', 'CL_RB', 'CT_RB', 'BD_RB', 'CUR_RB', 'RSIP_RB', 'RUBBER ALL'].includes(category);
      
      if (isRubber) {
        addedProdWeight = parseFloat(row.rubberUsage) || 0;
      }

      if (addedProdWeight > 0) {
        if (monthlyDataMap[month][year].newProdWeight === undefined) {
          monthlyDataMap[month][year].newProdWeight = 0;
        }
        monthlyDataMap[month][year].newProdWeight += addedProdWeight;
      }
    });
  }

  // Apply newProdWeight to prodWeight
  Object.keys(monthlyDataMap).forEach(m => {
    Object.keys(monthlyDataMap[m]).forEach(y => {
      const entry = monthlyDataMap[m][y];
      if (entry.newProdWeight !== undefined) {
         entry.prodWeight = entry.newProdWeight;
      }
    });
  });

  const appScriptScraps = prodDataReq.scraps || [];
  appScriptScraps.forEach((row) => {
    if (!row) return;
    const dateStr = String(row.date).trim();
    if (!dateStr) return;
    let month, year;

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const targetInfo = getTargetMonthYear(d);
      month = targetInfo.month;
      year = targetInfo.year;
    }
    if (!month || !year) return;

    if (!monthlyDataMap[month]) monthlyDataMap[month] = {};
    if (!monthlyDataMap[month][year]) {
      monthlyDataMap[month][year] = { prodWeight: null, scrapPercentRubber: null, scrapPercentPlyChafer: null, scrapPercentBW: null };
      const fields = ['mxRubber','mxCbRubber','mxChmRubber','exRubber','clPlyRubber','clFabricRubber','clRbRubber','clRubber','clChRubber','ctChRubber','ctRbRubber','ctRubber','ctPlyRubber','ctBwRubber','bdRbRubber','bdPlyRubber','bdChRubber','bdBwRubber','curingRubber','rispRubber','rispPlyRubber','rispChRubber','exPlyRubber'];
      fields.forEach(f => { monthlyDataMap[month][year][f] = 0; });
    }

    const weight = parseFloat(String(row.weight).replace(/,/g, '')) || 0;
    const scrapType = String(row.material).trim().toUpperCase();
    const section = String(row.section).trim().toUpperCase();

    const target = monthlyDataMap[month][year];

    if ((section === 'MX' || section === 'MIXING') && scrapType === 'RUBBER') target.mxRubber += weight;
    if ((section === 'EX' || section === 'EXTRUSION') && scrapType === 'RUBBER') target.exRubber += weight;
    // (We simplify for the verification)
  });

  console.log("May 2026 data constructed:");
  console.log(monthlyDataMap["05"]["2026"]);
}

run();
