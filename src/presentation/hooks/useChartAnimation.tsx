/**
 * Chart Animation Hook
 *
 * Manages animation state and configuration for charts.
 * Provides timing and spring animation configs.
 */

import { useState, useCallback } from 'react';
import type { AnimationConfig } from '../../domain/entities/ChartConfig';
import { AnimationType } from '../../domain/entities/ChartTypes';
import { DEFAULT_ANIMATION_CONFIG } from '../../infrastructure/config/defaultConfig';

export interface UseChartAnimationReturn {
  animationConfig: AnimationConfig;
  setAnimationEnabled: (enabled: boolean) => void;
  setAnimationType: (type: AnimationType) => void;
  setAnimationDuration: (duration: number) => void;
}

export const useChartAnimation = (
  initialConfig?: Partial<AnimationConfig>
): UseChartAnimationReturn => {
  const [animationConfig, setAnimationConfig] = useState<AnimationConfig>({
    ...DEFAULT_ANIMATION_CONFIG,
    ...initialConfig,
  });

  const setAnimationEnabled = useCallback((enabled: boolean) => {
    setAnimationConfig(prev => ({
      ...prev,
      disabled: !enabled,
    }));
  }, []);

  const setAnimationType = useCallback((type: AnimationType) => {
    setAnimationConfig(prev => ({
      ...prev,
      type,
    }));
  }, []);

  const setAnimationDuration = useCallback((duration: number) => {
    setAnimationConfig(prev => ({
      ...prev,
      duration,
    }));
  }, []);

  return {
    animationConfig,
    setAnimationEnabled,
    setAnimationType,
    setAnimationDuration,
  };
};
