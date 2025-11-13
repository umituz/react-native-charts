/**
 * Bar Chart Scale Hook
 * 
 * Single Responsibility: Calculate scaling values for bar chart
 */

import { useMemo } from 'react';
import {
  calculateMaxValue,
  calculateMaxValueFromGrouped,
} from '../../infrastructure/utils/chartScaleUtils';
import type { ChartDataPoint, GroupedBarDataPoint } from '../../domain/entities/ChartData';

interface UseBarChartScaleProps {
  chartData: ChartDataPoint[] | GroupedBarDataPoint[];
  isGroupedBar: boolean;
  yKeys?: string[];
  chartHeight: number;
}

interface UseBarChartScaleReturn {
  maxValue: number;
  barMaxHeight: number;
}

export const useBarChartScale = ({
  chartData,
  isGroupedBar,
  yKeys,
  chartHeight,
}: UseBarChartScaleProps): UseBarChartScaleReturn => {
  const maxValue = useMemo(() => {
    if (isGroupedBar && yKeys) {
      return calculateMaxValueFromGrouped(
        chartData as GroupedBarDataPoint[],
        yKeys
      );
    }
    return calculateMaxValue(chartData as ChartDataPoint[]);
  }, [chartData, isGroupedBar, yKeys]);

  const barMaxHeight = useMemo(() => {
    return chartHeight - 40; // Leave space for labels
  }, [chartHeight]);

  return {
    maxValue,
    barMaxHeight,
  };
};

