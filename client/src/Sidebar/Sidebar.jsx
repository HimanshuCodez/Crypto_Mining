import React, { useState } from "react";
import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore.js";
import { Link,  useNavigate } from "react-router-dom";
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

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const toggleNetwork = () => {
    setIsNetworkOpen(!isNetworkOpen);
  };

  return (
    <div className="bg-[#FFFFFF] w-[22vw]  ">
      <div>
        <Link to={"/login"}>
        <div className="flex items-center justify-center">
          <img className="w-[10rem] " src={logo} alt="" />
        </div>
        </Link>
        <div className="pt-5 ">
          <ul className="flex flex-col justify-start items-start capitalize gap-4 px-5 ">
            {/* MAIN */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Main
            </li>
            <Link to="/Dashboard" >
              <li className="text-xl text-black flex items-center gap-2"><FaNetworkWired />Dashboard</li></Link> 
            <li
              className="text-xl text-black cursor-pointer flex items-center gap-2"
              onClick={toggleSettings}
            >
              <FaCogs /> Settings {isSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-4"
                >
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser /> <li className="text-lg text-black">Profile</li>
                  </Link>
                  <Link to="/wallet" className="flex items-center gap-2">
                    <FaWallet /> <li className="text-lg text-black">Wallet</li>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
            <Link to="/account_activation" className="flex items-center gap-2">
              <FaUserCheck /> <li className="text-xl  cursor-pointer text-black">
                Account Activation
              </li>
            </Link>
            <li className="text-xl text-black flex items-center gap-2">
              <FaMoneyBillWave /> Minning Investment Using Income
            </li>
            <li className="text-xl text-black flex items-center gap-2">
              <FaBoxOpen /> Minning Investment Package Wallet
            </li>
             <li
              className="text-xl text-black cursor-pointer flex items-center gap-2"
              onClick={toggleNetwork}
            >
              <FaCogs /> Network {isNetworkOpen ? <FaChevronUp /> : <FaChevronDown />}
            </li>
            <AnimatePresence>
              {isNetworkOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-2 pl-4"
                >
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser /> <li className="text-lg text-black">Profile</li>
                  </Link>
                  <Link to="/wallet" className="flex items-center gap-2">
                    <FaWallet /> <li className="text-lg text-black">Wallet</li>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
            <Link to="/account_activation" className="flex items-center gap-2">
              <FaUserCheck /> <li className="text-xl  cursor-pointer text-black">
                Account Activation
              </li>
            </Link>
            {/* COMPONENTS */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Components
            </li>
            <li className="text-xl text-black flex items-center gap-2"><FaDollarSign />Income</li>

            <li className="text-xl text-black flex items-center gap-2"><FaArrowDown />Deposit</li>
            <li className="text-xl text-black flex items-center gap-2"><FaExchangeAlt />Transfer</li>
            <li className="text-xl text-black flex items-center gap-2"><FaFileInvoiceDollar />Financial</li>
            {/* OTHERS */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Others
            </li>
            <li className="text-xl text-black flex items-center gap-2"><FaInfoCircle />About</li>
            <li className="text-xl text-black flex items-center gap-2"><FaQuestionCircle />Support</li>
            <li
              className="text-xl text-black cursor-pointer flex items-center gap-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
