import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import products from "@/data/products";

const REVIEWS = [
  {
    name: "Alex Mwangi",
    rating: 5,
    date: "March 2026",
    text: "Exceptional build quality. The finish is immaculate and the fit was true to size. Delivery was fast and well packaged.",
  },
  {
    name: "Sarah Wanjiku",
    rating: 4,
    date: "February 2026",
    text: "Great design and comfortable from the first wear. The monochrome palette makes them versatile for any outfit.",
  },
  {
    name: "James Karanja",
    rating: 5,
    date: "January 2026",
    text: "Ordered via WhatsApp and had them the next day. Sizing was accurate and the shoes look even better in person.",
  },
  {
    name: "Christine Otieno",
    rating: 4,
    date: "December 2025",
    text: "Premium quality at a fair price. The sole is durable and the upper material feels substantial.",
  },
  {
    name: "Brian Njoroge",
    rating: 5,
    date: "November 2025",
    text: "Superb construction. I have bought three pairs and each one has been consistent in quality and style.",
  },
];

function StarRating({ rating, max = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < Math.round(rating)
              ? "fill-white text-white"
              : "fill-white/15 text-white/15"
          }
        />
      ))}
    </span>
  );
}

function ReviewCard({ name, rating, date, text }) {
  return (
    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <StarRating rating={rating} />
        </div>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {date}
        </p>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </div>
  );
}

export function ProductDetailsModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { openDetails } = useModal();
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
  const nextImage = () =>
    setImageIndex((v) => (v + 1) % product.images.length);

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
          className="glass relative my-8 w-full max-w-5xl rounded-[2rem] overflow-hidden"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center shadow-lg shadow-black/30"
            aria-label="Close details"
          >
            <X size={18} />
          </button>

          {/* Top section: image + info */}
          <div className="grid lg:grid-cols-[1fr_1fr]">
            {/* Image gallery */}
            <div className="relative min-h-[22rem] bg-black/40 lg:min-h-[34rem]">
              <img
                src={product.images[imageIndex]}
                alt={product.name}
                onError={handleImgError}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={prevImage}
                className="btn-secondary absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center shadow-lg shadow-black/30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="btn-secondary absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center shadow-lg shadow-black/30"
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
                    className={`shrink-0 overflow-hidden rounded-xl transition ${
                      i === imageIndex
                        ? "ring-2 ring-white"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      onError={handleImgError}
                      className="h-14 w-14 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col p-6 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  {product.brand}
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  {product.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-white/60">
                      {product.rating}/5
                    </span>
                  </div>
                  <span className="text-white/30">|</span>
                  <span className="text-sm text-white/60">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              <p className="mt-5 text-3xl font-semibold text-white">
                {formatKes(product.price)}
              </p>

              <p className="mt-4 text-sm leading-7 text-white/65">
                {product.description}
              </p>

              {/* Category, stock badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white/55 shadow-inner shadow-white/5">
                  {product.category}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-white/55 shadow-inner shadow-white/5">
                  {product.collection}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.3em] shadow-inner ${
                    product.stock > 10
                      ? "bg-white/5 text-white/55 shadow-white/5"
                      : product.stock > 0
                        ? "bg-white/10 text-white/70 shadow-white/5"
                        : "bg-white/5 text-white/30 shadow-white/5"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>

              {/* Size and Color */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                    Size
                  </span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="rounded-full bg-black/30 px-4 py-2.5 text-sm text-white outline-none shadow-inner shadow-white/5"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s} className="bg-black">
                        EU {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                    Color
                  </span>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="rounded-full bg-black/30 px-4 py-2.5 text-sm text-white outline-none shadow-inner shadow-white/5"
                  >
                    {product.colors.map((c) => (
                      <option key={c} value={c} className="bg-black">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Qty
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                    className="btn-secondary flex h-9 w-9 items-center justify-center text-sm shadow-sm"
                  >
                    -
                  </button>
                  <span className="min-w-10 rounded-full bg-white/5 px-3 py-2 text-center text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((v) => v + 1)}
                    className="btn-secondary flex h-9 w-9 items-center justify-center text-sm shadow-sm"
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
                  className="btn-secondary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
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
                  className="btn-primary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
                >
                  {wishlisted ? "Saved" : "Save to wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section: specs + reviews + related */}
          <div className="border-t border-white/8 p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Specifications */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Specifications
                </h3>
                <ul className="mt-4 grid gap-2">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-[1rem] bg-white/[0.04] px-4 py-3 text-sm text-white/68 shadow-sm"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Sizes available", product.sizes.join(", ")],
                    ["Colors", product.colors.join(", ")],
                    ["Gender", product.gender],
                    ["Collection", product.collection],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1rem] bg-white/[0.04] p-3">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                        {label}
                      </p>
                      <p className="mt-1.5 text-sm text-white/70">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Customer Reviews
                </h3>
                <div className="mt-4 grid gap-3">
                  {REVIEWS.slice(0, 3).map((rev) => (
                    <ReviewCard key={rev.name} {...rev} />
                  ))}
                </div>
              </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Related Products
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => openDetails(r.id)}
                      className="overflow-hidden rounded-[1.25rem] bg-white/[0.04] text-left transition hover:bg-white/[0.08]"
                    >
                      <img
                        src={r.images[0]}
                        alt={r.name}
                        onError={handleImgError}
                        className="h-28 w-full object-cover"
                      />
                      <div className="p-3">
                        <p className="truncate text-xs font-semibold text-white">
                          {r.name}
                        </p>
                        <p className="mt-1 text-[11px] text-white/50">
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
