import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Package,
  Sparkles,
} from "lucide-react";

const asset = (name) => `/assets/brands/${encodeURIComponent(name)}`;

const HERO_SHOES = [
  { src: asset("Jordan1.jpg"), label: "Air Jordan 1" },
  { src: asset("sports shoes.jpg"), label: "Performance Runners" },
  { src: asset("AirForceCustom.jpg"), label: "Custom Air Force" },
  { src: asset("Nike Air Force.jpg"), label: "Nike Air Force 1" },
];

const POPULAR_BRANDS = [
  { name: "Nike", logo: asset("63754150969161041.jpg"), slug: "nike" },
  { name: "Adidas", slug: "adidas", accent: "#111111", mark: "adidas" },
  { name: "Puma", slug: "puma", accent: "#c9a53e", mark: "puma" },
  {
    name: "Converse",
    logo: asset("The 20 biggest logos of 2017.jpg"),
    slug: "converse",
  },
  {
    name: "Reebok",
    logo: asset("reebok_logo_1986_png (1400×1190).jpg"),
    slug: "reebok",
  },
  {
    name: "Vans",
    logo: asset(
      "Vans _ Brands of the World™ _ Download vector logos and logotypes.jpg",
    ),
    slug: "vans",
  },
  {
    name: "New Balance",
    logo: asset("45458277483127734.jpg"),
    slug: "new-balance",
  },
  { name: "Asics", logo: asset("4081455907324186.jpg"), slug: "asics" },
  { name: "Clarks", slug: "clarks", accent: "#8b4513", mark: "clarks" },
  { name: "Bata", slug: "bata", accent: "#c41e3a", mark: "bata" },
];

const PARTNER_BRANDS = [
  { name: "Balenciaga", logo: asset("Balenciaga logo vector (_EPS + .SVG + .jpg") },
  { name: "Balenciaga Edition", logo: asset("1077415910831639216.jpg") },
  { name: "Gucci", logo: asset("842525042783265262.jpg") },
  { name: "FILA", logo: asset("710654016185847945.jpg") },
  { name: "Tommy Hilfiger", logo: asset("Tommy Hilfiger.jpg") },
  { name: "Patagonia", logo: asset("Behind Patagonia_ Clothes, for the Outdoors.jpg") },
  { name: "Umbro", logo: asset("14 Best Sportswear Company Logos and Brands.jpg") },
  { name: "Zara", logo: asset("Letters overlap one another in the new logo for….jpg") },
  { name: "Reebok Delta", logo: asset("White Board paint, Dry Erase Paint, Whiteboard Paint _ IdeaPaint.jpg") },
  { name: "New Balance", logo: asset("941182022140420099.jpg") },
  { name: "Playboy", logo: asset("764063893067536285.jpg") },
];

function BrandMark({ mark, name }) {
  if (mark === "adidas") {
    return (
      <div className="flex flex-col items-center gap-1" aria-hidden="true">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-8 w-3 -skew-x-12 bg-[#111]"
              style={{ transform: `skewX(-12deg) translateY(${i * 2}px)` }}
            />
          ))}
        </div>
        <span className="text-[0.55rem] font-bold tracking-[0.35em] text-[#111]/70">
          ADIDAS
        </span>
      </div>
    );
  }

  if (mark === "puma") {
    return (
      <div className="text-center" aria-hidden="true">
        <div className="mx-auto mb-1 h-10 w-10 rounded-full border-[3px] border-[#111] border-b-transparent border-l-transparent rotate-45" />
        <span className="text-xl font-black italic tracking-tight text-[#111]">
          PUMA
        </span>
      </div>
    );
  }

  if (mark === "clarks") {
    return (
      <div className="text-center" aria-hidden="true">
        <p className="text-2xl font-serif font-bold tracking-[0.2em] text-[#5c3d2e]">
          CLARKS
        </p>
        <p className="mt-1 text-[0.5rem] uppercase tracking-[0.4em] text-[#8b6914]">
          Originals
        </p>
      </div>
    );
  }

  if (mark === "bata") {
    return (
      <div className="text-center" aria-hidden="true">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#c41e3a] text-lg font-black text-white">
          B
        </div>
        <span className="text-xl font-bold tracking-[0.25em] text-[#c41e3a]">
          BATA
        </span>
      </div>
    );
  }

  return (
    <span className="text-lg font-bold tracking-wide text-[#111]">{name}</span>
  );
}

function HeroShoeCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SHOES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const current = HERO_SHOES[index];

  return (
    <div className="relative mx-auto flex w-full max-w-lg items-end justify-center">
      <div
        className="absolute bottom-8 left-1/2 h-28 w-[72%] -translate-x-1/2 rounded-[100%] bg-champagne/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 h-4 w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full pb-6">
        <div className="relative aspect-square w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.88, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src={current.src}
                alt={current.label}
                className="max-h-[min(420px,58vw)] w-auto object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,0.55)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {HERO_SHOES.map((shoe, i) => (
            <button
              key={shoe.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${shoe.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-champagne"
                  : "w-1.5 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>

        <motion.p
          key={current.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-champagne/80"
        >
          {current.label}
        </motion.p>
      </div>
    </div>
  );
}

function BrandCard({ brand, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl bg-[#f3f3f3] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-champagne/0 via-champagne/0 to-champagne/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-28 items-center justify-center">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <BrandMark mark={brand.mark} name={brand.name} />
        )}
      </div>

      <h3 className="relative mt-4 text-center text-sm font-semibold tracking-wide text-[#111]">
        {brand.name}
      </h3>

      <Link
        to={`/shop?brand=${encodeURIComponent(brand.name)}`}
        className="relative mt-4 flex items-center justify-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-champagne transition-colors group-hover:text-[#a8882e]"
      >
        Shop Now
        <ArrowRight
          size={12}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </motion.article>
  );
}

export function CollectionsPage() {
  return (
    <div className="collections-page relative -mt-[72px] overflow-hidden bg-[#050505] text-white">
      <style>{`
        .collections-page {
          --gold: #c9a53e;
          --gold-glow: rgba(201, 165, 62, 0.35);
        }
        .collections-ajale-bg {
          background-image:
            linear-gradient(180deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.78) 45%, rgba(5,5,5,0.94) 100%),
            url("${asset("ajale-hills-3355438_1920.jpg")}");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        .collections-ridge-bg {
          background-image:
            linear-gradient(135deg, rgba(5,5,5,0.88), rgba(5,5,5,0.72)),
            url("${asset("mailanmaik-wadi-rum-2494519_1920.jpg")}");
          background-size: cover;
          background-position: center;
        }
        @keyframes collections-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .collections-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(201,165,62,0.08) 50%, transparent 60%);
          animation: collections-shimmer 4s ease-in-out infinite;
        }
      `}</style>

      {/* Utility strip */}
      <div className="relative z-20 border-b border-white/5 bg-black/60 pt-[72px] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/55 sm:px-8 lg:px-10">
          <span className="flex items-center gap-2">
            <Package size={11} className="text-champagne" />
            Delivering Nationwide in Kenya
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <BadgeCheck size={11} className="text-champagne" />
            100% Genuine Products | Easy Returns
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={11} className="text-champagne" />
            Free delivery on orders over KSh 5,000
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="collections-ajale-bg collections-shimmer relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-champagne/10 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-champagne/5 blur-[80px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.48em] text-champagne/70">
              Discover our collection
            </p>
            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl">
              <span className="block text-white">TOP BRANDS.</span>
              <span className="mt-1 block bg-gradient-to-r from-champagne via-[#e8d5a3] to-champagne bg-clip-text text-transparent">
                PREMIUM QUALITY.
              </span>
            </h1>
            <p className="max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              We partner with the world&apos;s best brands to bring you authentic
              style and comfort, from street icons to timeless classics.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-[#dfc06a] hover:shadow-[0_8px_32px_var(--gold-glow)]"
              >
                Shop All Brands
                <ArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/254712643440?text=Hello%20J.%20MASTER%20CLADSWEAR%2C%20I%27d%20like%20to%20request%20a%20brand."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all hover:border-champagne/40 hover:text-champagne"
              >
                Request a Brand
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <HeroShoeCarousel />
          </motion.div>
        </div>
      </section>

      {/* Popular brands */}
      <section className="relative bg-white py-20 text-[#111]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.45em] text-champagne">
              Shop by Brand
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-wide sm:text-4xl">
              POPULAR BRANDS
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#666]">
              From everyday sneakers to luxury streetwear, explore the labels
              our customers love most.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {POPULAR_BRANDS.map((brand, index) => (
              <BrandCard key={brand.name} brand={brand} index={index} />
            ))}
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
