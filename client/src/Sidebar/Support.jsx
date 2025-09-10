import React, { useState } from 'react';
import { Home, HelpCircle, Plus, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function CryptoSupportForm() {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [otpPassword, setOtpPassword] = useState('');
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);
  const [showOtpPassword, setShowOtpPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !subject || !message || !transactionPassword || !otpPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/support/tickets', {
        category,
        subject,
        message,
        transactionPassword,
        otp: otpPassword
      });
      toast.success('Support ticket submitted successfully!');
      // Clear form
      setCategory('');
      setSubject('');
      setMessage('');
      setTransactionPassword('');
      setOtpPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit ticket.');
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      await api.post('/support/send-otp');
      toast.success('OTP sent successfully to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        {/* Navigation */}
        <div className="flex items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Home size={16} />
            <span>Home</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 font-medium cursor-pointer">
            <HelpCircle size={16} />
            <span>Support</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <Plus size={16} />
            <span>Create Ticket</span>
          </div>
        </div>

        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Fill Details</h1>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#CCFFF6] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700"
            >
              <option value="" disabled>Select Category...</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="deposit">Deposit</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter a brief subject"
              className="w-full px-4 py-3 bg-[#CCFFF6] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              rows={4}
              className="w-full px-4 py-3 bg-[#CCFFF6] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 resize-none placeholder-gray-500"
            />
          </div>

          {/* Transaction Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showTransactionPassword ? "text" : "password"}
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
                placeholder="******"
                className="w-full pl-12 pr-12 py-3 bg-[#CCFFF6] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showTransactionPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* One Time Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              One Time Password
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showOtpPassword ? "text" : "password"}
                  value={otpPassword}
                  onChange={(e) => setOtpPassword(e.target.value)}
                  placeholder="Enter One Time Password"
                  className="w-full pl-12 pr-12 py-3 bg-[#CCFFF6] border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowOtpPassword(!showOtpPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOtpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="button"
                onClick={sendOtp}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}