import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../store/authStore';
import api from '../../../api/axios';
import { toast } from 'react-toastify';

const WithdrawIncomeWallet = () => {
  const { user } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const fetchWallets = async () => {
    try {
      const response = await api.get('/user/wallets');
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWallets();
    }
  }, [user]);

  const handleSendOtp = async () => {
    if (!password) {
      toast.error("Please enter your transaction password");
      return;
    }
    setIsSendingOtp(true);
    try {
      await api.post('/otp/send-income-withdrawal-otp', { password });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > user.incomeWallet) {
      toast.error("Amount exceeds income wallet balance");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/withdrawals', {
        amount,
        walletAddress,
        otp,
      });
      toast.success(response.data.message);
      setAmount('');
      setWalletAddress('');
      setPassword('');
      setOtp('');
      setOtpSent(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-10 font-['Inter']">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-3xl font-medium capitalize">
          Withdraw Income Wallet
        </h2>
        <nav className="flex items-center gap-1 text-sm md:text-base font-light">
          <a href="/Transfer">Financial</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F] truncate">
            Withdraw Income Wallet
          </a>
        </nav>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-3xl px-4 md:px-6 py-6 md:py-10 flex flex-col gap-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="font-medium text-xl md:text-2xl border rounded-lg p-3 flex flex-col gap-2">
            <h2>Income Wallet Balance</h2>
            <span className="text-[#2EB9A2] text-lg md:text-2xl">
              ${user?.incomeWallet?.toFixed(2) ?? '0.00'}
            </span>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-lg md:text-xl px-3 py-2 rounded-lg font-medium bg-[#2EB9A2] text-white">
          Add New USDT.BEP20 Address
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Wallet + Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-1">
              <span className="text-base md:text-lg font-light">Select Wallet Address</span>
              <select
                className="outline-none w-full border border-gray-400 rounded-lg p-2"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              >
                <option value="">Select a wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet._id} value={wallet.address}>
                    {wallet.walletType} - {wallet.address}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-base md:text-lg font-light">Enter Amount</span>
              <input
                type="text"
                className="outline-none w-full border border-gray-400 rounded-lg p-2"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>

          {/* Password */}
          <label className="flex flex-col gap-1">
            <span className="text-base md:text-lg font-light">Transaction Password</span>
            <input
              type="password"
              className="outline-none w-full border border-gray-400 rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={otpSent}
            />
          </label>

          {/* OTP */}
          <label className="flex flex-col gap-1">
            <span className="text-base md:text-lg font-light">One Time Password</span>
            <div className="flex w-full">
              <input
                type="password"
                className="flex-1 border border-gray-400 rounded-l-lg p-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!otpSent}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || otpSent}
                className="px-4 border border-gray-400 rounded-r-lg bg-gray-50 hover:bg-gray-100"
              >
                {isSendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-auto border border-[#31B8A1] rounded-lg text-[#31B8A1] font-semibold text-lg px-6 py-2 hover:scale-105 transition"
            disabled={loading || !otpSent}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {/* Footer Note */}
        <h2 className="text-base md:text-lg px-3 py-2 mt-4 rounded-lg font-medium bg-[#2EB9A2] text-white">
          Submit Your Wallet Address in Profile Section for Withdraw Amount.
        </h2>
      </div>
    </div>
  );
};

export default WithdrawIncomeWallet;
