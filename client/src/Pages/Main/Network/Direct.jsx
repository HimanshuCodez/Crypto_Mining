import React from 'react'

const Direct = () => {
  return (
      <div className='w-full flex flex-col gap-6 p-10 font-[Montserrat] '>
          <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
              <h2 className='text-4xl font-medium capitalize font-[Inter]'>Direct Refral</h2>
              <nav className='flex items-center gap-1 capitalize font-light text-sm font-[Inter]'>
                  <a href="/Network">Network</a><span>/</span><a href="/Direct Refral" className='text-[#02AC8F]'>Direct Refral <address></address></a>
              </nav>
          </div>
          <div className='bg-[#FFFFFF] w-full rounded-3xl px-5 py-10 flex flex-col gap-5 '>
              <h2 className='text-xl font-medium font-[Inter]'>Direct Refral </h2>
              <div className='flex justify-between items-center w-full'>
                <span className='flex items-center gap-2'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>show:</h5>
                    <input type="text" className='outline-none border capitalize bg-white rounded-sm w-[6vw] px-2' />
                </span>
                  <span className='flex items-center gap-2'>
                      <h5 className='text-[#000000B2] capitalize text-lg font-medium '>search:</h5>
                      <input type="text" className='outline-none border capitalize bg-white rounded-sm w-[6vw] px-2' />
                  </span>
              </div>
              <div className='bg-[#F7F7F7]   py-3 px-8  pb-10 rounded-sm w-full'>
                  <div className='grid grid-cols-5 gap-6 text-lg font-medium '>
                      <div>#</div>
                      <div>User ID</div>
                      <div>Name</div>
                      <div className="text-center">Investment Amount</div>
                      <div className="text-center">Wallet Used (Income/Package)</div>
      </div>
                  <div className='grid grid-cols-5 gap-4 py-3 text-gray-500'>
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

export default Direct