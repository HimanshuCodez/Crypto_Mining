import React, { useState } from "react";
import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore.js";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCogs,
  FaUser,
  FaWallet,
  FaUserCheck,
  FaMoneyBillWave,
  FaBoxOpen,
  FaNetworkWired,
  FaDollarSign,
  FaArrowDown,
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl border-r border-gray-200 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-72`}
      >
        <div className="flex items-center justify-between py-2 border-b px-4">
          <Link to={"/login"} onClick={handleLinkClick}>
            <img className="w-[10rem]" src={logo} alt="Logo" />
          </Link>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-5 capitalize text-gray-800">
            {/* MAIN */}
            <li className="text-sm font-semibold text-gray-500 tracking-wide">
              Main
            </li>
            <Link
              to="/Dashboard"
              className="hover:text-blue-600 transition flex items-center gap-2 text-lg"
              onClick={handleLinkClick}
            >
              <FaNetworkWired /> Dashboard
            </Link>

            {/* Settings Dropdown */}
            <li
              className="flex items-center justify-between text-lg cursor-pointer hover:text-blue-600 transition"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <div className="flex items-center gap-2">
                <FaCogs /> Settings
              </div>
              {isSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-8 text-gray-700"
                >
                  <Link
                    to="/profile"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Profile
                  </Link>
                  <Link
                    to="/wallet"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaWallet /> Wallet
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            <Link
              to="/account_activation"
              className="hover:text-blue-600 transition flex items-center gap-2 text-lg"
              onClick={handleLinkClick}
            >
              <FaUserCheck /> Account Activation
            </Link>
            <Link
              to="/MiningIncome"
              className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
              onClick={handleLinkClick}
            >
              <FaMoneyBillWave /> Mining Investment Using Income Wallet
            </Link>
            <Link
              to="/MiningPackage"
              className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
              onClick={handleLinkClick}
            >
              <FaBoxOpen /> Mining Investment Using Package Wallet
            </Link>

            {/* Network Dropdown */}
            <li
              className="flex items-center justify-between text-lg cursor-pointer hover:text-blue-600 transition"
              onClick={() => setIsNetworkOpen(!isNetworkOpen)}
            >
              <div className="flex items-center gap-2">
                <FaNetworkWired /> Network
              </div>
              {isNetworkOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isNetworkOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-8 text-gray-700"
                >
                  <Link
                    to="/Network/Direct"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Direct Referral
                  </Link>
                  <Link
                    to="/Network/Indirect"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Indirect Referral
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            {/* COMPONENTS */}
            <li className="text-sm font-semibold text-gray-500 tracking-wide">
              Components
            </li>

            <li
              className="flex items-center justify-between text-lg cursor-pointer hover:text-blue-600 transition"
              onClick={() => setIsIncomeOpen(!isIncomeOpen)}
            >
              <div className="flex items-center gap-2">
                <FaNetworkWired /> Income
              </div>
              {isIncomeOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isIncomeOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-8 text-gray-700"
                >
                  <Link
                    to="/Income/Direct"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Direct Income
                  </Link>
                  <Link
                    to="/Income/Indirect"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Indirect Income
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
            <Link
              to="/DepositUsdt"
              className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
              onClick={handleLinkClick}
            >
              <FaArrowDown /> Deposit
            </Link>

            <li
              className="flex items-center justify-between text-lg cursor-pointer hover:text-blue-600 transition"
              onClick={() => setIsTransferOpen(!isTransferOpen)}
            >
              <div className="flex items-center gap-2">
                <FaExchangeAlt /> Transfer
              </div>
              {isTransferOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isTransferOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-8 text-gray-700"
                >
                  <Link
                    to="/Transfer/Package"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Transfer To Package Wallet
                  </Link>
                  <Link
                    to="/Transfer/Income"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Transfer To Income Wallet
                  </Link>
                  <Link
                    to="/Transfer/Receive_Report"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Receive Report
                  </Link>
                  <Link
                    to="/Transfer/Transport_Report"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Transfer Report
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            <li
              className="flex items-center justify-between text-lg cursor-pointer hover:text-blue-600 transition"
              onClick={() => setIsFinancialOpen(!isFinancialOpen)}
            >
              <div className="flex items-center gap-2">
                <FaFileInvoiceDollar /> Financial
              </div>
              {isFinancialOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isFinancialOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-8 text-gray-700"
                >
                  <Link
                    to="/Financial/Income"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Withdraw Income Wallet
                  </Link>
                  <Link
                    to="/Financial/Withdraw_Investment"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Withdraw Minning Investment
                  </Link>
                  <Link
                    to="/Financial/Acc_Statement"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Account Statement
                  </Link>
                  <Link
                    to="/Financial/Withdraw_Report"
                    className="hover:text-blue-600 transition flex items-center gap-2"
                    onClick={handleLinkClick}
                  >
                    <FaUser /> Withdraw Report
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            {/* OTHERS */}
            <li className="text-sm font-semibold text-gray-500 tracking-wide">
              Others
            </li>
            <li
              className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
              onClick={handleLinkClick}
            >
              <FaInfoCircle /> About
            </li>
            <li
              className="flex items-center gap-2 text-lg hover:text-blue-600 transition"
              onClick={handleLinkClick}
            >
              <FaQuestionCircle /> Support
            </li>

            {/* Logout */}
            <li
              className="flex items-center gap-2 text-lg text-red-600 cursor-pointer hover:text-red-700 transition"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
