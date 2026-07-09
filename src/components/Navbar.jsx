import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, Search, X, Menu } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const links = [
  { label: "Home",        to: "/" },
  { label: "Shop",        to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Cart", to: "/cart" },
];

function DapperLogo({ dark = false }) {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill={dark ? "#0a0a0a" : "#ffffff"} />
      <rect width="40" height="40" rx="10" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="1" />
      {/* Shoe sole */}
      <path d="M6 28 Q8 31 20 31 Q32 31 34 28 Q34 26 32 25 L28 24 L24 22 Q20 20 16 21 Q11 22 8 25 Z"
        fill={dark ? "#c8a84b" : "#0A0A0B"} />
      {/* Shoe upper */}
      <path d="M16 21 Q17 14 22 12 Q27 10 30 13 L32 16 L32 22 L28 24 L24 22 Q20 20 16 21 Z"
        fill={dark ? "#c8a84b" : "#0A0A0B"} opacity="0.85" />
      {/* Lace detail */}
      <path d="M22 12 L23 20"
        stroke={dark ? "#ffffff" : "#c8a84b"}
        strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount }         = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBase =
    "fixed left-0 right-0 top-0 z-40 transition-all duration-500 ease-out";
  const navScrolled =
    "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.07),0_4px_24px_rgba(0,0,0,0.06)]";
  const navTop =
    "bg-transparent";

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-full bg-white shadow-sm px-5 py-3 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <DapperLogo size={40} />
            <div>
              <p className={`text-[8px] font-semibold uppercase tracking-[0.42em] transition-colors duration-300 ${scrolled ? "text-champagne" : "text-champagne/90"}`}>
                Premium Footwear
              </p>
              <h1 className="text-sm font-semibold tracking-wider text-[#111] font-body">
                Dapper Footwear
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                   `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive ? "bg-[#111] text-white font-semibold" : "text-[#666] hover:text-[#111]"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-250
                ${scrolled
                  ? "border-black/10 text-stone/70 hover:bg-black/[0.04] hover:text-stone"
                  : "border-white/20 text-white/75 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Heart size={16} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn-secondary relative h-12 w-12"
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-champagne px-1 text-[9px] font-bold text-white shadow-sm animate-pulse-gold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA – desktop */}
            <Link
              to="/shop"
              className="hidden lg:inline-flex btn-primary ml-1 !py-2.5 !text-[0.68rem]"
            >
              Shop Now
            </Link>

            {/* Hamburger – mobile */}
            <button
              type="button"
              className="btn-primary px-5 py-2.5 text-xs lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-4 rounded-[1.5rem] bg-white shadow-lg border-0 p-3 lg:hidden"
            >
              <div className="grid gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                       `rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive ? "bg-[#111] text-white font-semibold" : "text-[#666] hover:text-[#111]"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
