import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import useAuthStore from "../../../store/authStore";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";

const DepositUsdt = () => {
  const { user } = useAuthStore();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [depositInfo, setDepositInfo] = useState({});
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("idle");

  const addressLabels = {
    deposit: "BEP20",
    tre20: "TRC20",
  };

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await api.get("/admin/barcode");
        setDepositInfo({
          deposit: {
            url: response.data.depositBarcodeUrl,
            address: response.data.depositWalletAddress,
          },
          tre20: {
            url: response.data.tre20BarcodeUrl,
            address: response.data.tre20WalletAddress,
          },
        });
      } catch (error) {
        console.error("Failed to fetch deposit info", error);
      }
    };

    const fetchPaymentStatus = async () => {
      if (user?._id) {
        try {
          const response = await api.get(`/admin/payments/status/${user._id}`);
          setSubmissionStatus(response.data.status);
        } catch (error) {
          console.error("Failed to fetch payment status", error);
        }
      }
    };

    fetchDepositInfo();
    fetchPaymentStatus();
  }, [user]);

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Address copied to clipboard!");
      },
      (err) => {
        toast.error("Failed to copy address.");
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verify) {
      toast.error("Please verify the transaction.");
      return;
    }

    if (!paymentScreenshot || !paymentAmount) {
      toast.error("Please enter amount and upload screenshot.");
      return;
    }

    if (!password) {
      toast.error("Please enter your transaction password.");
      return;
    }

    if (!user || !user._id) {
      toast.error("User not logged in or user ID not available.");
      return;
    }

    setSubmissionStatus("submitting");
    const formData = new FormData();
    formData.append("screenshot", paymentScreenshot);
    formData.append("amount", paymentAmount);
    formData.append("userId", user._id);
    formData.append("password", password);

    try {
      const response = await api.post("/admin/payments/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSubmissionStatus("pending");
        toast.success(
          "Payment submitted successfully! Waiting for admin approval."
        );
      } else {
        setSubmissionStatus("idle");
        toast.error("Failed to submit payment.");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      setSubmissionStatus("idle");
      toast.error(
        error.response?.data?.message ||
          "An error occurred while submitting payment."
      );
    }
  };

  return (
    <div className="min-h-screen w-full md:w-[78vw] flex flex-col gap-6 p-4 md:p-10 bg-gray-50">
      <div className="flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl md:text-4xl font-medium capitalize font-[Inter]">
          Deposit USDT
        </h1>
        <nav className="flex items-center gap-1 capitalize font-light text-sm font-[Inter]">
          <a href="/deposit">Deposit</a>
          <span>/</span>
          <a href="/deposit-usdt" className="text-[#02AC8F] truncate">
            Deposit USDT
          </a>
        </nav>
        ~
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full bg-white p-6 md:p-8 shadow rounded-lg"
      >
        <h2 className="font-semibold text-2xl text-gray-800">Fill Details</h2>

        {/* Address Dropdown */}
        <div>
          <label
            htmlFor="address-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Address
          </label>
          <select
            id="address-select"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">-- Select an Address Type --</option>
            {Object.keys(depositInfo).map(
              (key) =>
                depositInfo[key]?.url && (
                  <option key={key} value={key}>
                    {addressLabels[key] || key.toUpperCase()}
                  </option>
                )
            )}
          </select>
        </div>

        {/* Barcode and Address Display */}
        {selectedAddress && depositInfo[selectedAddress]?.url && (
          <div className="text-center py-4 border-t border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {addressLabels[selectedAddress]} Deposit Information
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <img
                src={depositInfo[selectedAddress].url}
                alt={`${addressLabels[selectedAddress]} Deposit Barcode`}
                className="w-48 h-48 mx-auto"
              />
              {depositInfo[selectedAddress].address && (
                <div className="w-full md:w-auto text-center md:text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  <div className="flex items-center justify-center bg-gray-100 p-2 rounded-md">
                    <p className="text-gray-800 text-sm break-all mr-2">
                      {depositInfo[selectedAddress].address}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyToClipboard(
                          depositInfo[selectedAddress].address
                        )
                      }
                      className="p-2 text-gray-500 hover:text-gray-800"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Payment Proof */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Upload Payment Proof
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Paid (USDT)
            </label>
            <input
              type="number"
              placeholder="Enter amount paid"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          {submissionStatus === "pending" && (
            <p className="text-yellow-600 font-medium mt-2">
              Waiting for admin approval...
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Password
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
          disabled={
            submissionStatus === "submitting" || submissionStatus === "pending"
          }
          className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submissionStatus === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DepositUsdt;
