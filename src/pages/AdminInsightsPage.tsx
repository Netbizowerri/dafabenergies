import { motion } from "framer-motion";
import { Metadata } from "../components/Metadata";
import { adminMockData } from "../data/admin";

export function AdminInsightsPage() {
  return (
    <>
      <Metadata
        title="Insights | Dafab Admin"
        description="Mock website traffic and conversion insights for the static Dafab admin panel."
        path="/admin/insights"
        noindex
      />

      <div className="space-y-6">
        <motion.section
          className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Insights</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Traffic quality and conversion signals</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            These static analytics tiles help the client visualize how a future admin area can surface marketing and sales
            performance without waiting for a backend integration.
          </p>
        </motion.section>

        <section className="grid gap-5 xl:grid-cols-4">
          {adminMockData.trafficSources.map((source, index) => (
            <motion.article
              key={source.source}
              className="rounded-[1.9rem] border border-white/70 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,0.08)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{source.source}</p>
              <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{source.visits.toLocaleString()}</p>
              <p className="mt-2 text-sm text-slate-500">Visits</p>
              <div className="mt-5 flex items-center justify-between rounded-[1.3rem] bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-600">Conversion</span>
                <span className="font-semibold text-slate-900">{source.conversionRate}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-emerald-600">{source.delta} vs previous period</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[1.9rem] border border-white/70 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Conversion cues</p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <p>Organic traffic is delivering the best visit growth and steady quote intent.</p>
              <p>WhatsApp continues to outperform on conversion rate, indicating strong referral quality.</p>
              <p>Instagram still contributes discovery volume, but sales follow-up speed matters more for closure.</p>
            </div>
          </div>

          <div className="rounded-[1.9rem] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_20px_55px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Recommended focus</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">Prioritize quote speed for high-budget hybrid leads.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The strongest commercial upside comes from keeping search-driven hybrid and storage inquiries moving within a
              24-hour turnaround window.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
