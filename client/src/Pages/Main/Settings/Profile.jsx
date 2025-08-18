import React from 'react'
import Navbar from '../../../Navbar/Navbar'

const Profile = () => {
    return (
        <div className='w-full flex flex-col gap-6 p-10 '>

            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>profile</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/">home</a><span>/</span><a href="/settings">settings</a><span>/</span><a href="/profile" className='text-[#02AC8F]'>profile</a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-4xl p-10'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='rounded-full text-xl w-[10rem] h-[10rem] border border-[#31B8A1]'></div>
                    <span className='flex flex-col justify-center items-center '>
                        <h2 className=' font-semibold'>Imraan</h2>
                        <h2 className='font-medium '>Imraan@gmail.com</h2>
                    </span>
                </div>
                <form action="get">
                    <div className='flex flex-col gap-6'>
                        <label htmlFor="name" className='flex flex-col justify-start items-start gap-2'>
                            <span className='text-sm capitalize text-black font-medium'>name</span>
                            <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full '></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="" id="" /></span>
                        </label>
                        <span className='grid grid-cols-2  items-center w-full gap-6'>
                            <label htmlFor="email" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Email</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full '></div> <input type="email" className='outline-none w-full border rounded-r-full p-2' name="" id="" /></span>
                            </label>
                            <label htmlFor="country" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Country</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full '></div> <input type="text" className='outline-none w-full border rounded-r-full p-2' name="" id="" /></span>
                            </label>
                        </span>
                        <span className='grid grid-cols-2  items-center w-full gap-6'>
                            <label htmlFor="tel" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>mobile</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full '></div> <input type="tel" className='outline-none w-full border rounded-r-full p-2' name="" id="" /></span>
                            </label>
                            <label htmlFor="country" className='flex flex-col justify-start items-start gap-2'>
                                <span className='text-sm capitalize text-black font-medium'>Transaction password</span>
                                <span className='flex w-full'><div className='w-20 p-2 border border-r-[#F4F4F4] bg-[#F4F4F4] rounded-l-full '></div> <input type="password" className='outline-none w-full border rounded-r-full p-2' name="" id="" /></span>
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