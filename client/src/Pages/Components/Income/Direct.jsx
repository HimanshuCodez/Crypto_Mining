import React from 'react';

const Direct = () => {
  return (
    <div className='w-full flex flex-col gap-6 p-4 md:p-10 font-[Montserrat]'>
      <div className='flex flex-col justify-start items-start gap-2 font-[Inter]'>
        <h2 className='text-3xl md:text-4xl font-medium capitalize'>Direct Referral</h2>
        <nav className='flex items-center gap-1 capitalize font-light text-sm'>
          <a href="/Income">Income</a>
          <span>/</span>
          <a href="/Direct Refral" className='text-[#02AC8F]'>Direct Referral</a>
        </nav>
      </div>

      <div className='bg-white w-full rounded-3xl px-4 py-6 md:px-5 md:py-10 flex flex-col gap-5'>
        <h2 className='text-lg md:text-xl font-medium font-[Inter]'>Direct Referral List</h2>
        
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4'>
          <div className='flex items-center gap-2'>
            <h5 className='text-gray-600 capitalize text-base md:text-lg font-medium'>Show:</h5>
            <input type="text" className='outline-none border capitalize bg-white rounded-md w-24 px-2 py-1' />
          </div>
          <div className='flex items-center gap-2'>
            <h5 className='text-gray-600 capitalize text-base md:text-lg font-medium'>Search:</h5>
            <input type="text" className='outline-none border capitalize bg-white rounded-md w-40 px-2 py-1' />
          </div>
        </div>

        <div className='overflow-x-auto'>
          <div className='bg-gray-50 py-3 px-4 md:px-8 pb-10 rounded-lg w-full min-w-[600px]'>
            <div className='grid grid-cols-5 gap-6 text-base md:text-lg font-medium text-gray-800'>
              <div>#</div>
              <div>User ID</div>
              <div>Name</div>
              <div className="text-center">Investment Amount</div>
              <div className="text-center">Received Amount</div>
            </div>
            <div className='grid grid-cols-5 gap-4 py-3 text-gray-500 mt-2 border-t'>
              {/* Example Row - This should be mapped from data */}
              <div>1</div>
              <div>user-123</div>
              <div>John Doe</div>
              <div className="text-center">$500</div>
              <div className="text-center">$50</div>
            </div>
            <div className='grid grid-cols-5 gap-4 py-3 text-gray-500 border-t'>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div className="text-center">-</div>
              <div className="text-center">-</div>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-4'>
          <h2 className='text-base md:text-lg font-medium text-gray-600'>Showing 0 to 0 of 0 entries</h2>
          <div className='flex gap-2 sm:gap-4'>
            <button className='text-sm border border-dashed border-[#68EDFE] px-3 py-2 font-normal rounded-md'>Previous</button>
            <button className='text-sm border border-dashed border-[#68EDFE] px-6 py-2 font-normal rounded-md'>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Direct;