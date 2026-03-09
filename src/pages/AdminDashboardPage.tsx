import { motion } from "framer-motion";
import { ArrowUpRight, BellDot, Gauge, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { InquiryList } from "../components/admin/InquiryList";
import { SummaryCard } from "../components/admin/SummaryCard";
import { Metadata } from "../components/Metadata";
import { adminMockData, adminSummaryCards } from "../data/admin";

export function AdminDashboardPage() {
  return (
    <>
      <Metadata
        title="Admin Dashboard | Dafab Energies"
        description="Static admin dashboard for Dafab inquiries, projects, and performance metrics."
        path="/admin"
        noindex
      />

      <div className="space-y-6">
        <motion.section
          className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#1e293b_100%)] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.16)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">Overview</p>
            <h1 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Premium static admin control room for leads, delivery, and demand.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              This no-database panel shows how Dafab can present inquiry activity, project momentum, and traffic quality
              before a backend exists.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90">
                <Sparkles size={16} className="text-sky-300" />
                Mock auth enabled
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/90">
                <BellDot size={16} className="text-amber-300" />
                9 quotes pending response
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Next action</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Quote turnaround needs attention.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              High-intent inquiries from Owerri, Lagos, and Port Harcourt are still in queue. A faster response window will
              improve conversion.
            </p>

            <div className="mt-6 rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Fastest growing source</p>
                  <p className="mt-2 text-lg font-semibold">Organic search</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Gauge size={20} className="text-sky-300" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black tracking-tight">+12.4%</p>
              <p className="mt-2 text-sm text-slate-300">Search-driven visitors are producing steady mid-ticket inquiry demand.</p>
            </div>

            <Link
              to="/admin/insights"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
            >
              Review traffic insights
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {adminSummaryCards.map((card, index) => (
            <SummaryCard key={card.title} {...card} delay={index * 0.06} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          <InquiryList inquiries={adminMockData.inquiries} limit={4} />

          <div className="space-y-6">
            <div className="rounded-[1.9rem] border border-white/70 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Active projects</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Delivery pipeline</h2>
              <div className="mt-5 space-y-4">
                {adminMockData.projects.map((project) => (
                  <div key={project.id} className="rounded-[1.4rem] border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{project.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{project.client}</p>
                      </div>
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                        {project.stage}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        <span>Completion</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-white/70 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Operator notes</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>Move Lagos pharmacy quote from pending to issued before March 11, 2026.</li>
                <li>Confirm procurement timing for Oakline duplex battery bank.</li>
                <li>Prepare three-phase sizing assumptions for the Uyo agro-processing audit.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
