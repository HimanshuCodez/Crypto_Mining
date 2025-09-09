
import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import api from '../../../api/axios';
import { toast } from 'react-toastify';

const ToIncomeWallet = () => {
  const { user, checkAuth } = useAuthStore();
  const [recipientReferralId, setRecipientReferralId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referredUserName, setReferredUserName] = useState(''); // New state for referred user name

  const handleSendOtp = async () => {
    if (!recipientReferralId || !amount) {
        toast.error('Please fill in recipient ID and amount.');
        return;
    }
    setLoading(true);
    try {
      await api.post('/transfer/send-otp', { recipientReferralId, amount });
      setIsOtpSent(true);
      toast.success('OTP sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
        toast.error('Please enter the OTP.');
        return;
    }
    setLoading(true);
    try {
        await api.post('/otp/verify-otp', { otp });
        setIsOtpVerified(true);
        toast.success('OTP verified successfully.');
    } catch (error) {
        toast.error(error.response?.data?.message || 'OTP verification failed.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      toast.error('Please verify the OTP first.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/api/transfer/to-income-wallet', {
        recipientReferralId,
        amount: parseFloat(amount),
        transactionPassword,
        otp,
      });
      toast.success(response.data.message);
      setRecipientReferralId('');
      setAmount('');
      setTransactionPassword('');
      setOtp('');
      setIsOtpSent(false);
      setIsOtpVerified(false);
      checkAuth();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='w-full flex flex-col gap-6 p-4 md:p-6 font-[Inter]'>

      <div className='flex flex-col justify-start items-start gap-2'>
        <h2 className='text-2xl md:text-4xl font-medium capitalize font-[Inter]'>Transfer To Income Wallet</h2>
        <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
          <a href="/Transfer">Transfer</a><span>/</span><a href="/wallet" className='text-[#02AC8F] truncate'>Transfer To Income Wallet</a>
        </nav>
      </div>
      <div className='bg-[#FFFFFF] w-full rounded-3xl px-4 md:px-5 py-10 flex flex-col gap-5'>

        <div className='grid grid-cols-1 md:grid-cols-2 justify-start items-center gap-10 w-full'>
          <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3'>
            <h2>Income Wallet</h2>
            <span className='text-[#2EB9A2]'>${user?.incomeWallet?.toFixed(2) ?? '0.00'}</span>
          </div>

        </div>
        <h2 className='text-xl md:text-3xl font-[Inter] font-medium py-3'>Income Wallet Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6 font-[Inter]'>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full md:w-[45vw] justify-start gap-6 md:gap-10'>
              <label htmlFor="userid" className='flex flex-col justify-start items-start gap-1'>
                <span className='text-lg capitalize text-black font-light'>Recipient Referral ID</span>
                <input
                  type="text"
                  className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2'
                  placeholder='Enter Recipient Referral ID'
                  value={recipientReferralId}
                  onChange={async (e) => { // Make onChange async
                    const value = e.target.value;
                    setRecipientReferralId(value);

                    if (value.trim() !== "") {
                        try {
                            const response = await api.get(`/auth/referrer/${value}`);
                            setReferredUserName(response.data.name);
                        } catch (error) {
                            setReferredUserName("");
                        }
                    } else {
                        setReferredUserName("");
                    }
                  }}
                  required
                />
                {referredUserName && <span className="text-sm text-green-500">{referredUserName}</span>} {/* Display referred user name */}
              </label>

              <label htmlFor="amount" className='flex flex-col justify-start items-start gap-1'>
                <span className='text-lg capitalize text-black font-light'>Amount to Transfer</span>
                <input
                  type="number"
                  className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2'
                  placeholder='Enter Amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </label>
            </div>
            <label htmlFor="transactionPassword" className='flex flex-col justify-start items-start gap-1 w-full md:w-1/2'>
              <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
              <input
                type="password"
                className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2'
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
                required
              />
            </label>
            <label htmlFor="otp" className='flex flex-col justify-start items-start gap-1'>
              <span className='text-lg capitalize text-black font-light'>One Time Password</span>
              <span className='text-sm font-light flex w-full md:w-1/2'>
                <input
                  type="password"
                  className='outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!isOtpSent}
                />
                {!isOtpSent ? (
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading}
                        className='border rounded-r-sm border-l-0 border-gray-400 w-auto px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                        {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || isOtpVerified}
                        className='border rounded-r-sm border-l-0 border-gray-400 w-auto px-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors'
                    >
                        {isOtpVerified ? 'Verified' : (loading ? 'Verifying...' : 'Verify OTP')}
                    </button>
                )}
              </span>
            </label>
             <label htmlFor="verify" className='flex justify-start items-center gap-2'>
                            <input type="checkbox" name="" id="verify" className='h-4 w-4' required />
                            <span className='text-[#31B8A1] font-semibold font-[Montserrat] text-sm'>Verify</span>
                        </label>
            <div className='flex justify-start'>
              <button
                type="submit"
                className='border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in'
                disabled={loading || !isOtpVerified}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
)};

export default ToIncomeWallet;
