import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/api/withdrawals', {
        amount,
        walletAddress,
        password,
        otp,
      });
      toast.success(response.data.message);
      setAmount('');
      setWalletAddress('');
      setPassword('');
      setOtp('');
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
    <div className="w-full flex flex-col gap-6 p-10 pr-20 font-[Inter]">
      <div className="flex flex-col justify-start items-start gap-2">
        <h2 className="text-4xl font-medium capitalize font-[Inter]">
          Withdraw Income Wallet
        </h2>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
          <a href="/Transfer">Financial</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F]">
            Withdraw Income Wallet
          </a>
        </nav>
      </div>
      <div className="bg-[#FFFFFF] w-full rounded-3xl px-5 py-10  flex flex-col gap-5">
        <div className="grid grid-cols-2 justify-start items-center gap-10 w-[60%] pt-8">
          <div className="font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3">
            <h2>Income Wallet Balance</h2>
            <span className="text-[#2EB9A2]">
              ${user?.incomeWallet?.toFixed(2) ?? '0.00'}
            </span>
          </div>
        </div>
        <h2 className=" text-2xl px-2 py-3 rounded-xl  capitalize font-medium font-[Inter] bg-[#2EB9A2] text-white">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 font-[Inter]">
            <span className="grid grid-cols-2 w-[45vw] justify-start gap-10">
              <label
                htmlFor="walletAddress"
                className="flex flex-col justify-start items-start gap-1"
              >
                <span className="text-lg capitalize text-black font-light">
                  Select Wallet Address
                </span>
                <input
                  type="text"
                  className="outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
                  placeholder="Select Wallet Address"
                  name="walletAddress"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </label>
            </span>
            <span className="grid grid-cols-2 w-[45vw] justify-start gap-10">
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
            </span>
            <label
              htmlFor="password"
              className="flex flex-col justify-start items-start gap-1 w-[20vw]"
            >
              <span className="text-lg capitalize text-black font-light">
                Transaction Password
              </span>
              <input
                type="password"
                className="outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label
              htmlFor="otp"
              className="flex flex-col justify-start items-start gap-1"
            >
              <span className="text-lg capitalize text-black font-light">
                One Time Password
              </span>
              <span className="text-sm font-light flex w-[20vw]">
                <input
                  type="password"
                  className="outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div className="border rounded-r-sm border-l-[#00000066] w-[10vw] flex items-center  justify-center">
                  Send OTP
                </div>
              </span>
            </label>
            <div className="flex justify-start">
              <button
                type="submit"
                className="border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
        <h2 className=" text-2xl px-4 py-3 mt-6  capitalize font-medium font-[Montserrat] bg-[#2EB9A2] text-white">
          Submit Your Wallet Address in Profile Section for Withdraw Amount.
        </h2>
      </div>
    </div>
  );
};

export default WithdrawIncomeWallet;