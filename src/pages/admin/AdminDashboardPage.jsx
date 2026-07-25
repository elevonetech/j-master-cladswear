import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { ProductModal } from "@/components/admin/ProductModal";
import { handleImgError } from "@/utils/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  LogOut,
  Database,
  ShoppingBag,
  PackageCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { formatKes } from "@/utils/money";
import { Pagination } from "@/components/Pagination";
import logoImg from "@/assets/logo.jpeg";

export function AdminDashboardPage() {
  const { logout, user } = useAuth();
  const {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    seedInitialProducts,
    fetchProducts,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered Products
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search.trim() ||
      [p.name, p.brand, p.category, p.description]
        .some((val) => (val || "").toLowerCase().includes(search.toLowerCase().trim()));
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "All" || p.brand === selectedBrand;
    const matchesStock = showLowStockOnly ? (p.stock || 0) < 10 : true;
    return matchesSearch && matchesCategory && matchesBrand && matchesStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary Metrics
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => (p.stock || 0) < 10).length;
  const totalBrands = new Set(products.map((p) => p.brand)).size;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData, imageFiles) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData, imageFiles);
    } else {
      await addProduct(productData, imageFiles);
    }
  };

  const ConfirmDeleteModal = () => {
    if (!deletingProductId) return null;
    const targetProduct = products.find((p) => p.id === deletingProductId);

    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-[#161616] border border-red-500/30 rounded-2xl p-6 shadow-2xl text-white space-y-4"
        >
          <div className="flex items-center gap-3 text-red-400">
            <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Delete Product</h3>
              <p className="text-xs text-white/50">This action cannot be undone.</p>
            </div>
          </div>
          <p className="text-sm text-white/80">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-white">
              "{targetProduct?.name || "this product"}"
            </span>{" "}
            from Supabase database?
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeletingProductId(null)}
              className="px-4 py-2 rounded-xl border border-white/20 text-white/80 font-medium text-xs hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await deleteProduct(deletingProductId);
                setDeletingProductId(null);
              }}
              className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500 shadow-lg shadow-red-600/30"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoImg} 
              alt="Dapper Logo" 
              className="h-9 w-9 rounded-lg object-cover border border-champagne/40" 
            />
            <div>
              <span className="font-bold font-heading tracking-wider text-sm block leading-none">
                JMASTER ADMIN
              </span>
              <span className="text-[10px] text-white/40 group-hover:text-champagne transition-colors flex items-center gap-1">
                View Storefront <ExternalLink className="h-2.5 w-2.5" />
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProducts()}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-champagne text-white/70 hover:text-white transition-colors"
            title="Refresh Products"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white">
              {user?.email || "Admin User"}
            </p>
            <span className="text-[10px] text-champagne font-medium">Store Administrator</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 text-white/80 transition-all text-xs font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8">
        {/* Banner / Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-champagne" />
              Products Management
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-champagne text-black font-bold text-xs hover:bg-champagne-light transition-all shadow-lg shadow-champagne/20"
            >
              <Plus className="h-4 w-4" /> Add New Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
              <PackageCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading">{totalProducts}</span>
              <p className="text-xs text-white/50">Total Shop Products</p>
            </div>
          </div>

          <div
            onClick={() => { setShowLowStockOnly(!showLowStockOnly); setCurrentPage(1); }}
            className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.02] ${
              showLowStockOnly
                ? "bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                : "bg-[#121212] border-white/10 hover:border-amber-500/30"
            }`}
          >
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading">{lowStockCount}</span>
              <p className="text-xs text-white/50">
                Low Stock (&lt;10 items) {showLowStockOnly && <span className="text-amber-400 ml-1">(Filtered)</span>}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading">{categories.length - 1}</span>
              <p className="text-xs text-white/50">Categories</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading">{totalBrands}</span>
              <p className="text-xs text-white/50">Brands</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121212] p-4 rounded-2xl border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, brand..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-champagne"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs text-white/60 font-medium">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-champagne flex-1 sm:flex-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="text-xs text-white/60 font-medium ml-2 hidden sm:block">Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setCurrentPage(1); }}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-champagne flex-1 sm:flex-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-white/50 flex flex-col items-center gap-3">
              <RefreshCw className="h-8 w-8 animate-spin text-champagne" />
              <p className="text-sm">Loading products from database...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-white/50 space-y-3">
              <ShoppingBag className="h-10 w-10 mx-auto text-white/20" />
              <p className="text-sm">No products found matching your search or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[900px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#161616] text-white/50 uppercase font-semibold">
                    <th className="py-4 px-4">Product</th>
                    <th className="py-4 px-4">Category / Brand</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Stock</th>
                    <th className="py-4 px-4">Badges</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedProducts.map((product) => {
                    const isLowStock = product.stock < 10;
                    const mainImage =
                      product.images?.[0] ||
                      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80";

                    return (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={mainImage}
                              alt={product.name}
                              onError={handleImgError}
                              className="h-12 w-12 rounded-xl object-cover border border-white/10 bg-black"
                            />
                            <div>
                              <p className="font-semibold text-white text-sm">
                                {product.name}
                              </p>
                              <span className="text-[10px] text-white/40">
                                ID: {String(product.id).substring(0, 14)}...
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-medium text-white/90">{product.brand}</p>
                          <span className="text-[10px] text-white/50">{product.category}</span>
                        </td>

                        <td className="py-3 px-4 text-sm font-medium text-white/90">
                          {formatKes(product.price)}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap inline-block ${
                              (product.stock || 0) < 10
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            }`}
                          >
                            {product.stock} in stock
                          </span>
                        </td>

                        <td className="py-3 px-4 min-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {product.badge && (
                              <span className="px-2 py-0.5 rounded bg-champagne/20 text-champagne text-[9px] font-semibold border border-champagne/30 whitespace-nowrap inline-block">
                                {product.badge}
                              </span>
                            )}
                            {product.featured && (
                              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[9px] font-semibold border border-purple-500/30 whitespace-nowrap inline-block">
                                Featured
                              </span>
                            )}
                            {product.bestSeller && (
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[9px] font-semibold border border-blue-500/30 whitespace-nowrap inline-block">
                                Best Seller
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(product)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-champagne hover:text-black text-white/80 transition-all border border-white/10"
                              title="Edit product"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeletingProductId(product.id)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white text-white/80 transition-all border border-white/10"
                              title="Delete product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="p-4 border-t border-white/10 bg-[#161616]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </main>

      {/* Product Form Modal (Create / Edit) */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteModal />
    </div>
  );
}
