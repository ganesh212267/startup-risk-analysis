import { useEffect, useState } from "react";
import api from "../api";

export default function History({ setResult }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");
      setHistory(res.data);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  };

  const handleViewDetails = (item) => {
    setResult(item);

    setTimeout(() => {
      document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Saved Analysis History</h3>
        <p className="mt-2 text-slate-400">
          Review your previously analyzed startup ideas and reopen them instantly.
        </p>

        {history.length === 0 ? (
          <p className="mt-6 text-slate-300">No saved analyses yet.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-blue-500/40 hover:bg-slate-900/70"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-blue-400">
                      {item.idea_name || "Untitled Startup"}
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.industry || "General"} • {item.business_model || "Model"} • {item.market || "Market"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                      Revenue: ₹{Number(item.revenue || 0).toLocaleString()}
                    </span>
                    <span className="rounded-lg bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
                      Profit: ₹{Number(item.profit || 0).toLocaleString()}
                    </span>
                    <span className="rounded-lg bg-violet-500/20 px-3 py-1 text-sm text-violet-300">
                      ROI: {Number(item.roi || 0).toFixed(2)}%
                    </span>
                    <span className="rounded-lg bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300">
                      Risk: {Number(item.risk_score || 0)}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {item.recommendation || "No recommendation available."}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}