import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import products from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { useStore } from "@/context/StoreContext";
import { formatKes } from "@/utils/money";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { handleImgError } from "@/utils/image";

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
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
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
    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <div className="mt-1">
            <StarRating rating={rating} />
          </div>
        </div>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/40">
          {date}
        </p>
      </div>
      <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    markViewed,
    recentlyViewed,
  } = useStore();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

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
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading
          title="Product not found"
          description="The item you requested is unavailable. Browse the shop to discover more styles."
        />
        <Link
          to="/shop"
          className="btn-secondary inline-flex px-5 py-3 shadow-lg shadow-black/20"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl([
      { product, quantity, selectedSize, selectedColor },
    ]);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.name },
          ]}
        />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary px-5 py-3 text-sm shadow-lg shadow-black/20"
        >
          Back
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-black/30 shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
            <img
              src={product.images[imageIndex]}
              alt={product.name}
              onError={handleImgError}
              className="h-[34rem] w-full object-cover transition duration-500 hover:scale-105"
            />
            <button
              type="button"
              onClick={() =>
                setImageIndex((value) =>
                  value === 0 ? product.images.length - 1 : value - 1,
                )
              }
              className="btn-secondary absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 text-sm shadow-lg shadow-black/30"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setImageIndex((value) => (value + 1) % product.images.length)
              }
              className="btn-secondary absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 text-sm shadow-lg shadow-black/30"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setImageIndex(index)}
                className={`overflow-hidden rounded-[1.5rem] ${index === imageIndex ? "ring-2 ring-white/70" : ""}`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  onError={handleImgError}
                  className="h-28 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-[2rem] p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                {product.brand}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(
                  isWishlisted(product.id)
                    ? "Removed from saved items."
                    : "Product saved successfully.",
                );
              }}
              className="btn-primary px-4 py-2 text-sm shadow-lg shadow-black/20"
            >
              {isWishlisted(product.id) ? "Saved" : "Save"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/68">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
              <StarRating rating={product.rating} />
              <span className="text-xs">{product.rating}/5</span>
            </span>
            <span className="rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
              {product.category}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-2 shadow-inner shadow-white/5">
              {product.badge}
            </span>
          </div>

          <p className="mt-6 text-3xl font-semibold text-white">
            {formatKes(product.price)}
          </p>
          <p className="mt-4 text-sm leading-8 text-white/65">
            {product.description}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                Size
              </span>
              <select
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
                className="rounded-full bg-black/30 px-4 py-3 text-sm text-white outline-none shadow-inner shadow-white/5"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size} className="bg-black">
                    EU {size}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                Color
              </span>
              <select
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
                className="rounded-full bg-black/30 px-4 py-3 text-sm text-white outline-none shadow-inner shadow-white/5"
              >
                {product.colors.map((color) => (
                  <option key={color} value={color} className="bg-black">
                    {color}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="btn-secondary rounded-s-full px-4 py-3 text-sm shadow-md"
            >
              -
            </button>
            <div className="min-w-16 rounded-full bg-white/5 px-5 py-3 text-center text-sm text-white shadow-inner shadow-white/5">
              {quantity}
            </div>
            <button
              type="button"
              onClick={() => setQuantity((value) => value + 1)}
              className="btn-secondary rounded-e-full px-4 py-3 text-sm shadow-md"
            >
              +
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                addToCart(product, quantity, selectedSize, selectedColor);
                toast.success(`${product.name} added to cart`);
              }}
              className="btn-secondary flex flex-1 items-center justify-center px-6 py-4 shadow-lg shadow-black/20"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="btn-primary flex flex-1 items-center justify-center px-6 py-4 shadow-lg shadow-black/20"
            >
              Order via WhatsApp
            </button>
          </div>

          <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-white/5 p-5 shadow-lg shadow-black/10 sm:grid-cols-2">
            {[
              ["Stock availability", `${product.stock} units`],
              ["Sizes", product.sizes.join(", ")],
              ["Colors", product.colors.join(", ")],
              ["Collection", product.collection],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {label}
                </p>
                <p className="mt-2 text-sm text-white/72">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white">
              Product specifications
            </h2>
            <ul className="mt-4 grid gap-3 text-sm text-white/68">
              {product.specs.map((spec) => (
                <li
                  key={spec}
                  className="rounded-[1.25rem] bg-white/5 px-4 py-3 shadow-lg shadow-black/10"
                >
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="glass rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Reviews"
            title="Customer reviews"
            description="Genuine impressions from shoppers who value fit, finish, and fast delivery."
          />
          <div className="grid gap-4">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </div>
        </div>
        <div className="glass rounded-[2rem] p-6 md:p-8">
          <SectionHeading
            eyebrow="Recently viewed"
            title="Recently viewed"
            description="Your latest product trail, saved locally for easy rediscovery."
          />
          <div className="grid gap-3">
            {recentlyViewed
              .filter((itemId) => itemId !== product.id)
              .map((itemId) => {
                const item = products.find((entry) => entry.id === itemId);
                if (!item) return null;
                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-4 rounded-[1.25rem] bg-white/5 p-3 shadow-lg shadow-black/10 transition hover:bg-white/10"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      onError={handleImgError}
                      className="h-16 w-16 rounded-[1rem] object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                        {formatKes(item.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            {recentlyViewed.length <= 1 ? (
              <p className="text-sm text-white/45">No recent products yet.</p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
