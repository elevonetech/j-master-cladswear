import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeading } from "@/components/SectionHeading";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { formatKes } from "@/utils/money";
import { handleImgError } from "@/utils/image";
import { MessageCircle, Trash2, Plus, Minus } from "lucide-react";

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartSubtotal } = useStore();
  const [coupon, setCoupon] = useState("");

  const discount = useMemo(() => {
    if (coupon.trim().toUpperCase() === "KITHOME10") return Math.round(cartSubtotal * 0.1);
    if (coupon.trim().toUpperCase() === "FREESHIP")  return 450;
    return 0;
  }, [coupon, cartSubtotal]);

  const shipping = cartSubtotal > 15000 ? 0 : 450;
  const total    = Math.max(0, cartSubtotal + shipping - discount);

  const checkout = () => {
    if (cartItems.length === 0) return;
    window.open(buildWhatsAppUrl(cartItems), "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ backgroundColor: "#faf9f7" }}>
      {/* ── Header ── */}
      <div className="bg-white border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Cart"
            title="Your shopping cart"
            description="Review selected sizes, colors, quantities, and totals before sending the order on WhatsApp."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 pb-28">
        {cartItems.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Add products from the shop or use quick preview to start building your order."
            action={
              <Link to="/shop" className="btn-primary inline-flex px-7 py-3.5">
                Explore products
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">

            {/* ── Items ── */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.article
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="flex flex-col md:flex-row gap-5 bg-white border border-black/07 rounded-3xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={handleImgError}
                    className="h-36 w-full md:w-36 rounded-2xl object-cover flex-shrink-0"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-4 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-champagne/80">{item.product.brand}</p>
                        <h3 className="mt-1.5 text-[1rem] font-bold font-heading text-stone leading-snug">{item.product.name}</h3>
                        <p className="mt-1.5 text-[0.75rem] text-stone/55">Size {item.selectedSize} · {item.selectedColor}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        aria-label="Remove item"
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-black/08 text-stone/40 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-220 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-[1.1rem] font-bold text-stone font-body">
                        {formatKes(item.product.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-0 rounded-full border border-black/08 bg-[#faf9f7] overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-stone/60 hover:bg-stone hover:text-white transition-all duration-200 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[2rem] text-center text-[0.82rem] font-semibold text-stone px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-stone/60 hover:bg-stone hover:text-white transition-all duration-200 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* ── Summary ── */}
            <aside className="bg-white border border-black/07 rounded-3xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:sticky lg:top-28">
              <h2 className="text-xl font-bold font-heading text-stone mb-6">Order summary</h2>

              <div className="space-y-3.5 text-[0.82rem] text-stone/65">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone">{formatKes(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-stone"}`}>
                    {shipping === 0 ? "Free" : formatKes(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">−{formatKes(discount)}</span>
                  </div>
                )}
                <div className="border-t border-black/07 pt-3.5 flex justify-between text-base font-bold text-stone">
                  <span>Total</span>
                  <span>{formatKes(total)}</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#faf9f7] border border-black/06 p-4 text-[0.75rem] text-stone/55 leading-relaxed">
                Premium packaging, tracked delivery, and WhatsApp order confirmation included.
              </div>

              <div className="mt-5 space-y-3">
                <label className="grid gap-2">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-stone/45">Coupon code</span>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="KITHOME10 or FREESHIP"
                    className="input-light"
                  />
                </label>
                <button
                  type="button"
                  onClick={checkout}
                  className="btn-primary w-full !py-3.5 !text-[0.72rem] flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} />
                  Checkout via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="btn-secondary w-full !py-3 !text-[0.68rem]"
                >
                  Clear cart
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
