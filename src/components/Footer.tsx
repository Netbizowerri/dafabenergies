import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { services, siteConfig } from "../data/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-white">
      <div className="mx-auto max-w-[1840px] px-6 pb-10 pt-24 lg:px-14">
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr_0.85fr]">
          <div>
            <div className="inline-flex rounded-[1.1rem] bg-white p-4 shadow-lg">
              <img src={siteConfig.logo} alt={siteConfig.shortName} className="h-20 w-auto" />
            </div>
            <p className="mt-12 max-w-md text-[1.05rem] leading-10 text-slate-300">
              Nigeria&apos;s leading solar engineering firm. {siteConfig.registration}.
              <br />
              Dedicated to sustainable power across West Africa.
            </p>
            <div className="mt-12 flex flex-wrap gap-5">
              <a
                href={siteConfig.facebookHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/90 transition-colors hover:bg-brand-gold hover:text-brand-navy"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/90 transition-colors hover:bg-brand-gold hover:text-brand-navy"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/90 transition-colors hover:bg-brand-gold hover:text-brand-navy"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/90 transition-colors hover:bg-brand-gold hover:text-brand-navy"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">Quick Links</h4>
            <ul className="mt-12 space-y-6 text-[1.05rem] font-extrabold uppercase tracking-[0.18em] text-white/45">
              <li>
                <Link className="transition-colors hover:text-white" to="/shop">
                  Shop Hardware
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/about">
                  About Firm
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/contact">
                  Help Desk
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-white" to="/booking">
                  Book Audit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">Services</h4>
            <ul className="mt-12 space-y-6 text-[1.05rem] font-extrabold uppercase tracking-[0.14em] text-white/45">
              {services.map((service) => (
                <li key={service.id}>
                  <Link className="transition-colors hover:text-white" to={`/services/${service.id}`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/8 pt-10 text-[10px] font-extrabold uppercase tracking-[0.2em] md:flex-row md:items-center md:justify-between">
          <p className="text-white/35">
            Copyright 2025 Dafab Energies Nigeria Ltd. {siteConfig.registration}
          </p>
          <div className="flex gap-8">
            <span className="text-brand-gold">Reliable Power</span>
            <span className="text-brand-forest">Global Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
