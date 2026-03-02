// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  isVerified: boolean;
}

// Account Types
export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'investment' | 'loan';
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen' | 'closed';
  openedDate: string;
  interestRate?: number;
}

// Transaction Types
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  recipientName?: string;
  recipientAccount?: string;
  status: TransactionStatus;
  category: string;
  date: string;
  reference: string;
}

// Card Types
export type CardType = 'debit' | 'credit' | 'virtual';
export type CardStatus = 'active' | 'inactive' | 'blocked' | 'expired';

export interface Card {
  id: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardHolderName: string;
  cardType: CardType;
  expiryDate: string;
  cvv: string;
  status: CardStatus;
  dailyLimit: number;
  currentMonthSpending: number;
  lastFourDigits: string;
}

// Loan Types
export type LoanType = 'personal' | 'home' | 'auto' | 'education' | 'business';
export type LoanStatus = 'pending' | 'approved' | 'active' | 'paid' | 'defaulted';

export interface Loan {
  id: string;
  userId: string;
  loanType: LoanType;
  amount: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  totalPayable: number;
  remainingAmount: number;
  status: LoanStatus;
  appliedDate: string;
  approvedDate?: string;
  nextPaymentDate?: string;
}

// Investment Types
export type InvestmentType = 'stocks' | 'bonds' | 'mutual_funds' | 'crypto' | 'fixed_deposit';

export interface Investment {
  id: string;
  userId: string;
  type: InvestmentType;
  name: string;
  symbol?: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  totalValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

// Transfer Request
export interface TransferRequest {
  fromAccountId: string;
  toAccountNumber: string;
  recipientName: string;
  amount: number;
  description: string;
  saveAsBeneficiary?: boolean;
}

// Beneficiary
export interface Beneficiary {
  id: string;
  userId: string;
  name: string;
  accountNumber: string;
  bankName: string;
  nickname?: string;
  addedDate: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoal: number;
  savingsProgress: number;
}

// Chart Data
export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalAccounts: number;
  totalTransactions: number;
  totalDeposits: number;
  pendingLoans: number;
  activeUsers: number;
}

export interface SystemActivity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}
