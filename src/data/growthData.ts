import { GrowthDataPoint } from '@/types'

/**
 * WHO Growth Standards for Height (Length/Height-for-age)
 * Boys 0-24 months (length)
 * Data represents approximate percentiles based on WHO standards
 */
export const whoHeightBoys: GrowthDataPoint[] = [
  { age: 0, percentile3: 46.1, percentile5: 46.8, percentile10: 47.5, percentile25: 48.9, percentile50: 49.9, percentile75: 50.8, percentile90: 51.8, percentile95: 52.4, percentile97: 52.8 },
  { age: 3, percentile3: 56.7, percentile5: 57.3, percentile10: 58.4, percentile25: 59.4, percentile50: 60.4, percentile75: 61.4, percentile90: 62.4, percentile95: 63.0, percentile97: 63.5 },
  { age: 6, percentile3: 63.3, percentile5: 64.0, percentile10: 64.8, percentile25: 66.1, percentile50: 67.6, percentile75: 68.8, percentile90: 69.8, percentile95: 70.6, percentile97: 71.1 },
  { age: 9, percentile3: 68.0, percentile5: 68.7, percentile10: 69.6, percentile25: 70.9, percentile50: 72.0, percentile75: 73.3, percentile90: 74.5, percentile95: 75.2, percentile97: 75.7 },
  { age: 12, percentile3: 71.0, percentile5: 71.7, percentile10: 72.6, percentile25: 74.0, percentile50: 75.7, percentile75: 77.1, percentile90: 78.1, percentile95: 78.8, percentile97: 79.4 },
  { age: 18, percentile3: 76.0, percentile5: 76.9, percentile10: 77.9, percentile25: 79.4, percentile50: 80.9, percentile75: 82.3, percentile90: 83.6, percentile95: 84.5, percentile97: 85.1 },
  { age: 24, percentile3: 81.7, percentile5: 82.5, percentile10: 83.5, percentile25: 85.1, percentile50: 86.8, percentile75: 88.3, percentile90: 89.8, percentile95: 90.7, percentile97: 91.4 },
  { age: 36, percentile3: 88.7, percentile5: 89.6, percentile10: 90.9, percentile25: 92.4, percentile50: 94.4, percentile75: 96.1, percentile90: 97.8, percentile95: 98.8, percentile97: 99.6 },
  { age: 48, percentile3: 95.0, percentile5: 96.1, percentile10: 97.3, percentile25: 99.1, percentile50: 101.0, percentile75: 103.0, percentile90: 104.9, percentile95: 106.1, percentile97: 107.0 },
  { age: 60, percentile3: 100.7, percentile5: 101.7, percentile10: 103.1, percentile25: 105.3, percentile50: 107.7, percentile75: 109.9, percentile90: 111.7, percentile95: 113.0, percentile97: 114.0 },
]

/**
 * WHO Growth Standards for Height - Girls 0-60 months
 */
