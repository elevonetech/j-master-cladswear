import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { formatKes } from "@/utils/money";
import { SlidersHorizontal } from "lucide-react";

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") ?? "All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceLimit, setPriceLimit]     = useState(5000);
  const [sort, setSort]                 = useState("featured");
  const [filtersOpen, setFiltersOpen]   = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const sizes       = ["All", ...new Set(products.flatMap((p) => p.sizes))];
  const brands      = ["All", ...new Set(products.map((p) => p.brand))];
  const colors      = ["All", ...new Set(products.flatMap((p) => p.colors))];

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const next = products.filter((p) => {
      const matchesSearch = !q || [p.name, p.brand, p.category, p.description].some((v) => v.toLowerCase().includes(q));
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSize  = selectedSize  === "All" || p.sizes.includes(selectedSize);
      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchesColor = selectedColor === "All" || p.colors.includes(selectedColor);
      const matchesPrice = p.price <= priceLimit;
      return matchesSearch && matchesCategory && matchesSize && matchesBrand && matchesColor && matchesPrice;
    });
    return next.sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured) || b.stock - a.stock;
    });
  }, [search, selectedCategory, selectedSize, selectedBrand, selectedColor, priceLimit, sort]);

  const filterLabel = (k, v) => (
    <label key={k} className="grid gap-2.5">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone/50">{k}</span>
      {v}
    </label>
  );

  const selectField = (value, onChange, options, key = (o) => o) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full bg-black/[0.04] border border-black/10 px-4 py-2.5 text-[0.75rem] text-stone outline-none cursor-pointer transition hover:border-champagne/40"
    >
      {options.map((o) => <option key={key(o)} value={o}>{o}</option>)}
    </select>
  );

  return (
    <div style={{ backgroundColor: "#faf9f7" }}>
      {/* ── Page header ── */}
      <div className="bg-white border-b border-black/06 py-16 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Shop"
            title="Premium shoe collection"
            description="Search, filter, sort, and preview the full catalog with a polished luxury retail feel."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 pb-28">
        {/* ── Mobile filter toggle ── */}
        <div className="flex items-center justify-between mb-6 xl:hidden">
          <p className="text-sm text-stone/60">
            <span className="font-semibold text-stone">{filteredProducts.length}</span> products
          </p>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-black/12 bg-white px-4 py-2.5 text-[0.72rem] font-semibold uppercase tracking-widest text-stone shadow-sm hover:bg-stone hover:text-white transition-all duration-250"
          >
            <SlidersHorizontal size={13} />
            Filters
          </button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          {/* ── Sidebar filters ── */}
          <aside
            className={`${filtersOpen ? "block" : "hidden"} xl:block bg-white border border-black/07 h-fit rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] xl:sticky xl:top-24`}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-stone/60">Filters</p>
              <span className="badge-light">
                {filteredProducts.length} results
              </span>
            </div>

            <div className="space-y-5">
              {filterLabel("Search",
                <div className="flex items-center rounded-full bg-black/[0.04] border border-black/10 px-4 py-2.5 focus-within:border-champagne/50 transition">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search shoes…"
                    className="w-full bg-transparent text-[0.75rem] text-stone outline-none placeholder:text-stone/35"
                  />
                </div>
              )}
              {filterLabel("Category", selectField(selectedCategory, setSelectedCategory, categories))}
              {filterLabel("Size",     selectField(selectedSize,     setSelectedSize,     sizes))}
              {filterLabel("Brand",    selectField(selectedBrand,    setSelectedBrand,    brands))}
              {filterLabel("Color",    selectField(selectedColor,    setSelectedColor,    colors))}

              {filterLabel("Price cap",
                <div className="space-y-2">
                  <input
                    type="range" min={1200} max={5000} step={100}
                    value={priceLimit}
                    onChange={(e) => setPriceLimit(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-[0.72rem] text-stone/60">Up to {formatKes(priceLimit)}</p>
                </div>
              )}

              {filterLabel("Sort by",
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full bg-black/[0.04] border border-black/10 px-4 py-2.5 text-[0.75rem] text-stone outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Top rated</option>
                  <option value="price-asc">Price low → high</option>
                  <option value="price-desc">Price high → low</option>
                </select>
              )}
            </div>
          </aside>

          {/* ── Product grid ── */}
          <section>
            {/* Stat bar */}
            <div className="mb-6 hidden xl:flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white border border-black/07 px-5 py-3.5 shadow-sm">
              <p className="text-[0.75rem] text-stone/60">
                Showing <span className="font-semibold text-stone">{filteredProducts.length}</span> products
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Categories", count: categories.length - 1 },
                  { label: "Brands",     count: brands.length - 1 },
                  { label: "Colors",     count: colors.length - 1 },
                ].map(({ label, count }) => (
                  <span key={label} className="badge-light">
                    {label} · {count}
                  </span>
                ))}
              </div>
            </div>

            {loading ? (
              <SkeletonGrid />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.42 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
