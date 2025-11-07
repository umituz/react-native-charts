/**
 * Chart Configuration - Domain Entity
 *
 * Complete configuration interface for all chart types.
 * Supports animations, interactions, styling, and themes.
 */

import type { ChartType, InterpolationType, AnimationType, LegendPosition, AxisPosition } from './ChartTypes';

export interface AxisConfig {
  show?: boolean;
  position?: AxisPosition;
  label?: string;
  tickCount?: number;
  formatTick?: (value: any) => string;
  gridLines?: boolean;
  domain?: [number, number];
}

export interface LegendConfig {
  show?: boolean;
  position?: LegendPosition;
  itemGap?: number;
  textColor?: string;
}

export interface AnimationConfig {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  disabled?: boolean;
}

export interface TooltipConfig {
  enabled?: boolean;
  formatValue?: (value: number) => string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ChartDimensions {
  width?: number | string;
  height?: number | string;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

/**
 * Complete chart configuration
 */
export interface ChartConfig {
  // Chart type
  type: ChartType;

  // Dimensions
  dimensions?: ChartDimensions;

  // Axes
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;

  // Legend
  legend?: LegendConfig;

  // Animation
  animation?: AnimationConfig;

  // Tooltip
  tooltip?: TooltipConfig;

  // Line/Area specific
  interpolation?: InterpolationType;
  strokeWidth?: number;
  fillOpacity?: number;

  // Bar specific
  barWidth?: number;
  barGap?: number;
  barRadius?: number;

  // Pie specific
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  labelRadius?: number;

  // Interactions
  enablePan?: boolean;
  enableZoom?: boolean;
  enableTouch?: boolean;

  // Colors (auto-generated if not provided)
  colors?: string[];
}
