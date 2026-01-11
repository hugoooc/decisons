import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount)
  if (absAmount >= 1000000) {
    const formatted = `$${(absAmount / 1000000).toFixed(1)}M`
    return amount < 0 ? `-${formatted}` : formatted
  }
  if (absAmount >= 1000) {
    const formatted = `$${(absAmount / 1000).toFixed(1)}K`
    return amount < 0 ? `-${formatted}` : formatted
  }
  const formatted = `$${Math.round(absAmount).toLocaleString()}`
  return amount < 0 ? `-${formatted}` : formatted
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(decimal: number): string {
  return `${(decimal * 100).toFixed(1)}%`
}
