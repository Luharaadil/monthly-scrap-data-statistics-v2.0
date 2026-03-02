import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { Chart } from "./Chart";
import { DataTable } from "./DataTable";
import { translations, categoryNamesZh } from "../i18n";
import { fetchScrapData } from "../services/dataService";
import { MonthlyData, data as fallbackData } from "../data";

export function Dashboard() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [category, setCategory] = useState('MX_RB');
  const [primaryYear, setPrimaryYear] = useState('2026');
  const [compareYear, setCompareYear] = useState('2024');
  const [chartType, setChartType] = useState<'ratio' | 'weight'>('ratio');
  const [chartData, setChartData] = useState<MonthlyData[]>(fallbackData);
  const [loading, setLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  
  const t = translations[lang];

  const handleScreenshot = async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    
    // Save current scroll position
    const scrollY = window.scrollY;
    
    try {
      // Scroll to top to prevent html2canvas from cutting off content
      window.scrollTo(0, 0);
      
      // Small delay to allow React to re-render without overflow constraints
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: '#f9fafb',
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight,
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${primaryYear}_${compareYear}_${category}_Scrap_Data.png`;
      link.click();
    } catch (err) {
      console.error("Screenshot failed", err);
    } finally {
      setIsCapturing(false);
      // Restore scroll position
      window.scrollTo(0, scrollY);
    }
  };

  useEffect(() => {
    if (['MX_RB', 'EX_RB', 'MX_CB', 'MX_CHM', 'CL_PLY', 'CL_FABRIC', 'CL_RB', 'CL_CH', 'CT_CH', 'CT_RB', 'CT_PLY', 'CT_BW', 'BD_RB', 'BD_PLY', 'BD_CH', 'BD_BW', 'RUBBER ALL', 'PLY ALL', 'RSIP_RB', 'RSIP_PLY', 'RSIP_CH', 'BW ALL', 'CH ALL'].includes(category)) {
      setLoading(true);
      fetchScrapData(category)
        .then(data => {
          setChartData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch data", err);
          setLoading(false);
        });
    } else {
      setChartData(fallbackData);
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex flex-col">
      {/* Main Content Area - Full Screen */}
      <div 
        ref={captureRef}
        className={`flex-1 p-4 lg:p-6 max-w-[1920px] mx-auto w-full flex flex-col gap-6 ${isCapturing ? 'h-auto overflow-visible' : ''}`}
      >
        
        {/* Chart Section with integrated Header */}
        <Chart 
          lang={lang} 
          category={category} 
          onCategoryChange={setCategory} 
          onLangChange={setLang} 
          primaryYear={primaryYear}
          onPrimaryYearChange={setPrimaryYear}
          compareYear={compareYear}
          onCompareYearChange={setCompareYear}
          chartType={chartType}
          onChartTypeChange={setChartType}
          data={chartData}
          onScreenshot={handleScreenshot}
        />
        
        {/* Table Section */}
        <div className={`w-full bg-white rounded-2xl shadow-sm border border-gray-200 flex-col relative ${isCapturing ? 'flex-none h-auto overflow-visible' : 'flex-1 overflow-hidden flex'}`}>
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">
              {compareYear}/{primaryYear}年 {categoryNamesZh[category] || category} 每月詳細資料
            </h2>
          </div>
          <div className={isCapturing ? 'overflow-visible' : 'flex-1 overflow-auto'}>
            <DataTable 
              lang={lang} 
              primaryYear={primaryYear} 
              compareYear={compareYear} 
              data={chartData}
              category={category}
              isCapturing={isCapturing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


