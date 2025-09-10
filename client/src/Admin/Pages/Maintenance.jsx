import React, { useState } from 'react';
import { Power, PowerOff, Activity, Zap, TrendingUp, Shield } from 'lucide-react';

export default function Maintenance() {
  const [isRunning, setIsRunning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePowerOn = async () => {
    setIsTransitioning(true);
    // Simulate startup delay
    setTimeout(() => {
      setIsRunning(true);
      setIsTransitioning(false);
    }, 2000);
  };

  const handleShutdown = async () => {
    setIsTransitioning(true);
    // Simulate shutdown delay
    setTimeout(() => {
      setIsRunning(false);
      setIsTransitioning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Activity className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-white">Crypto Mining</h1>
          </div>
          <p className="text-gray-400 text-lg">Advanced Mining Control System</p>
        </div>

        {/* Status Display */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`p-4 rounded-full ${isRunning ? 'bg-green-500/20' : 'bg-red-500/20'} transition-all duration-500`}>
              {isRunning ? (
                <Zap className={`text-green-400 ${isRunning ? 'animate-pulse' : ''}`} size={48} />
              ) : (
                <PowerOff className="text-red-400" size={48} />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-2 transition-all duration-300 ${
              isRunning ? 'text-green-400' : 'text-red-400'
            }`}>
              {isTransitioning 
                ? (isRunning ? 'SHUTTING DOWN...' : 'STARTING UP...') 
                : (isRunning ? 'MINING ACTIVE' : 'SYSTEM OFFLINE')
              }
            </h2>
            <p className="text-gray-400">
              {isRunning ? 'Your mining operations are running smoothly' : 'Ready to start mining operations'}
            </p>
          </div>

          {/* Status Indicators */}
          {isRunning && (
            <div className="grid grid-cols-3 gap-4 mt-8 animate-fadeIn">
              <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                <TrendingUp className="text-green-400 mx-auto mb-2" size={24} />
                <div className="text-white font-semibold">Hash Rate</div>
                <div className="text-green-400 text-sm">125.4 MH/s</div>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                <Shield className="text-blue-400 mx-auto mb-2" size={24} />
                <div className="text-white font-semibold">Uptime</div>
                <div className="text-blue-400 text-sm">2h 34m</div>
              </div>
              <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                <Activity className="text-purple-400 mx-auto mb-2" size={24} />
                <div className="text-white font-semibold">Temperature</div>
                <div className="text-purple-400 text-sm">67°C</div>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-6 justify-center">
          {/* Power On Button */}
          <button
            onClick={handlePowerOn}
            disabled={isRunning || isTransitioning}
            className={`group relative flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isRunning || isTransitioning
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40'
            }`}
          >
            <div className={`p-2 rounded-full bg-white/10 ${!isRunning && !isTransitioning ? 'group-hover:bg-white/20' : ''} transition-all duration-200`}>
              <Power size={24} />
            </div>
            <span>START MINING</span>
            {!isRunning && !isTransitioning && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 animate-pulse"></div>
            )}
          </button>

          {/* Shutdown Button */}
          <button
            onClick={handleShutdown}
            disabled={!isRunning || isTransitioning}
            className={`group relative flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              !isRunning || isTransitioning
                ? 'bg-gray-600 text-gray-400'
                : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40'
            }`}
          >
            <div className={`p-2 rounded-full bg-white/10 ${isRunning && !isTransitioning ? 'group-hover:bg-white/20' : ''} transition-all duration-200`}>
              <PowerOff size={24} />
            </div>
            <span>SHUTDOWN</span>
            {isRunning && !isTransitioning && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-400/20 to-red-500/0 animate-pulse"></div>
            )}
          </button>
        </div>

        {/* Loading Indicator */}
        {isTransitioning && (
          <div className="flex items-center justify-center mt-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}