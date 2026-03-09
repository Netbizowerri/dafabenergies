import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { Metadata } from "../components/Metadata";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { products } from "../data/site";
import { useCart } from "../context/CartContext";
import type { Category, Product } from "../types";

const categories: Array<Category | "All"> = [
  "All",
  "Inverters",
  "Solar Panels",
  "Battery Storage",
  "Electrical Accessories",
  "SVC Products",
];

export function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some((feature) => feature.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, deferredSearch]);

  return (
    <>
      <Metadata
        title="Shop Solar Hardware | Dafab Energies"
        description="Browse Dafab Energies inventory for hybrid inverters, lithium batteries, solar panels, and protection accessories."
        path="/shop"
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
              eyebrow="Storefront"
              title="Filter the hardware catalogue by system intent, not just product names."
              description="Search by brand, use case, or feature. Every item can be added to the quote cart for a Formspree-backed enquiry."
            />
          </Reveal>

          <div className="panel mt-10 p-6">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  className="field pl-12"
                  type="search"
                  value={search}
                  placeholder="Search products, brands, or specifications"
                  onChange={(event) => {
                    const value = event.target.value;
                    startTransition(() => setSearch(value));
                  }}
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] transition-all ${
                      activeCategory === category
                        ? "bg-brand-navy text-white shadow-md"
                        : "bg-brand-mist text-brand-ink hover:bg-brand-sand"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    <SlidersHorizontal size={14} />
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 0.06}>
                <ProductCard product={product} onInspect={setSelectedProduct} onAddToCart={addItem} />
              </Reveal>
            ))}
          </div>

          {!filteredProducts.length ? (
            <div className="panel mt-10 p-10 text-center">
              <p className="font-display text-2xl font-bold text-brand-navy">No products matched the current filters.</p>
              <p className="mt-3 text-sm text-slate-600">
                Clear the search or switch categories to view the rest of the catalogue.
              </p>
            </div>
          ) : null}
        </div>
      </motion.section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addItem} />
    </>
  );
}
