import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';

const Account = () => {
    const [walletData, setWalletData] = useState(null);
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        userId: '',
        mode: 'activation',
        password: '',
        paymentMode: 'package',
        otp: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWalletData = async () => {
            if (!user) return;
            try {
                const response = await axios.get(`/api/user/${user._id}/dashboard`);
                setWalletData(response.data);
            } catch (error) {
                console.error('Failed to fetch wallet data', error);
                toast.error('Failed to fetch wallet data');
            }
        };

        fetchWalletData();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!user || !user.email) {
            toast.error('User email not found');
            return;
        }
        if (!formData.password) {
            toast.error('Please enter your transaction password first');
            return;
        }
        if (!walletData) {
            toast.error('Wallet data not loaded yet.');
            return;
        }
        if (walletData.incomeWallet < 111 && walletData.packageWallet < 111) {
            toast.error('You do not have enough balance to activate account.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/user/send-otp', { email: user.email, password: formData.password });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (walletData.incomeWallet < 111 && walletData.packageWallet < 111) {
            return toast.error('You do not have enough balance to activate account.');
        }
        try {
            setLoading(true);
            const response = await axios.post('/api/user/activate', formData);
            toast.success(response.data.message);
            // Optionally, refresh wallet data
            const updatedWalletData = await axios.get(`/api/user/${user._id}/dashboard`);
            setWalletData(updatedWalletData.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error activating account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex flex-col gap-6 p-4 md:p-10'>
            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-3xl md:text-4xl font-medium capitalize font-[Inter]'>Account Activation</h2>
            </div>
            <div className='bg-white w-full rounded-3xl px-5 sm:px-10 py-10 flex flex-col gap-5'>
                <span className='font-[Inter] flex flex-col sm:flex-row items-start sm:items-center gap-1'>
                    <span className='text-[#2EB9A2] font-medium text-lg md:text-xl'>Notification:</span>
                    <h2 className='font-normal text-base md:text-xl font-[Inter] text-[#494949]'>Here, you can activate your Account for $111.</h2>
                </span>

                {/* Wallet Balances */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-8'>
                    <div className='font-[Inter] font-medium text-xl md:text-2xl flex flex-col gap-3 border rounded-lg p-4'>
                        <h2>Income Wallet</h2>
                        <span className='text-[#2EB9A2]'>${walletData ? walletData.incomeWallet : '...'}</span>
                    </div>
                    <div className='font-[Inter] font-medium text-xl md:text-2xl flex flex-col gap-3 border rounded-lg p-4'>
                        <h2>Package Wallet</h2>
                        <span className='text-[#2EB9A2]'>${walletData ? walletData.packageWallet : '...'}</span>
                    </div>
                </div>

                <h2 className='text-2xl md:text-3xl font-[Inter] font-medium py-3'>Fill Account Detail</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-6 font-[Inter]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <label htmlFor="userid" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-base md:text-lg capitalize text-black font-light'>User Id</span>
                                <input type="text" name="userId" value={formData.userId} onChange={handleChange} className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter User Id' id="userid" />
                            </label>
                            <label htmlFor="mode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-base md:text-lg capitalize text-black font-light'>Mode</span>
                                <select name="mode" value={formData.mode} onChange={handleChange} className='outline-none w-full border border-black rounded-lg p-2'>
                                    <option value="activation">Account Activation</option>
                                    <option value="renewal">Account Renewal</option>
                                </select>
                            </label>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <label htmlFor="password" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-base md:text-lg capitalize text-black font-light'>Transaction Password</span>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] p-2' />
                            </label>
                            <label htmlFor="paymentMode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-base md:text-lg capitalize text-black font-light'>Payment Mode</span>
                                <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className='outline-none w-full border border-black rounded-lg p-2'>
                                    <option value="package">Package Wallet</option>
                                    <option value="income">Income Wallet</option>
                                </select>
                            </label>
                        </div>
                        
                        <label htmlFor="otp" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-base md:text-lg capitalize text-black font-light'>One Time Password</span>
                            <div className='flex w-full md:w-1/2'>
                                <input type="password" id="otp" name="otp" value={formData.otp} onChange={handleChange} className='outline-none w-full border border-[#00000066] rounded-l-md p-2' />
                                <div onClick={handleSendOtp} className='border rounded-r-md border-l-0 w-auto px-4 flex items-center justify-center cursor-pointer text-sm md:text-base'>Send OTP</div>
                            </div>
                        </label>

                        <label htmlFor="verify" className='flex justify-start items-center gap-2'>
                            <input type="checkbox" name="" id="verify" className='h-4 w-4' required />
                            <span className='text-[#31B8A1] font-semibold font-[Montserrat] text-sm'>Verify</span>
                        </label>

                        <div className='flex justify-start'>
                            <button type="submit" disabled={loading} className='border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-base md:text-lg px-6 py-2 hover:scale-105 transition-all ease-in'>
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Account;