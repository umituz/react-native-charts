/**
 * Bar Chart Empty State Component
 * 
 * Single Responsibility: Display empty state when no data
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system';

export const BarChartEmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <AtomicText type="bodyMedium" color="textSecondary">
        No data available
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

