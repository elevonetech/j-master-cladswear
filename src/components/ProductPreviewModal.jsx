import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
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
    text: "The build quality feels premium and the monochrome look works with everything.",
  },
  {
    name: "Sarah Wanjiku",
    rating: 4,
    date: "February 2026",
    text: "Sizing was accurate and the WhatsApp ordering process was incredibly fast.",
  },
  {
    name: "James Karanja",
    rating: 5,
    date: "January 2026",
    text: "Great fit and finish. The shoes arrived well packaged and exactly as described.",
  },
];

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={
            i < Math.round(rating)
              ? "fill-champagne text-champagne"
              : "fill-champagne/15 text-champagne/15"
          }
        />
      ))}
    </span>
  );
}

function ReviewCard({ name, rating, date, text }) {
  return (
    <div className="rounded-[1.25rem] bg-[#f8f8f8] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#111] font-heading tracking-wide">{name}</p>
          <StarRating rating={rating} />
        </div>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-champagne">
          {date}
        </p>
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-[#666] font-body">{text}</p>
    </div>
  );
}

export function ProductPreviewModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { openDetails } = useModal();
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setImageIndex(0);
      setShowDetails(false);
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

  const handleSave = () => {
    toggleWishlist(product.id);
    toast.success(
      wishlisted ? "Removed from saved items." : "Product saved successfully.",
    );
  };

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl"
        >
          {/* Scrollable content */}
          <div className="overflow-y-auto">
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative min-h-[20rem] bg-[#fafafa] md:min-h-full">
                <img
                  src={product.images[imageIndex]}
                  alt={product.name}
                  onError={handleImgError}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={prevImage}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex-1 space-y-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-champagne font-body">
                      {product.brand}
                    </p>
                    <h3 className="mt-2 text-3xl font-medium text-[#111] font-heading tracking-wide">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-2xl font-semibold text-[#111] font-body">
                    {formatKes(product.price)}
                  </p>
                  <p className="text-xs leading-relaxed text-[#666] font-body">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-champagne">
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-2">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-2">
                      {product.rating} ★
                    </span>
                    <span className="rounded-full bg-[#f8f8f8] px-3 py-2">
                      {product.stock} in stock
                    </span>
                  </div>

                  {/* Expanded details */}
                  {showDetails && (
                    <div className="space-y-6 pt-5">
                      {/* Size & Color */}
                      <div className="grid grid-cols-2 gap-4 font-body">
                        <label className="grid gap-2">
                          <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                            Size
                          </span>
                          <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="rounded-full bg-[#f8f8f8] px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer"
                          >
                            {product.sizes.map((s) => (
                              <option key={s} value={s} className="bg-white">
                                EU {s}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="grid gap-2">
                          <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                            Color
                          </span>
                          <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="rounded-full bg-[#f8f8f8] px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer"
                          >
                            {product.colors.map((c) => (
                              <option key={c} value={c} className="bg-white">
                                {c}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      {/* Specs */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] text-champagne font-body">
                          Specifications
                        </h4>
                        <ul className="mt-3 grid gap-2 text-xs text-[#666] font-body">
                          {product.specs.map((spec) => (
                            <li
                              key={spec}
                              className="rounded-[1rem] bg-[#f8f8f8] px-4 py-2.5"
                            >
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reviews */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] text-champagne font-body">
                          Customer Reviews
                        </h4>
                        <div className="mt-3 grid gap-3">
                          {REVIEWS.map((rev) => (
                            <ReviewCard key={rev.name} {...rev} />
                          ))}
                        </div>
                      </div>

                      {/* Related products */}
                      {related.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.3em] text-champagne font-body">
                            Related Products
                          </h4>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            {related.map((r) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => {
                                  onClose();
                                  openDetails(r.id);
                                }}
                                className="overflow-hidden rounded-[1rem] bg-white text-left transition duration-300 cursor-pointer"
                              >
                                <img
                                  src={r.images[0]}
                                  alt={r.name}
                                  onError={handleImgError}
                                  className="h-24 w-full object-cover"
                                />
                                <div className="p-2.5">
                                  <p className="truncate text-xs font-semibold text-[#111] font-heading">
                                    {r.name}
                                  </p>
                                  <p className="text-[10px] text-champagne font-body">
                                    {formatKes(r.price)}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-2.5 pt-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(
                          product,
                          1,
                          selectedSize || product.sizes[0],
                          selectedColor || product.colors[0],
                        );
                        toast.success(`${product.name} added to cart`);
                      }}
                      className="btn-secondary h-12"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="btn-primary h-12"
                    >
                      {wishlisted ? "Saved" : "Save"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowDetails((v) => !v)}
                      className="btn-primary h-12"
                    >
                      {showDetails ? "Show less" : "View details"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary h-12"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
