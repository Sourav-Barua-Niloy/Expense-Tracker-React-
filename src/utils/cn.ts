// ─── src/utils/cn.ts ───
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * The standard "cn" helper used in modern React + Tailwind projects.
 * - clsx handles conditional classes: cn('base', isActive && 'active-class')
 * - twMerge resolves conflicts: cn('p-2', 'p-4') → 'p-4' (last one wins, sensibly)
 *
 * This is what every reusable UI component (Phase 3) will use to merge
 * its own default styles with any className passed in as a prop.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))