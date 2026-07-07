import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";

const stats = [
  { value: "24+", label: "Curated styles" },
  { value: "8", label: "Featured brands" },
  { value: "4.8/5", label: "Customer rating" },
  { value: "1 tap", label: "WhatsApp checkout" },
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title="The Kithome story"
        description="A premium footwear destination built on minimal aesthetics, thoughtful curation, and fast commerce."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-[#f8f8f8] rounded-[2rem] p-7 md:p-10">
          <h2 className="text-3xl font-semibold text-[#111]">Company story</h2>
          <p className="mt-4 text-sm leading-8 text-[#666]">
            Kithome Shoe Collection was created to make premium footwear feel
            more direct, more stylish, and more accessible. The visual language
            stays dark, elegant, and precise while the buying experience remains
            simple and mobile friendly.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              [
                "Mission",
                "Deliver a luxury-inspired footwear experience with high-quality curation and frictionless ordering.",
              ],
              [
                "Vision",
                "Become a trusted destination for premium monochrome footwear across every occasion.",
              ],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-[1.5rem] bg-white/5 p-5 shadow-lg shadow-black/10"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/68">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass rounded-[2rem] p-7">
            <h3 className="text-2xl font-semibold text-white">
              Why choose Kithome
            </h3>
            <ul className="mt-5 grid gap-3 text-sm text-white/68">
              {[
                "Premium black and white visual identity",
                "Clear size, color, and stock details",
                "Responsive shopping across desktop and mobile",
                "Fast WhatsApp-based ordering",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-[1.25rem] bg-white/5 px-4 py-3 shadow-lg shadow-black/10"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-[2rem] p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Customer satisfaction
            </p>
            <p className="mt-4 text-sm leading-8 text-white/68">
              We prioritize clear product information, fast response time, and a
              premium checkout experience so customers can order with
              confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-[2rem] p-6 text-center"
          >
            <p className="text-4xl font-semibold text-white">{stat.value}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/45">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
