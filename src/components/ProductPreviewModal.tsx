import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useModal } from "@/context/ModalContext";
import type { Product } from "@/types";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import products from "@/data/products";

type ReviewItem = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

const REVIEWS: ReviewItem[] = [
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

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
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

function ReviewCard({ name, rating, date, text }: ReviewItem) {
  return (
    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <StarRating rating={rating} />
        </div>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {date}
        </p>
      </div>
      <p className="mt-2.5 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function ProductPreviewModal({ product, onClose }: Props) {
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
    const onKey = (e: KeyboardEvent) => {
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="glass relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem]"
        >
          {/* Scrollable content */}
          <div className="overflow-y-auto">
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative min-h-[20rem] bg-black md:min-h-full">
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
                    className="btn-secondary px-3 py-1.5 text-xs shadow-lg shadow-black/30"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="btn-secondary px-3 py-1.5 text-xs shadow-lg shadow-black/30"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Content side */}
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex-1 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                      {product.brand}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-2xl font-semibold text-white">
                    {formatKes(product.price)}
                  </p>
                  <p className="text-sm leading-7 text-white/65">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/55">
                    <span className="rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
                      {product.rating}/5 stars
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
                      {product.stock} in stock
                    </span>
                  </div>

                  {/* Expanded details */}
                  {showDetails && (
                    <div className="space-y-6 border-t border-white/10 pt-5">
                      {/* Size & Color */}
                      <div className="grid grid-cols-2 gap-4">
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

                      {/* Specs */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] text-white/45">
                          Specifications
                        </h4>
                        <ul className="mt-3 grid gap-2 text-sm text-white/68">
                          {product.specs.map((spec) => (
                            <li
                              key={spec}
                              className="rounded-[1rem] bg-white/5 px-4 py-2.5 shadow-sm"
                            >
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reviews */}
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] text-white/45">
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
                          <h4 className="text-xs uppercase tracking-[0.3em] text-white/45">
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
                                className="overflow-hidden rounded-[1rem] bg-white/5 text-left transition hover:bg-white/10"
                              >
                                <img
                                  src={r.images[0]}
                                  alt={r.name}
                                  onError={handleImgError}
                                  className="h-24 w-full object-cover"
                                />
                                <div className="p-2.5">
                                  <p className="truncate text-xs font-medium text-white">
                                    {r.name}
                                  </p>
                                  <p className="text-[10px] text-white/50">
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
                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
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
                      className="btn-secondary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="btn-primary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
                    >
                      {wishlisted ? "Saved" : "Save"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowDetails((v) => !v)}
                      className="btn-primary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
                    >
                      {showDetails ? "Show less" : "View details"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary flex h-12 items-center justify-center px-4 text-sm shadow-lg shadow-black/20"
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
