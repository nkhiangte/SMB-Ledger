import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType } from './types';
import { APP_TITLE, LOCAL_STORAGE_KEY } from './constants';
import { SummaryCard } from './components/SummaryCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const storedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTransactions ? JSON.parse(storedTransactions) : [];
    } catch (error) {
      console.error("Error parsing transactions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions to localStorage", error);
    }
  }, [transactions]);

  const handleAddTransaction = (newTransactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...newTransactionData,
      id: new Date().getTime().toString(),
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  const { totalIncome, totalExpenditure, balance } = useMemo(() => {
    let income = 0;
    let expenditure = 0;
    transactions.forEach(tx => {
      if (tx.type === TransactionType.INCOME) {
        income += tx.amount;
      } else {
        expenditure += tx.amount;
      }
    });
    return {
      totalIncome: income,
      totalExpenditure: expenditure,
      balance: income - expenditure
    };
  }, [transactions]);
  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => b.date.localeCompare(a.date) || parseInt(b.id) - parseInt(a.id));
  }, [transactions]);

  const IncomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );

  const ExpenditureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );

  const BalanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );

  return (
    <div className="min-h-screen text-gray-800">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">{APP_TITLE}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SummaryCard title="Total Income" amount={totalIncome} icon={<IncomeIcon />} colorClass="bg-green-100" />
              <SummaryCard title="Total Expenditure" amount={totalExpenditure} icon={<ExpenditureIcon />} colorClass="bg-red-100" />
              <SummaryCard title="Current Balance" amount={balance} icon={<BalanceIcon />} colorClass="bg-indigo-100" />
            </div>
          </section>

          {/* Transaction Form Section */}
          <section>
            <TransactionForm addTransaction={handleAddTransaction} />
          </section>

          {/* Transaction List Section */}
          <section>
            <TransactionList transactions={sortedTransactions} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
