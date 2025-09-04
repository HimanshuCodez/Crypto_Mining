import React, { useState, useEffect } from 'react';
import {
  Copy,
  ExternalLink,
} from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-toastify';

const WithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get('/withdrawals');
      setWithdrawals(response.data);
    } catch (error) {
      toast.error('Failed to fetch withdrawals');
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleProcess = async (id) => {
    try {
      await api.put(`/withdrawals/${id}/status`, { status: 'completed' });
      toast.success('Withdrawal processed successfully');
      fetchWithdrawals();
    } catch (error) {
      toast.error('Failed to process withdrawal');
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.put(`/withdrawals/${id}/status`, { status: 'rejected' });
      toast.success('Withdrawal cancelled successfully');
      fetchWithdrawals();
    } catch (error) {
      toast.error('Failed to cancel withdrawal');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/withdrawals/${id}`);
      toast.success('Withdrawal deleted successfully');
      fetchWithdrawals();
    } catch (error) {
      toast.error('Failed to delete withdrawal');
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">USDT Withdrawals</h2>
        <div className="flex items-center space-x-3">
          <div className="text-gray-400">Pending: {withdrawals.filter((w) => w.status === "pending").length}</div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-cyan-500/20">Process All</button>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-900/70 sticky top-0">
                <tr>
                  {["User", "Amount", "Wallet Address", "Status", "Date", "Actions"].map(h => <th key={h} className="px-6 py-4 text-left text-gray-400 font-semibold">{h}</th>)}
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
                        <button className="p-1 hover:bg-gray-600 rounded transition-colors"><Copy size={14} className="text-gray-400" /></button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${withdrawal.status === "pending" ? "bg-yellow-900 text-yellow-300" : withdrawal.status === "processing" ? "bg-cyan-900 text-cyan-300" :  withdrawal.status === "completed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>{withdrawal.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {withdrawal.status === "pending" && <button onClick={() => handleProcess(withdrawal._id)} className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium transition-colors">Process</button>}
                        {withdrawal.status === "pending" && <button onClick={() => handleCancel(withdrawal._id)} className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-white text-sm font-medium transition-colors">Reject</button>}
                        {withdrawal.status === "completed" && withdrawal.txHash && <button className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white text-sm font-medium transition-colors flex items-center space-x-1"><ExternalLink size={14} /><span>View TX</span></button>}
                        <button onClick={() => handleDelete(withdrawal._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalsPage;
