import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';

const DepositUsdt = () => {
  const { user } = useAuthStore();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [sendingAddress, setSendingAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [barcodes, setBarcodes] = useState({ deposit: '', tre20: '' });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'submitting', 'pending', 'approved', 'rejected'

  const addressLabels = {
    deposit: 'BEP20',
    tre20: 'TRE20'
  };

  useEffect(() => {
    const fetchBarcode = async () => {
      try {
        const response = await api.get('/admin/barcode');
        const fetchedBarcodes = {
          deposit: response.data.depositBarcodeUrl,
          tre20: response.data.tre20BarcodeUrl
        };
        setBarcodes(fetchedBarcodes);
        // Set a default selection if available
        const firstAvailable = Object.keys(fetchedBarcodes).find(key => fetchedBarcodes[key]);
        if (firstAvailable) {
          setSelectedAddress(firstAvailable);
        }
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
    <div className="min-h-screen w-full md:w-[78vw] flex flex-col gap-6 p-4 md:p-10 bg-gray-50">
      <div className="flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl md:text-4xl font-medium capitalize font-[Inter]">Deposit USDT</h1>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
          <a href="/deposit">Deposit</a><span>/</span><a href="/deposit-usdt" className='text-[#02AC8F] truncate'>Deposit USDT</a>
        </nav>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full bg-white p-6 md:p-8 shadow rounded-lg"
      >
        <h2 className="font-semibold text-2xl text-gray-800">Fill Details</h2>

        {/* Address Dropdown */}
        <div>
          <label htmlFor="address-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Address
          </label>
          <select
            id="address-select"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="" disabled>Select an address type</option>
            {Object.keys(barcodes).map(key => (
              barcodes[key] && <option key={key} value={key}>{addressLabels[key] || key.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Barcode Display */}
        <div className="flex justify-center py-4">
          {selectedAddress && barcodes[selectedAddress] && (
              <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      {addressLabels[selectedAddress]} Barcode
                  </label>
                  <img src={barcodes[selectedAddress]} alt={`${addressLabels[selectedAddress]} Deposit Barcode`} className="w-48 h-48 mx-auto" />
              </div>
          )}
        </div>

        {/* Upload Payment Proof */}
        <div className="space-y-4 pt-4 border-t">
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
            Transaction Password
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
