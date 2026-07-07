import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import products from "@/data/products";
import { ArrowRight } from "lucide-react";

const sections = [
  { title: "Sneakers",       description: "Everyday icons and modern statement runners." },
  { title: "Boots",          description: "Luxury boots with structured silhouettes." },
  { title: "Formal Shoes",   description: "Boardroom-ready oxfords and loafers." },
  { title: "Casual Shoes",   description: "Effortless pieces for daily rotation." },
  { title: "Running Shoes",  description: "Responsive pairs with a polished finish." },
  { title: "Sandals",        description: "Relaxed comfort with premium design." },
  { title: "New Arrivals",   description: "The latest drops in the collection." },
  { title: "Limited Edition",description: "Rare, statement-making selections." },
];

const bandsOrder = ["white", "black", "white", "black", "white", "black", "white", "black"];

export function CollectionsPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-[#faf9f7] border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Collections"
            title="Curated shoe families"
            description="Navigate the collection by style, occasion, and release type."
          />
        </div>
      </div>

      {/* Collection cards grid */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sections.map((section, index) => {
              const count =
                section.title === "New Arrivals"
                  ? products.filter((p) => p.collection === "New Arrivals").length
                  : section.title === "Limited Edition"
                    ? products.filter((p) => p.badge === "Limited Edition").length
                    : products.filter((p) => p.category === section.title).length;

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
                    <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${isDark ? "text-champagne/70" : "text-champagne/80"}`}>
                      {count} styles
                    </span>
                    <h2 className={`mt-3 text-2xl font-bold font-heading leading-snug ${isDark ? "text-white" : "text-stone"}`}>
                      {section.title}
                    </h2>
                    <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-white/55" : "text-stone/55"}`}>
                      {section.description}
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    className={`mt-8 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] group transition-colors duration-220 ${
                      isDark ? "text-champagne hover:text-white" : "text-stone hover:text-champagne"
                    }`}
                  >
                    Browse
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
