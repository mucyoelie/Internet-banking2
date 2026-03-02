import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface StatCardProps {
  title: string;
  value: number;
  currency?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const bgColorVariants = {
  blue: 'bg-blue-50',
  green: 'bg-emerald-50',
  purple: 'bg-purple-50',
  orange: 'bg-orange-50',
  red: 'bg-red-50',
};

const iconColorVariants = {
  blue: 'text-blue-600',
  green: 'text-emerald-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  currency = 'USD',
  change,
  changeLabel = 'vs last month',
  icon: Icon,
  trend = 'neutral',
  color = 'blue',
}) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {formatCurrency(value, currency)}
            </h3>
            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'flex items-center gap-0.5 text-xs font-medium',
                    isPositive && 'text-emerald-600',
                    isNegative && 'text-red-600',
                    !isPositive && !isNegative && 'text-slate-600'
                  )}
                >
                  {isPositive && <TrendingUp className="h-3 w-3" />}
                  {isNegative && <TrendingDown className="h-3 w-3" />}
                  {formatPercentage(change)}
                </span>
                <span className="text-xs text-slate-400">{changeLabel}</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl',
              bgColorVariants[color]
            )}
          >
            <Icon className={cn('h-6 w-6', iconColorVariants[color])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
