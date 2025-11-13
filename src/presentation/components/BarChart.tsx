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
import type { ChartDataPoint, ChartSeries, GroupedBarDataPoint } from '../../domain/entities/ChartData';
import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { DEFAULT_BAR_CHART_CONFIG } from '../../infrastructure/config/defaultConfig';
import { generateColors } from '../../infrastructure/utils/colorUtils';
import { ChartLegend } from './ChartLegend';

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
  const tokens = useAppDesignTokens();
  const chartTheme = useChartTheme();

  const chartConfig = useMemo(() => ({
    ...DEFAULT_BAR_CHART_CONFIG,
    ...config,
  }), [config]);

  // Check if this is a grouped bar chart
  const isGroupedBar = useMemo(() => {
    return Array.isArray(yKeys) && yKeys.length > 0;
  }, [yKeys]);

  // Check if this is a multi-series chart (ChartSeries[])
  const isMultiSeries = useMemo(() => {
    return !isGroupedBar && Array.isArray(data) && data.length > 0 && 'data' in data[0];
  }, [data, isGroupedBar]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (isGroupedBar) {
      return data as GroupedBarDataPoint[];
    }
    if (isMultiSeries) {
      return (data as ChartSeries[])[0].data;
    }
    return data as ChartDataPoint[];
  }, [data, isGroupedBar, isMultiSeries]);

  // Determine yKeys for CartesianChart
  const chartYKeys = useMemo(() => {
    if (isGroupedBar && yKeys) {
      return yKeys;
    }
    return ['y'];
  }, [isGroupedBar, yKeys]);

  // Prepare colors
  const colors = useMemo(() => {
    if (chartConfig.colors) return chartConfig.colors;
    if (isGroupedBar && yKeys) {
      return generateColors(yKeys.length);
    }
    if (isMultiSeries) {
      return generateColors((data as ChartSeries[]).length);
    }
    return [chartTheme.primary];
  }, [chartConfig.colors, isGroupedBar, isMultiSeries, data, yKeys, chartTheme.primary]);

  // Prepare legend items for grouped bars
  const legendItems = useMemo(() => {
    if (!showLegend || !isGroupedBar || !yKeys) return [];
    return yKeys.map((key, index) => ({
      label: legendLabels?.[key] || key,
      color: colors[index] || chartTheme.primary,
    }));
  }, [showLegend, isGroupedBar, yKeys, legendLabels, colors, chartTheme.primary]);

  return (
    <View style={[styles.container, { width, height }, style]}>
      {showLegend && legendItems.length > 0 && (
        <ChartLegend
          items={legendItems}
          position={chartConfig.legend?.position || 'top'}
          itemGap={chartConfig.legend?.itemGap || 16}
          style={styles.legend}
        />
      )}
      <CartesianChart
        data={chartData}
        xKey="x"
        yKeys={chartYKeys}
        domainPadding={{ left: 50, right: 50, top: 30 }}
        axisOptions={{
          font: tokens.typography.bodyMedium.fontFamily,
          labelColor: chartTheme.axisColor,
          lineColor: chartTheme.gridColor,
        }}
      >
        {({ points, chartBounds }) => {
          if (isGroupedBar && yKeys) {
            // Render multiple bars for grouped chart
            return (
              <>
                {yKeys.map((yKey, index) => {
                  const barPoints = points[yKey as keyof typeof points];
                  if (!barPoints) return null;
                  return (
                    <Bar
                      key={yKey}
                      points={barPoints as any}
                      chartBounds={chartBounds}
                      color={colors[index] || chartTheme.primary}
                      roundedCorners={{
                        topLeft: chartConfig.barRadius || 4,
                        topRight: chartConfig.barRadius || 4,
                      }}
                      animate={{ type: 'timing', duration: chartConfig.animation?.duration || 800 }}
                    />
                  );
                })}
              </>
            );
          }
          // Single bar chart
          return (
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
          );
        }}
      </CartesianChart>
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
});
