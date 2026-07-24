import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, X, Menu } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import logoImg from "@/assets/logo.jpeg";


const links = [
  { label: "Home",        to: "/" },
  { label: "Shop",        to: "/shop" },
  { label: "Collections", to: "/collections" },

  { label: "Contact", to: "/contact" },
];

function MasterCladswearLogo({ dark = false, size = 36 }) {
  return (
    <img
      src={logoImg}
      alt="J. MASTER CLADSWEAR Logo"
      className="object-contain rounded-md"
      style={{ width: size, height: size }}
    />
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

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-full bg-white shadow-sm px-5 py-3 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <MasterCladswearLogo size={40} />
            <h1 className="text-sm font-semibold tracking-wider text-[#111] font-body">
              J. MASTER CLADSWEAR
            </h1>
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

            {/* Hamburger – mobile only */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-champagne text-white text-xs font-semibold transition-all duration-250 hover:bg-[#b8942e] cursor-pointer"
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
