import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const PendingApproval = () => {
  const [pendingInvestments, setPendingInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvestments = async () => {
    try {
      const response = await axios.get('/admin/mining-investments');
      setPendingInvestments(response.data.filter(inv => inv.status === 'pending'));
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

  if (loading) {
    return <div>Loading pending investments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
    </div>
  );
};

export default PendingApproval;