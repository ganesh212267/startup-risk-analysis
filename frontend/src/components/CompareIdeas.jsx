import { useState } from "react";
import api from "../api";

export default function CompareIdeas() {
  const [ideaOne, setIdeaOne] = useState({
    idea_name: "",
    industry: "AI",
    market: "India",
    business_model: "Subscription",
    team_expertise: "Moderate",
    tech_complexity: "Moderate",
    investment: 500000,
    expenses: 100000,
  });

  const [ideaTwo, setIdeaTwo] = useState({
    idea_name: "",
    industry: "SaaS",
    market: "India",
    business_model: "B2B",
    team_expertise: "Moderate",
    tech_complexity: "Moderate",
    investment: 500000,
    expenses: 100000,
  });

  const [resultOne, setResultOne] = useState(null);
  const [resultTwo, setResultTwo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (setter, state, e) => {
    setter({ ...state, [e.target.name]: e.target.value });
  };

  const analyzeBoth = async () => {
    setLoading(true);
    try {
      const [res1, res2] = await Promise.all([
        api.post("/analyze", ideaOne),
        api.post("/analyze", ideaTwo),
      ]);

      setResultOne(res1.data);
      setResultTwo(res2.data);

      setTimeout(() => {
        document.getElementById("compare-results")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error("Compare error:", error);
      alert("Comparison failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const renderIdeaForm = (title, state, setter) => (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h3 className="text-2xl font-black text-white">{title}</h3>

      <div className="mt-4 grid gap-4">
        <input
          name="idea_name"
          placeholder="Startup name"
          value={state.idea_name}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        />

        <select
          name="industry"
          value={state.industry}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        >
          <option>AI</option>
          <option>SaaS</option>
          <option>E-commerce</option>
          <option>EdTech</option>
        </select>

        <input
          name="market"
          placeholder="Target market"
          value={state.market}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        />

        <select
          name="business_model"
          value={state.business_model}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        >
          <option>B2B</option>
          <option>B2C</option>
          <option>Subscription</option>
          <option>Freemium</option>
        </select>

        <select
          name="team_expertise"
          value={state.team_expertise}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        >
          <option>Beginner</option>
          <option>Moderate</option>
          <option>Experienced</option>
        </select>

        <select
          name="tech_complexity"
          value={state.tech_complexity}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        >
          <option>Simple</option>
          <option>Moderate</option>
          <option>Advanced</option>
        </select>

        <input
          type="number"
          name="investment"
          placeholder="Investment"
          value={state.investment}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        />

        <input
          type="number"
          name="expenses"
          placeholder="Expenses"
          value={state.expenses}
          onChange={(e) => handleChange(setter, state, e)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-white outline-none"
        />
      </div>
    </div>
  );

  const renderResultCard = (title, result) => {
    if (!result) return null;

    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-black text-white">{title}</h3>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl bg-blue-500/10 p-4 text-slate-200">
            Revenue: ₹{Number(result.revenue || 0).toLocaleString()}
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-4 text-slate-200">
            Profit: ₹{Number(result.profit || 0).toLocaleString()}
          </div>
          <div className="rounded-xl bg-violet-500/10 p-4 text-slate-200">
            ROI: {Number(result.roi || 0).toFixed(2)}%
          </div>
          <div className="rounded-xl bg-yellow-500/10 p-4 text-slate-200">
            Risk: {result.risk_level} ({Number(result.risk_score || 0).toFixed(0)})
          </div>
        </div>

        <p className="mt-4 text-slate-300">
          {result.executive_summary || result.description || "No summary available."}
        </p>
      </div>
    );
  };

  return (
    <section id="compare" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-3xl font-black text-white">Compare Startup Ideas</h2>
        <p className="mt-2 text-slate-400">
          Compare two startup ideas side by side to see which one has stronger potential.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {renderIdeaForm("Idea One", ideaOne, setIdeaOne)}
        {renderIdeaForm("Idea Two", ideaTwo, setIdeaTwo)}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={analyzeBoth}
          disabled={loading}
          className="rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105 disabled:opacity-70"
        >
          {loading ? "Comparing..." : "Compare Ideas"}
        </button>
      </div>

      {(resultOne || resultTwo) && (
        <div id="compare-results" className="mt-8 grid gap-6 md:grid-cols-2">
          {renderResultCard("Idea One Results", resultOne)}
          {renderResultCard("Idea Two Results", resultTwo)}
        </div>
      )}
    </section>
  );
}