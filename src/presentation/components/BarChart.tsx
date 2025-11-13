/**
 * Bar Chart Component
 *
 * Pure React Native bar chart with theme integration.
 * Supports single and grouped bar charts with rounded corners.
 * No external chart library dependencies - uses only React Native View components.
 * 
 * Architecture: SOLID, DRY, KISS principles
 * - Single Responsibility: Each component has one clear purpose
 * - Open/Closed: Extensible through props and config
 * - Liskov Substitution: Components are interchangeable
 * - Interface Segregation: Small, focused interfaces
 * - Dependency Inversion: Depends on abstractions (hooks, utils)
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { useChartTheme } from '../hooks/useChartTheme';
import type { ChartDataPoint, ChartSeries, GroupedBarDataPoint } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { LegendPosition } from '../../domain/entities/ChartTypes';
import { DEFAULT_BAR_CHART_CONFIG } from '../../infrastructure/config/defaultConfig';
import { ChartLegend } from './ChartLegend';
import { BarChartBars } from './BarChartBars';
import { useBarChartData } from '../hooks/useBarChartData';
import { useBarChartColors } from '../hooks/useBarChartColors';
import { useBarChartScale } from '../hooks/useBarChartScale';
import { useBarChartLegend } from '../hooks/useBarChartLegend';

export interface BarChartProps {
  data: ChartDataPoint[] | ChartSeries[] | GroupedBarDataPoint[];
  yKeys?: string[]; // For grouped bar charts (e.g., ['completed', 'started'])
  config?: Partial<ChartConfig>;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
  showLegend?: boolean; // Show legend for grouped bars
  legendLabels?: Record<string, string>; // Map yKeys to display labels
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  yKeys,
  config,
  style,
  width = '100%',
  height = 300,
  showLegend = false,
  legendLabels,
}) => {
  const chartTheme = useChartTheme();

  const chartConfig = useMemo(() => ({
    ...DEFAULT_BAR_CHART_CONFIG,
    ...config,
  }), [config]);

  // Data transformation
  const { chartData, isGroupedBar, isMultiSeries } = useBarChartData({
    data,
    yKeys,
  });

  // Color calculation
  const colors = useBarChartColors({
    config: chartConfig,
    isGroupedBar,
    isMultiSeries,
    yKeys,
    data: isMultiSeries ? (data as ChartSeries[]) : undefined,
  });

  // Ensure colors array is never empty
  const safeColors = useMemo(() => {
    if (!colors || colors.length === 0) {
      return [chartTheme.primary || '#000000'];
    }
    return colors;
  }, [colors, chartTheme.primary]);

  // Scale calculation
  const chartHeight = typeof height === 'number' ? height - 60 : 200;
  const { maxValue, barMaxHeight } = useBarChartScale({
    chartData,
    isGroupedBar,
    yKeys,
    chartHeight,
  });

  // Legend preparation
  const legendItems = useBarChartLegend({
    showLegend,
    isGroupedBar,
    yKeys,
    legendLabels,
    colors: safeColors,
  });

  return (
    <View style={[styles.container, { width, height }, style]}>
      {showLegend && legendItems.length > 0 && (
        <ChartLegend
          items={legendItems}
          position={chartConfig.legend?.position || LegendPosition.TOP}
          itemGap={chartConfig.legend?.itemGap || 16}
          style={styles.legend}
        />
      )}
      <View style={[styles.chart, { height: chartHeight }]}>
        <BarChartBars
          chartData={chartData}
          isGroupedBar={isGroupedBar}
          yKeys={yKeys}
          colors={safeColors}
          maxValue={maxValue}
          barMaxHeight={barMaxHeight}
          borderRadius={chartConfig.barRadius || 4}
          axisColor={chartTheme.axisColor || '#000000'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  legend: {
    marginBottom: 12,
  },
  chart: {
    width: '100%',
    paddingTop: 20,
  },
});
