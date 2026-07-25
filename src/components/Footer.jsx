import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.jpeg";

import {
  Share2,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },

  { label: "Contact", to: "/contact" },
];

const categories = [
  "Sneakers",
  "Boots",
  "Formal Shoes",
  "Casual Shoes",
  "Running Shoes",
  "Sandals",
];

function MasterCladswearLogoFooter({ size = 32 }) {
  return (
    <img
      src={logoImg}
      alt="J. MASTER CLADSWEAR Logo"
      className="object-contain rounded-md"
      style={{ width: size, height: size }}
    />
  );
}


export function Footer() {
  return (
    <footer className="mt-16 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MasterCladswearLogoFooter />
            <p className="text-sm font-bold text-white font-heading">
              J. MASTER CLADSWEAR
            </p>
          </div>
          <p className="text-[0.8rem] leading-relaxed text-white/45 max-w-xs">
            Kenya's premier destination for authentic, high-quality footwear, blending timeless style with unmatched comfort.
          </p>

          {/* Social / contact links */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-[10px] tracking-widest"
            >
              <Share2 size={12} />
              Instagram
            </a>
            <a
              href="mailto:Kithomejoseph88@gmail.com"
              className="btn-secondary px-4 py-2 text-[10px] tracking-widest"
            >
              <Mail size={12} />
              Email
            </a>
            <a
              href="https://wa.me/254702364786"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-[10px] tracking-widest"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-5">
            Quick Links
          </p>
          <nav className="grid gap-3.5" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center gap-1 text-[0.8rem] text-white/50 hover:text-white transition-colors duration-220"
              >
                {link.label}
                <ArrowUpRight
                  size={10}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-220"
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-5">
            Shop Categories
          </p>
          <nav className="grid gap-3.5" aria-label="Category navigation">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/shop"
                className="text-[0.8rem] text-white/50 hover:text-white transition-colors duration-220"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>

        {/* Support */}
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-white/30 mb-5">
            Customer Support
          </p>
          <div className="space-y-4">
            {[
              { icon: Phone, text: "0702 364 786" },
              { icon: Mail, text: "Kithomejoseph88@gmail.com" },
              { icon: MapPin, text: "Nairobi, Kenya" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-[0.78rem] text-white/50"
              >
                <Icon size={12} className="text-white/25 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
          <a
            href="https://wa.me/254702364786"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-5 py-2.5 text-[0.68rem] font-semibold text-champagne hover:bg-champagne/18 transition-all duration-240"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={12} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-5 text-center text-xs uppercase tracking-[0.35em] text-bone/45 sm:px-6 lg:px-8">
        © 2026 J. MASTER CLADSWEAR. All rights reserved.
      </div>
    </footer>
  );
}
