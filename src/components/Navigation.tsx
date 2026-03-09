import { AnimatePresence, motion } from "framer-motion";
import {
  CircleHelp,
  Home,
  Menu,
  ShoppingCart,
  SunMedium,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigationItems, siteConfig } from "../data/site";
import { useCart } from "../context/CartContext";

const navIcons = {
  "/": Home,
  "/shop": SunMedium,
  "/about": UserRound,
  "/contact": CircleHelp,
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-[80] border-b border-slate-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)]">
        <div className="mx-auto flex max-w-[1840px] items-center justify-between px-6 py-6 lg:px-14">
          <Link to="/" className="flex items-center">
            <img src={siteConfig.logo} alt={siteConfig.shortName} className="h-14 w-auto sm:h-16" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `border-b-2 pb-1 text-xs font-extrabold uppercase tracking-[0.24em] transition-colors ${
                    isActive
                      ? "border-brand-gold text-brand-forest"
                      : "border-transparent text-brand-navy/65 hover:text-brand-navy"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/quote-cart"
              className="relative rounded-full bg-brand-navy p-4 text-brand-gold shadow-lg shadow-slate-300/40 transition-all hover:scale-[1.03] hover:bg-brand-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              aria-label="Open quote cart"
            >
              <ShoppingCart size={18} />
              {totalItems ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-extrabold text-brand-navy">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <Link
              to="/booking"
              className="rounded-full bg-brand-forest px-7 py-4 text-xs font-extrabold uppercase tracking-[0.24em] text-white shadow-lg shadow-slate-300/40 transition-all hover:scale-[1.02] hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              Book audit
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/quote-cart"
              className="relative rounded-full bg-brand-navy p-3 text-brand-gold"
              aria-label="Open quote cart"
            >
              <ShoppingCart size={18} />
              {totalItems ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-extrabold text-brand-navy">
                  {totalItems}
                </span>
              ) : null}
            </Link>
            <button
              className="rounded-full border border-brand-navy/10 bg-white p-3 text-brand-navy shadow-sm"
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle mobile navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close mobile navigation"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-6 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-forest/70">
                    Navigation
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-brand-navy">
                    Explore Dafab
                  </p>
                </div>
                <button
                  className="rounded-full bg-brand-sand p-3 text-brand-navy"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {navigationItems.map((item) => {
                  const Icon = navIcons[item.href as keyof typeof navIcons] || Home;

                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-4 rounded-[1.5rem] px-5 py-4 text-sm font-bold transition-all ${
                          isActive
                            ? "bg-brand-navy text-white shadow-lg"
                            : "bg-brand-mist text-brand-ink hover:bg-brand-sand"
                        }`
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              <Link
                to="/booking"
                className="mt-6 inline-flex w-full items-center justify-center rounded-[1.5rem] bg-brand-forest px-5 py-4 text-xs font-extrabold uppercase tracking-[0.24em] text-white"
              >
                Book site audit
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
