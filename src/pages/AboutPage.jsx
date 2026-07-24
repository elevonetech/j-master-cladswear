import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const footwearCategories = [
  { name: "Sneakers", desc: "Iconic streetwear and athletic styles built for all-day comfort." },
  { name: "Formal Shoes", desc: "Refined Oxford, Derby, and Loafer designs for polished occasions." },
  { name: "Boots", desc: "Rugged yet sophisticated boots crafted for durability and presence." },
  { name: "Loafers", desc: "Effortless slip-on elegance for smart-casual and professional settings." },
  { name: "Running Shoes", desc: "Performance-driven designs engineered for speed and support." },
  { name: "Sandals", desc: "Reliable, stylish options for warm-weather comfort and leisure." },
  { name: "Everyday Casual", desc: "Versatile everyday footwear that balances style with ease." },
];

const reasons = [
  {
    title: "Premium Quality",
    text: "Every pair is crafted from carefully sourced materials that meet exacting standards of excellence.",
  },
  {
    title: "Curated Collections",
    text: "We handpick each style so our collections reflect the latest trends and timeless classics alike.",
  },
  {
    title: "Comfort & Durability",
    text: "Designed for real life, our shoes deliver lasting comfort from morning to night.",
  },
  {
    title: "Affordable Luxury",
    text: "Premium footwear shouldn't cost a fortune. We make high-end style accessible.",
  },
  {
    title: "100% Authentic",
    text: "We guarantee every product is genuine. No compromises, no imitations.",
  },
  {
    title: "Excellent Service",
    text: "From browsing to unboxing, our team ensures every step of your experience is seamless.",
  },
  {
    title: "Every Occasion",
    text: "Whether casual, formal, or athletic, we have the right pair for every moment.",
  },
];

