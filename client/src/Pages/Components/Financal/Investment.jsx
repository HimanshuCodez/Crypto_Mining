import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../store/authStore';
import api from '../../../api/axios';
import { toast } from 'react-toastify';

const Investment = () => {
    const { user } = useAuthStore();
    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [withdrawals, setWithdrawals] = useState([]);

    const fetchWithdrawals = async () => {
        try {
            const response = await api.get('/api/withdrawals/mining');
            setWithdrawals(response.data);
        } catch (error) {
            toast.error('Failed to fetch withdrawals');
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(amount) > user.miningInvestment) {
            toast.error('Amount exceeds mining investment balance');
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/api/withdrawals/mining', {
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
            fetchWithdrawals();
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex flex-col gap-6 p-10 pr-20 font-[Inter]'>

            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Withdraw Minning Investment </h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Transfer">Financial</a><span>/</span><a href="/wallet" className='text-[#02AC8F]'>Withdraw Minning Investment<address></address></a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10  flex flex-col gap-5'>
                <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3 w-fit'>
                    <h2>Mining Investment Balance</h2>
                    <span className='text-[#2EB9A2]'>${user?.miningInvestment?.toFixed(2) ?? '0.00'}</span>
                </div>
                <span className=' font-[Inter] flex justify-start items-start gap-2'><h2 className='text-[#2EB9A2] font-medium text-xl'> Notification :</h2><h2 className='w-[36vw] font-normal text-xl text-wrap  font-[Inter] text-[#494949] '>You may withdraw your trading investment at any time, subject to a 20% transaction fee</h2></span>
                <h2 className='text-3xl font-[Inter] font-medium py-3'>Fill Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-6 font-[Inter]'>
                        <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>
                            <label htmlFor="amount" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Select Minning Amount</span>
                                <input type="text" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter Amount' name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </label>

                        </span>
                        <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>

                            <label htmlFor="walletAddress" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>Select Wallet Address</span>
                                <input type="text" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Select Address' name="walletAddress" id="walletAddress" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                            </label>
                        </span>
                        <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-[20vw]'>
                            <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
                            <input type="password" className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label htmlFor="otp" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-lg capitalize text-black font-light'>one time password</span>
                            <span className='text-sm font-light flex w-[20vw]'><input type="password" className='outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2' value={otp} onChange={(e) => setOtp(e.target.value)} /><div className='border rounded-r-sm border-l-[#00000066] w-[10vw] flex items-center  justify-center'>Send OTP</div></span>
                        </label>
                        <div className='flex justify-start'><button type="submit" disabled={loading} className='border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in'>{loading ? 'Submitting...' : 'Submit'}</button></div>
                    </div>
                </form>
                <h2 className=' text-2xl px-4 py-3 mt-6  capitalize font-medium font-[Montserrat] bg-[#2EB9A2] text-white'>Submit Your Wallet Address in Profile Section for Withdraw Amount. </h2>
                <div className='bg-[#F7F7F7] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
                    <h2 className='text-xl font-medium font-[Inter]'> Report</h2>
                    <div className='bg-[#Ffff]   py-3 px-8  pb-10 rounded-sm w-full'>
                        <div className='grid grid-cols-4 gap-6 text-lg font-medium '>
                            <div>#</div>
                            <div>Amount</div>
                            <div>Wallet Address</div>
                            <div className="text-center">Withdraw Date</div>
                        </div>
                        {withdrawals.map((withdrawal, index) => (
                        <div key={withdrawal._id} className='grid grid-cols-4 gap-4 py-3 text-gray-500'>
                            <div>{index + 1}</div>
                            <div>${withdrawal.amount}</div>
                            <div>{withdrawal.walletAddress}</div>
                            <div className="text-center">{new Date(withdrawal.createdAt).toLocaleDateString()}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Investment;