import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const WithdrawHistory = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get('/withdrawals');
      // Filter for completed and rejected withdrawals
      const history = response.data.filter(w => w.status === 'completed' || w.status === 'rejected');
      setWithdrawals(history);
    } catch (error) {
      toast.error('Failed to fetch withdrawal history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  if (loading) {
    return <div>Loading withdrawal history...</div>;
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Withdrawal History</h2>
        <button onClick={fetchWithdrawals} className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-green-500/20">Refresh</button>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-900/70 sticky top-0">
                <tr>
                  {["User", "Amount", "Wallet Address", "Status", "Date"].map(h => <th key={h} className="px-6 py-4 text-left text-gray-400 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{withdrawal.userId.name}</td>
                    <td className="px-6 py-4 text-green-400 font-bold">${withdrawal.amount} USDT</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 font-mono text-sm">{withdrawal.walletAddress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${withdrawal.status === "completed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>{withdrawal.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default WithdrawHistory;