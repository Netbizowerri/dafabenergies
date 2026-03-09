import { ShoppingCart } from "lucide-react";
import type { Product } from "../types";

interface HomeStoreCardProps {
  product: Product;
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function HomeStoreCard({ product, onInspect, onAddToCart }: HomeStoreCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#e7e7e4] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <button
        className="relative flex h-[250px] w-full flex-col overflow-hidden bg-[#f7f8f7] px-4 pb-4 pt-4 text-left"
        onClick={() => onInspect(product)}
      >
        <span className="inline-flex w-fit rounded-full border border-[#e2e8f0] bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-brand-navy">
          {product.category}
        </span>
        <span className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#77a254]">
          {product.brand}
        </span>
        <div className="flex flex-1 items-center justify-center px-4 py-3">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[185px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </button>
      <div className="bg-white px-5 py-5">
        <button
          className="title-card line-clamp-2 text-left text-[1.02rem] text-brand-navy transition-colors hover:text-brand-forest"
          onClick={() => onInspect(product)}
        >
          {product.name}
        </button>
        <p className="mt-3 line-clamp-3 min-h-[58px] text-[12px] leading-[1.5] text-slate-500">
          {product.description}
        </p>
        <button
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[0.95rem] bg-brand-forest px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart size={12} />
          Inquire Now
        </button>
      </div>
    </article>
  );
}
