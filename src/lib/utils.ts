import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthName(monthStr: string, lang: 'en' | 'zh') {
  const monthNum = parseInt(monthStr, 10);
  if (lang === 'zh') {
    return `${monthNum}月`;
  } else {
    const monthsEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthsEn[monthNum - 1] || monthStr;
  }
}
