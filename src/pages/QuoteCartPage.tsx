import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Metadata } from "../components/Metadata";
import { useCart } from "../context/CartContext";
import { submitToFormspree } from "../lib/formspree";
import { isValidPhone, sanitizeMultiline, sanitizePhone, sanitizeText } from "../lib/validation";

export function QuoteCartPage() {
  const { items, clearCart, removeItem, totalItems, updateQuantity } = useCart();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Add hardware to the cart before submitting.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = sanitizeText(String(formData.get("fullName") || ""), 80);
    const phone = sanitizePhone(String(formData.get("phone") || ""));
    const address = sanitizeMultiline(String(formData.get("address") || ""), 300);
    const trap = String(formData.get("companyWebsite") || "");

    if (trap) {
      setStatus("success");
      event.currentTarget.reset();
      return;
    }

    if (fullName.length < 2) {
      setError("Enter a valid delivery name.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Enter a valid phone number.");
      return;
    }

    if (address.length < 8) {
      setError("Enter the delivery address.");
      return;
    }

    setStatus("submitting");

    try {
      const cartSummary = items.map((item) => `${item.name} x${item.quantity}`).join(" | ");

      await submitToFormspree(import.meta.env.VITE_FORMSPREE_ORDER_ENDPOINT, {
        fullName,
        phone,
        address,
        cartSummary,
        totalItems: String(totalItems),
        formType: "Hardware checkout enquiry",
      });

      setStatus("success");
      clearCart();
      event.currentTarget.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(
        submissionError instanceof Error ? submissionError.message : "Unable to submit checkout request.",
      );
    }
  }

  return (
    <>
      <Metadata
        title="Hardware Checkout | Dafab Energies"
        description="Review selected hardware and complete your Dafab Energies checkout enquiry."
        path="/quote-cart"
        noindex
      />

      <motion.section
        className="dot-surface px-6 py-16 lg:px-14"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-[1500px]">
          {status === "success" ? (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <h1 className="title-page text-brand-navy">Order Placed!</h1>
              <p className="mt-4 text-base text-slate-600">
                Thank you for your order. Our logistics team will contact you shortly to arrange
                delivery and installation.
              </p>
              <Link to="/" className="btn-primary mt-8">
                Return To Home
              </Link>
            </div>
          ) : !items.length ? (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <h1 className="title-page text-brand-navy">Your cart is empty</h1>
              <p className="mt-4 text-base text-slate-600">
                Browse the store and tap Inquire Now on any hardware item to open checkout.
              </p>
              <Link to="/shop" className="btn-primary mt-8">
                Browse Hardware Store
              </Link>
            </div>
          ) : (
            <>
              <h1 className="title-page mb-10 pl-2 text-brand-navy">Hardware Checkout</h1>

              <div className="grid gap-10 xl:grid-cols-[1.5fr_0.7fr]">
                <div className="space-y-5">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[2rem] border border-[#e9e9e7] bg-white px-6 py-6 shadow-[0_12px_32px_rgba(15,23,42,0.03)]"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="h-24 w-24 overflow-hidden rounded-[1.35rem] bg-[#f4f4f3]">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="title-card text-brand-navy">{item.name}</h3>
                          <p className="mt-2 text-lg font-bold text-brand-forest">Price on Inquiry</p>
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center gap-3 rounded-[0.9rem] bg-[#f6f7f7] px-3 py-2">
                              <button
                                type="button"
                                className="text-slate-400 transition-colors hover:text-brand-navy"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label={`Reduce quantity of ${item.name}`}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-5 text-center text-sm font-bold text-brand-navy">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="text-slate-400 transition-colors hover:text-brand-navy"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              type="button"
                              className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ff7168] transition-colors hover:text-red-600"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <form
                  className="rounded-[2rem] border border-[#e9e9e7] bg-white p-10 shadow-[0_12px_32px_rgba(15,23,42,0.03)]"
                  onSubmit={handleSubmit}
                >
                  <h2 className="title-card text-[1.9rem] text-brand-navy">Order Summary</h2>

                  <div className="mt-10 space-y-6">
                    <div className="flex items-center justify-between text-[1.08rem] text-slate-500">
                      <span>Items in Cart</span>
                      <span className="font-bold text-brand-navy">{totalItems}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[1.12rem] font-extrabold text-brand-navy">Total</span>
                        <span className="text-[1.1rem] font-extrabold text-brand-forest sm:text-[1.4rem]">
                          Inquiry Only
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <input
                      className="w-full rounded-[1rem] border border-[#ececeb] bg-[#f9f9f8] px-4 py-4 text-sm text-brand-navy outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/8"
                      name="fullName"
                      placeholder="Delivery Name"
                      required
                    />
                    <input
                      className="w-full rounded-[1rem] border border-[#ececeb] bg-[#f9f9f8] px-4 py-4 text-sm text-brand-navy outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/8"
                      name="phone"
                      placeholder="Phone Number"
                      required
                    />
                    <textarea
                      className="min-h-[110px] w-full rounded-[1rem] border border-[#ececeb] bg-[#f9f9f8] px-4 py-4 text-sm text-brand-navy outline-none transition focus:border-brand-forest focus:ring-4 focus:ring-brand-forest/8"
                      name="address"
                      placeholder="Delivery Address"
                      required
                    />
                  </div>

                  <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />

                  {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

                  <button
                    className="mt-6 inline-flex w-full items-center justify-center rounded-[1.1rem] bg-brand-navy px-5 py-5 text-xs font-extrabold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-forest"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting Request..." : "Confirm Order"}
                  </button>

                  <p className="mt-5 text-center text-[10px] leading-5 text-slate-400">
                    Installation fees are calculated after engineering audit. Prices inclusive of VAT
                    where applicable.
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </>
  );
}
