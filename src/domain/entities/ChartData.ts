/**
 * Chart Data Models - Domain Entity
 *
 * Type-safe data structures for all chart types.
 * Generic interfaces support any data shape.
 */

/**
 * Generic data point for line/bar/area charts
 * Note: x must be number | string (victory-native InputFieldType)
 * Convert Date to number (timestamp) or string before passing to charts
 */
export interface ChartDataPoint extends Record<string, unknown> {
  x: number | string;
  y: number;
  label?: string;
  color?: string;
}

/**
 * Series for multi-line/bar charts
 */
export interface ChartSeries {
  id: string;
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

/**
 * Pie chart segment
 */
export interface PieChartSegment {
  value: number;
  label: string;
  color?: string;
}

/**
 * Generic chart data (union type)
 */
export type ChartData = ChartDataPoint[] | ChartSeries[] | PieChartSegment[];

/**
 * Data validation utilities
 */
export const ChartDataUtils = {
  validateLineData: (data: ChartDataPoint[]): boolean => {
    return data.every(point =>
      point.x !== undefined &&
      typeof point.y === 'number' &&
      !isNaN(point.y)
    );
  },

  validatePieData: (data: PieChartSegment[]): boolean => {
    return data.every(segment =>
      typeof segment.value === 'number' &&
      segment.value >= 0 &&
      segment.label.length > 0
    );
  },

  normalizePieData: (data: PieChartSegment[]): PieChartSegment[] => {
    const total = data.reduce((sum, segment) => sum + segment.value, 0);
    return data.map(segment => ({
      ...segment,
      value: (segment.value / total) * 100,
    }));
  },

  sortByX: (data: ChartDataPoint[]): ChartDataPoint[] => {
    return [...data].sort((a, b) => {
      if (typeof a.x === 'number' && typeof b.x === 'number') {
        return a.x - b.x;
      }
      return String(a.x).localeCompare(String(b.x));
    });
  },
};
