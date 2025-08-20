import React from 'react'

const Wallet = () => {
  return (
    <div className=" flex w-[78vw] flex-col   gap-6 p-6 md:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-medium capitalize font-[Inter]">
          Wallet Address
        </h2>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
          <a href="/setting">setting</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F]">wallet address</a>
        </nav>
      </div>

      {/* Wallet Form Card */}
      <div className="bg-white w-full rounded-3xl px-5 py-10 flex flex-col gap-6 shadow">
        <h2 className="font-normal text-xl capitalize font-[Inter] text-[#494949]">
          Add New USDT.BEP20 Address to Receive Profits
        </h2>

        <form className="flex flex-col gap-6 font-[Inter]">
          {/* Wallet Selection */}
          <label className="flex flex-col gap-1">
            <span className="text-lg capitalize text-black font-light">
              Select wallet
            </span>
            <input
              type="text"
              placeholder="USDT.BEP20"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
            />
          </label>

          {/* Wallet Address */}
          <label className="flex flex-col gap-1">
            <span className="text-lg capitalize text-black font-light">
              Address
            </span>
            <input
              type="text"
              placeholder="Enter Wallet Address"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] placeholder:capitalize placeholder:text-sm placeholder:font-extralight p-2"
            />
          </label>

          {/* Transaction Password */}
          <label className="flex flex-col gap-1 max-w-md">
            <span className="text-lg capitalize text-black font-light">
              Transaction Password
            </span>
            <input
              type="password"
              className="outline-none w-full border border-[#00000066] rounded-md placeholder:text-[#000000B2] p-2"
            />
          </label>

          {/* OTP */}
          <label className="flex flex-col gap-1 max-w-md">
            <span className="text-lg capitalize text-black font-light">
              One time password
            </span>
            <div className="flex w-full">
              <input
                type="password"
                className="outline-none flex-1 border border-[#00000066] rounded-l-md placeholder:text-[#000000B2] p-2"
              />
              <button
                type="button"
                className="border border-[#00000066] border-l-0 rounded-r-md px-4 flex items-center justify-center text-sm"
              >
                Send OTP
              </button>
            </div>
          </label>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="border-[#31B8A1] rounded-lg capitalize border text-[#31B8A1] font-semibold font-[Montserrat] text-lg px-6 py-2 hover:scale-105 transition-all ease-in"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Wallet
