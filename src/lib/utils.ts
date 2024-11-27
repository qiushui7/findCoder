import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumber(num: string | number) {
  const number = parseInt(num.toString());
  if (number >= 100000) {
    return (number / 10000).toFixed(1) + 'w';
  } else if (number >= 10000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number.toString();
}
