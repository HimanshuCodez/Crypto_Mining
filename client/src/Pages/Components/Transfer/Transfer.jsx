import React from 'react'

const Transfer = () => {
  return (
      <div className='w-full flex flex-col gap-6 p-10 font-[Montserrat] '>
          <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
              <h2 className='text-4xl font-medium capitalize font-[Inter]'>Transport Report</h2>
              <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                  <a href="/Transfer">Transfer</a><span>/</span><a href="/Transport Report " className='text-[#02AC8F]'>Transport Report <address></address></a>
              </nav>
          </div>
          <div className='font-[Inter] font-medium text-white bg-[#2EB9A2BF] flex justify-between items-center px-5 rounded-xl py-2'><h1 className='text-sm capitalize'>total amount</h1>
          <button className='border border-white  text-xs p-2 rounded-sm '>Filter</button></div>
          <div className='w-full bg-white p-5 rounded-xl flex justify-between items-center '>
            <div className='flex  gap-10 font-[Inter]'>
<span className='px-20 py-1 border rounded-lg font-normal text-lg '>3/08/25</span>
                  <span className='px-20 py-1 border rounded-lg font-normal text-lg '>3/08/25</span></div>
              <div className='flex justify-end'><button className='border-[#31B8A1]  rounded-lg capitalize border text-[#31B8A1] font-semibold  font-[Montserrat] text-lg px-4 py-1 scale-100 hover:scale-105 transition-all ease-in'>submit</button></div>
          </div>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
              <h2 className='text-xl font-medium font-[Inter]'>Transport Report </h2>
              <div className='flex justify-between items-center w-full'>
                  <span className='flex items-center gap-2'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>show:</h5>
                      <input type="text" className='outline-none border capitalize bg-white rounded-sm w-[6vw] px-2' />
                  </span>
                  <span className='flex items-center gap-2'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>Entries:</h5>
                      <input type="text" className='outline-none border capitalize bg-white rounded-sm w-[6vw] px-2' />
                  </span>
              </div>
              <div className='bg-[#F7F7F7]   py-3 px-8  pb-10 rounded-sm w-full'>
                  <div className='grid grid-cols-6 gap-6 text-lg font-medium '>
                      <div>#</div>
                      <div>User ID</div>
                      <div>Transfer Amount</div>
                      <div className="text-center">Receive Amount</div>
                      <div className="text-center">Mode</div>
                      <div>Date</div>
                  </div>
                  <div className='grid grid-cols-6 gap-4 py-3 text-gray-500'>
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                      <div className="text-center">-</div>
                      <div className="text-center">-</div>

                  </div>

              </div>
          </div>
          <div className='bg-[#FFFFFF] flex justify-between items-start rounded-b-3xl p-5'>
              <h2 className='text-lg font-medium text-[#000000B2]'>Showing 0 to 0 of 0 entries</h2>
              <span className='flex gap-4'>
                  <button className='text-sm border border-dashed border-[#68EDFE] px-3 py-2 font-normal'>Previous</button>
                  <button className='text-sm border border-dashed border-[#68EDFE] px-6 py-2 font-normal'>Next</button>
              </span>
          </div>
      </div>
  )
}

export default Transfer