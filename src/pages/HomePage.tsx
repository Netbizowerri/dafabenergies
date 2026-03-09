import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sun, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Metadata } from "../components/Metadata";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { SolarCalculator } from "../components/SolarCalculator";
import { products, services, siteConfig, stats } from "../data/site";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import type { Product } from "../types";

const iconMap = [Sun, ShieldCheck, Zap, CheckCircle2];

export function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  return (
    <>
      <Metadata
        title="Dafab Energies | Solar Engineering and Hybrid Power Solutions"
        description="Solar engineering, inverter installations, lithium storage, and audit-led energy systems for Nigerian homes and businesses."
        path="/"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.24em] text-brand-forest shadow-md">
                <span className="h-2 w-2 rounded-full bg-brand-gold" />
                Reliable power for Nigeria
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] text-brand-navy sm:text-6xl lg:text-7xl">
                Power systems that stay stable when the grid does not.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {siteConfig.shortName} delivers audit-led solar engineering, hybrid inverter deployment,
                lithium storage, and critical protection hardware for homes, offices, and commercial
                facilities.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/shop" className="btn-primary gap-2">
                  Explore hardware
                  <ArrowRight size={16} />
                </Link>
                <Link to="/booking" className="btn-secondary">
                  Schedule engineering audit
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => {
                  const Icon = iconMap[index];

                  return (
                    <div key={stat.label} className="panel p-5">
                      <Icon className="text-brand-forest" size={18} />
                      <p className="mt-4 font-display text-2xl font-extrabold text-brand-navy">{stat.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-24 w-24 rounded-full bg-brand-gold/25 blur-3xl lg:block" />
              <div className="absolute -right-6 bottom-10 hidden h-32 w-32 rounded-full bg-brand-forest/20 blur-3xl lg:block" />
              <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/70 p-4 shadow-glow backdrop-blur">
                <img
                  src={siteConfig.heroImage}
                  alt="Dafab Energies solar installation"
                  className="h-[520px] w-full rounded-[2rem] object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 rounded-[1.75rem] bg-brand-navy/82 p-6 text-white backdrop-blur">
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">
                    {siteConfig.registration}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-8">
                    Hybrid systems, storage, and protection hardware selected for long service life and
                    day-to-day reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Specialized services"
                title="Audit-led engineering before equipment leaves the shelf."
                description="Dafab handles design intent, component matching, field installation, and system protection as one coordinated delivery."
              />
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.id} delay={index * 0.08}>
                  <article className="panel overflow-hidden">
                    <div className="grid md:grid-cols-[0.82fr_1.18fr]">
                      <img src={service.image} alt={service.title} className="h-full min-h-72 w-full object-cover" />
                      <div className="p-8">
                        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-forest/70">
                          {service.kicker}
                        </p>
                        <h3 className="mt-3 font-display text-2xl font-extrabold text-brand-navy">
                          {service.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">{service.summary}</p>
                        <ul className="mt-6 grid gap-3">
                          {service.outcomes.slice(0, 3).map((outcome) => (
                            <li key={outcome} className="flex items-start gap-3 text-sm text-brand-ink">
                              <CheckCircle2 size={18} className="mt-0.5 text-brand-forest" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                        <Link to={`/services/${service.id}`} className="btn-secondary mt-8">
                          View service detail
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SolarCalculator />
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <SectionHeading
                  eyebrow="Hardware catalogue"
                  title="Ready stock for serious backup and solar upgrades."
                  description="Dafab’s store covers inverters, panels, batteries, and protection accessories. Use the quote cart to request the exact mix you need."
                />
              </Reveal>
              <Link to="/shop" className="btn-secondary">
                Browse full shop
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.slice(0, 4).map((product, index) => (
                <Reveal key={product.id} delay={index * 0.08}>
                  <ProductCard
                    product={product}
                    onInspect={setSelectedProduct}
                    onAddToCart={addItem}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addItem} />
    </>
  );
}
