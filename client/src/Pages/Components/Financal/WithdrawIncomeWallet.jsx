
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
      // Optionally, you can re-fetch user data here to update the balance shown
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
      <div className="flex flex-col justify-start items-start gap-2">
        <h2 className="text-2xl md:text-4xl font-medium capitalize font-['Inter']">
          Withdraw Income Wallet
        </h2>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-['Inter']">
          <a href="/Transfer">Financial</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F] truncate">
            Withdraw Income Wallet
          </a>
        </nav>
      </div>
      <div className="bg-[#FFFFFF] w-full rounded-3xl px-4 md:px-5 py-10  flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-10 w-full pt-8">
          <div className="font-['Inter'] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3">
            <h2>Income Wallet Balance</h2>
            <span className="text-[#2EB9A2]">
              ${user?.incomeWallet?.toFixed(2) ?? '0.00'}
            </span>
          </div>
        </div>
        <h2 className=" text-xl md:text-2xl px-2 py-3 rounded-xl  capitalize font-medium font-['Inter'] bg-[#2EB9A2] text-white">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 font-['Inter']">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-[45vw] justify-start gap-6 md:gap-10">
              <label
                htmlFor="walletAddress"
                className="flex flex-col justify-start items-start gap-1"
              >
                <span className="text-lg capitalize text-black font-light">
                  Select Wallet Address
                </span>
                <select
                  className="outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
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
              <label
                htmlFor="amount"
                className="flex flex-col justify-start items-start gap-1"
              >
                <span className="text-lg capitalize text-black font-light">
                  Enter Amount
                </span>
                <input
                  type="text"
                  className="outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
                  placeholder="Enter Amount"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
            </div>
            <label
              htmlFor="password"
              className="flex flex-col justify-start items-start gap-1 w-full md:w-[20vw]"
            >
              <span className="text-lg capitalize text-black font-light">
                Transaction Password
              </span>
              <input
                type="password"
                className="outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={otpSent}
              />
            </label>
            <label
              htmlFor="otp"
              className="flex flex-col justify-start items-start gap-1"
            >
              <span className="text-lg capitalize text-black font-light">
                One Time Password
              </span>
              <span className="text-sm font-light flex w-full md:w-[20vw]">
                <input
                  type="password"
                  className="outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || otpSent}
                  className="border rounded-r-sm border-l-[#00000066] w-auto px-4 flex items-center  justify-center"
                >
                  {isSendingOtp ? 'Sending...' : 'Send OTP'}
                </button>
              </span>
            </label>
            <div className="flex justify-start">
              <button
                type="submit"
                className="border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-['Montserrat'] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in"
                disabled={loading || !otpSent}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
        <h2 className=" text-xl md:text-2xl px-4 py-3 mt-6  capitalize font-medium font-['Montserrat'] bg-[#2EB9A2] text-white">
          Submit Your Wallet Address in Profile Section for Withdraw Amount.
        </h2>
      </div>
    </div>
};

export default WithdrawIncomeWallet;
