import React from 'react';
import { Wifi, CreditCard as CardIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Card as CardType } from '@/types';

interface CreditCardProps {
  card: CardType;
  className?: string;
  showBack?: boolean;
}

const cardTypeStyles = {
  debit: 'from-blue-600 to-blue-800',
  credit: 'from-purple-600 to-purple-800',
  virtual: 'from-emerald-600 to-emerald-800',
};

const cardTypeLabels = {
  debit: 'Debit Card',
  credit: 'Credit Card',
  virtual: 'Virtual Card',
};

export const CreditCard: React.FC<CreditCardProps> = ({
  card,
  className,
  showBack = false,
}) => {
  if (showBack) {
    return (
      <div
        className={cn(
          'relative h-52 w-80 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white shadow-xl',
          className
        )}
      >
        {/* Magnetic Strip */}
        <div className="absolute left-0 right-0 top-8 h-12 bg-black" />
        
        {/* Signature Panel */}
        <div className="absolute left-6 right-6 top-28 h-10 bg-white rounded">
          <div className="flex h-full items-center justify-end px-3">
            <span className="font-mono text-sm text-slate-900 italic">
              {card.cvv}
            </span>
          </div>
        </div>

        {/* Card Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs text-slate-400">Customer Service</p>
          <p className="text-sm font-medium">+1 (800) 123-4567</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative h-52 w-80 rounded-2xl bg-gradient-to-br p-6 text-white shadow-xl overflow-hidden',
        cardTypeStyles[card.cardType],
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />

      {/* Card Header */}
      <div className="relative flex items-center justify-between">
        <Wifi className="h-6 w-6 rotate-90" />
        <span className="text-sm font-medium opacity-80">
          {cardTypeLabels[card.cardType]}
        </span>
      </div>

      {/* Chip */}
      <div className="relative mt-6">
        <div className="h-10 w-14 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-400">
          <div className="flex h-full items-center justify-center">
            <div className="h-6 w-8 rounded border border-yellow-600/30" />
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="relative mt-4">
        <p className="font-mono text-xl tracking-wider">
          **** **** **** {card.lastFourDigits}
        </p>
      </div>

      {/* Card Footer */}
      <div className="relative mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-70">Card Holder</p>
          <p className="font-medium uppercase tracking-wide">
            {card.cardHolderName}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-70">Expires</p>
          <p className="font-medium">{card.expiryDate}</p>
        </div>
        <CardIcon className="h-8 w-8 opacity-50" />
      </div>
    </div>
  );
};
