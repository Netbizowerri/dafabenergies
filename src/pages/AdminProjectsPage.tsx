import { motion } from "framer-motion";
import { CalendarClock, Zap } from "lucide-react";
import { Metadata } from "../components/Metadata";
import { adminMockData } from "../data/admin";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function AdminProjectsPage() {
  return (
    <>
      <Metadata
        title="Projects | Dafab Admin"
        description="Mock active project board for the static Dafab admin panel."
        path="/admin/projects"
        noindex
      />

      <div className="space-y-6">
        <motion.section
          className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Projects</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Active installations and quote delivery</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            This board demonstrates how the admin area can track work after a lead becomes active, even while the stack is
            still static and database-free.
          </p>
        </motion.section>

        <section className="grid gap-5 xl:grid-cols-3">
          {adminMockData.projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="rounded-[1.9rem] border border-white/70 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{project.id}</p>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{project.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{project.client}</p>
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{project.stage}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.4rem] bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <Zap size={16} className="text-amber-500" />
                    <span>{project.systemSize}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-700">
                    <CalendarClock size={16} className="text-sky-500" />
                    <span>Due {dateFormatter.format(new Date(project.dueDate))}</span>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>Completion</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </>
  );
}
