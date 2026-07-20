import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import products from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { formatKes } from "@/utils/money";

const selectClass =
  "rounded-full bg-[#0a0a0a] px-4 py-2.5 text-xs text-[#f5f1e8]/90 outline-none cursor-pointer border border-white/10 transition-colors focus:border-champagne/50";

const labelClass =
  "text-xs uppercase tracking-[0.3em] text-champagne font-semibold font-body";

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "All",
  );
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [priceLimit, setPriceLimit] = useState(5000);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const sizes = ["All", ...new Set(products.flatMap((p) => p.sizes))];
  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const colors = ["All", ...new Set(products.flatMap((p) => p.colors))];

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const next = products.filter((p) => {
      const matchesSearch =
        !q ||
        [p.name, p.brand, p.category, p.description].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSize =
        selectedSize === "All" || p.sizes.includes(selectedSize);
      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchesColor =
        selectedColor === "All" || p.colors.includes(selectedColor);
      const matchesPrice = p.price <= priceLimit;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesSize &&
        matchesBrand &&
        matchesColor &&
        matchesPrice
      );
    });
    return next.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured) || b.stock - a.stock;
    });
  }, [
    search,
    selectedCategory,
    selectedSize,
    selectedBrand,
    selectedColor,
    priceLimit,
    sort,
  ]);

  const activeFilterCount = [
    selectedCategory !== "All",
    selectedSize !== "All",
    selectedBrand !== "All",
    selectedColor !== "All",
    priceLimit < 5000,
  ].filter(Boolean).length;

  const filterFields = (
    <div className="mt-5 space-y-5">
      <label className="grid gap-3">
        <span className={labelClass}>Search</span>
        <div className="flex items-center gap-3 rounded-full bg-[#0a0a0a] border border-white/10 px-4 py-2.5 focus-within:border-champagne/50 transition-colors">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search shoes"
            className="w-full bg-transparent text-xs text-[#f5f1e8] outline-none placeholder:text-white/30 font-body"
          />
        </div>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Category</span>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className={selectClass}
        >
          {categories.map((category) => (
            <option key={category} value={category} className="bg-[#141210]">
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Size</span>
        <select
          value={selectedSize}
          onChange={(event) => setSelectedSize(event.target.value)}
          className={selectClass}
        >
          {sizes.map((size) => (
            <option key={size} value={size} className="bg-[#141210]">
              {size}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Brand</span>
        <select
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
          className={selectClass}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand} className="bg-[#141210]">
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Color</span>
        <select
          value={selectedColor}
          onChange={(event) => setSelectedColor(event.target.value)}
          className={selectClass}
        >
          {colors.map((color) => (
            <option key={color} value={color} className="bg-[#141210]">
              {color}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Price cap</span>
        <input
          type="range"
          min={1200}
          max={5000}
          step={100}
          value={priceLimit}
          onChange={(event) => setPriceLimit(Number(event.target.value))}
          className="accent-champagne cursor-pointer"
        />
        <span className="text-xs text-white/45 font-body">
          Up to {formatKes(priceLimit)}
        </span>
      </label>

      <label className="grid gap-3">
        <span className={labelClass}>Sort by</span>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className={selectClass}
        >
          <option value="featured" className="bg-[#141210]">
            Featured
          </option>
          <option value="rating" className="bg-[#141210]">
            Top rated
          </option>
          <option value="price-asc" className="bg-[#141210]">
            Price low to high
          </option>
          <option value="price-desc" className="bg-[#141210]">
            Price high to low
          </option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 bg-[#0a0a0a]">
      {/* Page header */}
      <div className="py-10">
        <SectionHeading
          eyebrow="Shop"
          title="Browse our collection"
          description="Find your perfect pair from our curated selection of premium footwear."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Mobile filter trigger */}
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="xl:hidden inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#141210] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne hover:border-champagne/40 transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={13} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-bold text-[#1a1305]">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Desktop sidebar */}
        <aside className="hidden xl:block bg-[#141210] border border-white/[0.06] h-fit rounded-3xl p-5 xl:sticky xl:top-32">
          <div className={labelClass}>Filters</div>
          {filterFields}
        </aside>

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {filtersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFiltersOpen(false)}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm xl:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-[#141210] border-r border-white/[0.06] p-5 xl:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className={labelClass}>Filters</div>
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-champagne/50 hover:text-champagne transition-colors cursor-pointer"
                    aria-label="Close filters"
                  >
                    <X size={14} />
                  </button>
                </div>
                {filterFields}
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="mt-6 w-full rounded-full bg-champagne py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1a1305] hover:bg-[#d9b53e] transition-colors cursor-pointer"
                >
                  Show {filteredProducts.length} results
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#141210] border border-white/[0.06] px-5 py-4 text-xs text-white/45 font-body">
            <div>Showing {filteredProducts.length} products</div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-champagne">
              <span className="rounded-full bg-[#0a0a0a] border border-white/10 px-3 py-2">
                Categories {categories.length - 1}
              </span>
              <span className="rounded-full bg-[#0a0a0a] border border-white/10 px-3 py-2">
                Brands {brands.length - 1}
              </span>
              <span className="rounded-full bg-[#0a0a0a] border border-white/10 px-3 py-2">
                Colors {colors.length - 1}
              </span>
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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
