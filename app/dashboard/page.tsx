export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="flex items-center mb-8">
        <span className="text-4xl mr-2">🖨️</span>
        <span className="text-4xl font-bold text-yellow-500">DigitPrinters</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-black p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">Account Status</h2>
          <p>Not Connected to Deriv</p>
        </div>

        <div className="bg-black p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">Digit Signals</h2>
          <p>No signals running</p>
        </div>

        <div className="bg-black p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">Trading Bot</h2>
          <button className="bg-green-600 px-4 py-2 rounded-xl">
            Start Bot
          </button>
        </div>

        <div className="bg-black p-6 rounded-2xl">
          <h2 className="text-2xl font-bold">Manual Trading</h2>
          <p>Manual trading interface</p>
        </div>

      </div>

    </div>
  )
}