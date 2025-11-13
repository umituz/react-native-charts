/**
 * Bar Chart Bars Component
 * 
 * Single Responsibility: Render all bar groups
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChartGroup } from './BarChartGroup';
import { BarChartEmptyState } from './BarChartEmptyState';
import type { ChartDataPoint, GroupedBarDataPoint } from '../../domain/entities/ChartData';

interface BarChartBarsProps {
  chartData: ChartDataPoint[] | GroupedBarDataPoint[];
  isGroupedBar: boolean;
  yKeys?: string[];
  colors: string[];
  maxValue: number;
  barMaxHeight: number;
  borderRadius: number;
  axisColor: string;
}

export const BarChartBars: React.FC<BarChartBarsProps> = ({
  chartData,
  isGroupedBar,
  yKeys,
  colors,
  maxValue,
  barMaxHeight,
  borderRadius,
  axisColor,
}) => {
  if (!chartData || chartData.length === 0) {
    return <BarChartEmptyState />;
  }

  // Ensure colors array is not empty
  if (!colors || colors.length === 0) {
    return <BarChartEmptyState />;
  }

  return (
    <View style={styles.barsContainer}>
      {chartData.map((point, index) => (
        <BarChartGroup
          key={index}
          point={point}
          index={index}
          isGroupedBar={isGroupedBar}
          yKeys={yKeys}
          colors={colors}
          maxValue={maxValue}
          barMaxHeight={barMaxHeight}
          borderRadius={borderRadius}
          axisColor={axisColor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 8,
  },
});

