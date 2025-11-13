/**
 * Bar Chart Legend Hook
 * 
 * Single Responsibility: Prepare legend items for bar chart
 */

import { useMemo } from 'react';
import { useChartTheme } from './useChartTheme';
import type { LegendItem } from '../components/ChartLegend';

interface UseBarChartLegendProps {
  showLegend: boolean;
  isGroupedBar: boolean;
  yKeys?: string[];
  legendLabels?: Record<string, string>;
  colors: string[];
}

export const useBarChartLegend = ({
  showLegend,
  isGroupedBar,
  yKeys,
  legendLabels,
  colors,
}: UseBarChartLegendProps): LegendItem[] => {
  const chartTheme = useChartTheme();

  return useMemo(() => {
    if (!showLegend || !isGroupedBar || !yKeys) return [];
    return yKeys.map((key, index) => ({
      label: legendLabels?.[key] || key,
      color: colors[index] || chartTheme.primary,
    }));
  }, [showLegend, isGroupedBar, yKeys, legendLabels, colors, chartTheme.primary]);
};

