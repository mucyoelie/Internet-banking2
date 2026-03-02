import React from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDate, getTransactionColor } from '@/utils/formatters';
import type { Transaction } from '@/types';

interface TransactionItemProps {
  transaction: Transaction;
  showDate?: boolean;
  className?: string;
  onClick?: () => void;
}

const transactionIcons = {
  deposit: ArrowDownLeft,
  withdrawal: ArrowUpRight,
  transfer: ArrowLeftRight,
  payment: ShoppingBag,
  refund: RotateCcw,
};

const transactionColors = {
  deposit: 'bg-emerald-100 text-emerald-600',
  withdrawal: 'bg-red-100 text-red-600',
  transfer: 'bg-blue-100 text-blue-600',
  payment: 'bg-purple-100 text-purple-600',
  refund: 'bg-orange-100 text-orange-600',
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  showDate = true,
  className,
  onClick,
}) => {
  const Icon = transactionIcons[transaction.type];
  const isIncoming = transaction.type === 'deposit' || transaction.type === 'refund';
  const amount = Math.abs(transaction.amount);

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-slate-50 cursor-pointer',
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
          transactionColors[transaction.type]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-slate-900 truncate">
            {transaction.description}
          </p>
          <p
            className={cn(
              'font-bold whitespace-nowrap',
              getTransactionColor(transaction.type)
            )}
          >
            {isIncoming ? '+' : '-'}
            {formatCurrency(amount, transaction.currency)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="capitalize">{transaction.type}</span>
            {transaction.recipientName && (
              <>
                <span>•</span>
                <span className="truncate">{transaction.recipientName}</span>
              </>
            )}
          </div>
          {showDate && (
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {formatDate(transaction.date)}
            </span>
          )}
        </div>

        {transaction.status !== 'completed' && (
          <div className="mt-2">
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                transaction.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                transaction.status === 'failed' && 'bg-red-100 text-red-700',
                transaction.status === 'cancelled' && 'bg-slate-100 text-slate-700'
              )}
            >
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
