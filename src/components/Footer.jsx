import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Cart", to: "/cart" },
];

const categories = [
  "Sneakers",
  "Boots",
  "Formal Shoes",
  "Casual Shoes",
  "Running Shoes",
  "Sandals",
];

export function Footer() {
  return (
    <footer className="mt-24 bg-basalt border-t border-champagne/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-champagne">
            Dapper Footwear
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white leading-snug">
            Luxury footwear for modern wardrobes.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-bone/60 font-body">
            Premium silhouettes, timeless black-and-white styling, and a
            WhatsApp-first shopping experience designed for fast ordering.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-bone/70">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-[10px] tracking-widest shadow-lg shadow-black/25 rounded-full"
            >
              Instagram
            </a>
            <a
              href="mailto:jamesmngandu@gmail.com"
              className="btn-secondary px-4 py-2 text-[10px] tracking-widest shadow-lg shadow-black/25 rounded-full"
            >
              Email
            </a>
            <a
              href="https://wa.me/254712643440"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-[10px] tracking-widest shadow-lg shadow-black/25 rounded-full"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-champagne/70 font-semibold">
            Quick Links
          </p>
          <div className="mt-4 grid gap-3 text-sm text-bone/68 font-body">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition duration-300 hover:text-champagne"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-champagne/70 font-semibold">
            Shop Categories
          </p>
          <div className="mt-4 grid gap-3 text-sm text-bone/68 font-body">
            {categories.map((category) => (
              <Link
                key={category}
                to="/shop"
                className="transition duration-300 hover:text-champagne"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-champagne/70 font-semibold">
            Customer Support
          </p>
          <div className="mt-4 grid gap-4 text-sm text-bone/68 font-body">
            <div>0712 643 440</div>
            <div>jamesmngandu@gmail.com</div>
            <div>Nairobi, Kenya</div>
          </div>
          <a
            href="https://wa.me/254712643440"
            className="btn-secondary mt-6 inline-flex px-5 py-2.5 text-xs rounded-full border-champagne/20 hover:border-champagne text-champagne hover:bg-champagne/10"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-champagne/5 px-4 py-5 text-center text-xs uppercase tracking-[0.35em] text-bone/45 sm:px-6 lg:px-8">
        © 2026 Dapper Footwear. All rights reserved.
      </div>
    </footer>
  );
}
