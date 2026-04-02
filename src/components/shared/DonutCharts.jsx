import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formatters } from '@/utils/formatters';
import { Badge } from '../ui/badge';

export const DonutChart = ({ caloriesValue, proteinValue, carbsValue, fatValue }) => {
  const chartData = [
    { nutrition: 'protein', value: proteinValue, fill: 'var(--color-chart-1)' },
    { nutrition: 'carbs', value: carbsValue, fill: 'var(--color-chart-2)' },
    { nutrition: 'fat', value: fatValue, fill: 'var(--color-chart-3)' },
  ];
  const chartConfig = {
    protein: {
      label: '蛋白量',
      color: 'var(--color-chart-1)',
    },
    carbs: {
      label: '碳水量',
      color: 'var(--color-chart-2)',
    },
    fat: {
      label: '脂肪量',
      color: 'var(--color-chart-3)',
    },
  }; // 把 tooltip效果先拿掉了，
  return (
    <>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-62.5 w-full">
        <PieChart>
          {/* <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} /> */}
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="nutrition"
            label={({ x, y, cx, value, nutrition }) => (
              <text
                x={x > cx ? x + 5 : x - 5}
                y={y}
                fill="on-surface"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-mono"
              >
                <tspan>{formatters('nutrition', nutrition)}</tspan>
                <tspan x={x > cx ? x + 6 : x - 6} y={y + 16}>{`${value.toFixed(1)} g`}</tspan>
              </text>
            )}
            labelLine={{ stroke: 'var(--on-surface)' }}
            innerRadius={60}
            outerRadius={90}
            strokeWidth={1}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {caloriesValue}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="text-on-surface-variant"
                      >
                        熱量 Kcal
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-2.5 px-6 text-md">
          <div className="flex items-center gap-2">
            <div
              className="size-2 rounded-sm"
              style={{ backgroundColor: 'var(--color-on-surface)' }}
            />

            <span className="text-on-surface">總熱量</span>
          </div>
          <span className="font-medium text-on-surface">{caloriesValue} Kcal</span>
        </div>
        {chartData.map((item) => (
          <div
            key={item.nutrition}
            className="flex items-center justify-between py-2.5 px-6 text-md"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-sm" style={{ backgroundColor: item.fill }} />
              {/* <span className="text-on-surface">{chartConfig[item.nutrition].label}</span> */}
              <span className="text-on-surface">{formatters('nutrition', item.nutrition)}</span>
            </div>
            <span className="font-medium text-on-surface">{item.value} g</span>
          </div>
        ))}
      </div>
    </>
  );
};
