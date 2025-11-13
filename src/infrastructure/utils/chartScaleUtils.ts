/**
 * Chart Scale Utilities
 * 
 * Single Responsibility: Calculate scaling values for charts
 */

import type { ChartDataPoint, GroupedBarDataPoint } from '../../domain/entities/ChartData';

/**
 * Calculate maximum value from chart data points
 */
export const calculateMaxValue = (data: ChartDataPoint[]): number => {
  if (data.length === 0) return 1;
  const values = data.map((p) => p.y);
  return Math.max(...values, 1);
};

/**
 * Calculate maximum value from grouped bar data
 */
export const calculateMaxValueFromGrouped = (
  data: GroupedBarDataPoint[],
  yKeys: string[]
): number => {
  if (data.length === 0 || yKeys.length === 0) return 1;
  
  const allValues: number[] = [];
  data.forEach((point) => {
    yKeys.forEach((key) => {
      const value = point[key];
      if (typeof value === 'number') {
        allValues.push(value);
      }
    });
  });
  
  return Math.max(...allValues, 1);
};

/**
 * Calculate scaled bar height
 */
export const calculateBarHeight = (
  value: number,
  maxValue: number,
  maxHeight: number,
  minHeight: number = 4
): number => {
  if (maxValue <= 0) return minHeight;
  const height = (value / maxValue) * maxHeight;
  return Math.max(height, minHeight);
};

