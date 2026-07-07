import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Heart, ChevronLeft, ChevronRight, ShoppingCart, MessageCircle, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import products from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { useStore } from "@/context/StoreContext";
import { formatKes } from "@/utils/money";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { handleImgError } from "@/utils/image";

const REVIEWS = [
  { name: "Alex Mwangi",    rating: 5, date: "March 2026",    text: "Exceptional build quality. The finish is immaculate and the fit was true to size. Delivery was fast and well packaged." },
  { name: "Sarah Wanjiku",  rating: 4, date: "February 2026", text: "Great design and comfortable from the first wear. The monochrome palette makes them versatile for any outfit." },
  { name: "James Karanja",  rating: 5, date: "January 2026",  text: "Ordered via WhatsApp and had them the next day. Sizing was accurate and the shoes look even better in person." },
  { name: "Christine Otieno", rating: 4, date: "December 2025", text: "Premium quality at a fair price. The sole is durable and the upper material feels substantial." },
];

function StarRating({ rating, dark = false }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < Math.round(rating)
              ? dark ? "fill-champagne text-champagne" : "fill-champagne text-champagne"
              : dark ? "fill-white/15 text-white/15" : "fill-black/15 text-black/15"
          }
        />
      ))}
    </span>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, markViewed, recentlyViewed } = useStore();
  const [selectedSize,  setSelectedSize]  = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity,      setQuantity]      = useState(1);
  const [imageIndex,    setImageIndex]    = useState(0);

  const product = useMemo(() => products.find((item) => item.id === id), [id]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setImageIndex(0);
      markViewed(product.id);
    }
  }, [product, markViewed]);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-5 pb-24 sm:px-8 lg:px-10 py-16">
        <SectionHeading title="Product not found" description="The item you requested is unavailable. Browse the shop to discover more styles." />
        <Link to="/shop" className="btn-primary inline-flex px-7 py-3.5">Back to shop</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl([{ product, quantity, selectedSize, selectedColor }]);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ backgroundColor: "#faf9f7" }}>
      {/* ── Header band ── */}
      <div className="bg-white border-b border-black/06 py-6 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home",    to: "/" },
              { label: "Shop",    to: "/shop" },
              { label: product.name },
            ]}
          />
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone/55 hover:text-stone transition-colors duration-220"
          >
            <ChevronLeft size={14} />
            Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* ── Image gallery ── */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-white border border-black/07 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <motion.img
                key={imageIndex}
                src={product.images[imageIndex]}
                alt={product.name}
                onError={handleImgError}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="h-[30rem] w-full object-cover hover:scale-105 transition-transform duration-600"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setImageIndex((v) => v === 0 ? product.images.length - 1 : v - 1)}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-black/08 shadow-md text-stone hover:bg-stone hover:text-white transition-all duration-220 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageIndex((v) => (v + 1) % product.images.length)}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 border border-black/08 shadow-md text-stone hover:bg-stone hover:text-white transition-all duration-220 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
              <div className="absolute top-4 left-4">
                <span className="badge-gold">{product.badge}</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImageIndex(idx)}
                  className={`overflow-hidden rounded-2xl border-2 transition-all duration-220 ${idx === imageIndex ? "border-champagne shadow-md" : "border-black/07 hover:border-black/15"}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    onError={handleImgError}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Product details ── */}
          <div className="bg-white border border-black/07 rounded-3xl p-7 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {/* Brand + name */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-champagne">{product.brand}</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold font-heading text-stone leading-tight">{product.name}</h1>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast.success(wishlisted ? "Removed from saved items." : "Product saved successfully.");
                }}
                aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-280 cursor-pointer
                  ${wishlisted
                    ? "bg-champagne border-champagne text-white"
                    : "border-black/10 text-stone/50 hover:bg-champagne hover:border-champagne hover:text-white"
                  }`}
              >
                <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Rating + tags */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-full bg-champagne/08 border border-champagne/20 px-3 py-1.5">
                <StarRating rating={product.rating} />
                <span className="text-[0.7rem] font-semibold text-champagne">{product.rating}/5</span>
              </div>
              <span className="badge-light">{product.category}</span>
              <span className="badge-gold">{product.badge}</span>
            </div>

            {/* Price */}
            <p className="mt-6 text-[2rem] font-bold text-stone font-heading">
              {formatKes(product.price)}
            </p>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-stone/58">
              {product.description}
            </p>

            {/* Size + Color */}
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2.5">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-stone/45">Size</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="rounded-full bg-black/[0.04] border border-black/10 px-4 py-2.5 text-[0.8rem] text-stone outline-none cursor-pointer transition hover:border-champagne/40"
                >
                  {product.sizes.map((s) => <option key={s} value={s}>EU {s}</option>)}
                </select>
              </label>
              <label className="grid gap-2.5">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-stone/45">Color</span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="rounded-full bg-black/[0.04] border border-black/10 px-4 py-2.5 text-[0.8rem] text-stone outline-none cursor-pointer transition hover:border-champagne/40"
                >
                  {product.colors.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-stone/45 mr-1">Qty</span>
              <div className="flex items-center rounded-full border border-black/10 bg-[#faf9f7] overflow-hidden">
                <button type="button" onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  className="flex h-10 w-10 items-center justify-center text-stone/60 hover:bg-stone hover:text-white transition-all duration-200 cursor-pointer">
                  <Minus size={12} />
                </button>
                <span className="min-w-[2.5rem] text-center text-[0.85rem] font-semibold text-stone">{quantity}</span>
                <button type="button" onClick={() => setQuantity((v) => v + 1)}
                  className="flex h-10 w-10 items-center justify-center text-stone/60 hover:bg-stone hover:text-white transition-all duration-200 cursor-pointer">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => { addToCart(product, quantity, selectedSize, selectedColor); toast.success(`${product.name} added to cart`); }}
                className="btn-secondary flex flex-1 items-center justify-center gap-2 !py-3.5 !text-[0.72rem]"
              >
                <ShoppingCart size={14} />
                Add to cart
              </button>
              <button
                type="button"
                onClick={openWhatsApp}
                className="btn-primary flex flex-1 items-center justify-center gap-2 !py-3.5 !text-[0.72rem]"
              >
                <MessageCircle size={14} />
                Order via WhatsApp
              </button>
            </div>

            {/* Specs grid */}
            <div className="mt-7 rounded-2xl bg-[#faf9f7] border border-black/06 p-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Stock availability", `${product.stock} units`],
                ["Sizes",              product.sizes.join(", ")],
                ["Colors",             product.colors.join(", ")],
                ["Collection",         product.collection],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-stone/38">{label}</p>
                  <p className="mt-1.5 text-[0.78rem] text-stone/65">{value}</p>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <div className="mt-6">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-stone/45 mb-3">Specifications</h2>
              <ul className="grid gap-2">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2.5 rounded-xl bg-[#faf9f7] border border-black/06 px-4 py-2.5 text-[0.78rem] text-stone/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Reviews + Recently viewed ── */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.72fr]">

          {/* Reviews */}
          <div className="bg-white border border-black/07 rounded-3xl p-7 md:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <SectionHeading
              eyebrow="Reviews"
              title="Customer reviews"
              description="Genuine impressions from shoppers who value fit, finish, and fast delivery."
            />
            <div className="grid gap-4">
              {REVIEWS.map((review) => (
                <div key={review.name} className="rounded-2xl border border-black/06 bg-[#faf9f7] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.85rem] font-semibold text-stone">{review.name}</p>
                      <div className="mt-1.5">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-stone/38 flex-shrink-0">{review.date}</p>
                  </div>
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-stone/60 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recently viewed */}
          <div className="bg-white border border-black/07 rounded-3xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <SectionHeading
              eyebrow="Recently viewed"
              title="Your trail"
              description="Your latest product trail, saved locally for easy rediscovery."
            />
            <div className="grid gap-3">
              {recentlyViewed
                .filter((itemId) => itemId !== product.id)
                .map((itemId) => {
                  const item = products.find((e) => e.id === itemId);
                  if (!item) return null;
                  return (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="flex items-center gap-4 rounded-2xl border border-black/06 bg-[#faf9f7] p-3 transition hover:bg-black/[0.03]"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        onError={handleImgError}
                        className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="text-[0.82rem] font-semibold text-stone">{item.name}</p>
                        <p className="mt-0.5 text-[0.7rem] font-semibold text-champagne">{formatKes(item.price)}</p>
                      </div>
                    </Link>
                  );
                })}
              {recentlyViewed.filter((id) => id !== product.id).length === 0 && (
                <p className="text-[0.8rem] text-stone/45">No other recently viewed products yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
