import React, { useState } from "react";

const DepositUsdt = () => {
  const [usdtAddress, setUsdtAddress] = useState("");
  const [sendingAddress, setSendingAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      usdtAddress,
      sendingAddress,
      amount,
      password,
      verify,
    });
  };

  return (
    <div className="min-h-screen w-[78vw] flex flex-col gap-6 md:p-10  bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-1">Deposite Usdt</h1>
      <p className="text-sm text-gray-500 mb-2">
        Deposite / <span className="text-cyan-600">Deposite Usdt</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full bg-white p-8 shadow rounded"
      >
        <h2 className=" font-semibold text-2xl text-gray-800">Fill Details</h2>

        {/* USDT Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Address
          </label>
          <input
            type="text"
            placeholder="USDT ADDRESS"
            value={usdtAddress}
            onChange={(e) => setUsdtAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Sending Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address to Sending USDT:
          </label>
          <input
            type="text"
            placeholder="Select Address"
            value={sendingAddress}
            onChange={(e) => setSendingAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (USDT)
          </label>
          <input
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Id Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Verify */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="verify"
            checked={verify}
            onChange={(e) => setVerify(e.target.checked)}
            className="h-4 w-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
          />
          <label htmlFor="verify" className="ml-2 text-sm text-gray-700">
            Verify
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DepositUsdt;
