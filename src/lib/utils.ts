import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate z-score for growth measurements
 * @param value - The measured value
 * @param mean - Population mean
 * @param sd - Standard deviation
 */
export function calculateZScore(value: number, mean: number, sd: number): number {
  return (value - mean) / sd
}

/**
 * Calculate percentile from z-score using approximation
 * @param zScore - The z-score value
 */
export function zScoreToPercentile(zScore: number): number {
  // Using error function approximation for normal distribution
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore))
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2)
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

  if (zScore >= 0) {
    return (1 - probability) * 100
  } else {
    return probability * 100
  }
}

/**
 * Format a number to a specified number of decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * Calculate growth velocity (cm/year)
 * @param height1 - First height measurement (cm)
 * @param height2 - Second height measurement (cm)
 * @param date1 - First measurement date
 * @param date2 - Second measurement date
 */
export function calculateGrowthVelocity(
  height1: number,
  height2: number,
  date1: Date,
  date2: Date
): number {
  const heightDiff = height2 - height1
  const timeDiff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  return heightDiff / timeDiff
}

/**
 * Calculate mid-parental height
 * @param fatherHeight - Father's height in cm
 * @param motherHeight - Mother's height in cm
 * @param childSex - 'male' or 'female'
 */
export function calculateMidParentalHeight(
  fatherHeight: number,
  motherHeight: number,
  childSex: 'male' | 'female'
): number {
  if (childSex === 'male') {
    return (fatherHeight + motherHeight + 13) / 2
  } else {
    return (fatherHeight + motherHeight - 13) / 2
  }
}
