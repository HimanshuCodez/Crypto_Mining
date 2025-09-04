import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const MinningInvestmentApproval = () => {
  const [allInvestments, setAllInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvestments = async () => {
    try {
      const response = await axios.get('/admin/mining-investments');
      setAllInvestments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      await axios.post(`/admin/mining-investments/approve/${transactionId}`);
      alert('Investment approved successfully!');
      fetchInvestments(); // Refresh the list
    } catch (err) {
      alert(`Error approving investment: ${err.response?.data?.message || err.message}`);
    }
  };

  const handlePayAll = async () => {
    try {
      await axios.post('/admin/mining-investments/pay-all');
      alert('Daily profit paid for all eligible investments!');
      fetchInvestments(); // Refresh the list
    } catch (err) {
      alert(`Error paying all daily profits: ${err.response?.data?.message || err.message}`);
    }
  };

  const pendingInvestments = allInvestments.filter(inv => inv.status === 'pending');
  const approvedInvestments = allInvestments.filter(inv => inv.status === 'completed');

  const calculateDaysActive = (startDate) => {
    if (!startDate) return 'N/A';
    const start = new Date(startDate);
    const now = new Date();
    
    // Set both dates to the start of their respective days to avoid time component issues
    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const elapsedMilliseconds = now.getTime() - start.getTime();
    const daysActive = elapsedMilliseconds / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.floor(daysActive)); // Ensure it's not negative
  };

  if (loading) {
    return <div>Loading investments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mining Investment Approvals</h1>

      <button
        onClick={handlePayAll}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Pay All Users Daily Profit
      </button>

      <h2 className="text-xl font-semibold mb-3">Pending Investments</h2>
      {pendingInvestments.length === 0 ? (
        <p>No pending mining investments.</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-gray-800 border ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvestments.map((investment) => (
                <tr key={investment._id} className="">
                  <td className="py-2 px-4 border-b">{investment.userId?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{investment.userId?.email || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{investment.amount}</td>
                  <td className="py-2 px-4 border-b">{new Date(investment.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleApprove(investment._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-3">Approved Investments</h2>
      {approvedInvestments.length === 0 ? (
        <p>No approved mining investments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">Daily Profit Rate</th>
                <th className="py-2 px-4 border-b">Investment Duration (Days)</th>
                <th className="py-2 px-4 border-b">Days Active</th>
              </tr>
            </thead>
            <tbody>
              {approvedInvestments.map((investment) => (
                <tr key={investment._id} className="">
                  <td className="py-2 px-4 border-b">{investment.userId?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{investment.userId?.email || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{investment.amount}</td>
                  <td className="py-2 px-4 border-b">{new Date(investment.startDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{investment.dailyProfitRate}</td>
                  <td className="py-2 px-4 border-b">{investment.investmentDuration}</td>
                  <td className="py-2 px-4 border-b">
                    {calculateDaysActive(investment.lastProfitDistributionDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MinningInvestmentApproval;