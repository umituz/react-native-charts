# @umituz/react-native-charts

High-performance charting library for React Native with Victory Native XL, Reanimated v3, and theme integration.

## Installation

```bash
npm install @umituz/react-native-charts
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `victory-native` *
- `react-native-reanimated` >= 3.0.0
- `@umituz/react-native-design-system` *

## Features

- ✅ Line charts (single and multi-line)
- ✅ Bar charts (simple and grouped)
- ✅ Area charts (simple and stacked)
- ✅ Pie charts (simple and donut)
- ✅ Theme integration with design system
- ✅ Animations with Reanimated v3
- ✅ Touch interactions
- ✅ Customizable colors and styles
- ✅ Legend and tooltip support
- ✅ Data formatting utilities

## Usage

### Basic Line Chart

```typescript
import { LineChart } from '@umituz/react-native-charts';

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 20 },
  { x: 3, y: 15 },
];

<LineChart data={data} />
```

### Multi-Series Chart

```typescript
import { LineChart } from '@umituz/react-native-charts';

const data = [
  { name: 'Series 1', data: [{ x: 1, y: 10 }, { x: 2, y: 20 }] },
  { name: 'Series 2', data: [{ x: 1, y: 15 }, { x: 2, y: 25 }] },
];

<LineChart data={data} />
```

### Bar Chart

```typescript
import { BarChart } from '@umituz/react-native-charts';

const data = [
  { x: 'Jan', y: 100 },
  { x: 'Feb', y: 200 },
  { x: 'Mar', y: 150 },
];

<BarChart data={data} />
```

### Pie Chart

```typescript
import { PieChart } from '@umituz/react-native-charts';

const data = [
  { label: 'A', value: 30, color: '#FF0000' },
  { label: 'B', value: 50, color: '#00FF00' },
  { label: 'C', value: 20, color: '#0000FF' },
];

<PieChart data={data} />
```

### Custom Configuration

```typescript
import { LineChart } from '@umituz/react-native-charts';

<LineChart
  data={data}
  config={{
    dimensions: { width: '100%', height: 400 },
    animation: { duration: 1000 },
    legend: { show: true, position: 'bottom' },
  }}
/>
```

## Components

- `LineChart` - Line chart component
- `BarChart` - Bar chart component
- `AreaChart` - Area chart component
- `PieChart` - Pie chart component
- `ChartLegend` - Legend component
- `ChartTooltip` - Tooltip component

## Hooks

- `useChartTheme` - Get theme-aware colors
- `useChartAnimation` - Manage chart animations
- `useChartData` - Manage chart data state

## Utilities

- `formatLineData` - Format data for line charts
- `formatMultiSeries` - Format multi-series data
- `formatPieData` - Format data for pie charts
- `aggregateByKey` - Aggregate data by key
- `fillMissingDates` - Fill missing dates in time series
- `generateColors` - Generate color palettes
- `COLOR_PALETTES` - Pre-defined color palettes

## License

MIT

