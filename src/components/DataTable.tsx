import { MonthlyData } from "../data";
import { cn, getMonthName } from "../lib/utils";
import { translations } from "../i18n";

interface DataTableProps {
  lang: 'en' | 'zh';
  primaryYear: string;
  compareYear: string;
  data: MonthlyData[];
  category: string;
  isCapturing?: boolean;
}

export function DataTable({ lang, primaryYear, compareYear, data, category, isCapturing }: DataTableProps) {
  const t = translations[lang];

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "";
    return num.toLocaleString("en-US");
  };

  const formatRatio = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "";
    return num.toFixed(3);
  };

  const months = data.map((d) => getMonthName(d.month, lang));

  const rows = [
    {
      labelEn: `${primaryYear}_TOTAL Production Weight`,
      labelZh: `${primaryYear} 生產使用量總計`,
      getValue: (d: any) => d.data[primaryYear]?.prodWeight,
      formatter: formatNumber,
    },
    {
      labelEn: `${compareYear}_TOTAL Production Weight`,
      labelZh: `${compareYear} 生產使用量總計`,
      getValue: (d: any) => d.data[compareYear]?.prodWeight,
      formatter: formatNumber,
    },
    ...(category === 'MX_RB' ? [
      {
        labelEn: `${primaryYear}_MX RUBBER`,
        labelZh: `${primaryYear} 混練膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.mxRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_MX RUBBER`,
        labelZh: `${compareYear} 混練膠料報廢`,
        getValue: (d: any) => d.data[compareYear]?.mxRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'MX_CB' ? [
      {
        labelEn: `${primaryYear}_MX CB`,
        labelZh: `${primaryYear} 混練碳煙報廢`,
        getValue: (d: any) => d.data[primaryYear]?.mxCbRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_MX CB`,
        labelZh: `${compareYear} 混練碳煙報廢`,
        getValue: (d: any) => d.data[compareYear]?.mxCbRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'MX_CHM' ? [
      {
        labelEn: `${primaryYear}_MX CHM`,
        labelZh: `${primaryYear} 混練藥品報廢`,
        getValue: (d: any) => d.data[primaryYear]?.mxChmRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_MX CHM`,
        labelZh: `${compareYear} 混練藥品報廢`,
        getValue: (d: any) => d.data[compareYear]?.mxChmRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CL_PLY' ? [
      {
        labelEn: `${primaryYear}_CL PLY`,
        labelZh: `${primaryYear} 上膠簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CL PLY`,
        labelZh: `${compareYear} 上膠簾布報廢`,
        getValue: (d: any) => d.data[compareYear]?.clPlyRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CL_FABRIC' ? [
      {
        labelEn: `${primaryYear}_CL FABRIC`,
        labelZh: `${primaryYear} 上膠原紗報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clFabricRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CL FABRIC`,
        labelZh: `${compareYear} 上膠原紗報廢`,
        getValue: (d: any) => d.data[compareYear]?.clFabricRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CL_RB' ? [
      {
        labelEn: `${primaryYear}_CL RB`,
        labelZh: `${primaryYear} 上膠膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clRbRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CL RB`,
        labelZh: `${compareYear} 上膠膠料報廢`,
        getValue: (d: any) => d.data[compareYear]?.clRbRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CL_CH' ? [
      {
        labelEn: `${primaryYear}_CL CH`,
        labelZh: `${primaryYear} 上膠防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CL CH`,
        labelZh: `${compareYear} 上膠防擦布報廢`,
        getValue: (d: any) => d.data[compareYear]?.clChRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CT_CH' ? [
      {
        labelEn: `${primaryYear}_CT CH`,
        labelZh: `${primaryYear} 裁斷防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CT CH`,
        labelZh: `${compareYear} 裁斷防擦布報廢`,
        getValue: (d: any) => d.data[compareYear]?.ctChRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CT_RB' ? [
      {
        labelEn: `${primaryYear}_CT RB`,
        labelZh: `${primaryYear} 裁斷防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctRbRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CT RB`,
        labelZh: `${compareYear} 裁斷防擦布報廢`,
        getValue: (d: any) => d.data[compareYear]?.ctRbRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CT_PLY' ? [
      {
        labelEn: `${primaryYear}_CT PLY`,
        labelZh: `${primaryYear} 裁斷簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CT PLY`,
        labelZh: `${compareYear} 裁斷簾布報廢`,
        getValue: (d: any) => d.data[compareYear]?.ctPlyRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CT_BW' ? [
      {
        labelEn: `${primaryYear}_CT BW`,
        labelZh: `${primaryYear} 裁斷鋼絲報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctBwRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_CT BW`,
        labelZh: `${compareYear} 裁斷鋼絲報廢`,
        getValue: (d: any) => d.data[compareYear]?.ctBwRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'BD_RB' ? [
      {
        labelEn: `${primaryYear}_BD RB`,
        labelZh: `${primaryYear} 成型膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdRbRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_BD RB`,
        labelZh: `${compareYear} 成型膠料報廢`,
        getValue: (d: any) => d.data[compareYear]?.bdRbRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'BD_PLY' ? [
      {
        labelEn: `${primaryYear}_BD PLY`,
        labelZh: `${primaryYear} 成型簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_BD PLY`,
        labelZh: `${compareYear} 成型簾布報廢`,
        getValue: (d: any) => d.data[compareYear]?.bdPlyRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'BD_CH' ? [
      {
        labelEn: `${primaryYear}_BD CH`,
        labelZh: `${primaryYear} 成型防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_BD CH`,
        labelZh: `${compareYear} 成型防擦布報廢`,
        getValue: (d: any) => d.data[compareYear]?.bdChRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'BD_BW' ? [
      {
        labelEn: `${primaryYear}_BD BW`,
        labelZh: `${primaryYear} 成型鋼絲報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdBwRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_BD BW`,
        labelZh: `${compareYear} 成型鋼絲報廢`,
        getValue: (d: any) => d.data[compareYear]?.bdBwRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'RSIP_RB' ? [
      {
        labelEn: `${primaryYear}_RSIP RB`,
        labelZh: `${primaryYear} 膠檢膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_RSIP RB`,
        labelZh: `${compareYear} 膠檢膠料報廢`,
        getValue: (d: any) => d.data[compareYear]?.rispRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'RSIP_PLY' ? [
      {
        labelEn: `${primaryYear}_RSIP PLY`,
        labelZh: `${primaryYear} 膠檢簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_RSIP PLY`,
        labelZh: `${compareYear} 膠檢簾布報廢`,
        getValue: (d: any) => d.data[compareYear]?.rispPlyRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'RSIP_CH' ? [
      {
        labelEn: `${primaryYear}_RSIP CH`,
        labelZh: `${primaryYear} 膠檢防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_RSIP CH`,
        labelZh: `${compareYear} 膠檢防擦布報廢`,
        getValue: (d: any) => d.data[compareYear]?.rispChRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'EX_RB' ? [
      {
        labelEn: `${primaryYear}_EX RUBBER`,
        labelZh: `${primaryYear} 押出膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.exRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${compareYear}_EX RUBBER`,
        labelZh: `${compareYear} 押出膠料報廢`,
        getValue: (d: any) => d.data[compareYear]?.exRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'RUBBER ALL' ? [
      {
        labelEn: `${primaryYear}_MX RUBBER`,
        labelZh: `${primaryYear} 混練膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.mxRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_EX RUBBER`,
        labelZh: `${primaryYear} 押出膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.exRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CL RUBBER`,
        labelZh: `${primaryYear} 上膠膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CT RUBBER`,
        labelZh: `${primaryYear} 裁斷膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CURING RUBBER`,
        labelZh: `${primaryYear} 加硫膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.curingRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_RISP RUBBER`,
        labelZh: `${primaryYear} 膠檢膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'PLY ALL' ? [
      {
        labelEn: `${primaryYear}_EX PLY`,
        labelZh: `${primaryYear} 押出簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.exPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CL PLY`,
        labelZh: `${primaryYear} 上膠簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CT PLY`,
        labelZh: `${primaryYear} 裁斷簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_BD PLY`,
        labelZh: `${primaryYear} 成型簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdPlyRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_RISP PLY`,
        labelZh: `${primaryYear} 膠檢簾布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispPlyRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'BW ALL' ? [
      {
        labelEn: `${primaryYear}_CT BW`,
        labelZh: `${primaryYear} 裁斷鋼絲報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctBwRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_BD BW`,
        labelZh: `${primaryYear} 成型鋼絲報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdBwRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_RSIP BW`,
        labelZh: `${primaryYear} 膠檢鋼絲報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rsipBwRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(category === 'CH ALL' ? [
      {
        labelEn: `${primaryYear}_CT CH`,
        labelZh: `${primaryYear} 裁斷防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_BD CH`,
        labelZh: `${primaryYear} 成型防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.bdChRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_RSIP CH`,
        labelZh: `${primaryYear} 膠檢防擦布報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispChRubber,
        formatter: formatNumber,
      }
    ] : []),
    ...(!['MX_RB', 'EX_RB', 'MX_CB', 'MX_CHM', 'CL_PLY', 'CL_FABRIC', 'CL_RB', 'CL_CH', 'CT_CH', 'CT_RB', 'CT_PLY', 'CT_BW', 'BD_RB', 'BD_PLY', 'BD_CH', 'BD_BW', 'RUBBER ALL', 'PLY ALL', 'RSIP_RB', 'RSIP_PLY', 'RSIP_CH', 'BW ALL', 'CH ALL'].includes(category) ? [
      {
        labelEn: `${primaryYear}_MX RUBBER`,
        labelZh: `${primaryYear} 混練膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.mxRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_EX RUBBER`,
        labelZh: `${primaryYear} 押出膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.exRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CT RUBBER`,
        labelZh: `${primaryYear} 裁斷膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.ctRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CL RUBBER`,
        labelZh: `${primaryYear} 上膠膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.clRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_CURING RUBBER`,
        labelZh: `${primaryYear} 加硫膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.curingRubber,
        formatter: formatNumber,
      },
      {
        labelEn: `${primaryYear}_RISP RUBBER`,
        labelZh: `${primaryYear} 膠檢膠料報廢`,
        getValue: (d: any) => d.data[primaryYear]?.rispRubber,
        formatter: formatNumber,
      }
    ] : []),
    {
      labelEn: `${primaryYear}_TOTAL SCRAP Weight`,
      labelZh: `${primaryYear} 總報廢重量`,
      getValue: (d: any) => d.data[primaryYear]?.totalScrapWeight,
      formatter: formatNumber,
      className: "bg-[#00BFFF] text-black font-semibold",
    },
    {
      labelEn: `${compareYear}_TOTAL SCRAP Weight`,
      labelZh: `${compareYear} 總報廢重量`,
      getValue: (d: any) => d.data[compareYear]?.totalScrapWeight,
      formatter: formatNumber,
    },
    {
      labelEn: `${primaryYear}_TOTAL SCRAP RATIO`,
      labelZh: `${primaryYear} 總報廢率`,
      getValue: (d: any) => d.data[primaryYear]?.totalScrapRatio,
      formatter: formatRatio,
      className: "bg-[#00BFFF] text-black font-semibold",
    },
    {
      labelEn: `${compareYear}_TOTAL SCRAP RATIO`,
      labelZh: `${compareYear} 總報廢率`,
      getValue: (d: any) => d.data[compareYear]?.totalScrapRatio,
      formatter: formatRatio,
    },
  ];

  return (
    <div className={`w-full ${isCapturing ? 'h-auto overflow-visible' : 'h-full overflow-auto'}`}>
      <table className="w-full text-sm border-collapse min-w-max">
        <thead className="sticky top-0 z-10">
          <tr className="bg-[#90EE90] shadow-sm">
            <th className="border border-gray-300 p-3 text-left font-bold text-lg min-w-[250px] sticky left-0 bg-[#90EE90] z-20">
              {t.months}
            </th>
            {months.map((month) => (
              <th
                key={month}
                className="border border-gray-300 p-3 text-center font-medium min-w-[80px]"
              >
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="bg-white hover:bg-gray-50 transition-colors">
              <td
                className={cn(
                  "border border-gray-300 p-3 whitespace-pre-line text-xs sticky left-0 bg-white z-10",
                  row.className
                )}
              >
                {lang === 'en' ? row.labelEn : row.labelZh}
              </td>
              {data.map((d, colIdx) => {
                const isHighlighted =
                  row.className?.includes("bg-[#00BFFF]");

                const cellValue = row.getValue(d);

                return (
                  <td
                    key={d.month}
                    className={cn(
                      "border border-gray-300 p-3 text-center text-sm",
                      isHighlighted ? "bg-[#00BFFF]/20 text-blue-900 font-semibold" : "text-gray-700"
                    )}
                  >
                    {row.formatter(cellValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
