import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../../../store/authStore';
import axios from '../../../api/axios';

const PackageWallet = () => {
    const { user, fetchUser } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        amount: '',
        transactionPassword: '',
        otp: ''
    });
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const toastId = 'activation-error';
        if (user && user.activationLicense === false) {
            if (!toast.isActive(toastId)) {
                toast.error('Activate your account first', { toastId });
            }
            navigate('/account_activation');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!formData.userId || !formData.amount || !formData.transactionPassword) {
            return toast.error('Please fill all fields before sending OTP.');
        }
        if (parseFloat(formData.amount) > (user?.packageWallet ?? 0)) {
            return toast.error('Insufficient package wallet balance.');
        }

        setIsLoading(true);
        try {
            await axios.post('/api/investment/send-otp', { 
                userId: formData.userId, 
                transactionPassword: formData.transactionPassword,
                amount: formData.amount,
                walletType: 'package' // Specify the wallet type
            });
            toast.success('OTP sent to your registered email/phone.');
            setIsOtpSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP. Please check details.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.otp) {
            return toast.error('Please enter the OTP.');
        }
        setIsLoading(true);
        try {
            const response = await axios.post('/api/investment/invest-from-package', {
                userId: formData.userId,
                amount: formData.amount,
                otp: formData.otp
            });
            toast.success(response.data.message || 'Investment successful!');
            fetchUser();
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Investment failed.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user || user.activationLicense === false) {
        return null;
    }

  return (
      <div className='w-full flex flex-col gap-6 p-10 '>

          <div className='flex flex-col justify-start items-start gap-2'>
              <h2 className='text-4xl font-medium capitalize font-[Inter]'>Minning Investment Using Package Wallet</h2>
          </div>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5'>
              <span className=' font-[Inter] flex justify-start items-start gap-2'><h2 className='text-[#2EB9A2] font-medium text-xl'> Notification :</h2><h2 className='w-[38vw] font-normal text-xl text-wrap  font-[Inter] text-[#494949] '>You can Invest and Reinvest Using Package Wallet
                  (Amount Should be In Multiples of $20). </h2></span>
              <div className='grid grid-cols-2 justify-start items-center gap-10 w-[60%] pt-8'>
                  <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3'>
                      <h2>Package Wallet Balance</h2>
                      <span className='text-[#2EB9A2]'>${user?.packageWallet?.toFixed(2) ?? '0.00'}</span>
                  </div>

              </div>
              <h2 className='text-3xl font-[Inter] font-medium py-3'>Fill Investment Details</h2>
              <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-6 font-[Inter]'>
                      <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>
                          <label htmlFor="userId" className='flex flex-col justify-start items-start gap-1'>
                              <span className='text-lg capitalize text-black font-light'>User Id</span>
                              <input type="text" name="userId" value={formData.userId} onChange={handleChange} className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter User Id' id="userId" />
                          </label>

                      </span>
                      <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>

                          <label htmlFor="amount" className='flex flex-col justify-start items-start gap-1'>
                              <span className='text-lg capitalize text-black font-light'>Investment Amount</span>
                              <input type="text" name="amount" value={formData.amount} onChange={handleChange} className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter Amount' id="amount" />
                          </label>
                      </span>
                      <label htmlFor="transactionPassword" className='flex flex-col justify-start items-start gap-1 w-[20vw]'>
                          <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
                          <input type="password" name="transactionPassword" value={formData.transactionPassword} onChange={handleChange} className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2' id="transactionPassword" />
                      </label>

                      {!isOtpSent ? (
                        <div className='flex justify-start'>
                            <button type="button" onClick={handleSendOtp} disabled={isLoading} className='border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in disabled:opacity-50'>
                                {isLoading ? 'Validating...' : 'Validate & Send OTP'}
                            </button>
                        </div>
                      ) : (
                        <>
                            <label htmlFor="otp" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-lg capitalize text-black font-light'>One Time Password</span>
                                <input type="password" name="otp" value={formData.otp} onChange={handleChange} className='outline-none w-[20vw] border border-[#00000066] rounded-sm placeholder:text-[#000000B2] p-2' id="otp" />
                            </label>
                            <div className='flex justify-start'>
                                <button type="submit" disabled={isLoading} className='border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in disabled:opacity-50'>
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </>
                      )}
                  </div>
              </form>
          </div>
      </div>
  )
}

export default PackageWallet;
