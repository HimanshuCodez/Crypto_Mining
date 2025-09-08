import React from 'react'

const Indirect = () => {
  return (
      <div className='w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat] '>
          <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
              <h2 className='text-2xl md:text-4xl font-medium capitalize font-[Inter]'>Indirect Referral</h2>
              <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                  <a href="/Income">Income</a><span>/</span><a href="/Direct Refral" className='text-[#02AC8F]'>Indirect Referral<address></address></a>
              </nav>
          </div>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
              <h2 className='text-xl font-medium font-[Inter]'>Direct Referral </h2>
              <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>
                  <span className='flex items-center gap-2 w-full md:w-auto'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>show:</h5>
                      <input type="text" className='outline-none border capitalize bg-white rounded-sm w-full md:w-[6vw] px-2' />
                  </span>
                  <span className='flex items-center gap-2 w-full md:w-auto'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>search:</h5>
                      <input type="text" className='outline-none border capitalize bg-white rounded-sm w-full md:w-[6vw] px-2' />
                  </span>
              </div>
              <div className='bg-[#F7F7F7] py-3 px-4 md:px-8 pb-10 rounded-sm w-full overflow-x-auto'>
                  <div className='hidden md:grid grid-cols-5 gap-6 text-lg font-medium '>
                      <div>#</div>
                      <div>User ID</div>
                      <div>Name</div>
                      <div className="text-center">Investment Amount</div>
                      <div className="text-center"></div>
                  </div>
                  <div className='flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 py-3 text-gray-500 border-b md:border-b-0'>
                      {/* Mobile view */}
                      <div className="md:hidden flex justify-between items-center">
                          <span className="font-medium text-black">#</span>
                          <span>-</span>
                      </div>
                      <div className="md:hidden flex justify-between items-center">
                          <span className="font-medium text-black">User ID:</span>
                          <span>-</span>
                      </div>
                      <div className="md:hidden flex justify-between items-center">
                          <span className="font-medium text-black">Name:</span>
                          <span>-</span>
                      </div>
                      <div className="md:hidden flex justify-between items-center">
                          <span className="font-medium text-black">Investment Amount:</span>
                          <span>-</span>
                      </div>
                      <div className="md:hidden flex justify-between items-center">
                          <span className="font-medium text-black">Status:</span>
                          <span>-</span>
                      </div>

                      {/* Desktop view */}
                      <div className="hidden md:block">-</div>
                      <div className="hidden md:block">-</div>
                      <div className="hidden md:block">-</div>
                      <div className="hidden md:block text-center">-</div>
                      <div className="hidden md:block text-center">-</div>
                  </div>
              </div>
          </div>
          <div className='bg-[#FFFFFF] flex justify-between items-start rounded-b-3xl p-4 md:p-5'>
              <h2 className='text-lg font-medium text-[#000000B2]'>Showing 0 to 0 of 0 entries</h2>
              <span className='flex gap-4'>
                  <button className='text-sm border border-dashed border-[#68EDFE] px-3 py-2 font-normal'>Previous</button>
                  <button className='text-sm border border-dashed border-[#68EDFE] px-6 py-2 font-normal'>Next</button>
              </span>
          </div>
      </div>
  )
}

export default Indirect