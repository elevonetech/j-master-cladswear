import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { SectionHeading } from "@/components/SectionHeading";
import { SEO } from "@/components/SEO";
import { ProductCard } from "@/components/ProductCard";
import { handleImgError } from "@/utils/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero.png";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export function HomePage() {
  const { products } = useProducts();
  const newArrivals = products
    .filter((p) => p.collection === "New Arrivals" || p.newArrival)
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      <SEO />
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Featured sneaker"
            onError={handleImgError}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </div>

        {/* Decorative oversized text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-[20vw] font-heading font-bold text-white whitespace-nowrap"
          >
            J. MASTER CLADSWEAR
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              ></motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-heading text-5xl md:text-7xl lg:text-[90px] font-bold text-white leading-[0.95] mb-6"
              >
                Step Up.
                <br />
                <span className="text-champagne">Stand Out.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-white/60 text-base md:text-lg max-w-md leading-relaxed mb-10"
              >
                Discover authentic, stylish footwear from Kenya's most trusted
                sellers. From iconic sneakers to refined formals, all at prices
                that respect your hustle.
              </motion.p>

              <motion.div {...fadeUp(0.8)} className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 bg-champagne text-[#0a0a0a] px-8 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.15em] hover:bg-champagne/90 transition-all"
                >
                  Shop Collection
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/shop?collection=new-arrivals"
                  className="inline-flex items-center gap-3 border border-champagne/30 text-champagne px-8 py-3.5 text-xs font-body font-semibold uppercase tracking-[0.15em] hover:bg-champagne/10 transition-all"
                >
                  New Drops
                </Link>
              </motion.div>
            </div>

            {/* Right floating shoe */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-champagne/5 rounded-full blur-3xl scale-150" />
                <img
                  src={heroBg}
                  alt="Featured sneaker"
                  onError={handleImgError}
                  className="relative w-[420px] h-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={20} className="text-champagne/40" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 relative overflow-hidden">
        {/* decorative circle */}
        <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/[0.03]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full border border-white/[0.025]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                dark
                eyebrow="The J. MASTER standard"
                title="Master every step in style"
                description="J. MASTER CLADSWEAR is built for those who move with confidence. Discover premium footwear designed to bring together refined craftsmanship, timeless design, and effortless everyday style."
              />
              <div className="grid gap-3 sm:grid-cols-2 mt-8">
                {[
                  "Curated premium shoes",
                  "Fast WhatsApp ordering",
                  "Streetwear to formal edits",
                ].map((text) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-white/07 bg-white/[0.04] px-4 py-3.5 transition hover:bg-white/[0.07]"
                  >
                    <span className="text-[0.78rem] text-white/70">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature brands */}
            <div>
              <div className="rounded-3xl border border-white/08 bg-white/[0.04] p-8">
                <p className="eyebrow-dark mb-5">Featured brands</p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Nike",
                    "Adidas",
                    "Puma",
                    "New Balance",
                    "Reebok",
                    "Asics",
                    "Clarks",
                    "Timberland",
                  ].map((brand) => (
                    <span
                      key={brand}
                      className="rounded-full border border-white/10 bg-white/05 px-4 py-1.5 text-[0.72rem] text-white/62 transition hover:border-champagne/30 hover:text-white/80"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEW ARRIVALS
      ══════════════════════════════════════ */}
      <section className="bg-[#faf9f7] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Fresh arrivals"
              title="New Arrivals"
              description="Newest additions with sleek silhouettes and elevated materials."
            />
            <Link
              to="/shop?collection=new-arrivals"
              className="btn-secondary flex-shrink-0 mb-10 !px-5 !py-3 !text-[0.68rem] group inline-flex items-center gap-2 whitespace-nowrap"
            >
              See all new
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
