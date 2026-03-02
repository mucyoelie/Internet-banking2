import React from 'react';
import { Users, Wallet, ArrowLeftRight, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Progress component available for future use
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { mockAdminStats, mockSystemActivities } from '@/data/mockData';
import { formatCurrency, formatNumber, formatRelativeTime } from '@/utils/formatters';
import { cn } from '@/lib/utils';

const AdminDashboard: React.FC = () => {
  // Mock data for charts
  const userGrowthData = [
    { label: 'Jan', users: 12000 },
    { label: 'Feb', users: 13200 },
    { label: 'Mar', users: 14100 },
    { label: 'Apr', users: 14800 },
    { label: 'May', users: 15200 },
    { label: 'Jun', users: 15420 },
  ];

  const transactionVolumeData = [
    { label: 'Mon', value: 45000 },
    { label: 'Tue', value: 52000 },
    { label: 'Wed', value: 48000 },
    { label: 'Thu', value: 61000 },
    { label: 'Fri', value: 72000 },
    { label: 'Sat', value: 35000 },
    { label: 'Sun', value: 28000 },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Loan Application', user: 'john.smith@email.com', amount: 25000, date: '2024-03-02T10:30:00Z' },
    { id: 2, type: 'Account Verification', user: 'jane.doe@email.com', amount: null, date: '2024-03-02T09:15:00Z' },
    { id: 3, type: 'Large Transaction', user: 'mike.jones@email.com', amount: 50000, date: '2024-03-02T08:45:00Z' },
    { id: 4, type: 'New Account', user: 'sarah.wilson@email.com', amount: null, date: '2024-03-01T16:20:00Z' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Monitor and manage the banking system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(mockAdminStats.totalUsers)}</p>
                <p className="text-xs text-emerald-600">+5.2% this month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Accounts</p>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(mockAdminStats.totalAccounts)}</p>
                <p className="text-xs text-emerald-600">+3.8% this month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Transactions</p>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(mockAdminStats.totalTransactions)}</p>
                <p className="text-xs text-emerald-600">+12.5% this month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <ArrowLeftRight className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Deposits</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(mockAdminStats.totalDeposits)}</p>
                <p className="text-xs text-emerald-600">+8.3% this month</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="text-lg">User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={userGrowthData}
              lines={[{ key: 'users', color: '#3b82f6', name: 'Users' }]}
              xAxisKey="label"
            />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="text-lg">Transaction Volume</CardTitle>
            <CardDescription>Daily transaction volume</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={transactionVolumeData} />
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals & System Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Pending Approvals</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                {pendingApprovals.length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:border-blue-300 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.type}</p>
                      <p className="text-sm text-slate-500">{item.user}</p>
                      <p className="text-xs text-slate-400">{formatRelativeTime(item.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.amount && (
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    )}
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">System Activity</CardTitle>
                <CardDescription>Recent system events</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSystemActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 p-3"
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0',
                      activity.action.includes('Approved') && 'bg-emerald-100',
                      activity.action.includes('Registration') && 'bg-blue-100',
                      activity.action.includes('Alert') && 'bg-yellow-100',
                      activity.action.includes('Frozen') && 'bg-red-100',
                      activity.action.includes('Reset') && 'bg-purple-100'
                    )}
                  >
                    {activity.action.includes('Approved') && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    {activity.action.includes('Registration') && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.action.includes('Alert') && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                    {activity.action.includes('Frozen') && <AlertCircle className="h-4 w-4 text-red-600" />}
                    {activity.action.includes('Reset') && <Clock className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.user}</p>
                    <p className="text-xs text-slate-400">{activity.details}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto py-4 justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Manage Users</p>
                <p className="text-xs text-slate-500">View and edit user accounts</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Manage Accounts</p>
                <p className="text-xs text-slate-500">View all bank accounts</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <ArrowLeftRight className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Transactions</p>
                <p className="text-xs text-slate-500">Monitor all transactions</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Reports</p>
                <p className="text-xs text-slate-500">Generate system reports</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
