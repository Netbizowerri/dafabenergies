import { ShoppingCart, Sparkles } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onInspect, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      <button className="relative aspect-square overflow-hidden text-left" onClick={() => onInspect(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-navy">
          {product.category}
        </div>
      </button>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-sand px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-forest">
            {product.brand}
          </span>
          {product.highlight ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-gold">
              <Sparkles size={14} />
              {product.highlight}
            </span>
          ) : null}
        </div>
        <button
          className="title-card text-left text-brand-navy transition-colors hover:text-brand-forest"
          onClick={() => onInspect(product)}
        >
          {product.name}
        </button>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{product.description}</p>
        <button
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-forest px-5 py-4 text-xs font-extrabold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart size={16} />
          Inquire Now
        </button>
      </div>
    </article>
  );
}
