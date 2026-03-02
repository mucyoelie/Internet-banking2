import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/common/StatCard';
import { AccountCard } from '@/components/common/AccountCard';
import { TransactionItem } from '@/components/common/TransactionItem';
import { LineChart } from '@/components/charts/LineChart';
import { PieChart } from '@/components/charts/PieChart';
import { mockAccounts, mockTransactions, mockDashboardStats } from '@/data/mockData';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { monthlyIncomeExpenseData, expenseCategoryData } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const recentTransactions = mockTransactions.slice(0, 5);
  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            View Reports
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            <TrendingUp className="h-4 w-4" />
            Quick Transfer
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={totalBalance}
          icon={Wallet}
          trend="up"
          change={12.5}
          color="blue"
        />
        <StatCard
          title="Monthly Income"
          value={mockDashboardStats.monthlyIncome}
          icon={TrendingUp}
          trend="up"
          change={8.2}
          color="green"
        />
        <StatCard
          title="Monthly Expenses"
          value={mockDashboardStats.monthlyExpenses}
          icon={TrendingDown}
          trend="down"
          change={-3.5}
          color="red"
        />
        <StatCard
          title="Savings Goal"
          value={mockDashboardStats.savingsProgress}
          icon={PiggyBank}
          trend="up"
          change={15.3}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts */}
        <div className="space-y-6 lg:col-span-2">
          {/* Income vs Expenses Chart */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Income vs Expenses</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyIncomeExpenseData}
                lines={[
                  { key: 'income', color: '#10b981', name: 'Income' },
                  { key: 'expense', color: '#ef4444', name: 'Expenses' },
                ]}
                xAxisKey="label"
              />
            </CardContent>
          </Card>

          {/* Accounts Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Your Accounts</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mockAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Savings Progress */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Savings Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Progress</span>
                <span className="text-sm font-medium text-slate-900">
                  {formatPercentage(mockDashboardStats.savingsProgress)}
                </span>
              </div>
              <Progress value={mockDashboardStats.savingsProgress} className="h-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Current</span>
                <span className="font-medium">
                  {formatCurrency(mockAccounts[1].balance)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Goal</span>
                <span className="font-medium">
                  {formatCurrency(mockDashboardStats.savingsGoal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Remaining</span>
                <span className="font-medium text-blue-600">
                  {formatCurrency(mockDashboardStats.savingsGoal - mockAccounts[1].balance)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart data={expenseCategoryData} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
