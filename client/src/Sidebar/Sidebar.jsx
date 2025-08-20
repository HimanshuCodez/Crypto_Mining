import React from "react";
import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore.js";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#FFFFFF] w-[22vw]  ">
      <div>
        <div className="flex items-center justify-center">
          <img className="w-[10rem] " src={logo} alt="" />
        </div>
        <div className="pt-5 ">
          <ul className="flex flex-col justify-start items-start capitalize gap-4 px-5 ">
            {/* MAIN */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Main
            </li>
            <li className="text-xl text-black">Settings</li>
            <Link  to="/account_activation">
              <li className="text-xl  cursor-pointer text-black">
                Account Activation
              </li>
            </Link>
            <li className="text-xl text-black">
              Minning Investment Using Income
            </li>
            <li className="text-xl text-black">
              Minning Investment Package Wallet
            </li>
            <li className="text-xl text-black">Network</li>
            {/* COMPONENTS */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Components
            </li>
            <li className="text-xl text-black">Income</li>
          
            <li className="text-xl text-black">Deposit</li>
            <li className="text-xl text-black">Transfer</li>
            <li className="text-xl text-black">Financial</li>
            {/* OTHERS */}
            <li className="text-lg font-normal text-[#6D6D6D] underline">
              Others
            </li>
            <li className="text-xl text-black">About</li>
            <li className="text-xl text-black">Support</li>
            <li
              className="text-xl text-black cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
