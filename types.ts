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
  officeOrderNumber: string;
}

export enum LogAction {
  CREATE_TRANSACTION = 'CREATE_TRANSACTION',
}

export interface Log {
    id: string;
    timestamp: string; // ISO string
    action: LogAction;
    details: string;
}