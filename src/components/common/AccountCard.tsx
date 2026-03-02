import React from 'react';
import { Wallet, TrendingUp, Landmark, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/formatters';
import type { Account } from '@/types';

interface AccountCardProps {
  account: Account;
  showDetails?: boolean;
  onClick?: () => void;
  className?: string;
}

const accountTypeConfig = {
  checking: {
    label: 'Checking Account',
    icon: Wallet,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
  },
  savings: {
    label: 'Savings Account',
    icon: TrendingUp,
    color: 'green',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  investment: {
    label: 'Investment Account',
    icon: Landmark,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
  },
  loan: {
    label: 'Loan Account',
    icon: CreditCard,
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
  },
};

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  showDetails = true,
  onClick,
  className,
}) => {
  const config = accountTypeConfig[account.accountType];
  const Icon = config.icon;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'group cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      <div className={cn('h-2 bg-gradient-to-r', config.gradient)} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                `bg-${config.color}-50`
              )}
            >
              <Icon className={cn('h-5 w-5', `text-${config.color}-600`)} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{config.label}</p>
              <p className="text-sm text-slate-500">{account.accountNumber}</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              account.status === 'active' && 'bg-emerald-100 text-emerald-700',
              account.status === 'inactive' && 'bg-slate-100 text-slate-700',
              account.status === 'frozen' && 'bg-orange-100 text-orange-700',
              account.status === 'closed' && 'bg-red-100 text-red-700'
            )}
          >
            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
          </Badge>
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-500">Available Balance</p>
          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(account.balance, account.currency)}
          </p>
        </div>

        {showDetails && account.interestRate && (
          <div className="mt-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-slate-600">
              {account.interestRate}% APY
            </span>
          </div>
        )}

        {showDetails && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="text-xs text-slate-400">
              Opened {new Date(account.openedDate).toLocaleDateString()}
            </span>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">
              View Details →
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
