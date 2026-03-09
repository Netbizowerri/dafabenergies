import { motion } from "framer-motion";
import { Phone, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../data/site";
import { submitToFormspree } from "../lib/formspree";
import { isValidEmail, isValidPhone, sanitizeMultiline, sanitizePhone, sanitizeText } from "../lib/validation";

export function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = sanitizeText(String(formData.get("fullName") || ""), 80);
    const email = sanitizeText(String(formData.get("email") || ""), 120);
    const phone = sanitizePhone(String(formData.get("phone") || ""));
    const subject = sanitizeText(String(formData.get("subject") || ""), 80);
    const message = sanitizeMultiline(String(formData.get("message") || ""), 1200);
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

    if (phone && !isValidPhone(phone)) {
      setError("Enter a valid phone number.");
      return;
    }

    if (message.length < 20) {
      setError("Provide a bit more detail about your request.");
      return;
    }

    setStatus("submitting");

    try {
      await submitToFormspree(import.meta.env.VITE_FORMSPREE_CONTACT_ENDPOINT, {
        fullName,
        email,
        phone,
        subject,
        message,
        formType: "General contact enquiry",
      });
      setStatus("success");
      event.currentTarget.reset();
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send enquiry.");
    }
  }

  return (
    <>
      <Metadata
        title="Contact Dafab Energies | Project and Support Enquiries"
        description="Send project questions, hardware requests, or support enquiries to Dafab Energies through the secure contact form."
        path="/contact"
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
              eyebrow="Contact"
              title="Send your energy requirement through a secure Formspree workflow."
              description="Use this form for project enquiries, hardware questions, maintenance support, or planning discussions."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <div className="panel p-8">
                <div className="rounded-[1.5rem] bg-brand-mist p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-forest/70">
                    Direct contact
                  </p>
                  <a href={siteConfig.phoneHref} className="mt-4 inline-flex items-center gap-3 text-lg font-bold text-brand-navy">
                    <Phone size={18} className="text-brand-forest" />
                    {siteConfig.phone}
                  </a>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{siteConfig.headquarters}</p>
                </div>
                <div className="mt-6 rounded-[1.5rem] bg-brand-navy p-5 text-white">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={20} className="mt-1 text-brand-gold" />
                    <div>
                      <p className="font-bold">Security note</p>
                      <p className="mt-2 text-sm leading-7 text-slate-200">
                        Inputs are validated client-side before submission. No client API keys or database
                        credentials are shipped in this build.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <form className="panel p-8 sm:p-10" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
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
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Phone number
                    </label>
                    <input className="field" type="tel" name="phone" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                      Subject
                    </label>
                    <select className="field" name="subject" defaultValue="General enquiry">
                      <option>General enquiry</option>
                      <option>Residential solar project</option>
                      <option>Commercial backup system</option>
                      <option>Hardware supply request</option>
                      <option>Maintenance support</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Message
                  </label>
                  <textarea className="field min-h-44" name="message" required />
                </div>
                <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
                {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
                {status === "success" ? (
                  <p className="mt-4 text-sm font-medium text-brand-forest">
                    Your enquiry has been sent. Dafab will respond through the provided contact details.
                  </p>
                ) : null}
                <button className="btn-primary mt-6 w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending enquiry..." : "Send enquiry"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </motion.section>
    </>
  );
}
