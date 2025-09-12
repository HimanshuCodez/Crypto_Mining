import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const DepositHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get('/admin/payments/history');
      setPayments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  if (loading) {
    return <div>Loading payment history...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deposit History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="">
                <td className="py-2 px-4 border-b">{payment.userId?.name || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{payment.userId?.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepositHistory;
