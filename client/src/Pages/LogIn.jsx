import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
const Login = () => {
  return (
   <div className='w-full  px-10 bg-[#31B8A1]'>
<div className='grid grid-cols-2'>
<div className='  bg-[#CCFFF6] rounded-tl-[60px] rounded-bl-[60px]
'>
<div className='flex items-center justify-center'><img className='w-[20rem] pt-2.5 ' src={logo} alt="" /></div>
</div>
{/* SIGN-UP FORM */}
<div className='  flex flex-col gap-6 pt-32 bg-white rounded-tr-[60px] rounded-br-[60px] px-5 py-10'>
<h1 className='font-medium text-4xl capitalize'>Welcome To Cryptominning </h1>
<form action="get">
<div className='flex flex-col gap-5'>
  <label htmlFor="name" className='flex flex-col justify-start items-start gap-1'>
    <span className='text-sm capitalize text-black font-medium'>name</span>
    <input type="text" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='enter full name' name="" id="" />
  </label>

  <div className='flex items-center justify-between w-full'>
  <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-full'>
   <span className='flex justify-between items-center w-full'><span className='text-sm capitalize text-black font-medium'>password</span><span className='text-[#2EB9A2] text-sm font-medium hover:underline'>password?</span></span> 
    <input type="password" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='Enter Password' name="" id="" />
  </label>
</div>
  <div className='flex justify-end items-end'>
  <label htmlFor="captcha" className=' gap-1'>  
    <input type="text" className='outline-none w-full border rounded-2xl placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm p-2' placeholder='Enter Captcha Code ' name="" id="" />
  </label>
  </div>
  <a href=""><h1 className='text-sm font-bold capitalize'>reload captcha</h1></a>
  <label className='flex flex-row-reverse justify-end items-center gap-1'>
    <span className='text-sm capitalize text-black font-medium'>Remember me</span>
    <input type="checkbox" className='outline-none  border rounded-2xl  p-2' name="" id="" />
  </label> 
  <div className='text-[#000000AB] bg-[#F2F2F2] w-[20vw] border-[#000000AB] border-[0.5px] '>
<label className='flex flex-row-reverse justify-end items-center gap-3 px-3 py-4'>
    <span className='text-sm capitalize text-black font-bold'>verifcation</span>
    <span className='w-5 h-5 rounded-full bg-[#D9D9D9]'></span>
  </label> 
  </div>
    <div className='w-full'><button className='bg-[#31B8A1] w-full rounded-3xl capitalize text-white font-medium text-lg px-3 py-3 scale-100 hover:scale-95 transition-all ease-out'>sign up </button></div>
    <span><span className='font-medium text-lg'>Don't Have Your Account yet? </span><Link to="/dashboard"> <span className='text-[#31B8A1] capitalize hover:underline  '>sign in</span></Link></span>
</div>
</form>
</div>
</div>
    </div>
  )
}

export default Login