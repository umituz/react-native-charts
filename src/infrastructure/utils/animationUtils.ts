/**
 * Animation Utilities
 *
 * Pre-configured animation timing and easing functions.
 */

import type { AnimationType } from '../../domain/entities/ChartTypes';

export interface AnimationTiming {
  duration: number;
  delay?: number;
}

/**
 * Animation presets
 */
export const ANIMATION_PRESETS: Record<string, AnimationTiming> = {
  fast: { duration: 300 },
  normal: { duration: 800 },
  slow: { duration: 1200 },
  stagger: { duration: 800, delay: 50 },
};

/**
 * Get animation config for chart type
 */
export const getAnimationConfig = (
  type: AnimationType,
  preset: keyof typeof ANIMATION_PRESETS = 'normal'
): AnimationTiming => {
  return ANIMATION_PRESETS[preset];
};
