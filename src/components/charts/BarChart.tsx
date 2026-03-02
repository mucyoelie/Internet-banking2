import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  className?: string;
  showGrid?: boolean;
  barColor?: string;   // ✅ FIX ADDED
  gradientColors?: [string, string];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
        <p className="font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-600">
          Amount: ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  className,
  showGrid = true,
  barColor = '#3b82f6',
  gradientColors = ['#3b82f6', '#8b5cf6'],
}) => {
  return (
    <div className={cn('h-64 w-full', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColors[0]} />
              <stop offset="100%" stopColor={gradientColors[1]} />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
          )}

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={50}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || barColor || 'url(#barGradient)'}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
