import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlyData } from "../data";
import { translations, categories, categoryNamesZh } from "../i18n";
import { getMonthName } from "../lib/utils";

interface ChartProps {
  lang: 'en' | 'zh';
  category: string;
  onCategoryChange: (cat: string) => void;
  onLangChange: (lang: 'en' | 'zh') => void;
  primaryYear: string;
  onPrimaryYearChange: (year: string) => void;
  compareYear: string;
  onCompareYearChange: (year: string) => void;
  chartType: 'ratio' | 'weight';
  onChartTypeChange: (type: 'ratio' | 'weight') => void;
  data: MonthlyData[];
  onScreenshot?: () => void;
}

export function Chart({ 
  lang, 
  category, 
  onCategoryChange, 
  onLangChange,
  primaryYear,
  onPrimaryYearChange,
  compareYear,
  onCompareYearChange,
  chartType,
  onChartTypeChange,
  data,
  onScreenshot
}: ChartProps) {
  const t = translations[lang];

  const formatYAxis = (tickItem: number) => {
    if (chartType === 'weight') {
      return tickItem.toLocaleString("en-US");
    }
    return tickItem.toFixed(3);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-700 p-3 rounded-lg shadow-lg">
          <p className="text-zinc-300 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {chartType === 'weight' ? entry.value?.toLocaleString("en-US") : entry.value?.toFixed(3)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartData = data.map(d => ({
    month: getMonthName(d.month, lang),
    primaryValue: chartType === 'weight' ? d.data[primaryYear]?.totalScrapWeight : d.data[primaryYear]?.totalScrapRatio,
    compareValue: chartType === 'weight' ? d.data[compareYear]?.totalScrapWeight : d.data[compareYear]?.totalScrapRatio,
  }));

  const CustomLabelCompare = (props: any) => {
    const { x, y, value, index } = props;
    if (value === null || value === undefined) return null;
    const primaryVal = chartData[index]?.primaryValue;
    
    const isHigherOnScreen = primaryVal !== null && primaryVal !== undefined && value > primaryVal;
    
    const rectY = isHigherOnScreen ? -26 : 8;
    const textY = isHigherOnScreen ? -13 : 21;

    return (
      <g transform={`translate(${x},${y})`}>
        <rect x="-18" y={rectY} width="36" height="18" fill="#fff" rx="2" ry="2" />
        <text x="0" y={textY} dy="0" fill="#000" fontSize="11" fontWeight="bold" textAnchor="middle">
          {chartType === 'weight' ? value.toLocaleString("en-US") : value.toFixed(3)}
        </text>
      </g>
    );
  };

  const CustomLabelPrimary = (props: any) => {
    const { x, y, value, index } = props;
    if (value === null || value === undefined) return null;
    const compareVal = chartData[index]?.compareValue;
    
    const isHigherOnScreen = compareVal === null || compareVal === undefined || value >= compareVal;
    
    const rectY = isHigherOnScreen ? -26 : 8;
    const textY = isHigherOnScreen ? -13 : 21;

    return (
      <g transform={`translate(${x},${y})`}>
        <rect x="-18" y={rectY} width="36" height="18" fill="#00BFFF" rx="2" ry="2" />
        <text x="0" y={textY} dy="0" fill="#000" fontSize="11" fontWeight="bold" textAnchor="middle">
          {chartType === 'weight' ? value.toLocaleString("en-US") : value.toFixed(3)}
        </text>
      </g>
    );
  };

  const availableYears = ["2026", "2025", "2024", "2023"];

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-shrink-0">
      <div className="p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-[#7bc97b] to-[#90EE90] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            {compareYear} / {primaryYear} {categoryNamesZh[category] || category}{chartType === 'ratio' ? '報廢率' : '報廢重量'}
          </h1>
          <p className="text-gray-800 mt-1 font-medium text-sm lg:text-base">
            {t.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center bg-white/40 p-2 rounded-lg backdrop-blur-sm border border-white/50">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-800 whitespace-nowrap">{t.primaryYear}:</label>
            <select 
              value={primaryYear} 
              onChange={(e) => onPrimaryYearChange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium shadow-sm outline-none"
            >
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-800 whitespace-nowrap">{t.compareYear}:</label>
            <select 
              value={compareYear} 
              onChange={(e) => onCompareYearChange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium shadow-sm outline-none"
            >
              {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-800 whitespace-nowrap">{t.category}:</label>
            <select 
              value={category} 
              onChange={(e) => onCategoryChange(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium shadow-sm outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-800 whitespace-nowrap">{lang === 'zh' ? '圖表類型' : 'Chart Type'}:</label>
            <select 
              value={chartType} 
              onChange={(e) => onChartTypeChange(e.target.value as 'ratio' | 'weight')}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium shadow-sm outline-none"
            >
              <option value="ratio">{lang === 'zh' ? '報廢率 (%)' : 'Scrap Ratio (%)'}</option>
              <option value="weight">{lang === 'zh' ? '報廢重量 (KG)' : 'Scrap Weight (KG)'}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-800 whitespace-nowrap">{t.language}:</label>
            <select 
              value={lang} 
              onChange={(e) => onLangChange(e.target.value as 'en' | 'zh')}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium shadow-sm outline-none"
            >
              <option value="zh">繁體中文</option>
              <option value="en">English</option>
            </select>
          </div>
          {onScreenshot && (
            <button
              onClick={onScreenshot}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm ml-2"
              title={lang === 'zh' ? '截圖下載' : 'Download Screenshot'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              {lang === 'zh' ? '截圖' : 'Screenshot'}
            </button>
          )}
        </div>
      </div>

      <div className="w-full h-[400px] bg-[#333333] p-4 relative">
        <div className="absolute top-4 right-8 flex items-center gap-4 text-sm font-bold z-10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-[#00BFFF]"></div>
            <span className="text-white">{primaryYear}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-white"></div>
            <span className="text-white">{compareYear}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" vertical={false} />
            <XAxis dataKey="month" stroke="#fff" tick={{ fill: "#fff", fontSize: 12 }} axisLine={{ stroke: "#fff" }} tickLine={false} />
            <YAxis stroke="#fff" tick={{ fill: "#fff", fontSize: 12 }} tickFormatter={formatYAxis} domain={[0, 'auto']} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="compareValue" name={compareYear} stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: "#fff" }} activeDot={{ r: 6 }} connectNulls label={<CustomLabelCompare />} />
            <Line type="monotone" dataKey="primaryValue" name={primaryYear} stroke="#00BFFF" strokeWidth={3} dot={{ r: 5, fill: "#00BFFF" }} activeDot={{ r: 7 }} connectNulls label={<CustomLabelPrimary />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
