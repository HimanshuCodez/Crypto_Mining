import React from 'react';
import {
  Users,
  CreditCard,
  Wallet,
  ArrowDownRight,
  UserCheck,
  Download,
  TrendingUp,
} from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-cyan-400 text-sm font-medium mb-2">{title}</p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-white">{value}</span>
        </div>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp size={16} className="text-green-400 mr-1" />
            <span className="text-green-400">+{trend}%</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-gray-700 rounded-lg">
        <Icon size={24} className="text-cyan-400" />
      </div>
    </div>
  </div>
);

const DashboardPage = ({ userCount, dashboardStats, setCurrentPage }) => {
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={userCount.toLocaleString()}
          subtitle={`${dashboardStats.activeUsers.toLocaleString()} active`}
          icon={Users}
          trend="8.2"
        />
        <StatCard
          title="Pending Activations"
          value={dashboardStats.pendingKYC}
          subtitle="Awaiting Activations"
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
          value={`$${dashboardStats.usdtBalance.toLocaleString()}`}
          subtitle="Available for withdrawals"
          icon={Wallet}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              {
                label: 'Manage Users',
                page: 'users',
                icon: Users,
                sub: 'View & edit users',
              },
              {
                label: 'Payments',
                page: 'payments',
                icon: CreditCard,
                sub: 'Approve payments',
              },
              {
                label: 'USDT Withdrawals',
                page: 'withdrawals',
                icon: Wallet,
                sub: 'Process withdrawals',
              },
              {
                label: 'Reports',
                page: 'reports',
                icon: Download,
                sub: 'Generate reports',
              },
            ].map((action) => (
              <button
                key={action.page}
                onClick={() => setCurrentPage(action.page)}
                className="p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <action.icon
                    className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform"
                    size={24}
                  />
                  <p className="text-white font-medium">{action.label}</p>
                </div>
                <p className="text-gray-400 text-sm">{action.sub}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              {
                color: 'green',
                text: 'New user registration: alex_crypto',
                time: '2 minutes ago',
              },
              {
                color: 'yellow',
                text: 'Payment approval needed: $150.25',
                time: '5 minutes ago',
              },
              {
                color: 'cyan',
                text: 'USDT withdrawal processed: $500',
                time: '12 minutes ago',
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 bg-gray-900/70 rounded-lg"
              >
                <div
                  className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}
                ></div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{activity.text}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
