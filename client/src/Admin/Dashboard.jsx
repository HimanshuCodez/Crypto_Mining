import React, { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  Wallet,
  Shield,
  Bell,
  Settings,
  Search,
  Eye,
  Edit3,
  TrendingUp,
  ArrowDownRight,
  Copy,
  ExternalLink,
  UserCheck,
  UserX,
  Download,
} from "lucide-react";

const AdminSystem = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        //Note: This assumes the API is running on the same host and port
        const response = await fetch("/api/user/count");
        const data = await response.json();
        if (response.ok) {
          setUserCount(data.count);
        } else {
          throw new Error(data.message || "Failed to fetch user count");
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
        // Handle error, e.g., show a notification to the user
      }
    };

    fetchUserCount();
  }, []);

  // Mock data - replace with actual DB calls
  const dashboardStats = {
    totalUsers: 15847,
    activeUsers: 12453,
    pendingKYC: 234,
    blockedUsers: 160,
    totalDeposits: 847650,
    totalWithdrawals: 523480,
    pendingPayments: 45,
    pendingWithdrawals: 23,
    usdtBalance: 125000,
  };

  const users = [
    {
      id: 1,
      username: "alex_crypto",
      email: "alex@example.com",
      balance: 1250.5,
      status: "active",
      kyc: "approved",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      username: "sarah_miner",
      email: "sarah@example.com",
      balance: 890.25,
      status: "active",
      kyc: "pending",
      joinDate: "2024-02-08",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      username: "mike_hash",
      email: "mike@example.com",
      balance: 2340.75,
      status: "suspended",
      kyc: "approved",
      joinDate: "2024-01-22",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      username: "crypto_queen",
      email: "lisa@example.com",
      balance: 567.8,
      status: "active",
      kyc: "rejected",
      joinDate: "2024-03-01",
      lastActive: "30 minutes ago",
    },
  ];

  const pendingPayments = [
    {
      id: 1,
      username: "alex_crypto",
      amount: 150.25,
      method: "Bank Transfer",
      date: "2024-08-20",
      status: "pending",
    },
    {
      id: 2,
      username: "sarah_miner",
      amount: 89.5,
      method: "PayPal",
      date: "2024-08-21",
      status: "pending",
    },
    {
      id: 3,
      username: "crypto_master",
      amount: 340.75,
      method: "USDT",
      date: "2024-08-19",
      status: "processing",
    },
    {
      id: 4,
      username: "mine_pro",
      amount: 75.3,
      method: "Bank Transfer",
      date: "2024-08-21",
      status: "pending",
    },
  ];

  const usdtWithdrawals = [
    {
      id: 1,
      username: "alex_crypto",
      amount: 500.0,
      wallet: "0x742d...9f2a",
      txHash: "",
      status: "pending",
      date: "2024-08-21 10:30",
    },
    {
      id: 2,
      username: "crypto_whale",
      amount: 1200.5,
      wallet: "0x8b1c...7e4d",
      txHash: "0x9f2a...8c1b",
      status: "completed",
      date: "2024-08-20 15:45",
    },
    {
      id: 3,
      username: "mine_lord",
      amount: 750.25,
      wallet: "0x3e9f...2b8a",
      txHash: "",
      status: "processing",
      date: "2024-08-21 09:15",
    },
    {
      id: 4,
      username: "hash_king",
      amount: 300.0,
      wallet: "0x7c4a...5d9e",
      txHash: "",
      status: "pending",
      date: "2024-08-21 11:20",
    },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-cyan-600 text-sm font-medium mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
          </div>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-500">+{trend}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-cyan-100 rounded-lg">
          <Icon size={24} className="text-cyan-600" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={userCount.toLocaleString()}
            subtitle={`${dashboardStats.activeUsers.toLocaleString()} active`}
            icon={Users}
            trend="8.2"
          />
          <StatCard
            title="Pending KYC"
            value={dashboardStats.pendingKYC}
            subtitle="Awaiting verification"
            icon={UserCheck}
          />
          <StatCard
            title="Total Deposits"
            value={`${dashboardStats.totalDeposits.toLocaleString()}`}
            subtitle="All time deposits"
            icon={ArrowDownRight}
            trend="12.5"
          />
          <StatCard
            title="USDT Balance"
            value={`${dashboardStats.usdtBalance.toLocaleString()}`}
            subtitle="Available for withdrawals"
            icon={Wallet}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentPage("users")}
                className="p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors group"
              >
                <Users
                  className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <p className="text-gray-800 font-medium">Manage Users</p>
                <p className="text-gray-500 text-sm">View & edit users</p>
              </button>
              <button
                onClick={() => setCurrentPage("payments")}
                className="p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors group"
              >
                <CreditCard
                  className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <p className="text-gray-800 font-medium">Payments</p>
                <p className="text-gray-500 text-sm">Approve payments</p>
              </button>
              <button
                onClick={() => setCurrentPage("withdrawals")}
                className="p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors group"
              >
                <Wallet
                  className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <p className="text-gray-800 font-medium">USDT Withdrawals</p>
                <p className="text-gray-500 text-sm">Process withdrawals</p>
              </button>
              <button className="p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors group">
                <Download
                  className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform"
                  size={24}
                />
                <p className="text-gray-800 font-medium">Reports</p>
                <p className="text-gray-500 text-sm">Generate reports</p>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    New user registration: alex_crypto
                  </p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    Payment approval needed: $150.25
                  </p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm">
                    USDT withdrawal processed: $500
                  </p>
                  <p className="text-gray-500 text-xs">12 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors">
            Export Users
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:border-cyan-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending KYC</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                User
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Balance
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                KYC
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Last Active
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-gray-800 font-medium">{user.username}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  ${user.balance}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : user.status === "suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.kyc === "approved"
                        ? "bg-green-100 text-green-800"
                        : user.kyc === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.kyc}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors">
                      <Edit3 size={16} className="text-yellow-600" />
                    </button>
                    <button className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors">
                      {user.status === "active" ? (
                        <UserX size={16} className="text-red-600" />
                      ) : (
                        <UserCheck size={16} className="text-green-600" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Payment Approvals</h2>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">
            Pending: {pendingPayments.length}
          </span>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors">
            Approve All
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                User
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Method
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {payment.username}
                </td>
                <td className="px-6 py-4 text-gray-700 font-bold">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4 text-gray-700">{payment.method}</td>
                <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-cyan-100 text-cyan-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-sm font-medium transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm font-medium transition-colors">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWithdrawals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">USDT Withdrawals</h2>
        <div className="flex items-center space-x-3">
          <div className="text-gray-600">
            Pending:{" "}
            {usdtWithdrawals.filter((w) => w.status === "pending").length}
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors">
            Process All
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                User
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Wallet Address
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-gray-500 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {usdtWithdrawals.map((withdrawal) => (
              <tr
                key={withdrawal.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {withdrawal.username}
                </td>
                <td className="px-6 py-4 text-gray-700 font-bold">
                  ${withdrawal.amount} USDT
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-mono text-sm">
                      {withdrawal.wallet}
                    </span>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <Copy size={14} className="text-gray-500" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : withdrawal.status === "processing"
                        ? "bg-cyan-100 text-cyan-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {withdrawal.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {withdrawal.status === "pending" && (
                      <button className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white text-sm font-medium transition-colors">
                        Process
                      </button>
                    )}
                    {withdrawal.status === "completed" && withdrawal.txHash && (
                      <button className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded text-white text-sm font-medium transition-colors flex items-center space-x-1">
                        <ExternalLink size={14} />
                        <span>View TX</span>
                      </button>
                    )}
                    <button className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm font-medium transition-colors">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  CryptoMine Admin
                </h1>
                <p className="text-gray-500 text-sm">
                  Database Management System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Settings className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "users", label: "User Management" },
              { id: "payments", label: "Payment Approvals" },
              { id: "withdrawals", label: "USDT Withdrawals" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                className={`px-1 py-4 border-b-2 transition-colors font-medium ${
                  currentPage === tab.id
                    ? "border-cyan-500 text-cyan-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {currentPage === "dashboard" && renderDashboard()}
        {currentPage === "users" && renderUsers()}
        {currentPage === "payments" && renderPayments()}
        {currentPage === "withdrawals" && renderWithdrawals()}
      </div>
    </div>
  );
};

export default AdminSystem;
