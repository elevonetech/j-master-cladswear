import { Link } from "react-router-dom";
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
  { label: "About", to: "/about" },
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

function DapperLogoFooter() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="rgba(200,168,75,0.15)" />
      <rect
        width="40"
        height="40"
        rx="10"
        stroke="rgba(200,168,75,0.25)"
        strokeWidth="1"
      />
      <path
        d="M6 28 Q8 31 20 31 Q32 31 34 28 Q34 26 32 25 L28 24 L24 22 Q20 20 16 21 Q11 22 8 25 Z"
        fill="#c8a84b"
      />
      <path
        d="M16 21 Q17 14 22 12 Q27 10 30 13 L32 16 L32 22 L28 24 L24 22 Q20 20 16 21 Z"
        fill="#c8a84b"
        opacity="0.75"
      />
      <path
        d="M22 12 L23 20"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <DapperLogoFooter />
            <p className="text-sm font-bold text-white font-heading">
              Dapper Footwear
            </p>
          </div>
          <p className="text-[0.8rem] leading-relaxed text-white/45 max-w-xs">
            Premium silhouettes, timeless styling, and a WhatsApp-first shopping
            experience designed for fast ordering.
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
              href="mailto:jamesmngandu@gmail.com"
              className="btn-secondary px-4 py-2 text-[10px] tracking-widest"
            >
              <Mail size={12} />
              Email
            </a>
            <a
              href="https://wa.me/254712643440"
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
              { icon: Phone, text: "0712 643 440" },
              { icon: Mail, text: "jamesmngandu@gmail.com" },
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
            href="https://wa.me/254712643440"
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
        © 2026 Dapper Footwear. All rights reserved.
      </div>
    </footer>
  );
}
