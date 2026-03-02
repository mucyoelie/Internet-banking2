import React, { useState } from 'react';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockAccounts, mockBeneficiaries } from '@/data/mockData';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/lib/utils';

const Transfer: React.FC = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false);

  const selectedAccount = mockAccounts.find((acc) => acc.id === fromAccount);
  const availableBalance = selectedAccount?.balance || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFromAccount('');
      setToAccount('');
      setRecipientName('');
      setAmount('');
      setDescription('');
    }, 3000);
  };

  const quickAmounts = [50, 100, 250, 500, 1000];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transfer Money</h1>
        <p className="text-slate-500">Send money to accounts, beneficiaries, or external banks.</p>
      </div>

      {showSuccess ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">Transfer Successful!</h2>
            <p className="mt-2 text-slate-500">
              {formatCurrency(parseFloat(amount))} has been sent to {recipientName}
            </p>
            <p className="text-sm text-slate-400">Reference: TRX{Date.now()}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Transfer Form */}
          <Card className="border-0 shadow-lg shadow-slate-200/50 lg:col-span-2">
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
              <CardDescription>Enter the transfer information below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="internal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="internal">Own Accounts</TabsTrigger>
                    <TabsTrigger value="beneficiary">Beneficiaries</TabsTrigger>
                    <TabsTrigger value="external">External Bank</TabsTrigger>
                  </TabsList>

                  <TabsContent value="internal" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>From Account</Label>
                        <Select value={fromAccount} onValueChange={setFromAccount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.accountNumber} - {formatCurrency(account.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>To Account</Label>
                        <Select value={toAccount} onValueChange={setToAccount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockAccounts
                              .filter((acc) => acc.id !== fromAccount)
                              .map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  {account.accountNumber} - {formatCurrency(account.balance)}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="beneficiary" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>From Account</Label>
                        <Select value={fromAccount} onValueChange={setFromAccount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.accountNumber} - {formatCurrency(account.balance)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Select Beneficiary</Label>
                        <Select
                          value={toAccount}
                          onValueChange={(value) => {
                            const beneficiary = mockBeneficiaries.find((b) => b.id === value);
                            setToAccount(value);
                            setRecipientName(beneficiary?.name || '');
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select beneficiary" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockBeneficiaries.map((beneficiary) => (
                              <SelectItem key={beneficiary.id} value={beneficiary.id}>
                                {beneficiary.name} - {beneficiary.accountNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="external" className="space-y-4">
                    <div className="space-y-2">
                      <Label>From Account</Label>
                      <Select value={fromAccount} onValueChange={setFromAccount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockAccounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                              {account.accountNumber} - {formatCurrency(account.balance)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Recipient Name</Label>
                        <Input
                          placeholder="Enter recipient name"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          placeholder="Enter account number"
                          value={toAccount}
                          onChange={(e) => setToAccount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input placeholder="Enter bank name" />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Amount Section */}
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg"
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((amt) => (
                      <Button
                        key={amt}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAmount(amt.toString())}
                      >
                        ${amt}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input
                    placeholder="What's this transfer for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Save as Beneficiary Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="saveBeneficiary"
                    checked={saveAsBeneficiary}
                    onChange={(e) => setSaveAsBeneficiary(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <Label htmlFor="saveBeneficiary" className="text-sm font-normal">
                    Save as beneficiary for future transfers
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                  disabled={
                    isSubmitting ||
                    !fromAccount ||
                    !toAccount ||
                    !amount ||
                    parseFloat(amount) > availableBalance
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Transfer {amount && formatCurrency(parseFloat(amount))}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {parseFloat(amount) > availableBalance && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Insufficient funds. Available balance: {formatCurrency(availableBalance)}
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="text-lg">Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAccount ? (
                  <>
                    <div>
                      <p className="text-sm text-slate-500">Selected Account</p>
                      <p className="font-medium">{selectedAccount.accountNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Available Balance</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatCurrency(availableBalance)}
                      </p>
                    </div>
                    {amount && (
                      <>
                        <div className="border-t border-slate-100 pt-4">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Transfer Amount</span>
                            <span className="font-medium text-red-600">
                              -{formatCurrency(parseFloat(amount))}
                            </span>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <span className="text-slate-500">Remaining Balance</span>
                            <span className="font-bold">
                              {formatCurrency(availableBalance - parseFloat(amount))}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-slate-500">Select an account to see details</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Transfer - Saved Beneficiaries */}
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Transfer</CardTitle>
                <CardDescription>Send to saved beneficiaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBeneficiaries.map((beneficiary) => (
                    <button
                      key={beneficiary.id}
                      onClick={() => {
                        setToAccount(beneficiary.id);
                        setRecipientName(beneficiary.name);
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg border p-3 transition-all',
                        toAccount === beneficiary.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      )}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                          {beneficiary.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{beneficiary.name}</p>
                        <p className="text-sm text-slate-500">{beneficiary.accountNumber}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
