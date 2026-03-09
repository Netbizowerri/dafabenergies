import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Metadata } from "../components/Metadata";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { Reveal } from "../components/Reveal";
import { products, services, siteConfig } from "../data/site";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === serviceId);
  const relatedProducts = products.filter((product) =>
    service ? service.relatedCategories.includes(product.category) : false,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  function handleInquire(product: Product) {
    addItem(product);
    setSelectedProduct(null);
    navigate("/quote-cart");
  }

  if (!service) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Metadata
          title="Service Not Found | Dafab Energies"
          description="The requested service page could not be found."
          noindex
        />
        <div className="mx-auto max-w-4xl panel p-10 text-center">
          <h1 className="title-page text-brand-navy">Service not found</h1>
          <p className="mt-4 text-sm text-slate-600">
            The requested service page is missing or no longer available.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Contact Dafab
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Metadata
        title={`${service.title} | Dafab Energies`}
        description={service.summary}
        path={`/services/${service.id}`}
        image={service.image}
      />

      <motion.section
        className="px-4 py-14 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <Reveal>
              <div className="panel p-8 sm:p-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-forest/70">
                  {service.kicker}
                </p>
                <h1 className="title-page mt-4 text-brand-navy">
                  {service.title}
                </h1>
                <p className="mt-5 text-base leading-8 text-slate-600">{service.description}</p>
                <div className="mt-8 grid gap-4">
                  {service.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3 rounded-2xl bg-brand-mist p-4 text-sm text-brand-ink">
                      <CheckCircle2 size={18} className="mt-0.5 text-brand-forest" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link to="/booking" className="btn-primary gap-2">
                    Book a site audit
                    <ArrowRight size={16} />
                  </Link>
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="btn-secondary">
                    WhatsApp Dafab
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="panel overflow-hidden">
                <img src={service.image} alt={service.title} className="h-full min-h-[440px] w-full object-cover" />
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <Reveal>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-forest/70">
                    Related hardware
                  </p>
                  <h2 className="title-section mt-3 text-brand-navy">
                    Components often paired with this service.
                  </h2>
                </div>
                <Link to="/shop" className="btn-secondary">
                  View full shop
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.slice(0, 4).map((product, index) => (
                <Reveal key={product.id} delay={index * 0.06}>
                  <ProductCard
                    product={product}
                    onInspect={setSelectedProduct}
                    onAddToCart={handleInquire}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleInquire}
      />
    </>
  );
}
