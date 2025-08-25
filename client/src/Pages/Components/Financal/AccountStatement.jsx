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
        <div className='w-[80vw] flex flex-col gap-6 p-10 font-[Montserrat]'>
            <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Account Statement</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Financial">Financial</a><span>/</span><a href="/Account Statment " className='text-[#02AC8F]'>Account Statement</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5'>
                <h2 className='text-xl font-medium font-[Inter]'>Account Statement</h2>
                <div className='bg-[#F7F7F7] py-3 px-8 pb-10 rounded-sm w-full'>
                    <div className='grid grid-cols-6 gap-6 text-lg font-medium'>
                        <div>#</div>
                        <div>Date</div>
                        <div>Mode</div>
                        <div className="text-center">Credit</div>
                        <div className="text-center">Debit</div>
                        <div>Status</div>
                    </div>
                    {transactions.map((transaction, index) => (
                        <div key={transaction._id} className='grid grid-cols-6 gap-4 py-3 text-gray-500'>
                            <div>{index + 1}</div>
                            <div>{new Date(transaction.createdAt).toLocaleDateString()}</div>
                            <div>{transaction.type}</div>
                            <div className="text-center text-green-500">{isCredit(transaction.type) ? `${transaction.amount}` : '-'}</div>
                            <div className="text-center text-red-500">{!isCredit(transaction.type) ? `${transaction.amount}` : '-'}</div>
                            <div>{transaction.status}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#FFFFFF] flex justify-between items-start rounded-b-3xl p-5'>
                <h2 className='text-lg font-medium text-[#000000B2]'>Showing {transactions.length} to {transactions.length} of {transactions.length} entries</h2>
            </div>
        </div>
    );
};

export default AccountStatement;