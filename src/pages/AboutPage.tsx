import { motion } from "framer-motion";
import { CheckCircle2, Shield, Workflow, Wrench } from "lucide-react";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/site";

const principles = [
  {
    title: "Engineering before sales",
    text: "Load profiling, protection planning, and system fit come before hardware recommendations.",
    icon: Workflow,
  },
  {
    title: "Protection-led installs",
    text: "Dafab prioritizes safe architecture, not just inverter capacity or panel count.",
    icon: Shield,
  },
  {
    title: "Serviceable systems",
    text: "Layouts, labeling, and component choice are made with maintenance and support in mind.",
    icon: Wrench,
  },
];

export function AboutPage() {
  return (
    <>
      <Metadata
        title="About Dafab Energies | Solar Engineering for Nigeria"
        description="Learn how Dafab Energies approaches solar engineering, hybrid inverter systems, and long-life power infrastructure for Nigerian clients."
        path="/about"
      />

      <motion.section
        className="px-4 py-14 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="About Dafab"
              title="A solar business shaped by field experience, not generic catalogue selling."
              description="Dafab Energies supports residential, commercial, and facility clients who need dependable power strategy, not guesswork."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <div className="panel p-8 sm:p-10">
                <p className="text-lg leading-8 text-slate-600">
                  {siteConfig.shortName} was built around practical solar delivery in Nigeria: unstable
                  grid performance, mixed load profiles, maintenance realities, and the need for systems
                  that keep operating after installation day. The company combines product supply with site
                  audits, commissioning discipline, and after-installation support.
                </p>
                <div className="mt-8 grid gap-4">
                  {[
                    "Hybrid inverter deployment for homes, offices, and mixed-use properties",
                    "Battery storage planning for uptime and lifecycle value",
                    "Protection accessories and monitoring selected around system risk",
                    "Installation handover focused on safety and real-world operation",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-brand-mist p-4 text-sm text-brand-ink">
                      <CheckCircle2 size={18} className="mt-0.5 text-brand-forest" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="panel h-full overflow-hidden">
                <img
                  src="https://i.ibb.co/Zzcf30KY/Dafab-Energies.jpg"
                  alt="Dafab Energies solar setup"
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={index * 0.08}>
                  <article className="panel h-full p-8">
                    <div className="inline-flex rounded-2xl bg-brand-sand p-3 text-brand-forest">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-brand-navy">{principle.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{principle.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </motion.section>
    </>
  );
}
