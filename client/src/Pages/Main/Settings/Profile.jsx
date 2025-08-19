import React, { useEffect, useState } from 'react'
import Navbar from '../../../Sidebar/Sidebar'
import useAuthStore from '../../../store/authStore'
import axios from 'axios';
import { FaUser, FaEnvelope, FaGlobe, FaMobileAlt, FaLock } from 'react-icons/fa'; // Import icons

const Profile = () => {
    const { user, setUser } = useAuthStore(); // Destructure setUser from the store
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('Not Available'); // Add transactionPassword state

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile');
                setUser(response.data); // Update the user in the Zustand store
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                // Optionally, handle error, e.g., redirect to login or show a message
            }
        };

        if (!user) { // Only fetch if user is not already in the store
            fetchProfile();
        } else { // If user is already in the store, populate form fields
            setName(user.name || '');
            setEmail(user.email || '');
            setCountry(user.country || '');
            setMobile(user.mobile || '');
            // transactionPassword is not from user, so it remains "Not Available"
        }
    }, [user, setUser]); // Add setUser to dependency array

    return (
        <div className='w-full flex flex-col gap-6 p-4 sm:p-6 md:p-10'> {/* Adjusted padding */}

            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>profile</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/">home</a><span>/</span><a href="/settings">settings</a><span>/</span><a href="/profile" className='text-[#02AC8F]'>profile</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-4xl p-10'> {/* Changed bg-amber-800 to bg-[#FFFFFF] */}
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='rounded-full text-xl w-[10rem] h-[10rem] border border-[#31B8A1]'></div>
                    <span className='flex flex-col justify-center items-center '>
                        <h2 className=' font-semibold'>{name}</h2>
                        <h2 className='font-medium '>{email}</h2>
                    </span>
                </div>
                <form action="get">
                    <div className='flex flex-col gap-6'>
                        <label htmlFor="name" className='flex flex-col justify-start items-start gap-2'>
                            <span className='text-sm capitalize text-black font-medium'>name</span>
                            <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaUser className='text-[#31B8A1]' /></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /></span>
                        </label>
                        <span className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center w-full gap-6'> {/* Adjusted grid columns */}
                            <label htmlFor="email" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Email</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaEnvelope className='text-[#31B8A1]' /></div> <input type="email" className='outline-none w-full border rounded-r-full p-2' name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></span>
                            </label>
                            <label htmlFor="country" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Country</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaGlobe className='text-[#31B8A1]' /></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} /></span>
                            </label>
                        </span>
                        <span className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center w-full gap-6'> {/* Adjusted grid columns */}
                            <label htmlFor="tel" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>mobile</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaMobileAlt className='text-[#31B8A1]' /></div> <input type="tel" className='outline-none w-full border rounded-r-full p-2' name="mobile" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} /></span>
                            </label>
                            <label htmlFor="transactionPassword" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Transaction password</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full flex items-center justify-center'><FaLock className='text-[#31B8A1]' /></div> <input type="password" className='outline-none w-full border rounded-r-full p-2' name="transactionPassword" id="transactionPassword" value={transactionPassword} readOnly /></span>
                            </label>
                        </span>
                        <div className='flex justify-end'><button className='bg-[#31B8A1]  rounded-3xl capitalize text-black font-medium text-lg px-8 py-2 scale-100 hover:scale-105 transition-all ease-in'>update</button></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile