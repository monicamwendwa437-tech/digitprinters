export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Sign Up for DigitPrinters
        </h1>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-green-400 hover:text-green-300">
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}