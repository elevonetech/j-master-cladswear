import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import products from "@/data/products";

const sections = [
  {
    title: "Sneakers",
    description: "Everyday icons and modern statement runners.",
  },
  { title: "Boots", description: "Luxury boots with structured silhouettes." },
  {
    title: "Formal Shoes",
    description: "Boardroom-ready oxfords and loafers.",
  },
  {
    title: "Casual Shoes",
    description: "Effortless pieces for daily rotation.",
  },
  {
    title: "Running Shoes",
    description: "Responsive pairs with a polished finish.",
  },
  { title: "Sandals", description: "Relaxed comfort with premium design." },
  { title: "New Arrivals", description: "The latest drops in the collection." },
  {
    title: "Limited Edition",
    description: "Rare, statement-making selections.",
  },
];

// TODO: replace with your actual partner brand logos
const PARTNER_BRANDS = [
  { name: "Nike", logo: "/images/brands/nike.png" },
  { name: "Adidas", logo: "/images/brands/adidas.png" },
  { name: "Clarks", logo: "/images/brands/clarks.png" },
  { name: "Timberland", logo: "/images/brands/timberland.png" },
  { name: "Skechers", logo: "/images/brands/skechers.png" },
];

export function CollectionsPage() {
  return (
    <div>
      {/* Collection cards grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sections.map((section, index) => {
              const count =
                section.title === "New Arrivals"
                  ? products.filter((p) => p.collection === "New Arrivals")
                      .length
                  : section.title === "Limited Edition"
                    ? products.filter((p) => p.badge === "Limited Edition")
                        .length
                    : products.filter((p) => p.category === section.title)
                        .length;

              const isDark = index % 2 === 1;

              return (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.06, duration: 0.55 }}
                  whileHover={{ y: -4 }}
                  className={`rounded-3xl p-7 flex flex-col transition-shadow duration-300 ${
                    isDark
                      ? "bg-[#0a0a0a] border border-white/07 hover:border-champagne/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                      : "bg-white border border-black/07 hover:border-champagne/30 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                  }`}
                >
                  <div className="mb-auto">
                    <span
                      className={`text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${
                        isDark ? "text-champagne/70" : "text-champagne/80"
                      }`}
                    >
                      {count} styles
                    </span>
                    <h2
                      className={`mt-3 text-2xl font-bold font-heading leading-snug ${
                        isDark ? "text-white" : "text-stone"
                      }`}
                    >
                      {section.title}
                    </h2>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isDark ? "text-white/55" : "text-stone/55"
                      }`}
                    >
                      {section.description}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className={`mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] group transition-colors duration-220 ${
                      isDark
                        ? "text-champagne hover:text-white"
                        : "text-stone hover:text-champagne"
                    }`}
                  >
                    Browse
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner brands marquee */}
      <section className="collections-ridge-bg relative border-y border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-champagne/80">
              Extended Lineup
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-wide text-white sm:text-3xl">
              Premium &amp; Lifestyle Partners
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {PARTNER_BRANDS.map((brand, index) => (
              <motion.div
                key={brand.name + index}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col items-center rounded-2xl border border-white/8 bg-black/35 p-4 backdrop-blur-md transition-all hover:border-champagne/30 hover:bg-black/50"
              >
                <div className="flex h-20 w-full items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-16 max-w-full object-contain opacity-90 transition-all group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/50 group-hover:text-champagne/80">
                  {brand.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/254712643440"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-transform hover:scale-105"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

export default CollectionsPage;
