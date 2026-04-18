"use client";

import { useEffect, useState } from "react";
import api from "../lib/deriv";

export default function Dashboard() {
  const [status, setStatus] = useState("Connecting...");
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    async function connect() {
      try {
        await api.authorize("pgv8gET5Oaqsmzs");
        const acct = await api.balance();
        setBalance(acct.balance);
        setStatus("Connected");
      } catch (e) {
        setStatus("Failed");
      }
    }
    connect();
  }, []);

  return (
    <div>
      <h1>DigitPrinters Dashboard</h1>
      <p>Status: {status}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
