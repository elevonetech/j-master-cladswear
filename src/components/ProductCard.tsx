import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import type { Product } from "@/types";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
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
      className="group overflow-hidden rounded-[2rem] bg-white/[0.04] shadow-[0_24px_90px_rgba(0,0,0,0.38)]"
    >
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => openDetails(product.id)}
          className="block w-full text-left"
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
          <span className="rounded-full bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
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
          className="btn-primary absolute right-4 top-4 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-black/30"
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
                className="btn-secondary flex h-11 items-center justify-center px-2 text-xs shadow-lg shadow-black/20"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => openDetails(product.id)}
                className="btn-secondary flex h-11 items-center justify-center px-2 text-xs shadow-lg shadow-black/20"
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, 1, product.sizes[0], product.colors[0]);
                  toast.success(`${product.name} added to cart`);
                }}
                className="btn-primary flex h-11 items-center justify-center px-2 text-xs shadow-lg shadow-black/25"
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              {product.brand}
            </p>
            <button
              type="button"
              onClick={() => openDetails(product.id)}
              className="mt-2 block text-left text-lg font-semibold text-white transition hover:text-white/80"
            >
              {product.name}
            </button>
          </div>
          <div className="rounded-full bg-black px-3 py-2 text-xs text-white/75 shadow-inner shadow-white/5">
            {product.rating}/5
          </div>
        </div>
        <p className="min-h-10 text-sm leading-6 text-white/60">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <p className="text-lg font-semibold text-white">
            {formatKes(product.price)}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">
            Stock {product.stock}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
