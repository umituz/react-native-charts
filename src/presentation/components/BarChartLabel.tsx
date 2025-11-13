/**
 * Bar Chart Label Component
 * 
 * Single Responsibility: Render x-axis label
 */

import React from 'react';
import { AtomicText } from '@umituz/react-native-design-system';
import { StyleSheet } from 'react-native';

interface BarChartLabelProps {
  value: string | number;
  color: string;
}

export const BarChartLabel: React.FC<BarChartLabelProps> = ({ value, color }) => {
  return (
    <AtomicText
      type="labelSmall"
      style={[styles.label, { color }]}
    >
      {String(value)}
    </AtomicText>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
  },
});

