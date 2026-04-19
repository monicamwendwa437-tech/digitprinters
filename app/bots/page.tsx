import Link from "next/link";

export default function BotsPage() {
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
          <Link href="/bots" className="block p-3 rounded-xl bg-gray-800">
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
        <h2 className="text-3xl font-bold mb-8">Trading Bots</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bot 1 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">Martingale Bot</h3>
            <p className="text-gray-400 mb-4">Doubles stake on losses</p>
            <button className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-xl">
              Start Bot
            </button>
          </div>

          {/* Bot 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">Trend Bot</h3>
            <p className="text-gray-400 mb-4">Follows market trends</p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-xl">
              Start Bot
            </button>
          </div>

          {/* Bot 3 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl mb-4">Digit Bot</h3>
            <p className="text-gray-400 mb-4">Over/under digit trading</p>
            <button className="w-full bg-purple-600 hover:bg-purple-500 p-3 rounded-xl">
              Start Bot
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}