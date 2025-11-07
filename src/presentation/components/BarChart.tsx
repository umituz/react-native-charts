/**
 * Bar Chart Component
 *
 * Victory Native XL bar chart with theme integration.
 * Supports single and grouped bar charts with rounded corners.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { useChartTheme } from '../hooks/useChartTheme';
import type { ChartDataPoint, ChartSeries } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { DEFAULT_BAR_CHART_CONFIG } from '../../infrastructure/config/defaultConfig';
import { generateColors } from '../../infrastructure/utils/colorUtils';

export interface BarChartProps {
  data: ChartDataPoint[] | ChartSeries[];
  config?: Partial<ChartConfig>;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  config,
  style,
  width = '100%',
  height = 300,
}) => {
  const tokens = useAppDesignTokens();
  const chartTheme = useChartTheme();

  const chartConfig = useMemo(() => ({
    ...DEFAULT_BAR_CHART_CONFIG,
    ...config,
  }), [config]);

  const isMultiSeries = Array.isArray(data) && data.length > 0 && 'data' in data[0];

  const chartData = useMemo(() => {
    if (isMultiSeries) {
      return (data as ChartSeries[])[0].data;
    }
    return data as ChartDataPoint[];
  }, [data, isMultiSeries]);

  const colors = useMemo(() => {
    if (chartConfig.colors) return chartConfig.colors;
    if (isMultiSeries) {
      return generateColors((data as ChartSeries[]).length);
    }
    return [chartTheme.primary];
  }, [chartConfig.colors, isMultiSeries, data, chartTheme.primary]);

  return (
    <View style={[styles.container, { width, height }, style]}>
      <CartesianChart
        data={chartData}
        xKey="x"
        yKeys={['y']}
        domainPadding={{ left: 50, right: 50, top: 30 }}
        axisOptions={{
          font: tokens.typography.bodyMedium.fontFamily,
          labelColor: chartTheme.axisColor,
          lineColor: chartTheme.gridColor,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.y}
            chartBounds={chartBounds}
            color={colors[0]}
            roundedCorners={{
              topLeft: chartConfig.barRadius || 4,
              topRight: chartConfig.barRadius || 4,
            }}
            animate={{ type: 'timing', duration: chartConfig.animation?.duration || 800 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
