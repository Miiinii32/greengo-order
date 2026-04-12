import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formatters } from '@/utils/formatters';

export const DonutChart = ({ calories, proteinGrams, carbsGrams, fatGrams }) => {
  const totalValue = proteinGrams + carbsGrams + fatGrams;
  const defaultData = [{ nutrition: 'default', value: 1, fill: 'var(--neutral-300)' }];
  const chartData = [
    { nutrition: 'proteinGrams', value: proteinGrams, fill: 'var(--color-chart-1)' },
    { nutrition: 'carbsGrams', value: carbsGrams, fill: 'var(--color-chart-2)' },
    { nutrition: 'fatGrams', value: fatGrams, fill: 'var(--color-chart-3)' },
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
            data={totalValue === 0 ? defaultData : chartData}
            dataKey="value"
            nameKey="nutrition"
            label={({ x, y, cx, value, nutrition }) => (
              <text
                x={x > cx ? x + 5 : x - 5}
                y={y}
                fill="on-surface"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className={totalValue === 0 ? 'hidden' : 'text-xs font-mono bg-surfce'}
              >
                <tspan>{formatters('nutrition', nutrition)}</tspan>
                <tspan x={x > cx ? x + 6 : x - 6} y={y + 16}>{`${value?.toFixed(1)} g`}</tspan>
              </text>
            )}
            labelLine={{ stroke: totalValue === 0 ? 'var(--surface)' : 'var(--on-surface)' }}
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
                        {calories || 0}
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
              className="size-2 rounded-sm mr-2"
              style={{ backgroundColor: 'var(--color-on-surface)' }}
            />

            <span className="text-on-surface">總熱量</span>
          </div>
          <span className="font-normal text-on-surface">{calories} Kcal</span>
        </div>
        {chartData.map((item) => (
          <div
            key={item.nutrition}
            className="flex items-center justify-between py-2.5 px-6 text-md"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-xs mr-2" style={{ backgroundColor: item.fill }} />
              <span className="text-on-surface">{formatters('nutrition', item.nutrition)}</span>
            </div>
            <span className="font-normal text-on-surface">{item.value?.toFixed()} g</span>
          </div>
        ))}
      </div>
    </>
  );
};
