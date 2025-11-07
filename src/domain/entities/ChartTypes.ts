/**
 * Chart Types - Domain Entity
 *
 * Defines all supported chart types and their configurations.
 * Factory-first: One type system for all 100+ apps.
 */

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  AREA = 'area',
  PIE = 'pie',
}

export enum InterpolationType {
  LINEAR = 'linear',
  NATURAL = 'natural',
  STEP = 'step',
}

export enum AnimationType {
  TIMING = 'timing',
  SPRING = 'spring',
}

export enum LegendPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum AxisPosition {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}
