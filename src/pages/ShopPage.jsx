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

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const sizes = [
    "All",
    ...new Set(products.flatMap((product) => product.sizes)),
  ];
  const brands = ["All", ...new Set(products.map((product) => product.brand))];
  const colors = [
    "All",
    ...new Set(products.flatMap((product) => product.colors)),
  ];

  const filteredProducts = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    const next = products.filter((product) => {
      const matchesSearch =
        !lowerSearch ||
        [
          product.name,
          product.brand,
          product.category,
          product.description,
        ].some((value) => value.toLowerCase().includes(lowerSearch));
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSize =
        selectedSize === "All" || product.sizes.includes(selectedSize);
      const matchesBrand =
        selectedBrand === "All" || product.brand === selectedBrand;
      const matchesColor =
        selectedColor === "All" || product.colors.includes(selectedColor);
      const matchesPrice = product.price <= priceLimit;

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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 font-body">
      <SectionHeading
        eyebrow="Shop"
        title="Premium shoe collection"
        description="Search, filter, sort, and preview the full catalog with a polished luxury retail feel."
      />

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <aside className="bg-basalt border border-champagne/10 h-fit rounded-[2rem] p-5 shadow-xl xl:sticky xl:top-32">
          <div className="text-sm font-semibold text-champagne font-body uppercase tracking-wider">Filters</div>
          <div className="mt-5 space-y-5">
            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Search
              </span>
              <div className="flex items-center gap-3 rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 shadow-inner">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search shoes"
                  className="w-full bg-transparent text-xs text-white outline-none placeholder:text-bone/35"
                />
              </div>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Category
              </span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 text-xs text-white outline-none shadow-inner cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-basalt">
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Size
              </span>
              <select
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
                className="rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 text-xs text-white outline-none shadow-inner cursor-pointer"
              >
                {sizes.map((size) => (
                  <option key={size} value={size} className="bg-basalt">
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Brand
              </span>
              <select
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
                className="rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 text-xs text-white outline-none shadow-inner cursor-pointer"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand} className="bg-basalt">
                    {brand}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Color
              </span>
              <select
                value={selectedColor}
                onChange={(event) => setSelectedColor(event.target.value)}
                className="rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 text-xs text-white outline-none shadow-inner cursor-pointer"
              >
                {colors.map((color) => (
                  <option key={color} value={color} className="bg-basalt">
                    {color}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
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
              <span className="text-xs text-bone/70">
                Up to {formatKes(priceLimit)}
              </span>
            </label>

            <label className="grid gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-champagne/70 font-semibold">
                Sort by
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-full bg-basalt border border-champagne/20 px-4 py-2.5 text-xs text-white outline-none shadow-inner cursor-pointer"
              >
                <option value="featured" className="bg-basalt">
                  Featured
                </option>
                <option value="rating" className="bg-basalt">
                  Top rated
                </option>
                <option value="price-asc" className="bg-basalt">
                  Price low to high
                </option>
                <option value="price-desc" className="bg-basalt">
                  Price high to low
                </option>
              </select>
            </label>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-basalt border border-champagne/10 px-5 py-4 text-xs text-bone/68 shadow-lg">
            <div>Showing {filteredProducts.length} products</div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-champagne/70">
              <span className="rounded-full bg-basalt border border-champagne/10 px-3 py-2 shadow-inner">
                Categories {categories.length - 1}
              </span>
              <span className="rounded-full bg-basalt border border-champagne/10 px-3 py-2 shadow-inner">
                Brands {brands.length - 1}
              </span>
              <span className="rounded-full bg-basalt border border-champagne/10 px-3 py-2 shadow-inner">
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
