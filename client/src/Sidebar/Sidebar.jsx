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
  FaChevronUp
} from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-[22vw] bg-white shadow-2xl border-r border-gray-200 z-50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b">
        <Link to={"/login"}>
          <img className="w-[10rem]" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="flex flex-col gap-5 capitalize text-gray-800">
          {/* MAIN */}
          <li className="text-sm font-semibold text-gray-500 tracking-wide">
            Main
          </li>
          <Link to="/Dashboard" className="hover:text-blue-600 transition flex items-center gap-2 text-lg">
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
                <Link to="/profile" className="hover:text-blue-600 transition flex items-center gap-2">
                  <FaUser /> Profile
                </Link>
                <Link to="/wallet" className="hover:text-blue-600 transition flex items-center gap-2">
                  <FaWallet /> Wallet
                </Link>
              </motion.ul>
            )}
          </AnimatePresence>

          <Link to="/account_activation" className="hover:text-blue-600 transition flex items-center gap-2 text-lg">
            <FaUserCheck /> Account Activation
          </Link>

          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
            <FaMoneyBillWave /> Mining Investment Using Income
          </li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition">
            <FaBoxOpen /> Mining Investment Package Wallet
          </li>

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
                <Link to="/Network/Direct" className="hover:text-blue-600 transition flex items-center gap-2">
                  <FaUser /> Direct Referral
                </Link>
                <Link to="/Network/Indirect" className="hover:text-blue-600 transition flex items-center gap-2">
                  <FaUser /> Indirect Referral
                </Link>
              </motion.ul>
            )}
          </AnimatePresence>

          {/* COMPONENTS */}
          <li className="text-sm font-semibold text-gray-500 tracking-wide">
            Components
          </li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaDollarSign /> Income</li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaArrowDown /> Deposit</li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaExchangeAlt /> Transfer</li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaFileInvoiceDollar /> Financial</li>

          {/* OTHERS */}
          <li className="text-sm font-semibold text-gray-500 tracking-wide">
            Others
          </li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaInfoCircle /> About</li>
          <li className="flex items-center gap-2 text-lg hover:text-blue-600 transition"><FaQuestionCircle /> Support</li>

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
  );
};

export default Sidebar;
