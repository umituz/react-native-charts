/**
 * Bar Chart Data Hook
 * 
 * Single Responsibility: Transform and prepare bar chart data
 */

import { useMemo } from 'react';
import type { ChartDataPoint, ChartSeries, GroupedBarDataPoint } from '../../domain/entities/ChartData';

interface UseBarChartDataProps {
  data: ChartDataPoint[] | ChartSeries[] | GroupedBarDataPoint[];
  yKeys?: string[];
}

interface UseBarChartDataReturn {
  chartData: ChartDataPoint[] | GroupedBarDataPoint[];
  isGroupedBar: boolean;
  isMultiSeries: boolean;
}

export const useBarChartData = ({
  data,
  yKeys,
}: UseBarChartDataProps): UseBarChartDataReturn => {
  const isGroupedBar = useMemo(() => {
    return Array.isArray(yKeys) && yKeys.length > 0;
  }, [yKeys]);

  const isMultiSeries = useMemo(() => {
    return !isGroupedBar && Array.isArray(data) && data.length > 0 && 'data' in data[0];
  }, [data, isGroupedBar]);

  const chartData = useMemo(() => {
    if (isGroupedBar) {
      return data as GroupedBarDataPoint[];
    }
    if (isMultiSeries) {
      return (data as ChartSeries[])[0].data;
    }
    return data as ChartDataPoint[];
  }, [data, isGroupedBar, isMultiSeries]);

  return {
    chartData,
    isGroupedBar,
    isMultiSeries,
  };
};

