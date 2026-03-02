export type YearlyData = {
  prodWeight: number | null;
  mxRubber: number | null;
  mxCbRubber?: number | null;
  mxChmRubber?: number | null;
  exRubber: number | null;
  clPlyRubber?: number | null;
  clFabricRubber?: number | null;
  clRbRubber?: number | null;
  clChRubber?: number | null;
  ctChRubber?: number | null;
  ctRbRubber?: number | null;
  ctPlyRubber?: number | null;
  ctBwRubber?: number | null;
  bdRbRubber?: number | null;
  bdPlyRubber?: number | null;
  bdChRubber?: number | null;
  bdBwRubber?: number | null;
  ctRubber: number | null;
  clRubber: number | null;
  curingRubber: number | null;
  rispRubber: number | null;
  exPlyRubber?: number | null;
  rispPlyRubber?: number | null;
  rispChRubber?: number | null;
  rsipBwRubber?: number | null;
  totalScrapWeight: number | null;
  totalScrapRatio: number | null;
};

export interface MonthlyData {
  month: string;
  data: Record<string, YearlyData>;
}

const m = (total: number | null) => total ? {
  mxRubber: Math.round(total * 0.15),
  exRubber: Math.round(total * 0.08),
  ctRubber: Math.round(total * 0.05),
  clRubber: Math.round(total * 0.22),
  curingRubber: Math.round(total * 0.30),
  rispRubber: Math.round(total * 0.20),
  totalScrapWeight: total,
  totalScrapRatio: null,
  prodWeight: null,
} : { mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null, prodWeight: null };

export const data: MonthlyData[] = [
  {
    month: "01",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 2608004, mxRubber: 274, exRubber: 143, ctRubber: 57, clRubber: 260, curingRubber: 590, rispRubber: 403, totalScrapWeight: 1727, totalScrapRatio: 6.600 },
      "2024": { prodWeight: 3019196, ...m(1523), totalScrapWeight: 1523, totalScrapRatio: 5.000 },
      "2023": { prodWeight: 2950000, ...m(1400), totalScrapWeight: 1400, totalScrapRatio: 4.700 },
    }
  },
  {
    month: "02",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 2278759, mxRubber: 250, exRubber: 120, ctRubber: 119, clRubber: 260, curingRubber: 590, rispRubber: 403, totalScrapWeight: 1743, totalScrapRatio: 7.700 },
      "2024": { prodWeight: 3082797, ...m(1738), totalScrapWeight: 1738, totalScrapRatio: 5.600 },
      "2023": { prodWeight: 2800000, ...m(1500), totalScrapWeight: 1500, totalScrapRatio: 5.300 },
    }
  },
  {
    month: "03",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 1984596, mxRubber: 199, exRubber: 129, ctRubber: 76, clRubber: 250, curingRubber: 630, rispRubber: 210, totalScrapWeight: 1493, totalScrapRatio: 7.500 },
      "2024": { prodWeight: 2811764, ...m(2028), totalScrapWeight: 2028, totalScrapRatio: 7.200 },
      "2023": { prodWeight: 2700000, ...m(1800), totalScrapWeight: 1800, totalScrapRatio: 6.600 },
    }
  },
  {
    month: "04",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 2519062, mxRubber: 584, exRubber: 120, ctRubber: 58, clRubber: 231, curingRubber: 740, rispRubber: 271, totalScrapWeight: 2003, totalScrapRatio: 8.000 },
      "2024": { prodWeight: 3191762, ...m(2635), totalScrapWeight: 2635, totalScrapRatio: 8.300 },
      "2023": { prodWeight: 3000000, ...m(2200), totalScrapWeight: 2200, totalScrapRatio: 7.300 },
    }
  },
  {
    month: "05",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 3177614, mxRubber: 352, exRubber: 108, ctRubber: 73, clRubber: 387, curingRubber: 580, rispRubber: 400, totalScrapWeight: 1901, totalScrapRatio: 6.000 },
      "2024": { prodWeight: 3096244, ...m(2095), totalScrapWeight: 2095, totalScrapRatio: 6.800 },
      "2023": { prodWeight: 2900000, ...m(1900), totalScrapWeight: 1900, totalScrapRatio: 6.500 },
    }
  },
  {
    month: "06",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 2759181, mxRubber: 857, exRubber: 135, ctRubber: 90, clRubber: 1187, curingRubber: 450, rispRubber: 297, totalScrapWeight: 3016, totalScrapRatio: 10.900 },
      "2024": { prodWeight: 2410821, ...m(1249), totalScrapWeight: 1249, totalScrapRatio: 5.200 },
      "2023": { prodWeight: 2500000, ...m(1300), totalScrapWeight: 1300, totalScrapRatio: 5.200 },
    }
  },
  {
    month: "07",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 3168552, mxRubber: 402, exRubber: 161, ctRubber: 120, clRubber: 796, curingRubber: 590, rispRubber: 300, totalScrapWeight: 2369, totalScrapRatio: 7.500 },
      "2024": { prodWeight: 3558901, ...m(1855), totalScrapWeight: 1855, totalScrapRatio: 5.200 },
      "2023": { prodWeight: 3400000, ...m(1700), totalScrapWeight: 1700, totalScrapRatio: 5.000 },
    }
  },
  {
    month: "08",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 3061308, mxRubber: 417, exRubber: 525, ctRubber: 81, clRubber: 169, curingRubber: 470, rispRubber: 270, totalScrapWeight: 1933, totalScrapRatio: 6.300 },
      "2024": { prodWeight: 3105545, ...m(2072), totalScrapWeight: 2072, totalScrapRatio: 6.700 },
      "2023": { prodWeight: 3000000, ...m(1900), totalScrapWeight: 1900, totalScrapRatio: 6.300 },
    }
  },
  {
    month: "09",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 3107375, mxRubber: 262, exRubber: 145, ctRubber: 120, clRubber: 647, curingRubber: 270, rispRubber: 350, totalScrapWeight: 1794, totalScrapRatio: 5.800 },
      "2024": { prodWeight: 2120634, ...m(1964), totalScrapWeight: 1964, totalScrapRatio: 9.300 },
      "2023": { prodWeight: 2200000, ...m(1800), totalScrapWeight: 1800, totalScrapRatio: 8.100 },
    }
  },
  {
    month: "10",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: 2361554, mxRubber: 172, exRubber: 81, ctRubber: 94, clRubber: 47, curingRubber: 420, rispRubber: 261, totalScrapWeight: 1075, totalScrapRatio: 4.600 },
      "2024": { prodWeight: 2414315, ...m(2155), totalScrapWeight: 2155, totalScrapRatio: 8.900 },
      "2023": { prodWeight: 2500000, ...m(2000), totalScrapWeight: 2000, totalScrapRatio: 8.000 },
    }
  },
  {
    month: "11",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2024": { prodWeight: 2743055, ...m(1633), totalScrapWeight: 1633, totalScrapRatio: 6.000 },
      "2023": { prodWeight: 2600000, ...m(1500), totalScrapWeight: 1500, totalScrapRatio: 5.700 },
    }
  },
  {
    month: "12",
    data: {
      "2026": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2025": { prodWeight: null, mxRubber: null, exRubber: null, ctRubber: null, clRubber: null, curingRubber: null, rispRubber: null, totalScrapWeight: null, totalScrapRatio: null },
      "2024": { prodWeight: 2787221, ...m(1633), totalScrapWeight: 1633, totalScrapRatio: 5.900 },
      "2023": { prodWeight: 2700000, ...m(1550), totalScrapWeight: 1550, totalScrapRatio: 5.700 },
    }
  },
];
