"use client";

import { useEffect, useState } from "react";

export default function TradePage() {
  const [symbols, setSymbols] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);

  // Your App ID wired in here:
  const APP_ID = "332LK4VWd9A4pEEfTMn53";

  useEffect(() => {
    const ws = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`
    );

    ws.onopen = () => {
      console.log("Connected to Deriv WebSocket");

      ws.send(
        JSON.stringify({
          active_symbols: "brief",
          product_type: "basic"
        })
      );

      // Load contracts for Volatility 75 by default
      ws.send(
        JSON.stringify({
          contracts_for: "R_75",
          currency: "USD"
        })
      );
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      console.log("Received:", data);

      if (data.active_symbols) {
        const synthetics = data.active_symbols.filter(
          (s: any) => s.market === "synthetic_index"
        );

        setSymbols(synthetics);
      }

      if (data.contracts_for) {
        setContracts(data.contracts_for.available || []);
      }

      if (data.error) {
        console.error("Deriv API Error:", data.error);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-6">
        Deriv Markets Loaded
      </h1>

      <h2 className="text-xl mb-2">
        Volatility Indices
      </h2>

      <ul className="mb-8">
        {symbols.map((s) => (
          <li key={s.symbol}>
            {s.display_name}
          </li>
        ))}
      </ul>

      <h2 className="text-xl mb-2">
        Available Strategies
      </h2>

      <ul>
        {contracts.map((c, i) => (
          <li key={i}>
            {c.contract_type}
          </li>
        ))}
      </ul>
    </div>
  );
}