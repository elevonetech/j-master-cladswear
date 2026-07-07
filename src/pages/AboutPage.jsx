import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Award, Zap, Globe, Shield } from "lucide-react";

const stats = [
  { value: "24+",    label: "Curated styles" },
  { value: "8",      label: "Featured brands" },
  { value: "4.8/5",  label: "Customer rating" },
  { value: "1 tap",  label: "WhatsApp checkout" },
];

const values = [
  {
    icon: Award,
    title: "Premium curation",
    copy: "We hand-select every silhouette for quality, design, and versatility — so every pair earns its place.",
  },
  {
    icon: Zap,
    title: "Fast commerce",
    copy: "WhatsApp-first checkout means you order in seconds, not minutes. No forms, no friction.",
  },
  {
    icon: Globe,
    title: "Nationwide reach",
    copy: "We deliver premium packaging and tracked orders to every corner of Kenya.",
  },
  {
    icon: Shield,
    title: "Trusted quality",
    copy: "Our 4.8★ average rating reflects a commitment to authentic products and honest service.",
  },
];

export function AboutPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <div className="bg-white border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About"
            title="The Kithome story"
            description="A premium footwear destination built on minimal aesthetics, thoughtful curation, and fast commerce."
          />
        </div>
      </div>

      {/* ── Company story ── white section ── */}
      <section className="bg-[#faf9f7] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="bg-white border border-black/07 rounded-3xl p-8 md:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-3xl font-bold font-heading text-stone">Company story</h2>
              <p className="mt-5 text-sm leading-8 text-stone/60">
                Kithome Shoe Collection was created to make premium footwear feel
                more direct, more stylish, and more accessible. The visual language
                stays elegant and precise while the buying experience remains
                simple and mobile-friendly.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Mission", "Deliver a luxury-inspired footwear experience with high-quality curation and frictionless ordering."],
                  ["Vision",  "Become a trusted destination for premium monochrome footwear across every occasion."],
                ].map(([title, copy]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-[#faf9f7] border border-black/06 p-5"
                  >
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-champagne">{title}</p>
                    <p className="mt-3 text-[0.82rem] leading-7 text-stone/62">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-black/07 rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <h3 className="text-xl font-bold font-heading text-stone">Why choose Kithome</h3>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Premium visual identity with modern aesthetics",
                    "Clear size, color, and stock details",
                    "Responsive shopping across desktop and mobile",
                    "Fast WhatsApp-based ordering",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-[#faf9f7] border border-black/06 px-4 py-3 text-[0.8rem] text-stone/70"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-black/07 rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-stone/40">Customer satisfaction</p>
                <p className="mt-4 text-[0.82rem] leading-7 text-stone/60">
                  We prioritize clear product information, fast response time, and a
                  premium checkout experience so customers can order with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── dark band ── */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.55 }}
                className="rounded-3xl border border-white/08 bg-white/[0.04] p-8 text-center hover:bg-white/[0.07] transition-colors duration-300"
              >
                <p className="text-4xl font-bold text-white font-heading">{stat.value}</p>
                <p className="mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-white/38 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── white ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <SectionHeading
              center
              eyebrow="Our values"
              title="What drives every decision"
              description="Four pillars shape how we build Dapper Footwear — from curation to delivery."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {values.map(({ icon: Icon, title, copy }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className="group rounded-3xl border border-black/07 bg-[#faf9f7] p-7 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-champagne/10 border border-champagne/20">
                  <Icon size={18} className="text-champagne" />
                </div>
                <h3 className="text-lg font-bold font-heading text-stone">{title}</h3>
                <p className="mt-2.5 text-[0.78rem] leading-relaxed text-stone/55">{copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
