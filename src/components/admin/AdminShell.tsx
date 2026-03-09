import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminNavItems } from "../../data/admin";
import { siteConfig } from "../../data/site";
import { clearAdminSession } from "../../lib/adminAuth";

function navClassName(isActive: boolean) {
  return `group flex items-center gap-4 rounded-[1.4rem] px-4 py-3 text-sm font-semibold transition-all duration-300 ${
    isActive
      ? "bg-white text-slate-950 shadow-[0_20px_45px_rgba(15,23,42,0.18)]"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;
}

export function AdminShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  function handleLogout() {
    clearAdminSession();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] text-slate-900">
      <motion.aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[296px] flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(180deg,_rgba(2,6,23,0.96)_0%,_rgba(15,23,42,0.94)_52%,_rgba(30,41,59,0.96)_100%)] px-6 py-7 text-white shadow-[0_32px_80px_rgba(15,23,42,0.35)] lg:flex"
        initial={{ x: -36, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Link to="/" className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
          <img src={siteConfig.logo} alt={siteConfig.shortName} className="h-12 w-auto" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-sky-200/80">
            Visual Admin Architect
          </p>
          <p className="mt-2 text-sm text-slate-300">Static control room for inquiries, projects, and demand signals.</p>
        </Link>

        <nav className="mt-8 space-y-2">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => navClassName(isActive)}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${
                        isActive ? "bg-slate-950 text-sky-300" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p>{item.label}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {item.label === "Dashboard"
                          ? "Executive summary"
                          : item.label === "Inquiries"
                            ? "Pipeline list"
                            : item.label === "Projects"
                              ? "Delivery health"
                              : "Traffic and conversion"}
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-[1.8rem] border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Session</p>
          <p className="mt-3 text-sm text-slate-200">Mock-auth enabled. Local-only access for demos and client walkthroughs.</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[1.1rem] border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>

      <div className="lg:pl-[296px]">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={siteConfig.logo} alt={siteConfig.shortName} className="h-10 w-auto" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Admin</p>
                <p className="text-sm font-semibold text-slate-900">Control Room</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              aria-label="Toggle admin navigation"
            >
              {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              className="fixed inset-0 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                aria-label="Close admin navigation"
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col overflow-y-auto bg-[linear-gradient(180deg,_rgba(2,6,23,0.98)_0%,_rgba(15,23,42,0.96)_100%)] px-5 py-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
                initial={{ x: -28 }}
                animate={{ x: 0 }}
                exit={{ x: -28 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/80">Admin panel</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">Navigation</h2>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="mt-8 space-y-2">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => navClassName(isActive)}
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                          <Icon size={18} />
                        </span>
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-[1.1rem] bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
