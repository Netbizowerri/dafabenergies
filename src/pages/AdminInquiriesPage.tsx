import { motion } from "framer-motion";
import { Metadata } from "../components/Metadata";
import { InquiryList } from "../components/admin/InquiryList";
import { adminMockData } from "../data/admin";

export function AdminInquiriesPage() {
  const statusCounts = adminMockData.inquiries.reduce<Record<string, number>>((accumulator, inquiry) => {
    accumulator[inquiry.status] = (accumulator[inquiry.status] || 0) + 1;
    return accumulator;
  }, {});

  return (
    <>
      <Metadata
        title="Inquiry Orders | Dafab Admin"
        description="Mock inquiry order list for the static Dafab admin panel."
        path="/admin/inquiries"
        noindex
      />

      <div className="space-y-6">
        <motion.section
          className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inquiry list</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">All inquiry orders</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            The list below is populated from the local mock dataset so the client can preview how incoming jobs, channels,
            and quote priorities will appear before a database is connected.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <span
                key={status}
                className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {status}: {count}
              </span>
            ))}
          </div>
        </motion.section>

        <InquiryList inquiries={adminMockData.inquiries} />
      </div>
    </>
  );
}
