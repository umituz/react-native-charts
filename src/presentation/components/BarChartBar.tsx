/**
 * Bar Chart Bar Component
 * 
 * Single Responsibility: Render a single bar
 */

import React from 'react';
import { View, StyleSheet, type DimensionValue } from 'react-native';

interface BarChartBarProps {
  height: number;
  color: string;
  borderRadius: number;
  width?: DimensionValue;
  marginHorizontal?: number;
}

export const BarChartBar: React.FC<BarChartBarProps> = ({
  height,
  color,
  borderRadius,
  width,
  marginHorizontal,
}) => {
  return (
    <View
      style={[
        styles.bar,
        {
          height,
          backgroundColor: color,
          borderRadius,
          width,
          marginHorizontal,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bar: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
});

