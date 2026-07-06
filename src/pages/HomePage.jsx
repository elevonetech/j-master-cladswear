import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "@/data/products";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { handleImgError } from "@/utils/image";

export function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const newArrivals = products
    .filter((product) => product.collection === "New Arrivals")
    .slice(0, 4);
  const bestSellers = products
    .filter((product) => product.badge === "Best Seller")
    .slice(0, 4);
  const trending = products
    .filter((product) => product.collection === "Trending")
    .slice(0, 4);

  return (
    <div className="space-y-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.45em] text-white/50">
              Luxury footwear, curated for Kithome
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-7xl"
            >
              Minimal black and white shoe culture with a premium edge.
            </motion.h1>
            <p className="max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Discover refined sneakers, formal icons, rugged boots, and
              effortless casual pairs designed to feel polished from first
              glance to final checkout.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="btn-secondary inline-flex items-center px-6 py-3 shadow-lg shadow-black/20"
              >
                Shop the collection
              </Link>
              <Link
                to="/collections"
                className="btn-primary inline-flex items-center px-6 py-3 shadow-lg shadow-black/20"
              >
                Explore collections
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Fast WhatsApp checkout", value: "1 tap" },
                { label: "Premium curation", value: "24 styles" },
                { label: "Trusted delivery", value: "Nationwide" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-[1.5rem] p-4">
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[30rem] overflow-hidden rounded-[2.25rem] bg-black/40 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.32)]">
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={featured[0].images[0]}
              alt={featured[0].name}
              onError={handleImgError}
              className="min-h-[30rem] w-full rounded-[2rem] object-cover"
            />
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] bg-black/55 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                    Featured drop
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {featured[0].name}
                  </h2>
                </div>
                <div className="rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/70 shadow-inner shadow-white/5">
                  {featured[0].badge}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-white/65">
                <span>Premium finish</span>
                <span>WhatsApp order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured selection"
          title="Hand-picked luxury silhouettes"
          description="Each pair balances a premium presence with everyday wearability and responsive performance."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fresh arrivals"
          title="New Arrivals"
          description="Newest additions with sleek silhouettes and elevated materials."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Best sellers"
          title="Best Sellers"
          description="The silhouettes customers keep coming back for, season after season."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Trending now"
          title="Trending Products"
          description="Sharp lines, high contrast, and understated confidence."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="glass rounded-[2rem] p-8">
          <SectionHeading
            eyebrow="Brand story"
            title="Built for the modern luxury wardrobe"
            description="Kithome Shoe Collection brings premium footwear with a minimal black-and-white identity and a checkout experience designed around convenience."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Curated premium shoes",
              "Fast WhatsApp ordering",
              "Streetwear to formal edits",
              "Responsive across all devices",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] bg-white/5 p-4 text-sm text-white/68 shadow-lg shadow-black/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="glass rounded-[2rem] p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Featured brands
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
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
                  className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/75 shadow-inner shadow-white/5"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Testimonials
            </p>
            <div className="mt-4 space-y-5 text-sm text-white/68">
              {[
                "The collection feels premium and the WhatsApp checkout is incredibly efficient.",
                "The black and white styling gives the whole brand a luxury retail feel.",
              ].map((quote) => (
                <p
                  key={quote}
                  className="rounded-[1.25rem] bg-white/5 p-4 leading-7 shadow-lg shadow-black/10"
                >
                  {quote}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Newsletter"
                title="Get updates on new drops"
                description="Subscribe for curated arrivals, limited editions, and exclusive style releases."
              />
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-full bg-black/30 px-5 py-4 text-sm text-white outline-none placeholder:text-white/35 shadow-inner shadow-white/5"
                />
                <button
                  type="button"
                  className="btn-secondary px-6 py-4 shadow-lg shadow-black/20"
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
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] bg-white/5 p-5 text-center shadow-lg shadow-black/10"
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
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
