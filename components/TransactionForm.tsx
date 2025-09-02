import React, { useState } from 'react';
import { Transaction, TransactionType, BudgetHead } from '../types';
import { BUDGET_HEADS } from '../constants';

interface TransactionFormProps {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const today = new Date().toISOString().split('T')[0];

export const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENDITURE);
  const [date, setDate] = useState<string>(today);
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [budgetHead, setBudgetHead] = useState<BudgetHead>(BUDGET_HEADS[0]);
  const [officeOrderNumber, setOfficeOrderNumber] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount || !description) {
      setError('Date, Amount, and Description are required.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid, positive amount.');
      return;
    }
    if (type === TransactionType.EXPENDITURE && !officeOrderNumber) {
        setError('Office Order Number is required for expenditure.');
        return;
    }

    const newTransaction: Omit<Transaction, 'id'> = {
      type,
      date,
      amount: parsedAmount,
      description,
      budgetHead,
      officeOrderNumber: type === TransactionType.EXPENDITURE ? officeOrderNumber : undefined,
    };

    addTransaction(newTransaction);

    // Reset form
    setType(TransactionType.EXPENDITURE);
    setDate(today);
    setAmount('');
    setDescription('');
    setBudgetHead(BUDGET_HEADS[0]);
    setOfficeOrderNumber('');
    setError('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
        
        {/* Transaction Type */}
        <fieldset className="flex items-center gap-6">
          <legend className="text-base font-medium text-gray-900">Type</legend>
          <div className="flex items-center gap-4">
              <div className="flex items-center">
                  <input id="income" name="transaction-type" type="radio" value={TransactionType.INCOME} checked={type === TransactionType.INCOME} onChange={() => setType(TransactionType.INCOME)} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label htmlFor="income" className="ml-2 block text-sm font-medium text-gray-700">Income</label>
              </div>
              <div className="flex items-center">
                  <input id="expenditure" name="transaction-type" type="radio" value={TransactionType.EXPENDITURE} checked={type === TransactionType.EXPENDITURE} onChange={() => setType(TransactionType.EXPENDITURE)} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label htmlFor="expenditure" className="ml-2 block text-sm font-medium text-gray-700">Expenditure</label>
              </div>
          </div>
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (INR)</label>
            <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" min="0.01" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
          </div>
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Office supplies" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Head */}
          <div>
            <label htmlFor="budgetHead" className="block text-sm font-medium text-gray-700">Budget Head</label>
            <select id="budgetHead" value={budgetHead} onChange={e => setBudgetHead(e.target.value as BudgetHead)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2">
              {BUDGET_HEADS.map(head => <option key={head} value={head}>{head}</option>)}
            </select>
          </div>

          {/* Office Order Number (Conditional) */}
          {type === TransactionType.EXPENDITURE && (
            <div>
              <label htmlFor="officeOrderNumber" className="block text-sm font-medium text-gray-700">Office Order Number</label>
              <input type="text" id="officeOrderNumber" value={officeOrderNumber} onChange={e => setOfficeOrderNumber(e.target.value)} placeholder="e.g., OON-2024-001" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};
