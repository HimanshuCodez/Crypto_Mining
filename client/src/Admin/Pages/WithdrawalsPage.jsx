import React from 'react';
import {
  Copy,
  ExternalLink,
} from 'lucide-react';

const WithdrawalsPage = ({ usdtWithdrawals }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">USDT Withdrawals</h2>
        <div className="flex items-center space-x-3">
          <div className="text-gray-400">Pending: {usdtWithdrawals.filter((w) => w.status === "pending").length}</div>
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
                {usdtWithdrawals.map((withdrawal, index) => (
                  <tr key={withdrawal.id || index} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{withdrawal.username}</td>
                    <td className="px-6 py-4 text-green-400 font-bold">${withdrawal.amount} USDT</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 font-mono text-sm">{withdrawal.wallet}</span>
                        <button className="p-1 hover:bg-gray-600 rounded transition-colors"><Copy size={14} className="text-gray-400" /></button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${withdrawal.status === "pending" ? "bg-yellow-900 text-yellow-300" : withdrawal.status === "processing" ? "bg-cyan-900 text-cyan-300" : "bg-green-900 text-green-300"}`}>{withdrawal.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{withdrawal.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {withdrawal.status === "pending" && <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium transition-colors">Process</button>}
                        {withdrawal.status === "completed" && withdrawal.txHash && <button className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white text-sm font-medium transition-colors flex items-center space-x-1"><ExternalLink size={14} /><span>View TX</span></button>}
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition-colors">Cancel</button>
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
