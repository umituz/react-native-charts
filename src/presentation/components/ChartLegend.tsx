/**
 * Chart Legend Component
 *
 * Displays legend for multi-series charts.
 * Supports horizontal and vertical layouts with customizable colors.
 */

import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';
import { LegendPosition } from '../../domain/entities/ChartTypes';

export interface LegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps {
  items: LegendItem[];
  position?: LegendPosition;
  itemGap?: number;
  style?: StyleProp<ViewStyle>;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  items,
  position = LegendPosition.BOTTOM,
  itemGap = 16,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const isHorizontal = position === LegendPosition.TOP || position === LegendPosition.BOTTOM;

  return (
    <View
      style={[
        styles.container,
        isHorizontal ? styles.horizontal : styles.vertical,
        { gap: itemGap },
        style,
      ]}
    >
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: item.color,
                borderRadius: tokens.borders.radius.xs,
              },
            ]}
          />
          <AtomicText type="bodySmall" color="textSecondary">
            {item.label}
          </AtomicText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    width: 12,
    height: 12,
  },
});
