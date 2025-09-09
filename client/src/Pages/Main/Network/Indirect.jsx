import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import api from '../../../api/axios';

const Indirect = () => {
    const [indirectReferrals, setIndirectReferrals] = useState([]);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchIndirectReferrals = async () => {
            if (!user) return;
            try {
                const response = await api.get('/user/indirect-referrals');
                setIndirectReferrals(response.data);
            } catch (error) {
                console.error('Failed to fetch indirect referrals', error);
            }
        };

        fetchIndirectReferrals();
    }, [user]);

    return (
        <div className='w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat]'>
            <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
                <h2 className='text-3xl md:text-4xl font-medium capitalize'>Indirect Referral</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm'>
                    <a href="/Network">Network</a><span>/</span><a href="/Network/Indirect" className='text-[#02AC8F]'>Indirect Referral</a>
                </nav>
            </div>
            <div className='bg-white w-full rounded-3xl px-4 py-6 md:px-5 md:py-10 flex flex-col gap-5'>
                <h2 className='text-xl font-medium font-[Inter]'>Indirect Referrals</h2>
                <div className='bg-gray-50 py-3 px-4 md:px-8 pb-10 rounded-lg w-full min-w-[500px]'>
                    <div className='grid grid-cols-4 gap-6 text-base md:text-lg font-medium text-gray-800'>
                        <div>#</div>
                        <div>User ID</div>
                        <div>Name</div>
                        <div className="text-center">Investment Amount</div>
                    </div>
                    {indirectReferrals.length > 0 ? (
                        indirectReferrals.map((referral, index) => (
                            <div key={referral._id} className='grid grid-cols-4 gap-4 py-3 text-gray-500 border-t mt-2'>
                                <div>{index + 1}</div>
                                <div>{referral.referralCode}</div>
                                <div>{referral.name}</div>
                                <div className="text-center">${referral.miningInvestment || 0}</div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center col-span-4 py-5 text-gray-500'>No indirect referrals found.</div>
                    )}
                </div>
            </div>
            <div className='flex justify-between items-center pt-4'>
                    <h2 className='text-base md:text-lg font-medium text-gray-600'>
                        Showing {indirectReferrals.length} of {indirectReferrals.length} entries
                    </h2>
                </div>
        </div>
    )
}

export default Indirect;
