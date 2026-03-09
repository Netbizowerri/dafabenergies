import { MessageCircle } from "lucide-react";
import { Outlet } from "react-router-dom";
import { siteConfig } from "../data/site";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-mesh text-brand-ink">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        aria-label="Chat with Dafab on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
