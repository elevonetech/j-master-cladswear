import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeading } from "@/components/SectionHeading";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import products from "@/data/products";

export function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    wishlist,
    toggleWishlist,
  } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));
  const [coupon, setCoupon] = useState("");

  const discount = useMemo(() => {
    if (coupon.trim().toUpperCase() === "KITHOME10") {
      return Math.round(cartSubtotal * 0.1);
    }
    if (coupon.trim().toUpperCase() === "FREESHIP") {
      return 450;
    }
    return 0;
  }, [coupon, cartSubtotal]);

  const shipping = cartSubtotal > 15000 ? 0 : 450;
  const total = Math.max(0, cartSubtotal + shipping - discount);

  const checkout = () => {
    if (cartItems.length === 0) {
      return;
    }

    window.open(buildWhatsAppUrl(cartItems), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Cart"
        title="Your shopping cart"
        description="Review selected sizes, colors, quantities, and totals before sending the order on WhatsApp."
      />

      {cartItems.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Add products from the shop or use quick preview to start building your order."
          action={
            <Link
              to="/shop"
              className="btn-secondary inline-flex px-5 py-3 shadow-lg shadow-black/20"
            >
              Explore products
            </Link>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.article
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass flex flex-col gap-5 rounded-[2rem] p-5 md:flex-row"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  onError={handleImgError}
                  className="h-40 w-full rounded-[1.5rem] object-cover md:w-40"
                />
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                        {item.product.brand}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {item.product.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/60">
                        Size {item.selectedSize} · {item.selectedColor}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor,
                        )
                      }
                      className="btn-primary px-4 py-2 text-sm shadow-lg shadow-black/20"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-lg font-semibold text-white">
                      {formatKes(item.product.price)}
                    </p>
                    <div className="flex items-center gap-1 rounded-full bg-white/5 shadow-inner shadow-white/5">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1,
                          )
                        }
                        className="btn-secondary rounded-s-full px-3 py-2 text-sm shadow-none"
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1,
                          )
                        }
                        className="btn-secondary rounded-e-full px-3 py-2 text-sm shadow-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="glass h-fit rounded-[2rem] p-6 md:p-8 lg:sticky lg:top-32">
            <h2 className="text-2xl font-semibold text-white">Cart summary</h2>
            <div className="mt-6 space-y-4 text-sm text-white/68">
              <div className="flex items-center justify-between pb-3">
                <span>Subtotal</span>
                <span>{formatKes(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between pb-3">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatKes(shipping)}</span>
              </div>
              <div className="flex items-center justify-between pb-3">
                <span>Discount</span>
                <span>-{formatKes(discount)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>{formatKes(total)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white/5 p-4 text-sm text-white/65 shadow-lg shadow-black/10">
              Shipping information: premium packaging, tracked delivery, and
              WhatsApp order confirmation.
            </div>

            <div className="mt-6 grid gap-3">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Coupon code
                </span>
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="KITHOME10 or FREESHIP"
                  className="rounded-full bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 shadow-inner shadow-white/5"
                />
              </label>
              <button
                type="button"
                onClick={checkout}
                className="btn-secondary inline-flex items-center justify-center px-5 py-4 shadow-lg shadow-black/20"
              >
                Proceed to checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="btn-primary px-5 py-4 text-sm shadow-lg shadow-black/20"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}

      <hr className="my-16 border-white/10" />

      <section>
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
      </section>
    </div>
  );
}
