/**
 * Bar Chart Colors Hook
 * 
 * Single Responsibility: Calculate colors for bar chart
 */

import { useMemo } from 'react';
import { useChartTheme } from './useChartTheme';
import { generateColors } from '../../infrastructure/utils/colorUtils';
import type { ChartSeries } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';

interface UseBarChartColorsProps {
  config: ChartConfig;
  isGroupedBar: boolean;
  isMultiSeries: boolean;
  yKeys?: string[];
  data?: ChartSeries[];
}

export const useBarChartColors = ({
  config,
  isGroupedBar,
  isMultiSeries,
  yKeys,
  data,
}: UseBarChartColorsProps): string[] => {
  const chartTheme = useChartTheme();

  return useMemo(() => {
    if (config.colors) return config.colors;
    if (isGroupedBar && yKeys) {
      return generateColors(yKeys.length);
    }
    if (isMultiSeries && data) {
      return generateColors(data.length);
    }
    return [chartTheme.primary];
  }, [config.colors, isGroupedBar, isMultiSeries, data, yKeys, chartTheme.primary]);
};

