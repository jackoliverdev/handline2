import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBrowser = () => typeof window !== "undefined"

/**
 * Format a number as a price string with currency symbol
 */
export function formatPrice(
  price: number,
  options: {
    currency?: string;
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'GBP', notation = 'standard' } = options

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    notation,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}