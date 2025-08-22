import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';

const Direct = () => {
    const [directReferrals, setDirectReferrals] = useState([]);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchDirectReferrals = async () => {
            if (!user) return;
            try {
                const response = await axios.get('/api/user/referrals/direct');
                setDirectReferrals(response.data);
            } catch (error) {
                console.error('Failed to fetch direct referrals', error);
            }
        };

        fetchDirectReferrals();
    }, [user]);

    return (
        <div className='w-full flex flex-col gap-6 p-10 font-[Montserrat]'>
            <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Direct Referral</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Network">Network</a><span>/</span><a href="/Direct Refral" className='text-[#02AC8F]'>Direct Referral</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
                <h2 className='text-xl font-medium font-[Inter]'>Direct Referrals</h2>
                <div className='bg-[#F7F7F7] py-3 px-8 pb-10 rounded-sm w-full'>
                    <div className='grid grid-cols-4 gap-6 text-lg font-medium'>
                        <div>#</div>
                        <div>User ID</div>
                        <div>Name</div>
                        <div className="text-center">Investment Amount</div>
                    </div>
                    {directReferrals.map((referral, index) => (
                        <div key={referral._id} className='grid grid-cols-4 gap-4 py-3 text-gray-500'>
                            <div>{index + 1}</div>
                            <div>{referral.referralCode}</div>
                            <div>{referral.name}</div>
                            <div className="text-center">${referral.miningInvestment || 0}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#FFFFFF] flex justify-between items-start rounded-b-3xl p-5'>
                <h2 className='text-lg font-medium text-[#000000B2]'>Showing {directReferrals.length} of {directReferrals.length} entries</h2>
            </div>
        </div>
    )
}

export default Direct;
