import { motion } from "framer-motion";
import type { InquiryOrder } from "../../types/admin";

interface InquiryListProps {
  inquiries: InquiryOrder[];
  limit?: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function statusClassName(status: string) {
  if (status === "Won") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending Quote") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Quoted") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "Site Audit Scheduled") {
    return "bg-violet-100 text-violet-700";
  }

  return "bg-slate-100 text-slate-700";
}

function priorityClassName(priority: InquiryOrder["priority"]) {
  if (priority === "High") {
    return "text-rose-600";
  }

  if (priority === "Medium") {
    return "text-amber-600";
  }

  return "text-emerald-600";
}

export function InquiryList({ inquiries, limit }: InquiryListProps) {
  const items = typeof limit === "number" ? inquiries.slice(0, limit) : inquiries;

  return (
    <div className="rounded-[1.9rem] border border-white/70 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Inquiry orders</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Current demand queue</h2>
        </div>
        <p className="text-sm text-slate-500">Mock data from `mockData.json` for client-ready presentation.</p>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <tr>
              <th className="px-5 py-4">Client</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Budget</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Channel</th>
              <th className="px-5 py-4">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {items.map((inquiry, index) => (
              <motion.tr
                key={inquiry.id}
                className="border-t border-slate-100 align-top transition-colors hover:bg-slate-50/80"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">{inquiry.clientName}</p>
                  <p className="mt-1 text-slate-500">{inquiry.company}</p>
                  <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClassName(inquiry.priority)}`}>
                    {inquiry.priority} priority
                  </p>
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-800">{inquiry.service}</p>
                  <p className="mt-1 text-slate-500">{inquiry.location}</p>
                </td>
                <td className="px-5 py-4 font-medium text-slate-700">{inquiry.budget}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{inquiry.channel}</td>
                <td className="px-5 py-4 text-slate-600">{dateFormatter.format(new Date(inquiry.submittedAt))}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 lg:hidden">
        {items.map((inquiry, index) => (
          <motion.article
            key={inquiry.id}
            className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{inquiry.clientName}</p>
                <p className="mt-1 text-sm text-slate-500">{inquiry.company}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(inquiry.status)}`}>
                {inquiry.status}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Service</p>
                <p className="mt-1">{inquiry.service}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Budget</p>
                <p className="mt-1">{inquiry.budget}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Location</p>
                <p className="mt-1">{inquiry.location}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Channel</p>
                <p className="mt-1">{inquiry.channel}</p>
              </div>
            </div>
            <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.18em] ${priorityClassName(inquiry.priority)}`}>
              {inquiry.priority} priority
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{inquiry.notes}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Submitted {dateFormatter.format(new Date(inquiry.submittedAt))}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
