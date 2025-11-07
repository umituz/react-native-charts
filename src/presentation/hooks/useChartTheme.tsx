/**
 * Chart Theme Hook
 *
 * Integrates design tokens with chart theming.
 * Provides theme-aware colors for all chart components.
 */

import { useMemo } from 'react';
import { useAppDesignTokens } from '@umituz/react-native-design-system';
import type { IChartTheme } from '../../domain/interfaces/IChartTheme';

export const useChartTheme = (): IChartTheme => {
  const tokens = useAppDesignTokens();

  return useMemo<IChartTheme>(
    () => ({
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      success: tokens.colors.success,
      warning: tokens.colors.warning,
      error: tokens.colors.error,

      axisColor: tokens.colors.textSecondary,
      gridColor: tokens.colors.border,
      labelColor: tokens.colors.textPrimary,
      tooltipBackground: tokens.colors.surface,
      tooltipText: tokens.colors.textPrimary,

      gradients: {
        primary: [tokens.colors.primary, tokens.colors.secondary],
        secondary: [tokens.colors.secondary, tokens.colors.primary],
        multiColor: [
          tokens.colors.primary,
          tokens.colors.secondary,
          tokens.colors.success,
          tokens.colors.warning,
          tokens.colors.error,
        ],
      },
    }),
    [tokens.colors]
  );
};
