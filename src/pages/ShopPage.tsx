import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeStoreCard } from "../components/HomeStoreCard";
import { Metadata } from "../components/Metadata";
import { ProductModal } from "../components/ProductModal";
import { Reveal } from "../components/Reveal";
import { products } from "../data/site";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

type ShopCategory = "All" | "SVC Products" | "Inverters" | "Solar Panels" | "Other Products";

const categoryTabs: ShopCategory[] = [
  "All",
  "SVC Products",
  "Inverters",
  "Solar Panels",
  "Other Products",
];

function getShopCategory(product: Product): ShopCategory {
  if (product.category === "SVC Products") return "SVC Products";
  if (product.category === "Inverters") return "Inverters";
  if (product.category === "Solar Panels") return "Solar Panels";
  return "Other Products";
}

export function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("All");
  const [search, setSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const deferredSearch = useDeferredValue(search);
  const { addItem } = useCart();
  const navigate = useNavigate();

  function handleInquire(product: Product) {
    addItem(product);
    setSelectedProduct(null);
    navigate("/quote-cart");
  }

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.brand))).sort();
  }, []);

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand],
    );
  }

  const filteredProducts = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || getShopCategory(product) === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some((feature) => feature.toLowerCase().includes(query));
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesCategory && matchesSearch && matchesBrand;
    });
  }, [activeCategory, deferredSearch, selectedBrands]);

  return (
    <>
      <Metadata
        title="Premium Energy Shop | Dafab Energies"
        description="High-performance components engineered for Nigerian electrical standards. Official Dafab hardware directly from our inventory."
        path="/shop"
      />

      <motion.section
        className="dot-surface px-6 py-14 lg:px-14"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-[1840px]">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <Reveal>
              <div className="max-w-3xl">
                <h1 className="title-page text-[2.9rem] text-brand-navy sm:text-[3.35rem]">
                  Premium Energy Shop
                </h1>
                <p className="mt-4 max-w-2xl text-[1.05rem] leading-8 text-slate-600">
                  High-performance components engineered for Nigerian electrical standards.
                  Official Dafab hardware directly from our inventory.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex flex-col gap-4 xl:flex-row xl:justify-end">
                <label className="relative w-full xl:max-w-[390px]">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    className="h-[56px] w-full rounded-[1rem] border border-slate-300 bg-white pl-12 pr-4 text-sm text-brand-navy outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/8"
                    type="search"
                    value={search}
                    placeholder="Search products, specs..."
                    onChange={(event) => {
                      const value = event.target.value;
                      startTransition(() => setSearch(value));
                    }}
                  />
                </label>

                <button
                  className={`inline-flex h-[56px] items-center justify-center gap-2 rounded-[1rem] border px-6 text-[10px] font-extrabold uppercase tracking-[0.22em] transition-all ${
                    showAdvanced || selectedBrands.length
                      ? "border-brand-navy bg-brand-navy text-white"
                      : "border-slate-300 bg-white text-brand-navy hover:border-brand-navy/40"
                  }`}
                  onClick={() => setShowAdvanced((value) => !value)}
                  type="button"
                >
                  <SlidersHorizontal size={14} />
                  Advanced Filters
                </button>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 rounded-[1rem] border border-slate-300 bg-[#eef0f2] px-2 py-2">
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((category) => (
                <button
                  key={category}
                  className={`rounded-[0.8rem] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.22em] transition-all ${
                    activeCategory === category
                      ? "bg-brand-navy text-white shadow-md"
                      : "text-brand-navy/65 hover:text-brand-navy"
                  }`}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {showAdvanced ? (
            <div className="mt-6 rounded-[1.4rem] border border-slate-200 bg-white p-6 shadow-[0_14px_35px_rgba(15,23,42,0.05)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-gold">
                Authorized Brands
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    className={`rounded-full px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] transition-all ${
                      selectedBrands.includes(brand)
                        ? "bg-brand-forest text-white"
                        : "bg-brand-mist text-brand-navy hover:bg-brand-sand"
                    }`}
                    onClick={() => toggleBrand(brand)}
                    type="button"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.05}>
                <HomeStoreCard
                  product={product}
                  onInspect={setSelectedProduct}
                  onAddToCart={handleInquire}
                />
              </Reveal>
            ))}
          </div>

          {!filteredProducts.length ? (
            <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <p className="title-card text-brand-navy">No products matched the current filters.</p>
              <p className="mt-3 text-sm text-slate-600">
                Clear the search, switch categories, or remove advanced brand filters.
              </p>
            </div>
          ) : null}
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