export const whoHeightGirls: GrowthDataPoint[] = [
  { age: 0, percentile3: 45.4, percentile5: 46.1, percentile10: 46.8, percentile25: 48.0, percentile50: 49.1, percentile75: 50.0, percentile90: 51.0, percentile95: 51.7, percentile97: 52.0 },
  { age: 3, percentile3: 55.6, percentile5: 56.2, percentile10: 57.1, percentile25: 58.4, percentile50: 59.8, percentile75: 60.9, percentile90: 61.9, percentile95: 62.5, percentile97: 63.0 },
  { age: 6, percentile3: 61.2, percentile5: 61.8, percentile10: 62.7, percentile25: 64.0, percentile50: 65.7, percentile75: 67.0, percentile90: 68.0, percentile95: 68.8, percentile97: 69.3 },
  { age: 9, percentile3: 65.3, percentile5: 66.1, percentile10: 67.0, percentile25: 68.5, percentile50: 70.1, percentile75: 71.5, percentile90: 72.8, percentile95: 73.6, percentile97: 74.2 },
  { age: 12, percentile3: 68.9, percentile5: 69.8, percentile10: 70.8, percentile25: 72.4, percentile50: 74.0, percentile75: 75.5, percentile90: 76.9, percentile95: 77.8, percentile97: 78.4 },
  { age: 18, percentile3: 74.9, percentile5: 75.8, percentile10: 76.8, percentile25: 78.4, percentile50: 80.0, percentile75: 81.5, percentile90: 82.9, percentile95: 83.9, percentile97: 84.6 },
  { age: 24, percentile3: 80.0, percentile5: 80.9, percentile10: 82.0, percentile25: 83.7, percentile50: 85.7, percentile75: 87.4, percentile90: 89.0, percentile95: 90.1, percentile97: 90.8 },
  { age: 36, percentile3: 87.4, percentile5: 88.4, percentile10: 89.6, percentile25: 91.4, percentile50: 93.9, percentile75: 95.6, percentile90: 97.4, percentile95: 98.6, percentile97: 99.4 },
  { age: 48, percentile3: 94.1, percentile5: 95.0, percentile10: 96.4, percentile25: 98.4, percentile50: 100.6, percentile75: 102.7, percentile90: 104.7, percentile95: 106.0, percentile97: 106.9 },
  { age: 60, percentile3: 99.9, percentile5: 100.9, percentile10: 102.4, percentile25: 104.7, percentile50: 107.4, percentile75: 109.7, percentile90: 111.7, percentile95: 113.2, percentile97: 114.2 },
]

/**
 * WHO Weight Standards - Boys 0-60 months
 */
export const whoWeightBoys: GrowthDataPoint[] = [
  { age: 0, percentile3: 2.5, percentile5: 2.6, percentile10: 2.9, percentile25: 3.1, percentile50: 3.3, percentile75: 3.6, percentile90: 3.9, percentile95: 4.1, percentile97: 4.2 },
  { age: 3, percentile3: 5.0, percentile5: 5.2, percentile10: 5.6, percentile25: 5.9, percentile50: 6.4, percentile75: 7.0, percentile90: 7.5, percentile95: 7.9, percentile97: 8.2 },
  { age: 6, percentile3: 6.4, percentile5: 6.7, percentile10: 7.1, percentile25: 7.5, percentile50: 7.9, percentile75: 8.4, percentile90: 9.0, percentile95: 9.5, percentile97: 9.8 },
  { age: 9, percentile3: 7.1, percentile5: 7.4, percentile10: 7.8, percentile25: 8.3, percentile50: 8.9, percentile75: 9.5, percentile90: 10.2, percentile95: 10.7, percentile97: 11.0 },
  { age: 12, percentile3: 7.7, percentile5: 8.0, percentile10: 8.4, percentile25: 9.0, percentile50: 9.6, percentile75: 10.2, percentile90: 10.8, percentile95: 11.3, percentile97: 11.8 },
  { age: 18, percentile3: 8.8, percentile5: 9.1, percentile10: 9.6, percentile25: 10.2, percentile50: 10.9, percentile75: 11.7, percentile90: 12.4, percentile95: 13.0, percentile97: 13.4 },
  { age: 24, percentile3: 9.7, percentile5: 10.1, percentile10: 10.6, percentile25: 11.3, percentile50: 12.2, percentile75: 13.0, percentile90: 13.8, percentile95: 14.5, percentile97: 15.0 },
  { age: 36, percentile3: 11.3, percentile5: 11.7, percentile10: 12.3, percentile25: 13.1, percentile50: 14.3, percentile75: 15.3, percentile90: 16.3, percentile95: 17.1, percentile97: 17.8 },
  { age: 48, percentile3: 12.7, percentile5: 13.2, percentile10: 13.9, percentile25: 14.8, percentile50: 16.0, percentile75: 17.3, percentile90: 18.5, percentile95: 19.4, percentile97: 20.3 },
  { age: 60, percentile3: 14.1, percentile5: 14.6, percentile10: 15.4, percentile25: 16.5, percentile50: 18.0, percentile75: 19.3, percentile90: 20.7, percentile95: 21.7, percentile97: 22.9 },
]

