import { useEffect, useState } from "react";

export default function Header({ dark, setDark }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "analyze", "dashboard", "compare", "history"];

    const handleScroll = () => {
      let current = "hero";

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (section) =>
    `transition px-3 py-2 rounded-lg ${
      activeSection === section
        ? "bg-blue-500/20 text-blue-400"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="cursor-pointer">
          <h1 className="text-xl font-extrabold tracking-wide text-blue-400 hover:text-blue-300 transition">
            Smart Startup
          </h1>
          <p className="text-xs text-slate-400">Risk & Profit Analyzer</p>
        </div>

        <nav className="flex items-center gap-2 text-sm">
          <a href="#hero" className={linkClass("hero")}>
            Home
          </a>

          <a href="#analyze" className={linkClass("analyze")}>
            Analyze
          </a>

          <a href="#dashboard" className={linkClass("dashboard")}>
            Dashboard
          </a>

          <a href="#compare" className={linkClass("compare")}>
            Compare
          </a>

          <a href="#history" className={linkClass("history")}>
            History
          </a>

          <button
            onClick={() => setDark(!dark)}
            className="ml-2 rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 px-4 py-2 text-white transition hover:scale-105 hover:from-blue-500/30 hover:to-emerald-500/30"
          >
            {dark ? "Light" : "Dark"} Mode
          </button>
        </nav>
      </div>
    </header>
  );
}