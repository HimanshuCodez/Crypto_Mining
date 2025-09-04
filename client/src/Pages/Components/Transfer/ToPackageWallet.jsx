import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';

const ToPackageWallet = () => {
    const { user, checkAuth } = useAuthStore();
    const [recipientReferralId, setRecipientReferralId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleSendOtp = async () => {
        if (!recipientReferralId || !amount) {
            toast.error('Please fill in recipient ID and amount.');
            return;
        }
        setLoading(true);
        try {
            await axios.post('/package-transfer/send-otp', { recipientReferralId, amount });
            setIsOtpSent(true);
            toast.success('OTP sent to your email.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP.');
        }
        setLoading(false);
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            toast.error('Please enter the OTP.');
            return;
        }
        setLoading(true);
        try {
            await axios.post('/otp/verify-otp', { otp });
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
            const response = await axios.post('/package-transfer/to-package-wallet', {
                recipientReferralId,
                amount,
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
            checkAuth(); // Refresh user data
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transfer failed.');
        }
        setLoading(false);
    };

    return (
        <div className='w-full flex flex-col gap-6 p-10 font-[Inter]'>
            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Transfer To Package Wallet</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Transfer">Transfer</a><span>/</span><a href="/wallet" className='text-[#02AC8F]'>Transfer To Package Wallet</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5'>
                <div className='grid grid-cols-2 justify-start items-center gap-10 w-[60%]'>
                    <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3'>
                        <h2>Package Wallet</h2>
                        <span className='text-[#2EB9A2]'>${user?.packageWallet?.toFixed(2) || '0.00'}</span>
                    </div>
                </div>
                <h2 className='text-3xl font-[Inter] font-medium py-3'>Package Wallet Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-6 font-[Inter]'>
                        <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>
                            <label htmlFor="userid" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>User Id</span>
                                <input 
                                    type="text" 
                                    className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' 
                                    placeholder='Enter User Id' 
                                    value={recipientReferralId}
                                    onChange={(e) => setRecipientReferralId(e.target.value)}
                                    required
                                />
                            </label>
                        </span>
                        <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>
                            <label htmlFor="mode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Investment Amount</span>
                                <input 
                                    type="number" 
                                    className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' 
                                    placeholder='Enter Amount' 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </label>
                        </span>
                        <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-[20vw]'>
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
                            <span className='text-lg capitalize text-black font-light'>one time password</span>
                            <span className='text-sm font-light flex w-[30vw]'>
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
                                        className='border rounded-r-sm border-l-0 border-gray-400 w-[10vw] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors'
                                    >
                                        {loading ? 'Sending...' : 'Send OTP'}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={loading || isOtpVerified}
                                        className='border rounded-r-sm border-l-0 border-gray-400 w-[10vw] flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors'
                                    >
                                        {isOtpVerified ? 'Verified' : (loading ? 'Verifying...' : 'Verify OTP')}
                                    </button>
                                )}
                            </span>
                        </label>
                        <div className='flex justify-start'>
                            <button 
                                type="submit"
                                className='border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in disabled:opacity-50'
                                disabled={!isOtpVerified || loading}
                            >
                                {loading ? 'Transferring...' : 'submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ToPackageWallet;