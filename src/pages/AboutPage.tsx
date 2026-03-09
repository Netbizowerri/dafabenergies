import { motion } from "framer-motion";
import {
  BadgeCheck,
  Globe2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const impactStats = [
  { value: "2015", label: "Founded" },
  { value: "1,500+", label: "Engineered Sites" },
  { value: "12.4", label: "Clean Energy (MW)" },
];

const values = [
  {
    title: "Integrity",
    text: "Honest dealings and transparent service delivery",
    icon: ShieldCheck,
  },
  {
    title: "Quality",
    text: "Use of reliable products and professional workmanship",
    icon: BadgeCheck,
  },
  {
    title: "Innovation",
    text: "Smart, efficient, and future-ready energy solutions",
    icon: Lightbulb,
  },
  {
    title: "Customer Focus",
    text: "Tailored solutions that meet real energy needs",
    icon: HeartHandshake,
  },
  {
    title: "Sustainability",
    text: "Commitment to environmental responsibility",
    icon: Globe2,
  },
];

export function AboutPage() {
  return (
    <>
      <Metadata
        title="About Dafab Energies | Sustainable Solar Power in Nigeria"
        description="Learn about Dafab Energies Nigeria Ltd, our mission, impact, and core engineering values powering sustainable energy across Nigeria."
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
              title="Empowering Nigeria with Sustainable Power."
              description="Dafab Energies Nigeria Ltd delivers reliable and affordable solar energy solutions for homes and businesses across Nigeria."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <div className="panel p-8 sm:p-10">
                <p className="text-lg leading-8 text-slate-600">
                  Founded by a solar professional with over 10 years of experience in both international
                  and local renewable energy companies, we combine global expertise with local knowledge
                  to provide sustainable, high-quality power solutions you can trust.
                </p>

                <div className="mt-8 rounded-[2rem] bg-brand-navy p-6 text-white sm:p-8">
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-gold/90">
                    Our Mission
                  </p>
                  <blockquote className="mt-4 max-w-3xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                    To power homes, businesses, and communities with clean, reliable, and affordable solar
                    energy, while delivering exceptional service and long-lasting value.
                  </blockquote>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="panel h-full overflow-hidden">
                <img
                  src="https://i.ibb.co/Zzcf30KY/Dafab-Energies.jpg"
                  alt="Dafab Energies solar installation team"
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {impactStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                  <div className="h-1.5 bg-gradient-to-r from-brand-forest via-brand-gold to-brand-navy" />
                  <div className="p-8 text-center">
                    <p className="font-display text-5xl font-extrabold tracking-tight text-brand-navy">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.26em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Reveal>
              <SectionHeading
                eyebrow="Dafab Engineering Values"
                title="Our Core Values"
                description="The operating principles behind every audit, recommendation, installation, and long-term power solution we deliver."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <Reveal key={value.title} delay={index * 0.08}>
                    <article className="panel h-full p-6">
                      <div className="inline-flex rounded-2xl bg-brand-sand p-3 text-brand-forest">
                        <Icon size={22} />
                      </div>
                      <h3 className="title-card mt-5 text-brand-navy">{value.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
