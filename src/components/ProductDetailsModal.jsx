import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { useProducts } from "@/context/ProductContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";

function StarRating({ rating, max = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < Math.round(rating)
              ? "fill-champagne text-champagne"
              : "text-bone/20"
          }
        />
      ))}
    </span>
  );
}

export function ProductDetailsModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { openDetails } = useModal();
  const { products } = useProducts();
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const prevImage = () =>
    setImageIndex((v) => (v === 0 ? product.images.length - 1 : v - 1));
  const nextImage = () => setImageIndex((v) => (v + 1) % product.images.length);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <AnimatePresence>
      <motion.div
        key={product.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative my-8 w-full max-w-5xl overflow-hidden rounded-sm border border-champagne/10 bg-basalt shadow-xl"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-champagne/10 bg-basalt text-bone/50 transition-all hover:border-champagne/30 hover:text-champagne cursor-pointer"
            aria-label="Close details"
          >
            <X size={18} />
          </button>

          {/* Top section: image + info */}
          <div className="grid lg:grid-cols-[1fr_1fr]">
            {/* Image gallery */}
            <div className="relative aspect-square max-h-[28rem] bg-[#0D0D0D] lg:max-h-[32rem]">
              <img
                src={product.images[imageIndex]}
                alt={product.name}
                onError={handleImgError}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-champagne/10 bg-basalt/80 text-bone/50 transition-all hover:border-champagne/30 hover:text-champagne cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-champagne/10 bg-basalt/80 text-bone/50 transition-all hover:border-champagne/30 hover:text-champagne cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
              {/* Thumbnail strip */}
              <div className="absolute inset-x-0 bottom-0 flex gap-2 overflow-x-auto bg-gradient-to-t from-black/60 px-4 pb-3 pt-6">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    className={`h-14 w-14 shrink-0 overflow-hidden border transition-all duration-300 cursor-pointer ${
                      i === imageIndex
                        ? "border-champagne"
                        : "border-champagne/10 hover:border-champagne/30"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product?.name || "Product"} thumbnail`}
                      onError={handleImgError}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col p-6 md:p-8">
              <div>
                <p className="text-xs font-body uppercase tracking-[0.15em] text-champagne/70">
                  {product.brand}
                </p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-bone">
                  {product.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs font-mono text-bone/40">
                      {product.rating} / 5
                    </span>
                  </div>
                  <span className="text-champagne/10">|</span>
                  <span className="text-xs font-mono text-bone/40">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              <p className="mt-5 text-2xl font-mono font-bold text-champagne">
                {formatKes(product.price)}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-bone/60">
                {product.description}
              </p>

              {/* Category, stock badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="border border-champagne/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-champagne/70">
                  {product.category}
                </span>
                <span className="border border-champagne/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] text-champagne/70">
                  {product.collection}
                </span>
                <span
                  className={`border px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.15em] transition-all duration-300 ${
                    product.stock > 0
                      ? "border-champagne/10 text-champagne/70"
                      : "border-red-400/20 text-red-400"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Size and Color */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-body uppercase tracking-[0.15em] text-bone/60">
                    Size
                  </span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="border border-champagne/10 bg-[#0D0D0D] px-4 py-2.5 text-xs font-mono text-bone outline-none cursor-pointer"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s} className="bg-basalt">
                        EU {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-body uppercase tracking-[0.15em] text-bone/60">
                    Color
                  </span>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="border border-champagne/10 bg-[#0D0D0D] px-4 py-2.5 text-xs font-mono text-bone outline-none cursor-pointer"
                  >
                    {product.colors.map((c) => (
                      <option key={c} value={c} className="bg-basalt">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-body uppercase tracking-[0.15em] text-bone/60">
                  Qty
                </span>
                <div className="flex items-center border border-champagne/10">
                  <button
                    type="button"
                    onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                    className="flex h-9 w-9 items-center justify-center text-bone/50 transition-colors hover:text-champagne cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs text-bone">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((v) => v + 1)}
                    className="flex h-9 w-9 items-center justify-center text-bone/50 transition-colors hover:text-champagne cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, quantity, selectedSize, selectedColor);
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="h-12 bg-champagne text-[11px] font-body font-semibold uppercase tracking-[0.15em] text-basalt transition-all hover:bg-champagne/90 cursor-pointer"
                >
                  Add to cart
                </button>
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
                  className={`h-12 border text-[11px] font-body font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                    wishlisted
                      ? "border-champagne text-champagne bg-champagne/10"
                      : "border-champagne/10 text-bone/50 hover:border-champagne/30 hover:text-champagne"
                  }`}
                >
                  {wishlisted ? "Saved" : "Save to wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section: specs + related */}
          <div className="p-6 md:p-8">
            {/* Specifications */}
            <div>
              <h3 className="text-xs font-body uppercase tracking-[0.15em] text-champagne/60">
                Specifications
              </h3>
              <ul className="mt-4 grid gap-2 text-xs text-bone/60">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="border border-champagne/5 bg-[#0D0D0D] px-4 py-3"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  ["Sizes available", product.sizes.join(", ")],
                  ["Colors", product.colors.join(", ")],
                  ["Gender", product.gender],
                  ["Collection", product.collection],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-champagne/5 bg-[#0D0D0D] p-3"
                  >
                    <p className="text-[10px] font-body uppercase tracking-wider text-bone/30">
                      {label}
                    </p>
                    <p className="mt-1.5 text-sm text-bone/70">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-body uppercase tracking-[0.15em] text-champagne/60">
                  Related Products
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => openDetails(r.id)}
                      className="overflow-hidden border border-champagne/5 bg-[#0D0D0D] text-left transition duration-300 hover:border-champagne/20 cursor-pointer"
                    >
                      <img
                        src={r.images[0]}
                        alt={r.name}
                        onError={handleImgError}
                        className="h-28 w-full object-cover"
                      />
                      <div className="p-3">
                        <p className="truncate font-heading text-xs font-semibold text-bone">
                          {r.name}
                        </p>
                        <p className="mt-1 text-[10px] font-mono text-champagne">
                          {formatKes(r.price)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
