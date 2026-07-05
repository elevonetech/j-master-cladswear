import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import products from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { EmptyState } from "@/components/EmptyState";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";

export function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Wishlist"
        title="Your saved items"
        description="Products you have saved for later review and purchasing."
      />

      {savedProducts.length === 0 ? (
        <EmptyState
          title="No saved items"
          description="Browse the shop and save products you love for later."
          action={
            <Link
              to="/shop"
              className="btn-secondary inline-flex px-5 py-3 shadow-lg shadow-black/20"
            >
              Browse shop
            </Link>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {savedProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-[2rem] bg-white/[0.04] shadow-[0_24px_90px_rgba(0,0,0,0.38)]"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onError={handleImgError}
                  className="h-56 w-full object-cover"
                />
              </Link>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  {product.brand}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="block text-lg font-semibold text-white transition hover:text-white/80"
                >
                  {product.name}
                </Link>
                <p className="text-lg font-semibold text-white">
                  {formatKes(product.price)}
                </p>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="btn-primary flex h-11 w-full items-center justify-center text-sm"
                >
                  Remove
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
