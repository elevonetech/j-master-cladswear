import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
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

export function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Collections"
        title="Curated shoe families"
        description="Navigate the collection by style, occasion, and release type."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section, index) => {
          const count =
            section.title === "New Arrivals"
              ? products.filter(
                  (product) => product.collection === "New Arrivals",
                ).length
              : section.title === "Limited Edition"
                ? products.filter(
                    (product) => product.badge === "Limited Edition",
                  ).length
                : products.filter(
                    (product) => product.category === section.title,
                  ).length;

          return (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="glass rounded-[2rem] p-6"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                {count} styles
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/62">
                {section.description}
              </p>
              <Link
                to="/shop"
                className="btn-secondary mt-6 px-5 py-3 text-sm"
              >
                Browse
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
