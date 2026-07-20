import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import products from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { EmptyState } from "@/components/EmptyState";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import { Trash2 } from "lucide-react";

export function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-linen">
      {/* ── Header ── */}
      <div className="bg-white border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Wishlist"
            title="Your saved items"
            description="Products you have saved for later review and purchasing."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 pb-28">
        {savedProducts.length === 0 ? (
          <EmptyState
            title="No saved items"
            description="Browse the shop and save products you love for later."
            action={
              <Link to="/shop" className="btn-primary inline-flex px-7 py-3.5">
                Browse shop
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {savedProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-black/07 rounded-3xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.1)] transition-all duration-350 flex flex-col"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onError={handleImgError}
                    className="h-56 w-full object-cover transition-transform duration-600 hover:scale-105"
                  />
                </Link>
                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-champagne/80">
                      {product.brand}
                    </p>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-1.5 block text-[0.98rem] font-bold font-heading text-stone hover:text-champagne transition-colors duration-220 leading-snug"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-2 text-[1rem] font-bold text-stone">
                      {formatKes(product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="flex items-center justify-center gap-2 w-full rounded-full border border-black/10 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-stone/60 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-220 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
