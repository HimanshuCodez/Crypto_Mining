import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import useAuthStore from '../../../store/authStore';

const AccountStatement = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user) return;
            try {
                const response = await axios.get('/api/user/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Failed to fetch transactions', error);
            }
        };

        fetchTransactions();
    }, [user]);

    const isCredit = (type) => {
        return ['deposit', 'income'].includes(type);
    };

    return (
        <div className='w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat]'>
            <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
                <h2 className='text-2xl md:text-4xl font-medium capitalize font-[Inter]'>Account Statement</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Financial">Financial</a><span>/</span><a href="/Account Statment " className='text-[#02AC8F]'>Account Statement</a>
                </nav>
            </div>
            <div className='bg-white w-full rounded-3xl px-2 sm:px-5 py-10 flex flex-col gap-5'>
                <h2 className='text-xl font-medium font-[Inter] px-3'>Account Statement</h2>
                <div className='bg-[#F7F7F7] py-3 px-4 md:px-8 pb-10 rounded-sm w-full overflow-x-auto'>
                    {/* Desktop Table Header */}
                    <div className='hidden md:grid grid-cols-6 gap-6 text-lg font-medium min-w-[600px]'>
                        <div>#</div>
                        <div>Date</div>
                        <div>Mode</div>
                        <div className="text-center">Credit</div>
                        <div className="text-center">Debit</div>
                        <div>Status</div>
                    </div>

                    {/* Mobile View */}
                    <div className='md:hidden'>
                        {transactions.map((transaction, index) => (
                            <div key={transaction._id} className='grid grid-cols-2 gap-4 py-3 border-b'>
                                <div className="font-semibold">#</div>
                                <div className="text-right">{index + 1}</div>
                                
                                <div className="font-semibold">Date</div>
                                <div className="text-right">{new Date(transaction.createdAt).toLocaleDateString()}</div>

                                <div className="font-semibold">Mode</div>
                                <div className="text-right">{transaction.type}</div>

                                <div className="font-semibold">Credit</div>
                                <div className={`text-right text-green-500`}>{isCredit(transaction.type) ? `$${transaction.amount}` : '-'}</div>

                                <div className="font-semibold">Debit</div>
                                <div className={`text-right text-red-500`}>{!isCredit(transaction.type) ? `$${transaction.amount}` : '-'}</div>

                                <div className="font-semibold">Status</div>
                                <div className="text-right">{transaction.status}</div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className='hidden md:block min-w-[600px]'>
                        {transactions.map((transaction, index) => (
                            <div key={transaction._id} className='grid grid-cols-6 gap-4 py-3 text-gray-500'>
                                <div>{index + 1}</div>
                                <div>{new Date(transaction.createdAt).toLocaleDateString()}</div>
                                <div>{transaction.type}</div>
                                <div className="text-center text-green-500">{isCredit(transaction.type) ? `$${transaction.amount}` : '-'}</div>
                                <div className="text-center text-red-500">{!isCredit(transaction.type) ? `$${transaction.amount}` : '-'}</div>
                                <div>{transaction.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-white flex justify-between items-start rounded-b-3xl p-5'>
                <h2 className='text-sm md:text-lg font-medium text-[#000000B2]'>Showing {transactions.length} of {transactions.length} entries</h2>
            </div>
        </div>
    );
};

export default AccountStatement;