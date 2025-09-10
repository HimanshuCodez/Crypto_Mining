import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';

const DepositUsdt = () => {
  const { user } = useAuthStore();
  const [usdtAddress, setUsdtAddress] = useState("");
  const [sendingAddress, setSendingAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [barcodes, setBarcodes] = useState({ deposit: '', tre20: '' });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'pending', 'approved', 'rejected'

  useEffect(() => {
    const fetchBarcode = async () => {
      try {
        const response = await api.get('/admin/barcode');
        setBarcodes({
          deposit: response.data.depositBarcodeUrl,
          tre20: response.data.tre20BarcodeUrl
        });
      } catch (error) {
        console.error('Failed to fetch barcode', error);
      }
    };

    const fetchPaymentStatus = async () => {
        if (user?._id) {
            try {
                const response = await api.get(`/admin/payments/status/${user._id}`);
                setSubmissionStatus(response.data.status);
            } catch (error) {
                console.error('Failed to fetch payment status', error);
            }
        }
    };

    fetchBarcode();
    fetchPaymentStatus();
  }, [user]);

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verify) {
      toast.error('Please verify the transaction.');
      return;
    }

    if (!paymentScreenshot || !paymentAmount) {
      toast.error('Please enter amount and upload screenshot.');
      return;
    }

    if (!password) {
        toast.error('Please enter your transaction password.');
        return;
    }

    if (!user || !user._id) {
      toast.error('User not logged in or user ID not available.');
      return;
    }

    setSubmissionStatus('submitting');
    const formData = new FormData();
    formData.append('screenshot', paymentScreenshot);
    formData.append('amount', paymentAmount);
    formData.append('userId', user._id);
    formData.append('password', password);

    try {
      const response = await api.post('/admin/payments/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSubmissionStatus('pending');
        toast.success('Payment submitted successfully! Waiting for admin approval.');
      } else {
        setSubmissionStatus('idle');
        toast.error('Failed to submit payment.');
      }
      
    } catch (error) {
      console.error('Error submitting payment:', error);
      setSubmissionStatus('idle');
      toast.error(error.response?.data?.message || 'An error occurred while submitting payment.');
    }
  };

  return (
    <div className="min-h-screen w-[78vw] flex flex-col gap-6 md:p-10  bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-1">Deposite Usdt</h1>
      <p className="text-sm text-gray-500 mb-2">
        Deposite / <span className="text-cyan-600">Deposite Usdt</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full bg-white p-8 shadow rounded"
      >
        <h2 className=" font-semibold text-2xl text-gray-800">Fill Details</h2>

        {/* USDT Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Address
          </label>
          <input
            type="text"
            placeholder="USDT ADDRESS"
            value={usdtAddress}
            onChange={(e) => setUsdtAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
        {/* Barcodes */}
        <div className="flex gap-4">
            {barcodes.deposit && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        BEP20 Barcode
                    </label>
                    <img src={barcodes.deposit} alt="USDT Deposit Barcode" className="w-48 h-48" />
                </div>
            )}
            {barcodes.tre20 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        TRE20 Barcode
                    </label>
                    <img src={barcodes.tre20} alt="TRE20 Deposit Barcode" className="w-48 h-48" />
                </div>
            )}
        </div>

        {/* Upload Payment Proof */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Upload Payment Proof</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Paid (USDT)
            </label>
            <input
              type="number"
              placeholder="Enter amount paid"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          {submissionStatus === 'pending' && (
            <p className="text-yellow-600 font-medium mt-2">Waiting for admin approval...</p>
          )}
        </div>


        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Id Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Verify */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="verify"
            checked={verify}
            onChange={(e) => setVerify(e.target.checked)}
            className="h-4 w-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
          />
          <label htmlFor="verify" className="ml-2 text-sm text-gray-700">
            Verify
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submissionStatus === 'submitting' || submissionStatus === 'pending'}
          className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default DepositUsdt;