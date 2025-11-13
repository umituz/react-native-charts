/**
 * Charts Domain - Barrel Export
 *
 * High-performance charting library for React Native.
 * Built with Victory Native XL, Reanimated v3, and theme integration.
 *
 * @example
 * ```tsx
 * import { LineChart, BarChart, useChartTheme } from '@umituz/react-native-charts';
 *
 * const MyScreen = () => {
 *   const data = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
 *   return <LineChart data={data} />;
 * };
 * ```
 */

// Domain entities
export type { ChartDataPoint, ChartSeries, PieChartSegment, GroupedBarDataPoint, ChartData } from './domain/entities/ChartData';
export { ChartDataUtils } from './domain/entities/ChartData';
export type { ChartConfig, AxisConfig, LegendConfig, AnimationConfig, TooltipConfig, ChartDimensions } from './domain/entities/ChartConfig';
export { ChartType, InterpolationType, AnimationType, LegendPosition, AxisPosition } from './domain/entities/ChartTypes';

// Domain interfaces
export type { IChartTheme } from './domain/interfaces/IChartTheme';

// Infrastructure config
export {
  DEFAULT_DIMENSIONS,
  DEFAULT_AXIS_CONFIG,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_LEGEND_CONFIG,
  DEFAULT_TOOLTIP_CONFIG,
  DEFAULT_CHART_CONFIG,
  DEFAULT_LINE_CHART_CONFIG,
  DEFAULT_BAR_CHART_CONFIG,
  DEFAULT_AREA_CHART_CONFIG,
  DEFAULT_PIE_CHART_CONFIG,
} from './infrastructure/config/defaultConfig';
export type { ChartPreset } from './infrastructure/config/presets';
export { CHART_PRESETS, getChartPreset } from './infrastructure/config/presets';

// Infrastructure utilities
export {
  formatLineData,
  formatMultiSeries,
  formatPieData,
  aggregateByKey,
  fillMissingDates,
} from './infrastructure/utils/dataFormatter';
export {
  calculateMaxValue,
  calculateMaxValueFromGrouped,
  calculateBarHeight,
} from './infrastructure/utils/chartScaleUtils';
export {
  COLOR_PALETTES,
  generateColors,
  generateGradient,
  adjustColorBrightness,
} from './infrastructure/utils/colorUtils';
export type { AnimationTiming } from './infrastructure/utils/animationUtils';
export { ANIMATION_PRESETS, getAnimationConfig } from './infrastructure/utils/animationUtils';

// Presentation hooks
export { useChartTheme } from './presentation/hooks/useChartTheme';
export type { UseChartAnimationReturn } from './presentation/hooks/useChartAnimation';
export { useChartAnimation } from './presentation/hooks/useChartAnimation';
export type { UseChartDataReturn } from './presentation/hooks/useChartData';
export { useChartData } from './presentation/hooks/useChartData';
export { useBarChartData } from './presentation/hooks/useBarChartData';
export { useBarChartColors } from './presentation/hooks/useBarChartColors';
export { useBarChartScale } from './presentation/hooks/useBarChartScale';
export { useBarChartLegend } from './presentation/hooks/useBarChartLegend';

// Presentation components
export type { LineChartProps } from './presentation/components/LineChart';
export { LineChart } from './presentation/components/LineChart';
export type { BarChartProps } from './presentation/components/BarChart';
export { BarChart } from './presentation/components/BarChart';
export type { AreaChartProps } from './presentation/components/AreaChart';
export { AreaChart } from './presentation/components/AreaChart';
export type { PieChartProps } from './presentation/components/PieChart';
export { PieChart } from './presentation/components/PieChart';
export type { LegendItem, ChartLegendProps } from './presentation/components/ChartLegend';
export { ChartLegend } from './presentation/components/ChartLegend';
export type { ChartTooltipProps } from './presentation/components/ChartTooltip';
export { ChartTooltip } from './presentation/components/ChartTooltip';
