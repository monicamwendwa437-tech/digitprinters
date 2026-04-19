"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { getApi, getConnection } from '../../src/app/lib/deriv';

const navItems = ['Dashboard', 'Trade', 'Bots', 'Signals', 'Portfolio'];

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [balance, setBalance] = useState(10000);
  const [stake, setStake] = useState('');
  const [market, setMarket] = useState('Volatility 75 Index');
  const [tradeMessage, setTradeMessage] = useState('Enter stake and choose a side to trade.');
  const [positions, setPositions] = useState<string[]>([]);
  const [botsRunning, setBotsRunning] = useState(false);
  const [botType, setBotType] = useState('Martingale Bot');
  const [botStake, setBotStake] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [botStatus, setBotStatus] = useState('Idle');
  const [signals, setSignals] = useState<string[]>([]);
  const [apiToken, setApiToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [botInterval, setBotInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connection = getConnection();
    if (!connection) return;

    const handleOpen = () => {
      setIsConnected(true);
      setBotStatus('Websocket connected');
    };

    const handleClose = () => {
      setIsConnected(false);
      setBotStatus('Websocket disconnected');
    };

    const handleError = () => {
      setIsConnected(false);
      setBotStatus('Websocket error');
    };

    connection.addEventListener('open', handleOpen);
    connection.addEventListener('close', handleClose);
    connection.addEventListener('error', handleError);

    return () => {
      connection.removeEventListener('open', handleOpen);
      connection.removeEventListener('close', handleClose);
      connection.removeEventListener('error', handleError);
    };
  }, []);

  const connectToDeriv = async () => {
    if (!apiToken) {
      setBotStatus('Enter API token');
      return;
    }

    try {
      const api = getApi();
      await api.authorize(apiToken);
      const account = await api.balance();
      setBalance(Number(account.balance));
      setIsConnected(true);
      setBotStatus('Connected to Deriv');
    } catch (error) {
      setBotStatus('Connection failed');
      console.error('Deriv connection error:', error);
    }
  };

  const executeTrade = async (contractType: string, stake: number) => {
    if (!isConnected) {
      setBotStatus('Not connected to Deriv');
      return;
    }

    try {
      const api = getApi();
      const proposal = await api.proposal({
        proposal: 1,
        subscribe: 1,
        amount: stake,
        basis: 'stake',
        contract_type: contractType,
        currency: 'USD',
        duration: 1,
        duration_unit: 't',
        symbol: market === 'Volatility 75 Index' ? 'R_75' : 'R_100',
      });

      const buyResponse = await api.buy({
        buy: proposal.id,
        price: stake,
      });

      const newPosition = `${contractType} ${market} for $${stake.toFixed(2)} - ID: ${buyResponse.contract_id}`;
      setPositions((current) => [newPosition, ...current]);
      setBotStatus(`${botType} executed trade`);

    } catch (error) {
      setBotStatus('Trade execution failed');
      console.error('Trade error:', error);
    }
  };

  const runMartingaleBot = async () => {
    const stakeAmount = Number(botStake);
    if (!stakeAmount || stakeAmount <= 0) return;

    let currentStake = stakeAmount;
    const side = Math.random() > 0.5 ? 'CALL' : 'PUT';

    await executeTrade(side, currentStake);

    // Martingale logic: double stake on loss
    setTimeout(async () => {
      if (Math.random() < 0.5) { // Simulate loss
        currentStake *= 2;
        await executeTrade(side, currentStake);
      }
    }, 2000);
  };

  const runTrendBot = async () => {
    const stakeAmount = Number(botStake);
    if (!stakeAmount || stakeAmount <= 0) return;

    // Simple trend following: alternate between CALL and PUT
    const side = Math.random() > 0.5 ? 'CALL' : 'PUT';
    await executeTrade(side, stakeAmount);
  };

  const runDigitBot = async () => {
    const stakeAmount = Number(botStake);
    if (!stakeAmount || stakeAmount <= 0) return;

    // Digit over/under bot
    const digitType = Math.random() > 0.5 ? 'DIGITOVER' : 'DIGITUNDER';
    await executeTrade(digitType, stakeAmount);
  };

  const handleDeposit = () => {
    setBalance((current) => current + 1000);
  };

  const handleStartBot = () => {
    if (!isConnected) {
      setBotStatus('Connect to Deriv first');
      return;
    }

    if (!botStake || Number(botStake) <= 0) {
      setBotStatus('Enter a valid bot stake');
      return;
    }

    setBotsRunning(true);
    setBotStatus(`${botType} starting...`);

    const interval = setInterval(() => {
      switch (botType) {
        case 'Martingale Bot':
          runMartingaleBot();
          break;
        case 'Trend Bot':
          runTrendBot();
          break;
        case 'Digit Over/Under Bot':
          runDigitBot();
          break;
      }
    }, 5000); // Trade every 5 seconds

    setBotInterval(interval);
    setBotStatus(`${botType} running`);
  };

  const handleStopBot = () => {
    if (botInterval) {
      clearInterval(botInterval);
      setBotInterval(null);
    }
    setBotsRunning(false);
    setBotStatus('Stopped');
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col lg:flex-row">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-8">
          DigitPrinters
        </h1>

        <nav className="space-y-4">

          <Link
            href="/dashboard"
            className="block p-3 rounded-xl bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            href="/trade"
            className="block p-3 rounded-xl hover:bg-gray-800"
          >
            Trade
          </Link>

          <Link
            href="/bots"
            className="block p-3 rounded-xl hover:bg-gray-800"
          >
            Bots
          </Link>

          <Link
            href="/signals"
            className="block p-3 rounded-xl hover:bg-gray-800"
          >
            Signals
          </Link>

          <Link
            href="/portfolio"
            className="block p-3 rounded-xl hover:bg-gray-800"
          >
            Portfolio
          </Link>

        </nav>
      </aside>

      {/* Main Area */}
      <section className="flex-1 p-8">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Trading Dashboard
          </h2>

          <div className="flex gap-4">

            <Link href="/login" className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-2xl inline-block">
              Login
            </Link>

            <Link href="/signup" className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-2xl inline-block">
              Sign Up
            </Link>

          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-3 gap-6">

          {/* Chart */}
          <div className="col-span-2 bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">
              Live Chart
            </h3>

            <div className="h-96 bg-gray-800 rounded-xl flex items-center justify-center">
              TradingView Chart Goes Here
            </div>
          </div>

          {/* Order Panel */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">
              Place Trade
            </h3>

            <input
              className="w-full p-3 rounded-xl bg-gray-800 mb-4"
              placeholder="Stake Amount"
            />

            <select className="w-full p-3 rounded-xl bg-gray-800 mb-4">
              <option>Volatility 75 Index</option>
              <option>Volatility 100 Index</option>
            </select>

            <div className="flex gap-4">
              <button className="flex-1 bg-green-600 p-3 rounded-xl">
                Buy
              </button>

              <button className="flex-1 bg-red-600 p-3 rounded-xl">
                Sell
              </button>
            </div>
          </div>

          {/* Open Positions */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">
              Open Positions
            </h3>

            <p>No active trades</p>
          </div>

          {/* Trading Bots */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">
              Trading Bots
            </h3>

            <select
              value={botType}
              onChange={(e) => setBotType(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 mb-4"
            >
              <option>Martingale Bot</option>
              <option>Trend Bot</option>
              <option>Digit Over/Under Bot</option>
            </select>

            <input
              value={botStake}
              onChange={(e) => setBotStake(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 mb-4"
              placeholder="Bot Stake ($)"
            />

            <input
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 mb-4"
              placeholder="Take Profit"
            />

            <input
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 mb-4"
              placeholder="Stop Loss"
            />

            <div className="flex gap-4 mb-4">
              <button
                onClick={handleStartBot}
                className="flex-1 bg-green-600 p-3 rounded-xl"
              >
                Start Bot
              </button>

              <button
                onClick={handleStopBot}
                className="flex-1 bg-red-600 p-3 rounded-xl"
              >
                Stop Bot
              </button>
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              Status: {botStatus}
            </div>
          </div>

          {/* Signals */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">
              Signals
            </h3>

            <p>No signals yet</p>
          </div>

        </div>
      </section>
    </main>
  );
}