import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';

const Wallet = () => {
  const [walletType, setWalletType] = useState('USDT.BEP20');
  const [address, setAddress] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [otp, setOtp] = useState('');
  const { user, token } = useAuthStore();
  const [wallets, setWallets] = useState([]);

  const fetchWallets = async () => {
    try {
      const response = await api.get('/user/wallets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWallets();
    }
  }, [token]);

  const handleSendOtp = async () => {
    try {
      await api.post('/user/send-otp', { email: user.email, password: transactionPassword }, {
        headers: { Authorization: `Bearer ${token}` }
        headers: { Authorization: `Bearer ${token}` }
      });
      toast('OTP sent to your email');
    } catch (error) {
      console.error('Error sending OTP', error);
      toast('Error sending OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/wallet', { walletType, address, transactionPassword, otp }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast('Wallet address updated successfully');
      fetchWallets(); // Refresh the list of wallets
    } catch (error) {
      console.error('Error updating wallet address', error);
      toast('Error updating wallet address');
    }
  };

  return (
    <div className=" flex w-[78vw] flex-col   gap-6 p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-medium capitalize font-[Inter]">
          Wallet Address
        </h2>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
          <a href="/setting">setting</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F]">wallet address</a>
        </nav>
      </div>

      {/* Wallet Form Card */}
      <div className="bg-white w-full rounded-3xl px-5 py-10 flex flex-col gap-6 shadow">
        <h2 className="font-normal text-xl capitalize font-[Inter] text-[#494949]">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <form className="flex flex-col gap-6 font-[Inter]" onSubmit={handleSubmit}>
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
          <label className="flex flex-col gap-1 max-w-md">
            <span className="text-lg capitalize text-black font-light">
              Transaction Password
            </span>
            <input
              type="password"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] p-2"
              value={transactionPassword}
              onChange={(e) => setTransactionPassword(e.target.value)}
            />
          </label>

          {/* OTP */}
          <label className="flex flex-col gap-1 max-w-md">
            <span className="text-lg capitalize text-black font-light">
              One time password
            </span>
            <div className="flex w-full">
              <input
                type="password"
                className="outline-none flex-1 border border-[#00000066] rounded-l-md placeholder:text-[#000000B2] p-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                className="border border-[#00000066] border-l-0 rounded-r-md px-4 flex items-center justify-center text-sm"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            </div>
          </label>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 hover:scale-105 transition-all ease-in"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white w-full rounded-3xl px-5 py-10 flex flex-col gap-6 shadow">
        <h2 className="font-normal text-xl capitalize font-[Inter] text-[#494949]">
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
