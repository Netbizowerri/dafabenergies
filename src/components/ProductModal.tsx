import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart, X } from "lucide-react";
import type { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-brand-navy/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-brand-navy shadow-md transition-all hover:scale-105 hover:bg-brand-navy hover:text-white"
              onClick={onClose}
              aria-label="Close product dialog"
            >
              <X size={20} />
            </button>
            <div className="grid md:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-80 overflow-hidden bg-brand-sand">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col p-8 sm:p-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-forest">
                  {product.category}
                </p>
                <h3 className="title-page mt-4 text-brand-navy">
                  {product.name}
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>
                <div className="mt-8 grid gap-3">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-brand-mist px-4 py-3 text-sm text-brand-ink"
                    >
                      <Check size={18} className="mt-0.5 text-brand-forest" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-navy px-5 py-4 text-xs font-extrabold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingCart size={16} />
                  Inquire Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
