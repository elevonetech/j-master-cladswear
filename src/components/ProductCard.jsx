import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import { Heart, Eye, ShoppingBag, Star, BadgeCheck } from "lucide-react";

export function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const { openPreview, openDetails } = useModal();
  const wishlisted = isWishlisted(product.id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141210] transition-all duration-300 hover:border-champagne/30"
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
        <button
          type="button"
          onClick={() => openDetails(product.id)}
          className="block h-full w-full text-left cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={handleImgError}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>
        {/* Gradient overlay for button visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges top-left */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="rounded-md bg-champagne px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#1a1305]">
              {product.badge}
            </span>
          )}
          {product.discount ? (
            <span className="rounded-md bg-[#c1443b] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white">
              -{product.discount}%
            </span>
          ) : null}
        </div>

        {/* Wishlist top-right */}
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(
              wishlisted ? "Removed from saved items." : "Saved to wishlist.",
            );
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
            wishlisted
              ? "border-champagne/60 bg-champagne text-[#1a1305]"
              : "border-white/15 bg-black/50 text-white/80 backdrop-blur-sm hover:border-champagne/50 hover:text-champagne"
          }`}
        >
          <Heart size={13} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Hover actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 flex gap-1.5"
            >
              <button
                type="button"
                onClick={() => openPreview(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-black/70 text-white/90 border border-white/15 backdrop-blur-sm hover:border-champagne/40 hover:text-champagne transition-all duration-200 cursor-pointer"
              >
                <Eye size={12} />
                Preview
              </button>
              <button
                type="button"
                onClick={() => openDetails(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-black/70 text-white/90 border border-white/15 backdrop-blur-sm hover:border-champagne/40 hover:text-champagne transition-all duration-200 cursor-pointer"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, product.sizes[0], product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-champagne text-[#1a1305] border border-champagne/40 shadow-[0_2px_12px_rgba(201,165,62,0.35)] hover:bg-[#d9b53e] transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag size={12} />
                Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content ── */}
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne font-body">
            {product.brand}
          </span>
          <BadgeCheck size={12} className="text-champagne/70" />
        </div>

        <button
          type="button"
          onClick={() => openDetails(product.id)}
          className="block text-left text-lg font-medium text-[#f5f1e8] font-heading tracking-wide transition hover:text-champagne cursor-pointer"
        >
          {product.name}
        </button>

        <p className="min-h-10 text-xs leading-relaxed text-white/45 font-body">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <p className="text-base font-bold text-champagne font-body">
              {formatKes(product.price)}
            </p>
            {product.originalPrice ? (
              <p className="text-xs text-white/35 line-through font-body">
                {formatKes(product.originalPrice)}
              </p>
            ) : null}
          </div>

          {product.rating ? (
            <div className="flex items-center gap-1 text-white/60">
              <Star size={12} className="fill-champagne text-champagne" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          ) : null}
        </div>

        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-body">
          Stock {product.stock}
        </p>
      </div>
    </motion.article>
  );
}
