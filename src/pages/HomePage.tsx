import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  BriefcaseBusiness,
  Cpu,
  ShoppingCart,
  SunMedium,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeStoreCard } from "../components/HomeStoreCard";
import { Metadata } from "../components/Metadata";
import { ProductModal } from "../components/ProductModal";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { products, services, siteConfig } from "../data/site";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

const serviceIconMap = {
  "inverter-installation": Cpu,
  "solar-panel-setup": SunMedium,
  "battery-storage": BatteryCharging,
  "electrical-accessories": BriefcaseBusiness,
};

export function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const featuredProducts = [
    products.find((product) => product.id === "growatt-12kw"),
    products.find((product) => product.id === "growatt-6kw"),
    products.find((product) => product.id === "growatt-5kw-es"),
    products.find((product) => product.id === "deye-3phase-ip66"),
  ].filter(Boolean) as Product[];

  function handleInquire(product: Product) {
    addItem(product);
    setSelectedProduct(null);
    navigate("/quote-cart");
  }

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
        <section className="relative min-h-[88vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={siteConfig.heroImage}
              alt="Dafab Energies solar installation"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-navy/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/78 via-brand-navy/44 to-brand-navy/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-[88vh] max-w-[1840px] items-end px-6 pb-20 pt-24 lg:px-14">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-3 rounded-full bg-brand-navy px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white shadow-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-gold" />
                Pioneering Energy Sovereignty
              </div>

              <h1 className="title-hero mt-10 text-white">
                <span className="block">Power That</span>
                <span className="block text-brand-gold">Never Sleeps.</span>
              </h1>

              <div className="mt-10 max-w-4xl rounded-[2rem] bg-[#ecdfcf]/90 px-9 py-8 shadow-2xl backdrop-blur-sm">
                <p className="text-[1.15rem] font-bold leading-[1.55] text-brand-navy sm:text-[1.35rem]">
                  Dafab Energies Nigeria Ltd delivers reliable and affordable solar energy solutions
                  for homes and businesses across Nigeria. Founded by a solar professional with over
                  10 years of experience, we provide sustainable, high-quality power solutions you can
                  trust.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 rounded-[1.35rem] bg-brand-forest px-14 py-6 text-xs font-extrabold uppercase tracking-[0.24em] text-white shadow-[0_18px_40px_rgba(21,128,61,0.25)] transition-all hover:scale-[1.02] hover:bg-brand-navy"
                >
                  Go To Store
                  <ShoppingCart size={16} />
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center rounded-[1.35rem] border border-slate-300 bg-white px-14 py-6 text-xs font-extrabold uppercase tracking-[0.24em] text-brand-navy shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all hover:scale-[1.02] hover:border-brand-navy"
                >
                  Schedule Engineering Audit
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="dot-surface px-6 py-24 lg:px-14">
          <div className="mx-auto max-w-[1840px]">
            <Reveal className="text-center">
              <SectionHeading
                eyebrow="Specialized services"
                title="Our Specialized Services"
                description="We provide engineered solutions beyond simple hardware retail."
                centered
              />
            </Reveal>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.id} delay={index * 0.08}>
                  <article className="overflow-hidden rounded-[2.6rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                    <div className="relative">
                      <img src={service.image} alt={service.title} className="h-[390px] w-full object-cover" />
                      <div className="absolute left-8 top-8 rounded-[1.5rem] bg-white p-6 shadow-lg">
                        {(() => {
                          const Icon =
                            serviceIconMap[service.id as keyof typeof serviceIconMap] ||
                            BriefcaseBusiness;
                          return <Icon size={28} className="text-brand-forest" />;
                        })()}
                      </div>
                    </div>
                    <div className="px-10 pb-10 pt-12">
                      <h3 className="title-card text-brand-navy">
                        {service.title}
                      </h3>
                      <p className="mt-6 max-w-2xl text-[1.05rem] leading-9 text-slate-500">
                        {service.summary}
                      </p>
                      <Link
                        to={`/services/${service.id}`}
                        className="mt-10 inline-flex items-center gap-3 rounded-[1.1rem] bg-brand-navy px-10 py-5 text-xs font-extrabold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-forest"
                      >
                        Learn More
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="dot-surface px-6 py-24 lg:px-14">
          <div className="mx-auto max-w-[1840px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="title-section text-brand-navy">
                  Online Store
                </h2>
                <p className="mt-4 text-[1.08rem] leading-8 text-slate-600">
                  Buy directly from Nigeria&apos;s authorized Tier-1 solar equipment supplier.
                </p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 self-start text-xs font-extrabold uppercase tracking-[0.24em] text-brand-forest transition-colors hover:text-brand-navy lg:self-auto"
              >
                See All Inventory
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.08}>
                  <HomeStoreCard
                    product={product}
                    onInspect={setSelectedProduct}
                    onAddToCart={handleInquire}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleInquire}
      />
    </>
  );
}