/**
 * WHO Weight Standards - Girls 0-60 months
 */
export const whoWeightGirls: GrowthDataPoint[] = [
  { age: 0, percentile3: 2.4, percentile5: 2.5, percentile10: 2.8, percentile25: 3.0, percentile50: 3.2, percentile75: 3.5, percentile90: 3.7, percentile95: 3.9, percentile97: 4.0 },
  { age: 3, percentile3: 4.5, percentile5: 4.8, percentile10: 5.2, percentile25: 5.5, percentile50: 5.8, percentile75: 6.4, percentile90: 6.9, percentile95: 7.2, percentile97: 7.5 },
  { age: 6, percentile3: 5.7, percentile5: 6.0, percentile10: 6.5, percentile25: 6.9, percentile50: 7.3, percentile75: 7.8, percentile90: 8.3, percentile95: 8.7, percentile97: 9.0 },
  { age: 9, percentile3: 6.6, percentile5: 7.0, percentile10: 7.4, percentile25: 7.9, percentile50: 8.2, percentile75: 8.8, percentile90: 9.4, percentile95: 9.9, percentile97: 10.2 },
  { age: 12, percentile3: 7.0, percentile5: 7.4, percentile10: 7.9, percentile25: 8.5, percentile50: 9.0, percentile75: 9.6, percentile90: 10.1, percentile95: 10.6, percentile97: 11.0 },
  { age: 18, percentile3: 8.1, percentile5: 8.5, percentile10: 9.0, percentile25: 9.7, percentile50: 10.2, percentile75: 10.9, percentile90: 11.6, percentile95: 12.2, percentile97: 12.8 },
  { age: 24, percentile3: 9.0, percentile5: 9.4, percentile10: 10.0, percentile25: 10.8, percentile50: 11.5, percentile75: 12.3, percentile90: 13.0, percentile95: 13.7, percentile97: 14.4 },
  { age: 36, percentile3: 10.8, percentile5: 11.2, percentile10: 11.9, percentile25: 12.7, percentile50: 13.9, percentile75: 14.8, percentile90: 15.8, percentile95: 16.5, percentile97: 17.3 },
  { age: 48, percentile3: 12.3, percentile5: 12.8, percentile10: 13.5, percentile25: 14.5, percentile50: 15.7, percentile75: 17.0, percentile90: 18.2, percentile95: 19.1, percentile97: 20.0 },
  { age: 60, percentile3: 13.7, percentile5: 14.2, percentile10: 15.0, percentile25: 16.1, percentile50: 17.7, percentile75: 19.1, percentile90: 20.4, percentile95: 21.6, percentile97: 22.7 },
]

/**
 * Get growth data for specific chart type, sex, and standard
 */
export function getGrowthData(
  type: 'weight' | 'height',
  sex: 'male' | 'female',
  _standard: 'WHO' | 'CDC' = 'WHO'
): GrowthDataPoint[] {
  // For now, we only have WHO data (standard parameter reserved for future use)
  if (type === 'height') {
    return sex === 'male' ? whoHeightBoys : whoHeightGirls
  } else {
    return sex === 'male' ? whoWeightBoys : whoWeightGirls
  }
}

/**
 * Interpolate percentile value for a given age
 */
export function interpolatePercentile(
  data: GrowthDataPoint[],
  ageMonths: number,
  percentile: 'percentile3' | 'percentile5' | 'percentile10' | 'percentile25' | 'percentile50' | 'percentile75' | 'percentile90' | 'percentile95' | 'percentile97'
): number {
  // Find surrounding data points
  let lower = data[0]
  let upper = data[data.length - 1]

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].age <= ageMonths && data[i + 1].age >= ageMonths) {
      lower = data[i]
      upper = data[i + 1]
      break
    }
  }

  // Linear interpolation
  const ratio = (ageMonths - lower.age) / (upper.age - lower.age)
  return lower[percentile] + ratio * (upper[percentile] - lower[percentile])
}