export function AboutPage() {
  return (
    <div>
      {/* ══════════════════════════════════════
          DARK HERO HEADER
      ══════════════════════════════════════ */}
      <section className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/[0.03]" />
          <div className="absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full border border-white/[0.025]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 text-center">
          <motion.p
            {...fadeUp(0)}
            className="eyebrow-dark mb-5"
          >
            About Us
          </motion.p>
          <span className="accent-line-long mx-auto" />
          <motion.h1
            {...fadeUp(0.15)}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mt-4"
          >
            The story behind
            <br />
            <span className="text-champagne">every confident step.</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            J. MASTER CLADSWEAR was born from a simple belief: that everyone
            deserves to walk with confidence, style, and uncompromising quality
            in every pair of shoes they wear.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Built on passion. Driven by craft."
                description="J. MASTER CLADSWEAR is more than a footwear brand; it is a commitment to quality, elegance, and the art of dressing well from the ground up."
              />
              <motion.div {...fadeUp(0.15)} className="mt-8 space-y-5 text-sm leading-[1.9] text-[#666]">
                <p>
                  Founded in Kenya with a vision to redefine the footwear
                  landscape, J. MASTER CLADSWEAR brings together carefully
                  sourced materials, meticulous craftsmanship, and designs that
                  speak to both modern trends and enduring style. We believe that
                  the right pair of shoes can transform how you carry yourself,
                  whether in the boardroom, on the street, or anywhere life takes you.
                </p>
                <p>
                  Every collection we curate reflects our dedication to quality.
                  From premium leather finishes to innovative comfort technology,
                  each detail is considered. We work with some of the most
                  respected names in footwear, including Nike, Adidas, Puma,
                  Timberland, and Clarks, to ensure our customers always have
                  access to authentic, world-class products.
                </p>
                <p>
                  Our philosophy is simple: footwear should never be a
                  compromise. It should be a statement. That is why we put
                  comfort, durability, and design at the centre of everything we
                  do, so you can step out with absolute confidence, every
                  single day.
                </p>
              </motion.div>
            </div>

            <div className="space-y-5">
              {/* Mission & Vision */}
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  [
                    "Our Mission",
                    "To provide high-quality, stylish footwear that empowers our customers to express confidence and individuality through every step they take.",
                  ],
                  [
                    "Our Vision",
                    "To become one of Kenya's leading footwear brands, known for premium craftsmanship, curated collections, and an unwavering commitment to customer satisfaction.",
                  ],
                ].map(([title, copy]) => (
                  <motion.div
                    key={title}
                    {...fadeUp(0.1)}
                    className="rounded-[1.5rem] bg-white p-6 shadow-sm"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#666]">
                      {copy}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Values */}
              <motion.div {...fadeUp(0.2)} className="bg-[#f0ede8] rounded-[2rem] p-7 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                  What We Stand For
                </p>
                <div className="mt-5 grid gap-3">
                  {[
                    ["Quality", "Every pair is held to the highest standard before it reaches you."],
                    ["Authenticity", "We deal exclusively in genuine products from trusted brands."],
                    ["Style", "From timeless classics to bold new trends, we curate for every taste."],
                    ["Trust", "We build lasting relationships through honesty and consistency."],
                  ].map(([label, desc]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] bg-white px-5 py-3.5 shadow-sm"
                    >
                      <span className="text-[0.78rem] font-semibold text-[#111]">
                        {label}
                      </span>
                      <span className="text-[0.78rem] text-[#666] ml-2">
                        {desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT WE OFFER: FOOTWEAR CATEGORIES
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full border border-white/[0.03]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            dark
            eyebrow="Our Collection"
            title="Footwear for every moment"
            description="From the boardroom to the boulevard, J. MASTER CLADSWEAR offers a complete range of premium footwear designed to match every occasion, mood, and style."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {footwearCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                {...fadeUp(i * 0.06)}
                className="rounded-[1.5rem] border border-white/08 bg-white/[0.04] p-6 transition hover:bg-white/[0.07] hover:border-champagne/20"
              >
                <h3 className="text-lg font-heading font-semibold text-white">
                  {cat.name}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-white/50">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE J. MASTER CLADSWEAR
      ══════════════════════════════════════ */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Why Us"
            title="Why choose J. MASTER CLADSWEAR"
            description="We don't just sell shoes; we deliver confidence, quality, and a brand experience you can trust."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                {...fadeUp(i * 0.06)}
                className="bg-white rounded-[1.5rem] p-6 shadow-sm group hover:shadow-md transition"
              >
                <h3 className="text-lg font-heading font-semibold text-[#111]">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-[#666]">
                  {reason.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CUSTOMER SATISFACTION & TRUST
      ══════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full border border-white/[0.03]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                dark
                eyebrow="Our Promise"
                title="Your satisfaction is our standard"
                description="At J. MASTER CLADSWEAR, customer happiness is not an afterthought; it is the foundation of everything we build."
              />
              <motion.div {...fadeUp(0.15)} className="mt-6 space-y-4 text-sm leading-[1.9] text-white/50">
                <p>
                  Every pair of shoes that leaves our collection goes through
                  rigorous quality checks. We stand behind the authenticity and
                  craftsmanship of every product because your trust is the most
                  valuable thing we earn.
                </p>
                <p>
                  Our commitment doesn't end at the point of sale. We believe in
                  building long-term relationships with every customer, offering
                  responsive support, honest guidance on sizing and fit, and a
                  seamless experience from the moment you browse to the moment
                  you lace up.
                </p>
                <p>
                  Whether you're stepping into your first pair or your
                  fifteenth, we want every interaction to reinforce why thousands
                  of customers across Kenya choose J. MASTER CLADSWEAR as their
                  trusted footwear partner.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-4">
              {[
                [
                  "Quality Assurance",
                  "Every product undergoes careful inspection to ensure it meets our strict standards for materials, construction, and finish.",
                ],
                [
                  "Authenticity Guarantee",
                  "We source exclusively from authorized channels. When you buy from J. MASTER CLADSWEAR, you buy with absolute confidence.",
                ],
                [
                  "Long-Term Trust",
                  "We measure success not by single transactions, but by the lasting relationships we build with every customer who walks with us.",
                ],
              ].map(([title, text], i) => (
                <motion.div
                  key={title}
                  {...fadeUp(0.1 + i * 0.08)}
                  className="rounded-[1.5rem] border border-white/08 bg-white/[0.04] p-6"
                >
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-white/50">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONFIDENCE CLOSING
      ══════════════════════════════════════ */}
      <section className="bg-[#faf9f7] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10 text-center">
          <motion.p {...fadeUp(0)} className="eyebrow-light mb-5">
            Step Up. Stand Out.
          </motion.p>
          <span className="accent-line mx-auto" />
          <motion.h2
            {...fadeUp(0.1)}
            className="font-heading text-3xl md:text-5xl font-bold text-[#111] leading-[1.1] mt-4"
          >
            Walk with confidence.
            <br />
            <span className="text-champagne">Dress with purpose.</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 text-sm md:text-base leading-relaxed text-[#666] max-w-2xl mx-auto"
          >
            At J. MASTER CLADSWEAR, we combine modern trends with timeless
            designs to help you step out looking and feeling your best. Whether
            you're heading to the office, the gym, or a night out, the right
            pair of shoes makes all the difference. Discover a brand that
            understands the power of great footwear, and let every step speak
            for who you are.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="btn-primary !px-8 !py-3.5 !text-[0.68rem]"
            >
              Explore Our Collection
            </Link>
            <Link
              to="/contact"
              className="btn-secondary !px-8 !py-3.5 !text-[0.68rem]"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
