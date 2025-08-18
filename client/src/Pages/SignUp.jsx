import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';


const SignUp = () => {
    const { signup, isAuthenticated, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        mobile: '',
        email: '',
        password: '',
        passwordCheck: '',
        referralCode: '',
        turnstileToken: 'placeholder-turnstile-token', // Replace with actual token
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordCheck) {
            alert("Passwords don't match");
            return;
        }
        signup(formData);
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className='w-full px-10 bg-[#31B8A1]'>
            <div className='grid grid-cols-2'>
                <div className='bg-[#CCFFF6] rounded-tl-[60px] rounded-bl-[60px]'>
                    <div className='flex items-center justify-center'><img className='w-[20rem] pt-2.5' src={logo} alt="" /></div>
                </div>
                <div className='flex flex-col gap-6 pt-32 bg-white rounded-tr-[60px] rounded-br-[60px] px-5 py-10'>
                    <h1 className='font-medium text-4xl capitalize'>create account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="name" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-sm capitalize text-black font-medium'>name</span>
                                <input type="text" onChange={handleChange} value={formData.name} name="name" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='enter full name' />
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <label htmlFor="country" className='flex flex-col justify-start items-start gap-1'>
                                    <span className='text-sm capitalize text-black font-medium'>country</span>
                                    <input type="text" onChange={handleChange} value={formData.country} name="country" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='select country' />
                                </label>
                                <label htmlFor="mobile" className='flex flex-col justify-start items-start gap-1'>
                                    <span className='text-sm capitalize text-black font-medium'>mobile</span>
                                    <input type="tel" onChange={handleChange} value={formData.mobile} name="mobile" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='enter your mobile' />
                                </label>
                            </div>
                            <label htmlFor="email" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-sm capitalize text-black font-medium'>email</span>
                                <input type="email" onChange={handleChange} value={formData.email} name="email" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='enter your email' />
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <label htmlFor="password" className='flex flex-col justify-start items-start gap-1'>
                                    <span className='text-sm capitalize text-black font-medium'>password</span>
                                    <input type="password" onChange={handleChange} value={formData.password} name="password" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='Enter Password' />
                                </label>
                                <label htmlFor="passwordCheck" className='flex flex-col justify-start items-start gap-1'>
                                    <span className='text-sm capitalize text-black font-medium'>Confirm Password</span>
                                    <input type="password" onChange={handleChange} value={formData.passwordCheck} name="passwordCheck" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='Enter Confirm Pass' />
                                </label>
                            </div>
                            <label htmlFor="referralCode" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-sm capitalize text-black font-medium'>Referral Code</span>
                                <input type="text" onChange={handleChange} value={formData.referralCode} name="referralCode" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='' />
                            </label>
                            
                            <div className='w-full'><button type="submit" disabled={loading} className='bg-[#31B8A1] w-full rounded-3xl capitalize text-white font-medium text-lg px-3 py-3 scale-100 hover:scale-95 transition-all ease-out'>{loading ? 'Signing up...' : 'sign up'}</button></div>
                            <span><span className='font-medium text-lg'>Already Have An Account? </span><Link to="/login"> <span className='text-[#31B8A1] capitalize hover:underline '>sign in</span></Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
