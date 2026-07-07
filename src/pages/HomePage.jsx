import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { handleImgError } from "@/utils/image";
import { ArrowRight, ChevronDown, Zap, Globe, Award } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products
    .filter((p) => p.collection === "New Arrivals")
    .slice(0, 4);
  const bestSellers = products
    .filter((p) => p.badge === "Best Seller")
    .slice(0, 4);
  const trending = products
    .filter((p) => p.collection === "Trending")
    .slice(0, 4);

  const hero = featured[0];

  return (
    <div>
      {/* ══════════════════════════════════════
          HERO  — cinematic full-bleed, black
      ══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#080808" }}
        aria-label="Hero section"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <motion.img
            src={hero.images[0]}
            alt={hero.name}
            onError={handleImgError}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            className="h-full w-full object-cover object-center opacity-30"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          {/* Subtle texture grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl px-5 sm:px-8 lg:px-10 py-32 w-full">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-3xl text-left"
          >
            <motion.h1
              {...fadeUp(0.2)}
              className="display-heading text-left text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.04] mb-8"
            >
              Step into
              <br />
              <em className="not-italic" style={{ color: "hsl(43,68%,58%)" }}>
                pure luxury.
              </em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.32)}
              className="max-w-lg text-sm leading-relaxed text-white/55 mb-10 text-left"
            >
              Discover refined sneakers, formal icons, rugged boots, and
              effortless casual pairs — designed to feel polished from first
              glance to final checkout.
            </motion.p>

            <motion.div
              {...fadeUp(0.42)}
              className="flex flex-wrap gap-3 justify-start"
            >
              <Link
                to="/shop"
                className="btn-primary !px-8 !py-4 !text-[0.72rem] group"
              >
                Shop the Collection
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/collections"
                className="btn-ghost-dark !px-8 !py-4 !text-[0.72rem]"
              >
                Explore Collections
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              {...fadeUp(0.54)}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-4 justify-start"
            >
              {[
                { value: "1 tap", label: "WhatsApp checkout" },
                { value: "24 styles", label: "Premium curation" },
                { value: "Nationwide", label: "Trusted delivery" },
              ].map((s) => (
                <div key={s.label} className="text-left">
                  <p className="text-2xl font-bold text-white font-heading">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.3em] text-white/38 font-semibold">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-white/35" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED — white, spacious
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Featured selection"
              title="Hand-picked luxury silhouettes"
              description="Each pair balances a premium presence with everyday wearability."
            />
            <Link
              to="/shop"
              className="btn-secondary flex-shrink-0 mb-10 !py-2.5 !text-[0.68rem] group"
            >
              View all
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((product, i) => (
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

      {/* ══════════════════════════════════════
          BRAND STORY — obsidian band
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 lg:py-36 relative overflow-hidden">
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
                  { icon: Award, text: "Curated premium shoes" },
                  { icon: Zap, text: "Fast WhatsApp ordering" },
                  { icon: Globe, text: "Streetwear to formal edits" },
                  { icon: Award, text: "Responsive across all devices" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 rounded-2xl border border-white/07 bg-white/[0.04] px-4 py-3.5 transition hover:bg-white/[0.07]"
                  >
                    <Icon size={14} className="text-champagne flex-shrink-0" />
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
                        "The collection feels premium and the WhatsApp checkout is incredibly efficient.",
                      author: "Nairobi customer",
                    },
                    {
                      quote:
                        "The black and white styling gives the whole brand a luxury retail feel.",
                      author: "Verified buyer",
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
                        — {author}
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
          NEW ARRIVALS — ivory
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

      {/* ══════════════════════════════════════
          BEST SELLERS — charcoal/dark
      ══════════════════════════════════════ */}
      <section className="bg-[#111111] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              dark
              eyebrow="Best sellers"
              title="Best Sellers"
              description="The silhouettes customers keep coming back for, season after season."
            />
            <Link
              to="/shop"
              className="btn-ghost-dark flex-shrink-0 mb-10 !py-2.5 !text-[0.68rem] group"
            >
              Shop all{" "}
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          {/* Dark-tinted product cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((product, i) => (
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

      {/* ══════════════════════════════════════
          TRENDING — white
      ══════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Trending now"
              title="Trending Products"
              description="Sharp lines, high contrast, and understated confidence."
            />
            <Link
              to="/shop?sort=trending"
              className="btn-secondary flex-shrink-0 mb-10 !py-2.5 !text-[0.68rem] group"
            >
              View trending{" "}
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trending.map((product, i) => (
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

      {/* ══════════════════════════════════════
          NEWSLETTER — obsidian with gold accent
      ══════════════════════════════════════ */}
      <section className="bg-[#080808] py-24 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <div className="h-[700px] w-[700px] rounded-full border-[1.5px] border-champagne" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <SectionHeading
                dark
                eyebrow="Newsletter"
                title="Get updates on new drops"
                description="Subscribe for curated arrivals, limited editions, and exclusive style releases."
              />
              <form className="flex flex-col gap-3 sm:flex-row mt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input-dark flex-1 !rounded-full"
                />
                <button
                  type="button"
                  className="btn-primary !py-3 !px-7 !text-[0.7rem] flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { value: "24", label: "Style options" },
                { value: "4.8/5", label: "Average rating" },
                { value: "Same day", label: "WhatsApp response" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card-dark">
                  <p className="text-2xl font-bold text-white font-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.28em] text-white/38 font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
