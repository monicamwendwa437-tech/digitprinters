"use client";

import { useState } from 'react';
import { getApi } from '../../../src/app/lib/deriv';

export default function DerivAuthPage() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('Enter your Deriv API token below');
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const handleConnect = async () => {
    if (!token) {
      setStatus('Please enter your API token');
      return;
    }

    setStatus('Connecting to Deriv...');

    try {
      const api = getApi();
      await api.authorize(token);
      const account = await api.balance();
      setBalance(account.balance);
      setIsConnected(true);
      setStatus('Successfully connected to Deriv!');
    } catch (error) {
      setStatus('Failed to connect. Please check your token.');
      console.error('Deriv connection error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Connect to Deriv
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Deriv API Token
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
              placeholder="Enter your Deriv API token"
              disabled={isConnected}
            />
          </div>

          <button
            onClick={handleConnect}
            disabled={isConnected}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 py-3 rounded-xl font-semibold transition-colors"
          >
            {isConnected ? 'Connected' : 'Connect to Deriv'}
          </button>

          <div className="text-center p-4 rounded-xl bg-gray-800">
            <p className="text-sm">{status}</p>
            {balance && (
              <p className="text-lg font-semibold mt-2">
                Balance: ${Number(balance).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            <a href="/dashboard" className="text-purple-400 hover:text-purple-300">
              ← Back to Dashboard
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}