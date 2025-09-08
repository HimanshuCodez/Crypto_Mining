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
                <h2 className='text-2xl md:text-4xl font-medium capitalize font-[Inter]'>Indirect Referral</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Network">Network</a><span>/</span><a href="/Indirect-Referral" className='text-[#02AC8F]'>Indirect Referral</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
                <h2 className='text-xl font-medium font-[Inter]'>Indirect Referrals</h2>
                <div className='bg-[#F7F7F7] py-3 px-4 md:px-8 pb-10 rounded-sm w-full'>
                    <div className='hidden md:grid grid-cols-4 gap-6 text-lg font-medium'>
                        <div>#</div>
                        <div>User ID</div>
                        <div>Name</div>
                        <div className="text-center">Investment Amount</div>
                    </div>
                    {indirectReferrals.map((referral, index) => (
                        <div key={referral._id} className='flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-4 py-3 text-gray-500 border-b md:border-b-0'>
                            {/* Mobile view */}
                            <div className="md:hidden flex justify-between items-center">
                                <span className="font-medium text-black">#</span>
                                <span>{index + 1}</span>
                            </div>
                            <div className="md:hidden flex justify-between items-center">
                                <span className="font-medium text-black">User ID:</span>
                                <span>{referral._id}</span>
                            </div>
                            <div className="md:hidden flex justify-between items-center">
                                <span className="font-medium text-black">Name:</span>
                                <span>{referral.name}</span>
                            </div>
                            <div className="md:hidden flex justify-between items-center">
                                <span className="font-medium text-black">Investment:</span>
                                <span>${referral.miningInvestment || 0}</span>
                            </div>

                            {/* Desktop view */}
                            <div className="hidden md:block">{index + 1}</div>
                            <div className="hidden md:block">{referral._id}</div>
                            <div className="hidden md:block">{referral.name}</div>
                            <div className="hidden md:block text-center">${referral.miningInvestment || 0}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#FFFFFF] flex justify-between items-start rounded-b-3xl p-4 md:p-5'>
                <h2 className='text-lg font-medium text-[#000000B2]'>Showing {indirectReferrals.length} of {indirectReferrals.length} entries</h2>
            </div>
        </div>
    )
}

export default Indirect;
