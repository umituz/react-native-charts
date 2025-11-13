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
  const colors = tokens?.colors || {};

  return useMemo<IChartTheme>(
    () => ({
      primary: colors.primary || '#000000',
      secondary: colors.secondary || colors.primary || '#000000',
      success: colors.success || colors.primary || '#10B981',
      warning: colors.warning || colors.primary || '#F59E0B',
      error: colors.error || colors.primary || '#EF4444',

      axisColor: colors.textSecondary || colors.textPrimary || '#666666',
      gridColor: colors.border || colors.borderLight || '#E0E0E0',
      labelColor: colors.textPrimary || '#000000',
      tooltipBackground: colors.surface || colors.backgroundPrimary || '#FFFFFF',
      tooltipText: colors.textPrimary || '#000000',

      gradients: {
        primary: [
          colors.primary || '#000000',
          colors.secondary || colors.primary || '#000000',
        ],
        secondary: [
          colors.secondary || colors.primary || '#000000',
          colors.primary || '#000000',
        ],
        multiColor: [
          colors.primary || '#000000',
          colors.secondary || colors.primary || '#000000',
          colors.success || colors.primary || '#10B981',
          colors.warning || colors.primary || '#F59E0B',
          colors.error || colors.primary || '#EF4444',
        ],
      },
    }),
    [colors]
  );
};
