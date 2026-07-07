import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-8 max-w-3xl font-body"
    >
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-champagne/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-medium tracking-wide text-white font-heading md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-xs leading-relaxed text-bone/60 md:text-sm">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
