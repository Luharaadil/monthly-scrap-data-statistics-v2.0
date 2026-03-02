import Papa from "papaparse";
import { MonthlyData, YearlyData } from "../data";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUYQGdhyZVe--2uuwb4dgfi44pBg_Rk6yj7zdlNmWg0F_rAJg2z2V7gkBWHsGznsg-VsEWAjNeUG5q/pub?gid=0&single=true&output=csv";

export async function fetchScrapData(category: string): Promise<MonthlyData[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(CSV_URL, {
      download: true,
      header: false,
      complete: (results) => {
        const rows = results.data as string[][];
        
        // Skip header rows (0 and 1)
        const dataRows = rows.slice(2);
        
        const monthlyDataMap: Record<string, Record<string, YearlyData>> = {};
        
        // Initialize months 01 to 12
        for (let i = 1; i <= 12; i++) {
          const monthStr = i.toString().padStart(2, "0");
          monthlyDataMap[monthStr] = {};
        }

        dataRows.forEach((row) => {
          if (!row[0] || !row[0].includes("/")) return;
          
          const [monthStr, yearStr] = row[0].split("/");
          if (!monthStr || !yearStr) return;
          
          const month = monthStr.padStart(2, "0");
          const year = yearStr;
          
          let scrap = null;
          let prodWeight = null;
          
          if (category === 'MX_RB') {
            scrap = parseFloat(row[1]) || null;
            prodWeight = parseFloat(row[2]) || null;
          } else if (category === 'MX_CB') {
            scrap = parseFloat(row[3]) || null;
            prodWeight = parseFloat(row[2]) || null;
          } else if (category === 'MX_CHM') {
            scrap = parseFloat(row[4]) || null;
            prodWeight = parseFloat(row[2]) || null;
          } else if (category === 'EX_RB') {
            scrap = parseFloat(row[5]) || null;
            prodWeight = parseFloat(row[6]) || null;
          } else if (category === 'CL_PLY') {
            scrap = parseFloat(row[7]) || null;
            prodWeight = parseFloat(row[8]) || null;
          } else if (category === 'CL_FABRIC') {
            scrap = parseFloat(row[9]) || null;
            prodWeight = parseFloat(row[10]) || null;
          } else if (category === 'CL_RB') {
            scrap = parseFloat(row[11]) || null;
            prodWeight = parseFloat(row[12]) || null;
          } else if (category === 'CL_CH') {
            scrap = parseFloat(row[12]) || null;
            prodWeight = parseFloat(row[14]) || null;
          } else if (category === 'CT_CH') {
            scrap = parseFloat(row[15]) || null;
            prodWeight = parseFloat(row[16]) || null;
          } else if (category === 'CT_RB') {
            scrap = parseFloat(row[17]) || null;
            prodWeight = parseFloat(row[18]) || null;
          } else if (category === 'CT_PLY') {
            scrap = parseFloat(row[19]) || null;
            prodWeight = parseFloat(row[20]) || null;
          } else if (category === 'CT_BW') {
            scrap = parseFloat(row[21]) || null;
            prodWeight = parseFloat(row[22]) || null;
          } else if (category === 'BD_RB') {
            scrap = parseFloat(row[23]) || null;
            prodWeight = parseFloat(row[24]) || null;
          } else if (category === 'BD_PLY') {
            scrap = parseFloat(row[25]) || null;
            prodWeight = parseFloat(row[26]) || null;
          } else if (category === 'BD_CH') {
            scrap = parseFloat(row[27]) || null;
            prodWeight = parseFloat(row[28]) || null;
          } else if (category === 'BD_BW') {
            scrap = parseFloat(row[29]) || null;
            prodWeight = parseFloat(row[30]) || null;
          } else if (category === 'RSIP_RB') {
            scrap = parseFloat(row[33]) || null;
            prodWeight = parseFloat(row[2]) || null; // Column C is index 2
          } else if (category === 'RSIP_PLY') {
            scrap = parseFloat(row[35]) || null; // Column AJ is index 35
            prodWeight = parseFloat(row[26]) || null; // Column AA is index 26
          } else if (category === 'RSIP_CH') {
            scrap = parseFloat(row[37]) || null; // Column AL is index 37
            prodWeight = parseFloat(row[28]) || null; // Column AC is index 28
          } else if (category === 'RUBBER ALL') {
            const mxScrap = parseFloat(row[1]) || null;
            const exScrap = parseFloat(row[5]) || null;
            const clScrap = parseFloat(row[11]) || null;
            const ctScrap = parseFloat(row[13]) || null;
            const curingScrap = parseFloat(row[31]) || null;
            const rispScrap = parseFloat(row[33]) || null;
            
            const hasAnyScrap = mxScrap !== null || exScrap !== null || clScrap !== null || ctScrap !== null || curingScrap !== null || rispScrap !== null;
            if (hasAnyScrap) {
              scrap = (mxScrap || 0) + (exScrap || 0) + (clScrap || 0) + (ctScrap || 0) + (curingScrap || 0) + (rispScrap || 0);
            }
            prodWeight = parseFloat(row[2]) || null;
          } else if (category === 'PLY ALL') {
            const clPlyScrap = parseFloat(row[7]) || null;
            const ctPlyScrap = parseFloat(row[19]) || null;
            const bdPlyScrap = parseFloat(row[25]) || null;
            const rispPlyScrap = parseFloat(row[35]) || null;
            
            const hasAnyScrap = clPlyScrap !== null || ctPlyScrap !== null || bdPlyScrap !== null || rispPlyScrap !== null;
            if (hasAnyScrap) {
              scrap = (clPlyScrap || 0) + (ctPlyScrap || 0) + (bdPlyScrap || 0) + (rispPlyScrap || 0);
            }
            prodWeight = parseFloat(row[8]) || null;
          } else if (category === 'BW ALL') {
            const ctBwScrap = parseFloat(row[21]) || null;
            const bdBwScrap = parseFloat(row[29]) || null;
            
            const hasAnyScrap = ctBwScrap !== null || bdBwScrap !== null;
            if (hasAnyScrap) {
              scrap = (ctBwScrap || 0) + (bdBwScrap || 0);
            }
            prodWeight = parseFloat(row[22]) || null; // CT_BW production
          } else if (category === 'CH ALL') {
            const ctChScrap = parseFloat(row[15]) || null;
            const bdChScrap = parseFloat(row[27]) || null;
            const rsipChScrap = parseFloat(row[37]) || null;
            
            const hasAnyScrap = ctChScrap !== null || bdChScrap !== null || rsipChScrap !== null;
            if (hasAnyScrap) {
              scrap = (ctChScrap || 0) + (bdChScrap || 0) + (rsipChScrap || 0);
            }
            prodWeight = parseFloat(row[16]) || null; // CT_CH production
          }
          
          if (!monthlyDataMap[month]) {
            monthlyDataMap[month] = {};
          }
          
          monthlyDataMap[month][year] = {
            prodWeight: prodWeight,
            mxRubber: category === 'MX_RB' ? scrap : (category === 'RUBBER ALL' ? (parseFloat(row[1]) || null) : null),
            mxCbRubber: category === 'MX_CB' ? scrap : null,
            mxChmRubber: category === 'MX_CHM' ? scrap : null,
            exRubber: category === 'EX_RB' ? scrap : (category === 'RUBBER ALL' ? (parseFloat(row[5]) || null) : null),
            clPlyRubber: category === 'CL_PLY' ? scrap : (category === 'PLY ALL' ? (parseFloat(row[7]) || null) : null),
            clFabricRubber: category === 'CL_FABRIC' ? scrap : null,
            clRbRubber: category === 'CL_RB' ? scrap : null,
            clChRubber: category === 'CL_CH' ? scrap : null,
            ctChRubber: category === 'CT_CH' ? scrap : (category === 'CH ALL' ? (parseFloat(row[15]) || null) : null),
            ctRbRubber: category === 'CT_RB' ? scrap : null,
            ctPlyRubber: category === 'CT_PLY' ? scrap : (category === 'PLY ALL' ? (parseFloat(row[19]) || null) : null),
            ctBwRubber: category === 'CT_BW' ? scrap : (category === 'BW ALL' ? (parseFloat(row[21]) || null) : null),
            bdRbRubber: category === 'BD_RB' ? scrap : null,
            bdPlyRubber: category === 'BD_PLY' ? scrap : (category === 'PLY ALL' ? (parseFloat(row[25]) || null) : null),
            bdChRubber: category === 'BD_CH' ? scrap : (category === 'CH ALL' ? (parseFloat(row[27]) || null) : null),
            bdBwRubber: category === 'BD_BW' ? scrap : (category === 'BW ALL' ? (parseFloat(row[29]) || null) : null),
            ctRubber: category === 'RUBBER ALL' ? (parseFloat(row[13]) || null) : null,
            clRubber: category === 'RUBBER ALL' ? (parseFloat(row[11]) || null) : null,
            curingRubber: category === 'RUBBER ALL' ? (parseFloat(row[31]) || null) : null,
            rispRubber: category === 'RUBBER ALL' ? (parseFloat(row[33]) || null) : (category === 'RSIP_RB' ? scrap : null),
            exPlyRubber: null,
            rispPlyRubber: category === 'PLY ALL' ? (parseFloat(row[35]) || null) : (category === 'RSIP_PLY' ? scrap : null),
            rispChRubber: category === 'RSIP_CH' ? scrap : (category === 'CH ALL' ? (parseFloat(row[37]) || null) : null),
            rsipBwRubber: null,
            totalScrapWeight: scrap,
            totalScrapRatio: (scrap !== null && prodWeight !== null && prodWeight > 0) 
              ? (scrap / prodWeight) * 100 
              : null,
          };
        });

        const formattedData: MonthlyData[] = Object.keys(monthlyDataMap)
          .sort()
          .map((month) => ({
            month,
            data: monthlyDataMap[month],
          }));
          
        resolve(formattedData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}
