/**
 * Area Chart Component
 *
 * Victory Native XL area chart with gradient fills.
 * Supports single and stacked area charts with animations.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, type DimensionValue } from 'react-native';
import { CartesianChart, Area } from 'victory-native';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import { useChartTheme } from '../hooks/useChartTheme';
import type { ChartDataPoint, ChartSeries } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { DEFAULT_AREA_CHART_CONFIG } from '../../infrastructure/config/defaultConfig';
import { generateColors } from '../../infrastructure/utils/colorUtils';

export interface AreaChartProps {
  data: ChartDataPoint[] | ChartSeries[];
  config?: Partial<ChartConfig>;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
  height?: DimensionValue;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  config,
  style,
  width = '100%',
  height = 300,
}) => {
  const tokens = useAppDesignTokens();
  const chartTheme = useChartTheme();

  const chartConfig = useMemo(() => ({
    ...DEFAULT_AREA_CHART_CONFIG,
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
        {({ points, chartBounds }) => (
          <Area
            points={points.y}
            y0={chartBounds.bottom}
            color={colors[0]}
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
