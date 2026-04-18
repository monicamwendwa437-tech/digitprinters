"use client";

import { useEffect, useState } from "react";
import { getApi } from "../lib/deriv";

export default function Dashboard() {
  const [status, setStatus] = useState("Not Connected");
  const [balance, setBalance] = useState<string | null>(null);
  const [token, setToken] = useState("");

  const handleAuthorize = async () => {
    if (!token) return;
    setStatus("Connecting...");
    try {
      const apiInstance = getApi();
      await apiInstance.authorize(token);
      const acct = await apiInstance.balance();
      setBalance(acct.balance);
      setStatus("Connected");
    } catch (e) {
      setStatus("Failed to connect");
      console.error(e);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">DigitPrinters Dashboard</h1>
      {!balance ? (
        <div className="mb-4">
          <label className="block mb-2">Enter your Deriv API Token:</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Your API token"
          />
          <button
            onClick={handleAuthorize}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Connect to Deriv
          </button>
        </div>
      ) : null}
      <p>Status: {status}</p>
      {balance && <p>Balance: {balance}</p>}
    </div>
  );
}
