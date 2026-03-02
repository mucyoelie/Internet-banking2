import React, { useState } from 'react';
import { Plus, ArrowRight, TrendingUp, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AccountCard } from '@/components/common/AccountCard';
import { TransactionItem } from '@/components/common/TransactionItem';
import { AreaChart } from '@/components/charts/AreaChart';
import { mockAccounts, mockTransactions } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { cn } from '@/lib/utils';

// Generate mock balance history data
const generateBalanceHistory = (baseBalance: number) => {
  const data = [];
  let balance = baseBalance;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    balance += (Math.random() - 0.4) * 1000;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Math.max(0, balance),
    });
  }
  return data;
};

const Accounts: React.FC = () => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>(mockAccounts[0].id);
  const selectedAccount = mockAccounts.find(acc => acc.id === selectedAccountId) || mockAccounts[0];
  const accountTransactions = mockTransactions.filter(t => t.accountId === selectedAccountId);
  const balanceHistory = generateBalanceHistory(selectedAccount.balance);

  const accountTypeConfig = {
    checking: { label: 'Checking Accounts', color: 'blue' },
    savings: { label: 'Savings Accounts', color: 'green' },
    investment: { label: 'Investment Accounts', color: 'purple' },
    loan: { label: 'Loan Accounts', color: 'orange' },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Accounts</h1>
          <p className="text-slate-500">Manage all your bank accounts in one place.</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
          <Plus className="h-4 w-4" />
          Open New Account
        </Button>
      </div>

      {/* Account Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(accountTypeConfig).map(([type, config]) => {
          const accountsOfType = mockAccounts.filter(acc => acc.accountType === type);
          const totalBalance = accountsOfType.reduce((sum, acc) => sum + acc.balance, 0);
          
          return (
            <Card key={type} className="border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{config.label}</p>
                    <p className="text-xl font-bold text-slate-900">
                      {formatCurrency(totalBalance)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {accountsOfType.length} account{accountsOfType.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl',
                    `bg-${config.color}-50`
                  )}>
                    <TrendingUp className={cn('h-6 w-6', `text-${config.color}-600`)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm">
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="checking">Checking</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Account Selector */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockAccounts.map((account) => (
              <div
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  selectedAccountId === account.id && 'scale-[1.02]'
                )}
              >
                <AccountCard
                  account={account}
                  className={cn(
                    selectedAccountId === account.id && 'ring-2 ring-blue-500'
                  )}
                />
              </div>
            ))}
          </div>

          {/* Selected Account Details */}
          {selectedAccount && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Balance Chart */}
              <Card className="border-0 shadow-lg shadow-slate-200/50 lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">Balance History</CardTitle>
                      <p className="text-sm text-slate-500">
                        {selectedAccount.accountNumber} • Last 30 days
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={balanceHistory}
                    dataKey="balance"
                    xAxisKey="date"
                    gradientColors={['#3b82f6', '#3b82f6']}
                    strokeColor="#3b82f6"
                  />
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="border-0 shadow-lg shadow-slate-200/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Account Type</span>
                      <Badge variant="secondary" className="capitalize">
                        {selectedAccount.accountType}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Account Number</span>
                      <span className="font-medium">{selectedAccount.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Status</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          selectedAccount.status === 'active' && 'bg-emerald-100 text-emerald-700',
                          selectedAccount.status === 'inactive' && 'bg-slate-100 text-slate-700',
                          selectedAccount.status === 'frozen' && 'bg-orange-100 text-orange-700',
                        )}
                      >
                        {selectedAccount.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Currency</span>
                      <span className="font-medium">{selectedAccount.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Opened Date</span>
                      <span className="font-medium">{formatDate(selectedAccount.openedDate)}</span>
                    </div>
                    {selectedAccount.interestRate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Interest Rate</span>
                        <span className="font-medium text-emerald-600">
                          {selectedAccount.interestRate}% APY
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-slate-100 pt-4">
                    <Button variant="outline" className="w-full gap-2">
                      <Eye className="h-4 w-4" />
                      View Statements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Transactions for Selected Account */}
          <Card className="border-0 shadow-lg shadow-slate-200/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Recent Transactions - {selectedAccount.accountNumber}
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-100">
                {accountTransactions.length > 0 ? (
                  accountTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))
                ) : (
                  <p className="py-8 text-center text-slate-500">No transactions found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would show filtered accounts */}
        <TabsContent value="checking" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockAccounts
              .filter(acc => acc.accountType === 'checking')
              .map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockAccounts
              .filter(acc => acc.accountType === 'savings')
              .map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockAccounts
              .filter(acc => acc.accountType === 'investment')
              .map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounts;
