/**
 * Default Chart Configurations
 *
 * Factory-standard defaults for all chart types.
 * Optimized for mobile (responsive, touch-friendly).
 */

import type { ChartConfig } from '../../domain/entities/ChartConfig';
import { ChartType, InterpolationType, AnimationType, LegendPosition, AxisPosition } from '../../domain/entities/ChartTypes';

export const DEFAULT_DIMENSIONS = {
  width: '100%' as const,
  height: 300,
  padding: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50,
  },
};

export const DEFAULT_AXIS_CONFIG = {
  show: true,
  tickCount: 5,
  gridLines: true,
};

export const DEFAULT_ANIMATION_CONFIG = {
  type: AnimationType.TIMING,
  duration: 800,
  delay: 0,
  disabled: false,
};

export const DEFAULT_LEGEND_CONFIG = {
  show: true,
  position: LegendPosition.BOTTOM,
  itemGap: 16,
};

export const DEFAULT_TOOLTIP_CONFIG = {
  enabled: true,
};

/**
 * Base chart config (shared by all types)
 */
export const DEFAULT_CHART_CONFIG: Omit<ChartConfig, 'type'> = {
  dimensions: DEFAULT_DIMENSIONS,
  xAxis: { ...DEFAULT_AXIS_CONFIG, position: AxisPosition.BOTTOM },
  yAxis: { ...DEFAULT_AXIS_CONFIG, position: AxisPosition.LEFT },
  legend: DEFAULT_LEGEND_CONFIG,
  animation: DEFAULT_ANIMATION_CONFIG,
  tooltip: DEFAULT_TOOLTIP_CONFIG,
  enableTouch: true,
};

/**
 * Line chart defaults
 */
export const DEFAULT_LINE_CHART_CONFIG: ChartConfig = {
  ...DEFAULT_CHART_CONFIG,
  type: ChartType.LINE,
  interpolation: InterpolationType.NATURAL,
  strokeWidth: 3,
};

/**
 * Bar chart defaults
 */
export const DEFAULT_BAR_CHART_CONFIG: ChartConfig = {
  ...DEFAULT_CHART_CONFIG,
  type: ChartType.BAR,
  barWidth: 24,
  barGap: 8,
  barRadius: 4,
};

/**
 * Area chart defaults
 */
export const DEFAULT_AREA_CHART_CONFIG: ChartConfig = {
  ...DEFAULT_CHART_CONFIG,
  type: ChartType.AREA,
  interpolation: InterpolationType.NATURAL,
  strokeWidth: 2,
  fillOpacity: 0.2,
};

/**
 * Pie chart defaults
 */
export const DEFAULT_PIE_CHART_CONFIG: ChartConfig = {
  type: ChartType.PIE,
  dimensions: {
    width: '100%' as const,
    height: 300,
    padding: { top: 20, right: 20, bottom: 60, left: 20 },
  },
  innerRadius: 0,
  outerRadius: 100,
  showLabels: true,
  labelRadius: 120,
  legend: DEFAULT_LEGEND_CONFIG,
  animation: DEFAULT_ANIMATION_CONFIG,
  enableTouch: true,
};
