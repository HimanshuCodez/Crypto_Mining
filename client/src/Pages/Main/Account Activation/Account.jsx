import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';

const Account = () => {
    const [walletData, setWalletData] = useState(null);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchWalletData = async () => {
            if (!user) return;
            try {
                const response = await axios.get(`/api/user/${user._id}/dashboard`);
                setWalletData(response.data);
            } catch (error) {
                console.error('Failed to fetch wallet data', error);
            }
        };

        fetchWalletData();
    }, [user]);

    return (
        <div className='w-full flex flex-col gap-6 p-10'>
            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Account Activation</h2>
            </div>
            <div className='bg-white w-full rounded-3xl px-5 sm:px-10 py-10 flex flex-col gap-5'>
                <span className='font-[Inter] flex items-center gap-1'>
                    <span className='text-[#2EB9A2] font-medium text-xl'>Notification:</span>
                    <h2 className='font-normal text-xl font-[Inter] text-[#494949]'>Here, you can activate your Account for $111.</h2>
                </span>

                {/* Wallet Balances */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-8'>
                    <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-4'>
                        <h2>Income Wallet</h2>
                        <span className='text-[#2EB9A2]'>${walletData ? walletData.incomeWallet : '...'}</span>
                    </div>
                    <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-4'>
                        <h2>Package Wallet</h2>
                        <span className='text-[#2EB9A2]'>${walletData ? walletData.packageWallet : '...'}</span>
                    </div>
                </div>

                <h2 className='text-3xl font-[Inter] font-medium py-3'>Fill Account Detail</h2>
                <form action="get">
                    <div className='flex flex-col gap-6 font-[Inter]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <label htmlFor="userid" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>User Id</span>
                                <input type="text" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter User Id' name="" id="" />
                            </label>
                            <label htmlFor="mode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Mode</span>
                                <select className='outline-none w-full border border-black rounded-lg p-2'>
                                    <option value="activation">Account Activation</option>
                                    <option value="renewal">Account Renewal</option>
                                </select>
                            </label>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <label htmlFor="password" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
                                <input type="password" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] p-2' />
                            </label>
                            <label htmlFor="paymentMode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Payment Mode</span>
                                <select className='outline-none w-full border border-black rounded-lg p-2'>
                                    <option value="package">Package Wallet</option>
                                    <option value="income">Income Wallet</option>
                                </select>
                            </label>
                        </div>
                        
                        <label htmlFor="otp" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-lg capitalize text-black font-light'>One Time Password</span>
                            <div className='flex w-full md:w-1/2'>
                                <input type="password" id="otp" className='outline-none w-full border border-[#00000066] rounded-l-md p-2' />
                                <div className='border rounded-r-md border-l-0 w-auto px-4 flex items-center justify-center cursor-pointer'>Send OTP</div>
                            </div>
                        </label>

                        <label htmlFor="verify" className='flex justify-start items-center gap-2'>
                            <input type="checkbox" name="" id="verify" className='h-4 w-4' />
                            <span className='text-[#31B8A1] font-semibold font-[Montserrat] text-sm'>Verify</span>
                        </label>

                        <div className='flex justify-start'>
                            <button className='border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 hover:scale-105 transition-all ease-in'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Account;