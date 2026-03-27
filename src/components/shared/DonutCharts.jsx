import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { nutrition: 'protein', value: 2.7, fill: 'var(--color-chart-1)' },
  { nutrition: 'carb', value: 28, fill: 'var(--color-chart-2)' },
  { nutrition: 'fat', value: 0.3, fill: 'var(--color-chart-3)' },
];
const chartConfig = {
  protein: {
    label: '蛋白量',
    color: 'var(--color-chart-1)',
  },
  carb: {
    label: '碳水量',
    color: 'var(--color-chart-2)',
  },
  fat: {
    label: '脂肪量',
    color: 'var(--color-chart-3)',
  },
};

export const DonutChart = () => {
  return (
    <>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-62.5 w-full">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="nutrition"
            label={({ x, y, cx, value }) => (
              <text
                x={x > cx ? x + 5 : x - 5}
                y={y}
                fill="black"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-xs font-mono"
              >
                {`${value.toFixed(1)} g`}
              </text>
            )}
            labelLine={{ stroke: 'var(--color-on-surface)' }}
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
                        130
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="text-on-surface-light"
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
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: 'var(--color-on-surface-light-light)' }}
            />
            <span className="text-on-surface">熱量</span>
          </div>
          <span className="font-mono font-medium">130 Kcal</span>
        </div>
        {chartData.map((item) => (
          <div
            key={item.nutrition}
            className="flex items-center justify-between py-2.5 px-6 text-md"
          >
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
              <span className="text-on-surface">{chartConfig[item.nutrition].label}</span>
            </div>
            <span className="font-mono font-medium">{item.value} g</span>
          </div>
        ))}
      </div>
    </>
  );
};
