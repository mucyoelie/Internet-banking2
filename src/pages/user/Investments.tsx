import React, { useState } from 'react';
//import { Plus, TrendingUp, TrendingDown, ArrowRight, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { Plus, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Tabs components available for future use
import { Badge } from '@/components/ui/badge';
// Progress component available for future use
import { PieChart } from '@/components/charts/PieChart';
import { AreaChart } from '@/components/charts/AreaChart';
import { mockInvestments, investmentPerformanceData } from '@/data/mockData';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { cn } from '@/lib/utils';

const Investments: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.purchasePrice * inv.quantity, 0);
  const totalProfitLoss = totalValue - totalInvested;
  const totalReturnPercentage = (totalProfitLoss / totalInvested) * 100;

  const filteredInvestments = selectedType === 'all'
    ? mockInvestments
    : mockInvestments.filter((inv) => inv.type === selectedType);

  const investmentTypes = [
    { value: 'all', label: 'All Investments' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'mutual_funds', label: 'Mutual Funds' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'fixed_deposit', label: 'Fixed Deposits' },
  ];

  // Prepare pie chart data
  const portfolioData = mockInvestments.map((inv) => ({
    label: inv.name,
    value: inv.totalValue,
    color: getInvestmentColor(inv.type),
  }));

  function getInvestmentColor(type: string): string {
    const colors: Record<string, string> = {
      stocks: '#3b82f6',
      bonds: '#10b981',
      mutual_funds: '#8b5cf6',
      crypto: '#f59e0b',
      fixed_deposit: '#ef4444',
    };
    return colors[type] || '#6b7280';
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Investments</h1>
          <p className="text-slate-500">Track and manage your investment portfolio.</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="h-4 w-4" />
          Add Investment
        </Button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Total Portfolio Value</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Total Invested</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalInvested)}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Profit/Loss</p>
            <p
              className={cn(
                'text-2xl font-bold',
                totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {totalProfitLoss >= 0 ? '+' : ''}
              {formatCurrency(totalProfitLoss)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Total Return</p>
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  'text-2xl font-bold',
                  totalReturnPercentage >= 0 ? 'text-emerald-600' : 'text-red-600'
                )}
              >
                {formatPercentage(totalReturnPercentage)}
              </p>
              {totalReturnPercentage >= 0 ? (
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Allocation</CardTitle>
            <CardDescription>Distribution of your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={portfolioData} />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Performance</CardTitle>
            <CardDescription>6-month performance history</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={investmentPerformanceData}
              dataKey="value"
              xAxisKey="label"
              gradientColors={['#10b981', '#10b981']}
              strokeColor="#10b981"
            />
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">My Investments</CardTitle>
              <CardDescription>Track your individual investments</CardDescription>
            </div>
            <div className="flex gap-2">
              {investmentTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvestments.map((investment) => (
              <div
                key={investment.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
              >
                {/* Investment Info */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${getInvestmentColor(investment.type)}20` }}
                  >
                    {investment.profitLoss >= 0 ? (
                      <TrendingUp
                        className="h-6 w-6"
                        style={{ color: getInvestmentColor(investment.type) }}
                      />
                    ) : (
                      <TrendingDown
                        className="h-6 w-6"
                        style={{ color: getInvestmentColor(investment.type) }}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{investment.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {investment.type.replace('_', ' ')}
                      </Badge>
                      {investment.symbol && (
                        <span className="text-xs text-slate-500">{investment.symbol}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Investment Details */}
                <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-slate-500">Quantity</p>
                    <p className="font-medium">{investment.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Purchase Price</p>
                    <p className="font-medium">{formatCurrency(investment.purchasePrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Current Price</p>
                    <p className="font-medium">{formatCurrency(investment.currentPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Value</p>
                    <p className="font-medium">{formatCurrency(investment.totalValue)}</p>
                  </div>
                </div>

                {/* Profit/Loss */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p
                      className={cn(
                        'font-bold',
                        investment.profitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'
                      )}
                    >
                      {investment.profitLoss >= 0 ? '+' : ''}
                      {formatCurrency(investment.profitLoss)}
                    </p>
                    <p
                      className={cn(
                        'text-sm',
                        investment.profitLossPercentage >= 0 ? 'text-emerald-600' : 'text-red-600'
                      )}
                    >
                      {formatPercentage(investment.profitLossPercentage)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Opportunities */}
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-lg">Investment Opportunities</CardTitle>
          <CardDescription>Explore new investment options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'S&P 500 ETF',
                type: 'Index Fund',
                return: '12.5%',
                risk: 'Medium',
                minInvestment: 100,
              },
              {
                name: 'Tech Growth Fund',
                type: 'Mutual Fund',
                return: '18.2%',
                risk: 'High',
                minInvestment: 500,
              },
              {
                name: 'Government Bonds',
                type: 'Bonds',
                return: '4.5%',
                risk: 'Low',
                minInvestment: 1000,
              },
              {
                name: 'Real Estate REIT',
                type: 'REIT',
                return: '8.7%',
                risk: 'Medium',
                minInvestment: 250,
              },
            ].map((opportunity, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:shadow-md"
              >
                <h4 className="font-semibold text-slate-900">{opportunity.name}</h4>
                <p className="text-sm text-slate-500">{opportunity.type}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Expected Return</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {opportunity.return}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Risk Level</span>
                    <span className="text-sm font-medium">{opportunity.risk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-500">Min Investment</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(opportunity.minInvestment)}
                    </span>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Investments;
