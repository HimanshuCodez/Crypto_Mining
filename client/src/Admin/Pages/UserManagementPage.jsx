import React from "react";
import { Search, Eye, Edit3, UserX } from "lucide-react";

const UserManagementPage = ({
  users,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">User Management</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors shadow-md shadow-cyan-500/20">
            Export Users
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 relative w-full">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-auto px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-900/70 sticky top-0">
              <tr>
                {[
                  "User",
                  "Country",
                  "Mobile",
                  "Role",
                  "Income Wallet",
                  "Activation",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-gray-400 font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">
                        {user.name || "missing"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {user.email || "missing"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-medium">
                    {user.country || "missing"}
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-medium">
                    {user.mobile || "missing"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-green-900 text-green-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {user.role || "missing"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    $
                    {user.incomeWallet !== undefined
                      ? user.incomeWallet.toFixed(2)
                      : "missing"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.activationLicense==="true"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {user.activationLicense === "true" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <Eye size={16} className="text-gray-300" />
                      </button>
                      <button className="p-2 bg-yellow-700 hover:bg-yellow-600 rounded-lg transition-colors">
                        <Edit3 size={16} className="text-yellow-200" />
                      </button>
                      <button className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors">
                        <UserX size={16} className="text-red-200" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
