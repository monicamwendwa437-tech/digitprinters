"use client";

import { useEffect, useState } from "react";
import { getApi, getConnection } from "../lib/deriv";

export default function Dashboard() {
  const [status, setStatus] = useState("Websocket idle");
  const [balance, setBalance] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [messageLog, setMessageLog] = useState<string[]>([]);

  useEffect(() => {
    const apiInstance = getApi();
    const connection = getConnection();
    if (!connection) {
      setStatus("Websocket unavailable");
      return;
    }

    setStatus("Connecting websocket...");

    const handleOpen = () => {
      setStatus("Websocket connected");
      setMessageLog((prev) => ["Websocket open", ...prev].slice(0, 20));
    };

    const handleClose = () => {
      setStatus("Websocket disconnected");
      setMessageLog((prev) => ["Websocket closed", ...prev].slice(0, 20));
    };

    const handleError = () => {
      setStatus("Websocket error");
      setMessageLog((prev) => ["Websocket error", ...prev].slice(0, 20));
    };

    const handleMessage = (event: MessageEvent) => {
      const payload = typeof event.data === "string" ? event.data : JSON.stringify(event.data);
      setMessageLog((prev) => [payload, ...prev].slice(0, 20));
    };

    connection.addEventListener("open", handleOpen);
    connection.addEventListener("close", handleClose);
    connection.addEventListener("error", handleError);
    connection.addEventListener("message", handleMessage);

    return () => {
      connection.removeEventListener("open", handleOpen);
      connection.removeEventListener("close", handleClose);
      connection.removeEventListener("error", handleError);
      connection.removeEventListener("message", handleMessage);
      if (connection.readyState === WebSocket.OPEN || connection.readyState === WebSocket.CONNECTING) {
        connection.close();
      }
    };
  }, []);

  const handleAuthorize = async () => {
    if (!token) return;

    setStatus("Authorizing...");
    try {
      const apiInstance = getApi();
      await apiInstance.authorize(token);
      const acct = await apiInstance.balance();
      setBalance(acct.balance);
      setStatus("Authorized");
      setMessageLog((prev) => ["Authorized successfully", ...prev].slice(0, 20));
    } catch (e) {
      setStatus("Failed to authorize");
      setMessageLog((prev) => [`Authorize error: ${String(e)}`, ...prev].slice(0, 20));
      console.error(e);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">DigitPrinters Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-950 p-6 border border-slate-800">
            <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
            <p>{status}</p>
          </div>

          {!balance ? (
            <div className="rounded-xl bg-slate-950 p-6 border border-slate-800">
              <label className="block mb-2 text-sm font-medium">Enter your Deriv API Token</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="border border-slate-700 bg-slate-900 px-3 py-2 rounded-lg w-full"
                placeholder="Your API token"
              />
              <button
                onClick={handleAuthorize}
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Connect to Deriv
              </button>
            </div>
          ) : null}

          {balance && (
            <div className="rounded-xl bg-slate-950 p-6 border border-slate-800">
              <h2 className="text-xl font-semibold mb-2">Account Balance</h2>
              <p>${balance}</p>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-slate-950 p-6 border border-slate-800">
          <h2 className="text-xl font-semibold mb-4">Websocket Message Log</h2>
          <div className="max-h-80 overflow-y-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-200 whitespace-pre-wrap">
            {messageLog.length > 0 ? messageLog.join("\n\n") : "Waiting for websocket events..."}
          </div>
        </div>
      </div>
    </div>
  );
}
