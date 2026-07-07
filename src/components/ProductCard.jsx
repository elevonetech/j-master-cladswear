import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";

export function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const { openPreview, openDetails } = useModal();
  const wishlisted = isWishlisted(product.id);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group overflow-hidden rounded-[2rem] bg-basalt border border-champagne/10 hover:border-champagne/30 transition-all duration-300 shadow-[0_24px_90px_rgba(0,0,0,0.6)]"
    >
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => openDetails(product.id)}
          className="block w-full text-left cursor-pointer"
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={handleImgError}
            className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </button>
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-basalt/90 border border-champagne/30 px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-champagne font-semibold shadow-md">
            {product.badge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast.success(
              wishlisted
                ? "Removed from saved items."
                : "Product saved successfully.",
            );
          }}
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 shadow-lg cursor-pointer ${
            wishlisted
              ? "bg-champagne text-basalt border border-champagne"
              : "bg-basalt/80 text-bone hover:bg-champagne hover:text-basalt border border-white/10 hover:border-champagne"
          }`}
        >
          {wishlisted ? "Saved" : "Save"}
        </button>
        <AnimatePresence>
          {hovered ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5"
            >
              <button
                type="button"
                onClick={() => openPreview(product.id)}
                className="btn-secondary flex h-11 items-center justify-center rounded-full px-2 text-[10px] shadow-lg shadow-black/20"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => openDetails(product.id)}
                className="btn-secondary flex h-11 items-center justify-center rounded-full px-2 text-[10px] shadow-lg shadow-black/20"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, product.sizes[0], product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="btn-primary flex h-11 items-center justify-center rounded-full px-2 text-[10px] shadow-lg shadow-black/25"
              >
                Add cart
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/60 font-semibold font-body">
              {product.brand}
            </p>
            <button
              type="button"
              onClick={() => openDetails(product.id)}
              className="mt-2 block text-left text-xl font-medium text-white font-heading tracking-wide transition hover:text-champagne cursor-pointer"
            >
              {product.name}
            </button>
          </div>
          <div className="rounded-full bg-basalt border border-champagne/20 px-3 py-1 text-xs text-champagne font-semibold shadow-inner shadow-white/5">
            {product.rating} ★
          </div>
        </div>
        <p className="min-h-10 text-xs leading-relaxed text-bone/60 font-body">
          {product.description}
        </p>
        <div className="flex items-center justify-between border-t border-champagne/10 pt-4">
          <p className="text-lg font-semibold text-white font-body">
            {formatKes(product.price)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-bone/45 font-body">
            Stock {product.stock}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
