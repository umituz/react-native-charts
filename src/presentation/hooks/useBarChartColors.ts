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
    if (config.colors && config.colors.length > 0) {
      return config.colors;
    }
    if (isGroupedBar && yKeys && yKeys.length > 0) {
      return generateColors(yKeys.length);
    }
    if (isMultiSeries && data && data.length > 0) {
      return generateColors(data.length);
    }
    // Always return at least one color
    return [chartTheme.primary || '#000000'];
  }, [config.colors, isGroupedBar, isMultiSeries, data, yKeys, chartTheme.primary]);
};

