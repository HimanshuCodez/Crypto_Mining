import React from 'react'

const ToPackageWallet = () => {
  return (
      <div className='w-full flex flex-col gap-6 p-10 font-[Inter]'>

          <div className='flex flex-col justify-start items-start gap-2'>
              <h2 className='text-4xl font-medium capitalize font-[Inter]'>Transfer To Package Wallet</h2>
              <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                  <a href="/Transfer">Transfer</a><span>/</span><a href="/wallet" className='text-[#02AC8F]'>Transfer To Package Wallet <address></address></a>
              </nav>
          </div>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5'>
            
              <div className='grid grid-cols-2 justify-start items-center gap-10 w-[60%] '>
                  <div className='font-[Inter] font-medium text-2xl flex flex-col gap-3 border rounded-lg p-3'>
                      <h2>Package Wallet</h2>
                      <span className='text-[#2EB9A2]'>$0</span>
                  </div>

              </div>
              <h2 className='text-3xl font-[Inter] font-medium py-3'>Package Wallet Details</h2>
              <form action="get">
                  <div className='flex flex-col gap-6 font-[Inter]'>
                      <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>
                          <label htmlFor="userid" className='flex flex-col justify-start items-start gap-1'>
                              <span className='text-lg capitalize text-black font-light'>User Id</span>
                              <input type="text" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter User Id' name="" id="" />
                          </label>

                      </span>
                      <span className='grid grid-cols-2 w-[45vw] justify-start gap-10'>

                          <label htmlFor="mode" className='flex flex-col justify-start items-start gap-1'>
                              <span className='text-lg capitalize text-black font-light'>Investment Amount</span>
                              <input type="text" className='outline-none w-full border border-black rounded-lg placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2' placeholder='Enter Amount' name="" id="" />
                          </label>
                      </span>
                      <label htmlFor="password" className='flex flex-col justify-start items-start gap-1 w-[20vw]'>
                          <span className='text-lg capitalize text-black font-light'>Transaction Password</span>
                          <input type="password" className='outline-none w-full border border-[#00000066] rounded-sm placeholder:text-[#000000B2]  p-2' />
                      </label>
                      <label htmlFor="password" className='flex flex-col justify-start items-start gap-1'>
                          <span className='text-lg capitalize text-black font-light'>one time password</span>
                          <span className='text-sm font-light flex w-[20vw]'><input type="password" className='outline-none w-full border border-[#00000066] rounded-l-sm placeholder:text-[#000000B2]  p-2' /><div className='border rounded-r-sm border-l-[#00000066] w-[10vw] flex items-center  justify-center'>Send OTP</div></span>
                      </label>
                      <label htmlFor="verify" className='flex justify-start items-center gap-1'>
                          <input type="checkbox" name="" id="" /><span className='text-[#31B8A1] font-semibold  font-[Montserrat] text-sm'>Verify</span>
                      </label>
                      <div className='flex justify-start'><button className='border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-6 py-2 scale-100 hover:scale-105 transition-all ease-in'>submit</button></div>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default ToPackageWallet