import React from 'react';

const IncomeIncrementPage = ({ users, handleIncrementIncome }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Income Increment</h2>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-900/70 sticky top-0">
                <tr>
                  {["User", "Income Wallet", "Actions"].map(h => <th key={h} className="px-6 py-4 text-left text-gray-400 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{user.name || 'missing'}</p>
                        <p className="text-gray-400 text-sm">{user.email || 'missing'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-400 font-bold">
                      ${user.incomeWallet !== undefined ? user.incomeWallet.toFixed(2) : 'missing'}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleIncrementIncome(user._id)} className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium transition-colors">Increment by 4.80%</button>
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

export default IncomeIncrementPage;
