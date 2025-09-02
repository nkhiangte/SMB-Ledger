import React from 'react';
import { Log } from '../types';

interface LogListProps {
  logs: Log[];
}

const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
};

export const LogList: React.FC<LogListProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
         <h3 className="text-2xl font-bold text-gray-800">Activity Log</h3>
      </div>
       {logs.length === 0 ? (
        <div className="p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800">No Activity Yet</h3>
          <p className="text-gray-500 mt-2">Actions you take in the app will be logged here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
                <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{formatTimestamp(log.timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.details}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      )}
    </div>
  );
};