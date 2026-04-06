export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-black text-white">Smart Startup</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            A premium startup analysis platform that helps founders validate ideas,
            understand risk, and present data-driven business insights.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
            <a href="#hero" className="transition hover:text-white">Home</a>
            <a href="#analyze" className="transition hover:text-white">Analyze</a>
            <a href="#dashboard" className="transition hover:text-white">Dashboard</a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white">Why This Project?</h4>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Built to help founders, students, and hackathon teams evaluate startup ideas
            with smart financial and risk insights.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-sm text-slate-500">
        © 2026 Smart Startup. Built for professional startup analysis.
      </div>
    </footer>
  );
}