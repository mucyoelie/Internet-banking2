import React, { useState } from 'react';
//import { Plus, Calculator, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Plus, Calculator, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart } from '@/components/charts/LineChart';
import { mockLoans } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils/formatters';

const Loans: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [loanAmount, setLoanAmount] = useState('25000');
  const [loanTerm, setLoanTerm] = useState('36');
  const [interestRate, setInterestRate] = useState('8.5');
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanTerm);
    
    if (rate === 0) return principal / months;
    
    const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * parseInt(loanTerm);
  const totalInterest = totalPayment - parseFloat(loanAmount);

  const loanTypes = [
    { value: 'personal', label: 'Personal Loan', rate: '8.5%', maxAmount: 50000 },
    { value: 'home', label: 'Home Loan', rate: '5.25%', maxAmount: 500000 },
    { value: 'auto', label: 'Auto Loan', rate: '6.5%', maxAmount: 80000 },
    { value: 'education', label: 'Education Loan', rate: '4.5%', maxAmount: 100000 },
    { value: 'business', label: 'Business Loan', rate: '9.5%', maxAmount: 250000 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-700">Approved</Badge>;
      case 'paid':
        return <Badge className="bg-slate-100 text-slate-700">Paid Off</Badge>;
      case 'defaulted':
        return <Badge className="bg-red-100 text-red-700">Defaulted</Badge>;
      default:
        return null;
    }
  };

  // Generate amortization data
  const generateAmortizationData = () => {
    const data = [];
    let balance = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanTerm);
    
    for (let i = 0; i <= Math.min(months, 12); i++) {
      data.push({
        month: `Month ${i}`,
        balance: Math.max(0, balance),
        principal: parseFloat(loanAmount) - balance,
      });
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
    }
    return data;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Loans</h1>
          <p className="text-slate-500">Manage your loans and apply for new ones.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowCalculator(true)}>
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
            onClick={() => setShowApplyDialog(true)}
          >
            <Plus className="h-4 w-4" />
            Apply for Loan
          </Button>
        </div>
      </div>

      {/* Active Loans Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Total Loan Balance</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(mockLoans.reduce((sum, loan) => sum + loan.remainingAmount, 0))}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Monthly Payments</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(mockLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0))}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg shadow-slate-200/50">
          <CardContent className="p-5">
            <p className="text-sm text-slate-500">Active Loans</p>
            <p className="text-2xl font-bold text-slate-900">{mockLoans.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* My Loans */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">My Loans</h2>
        <div className="grid gap-6">
          {mockLoans.map((loan) => (
            <Card key={loan.id} className="border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  {/* Loan Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)} Loan
                        </h3>
                        <p className="text-sm text-slate-500">Applied on {formatDate(loan.appliedDate)}</p>
                      </div>
                      {getStatusBadge(loan.status)}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-slate-500">Original Amount</p>
                        <p className="font-medium">{formatCurrency(loan.amount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Remaining</p>
                        <p className="font-medium">{formatCurrency(loan.remainingAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Interest Rate</p>
                        <p className="font-medium text-emerald-600">{loan.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Term</p>
                        <p className="font-medium">{loan.term} months</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Repayment Progress</span>
                        <span className="font-medium">
                          {Math.round(((loan.amount - loan.remainingAmount) / loan.amount) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={((loan.amount - loan.remainingAmount) / loan.amount) * 100}
                        className="mt-2 h-2"
                      />
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="flex flex-col gap-4 lg:w-64">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Monthly Payment</p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatCurrency(loan.monthlyPayment)}
                      </p>
                    </div>
                    {loan.nextPaymentDate && (
                      <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-sm text-blue-600">Next Payment Due</p>
                        <p className="font-medium text-blue-900">
                          {formatDate(loan.nextPaymentDate)}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Loan Calculator Dialog */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Loan Calculator</DialogTitle>
            <DialogDescription>Calculate your monthly payments and total interest</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label} ({type.rate})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Loan Amount</Label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Term (months)</Label>
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
                <p className="text-sm opacity-80">Estimated Monthly Payment</p>
                <p className="text-3xl font-bold">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Payment</span>
                  <span className="font-medium">{formatCurrency(totalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Interest</span>
                  <span className="font-medium text-red-600">{formatCurrency(totalInterest)}</span>
                </div>
              </div>
              <LineChart
                data={generateAmortizationData()}
                lines={[{ key: 'balance', color: '#3b82f6', name: 'Balance' }]}
                xAxisKey="month"
                className="h-48"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply for Loan Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for a Loan</DialogTitle>
            <DialogDescription>Fill in the details to apply for a new loan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Loan Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  {loanTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Loan Amount</Label>
              <Input type="number" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label>Term (months)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="48">48 months</SelectItem>
                  <SelectItem value="60">60 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Purpose</Label>
              <Input placeholder="Briefly describe the purpose" />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your application will be reviewed within 2-3 business days.
              </AlertDescription>
            </Alert>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
              Submit Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Loans;
