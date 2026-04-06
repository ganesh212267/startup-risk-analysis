import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_30%)]" />

      <div className="absolute left-10 top-24 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-10 top-40 h-28 w-28 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-16 left-1/4 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
          AI-powered startup idea validation
        </div>

        <h2 className="text-5xl font-black leading-tight md:text-7xl">
          Analyze Your Startup
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            Risk, ROI & Market Potential
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Get instant startup insights, risk explanation, alternative ideas,
          similar existing startups, and a downloadable report in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#analyze"
            className="rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
          >
            Start Analysis
          </a>

          <a
            href="#dashboard"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-200 transition hover:bg-white/10"
          >
            View Dashboard
          </a>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Core Analysis</p>
            <h3 className="mt-2 text-2xl font-black text-white">Risk + ROI</h3>
            <p className="mt-2 text-sm text-slate-400">
              Evaluate startup risk, expected return, and execution strength.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Market Insight</p>
            <h3 className="mt-2 text-2xl font-black text-white">Alternatives</h3>
            <p className="mt-2 text-sm text-slate-400">
              Discover adjacent startup ideas and similar existing players.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-500/20 bg-violet-500/10 p-6 backdrop-blur-xl">
            <p className="text-sm text-slate-300">Founder Output</p>
            <h3 className="mt-2 text-2xl font-black text-white">PDF Report</h3>
            <p className="mt-2 text-sm text-slate-400">
              Export your business-style analysis into a clean presentation-ready file.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}