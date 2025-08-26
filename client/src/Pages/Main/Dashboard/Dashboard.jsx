import React, { useEffect, useState } from 'react';
import bg from '../../../assets/dash-bg.png';

import axios from '../../../api/axios';
import useAuthStore from '../../../store/authStore';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`/api/user/${user._id}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleCopy = () => {
    if (dashboardData && dashboardData.referralLink) {
      navigator.clipboard.writeText(dashboardData.referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className='flex flex-col gap-6 p-4 md:p-10 w-full'>
      <h2 className='text-3xl md:text-4xl font-medium capitalize font-[Inter]'>Dashboard</h2>
      
      <div className='bg-white w-full rounded-2xl px-4 py-6 md:px-5 md:py-10 flex flex-col gap-2 font-[Montserrat]'>
        <h1 className='text-lg md:text-xl font-medium'>Referral Link</h1>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
          <h6 className='font-normal text-sm break-all'>{dashboardData ? dashboardData.referralLink : 'Loading...'}</h6>
          <button onClick={handleCopy} className='border border-dashed px-3 py-1 font-semibold text-[#31B8A1] cursor-pointer border-[#31B8A1] whitespace-nowrap'>copy</button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-start font-[Inter]'>
        <div className='w-full md:w-80 h-28 px-5 py-4 rounded-2xl flex flex-col justify-center' style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <h1 className='text-2xl font-medium text-white'>Income Wallet</h1>
          <p className='text-white text-lg'>${dashboardData ? `${dashboardData.incomeWallet}` : '...'}</p>
        </div>
        <div className='w-full md:w-80 h-28 px-5 py-4 rounded-2xl flex flex-col justify-center' style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <h1 className='text-2xl font-medium text-white'>Package Wallet</h1>
          <p className='text-white text-lg'>${dashboardData ? `${dashboardData.packageWallet}` : '...'}</p>
        </div>
      </div>

      <div className='flex flex-col gap-6 md:gap-10 justify-start font-[Inter]'>
        <div className='bg-[#69E3CE] text-xl md:text-2xl font-medium text-black px-5 py-8 md:py-12 rounded-2xl'>
          <h1>Total Income: ${dashboardData ? `${dashboardData.totalIncome}` : '...'}</h1>
        </div>
        <div className='bg-[#69E3CE] text-xl md:text-2xl font-medium text-black px-5 py-8 md:py-12 rounded-2xl'>
          <h1>Total Withdraw: ${dashboardData ? `${dashboardData.totalWithdraw}` : '...'}</h1>
        </div>
      </div>

      <ul className='flex flex-col gap-2 bg-white px-5 py-6 rounded-2xl'>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Activation License - {dashboardData ? (dashboardData.activationLicense ? 'Active' : 'Inactive') : '...'}</li>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Date Of Joining - {dashboardData ? new Date(dashboardData.dateOfJoining).toLocaleDateString() : '...'}</li>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Date Of Activation - {dashboardData && dashboardData.dateOfActivation ? new Date(dashboardData.dateOfActivation).toLocaleDateString() : 'Inactive'}</li>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Mining Investment - ${dashboardData ? `${dashboardData.miningInvestment}` : '0'}</li>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Direct Referral - {dashboardData ? dashboardData.directReferral : '0'}</li>
        <li className='font-[Montserrat] font-semibold text-base md:text-xl'>Indirect Referral - {dashboardData ? dashboardData.indirectReferral : '0'}</li>
      </ul>
    </div>
  );
}

export default Dashboard;