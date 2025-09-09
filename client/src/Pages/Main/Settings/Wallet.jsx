import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';

const Wallet = () => {
  const [walletType, setWalletType] = useState('USDT.BEP20');
  const [address, setAddress] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [wallets, setWallets] = useState([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWallets = async () => {
    try {
      const response = await api.get('/user/wallets');
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets', error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleSendOtp = async () => {
    if (!transactionPassword) {
      toast.error("Please enter your transaction password");
      return;
    }
    setIsSendingOtp(true);
    try {
      await api.post('/otp/send-wallet-otp', { password: transactionPassword });
      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/user/wallet', { walletType, address, otp });
      toast.success('Wallet address saved successfully');
      setWalletType('USDT.BEP20');
      setAddress('');
      setTransactionPassword('');
      setOtp('');
      setOtpSent(false);
      fetchWallets(); // Refresh the list of wallets
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving wallet address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl md:text-4xl font-medium capitalize font-['Inter']">
          Wallet Address
        </h2>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-['Inter']">
          <a href="/setting">setting</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F]">wallet address</a>
        </nav>
      </div>

      {/* Wallet Form Card */}
      <div className="bg-white w-full rounded-3xl px-5 py-10 flex flex-col gap-6 shadow">
        <h2 className="font-normal text-xl capitalize font-['Inter'] text-[#494949]">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <form className="flex flex-col gap-6 font-['Inter']" onSubmit={handleSubmit}>
          {/* Wallet Selection */}
          <label className="flex flex-col gap-1">
            <span className="text-lg capitalize text-black font-light">
              Select wallet
            </span>
            <select
              className="outline-none w-full border border-[#00000066] rounded-md p-2"
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
            >
              <option>USDT.BEP20</option>
              <option>USDT.TRC20</option>
              
            </select>
          </label>

          {/* Wallet Address */}
          <label className="flex flex-col gap-1">
            <span className="text-lg capitalize text-black font-light">
              Select Wallet Address
            </span>
            <input
              type="text"
              placeholder="Enter Wallet Address"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          {/* Transaction Password */}
          <label className="flex flex-col gap-1 w-full md:max-w-md">
            <span className="text-lg capitalize text-black font-light">
              Transaction Password
            </span>
            <input
              type="password"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] p-2"
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
              disabled={otpSent}
            />
          </label>

          {/* OTP */}
          <label className="flex flex-col gap-1 w-full md:max-w-md">
            <span className="text-lg capitalize text-black font-light">
              One time password
            </span>
            <div className="flex w-full">
              <input
                type="password"
                className="outline-none flex-1 border border-[#00000066] rounded-l-md placeholder:text-[#000000B2] p-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!otpSent}
              />
              <button
                type="button"
                className="border border-[#00000066] border-l-0 rounded-r-md px-4 flex items-center justify-center text-sm"
                onClick={handleSendOtp}
                disabled={isSendingOtp || otpSent}
              >
                {isSendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </label>
 <label htmlFor="verify" className='flex justify-start items-center gap-2'>
                            <input type="checkbox" name="" id="verify" className='h-4 w-4' required />
                            <span className='text-[#31B8A1] font-semibold font-[Montserrat] text-sm'>Verify</span>
                        </label>
          {/* Submit */}
          <div>
            <button
              type="submit"
              className="border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-['Montserrat'] text-lg px-6 py-2 hover:scale-105 transition-all ease-in"
              disabled={loading || !otpSent}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white w-full rounded-3xl px-5 py-10 flex flex-col gap-6 shadow">
        <h2 className="font-normal text-xl capitalize font-['Inter'] text-[#494949]">
          Saved Wallet Addresses
        </h2>
        <div>
          {wallets.map((wallet) => (
            <div key={wallet._id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p className="font-semibold">{wallet.walletType}</p>
                <p>{wallet.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wallet;