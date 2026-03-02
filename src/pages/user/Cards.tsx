import React, { useState } from 'react';
import { Plus, Lock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { CreditCard } from '@/components/common/CreditCard';
import { mockCards } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';
// cn utility available for future use

const Cards: React.FC = () => {
  const [showBack, setShowBack] = useState<Record<string, boolean>>({});
  const [cardSettings, setCardSettings] = useState<Record<string, {
    onlinePayments: boolean;
    atmWithdrawals: boolean;
    contactless: boolean;
    international: boolean;
  }>>({});

  const toggleCardFace = (cardId: string) => {
    setShowBack((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const updateCardSetting = (cardId: string, setting: string, value: boolean) => {
    setCardSettings((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], [setting]: value },
    }));
  };

  const getCardStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-700">Inactive</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-700">Blocked</Badge>;
      case 'expired':
        return <Badge className="bg-orange-100 text-orange-700">Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Cards</h1>
          <p className="text-slate-500">Manage your debit, credit, and virtual cards.</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="h-4 w-4" />
          Request New Card
        </Button>
      </div>

      {/* Cards Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm">
          <TabsTrigger value="all">All Cards</TabsTrigger>
          <TabsTrigger value="debit">Debit</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {mockCards.map((card) => (
              <Card key={card.id} className="border-0 shadow-lg shadow-slate-200/50">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Card Visual */}
                    <div className="flex-shrink-0">
                      <div
                        onClick={() => toggleCardFace(card.id)}
                        className="cursor-pointer transition-transform hover:scale-[1.02]"
                      >
                        <CreditCard
                          card={card}
                          showBack={showBack[card.id]}
                        />
                      </div>
                      <p className="mt-2 text-center text-xs text-slate-400">
                        Click to reveal CVV
                      </p>
                    </div>

                    {/* Card Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)} Card
                          </h3>
                          <p className="text-sm text-slate-500">**** {card.lastFourDigits}</p>
                        </div>
                        {getCardStatusBadge(card.status)}
                      </div>

                      {/* Card Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Daily Limit</p>
                          <p className="font-medium">{formatCurrency(card.dailyLimit)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Monthly Spending</p>
                          <p className="font-medium">{formatCurrency(card.currentMonthSpending)}</p>
                        </div>
                      </div>

                      {/* Spending Progress */}
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Monthly Usage</span>
                          <span className="font-medium">
                            {Math.round((card.currentMonthSpending / card.dailyLimit) * 30 * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(card.currentMonthSpending / card.dailyLimit) * 30 * 100}
                          className="mt-1 h-2"
                        />
                      </div>

                      {/* Card Controls */}
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-medium">Card Controls</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Online Payments</span>
                            <Switch
                              checked={cardSettings[card.id]?.onlinePayments ?? true}
                              onCheckedChange={(checked) =>
                                updateCardSetting(card.id, 'onlinePayments', checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">ATM Withdrawals</span>
                            <Switch
                              checked={cardSettings[card.id]?.atmWithdrawals ?? true}
                              onCheckedChange={(checked) =>
                                updateCardSetting(card.id, 'atmWithdrawals', checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Contactless</span>
                            <Switch
                              checked={cardSettings[card.id]?.contactless ?? true}
                              onCheckedChange={(checked) =>
                                updateCardSetting(card.id, 'contactless', checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">International</span>
                            <Switch
                              checked={cardSettings[card.id]?.international ?? true}
                              onCheckedChange={(checked) =>
                                updateCardSetting(card.id, 'international', checked)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Lock className="h-3 w-3" />
                          Freeze
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                          <Settings className="h-3 w-3" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Filtered tabs content */}
        {['debit', 'credit', 'virtual'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {mockCards
                .filter((card) => card.cardType === type)
                .map((card) => (
                  <Card key={card.id} className="border-0 shadow-lg shadow-slate-200/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="flex-shrink-0">
                          <CreditCard
                            card={card}
                            showBack={showBack[card.id]}
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1)} Card
                              </h3>
                              <p className="text-sm text-slate-500">**** {card.lastFourDigits}</p>
                            </div>
                            {getCardStatusBadge(card.status)}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-slate-500">Daily Limit</p>
                              <p className="font-medium">{formatCurrency(card.dailyLimit)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Monthly Spending</p>
                              <p className="font-medium">{formatCurrency(card.currentMonthSpending)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Card Benefits Section */}
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle>Card Benefits & Rewards</CardTitle>
          <CardDescription>Explore benefits available with your cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Cashback', value: '2%', desc: 'On all purchases' },
              { title: 'Travel Insurance', value: 'Free', desc: 'International coverage' },
              { title: 'Lounge Access', value: '4x', desc: 'Airport visits/year' },
              { title: 'Purchase Protection', value: '90 days', desc: 'Extended warranty' },
            ].map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-4 text-center transition-all hover:border-blue-300 hover:shadow-md"
              >
                <p className="text-2xl font-bold text-blue-600">{benefit.value}</p>
                <p className="font-medium text-slate-900">{benefit.title}</p>
                <p className="text-sm text-slate-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
