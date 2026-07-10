import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { formatKes } from "@/utils/money";

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      {/* Page header */}
      <div className="py-10">
        <SectionHeading
          eyebrow="Shop"
          title="Browse our collection"
          description="Find your perfect pair from our curated selection of premium footwear."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="bg-[#f8f8f8] h-fit rounded-[2rem] p-5 xl:sticky xl:top-32">
          <div className="text-sm font-semibold text-champagne font-body uppercase tracking-wider">Filters</div>
          <div className="mt-5 space-y-5">
            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Search
              </span>
              <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2.5">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search shoes"
                  className="w-full bg-transparent text-xs text-[#111] outline-none placeholder:text-black/30"
                />
              </div>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Category
              </span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-full bg-white px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer border border-black/10"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-white">
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Size
              </span>
              <select
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
                className="rounded-full bg-white px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer border border-black/10"
              >
                {sizes.map((size) => (
                  <option key={size} value={size} className="bg-white">
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Brand
              </span>
              <select
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
                className="rounded-full bg-white px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer border border-black/10"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand} className="bg-white">
                    {brand}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Color
              </span>
              <select
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
                className="rounded-full bg-white px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer border border-black/10"
              >
                {colors.map((color) => (
                  <option key={color} value={color} className="bg-white">
                    {color}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Price cap
              </span>
              <input
                type="range"
                min={1200}
                max={5000}
                step={100}
                value={priceLimit}
                onChange={(event) => setPriceLimit(Number(event.target.value))}
                className="accent-champagne cursor-pointer"
              />
              <span className="text-xs text-[#666]">
                Up to {formatKes(priceLimit)}
              </span>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne font-semibold">
                Sort by
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full bg-white px-4 py-2.5 text-xs text-[#111] outline-none cursor-pointer border border-black/10"
              >
                <option value="featured" className="bg-white">
                  Featured
                </option>
                <option value="rating" className="bg-white">
                  Top rated
                </option>
                <option value="price-asc" className="bg-white">
                  Price low to high
                </option>
                <option value="price-desc" className="bg-white">
                  Price high to low
                </option>
              </select>
            </label>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-[#f8f8f8] px-5 py-4 text-xs text-[#666]">
            <div>Showing {filteredProducts.length} products</div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-champagne">
              <span className="rounded-full bg-white px-3 py-2">
                Categories {categories.length - 1}
              </span>
              <span className="rounded-full bg-white px-3 py-2">
                Brands {brands.length - 1}
              </span>
              <span className="rounded-full bg-white px-3 py-2">
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
