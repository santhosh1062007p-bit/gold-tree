import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique Guest ID in format: ILT-2026-0001
 */
export function generateGuestId(existingCount: number = 0): string {
  const currentYear = new Date().getFullYear();
  const sequenceNum = String(existingCount + 1).padStart(4, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `ILT-${currentYear}-${sequenceNum}-${randomSuffix.toString().substring(0, 2)}`;
}

/**
 * Format date string (YYYY-MM-DD) into readable institutional format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDateISO(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
