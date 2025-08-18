import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuthStore from '../store/authStore.js';
import Turnstile from 'react-turnstile';

const Login = () => {
    const { login, isAuthenticated, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        turnstileToken: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.turnstileToken) {
            alert("Please verify you are not a robot.");
            return;
        }
        login(formData);
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className='w-full min-h-screen px-4 sm:px-10 bg-[#31B8A1] flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full'>
                <div className='bg-[#CCFFF6] rounded-t-lg md:rounded-tr-none md:rounded-l-lg flex items-center justify-center p-8'>
                    <img className='w-48 sm:w-64' src={logo} alt="" />
                </div>
                <div className='flex flex-col gap-6 bg-white rounded-b-lg md:rounded-bl-none md:rounded-r-lg px-5 py-10'>
                    <h1 className='font-medium text-3xl sm:text-4xl capitalize text-center md:text-left'>Welcome To Cryptominning</h1>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="email" className='flex flex-col justify-start items-start gap-1'>
                                <span className='text-sm capitalize text-black font-medium'>email</span>
                                <input type="email" onChange={handleChange} value={formData.email} name="email" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='enter your email' />
                            </label>
                            <div className='flex items-center justify-between w-full'>
                                <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-full'>
                                    <span className='flex justify-between items-center w-full'><span className='text-sm capitalize text-black font-medium'>password</span><span className='text-[#2EB9A2] text-sm font-medium hover:underline'>password?</span></span>
                                    <input type="password" onChange={handleChange} value={formData.password} name="password" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='Enter Password' />
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="rememberMe" id="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="h-4 w-4" />
                                <label htmlFor="rememberMe" className="text-sm">Remember me</label>
                            </div>
                            <Turnstile
                                sitekey="0x4AAAAAABs1naScd1VDLrsX" // Replace with your site key
                                onVerify={(token) => setFormData({ ...formData, turnstileToken: token })}
                            />
                            <div className='w-full'><button type="submit" disabled={loading} className='bg-[#31B8A1] w-full rounded-3xl capitalize text-white font-medium text-lg px-3 py-3 scale-100 hover:scale-95 transition-all ease-out'>{loading ? 'Signing in...' : 'sign in'}</button></div>
                            <span className="text-center"><span className='font-medium text-lg'>Don't Have Your Account yet? </span><Link to="/"> <span className='text-[#31B8A1] capitalize hover:underline'>sign up</span></Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
