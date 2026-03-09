import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function SummaryCard({ title, value, detail, icon: Icon, gradient, delay = 0 }: SummaryCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-black tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-5 max-w-xs text-sm leading-6 text-slate-600">{detail}</p>
    </motion.article>
  );
}
