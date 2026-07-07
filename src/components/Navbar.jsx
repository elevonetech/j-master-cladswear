import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Cart", to: "/cart" },
];

function DapperLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="12" fill="#D4AF37" />
      {/* Shoe sole */}
      <path
        d="M6 28 Q8 31 20 31 Q32 31 34 28 Q34 26 32 25 L28 24 L24 22 Q20 20 16 21 Q11 22 8 25 Z"
        fill="#0A0A0B"
      />
      {/* Shoe upper */}
      <path
        d="M16 21 Q17 14 22 12 Q27 10 30 13 L32 16 L32 22 L28 24 L24 22 Q20 20 16 21 Z"
        fill="#0A0A0B"
        opacity="0.85"
      />
      {/* Toe cap */}
      <path
        d="M8 25 Q10 22 14 22 Q16 21 16 21 Q11 22 8 25 Z"
        fill="#0A0A0B"
        opacity="0.6"
      />
      {/* Lace line detail */}
      <path
        d="M22 12 L23 20"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
      <div
        className={`glass mx-auto max-w-7xl rounded-full px-5 py-3 transition-all duration-300 ${scrolled ? "shadow-2xl shadow-black/80 border-champagne/20" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <DapperLogo size={40} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-champagne/70">
                Premium Footwear
              </p>
              <h1 className="text-sm font-semibold tracking-wider text-white font-body">
                Dapper Footwear
              </h1>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive ? "bg-champagne text-basalt shadow-lg shadow-champagne/25 font-semibold" : "text-bone/70 hover:bg-champagne/10 hover:text-champagne"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="btn-secondary relative inline-flex h-12 w-12 items-center justify-center rounded-full border-champagne/20 hover:border-champagne text-champagne hover:bg-champagne/10 transition-all duration-300"
              aria-label={`Cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-champagne px-1.5 text-[10px] font-bold text-basalt ring-2 ring-basalt animate-pulse-gold">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="btn-primary px-5 py-2.5 text-xs rounded-full lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-4 rounded-[1.5rem] bg-basalt/95 border border-champagne/20 p-3 shadow-2xl shadow-black/80 lg:hidden"
            >
              <div className="grid gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive ? "bg-champagne text-basalt font-semibold" : "text-bone/70 hover:bg-champagne/10 hover:text-champagne"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
