import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Metadata } from "../components/Metadata";

export function NotFoundPage() {
  return (
    <>
      <Metadata
        title="Page Not Found | Dafab Energies"
        description="The page you requested could not be found."
        noindex
      />
      <motion.section
        className="px-4 py-20 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-4xl panel p-12 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-brand-forest/70">404</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-brand-navy">This route does not exist.</h1>
          <p className="mt-4 text-sm text-slate-600">
            Use the navigation to return to the homepage, browse the hardware store, or contact Dafab.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Dafab
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
