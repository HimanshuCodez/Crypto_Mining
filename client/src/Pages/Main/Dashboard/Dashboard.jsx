import React, { useEffect, useState } from 'react';
import bg from '../../../assets/dash-bg.png';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const response = await axios.get(`/api/user/${user.id}/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
        <div className=' flex flex-col gap-10 p-10 w-[70vw] '>
          <h2 className=' text-4xl font-medium capitalize font-[Inter]'>Dashboard</h2>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col  font-[Montserrat] ' >
              <h1 className='text-xl font-medium '>Referral Link</h1>
              <span className='flex items-center justify-start gap-3'>
                  <h6 className='font-normal text-sm '>{dashboardData ? dashboardData.referralLink : 'Loading...'}</h6>
                  <button className='border border-dashed px-3 p-1 font-semibold text-[#31B8A1] border-[#31B8A1]'>copy</button>
              </span>
          </div>
          <div className='flex gap-12 items-center justify-start font-[Inter]'>
              <div className='w-full px-5  py-2 rounded-2xl' style={{
                backgroundImage: `url(${bg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat' , width:'20vw', height:'13vh'}}>
                  <h1 className='text-2xl font-medium text-white text-start'>Income Wallet</h1>
                  <p className='text-white'>{dashboardData ? `${dashboardData.incomeWallet}` : '...'}</p>
            </div>
              <div className='w-full px-5  py-2 rounded-2xl' style={{
                  backgroundImage: `url(${bg})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat', width: '20vw', height: '13vh'
              }}>
                  <h1 className='text-2xl font-medium text-white text-start'>Package Wallet</h1>
                  <p className='text-white'>{dashboardData ? `${dashboardData.packageWallet}` : '...'}</p>
              </div>
          </div>
          <div className='flex flex-col gap-10  justify-start font-[Inter]'>
              <div className='bg-[#69E3CE] text-2xl font-medium text-black px-5 pt-3 pb-16 rounded-2xl text-start font-[Inter]'>
                  <h1>Total Income: {dashboardData ? `${dashboardData.totalIncome}` : '...'}</h1>
            </div>
              <div className='bg-[#69E3CE] text-2xl font-medium text-black px-5 pt-3 pb-16 rounded-2xl text-start font-[Inter]'>
                  <h1>Total Withdraw: {dashboardData ? `${dashboardData.totalWithdraw}` : '...'}</h1>
              </div>
          </div>
          <ul className='flex flex-col bg-white px-5 py-2 rounded-2xl'>
              <li className='font-[Montserrat] font-semibold text-xl'>Activation License - {dashboardData ? (dashboardData.activationLicense ? 'Active' : 'In Active') : '...'} </li>
              <li className='font-[Montserrat] font-semibold text-xl'>Date Of Joining - {dashboardData ? new Date(dashboardData.dateOfJoining).toLocaleDateString() : '...'} </li>
              <li className='font-[Montserrat] font-semibold text-xl'>Date Of Actiavtion - {dashboardData && dashboardData.dateOfActivation ? new Date(dashboardData.dateOfActivation).toLocaleDateString() : 'In Active'} </li>
              <li className='font-[Montserrat] font-semibold text-xl'>Minning Investment - {dashboardData ? `${dashboardData.miningInvestment}` : '0'} </li>
              <li className='font-[Montserrat] font-semibold text-xl'>Direct Refral - {dashboardData ? dashboardData.directReferral : '0'} </li>
              <li className='font-[Montserrat] font-semibold text-xl'>Indirect Refral - {dashboardData ? dashboardData.indirectReferral : '0'} </li>
          </ul>
    </div>
  )
}

export default Dashboard