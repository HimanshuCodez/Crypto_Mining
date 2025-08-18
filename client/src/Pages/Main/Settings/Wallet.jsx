import React from 'react'

const Wallet = () => {
    return (

        <div className='w-full flex flex-col gap-6 p-10 '>

            <div className='flex flex-col justify-start items-start gap-2'>
                <h2 className='text-4xl font-medium capitalize font-[Inter]'>Wallet  Address</h2>
                <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                    <a href="/setting">setting</a><span>/</span><a href="/wallet" className='text-[#02AC8F]'>wallet <address></address></a>
                </nav>
            </div>
            <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5'>
                <h2 className='font-normal text-xl capitalize font-[Inter] text-[#494949] '>Add New USDT.BEP20 Address to Receive Profits</h2>
                <form action="get">
                    <div className='flex flex-col gap-6 font-[Inter]'>
                        <label htmlFor="wallet" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-lg capitalize text-black font-light'>select wallet</span>
                            <input type="text" className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='USDT.BEP20' name="" id="" />
                        </label>
                        <label htmlFor="address" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-lg capitalize text-black font-light'>Address</span>
                            <input type="text" className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder="Enter Wallet Address" />
                        </label>
                        <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-[20vw]'>
                            <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
                            <input type="password" className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2' />
                        </label>
                        <label htmlFor="password" className='flex flex-col justify-start items-start gap-1'>
                            <span className='text-lg capitalize text-black font-light'>one time password</span>
                            <span className='text-sm font-light flex w-[20vw]'><input type="password" className='outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2' /><div className='border rounded-r-sm border-l-[#00000066] w-[10vw] flex items-center  justify-center'>Send OTP</div></span>
                        </label>

                        <div className='flex justify-start'><button className='border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in'>submit</button></div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Wallet