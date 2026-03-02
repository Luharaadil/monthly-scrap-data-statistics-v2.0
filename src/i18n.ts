export const translations = {
  en: {
    title: "ALL RUBBER SCRAP RATIO",
    subtitle: "(MX / EX / CL / CT / CURING)",
    chartTitle: "Scrap Ratio Trend",
    tableTitle: "Detailed Monthly Data",
    months: "Months",
    category: "Category",
    language: "Language",
    primaryYear: "Primary Year",
    compareYear: "Compare Year",
  },
  zh: {
    title: "膠料總報廢率",
    subtitle: "(混練 / 押出 / 上膠 / 裁斷 / 加硫)",
    chartTitle: "報廢率趨勢",
    tableTitle: "每月詳細數據",
    months: "月份",
    category: "分類",
    language: "語言",
    primaryYear: "主要年份",
    compareYear: "比較年份",
  }
};

export const categories = [
  "MX_CB", "MX_CHM", "MX_RB", "CL_CH", "RUBBER ALL", "EX_RB", "CT_CH",
  "PLY ALL", "CT_RB", "BD_CH", "BW ALL", "CL_RB", "RSIP_CH",
  "CH ALL", "CL_PLY", "CL_FABRIC", "PLY/CH TOTAL", "CT_PLY", "CT_BW",
  "BD_PLY", "RSIP_PLY", "RSIP_RB", "BD_RB", "BD_BW"
];

export const categoryNamesZh: Record<string, string> = {
  "MX_CB": "混練碳煙報廢",
  "MX_CHM": "混練藥品報廢",
  "MX_RB": "混練膠料報廢",
  "CL_CH": "上膠防擦布報廢",
  "RUBBER ALL": "膠料總報廢",
  "EX_RB": "押出膠料報廢",
  "CT_CH": "裁斷防擦布報廢",
  "PLY ALL": "簾布總報廢",
  "CT_RB": "裁斷膠料報廢",
  "BD_CH": "成型防擦布報廢",
  "BW ALL": "鋼絲總報廢",
  "CL_RB": "上膠膠料報廢",
  "RSIP_CH": "膠檢防擦布報廢",
  "CH ALL": "防擦布總報廢",
  "CL_PLY": "上膠簾布報廢",
  "CL_FABRIC": "上膠原紗報廢",
  "PLY/CH TOTAL": "簾布/防擦布總報廢",
  "CT_PLY": "裁斷簾布報廢",
  "CT_BW": "裁斷鋼絲報廢",
  "BD_PLY": "成型簾布報廢",
  "RSIP_PLY": "膠檢簾布報廢",
  "RSIP_RB": "膠檢膠料報廢",
  "BD_RB": "成型膠料報廢",
  "BD_BW": "成型鋼絲報廢"
};
