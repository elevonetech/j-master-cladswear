import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import { Heart, Eye, ShoppingBag } from "lucide-react";

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
      className="group overflow-hidden rounded-[2rem] bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* ── Image ── */}
      <div className="relative">
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
        {/* Gradient overlay for button visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-[#f8f8f8] px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-champagne">
            {product.badge}
          </span>
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
          className={`absolute right-4 top-4 px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer ${
            wishlisted
              ? "bg-champagne text-white"
              : "bg-[#f5f5f5] text-[#111] hover:bg-champagne hover:text-white"
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
              className="absolute bottom-3 left-3 right-3 flex gap-1.5"
            >
              <button
                type="button"
                onClick={() => openPreview(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-white/90 text-[#111] border border-black/10 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <Eye size={12} />
                Preview
              </button>
              <button
                type="button"
                onClick={() => openDetails(product.id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-white/90 text-[#111] border border-black/10 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:bg-white transition-all duration-200 cursor-pointer"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, product.sizes[0], product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-full text-[10px] font-semibold tracking-wide bg-champagne text-white border border-champagne/40 backdrop-blur-sm shadow-[0_2px_12px_rgba(201,165,62,0.35)] hover:bg-[#b8942e] transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag size={12} />
                Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne font-body">
              {product.brand}
            </p>
            <button
              type="button"
              onClick={() => openDetails(product.id)}
              className="mt-2 block text-left text-xl font-medium text-[#111] font-heading tracking-wide transition hover:text-champagne cursor-pointer"
            >
              {product.name}
            </button>
          </div>
          <div className="rounded-full bg-[#f8f8f8] px-3 py-1 text-champagne">
            {product.rating}
          </div>
        </div>
        <p className="min-h-10 text-xs leading-relaxed text-[#666] font-body">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <p className="text-lg font-semibold text-[#111] font-body">
            {formatKes(product.price)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-body">
            Stock {product.stock}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
