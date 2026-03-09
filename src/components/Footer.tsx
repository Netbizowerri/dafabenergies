import { ArrowUpRight, Facebook, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { services, siteConfig } from "../data/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="inline-flex rounded-3xl bg-white p-4 shadow-lg">
            <img src={siteConfig.logo} alt={siteConfig.shortName} className="h-16 w-auto" />
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
            Solar engineering, inverter deployment, lithium storage, and audit-led power planning
            for homes and businesses across Nigeria.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={siteConfig.facebookHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
            >
              <Facebook size={16} />
              Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">Links</p>
          <div className="mt-6 grid gap-3 text-sm">
            <Link className="transition-colors hover:text-brand-gold" to="/shop">
              Shop hardware
            </Link>
            <Link className="transition-colors hover:text-brand-gold" to="/about">
              About Dafab
            </Link>
            <Link className="transition-colors hover:text-brand-gold" to="/contact">
              Contact desk
            </Link>
            <Link className="transition-colors hover:text-brand-gold" to="/booking">
              Book audit
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-gold">Services</p>
          <div className="mt-6 grid gap-3 text-sm">
            {services.map((service) => (
              <Link
                key={service.id}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-gold"
                to={`/services/${service.id}`}
              >
                <ArrowUpRight size={14} />
                {service.title}
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5 text-sm text-slate-200">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 text-brand-gold" />
              <div>
                <p className="font-bold text-white">{siteConfig.headquarters}</p>
                <p className="mt-2 leading-6">{siteConfig.registration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
