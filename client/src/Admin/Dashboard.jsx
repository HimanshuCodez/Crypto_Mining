import React, { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  Wallet,
  Shield,
  Bell,
  Settings,
  TrendingUp,
  Menu,
  X,
  MailQuestionMarkIcon,
  MSquareIcon,
} from "lucide-react";
import api from "../api/axios";
import useAuthStore from "../store/authStore";
import DashboardPage from "./Pages/DashboardPage";
import UserManagementPage from "./Pages/UserManagementPage";
import PaymentApprovalsPage from "./Pages/PaymentApprovalsPage";
import WithdrawalsPage from "./Pages/WithdrawalsPage";
import SettingsPage from "./Pages/SettingsPage";

import MinningInvestmentApproval from "./Pages/MinningInvestmentApproval";
import { toast } from "react-toastify";
import Maintenance from "./Pages/Maintenance";

const AdminSystem = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [activatedUsersCount, setActivatedUsersCount] = useState(0);
  const [totalMiningInvestment, setTotalMiningInvestment] = useState(0);
  const [barcodeUrls, setBarcodeUrls] = useState({
    deposit: 'https://imgs.search.brave.com/0TrKgTjetNkLgx2lktMkwwI1Y0nqOZaiKFaWrzhti60/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyb2ludC5jb20vNDUw/d20vbWFjbWFja3lr/eS9tYWNtYWNreWt5/MTYwOS9tYWNtYWNreWt5MTYwOTAwMjM3LzYzMTQ1Njg4LWJh/cmNvZUtc2Nhbm5l/ci5qcGc_dmVyPTY',
    tre20: ''
  });
  const [pendingPayments, setPendingPayments] = useState([]);
  const { users, fetchAllUsers } = useAuthStore();

  const fetchPendingPayments = async () => {
    try {
      const response = await api.get('/admin/payments/pending');
      setPendingPayments(response.data);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
    }
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await api.get("/user/count");
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchBarcode = async () => {
      try {
        const response = await api.get('/admin/barcode');
        setBarcodeUrls({
          deposit: response.data.depositBarcodeUrl,
          tre20: response.data.tre20BarcodeUrl || ''
        });
      } catch (error) {
        console.error('Failed to fetch barcode', error);
      }
    };

    fetchUserCount();
    fetchBarcode();
    fetchPendingPayments();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const activatedCount = users.filter(user => user.activationLicense).length;
      setActivatedUsersCount(activatedCount);

      const totalInvestment = users.reduce((sum, user) => sum + (user.miningInvestment || 0), 0);
      setTotalMiningInvestment(totalInvestment);
    }
  }, [users]);

  const dashboardStats = {
    activeUsers: 0, // This is still hardcoded
    activatedUsers: activatedUsersCount,
    totalDeposits: 84,
    totalMiningInvestment: totalMiningInvestment,
  };

  const usdtWithdrawals = [
    { id: 1, username: "alex_crypto", amount: 500.0, wallet: "0x742d...9f2a", status: "pending", date: "2024-08-21 10:30" },
    { id: 2, username: "crypto_whale", amount: 1200.5, wallet: "0x8b1c...7e4d", txHash: "0x9f2a...8c1b", status: "completed", date: "2024-08-20 15:45" },
    { id: 3, username: "mine_lord", amount: 750.25, wallet: "0x3e9f...2b8a", status: "processing", date: "2024-08-21 09:15" },
    { id: 4, username: "hash_king", amount: 300.0, wallet: "0x7c4a...5d9e", status: "pending", date: "2024-08-21 11:20" },
  ];

  const handleApprovePayment = async (paymentId) => {
    try {
      const response = await api.post(`/admin/payments/approve/${paymentId}`);
      if (response.status === 200) {
        toast.success('Payment approved!');
        fetchPendingPayments();
      } else {
        toast.error('Failed to approve payment.');
      }
    } catch (error) {
      console.error('Failed to approve payment', error);
      toast.error('An error occurred while approving the payment.');
    }
  };

  const handleRejectPayment = async (paymentId) => {
    try {
      const response = await api.post(`/admin/payments/reject/${paymentId}`);
      if (response.status === 200) {
        alert('Payment rejected!');
        fetchPendingPayments();
      } else {
        alert('Failed to reject payment.');
      }
    } catch (error) {
      console.error('Failed to reject payment', error);
      alert('An error occurred while rejecting the payment.');
    }
  };

  const handleUpdateBarcode = async (updatedBarcodeUrls) => {
    try {
      const response = await api.post('/admin/barcode', updatedBarcodeUrls);
      if (response.status === 200) {
        toast.success('Barcode updated successfully!');
        setBarcodeUrls(updatedBarcodeUrls);
      } else {
        alert('Failed to update barcode.');
      }
    } catch (error) {
      console.error('Failed to update barcode', error);
      alert('An error occurred while updating the barcode.');
    }
  };

 

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setCurrentPage(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === id ? "bg-cyan-500/20 text-cyan-300" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage userCount={userCount} dashboardStats={dashboardStats} setCurrentPage={setCurrentPage} />;
      case 'users':
        return <UserManagementPage users={users} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />;
      case 'payments':
        return <PaymentApprovalsPage pendingPayments={pendingPayments} fetchPendingPayments={fetchPendingPayments} handleApprovePayment={handleApprovePayment} handleRejectPayment={handleRejectPayment} />;
      case 'withdrawals':
        return <WithdrawalsPage usdtWithdrawals={usdtWithdrawals} />;
      case 'settings':
        return <SettingsPage barcodeUrls={barcodeUrls} setBarcodeUrls={setBarcodeUrls} handleUpdateBarcode={handleUpdateBarcode} />;
     
      case 'MinningInvestmentApproval':

         return <MinningInvestmentApproval  />;
      case 'Maintenance':

         return <Maintenance />;
      default:
        return <DashboardPage userCount={userCount} dashboardStats={dashboardStats} setCurrentPage={setCurrentPage} />;
   
       
    }
  }

  return (
    <div className="flex w-screen h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className={`bg-gray-800 border-r border-gray-700 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} absolute inset-y-0 left-0 z-30 w-64 md:relative md:translate-x-0 md:w-64`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CryptoMine</h1>
                <p className="text-gray-400 text-sm">Admin Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 rounded-md hover:bg-gray-700">
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "users", label: "Users", icon: Users },
              { id: "payments", label: "Payments", icon: CreditCard },
              { id: "withdrawals", label: "Withdrawals", icon: Wallet },
              { id: "settings", label: "Settings", icon: Settings },
              { id: "MinningInvestmentApproval", label: "Minning Approval", icon:  Shield },
              { id: "Maintenance", label: "Maintenance Mode", icon:  MSquareIcon },
              { id: "Quries", label: "Quries", icon: MailQuestionMarkIcon },
            ].map(item => <NavItem key={item.id} {...item} />)}
          </nav>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-700">
                <Menu size={20} />
              </button>
              <div className="hidden md:block"></div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
                  <Bell className="text-gray-300" size={20} />
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800"></span>
                </button>
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminSystem;
