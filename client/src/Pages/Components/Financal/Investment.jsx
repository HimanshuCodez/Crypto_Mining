import React, { useState, useEffect } from "react";
import useAuthStore from "../../../store/authStore";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Investment = () => {
  const { user } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [wallets, setWallets] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get("/withdrawals/mining");
      setWithdrawals(response.data);
    } catch (error) {
      toast.error("Failed to fetch withdrawals");
    }
  };

  const fetchWallets = async () => {
    try {
      const response = await api.get("/user/wallets");
      setWallets(response.data);
    } catch (error) {
      console.error("Error fetching wallets", error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    if (user) {
      fetchWallets();
    }
  }, [user]);

  const handleSendOtp = async () => {
    if (!password) {
      toast.error("Please enter your transaction password");
      return;
    }
    setIsSendingOtp(true);
    try {
      await api.post("/otp/send-withdrawal-otp", { password });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > user.miningInvestment) {
      toast.error("Amount exceeds mining investment balance");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/withdrawals/mining", {
        amount,
        walletAddress,
        password,
        otp,
      });
      toast.success(response.data.message);
      setAmount("");
      setWalletAddress("");
      setPassword("");
      setOtp("");
      setOtpSent(false);
      fetchWithdrawals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 font-['Inter']">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-3xl font-medium capitalize">
          Withdraw Mining Investment
        </h2>
        <nav className="flex items-center gap-1 text-sm md:text-base font-light">
          <a href="/Transfer">Financial</a>
          <span>/</span>
          <a href="/wallet" className="text-[#02AC8F] truncate">
            Withdraw Mining Investment
          </a>
        </nav>
      </div>

      <div className="bg-white rounded-3xl px-4 md:px-6 py-6 md:py-10 flex flex-col gap-5 shadow-sm">
        {/* Balance */}
        <div className="font-medium text-lg md:text-2xl flex flex-col gap-2 border rounded-lg p-3 w-full md:w-fit">
          <h2>Mining Investment Balance</h2>
          <span className="text-[#2EB9A2] text-lg md:text-2xl">
            ${user?.miningInvestment?.toFixed(2) ?? "0.00"}
          </span>
        </div>

        {/* Notification */}
        <div className="flex flex-col md:flex-row gap-2 items-start">
          <h2 className="text-[#2EB9A2] font-medium text-base md:text-lg whitespace-nowrap">
            Notification:
          </h2>
          <p className="text-sm md:text-base text-[#494949]">
            You may withdraw your trading investment at any time, subject to a
            20% transaction fee
          </p>
        </div>

        {/* Form */}
        <h2 className="text-lg md:text-2xl font-medium py-3">Fill Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Amount + Wallet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <label className="flex flex-col gap-1">
              <span className="text-base md:text-lg font-light">
                Mining Amount
              </span>
              <input
                type="text"
                className="w-full border border-gray-400 rounded-lg p-2"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-base md:text-lg font-light">
                Wallet Address
              </span>
              <select
                className="w-full border border-gray-400 rounded-lg p-2"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              >
                <option value="">Select a wallet</option>
                {wallets.map((wallet) => (
                  <option key={wallet._id} value={wallet.address}>
                    {wallet.walletType} - {wallet.address}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Password */}
          <label className="flex flex-col gap-1 w-full md:w-1/3">
            <span className="text-base md:text-lg font-light">
              Transaction Password
            </span>
            <input
              type="password"
              className="w-full border border-gray-400 rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={otpSent}
            />
          </label>

          {/* OTP */}
          <label className="flex flex-col gap-1 w-full md:w-1/3">
            <span className="text-base md:text-lg font-light">
              One Time Password
            </span>
            <div className="flex w-full">
              <input
                type="password"
                className="flex-1 border border-gray-400 rounded-l-lg p-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={!otpSent}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || otpSent}
                className="px-4 border border-gray-400 rounded-r-lg bg-gray-50 hover:bg-gray-100"
              >
                {isSendingOtp ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !otpSent}
            className="w-full md:w-auto border border-[#31B8A1] rounded-lg text-[#31B8A1] font-semibold text-lg px-6 py-2 hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Report */}
        <div className="bg-[#F7F7F7] rounded-3xl px-2 md:px-6 py-6 flex flex-col gap-5">
          <h2 className="text-lg md:text-xl font-medium">Report</h2>
          <div className="bg-white py-3 px-2 md:px-6 rounded-sm w-full overflow-x-auto">
            <div className="grid grid-cols-4 gap-6 text-sm md:text-base font-medium min-w-[600px]">
              <div>#</div>
              <div>Amount</div>
              <div>Wallet Address</div>
              <div className="text-center">Withdraw Date</div>
            </div>
            {withdrawals.map((withdrawal, index) => (
              <div
                key={withdrawal._id}
                className="grid grid-cols-4 gap-4 py-3 text-gray-500 text-sm md:text-base min-w-[600px]"
              >
                <div>{index + 1}</div>
                <div>${withdrawal.amount}</div>
                <div className="truncate">{withdrawal.walletAddress}</div>
                <div className="text-center">
                  {new Date(withdrawal.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;
