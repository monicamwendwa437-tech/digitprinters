import Link from "next/link";

export default function TradePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-8">
          DigitPrinters
        </h1>

        <nav className="space-y-4">
          <Link href="/dashboard" className="block p-3 rounded-xl hover:bg-gray-800">
            Dashboard
          </Link>
          <Link href="/trade" className="block p-3 rounded-xl bg-gray-800">
            Trade
          </Link>
          <Link href="/bots" className="block p-3 rounded-xl hover:bg-gray-800">
            Bots
          </Link>
          <Link href="/signals" className="block p-3 rounded-xl hover:bg-gray-800">
            Signals
          </Link>
          <Link href="/portfolio" className="block p-3 rounded-xl hover:bg-gray-800">
            Portfolio
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Manual Trading</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Order Form */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">Place Order</h3>

            <div className="space-y-4">
              <select className="w-full p-3 rounded-xl bg-gray-800">
                <option>Volatility 75 Index</option>
                <option>Volatility 100 Index</option>
              </select>

              <input
                className="w-full p-3 rounded-xl bg-gray-800"
                placeholder="Stake Amount ($)"
                type="number"
              />

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 p-3 rounded-xl">
                  Buy
                </button>
                <button className="flex-1 bg-red-600 p-3 rounded-xl">
                  Sell
                </button>
              </div>
            </div>
          </div>

          {/* Market Info */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">Market Information</h3>
            <p className="text-gray-400">Real-time market data will be displayed here.</p>
          </div>
        </div>
      </section>
    </main>
  );
}