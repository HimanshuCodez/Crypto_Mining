import React from 'react';

const PaymentApprovalsPage = ({ pendingPayments, fetchPendingPayments, handleApprovePayment, handleRejectPayment }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Payment Approvals</h2>
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">Pending: {pendingPayments.length}</span>
          <button onClick={fetchPendingPayments} className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-green-500/20">Refresh Payments</button>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-900/70 sticky top-0">
                <tr>
                  {["User", "Amount", "Screenshot", "Date", "Status", "Actions"].map(h => <th key={h} className="px-6 py-4 text-left text-gray-400 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {pendingPayments.map((payment) => (
                  <tr key={payment._id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{payment.userId ? payment.userId.name : 'N/A'}</td>
                    <td className="px-6 py-4 text-green-400 font-bold">${payment.amount}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {payment.screenshotUrl ? <a href={`http://localhost:4000${payment.screenshotUrl}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">View Screenshot</a> : 'No Screenshot'}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${payment.status === "pending" ? "bg-yellow-900 text-yellow-300" : "bg-cyan-900 text-cyan-300"}`}>{payment.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleApprovePayment(payment._id)} className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium transition-colors">Approve</button>
                        <button onClick={() => handleRejectPayment(payment._id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition-colors">Reject</button>
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

export default PaymentApprovalsPage;
