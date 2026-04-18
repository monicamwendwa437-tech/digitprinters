export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <nav className="flex justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">DigitPrinters</h1>

        <div className="space-x-4">
          <button className="bg-blue-600 px-4 py-2 rounded-xl">
            Login
          </button>

          <button className="bg-green-600 px-4 py-2 rounded-xl">
            Connect Deriv
          </button>
        </div>
      </nav>

      <section className="text-center mt-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Smart Digit Trading Tools
        </h2>

        <p className="text-xl text-gray-300 mb-8">
          Signals, bots and manual trading for Deriv traders.
        </p>

        <a
          href="/dashboard"
          className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold inline-block"
        >
          Launch Dashboard
        </a>
      </section>

    </div>
  )
}
