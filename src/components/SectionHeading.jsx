import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, description, dark = false, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`mb-4 ${dark ? "eyebrow-dark" : "eyebrow-light"}`}>
          {eyebrow}
        </p>
      )}
      {/* Accent line */}
      <span className={dark ? "accent-line-long" : "accent-line"} />
      <h2
        className={`text-3xl font-bold leading-[1.1] tracking-tight font-heading md:text-[2.6rem] ${
          dark ? "text-white" : "text-stone"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-relaxed ${
            dark ? "text-white/58" : "text-stone/55"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
