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
    <footer className="mt-24 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/45">
            Kithome Shoe Collection
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Luxury footwear for modern wardrobes.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
            Premium silhouettes, timeless black-and-white styling, and a
            WhatsApp-first shopping experience designed for fast ordering.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-sm shadow-lg shadow-black/20"
            >
              Instagram
            </a>
            <a
              href="mailto:jamesmngandu@gmail.com"
              className="btn-primary px-4 py-2 text-sm shadow-lg shadow-black/20"
            >
              Email
            </a>
            <a
              href="https://wa.me/254712643440"
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-sm shadow-lg shadow-black/20"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Quick Links
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Shop Categories
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            {categories.map((category) => (
              <Link
                key={category}
                to="/shop"
                className="transition hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Customer Support
          </p>
          <div className="mt-4 grid gap-4 text-sm text-white/68">
            <div>0712 643 440</div>
            <div>jamesmngandu@gmail.com</div>
            <div>Nairobi, Kenya</div>
          </div>
          <a
            href="https://wa.me/254712643440"
            className="btn-secondary mt-6 inline-flex px-5 py-3 text-sm"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="px-4 py-5 text-center text-xs uppercase tracking-[0.35em] text-white/40 sm:px-6 lg:px-8">
        © 2026 Kithome Shoe Collection. All rights reserved.
      </div>
    </footer>
  );
}
