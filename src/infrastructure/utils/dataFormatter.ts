/**
 * Data Formatting Utilities
 *
 * Transform raw data into chart-ready format.
 * Generic functions work with any data shape.
 */

import type { ChartDataPoint, ChartSeries, PieChartSegment } from '../../domain/entities/ChartData';

/**
 * Format array of objects to ChartDataPoint[]
 */
export const formatLineData = <T extends Record<string, any>>(
  data: T[],
  xKey: keyof T,
  yKey: keyof T,
  labelKey?: keyof T
): ChartDataPoint[] => {
  return data.map(item => ({
    x: item[xKey],
    y: Number(item[yKey]),
    label: labelKey ? String(item[labelKey]) : undefined,
  }));
};

/**
 * Format multiple series for multi-line chart
 */
export const formatMultiSeries = <T extends Record<string, any>>(
  seriesData: Array<{ id: string; name: string; data: T[] }>,
  xKey: keyof T,
  yKey: keyof T
): ChartSeries[] => {
  return seriesData.map(series => ({
    id: series.id,
    name: series.name,
    data: formatLineData(series.data, xKey, yKey),
  }));
};

/**
 * Format data for pie chart
 */
export const formatPieData = <T extends Record<string, any>>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
): PieChartSegment[] => {
  return data.map(item => ({
    value: Number(item[valueKey]),
    label: String(item[labelKey]),
  }));
};

/**
 * Aggregate data by key (for bar charts)
 */
export const aggregateByKey = <T extends Record<string, any>>(
  data: T[],
  groupKey: keyof T,
  valueKey: keyof T,
  aggregation: 'sum' | 'avg' | 'count' = 'sum'
): ChartDataPoint[] => {
  const grouped = data.reduce((acc, item) => {
    const key = String(item[groupKey]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(Number(item[valueKey]));
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(grouped).map(([key, values]) => {
    let y: number;
    switch (aggregation) {
      case 'sum':
        y = values.reduce((sum, val) => sum + val, 0);
        break;
      case 'avg':
        y = values.reduce((sum, val) => sum + val, 0) / values.length;
        break;
      case 'count':
        y = values.length;
        break;
    }
    return { x: key, y };
  });
};

/**
 * Fill missing dates in time series
 */
export const fillMissingDates = (
  data: ChartDataPoint[],
  startDate: Date,
  endDate: Date,
  fillValue: number = 0
): ChartDataPoint[] => {
  const filledData: ChartDataPoint[] = [];
  const dataMap = new Map(
    data.map(d => [new Date(d.x).toISOString().split('T')[0], d])
  );

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    const existingPoint = dataMap.get(dateKey);

    filledData.push(
      existingPoint || {
        x: currentDate.getTime(), // Convert Date to timestamp (number)
        y: fillValue,
      }
    );

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
};
