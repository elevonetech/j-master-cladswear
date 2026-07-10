import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { handleImgError } from "@/utils/image";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products
    .filter((p) => p.collection === "New Arrivals")
    .slice(0, 4);

  const hero = featured[0];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 rounded-[2.5rem] bg-[#f8f8f8] overflow-hidden">
          {/* Left column - Content */}
          <div className="space-y-8 p-8 md:p-12 lg:p-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-champagne font-body">
              Luxury footwear, curated for Dapper
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl text-4xl font-medium tracking-wide text-[#111] font-heading md:text-6xl lg:text-7xl leading-[1.08]"
            >
              Step into
              <br />
              <em className="not-italic" style={{ color: "hsl(43,68%,58%)" }}>
                pure luxury.
              </em>
            </motion.h1>
            <p className="max-w-md text-xs leading-relaxed text-[#666] font-body md:text-sm">
              Discover refined sneakers, formal icons, rugged boots, and
              effortless casual pairs, designed to feel polished from first
              glance to final checkout.
            </p>

            <motion.div
              {...fadeUp(0.42)}
              className="flex flex-wrap gap-3 justify-start"
            >
              <Link
                to="/shop"
                className="btn-primary px-6 py-3 text-xs font-semibold"
              >
                Shop the Collection
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/collections"
                className="btn-secondary px-6 py-3 text-xs font-semibold"
              >
                Explore Collections
              </Link>
            </motion.div>
          </div>

          {/* Right column - Hero Image */}
          <div className="relative hidden lg:flex items-center justify-center h-full min-h-[28rem]">
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src={hero.images[0]}
              alt={hero.name}
              onError={handleImgError}
              className="w-full h-full object-cover rounded-tl-[2.5rem] rounded-bl-[2.5rem]"
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-8 left-8 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-lg"
            >
              <p className="text-[9px] uppercase tracking-[0.35em] text-champagne font-semibold">
                Featured
              </p>
              <p className="mt-1 text-sm font-semibold text-[#111] font-heading">
                {hero.name}
              </p>
            </motion.div>
          </div>
        </div>
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
                eyebrow="Brand story"
                title="Built for the modern luxury wardrobe"
                description="Dapper Footwear brings premium footwear with a minimal black-and-white identity and a checkout experience designed around convenience."
              />
              <div className="grid gap-3 sm:grid-cols-2 mt-8">
                {[
                  "Curated premium shoes",
                  "Fast WhatsApp ordering",
                  "Streetwear to formal edits",
                  "Responsive across all devices",
                ].map((text) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-white/07 bg-white/[0.04] px-4 py-3.5 transition hover:bg-white/[0.07]"
                  >
                    <span className="text-[0.78rem] text-white/70">{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="btn-ghost-dark !py-3 !px-7 !text-[0.68rem]"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* Feature brands + testimonials */}
            <div className="space-y-6">
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

              <div className="rounded-3xl border border-white/08 bg-white/[0.04] p-8">
                <p className="eyebrow-dark mb-5">Testimonials</p>
                <div className="space-y-3">
                  {[
                    {
                      quote:
                        "Ordered on WhatsApp Friday, shoes were at my door Monday. The quality is exactly what I was looking for.",
                      author: "Brian K., Nairobi",
                    },
                    {
                      quote:
                        "Finally a shoe shop that actually responds fast. The sneakers were boxed well and look even better in person.",
                      author: "Mercy W., Mombasa",
                    },
                  ].map(({ quote, author }) => (
                    <div
                      key={quote}
                      className="rounded-2xl border border-white/06 bg-white/[0.03] p-5"
                    >
                      <p className="text-[0.8rem] leading-relaxed text-white/60 italic">
                        "{quote}"
                      </p>
                      <p className="mt-2.5 text-[0.62rem] uppercase tracking-[0.25em] text-champagne/60 font-semibold">
                        {author}
                      </p>
                    </div>
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
              className="btn-secondary flex-shrink-0 mb-10 !py-2.5 !text-[0.68rem] group"
            >
              See all new{" "}
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
