import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { toast } from 'react-toastify';

const Transfer = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/user/all-transactions');
                setTransactions(response.data);
            } catch (error) {
                toast.error('Failed to fetch transactions.');
            }
            setLoading(false);
        };
        fetchTransactions();
    }, []);

    return (
        <div className='w-full flex flex-col gap-6 p-10 font-[Montserrat]'>
            <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Transfer Report</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/Transfer">Transfer</a><span>/</span><a href="/Transport Report " className='text-[#02AC8F]'>Transport Report</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
                <h2 className='text-xl font-medium font-[Inter]'>Transfer Report</h2>
                <div className='bg-[#F7F7F7] py-3 px-8 pb-10 rounded-sm w-full'>
                    <div className='grid grid-cols-6 gap-6 text-lg font-medium '>
                        <div>#</div>
                        <div>User ID</div>
                        <div>Transfer Amount</div>
                        <div className="text-center">Receive Amount</div>
                        <div className="text-center">Mode</div>
                        <div>Date</div>
                    </div>
                    {loading ? (
                        <div className="text-center col-span-6">Loading...</div>
                    ) : transactions.length > 0 ? (
                        transactions.map((tx, index) => (
                            <div key={tx._id} className='grid grid-cols-6 gap-4 py-3 text-gray-500'>
                                <div>{index + 1}</div>
                                <div>{tx.counterparty || 'N/A'}</div>
                                <div>${tx.type === 'transfer_out' ? tx.amount.toFixed(2) : '0.00'}</div>
                                <div className="text-center">${tx.type === 'transfer_in' ? tx.amount.toFixed(2) : '0.00'}</div>
                                <div className="text-center">{tx.mode || 'N/A'}</div>
                                <div>{new Date(tx.createdAt).toLocaleDateString()}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-6">No transactions found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transfer;