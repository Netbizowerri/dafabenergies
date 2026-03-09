import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Metadata } from "../components/Metadata";
import { setAdminLoggedIn, isAdminLoggedIn } from "../lib/adminAuth";

const DEMO_EMAIL = "admin@dafab.com";
const DEMO_PASSWORD = "solar2026";

export function LoginPage() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin";

  if (isAdminLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Use the demo credentials shown below to enter the static admin panel.");
      return;
    }

    setAdminLoggedIn();
    navigate(redirectTo, { replace: true });
  }

  return (
    <>
      <Metadata
        title="Admin Login | Dafab Energies"
        description="Mock-auth access point for the static Dafab admin dashboard."
        path="/login"
        noindex
      />

      <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#edf2f7_100%)] px-4 py-10">
        <motion.div
          className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-[0_28px_70px_rgba(15,23,42,0.10)] backdrop-blur"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Homepage
          </Link>

          <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-[1.6rem] bg-slate-950 text-white">
            <LockKeyhole size={22} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Mock auth</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Admin login</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use the demo credentials to preview the no-database admin dashboard.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="admin@dafab.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="Enter password"
              />
            </label>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-[1.2rem] bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Enter dashboard
            </button>
          </form>

          <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Demo credentials</p>
            <p className="mt-2">Email: {DEMO_EMAIL}</p>
            <p>Password: {DEMO_PASSWORD}</p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
