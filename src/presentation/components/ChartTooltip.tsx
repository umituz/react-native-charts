/**
 * Chart Tooltip Component
 *
 * Displays data point information on hover/press.
 * Theme-aware with customizable formatting.
 */

import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { AtomicText, useAppDesignTokens } from '@umituz/react-native-design-system';

export interface ChartTooltipProps {
  label?: string;
  value: number;
  formatValue?: (value: number) => string;
  style?: StyleProp<ViewStyle>;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  label,
  value,
  formatValue,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const formattedValue = formatValue ? formatValue(value) : value.toString();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.borders.radius.md,
          borderWidth: tokens.borders.width.thin,
          borderColor: tokens.colors.border,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {label && (
        <AtomicText type="labelSmall" color="textSecondary">
          {label}
        </AtomicText>
      )}
      <AtomicText type="bodyMedium" color="textPrimary">
        {formattedValue}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
