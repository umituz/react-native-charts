/**
 * Chart Theme Interface
 *
 * Integrates with app design tokens for consistent theming.
 */

export interface IChartTheme {
  // Primary colors (from design tokens)
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;

  // Chart-specific colors
  axisColor: string;
  gridColor: string;
  labelColor: string;
  tooltipBackground: string;
  tooltipText: string;

  // Gradient colors (for area charts, pie slices)
  gradients: {
    primary: string[];
    secondary: string[];
    multiColor: string[];
  };
}
