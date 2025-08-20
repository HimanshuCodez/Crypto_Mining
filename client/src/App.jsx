import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignuP from "./Pages/SignuP.JSX";

import Profile from "./Pages/Main/Settings/Profile";
import Wallet from "./Pages/Main/Settings/Wallet";
import Account from "./Pages/Main/Account Activation/Account";
import MiningIncome from "./Pages/Main/Income Wallet/MiningIncome";
import PackageWallet from "./Pages/Main/Package Wallet/PackageWallet";
import ToPackageWallet from "./Pages/Components/Transfer/ToPackageWallet";
import ToIncomeWallet from "./Pages/Components/Transfer/ToIncomeWallet";
import WithdrawIncomeWallet from "./Pages/Components/Financal/WithdrawIncomeWallet";
import Layout from "./Layout/Layout";
import Direct_Net from "./Pages/Main/Network/Direct";
import Indirect_Net from "./Pages/Main/Network/Indirect";
import Indirect_Inc from "./Pages/Components/Income/Indirect";
import Direct_Inc from "./Pages/Components/Income/Direct";
import Transfer from "./Pages/Components/Transfer/Transfer";
import Receive from "./Pages/Components/Transfer/Receive";
import AccountStatement from "./Pages/Components/Financal/AccountStatement";
import WithdrawReport from "./Pages/Components/Financal/WithdrawReport";
import Investment from "./Pages/Components/Financal/Investment";
import Dashboard from "./Pages/Main/Dashboard/Dashboard";
import Login from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";

const App = () => {
  return (
    <div className="font-[Montserrat] bg-[#F7F7F7] flex">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route
              path="/Financial/Withdraw_Investment"
              element={<Investment />}
            />
            <Route
              path="/Financial/Withdraw_Report"
              element={<WithdrawReport />}
            />
            <Route
              path="/Financial/Acc_Statement"
              element={<AccountStatement />}
            />
            <Route path="/Transfer/Receive_Report" element={<Receive />} />
            <Route path="/Transfer/Transport_Report" element={<Transfer />} />
            <Route path="/Income/Direct" element={<Direct_Inc />} />
            <Route path="/Income/Indirect" element={<Indirect_Inc />} />
            <Route path="/Network/Indirect" element={<Indirect_Net />} />
            <Route path="/Network/Direct" element={<Direct_Net />} />
            <Route
              path="/Financial/Income"
              element={<WithdrawIncomeWallet />}
            />
            <Route path="/Transfer/Income" element={<ToIncomeWallet />} />
            <Route path="/Transfer/Package" element={<ToPackageWallet />} />
            <Route path="/MiningPackage" element={<PackageWallet />} />
            <Route path="/account_activation" element={<Account />} />
            <Route path="/MiningIncome" element={<MiningIncome />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
