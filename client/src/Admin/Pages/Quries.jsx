import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  User, 
  Calendar,
  MessageSquare,
  Eye,
  Check,
  X,
  ArrowUpDown
} from 'lucide-react';

export default function Quries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Dummy ticket data
  const [tickets, setTickets] = useState([
    {
      id: '#TK001',
      user: 'John Doe',
      email: 'john@example.com',
      category: 'withdrawal',
      subject: 'Withdrawal Pending for 3 days',
      message: 'My withdrawal request of 0.5 BTC has been pending for 3 days. Please help resolve this issue urgently.',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-15 09:30 AM',
      lastUpdated: '2024-01-15 09:30 AM'
    },
    {
      id: '#TK002',
      user: 'Sarah Wilson',
      email: 'sarah@example.com',
      category: 'deposit',
      subject: 'Deposit not reflected in account',
      message: 'I transferred 1000 USDT to my wallet but it is not showing in my account balance. Transaction ID: 0x123abc...',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-14 02:15 PM',
      lastUpdated: '2024-01-15 10:45 AM'
    },
    {
      id: '#TK003',
      user: 'Mike Johnson',
      email: 'mike@example.com',
      category: 'others',
      subject: 'Mining rewards calculation error',
      message: 'The mining rewards for the past week seem incorrect. Expected around 0.02 BTC but only received 0.015 BTC.',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-13 11:20 AM',
      lastUpdated: '2024-01-14 04:30 PM'
    },
    {
      id: '#TK004',
      user: 'Emma Davis',
      email: 'emma@example.com',
      category: 'withdrawal',
      subject: 'Unable to withdraw ETH',
      message: 'Getting error message "Insufficient gas fees" when trying to withdraw 2 ETH. My balance shows sufficient funds.',
      status: 'pending',
      priority: 'high',
      createdAt: '2024-01-15 01:45 PM',
      lastUpdated: '2024-01-15 01:45 PM'
    },
    {
      id: '#TK005',
      user: 'Alex Brown',
      email: 'alex@example.com',
      category: 'deposit',
      subject: 'Failed deposit transaction',
      message: 'My deposit transaction failed but the amount was deducted from my bank account. Please help recover the funds.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-14 08:30 AM',
      lastUpdated: '2024-01-15 09:15 AM'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-black-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-black-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'in-progress': return <AlertCircle size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      default: return <XCircle size={16} />;
    }
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, lastUpdated: new Date().toLocaleString() }
        : ticket
    ));
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    pending: tickets.filter(t => t.status === 'pending').length,
    'in-progress': tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  return (
    <div className="min-h-screen  bg-gray-800 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl  font-bold text-black-900 mb-2">Support Tickets</h1>
          <p className="text-black-600">Manage and resolve customer support tickets</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-black-600">Pending</p>
                <p className="text-xl font-bold text-black-900">{statusCounts.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-black-600">In Progress</p>
                <p className="text-xl font-bold text-black-900">{statusCounts['in-progress']}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-black-600">Resolved</p>
                <p className="text-xl font-bold text-black-900">{statusCounts.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" size={18} />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      Ticket ID
                      <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider hidden sm:table-cell">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Status
                  </th>
                  
                  <th className="px-4 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-black-900">{ticket.id}</span>
                        <span className="text-xs text-black-500 sm:hidden">{ticket.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <User size={16} className="text-black-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black-900">{ticket.user}</p>
                          <p className="text-xs text-black-500">{ticket.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-black-900 truncate">{ticket.subject}</p>
                        <p className="text-xs text-black-500 md:hidden capitalize">{ticket.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-black-700 rounded-full capitalize">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize">{ticket.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black-900">Ticket Details</h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-black-400 hover:text-black-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-lg font-medium text-black-900">{selectedTicket.id}</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedTicket.status)}`}>
                    {getStatusIcon(selectedTicket.status)}
                    <span className="capitalize">{selectedTicket.status.replace('-', ' ')}</span>
                  </span>
                  
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">User</label>
                    <p className="text-black-900">{selectedTicket.user}</p>
                    <p className="text-sm text-black-500">{selectedTicket.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Category</label>
                    <p className="text-black-900 capitalize">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Created</label>
                    <p className="text-black-900 flex items-center gap-1">
                      <Calendar size={16} />
                      {selectedTicket.createdAt}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Last Updated</label>
                    <p className="text-black-900 flex items-center gap-1">
                      <Clock size={16} />
                      {selectedTicket.lastUpdated}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2">Subject</label>
                  <p className="text-black-900 font-medium">{selectedTicket.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black-700 mb-2 flex items-center gap-1">
                    <MessageSquare size={16} />
                    Message
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-black-700 leading-relaxed">{selectedTicket.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedTicket.status !== 'resolved' && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {selectedTicket.status === 'pending' && (
                      <button
                        onClick={() => updateTicketStatus(selectedTicket.id, 'in-progress')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <AlertCircle size={16} />
                        Mark In Progress
                      </button>
                    )}
                    <button
                      onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check size={16} />
                      Mark Resolved
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}