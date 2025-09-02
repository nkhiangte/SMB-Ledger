export enum TransactionType {
  INCOME = 'INCOME',
  EXPENDITURE = 'EXPENDITURE',
}

export enum BudgetHead {
  ZINNA = 'Zinna',
  STATIONERY = 'Stationery',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  budgetHead: BudgetHead;
  date: string; // Stored as YYYY-MM-DD
  officeOrderNumber?: string;
}