import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  colorClass: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, icon, colorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105">
      <div className={`rounded-full p-3 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
          {amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};
