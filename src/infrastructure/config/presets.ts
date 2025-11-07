/**
 * Chart Presets
 *
 * Pre-built configurations for common chart patterns.
 * Quick setup for standard use cases.
 */

import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { LegendPosition } from '../../domain/entities/ChartTypes';
import {
  DEFAULT_LINE_CHART_CONFIG,
  DEFAULT_BAR_CHART_CONFIG,
  DEFAULT_AREA_CHART_CONFIG,
  DEFAULT_PIE_CHART_CONFIG,
} from './defaultConfig';

export type ChartPreset =
  | 'line-simple'
  | 'line-multi'
  | 'bar-simple'
  | 'bar-grouped'
  | 'area-simple'
  | 'area-stacked'
  | 'pie-simple'
  | 'pie-donut';

/**
 * Preset configurations
 */
export const CHART_PRESETS: Record<ChartPreset, ChartConfig> = {
  'line-simple': {
    ...DEFAULT_LINE_CHART_CONFIG,
    legend: { show: false },
  },

  'line-multi': {
    ...DEFAULT_LINE_CHART_CONFIG,
    legend: { show: true, position: LegendPosition.BOTTOM },
  },

  'bar-simple': {
    ...DEFAULT_BAR_CHART_CONFIG,
    legend: { show: false },
  },

  'bar-grouped': {
    ...DEFAULT_BAR_CHART_CONFIG,
    legend: { show: true, position: LegendPosition.BOTTOM },
    barGap: 4,
  },

  'area-simple': {
    ...DEFAULT_AREA_CHART_CONFIG,
    legend: { show: false },
    fillOpacity: 0.3,
  },

  'area-stacked': {
    ...DEFAULT_AREA_CHART_CONFIG,
    legend: { show: true, position: LegendPosition.BOTTOM },
    fillOpacity: 0.5,
  },

  'pie-simple': {
    ...DEFAULT_PIE_CHART_CONFIG,
    innerRadius: 0,
  },

  'pie-donut': {
    ...DEFAULT_PIE_CHART_CONFIG,
    innerRadius: 60,
  },
};

/**
 * Get preset configuration
 */
export const getChartPreset = (preset: ChartPreset): ChartConfig => {
  return CHART_PRESETS[preset];
};
