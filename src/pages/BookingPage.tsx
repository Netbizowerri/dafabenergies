import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { services } from "../data/site";
import { submitToFormspree } from "../lib/formspree";
import { isValidEmail, isValidPhone, sanitizeMultiline, sanitizePhone, sanitizeText } from "../lib/validation";

export function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function toggleService(serviceId: string) {
    setSelectedServices((current) =>
      current.includes(serviceId) ? current.filter((item) => item !== serviceId) : [...current, serviceId],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = sanitizeText(String(formData.get("fullName") || ""), 80);
    const email = sanitizeText(String(formData.get("email") || ""), 120);
    const phone = sanitizePhone(String(formData.get("phone") || ""));
    const address = sanitizeText(String(formData.get("address") || ""), 160);
    const facilityType = sanitizeText(String(formData.get("facilityType") || ""), 80);
    const message = sanitizeMultiline(String(formData.get("message") || ""), 1000);
    const trap = String(formData.get("companyWebsite") || "");

    if (trap) {
      setStatus("success");
      event.currentTarget.reset();
      return;
    }

    if (selectedServices.length === 0) {
      setError("Select at least one service.");
      return;
    }

    if (fullName.length < 2) {
      setError("Enter a valid contact name.");
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

    if (address.length < 6) {
      setError("Provide the site address.");
      return;
    }

    setStatus("submitting");

    try {
      await submitToFormspree(import.meta.env.VITE_FORMSPREE_BOOKING_ENDPOINT, {
        fullName,
        email,
        phone,
        address,
        facilityType,
        requestedServices: selectedServices.join(", "),
        message,
        formType: "Site audit booking",
      });
      setStatus("success");
      setSelectedServices([]);
      event.currentTarget.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit booking.");
    }
  }

  return (
    <>
      <Metadata
        title="Book a Site Audit | Dafab Energies"
        description="Book a Dafab Energies site audit for inverter sizing, solar planning, battery storage design, or system protection review."
        path="/booking"
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
              eyebrow="Book audit"
              title="Start with the site assessment, not assumptions."
              description="Dafab uses the site audit to understand load behavior, installation conditions, cable runs, and expansion requirements before final sizing."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="panel p-8">
                <p className="text-sm leading-7 text-slate-600">
                  Audit bookings are submitted through Formspree and routed to the project inbox. Use the
                  service selector to indicate the main scope.
                </p>
                <div className="mt-6 grid gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.title)}
                      className={`rounded-[1.5rem] border px-4 py-4 text-left text-sm font-semibold transition-all ${
                        selectedServices.includes(service.title)
                          ? "border-brand-navy bg-brand-navy text-white shadow-lg"
                          : "border-slate-200 bg-brand-mist text-brand-ink hover:border-brand-forest/30"
                      }`}
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <form className="panel p-8 sm:p-10" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Contact person
                    </label>
                    <input className="field" name="fullName" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Email address
                    </label>
                    <input className="field" type="email" name="email" required />
                  </div>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Phone number
                    </label>
                    <input className="field" type="tel" name="phone" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Facility type
                    </label>
                    <select className="field" name="facilityType" defaultValue="Residential">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Site address
                  </label>
                  <input className="field" name="address" required />
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Extra notes
                  </label>
                  <textarea className="field min-h-40" name="message" />
                </div>
                <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
                {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
                {status === "success" ? (
                  <p className="mt-4 text-sm font-medium text-brand-forest">
                    Booking request sent. Dafab will reach out to confirm the audit window.
                  </p>
                ) : null}
                <button className="btn-primary mt-6 w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting booking..." : "Submit booking request"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </motion.section>
    </>
  );
}
