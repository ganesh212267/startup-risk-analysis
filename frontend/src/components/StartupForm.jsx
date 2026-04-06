import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

export default function StartupForm({ setResult }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    idea_name: "",
    industry: "AI",
    market: "India",
    business_model: "Subscription",
    team_expertise: "Moderate",
    tech_complexity: "Moderate",
    investment: 500000,
    expenses: 100000,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/analyze", formData);
      setResult(res.data);
    } catch (error) {
      console.error("Analyze error:", error);
      alert("Analysis failed. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  const liveRevenue = Number(formData.expenses) * 2.3;
  const liveProfit = liveRevenue - Number(formData.expenses);
  const liveROI =
    Number(formData.investment) > 0
      ? ((liveProfit / Number(formData.investment)) * 100).toFixed(2)
      : 0;

  return (
    <section id="analyze" className="mx-auto max-w-6xl px-6 py-16">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <h2 className="text-3xl font-black text-white">Analyze Your Startup Idea</h2>
          <p className="mt-2 text-slate-400">
            Enter your startup details and get a premium business-style analysis.
          </p>
        </div>

        <input
          name="idea_name"
          placeholder="E.g., AI-powered Learning Platform"
          value={formData.idea_name}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        />

        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        >
          <option>AI</option>
          <option>SaaS</option>
          <option>E-commerce</option>
          <option>EdTech</option>
        </select>

        <input
          name="market"
          placeholder="Target Market"
          value={formData.market}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        />

        <select
          name="business_model"
          value={formData.business_model}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        >
          <option>B2B</option>
          <option>B2C</option>
          <option>Subscription</option>
          <option>Freemium</option>
        </select>

        <select
          name="team_expertise"
          value={formData.team_expertise}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        >
          <option>Beginner</option>
          <option>Moderate</option>
          <option>Experienced</option>
        </select>

        <select
          name="tech_complexity"
          value={formData.tech_complexity}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none transition focus:border-blue-400"
        >
          <option>Simple</option>
          <option>Moderate</option>
          <option>Advanced</option>
        </select>

        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <label className="mb-3 block text-sm font-semibold text-slate-300">
            Estimated Investment: ₹{Number(formData.investment).toLocaleString()}
          </label>
          <input
            type="range"
            min="50000"
            max="5000000"
            step="50000"
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <label className="mb-3 block text-sm font-semibold text-slate-300">
            Monthly Expenses: ₹{Number(formData.expenses).toLocaleString()}
          </label>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            name="expenses"
            value={formData.expenses}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <p className="text-sm text-slate-300">Live Revenue</p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              ₹{liveRevenue.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="text-sm text-slate-300">Live Profit</p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              ₹{liveProfit.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
            <p className="text-sm text-slate-300">Live ROI</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{liveROI}%</h3>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 p-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing Startup...
            </>
          ) : (
            "Analyze Startup"
          )}
        </button>
      </motion.form>
    </section>
  );
}