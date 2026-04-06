import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard({ result }) {
  const safeResult = result || {};

  const riskScore = Number(safeResult.risk_score || 0);
  const revenue = Number(safeResult.revenue || 0);
  const profit = Number(safeResult.profit || 0);
  const roi = Number(safeResult.roi || 0);

  const confidenceScore = useMemo(() => {
    let score = 50;

    if (safeResult.risk_level === "Low") score += 25;
    if (safeResult.risk_level === "Medium") score += 10;
    if (safeResult.risk_level === "High") score -= 10;

    if (roi > 25) score += 20;
    else if (roi > 10) score += 10;
    else score -= 10;

    if (profit > 0) score += 10;
    else score -= 10;

    return Math.max(0, Math.min(100, score));
  }, [safeResult.risk_level, roi, profit]);

  const [typedSummary, setTypedSummary] = useState("");

  useEffect(() => {
    const fullText =
      safeResult.executive_summary || "No executive summary available.";
    setTypedSummary("");

    let index = 0;
    const interval = setInterval(() => {
      setTypedSummary(fullText.slice(0, index + 1));
      index += 1;
      if (index >= fullText.length) clearInterval(interval);
    }, 18);

    return () => clearInterval(interval);
  }, [safeResult.executive_summary]);

  const riskData = {
    labels: ["Risk", "Safe Margin"],
    datasets: [
      {
        data: [riskScore, Math.max(0, 100 - riskScore)],
        backgroundColor: ["#ef4444", "#22c55e"],
        borderColor: ["#ef4444", "#22c55e"],
        borderWidth: 1,
      },
    ],
  };

  const financeData = {
    labels: ["Revenue", "Profit"],
    datasets: [
      {
        label: "Financial Overview",
        data: [revenue, profit],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderColor: ["#3b82f6", "#10b981"],
        borderWidth: 1,
      },
    ],
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("Startup Analysis Report", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Risk Level: ${safeResult.risk_level || "N/A"}`, 20, 40);
    pdf.text(`Risk Score: ${riskScore}`, 20, 50);
    pdf.text(`Revenue: ₹${revenue}`, 20, 60);
    pdf.text(`Profit: ₹${profit}`, 20, 70);
    pdf.text(`ROI: ${roi}%`, 20, 80);

    pdf.text(`Recommendation: ${safeResult.recommendation || "N/A"}`, 20, 95, {
      maxWidth: 170,
    });

    pdf.text(
      `Risk Explanation: ${
        safeResult.risk_explanation || "No risk explanation available."
      }`,
      20,
      120,
      { maxWidth: 170 }
    );

    pdf.text(
      `Executive Summary: ${
        safeResult.executive_summary || "No executive summary available."
      }`,
      20,
      155,
      { maxWidth: 170 }
    );

    pdf.save("startup-analysis-report.pdf");
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6 grid gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6"
        >
          <p className="text-sm text-slate-300">Revenue</p>
          <h2 className="mt-2 text-3xl font-black text-white">
            ₹{revenue.toLocaleString()}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6"
        >
          <p className="text-sm text-slate-300">Profit</p>
          <h2 className="mt-2 text-3xl font-black text-white">
            ₹{profit.toLocaleString()}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6"
        >
          <p className="text-sm text-slate-300">ROI</p>
          <h2 className="mt-2 text-3xl font-black text-white">{roi}%</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6"
        >
          <p className="text-sm text-slate-300">Confidence Score</p>
          <h2 className="mt-2 text-3xl font-black text-white">
            {confidenceScore}%
          </h2>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-2xl font-black text-white">Risk Analysis</h3>
          <div className="mx-auto max-w-xs">
            <Doughnut data={riskData} />
          </div>
          <p className="mt-4 text-slate-300">
            Risk Level:{" "}
            <span
              className={`rounded-lg px-3 py-1 font-bold ${
                safeResult.risk_level === "Low"
                  ? "bg-green-500/20 text-green-400"
                  : safeResult.risk_level === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {safeResult.risk_level || "N/A"}
            </span>
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="mb-4 text-2xl font-black text-white">
            Financial Overview
          </h3>
          <Bar data={financeData} />
          <p className="mt-4 text-slate-300">
            Your idea shows {profit > 0 ? "good" : "limited"} profit potential.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-bold text-white">Key Insight</h3>
        <p className="mt-3 text-slate-300">
          {roi > 25
            ? "This startup has strong profitability potential with good ROI."
            : roi > 10
            ? "Moderate returns expected. Consider optimizing expenses."
            : "Low ROI detected. High financial risk involved."}
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Startup Summary</h3>
        <p className="mt-3 leading-7 text-slate-300">
          {safeResult.description || "No summary available."}
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Executive Summary</h3>
        <p className="mt-3 min-h-[72px] leading-7 text-slate-300">
          {typedSummary}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Why This Risk Level?</h3>
        <p className="mt-3 leading-7 text-slate-300">
          {safeResult.risk_explanation || "No risk explanation available."}
        </p>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">SWOT Analysis</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <h4 className="font-bold text-emerald-400">Strengths</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {(safeResult.swot?.strengths || []).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
            <h4 className="font-bold text-red-400">Weaknesses</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {(safeResult.swot?.weaknesses || []).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
            <h4 className="font-bold text-blue-400">Opportunities</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {(safeResult.swot?.opportunities || []).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
            <h4 className="font-bold text-yellow-400">Threats</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {(safeResult.swot?.threats || []).map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Alternative Startup Ideas</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(safeResult.alternative_ideas || []).map((idea, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-slate-200"
            >
              {idea}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Existing Similar Startups</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {(safeResult.existing_startups || []).map((startup, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-4"
            >
              <h4 className="font-bold text-blue-400">{startup.name}</h4>
              <p className="mt-2 text-slate-300">{startup.info}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">AI Generated Pitch</h3>

        <div className="mt-4 space-y-4 text-slate-300">
          <div className="rounded-xl bg-slate-900/50 p-4">
            <h4 className="font-bold text-blue-400">Startup Pitch</h4>
            <p className="mt-2">{safeResult.pitch || "No pitch available."}</p>
          </div>

          <div className="rounded-xl bg-slate-900/50 p-4">
            <h4 className="font-bold text-emerald-400">Elevator Pitch</h4>
            <p className="mt-2">
              {safeResult.elevator_pitch || "No elevator pitch available."}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/50 p-4">
            <h4 className="font-bold text-yellow-400">Investor Summary</h4>
            <p className="mt-2">
              {safeResult.investor_summary || "No investor summary available."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">Recommendations</h3>
        <p className="mt-3 leading-7 text-slate-300">
          {safeResult.recommendation || "No recommendation available."}
        </p>
        <button
          onClick={downloadPDF}
          className="mt-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-emerald-500 px-6 py-3 font-bold text-slate-950 shadow-lg transition hover:scale-105"
        >
          Download PDF Report
        </button>
      </div>
    </section>
  );
}