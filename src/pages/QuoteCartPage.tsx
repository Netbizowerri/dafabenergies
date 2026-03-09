import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { useCart } from "../context/CartContext";
import { submitToFormspree } from "../lib/formspree";
import { isValidEmail, isValidPhone, sanitizeMultiline, sanitizePhone, sanitizeText } from "../lib/validation";

export function QuoteCartPage() {
  const { items, clearCart, removeItem, totalItems, updateQuantity } = useCart();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Add hardware to the quote cart before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = sanitizeText(String(formData.get("fullName") || ""), 80);
    const email = sanitizeText(String(formData.get("email") || ""), 120);
    const phone = sanitizePhone(String(formData.get("phone") || ""));
    const address = sanitizeText(String(formData.get("address") || ""), 180);
    const notes = sanitizeMultiline(String(formData.get("notes") || ""), 1200);
    const trap = String(formData.get("companyWebsite") || "");

    if (trap) {
      setStatus("success");
      event.currentTarget.reset();
      return;
    }

    if (fullName.length < 2) {
      setError("Enter a valid full name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Enter a valid phone number.");
      return;
    }

    setStatus("submitting");

    try {
      const cartSummary = items.map((item) => `${item.name} x${item.quantity}`).join(" | ");

      await submitToFormspree(import.meta.env.VITE_FORMSPREE_ORDER_ENDPOINT, {
        fullName,
        email,
        phone,
        address,
        notes,
        cartSummary,
        totalItems: String(totalItems),
        formType: "Hardware quote cart enquiry",
      });
      setStatus("success");
      clearCart();
      event.currentTarget.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit quote request.");
    }
  }

  return (
    <>
      <Metadata
        title="Quote Cart | Dafab Energies"
        description="Review selected Dafab hardware and submit a quote request."
        path="/quote-cart"
        noindex
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
              eyebrow="Quote cart"
              title="Turn the shortlisted hardware into a clean enquiry."
              description="This route stays client-side, but the final request is submitted through Formspree with a normalized item summary."
            />
          </Reveal>

          {!items.length && status !== "success" ? (
            <div className="panel mt-10 p-10 text-center">
              <p className="font-display text-2xl font-bold text-brand-navy">Your quote cart is empty.</p>
              <p className="mt-3 text-sm text-slate-600">Browse the shop and add hardware before submitting an enquiry.</p>
              <Link to="/shop" className="btn-primary mt-8">
                Visit the shop
              </Link>
            </div>
          ) : null}

          {status === "success" ? (
            <div className="panel mt-10 p-10 text-center">
              <p className="font-display text-3xl font-extrabold text-brand-navy">Quote request sent.</p>
              <p className="mt-3 text-sm text-slate-600">
                Dafab will follow up using the contact details you submitted.
              </p>
              <Link to="/" className="btn-primary mt-8">
                Return home
              </Link>
            </div>
          ) : null}

          {items.length ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <div className="panel p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <article key={item.id} className="rounded-[1.5rem] border border-slate-100 bg-white p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />
                          <div className="flex-1">
                            <h3 className="font-display text-xl font-bold text-brand-navy">{item.name}</h3>
                            <p className="mt-2 text-sm text-slate-600">{item.category}</p>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <div className="inline-flex items-center gap-2 rounded-full bg-brand-mist p-1">
                                <button
                                  type="button"
                                  className="rounded-full bg-white p-2 text-brand-navy"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="rounded-full bg-white p-2 text-brand-navy"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 size={16} />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <form className="panel p-8" onSubmit={handleSubmit}>
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-forest/70">
                    Request summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {totalItems} item{totalItems === 1 ? "" : "s"} in the cart. Dafab will price the final
                    mix after confirming the site context.
                  </p>
                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                        Full name
                      </label>
                      <input className="field" name="fullName" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                        Email address
                      </label>
                      <input className="field" type="email" name="email" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                        Phone number
                      </label>
                      <input className="field" type="tel" name="phone" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                        Delivery or site address
                      </label>
                      <input className="field" name="address" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                        Notes
                      </label>
                      <textarea className="field min-h-32" name="notes" />
                    </div>
                  </div>
                  <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
                  {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
                  <button className="btn-primary mt-6 w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting request..." : "Submit quote request"}
                  </button>
                </form>
              </Reveal>
            </div>
          ) : null}
        </div>
      </motion.section>
    </>
  );
}
