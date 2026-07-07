import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";

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
      className="product-card group"
    >
      {/* ── Image ── */}
      <div className="card-image">
        <button
          type="button"
          onClick={() => openDetails(product.id)}
          className="block w-full text-left cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={handleImgError}
          />
        </button>

        {/* Badge top-left */}
        <div className="absolute left-3.5 top-3.5">
          <span className="badge-gold">{product.badge}</span>
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
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-280 shadow-sm cursor-pointer
            ${wishlisted
              ? "bg-champagne border-champagne/60 text-white"
              : "bg-white/90 border-black/10 text-stone/60 hover:bg-champagne hover:border-champagne hover:text-white"
            }`}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Hover actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <button
                type="button"
                onClick={() => openPreview(product.id)}
                className="flex flex-1 h-10 items-center justify-center gap-1.5 rounded-full bg-white/95 border border-black/10 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-stone shadow-md hover:bg-stone hover:text-white transition-all duration-220 cursor-pointer"
              >
                <Eye size={11} />
                Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, product.sizes[0], product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="flex flex-1 h-10 items-center justify-center gap-1.5 rounded-full bg-champagne border border-champagne text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white shadow-md hover:bg-amber-700 hover:border-amber-700 transition-all duration-220 cursor-pointer"
              >
                <ShoppingBag size={11} />
                Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Info ── */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-champagne/80 font-body">
              {product.brand}
            </p>
            <button
              type="button"
              onClick={() => openDetails(product.id)}
              className="mt-1.5 block text-left text-[1.02rem] font-semibold text-stone leading-snug font-heading transition hover:text-champagne cursor-pointer truncate w-full"
            >
              {product.name}
            </button>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <Star size={10} className="text-champagne fill-champagne" />
            <span className="text-[0.72rem] font-semibold text-stone/70 font-body">
              {product.rating}
            </span>
          </div>
        </div>

        <p className="text-[0.72rem] leading-relaxed text-stone/55 font-body line-clamp-2 min-h-[2.4rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between border-t border-black/06 pt-3.5">
          <p className="text-[1.05rem] font-bold text-stone font-body">
            {formatKes(product.price)}
          </p>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-stone/40 font-body">
            {product.stock > 5 ? "In stock" : product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
