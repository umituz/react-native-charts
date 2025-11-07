/**
 * Line Chart Component
 *
 * Victory Native XL wrapper with theme integration.
 * Supports single and multi-line charts with animations.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import { CartesianChart, Line } from 'victory-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { useChartTheme } from '../hooks/useChartTheme';
import type { ChartDataPoint, ChartSeries } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { DEFAULT_LINE_CHART_CONFIG } from '../../infrastructure/config/defaultConfig';
import { generateColors } from '../../infrastructure/utils/colorUtils';

export interface LineChartProps {
  data: ChartDataPoint[] | ChartSeries[];
  config?: Partial<ChartConfig>;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  config,
  style,
  width = '100%',
  height = 300,
}) => {
  const tokens = useAppDesignTokens();
  const chartTheme = useChartTheme();

  const chartConfig = useMemo(() => ({
    ...DEFAULT_LINE_CHART_CONFIG,
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
        axisOptions={{
          font: tokens.typography.bodyMedium.fontFamily,
          labelColor: chartTheme.axisColor,
          lineColor: chartTheme.gridColor,
        }}
      >
        {({ points }) => (
          <Line
            points={points.y}
            color={colors[0]}
            strokeWidth={chartConfig.strokeWidth || 3}
            curveType={chartConfig.interpolation === 'natural' ? 'natural' : 'linear'}
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
