/**
 * Bar Chart Group Component
 * 
 * Single Responsibility: Render a group of bars (single or grouped)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChartBar } from './BarChartBar';
import { BarChartLabel } from './BarChartLabel';
import { calculateBarHeight } from '../../infrastructure/utils/chartScaleUtils';
import type { ChartDataPoint, GroupedBarDataPoint } from '../../domain/entities/ChartData';

interface BarChartGroupProps {
  point: ChartDataPoint | GroupedBarDataPoint;
  index: number;
  isGroupedBar: boolean;
  yKeys?: string[];
  colors: string[];
  maxValue: number;
  barMaxHeight: number;
  borderRadius: number;
  axisColor: string;
}

export const BarChartGroup: React.FC<BarChartGroupProps> = ({
  point,
  index,
  isGroupedBar,
  yKeys,
  colors,
  maxValue,
  barMaxHeight,
  borderRadius,
  axisColor,
}) => {
  const xValue = point.x;

  if (isGroupedBar && yKeys) {
    // Grouped bars
    return (
      <View style={styles.barGroup}>
        <View style={styles.barsWrapper}>
          {yKeys.map((yKey, yIndex) => {
            const value = (point as GroupedBarDataPoint)[yKey];
            if (typeof value !== 'number') return null;

            const barHeight = calculateBarHeight(value, maxValue, barMaxHeight);

            const color = colors[yIndex] || colors[0] || '#000000';
            return (
              <BarChartBar
                key={yKey}
                height={barHeight}
                color={color}
                borderRadius={borderRadius}
                marginHorizontal={2}
                width={undefined} // Use flex
              />
            );
          })}
        </View>
        <BarChartLabel value={xValue} color={axisColor} />
      </View>
    );
  }

  // Single bar
  const value = (point as ChartDataPoint).y;
  const barHeight = calculateBarHeight(value, maxValue, barMaxHeight);
  const color = colors[0] || '#000000';

  return (
    <View style={styles.barGroup}>
      <BarChartBar
        height={barHeight}
        color={color}
        borderRadius={borderRadius}
        width="80%"
      />
      <BarChartLabel value={xValue} color={axisColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  barGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

