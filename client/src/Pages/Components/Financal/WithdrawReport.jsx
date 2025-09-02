import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const WithdrawReport = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get("/api/withdrawals/all");
      setWithdrawals(response.data);
    } catch (error) {
      toast.error("Failed to fetch withdrawals");
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="w-full lg:w-[80vw] flex flex-col gap-6 p-4 sm:p-6 lg:p-10 font-[Montserrat]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start gap-2 font-[Inter]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium capitalize">
          Withdraw Report
        </h2>
        <nav className="flex flex-wrap items-center gap-1 capitalize font-light text-xs sm:text-sm">
          <a href="/Financial">Financial</a>
          <span>/</span>
          <a
            href="/Withdraw Report"
            className="text-[#02AC8F] truncate max-w-[150px] sm:max-w-none"
          >
            Withdraw Report
          </a>
        </nav>
      </div>

      {/* Report Container */}
      <div className="bg-white w-full rounded-2xl sm:rounded-3xl px-3 sm:px-5 py-6 sm:py-10 flex flex-col gap-5 shadow">
        <h2 className="text-lg sm:text-xl font-medium">Withdraw Report</h2>

        {/* Table wrapper for mobile scroll */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] bg-[#F7F7F7] rounded-md">
            {/* Table Head */}
            <div className="grid grid-cols-5 gap-4 sm:gap-6 text-sm sm:text-base font-semibold py-3 px-4 border-b">
              <div>#</div>
              <div>Amount</div>
              <div>Wallet Address</div>
              <div className="text-center">Status</div>
              <div className="text-center">Withdraw Date</div>
            </div>

            {/* Table Body */}
            {withdrawals.map((withdrawal, index) => (
              <div
                key={withdrawal._id}
                className="grid grid-cols-5 gap-4 sm:gap-6 py-3 px-4 text-xs sm:text-sm text-gray-600 border-b last:border-none"
              >
                <div>{index + 1}</div>
                <div>${withdrawal.amount}</div>
                <div className="truncate">{withdrawal.walletAddress}</div>
                <div className="text-center">{withdrawal.status}</div>
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

export default WithdrawReport;
