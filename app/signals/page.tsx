import Link from "next/link";

export default function SignalsPage() {
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
          <Link href="/trade" className="block p-3 rounded-xl hover:bg-gray-800">
            Trade
          </Link>
          <Link href="/bots" className="block p-3 rounded-xl hover:bg-gray-800">
            Bots
          </Link>
          <Link href="/signals" className="block p-3 rounded-xl bg-gray-800">
            Signals
          </Link>
          <Link href="/portfolio" className="block p-3 rounded-xl hover:bg-gray-800">
            Portfolio
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">Trading Signals</h2>

        <div className="space-y-4">
          {/* Signal 1 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl">Volatility 75 Index</h3>
                <p className="text-gray-400">Signal: BUY - Confidence: 85%</p>
              </div>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>

          {/* Signal 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl">Volatility 100 Index</h3>
                <p className="text-gray-400">Signal: SELL - Confidence: 72%</p>
              </div>
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>

          {/* Signal 3 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl">Crash 1000 Index</h3>
                <p className="text-gray-400">Signal: HOLD - Confidence: 60%</p>
              </div>
              <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                Pending
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}