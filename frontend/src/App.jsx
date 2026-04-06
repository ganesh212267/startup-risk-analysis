import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StartupForm from "./components/StartupForm";
import Dashboard from "./components/Dashboard";
import CompareIdeas from "./components/CompareIdeas";
import History from "./components/History";
import Footer from "./components/Footer";

export default function App() {
  const [result, setResult] = useState(null);
  const [dark, setDark] = useState(true);
  const [quickHistory, setQuickHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quickHistory")) || [];
    setQuickHistory(saved);
  }, []);

  const handleNewResult = (data) => {
    setResult(data);

    const updatedHistory = [data, ...quickHistory].slice(0, 4);
    setQuickHistory(updatedHistory);
    localStorage.setItem("quickHistory", JSON.stringify(updatedHistory));

    setTimeout(() => {
      document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-100px] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-[200px] right-[-100px] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[20%] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      <Header dark={dark} setDark={setDark} />
      <Hero />

      <StartupForm setResult={handleNewResult} />

      {result && (
        <div id="dashboard">
          <Dashboard result={result} />
        </div>
      )}

      {quickHistory.length > 1 && (
        <section id="quick-compare" className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-3xl font-black text-white">Quick Compare</h2>
            <p className="mt-2 text-slate-400">
              Compare your most recent startup analyses side by side.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {quickHistory.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-5"
                >
                  <h3 className="text-lg font-bold text-blue-400">
                    {item.idea_name || `Idea ${index + 1}`}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p>
                      Risk:{" "}
                      <span className="font-semibold text-white">
                        {item.risk_level || "N/A"}
                      </span>
                    </p>
                    <p>
                      ROI:{" "}
                      <span className="font-semibold text-white">
                        {Number(item.roi || 0).toFixed(2)}%
                      </span>
                    </p>
                    <p>
                      Profit:{" "}
                      <span className="font-semibold text-white">
                        ₹{Number(item.profit || 0).toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Revenue:{" "}
                      <span className="font-semibold text-white">
                        ₹{Number(item.revenue || 0).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleNewResult(item)}
                    className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
                  >
                    Open in Dashboard
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CompareIdeas />

      <div id="history">
        <History setResult={handleNewResult} />
      </div>

      <Footer />
    </div>
  );
}