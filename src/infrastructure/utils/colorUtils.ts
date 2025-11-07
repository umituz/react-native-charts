/**
 * Color Utilities for Charts
 *
 * Generate color palettes, gradients, and color variations.
 * Theme-aware color generation.
 */

/**
 * Pre-defined color palettes
 */
export const COLOR_PALETTES = {
  primary: [
    '#667eea', '#764ba2', '#f093fb', '#4facfe',
    '#43e97b', '#fa709a', '#fee140', '#30cfd0',
  ],
  pastel: [
    '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf',
    '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',
  ],
  vibrant: [
    '#ff006e', '#fb5607', '#ffbe0b', '#8338ec',
    '#3a86ff', '#06ffa5', '#ff006e', '#fb5607',
  ],
  monochrome: [
    '#2d3436', '#636e72', '#b2bec3', '#dfe6e9',
    '#f5f6fa', '#a4b0be', '#747d8c', '#57606f',
  ],
};

/**
 * Generate n distinct colors from palette
 */
export const generateColors = (count: number, palette: keyof typeof COLOR_PALETTES = 'primary'): string[] => {
  const colors = COLOR_PALETTES[palette];
  if (count <= colors.length) {
    return colors.slice(0, count);
  }

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

/**
 * Generate gradient colors
 */
export const generateGradient = (startColor: string, endColor: string, steps: number): string[] => {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  const gradient: string[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(start.r + ratio * (end.r - start.r));
    const g = Math.round(start.g + ratio * (end.g - start.g));
    const b = Math.round(start.b + ratio * (end.b - start.b));
    gradient.push(rgbToHex(r, g, b));
  }

  return gradient;
};

/**
 * Hex to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * RGB to Hex
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Lighten/darken color
 */
export const adjustColorBrightness = (hex: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const adjust = (val: number) => Math.min(255, Math.max(0, val + (val * percent) / 100));

  return rgbToHex(adjust(r), adjust(g), adjust(b));
};
