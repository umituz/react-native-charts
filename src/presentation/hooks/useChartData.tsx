/**
 * Chart Data Hook
 *
 * Manages chart data state with formatting and validation.
 * Generic hook works with any data type.
 */

import { useState, useCallback, useMemo } from 'react';
import type { ChartDataPoint, ChartSeries, PieChartSegment } from '../../domain/entities/ChartData';
import { ChartDataUtils } from '../../domain/entities/ChartData';

export interface UseChartDataReturn<T> {
  data: T;
  setData: (data: T) => void;
  isValid: boolean;
  sortedData: T;
}

export const useChartData = <T extends ChartDataPoint[] | ChartSeries[] | PieChartSegment[]>(
  initialData: T
): UseChartDataReturn<T> => {
  const [data, setData] = useState<T>(initialData);

  const isValid = useMemo(() => {
    if (data.length === 0) return false;

    if ('x' in data[0] && 'y' in data[0]) {
      return ChartDataUtils.validateLineData(data as ChartDataPoint[]);
    }

    if ('value' in data[0] && 'label' in data[0]) {
      return ChartDataUtils.validatePieData(data as PieChartSegment[]);
    }

    return true;
  }, [data]);

  const sortedData = useMemo(() => {
    if (data.length === 0) return data;

    if ('x' in data[0] && 'y' in data[0]) {
      return ChartDataUtils.sortByX(data as ChartDataPoint[]) as T;
    }

    return data;
  }, [data]);

  return {
    data,
    setData,
    isValid,
    sortedData,
  };
};
