import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";
import { handleImgError } from "@/utils/image";

export function ProductModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "Nike",
    category: "Sneakers",
    collection: "New Arrivals",
    gender: "Unisex",
    sizes: "39, 40, 41, 42, 43, 44",
    colors: "Black, White, Grey",
    description: "",
    rating: "4.5",
    reviews: "0",
    stock: "15",
    badge: "",
    featured: false,
    bestSeller: false,
    newArrival: true,
    tags: "Sneakers, Casual",
    specs: "Premium quality, Comfort fit, Durable build",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        price: initialData.price ? String(initialData.price) : "",
        brand: initialData.brand || "Nike",
        category: initialData.category || "Sneakers",
        collection: initialData.collection || "New Arrivals",
        gender: initialData.gender || "Unisex",
        sizes: Array.isArray(initialData.sizes) ? initialData.sizes.join(", ") : initialData.sizes || "",
        colors: Array.isArray(initialData.colors) ? initialData.colors.join(", ") : initialData.colors || "",
        description: initialData.description || "",
        rating: initialData.rating ? String(initialData.rating) : "4.5",
        reviews: initialData.reviews ? String(initialData.reviews) : "0",
        stock: initialData.stock ? String(initialData.stock) : "15",
        badge: initialData.badge || "",
        featured: Boolean(initialData.featured),
        bestSeller: Boolean(initialData.bestSeller),
        newArrival: Boolean(initialData.newArrival),
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
        specs: Array.isArray(initialData.specs) ? initialData.specs.join("\n") : initialData.specs || "",
      });
      setExistingImages(initialData.images || []);
      setImageFiles([]);
      setImagePreviews([]);
      setImageUrlInput("");
    } else {
      setFormData({
        name: "",
        price: "",
        brand: "Nike",
        category: "Sneakers",
        collection: "New Arrivals",
        gender: "Unisex",
        sizes: "39, 40, 41, 42, 43, 44",
        colors: "Black, White, Grey",
        description: "",
        rating: "4.5",
        reviews: "0",
        stock: "15",
        badge: "",
        featured: false,
        bestSeller: false,
        newArrival: true,
        tags: "Sneakers, Casual",
        specs: "Premium quality, Comfort fit, Durable build",
      });
      setExistingImages([]);
      setImageFiles([]);
      setImagePreviews([]);
      setImageUrlInput("");
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImageFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setExistingImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput("");
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewPreview = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert("Product name and price are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse arrays from string inputs
      const parseList = (str) =>
        str
          ? str
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
          : [];

      const parseLines = (str) =>
        str
          ? str
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
          : [];

      const productPayload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price) || 0,
        brand: formData.brand.trim(),
        category: formData.category.trim(),
        collection: formData.collection.trim(),
        gender: formData.gender.trim(),
        sizes: parseList(formData.sizes),
        colors: parseList(formData.colors),
        description: formData.description.trim(),
        rating: parseFloat(formData.rating) || 4.5,
        reviews: parseInt(formData.reviews, 10) || 0,
        stock: parseInt(formData.stock, 10) || 0,
        badge: formData.badge.trim(),
        featured: formData.featured,
        bestSeller: formData.bestSeller,
        newArrival: formData.newArrival,
        tags: parseList(formData.tags),
        specs: parseLines(formData.specs),
        // If imageFiles are empty and existingImages has URLs, keep existingImages
        images: existingImages,
      };

      await onSubmit(productPayload, imageFiles);
      onClose();
    } catch (err) {
      console.error("Submit product modal error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181818]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-xs text-white/50">
                  {isEditing
                    ? "Update product details, inventory, and images"
                    : "Fill in the details to publish a new shop item"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-champagne border-b border-white/5 pb-2">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Air Jordan 1 Retro"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    placeholder="2200"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Nike, Adidas, Jordan, etc."
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Sneakers, Formal, Casual"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Pricing, Stock & Collections */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-champagne border-b border-white/5 pb-2">
                Inventory & Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Collection
                  </label>
                  <select
                    name="collection"
                    value={formData.collection}
                    onChange={handleChange}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne text-white"
                  >
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Best Sellers">Best Sellers</option>
                    <option value="Limited Edition">Limited Edition</option>
                    <option value="Classic">Classic</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    placeholder="e.g. Best Seller, 20% OFF"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Available Sizes (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    placeholder="39, 40, 41, 42, 43, 44"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Available Colors (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="Black, White, Red, Blue"
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the product material, design, and comfort..."
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-champagne"
                />
              </div>
            </div>

            {/* Section 3: Flags & Badges */}
            <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded accent-champagne"
                />
                Featured Product
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                  className="h-4 w-4 rounded accent-champagne"
                />
                Best Seller
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={formData.newArrival}
                  onChange={handleChange}
                  className="h-4 w-4 rounded accent-champagne"
                />
                New Arrival
              </label>
            </div>

            {/* Section 4: Product Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-champagne">
                  Product Images
                </h4>
                <span className="text-xs text-white/40">
                  {isEditing && imageFiles.length === 0
                    ? "Existing images will be preserved if no new file is uploaded"
                    : "Upload file or paste image URL"}
                </span>
              </div>

              {/* Upload Dropzone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 hover:border-champagne rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all text-center">
                  <Upload className="h-8 w-8 text-champagne mb-2" />
                  <span className="text-sm font-medium text-white">
                    Upload New Image File(s)
                  </span>
                  <span className="text-xs text-white/40 mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {/* URL Input */}
                <div className="flex flex-col justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <label className="text-xs font-semibold text-white/80">
                    Add Image by URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-[#1c1c1c] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-champagne text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 rounded-xl bg-champagne text-black font-semibold text-xs hover:bg-champagne/90 transition-colors flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              <div className="space-y-2">
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <span className="text-xs text-white/60 font-semibold mb-2 block">
                      Current Images ({existingImages.length}):
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {existingImages.map((src, idx) => (
                        <div
                          key={`existing-${idx}`}
                          className="relative h-20 w-20 rounded-xl overflow-hidden border border-white/20 group bg-black"
                        >
                          <img
                            src={src}
                            alt={`Product image ${idx}`}
                            onError={handleImgError}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Image File Previews */}
                {imagePreviews.length > 0 && (
                  <div>
                    <span className="text-xs text-champagne font-semibold mb-2 block">
                      New Uploaded Files ({imagePreviews.length}):
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {imagePreviews.map((src, idx) => (
                        <div
                          key={`preview-${idx}`}
                          className="relative h-20 w-20 rounded-xl overflow-hidden border border-champagne/50 group bg-black"
                        >
                          <img
                            src={src}
                            alt={`Upload preview ${idx}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewPreview(idx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-champagne text-black font-bold text-sm hover:bg-champagne-light transition-all disabled:opacity-50 shadow-lg shadow-champagne/20"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Update Product"
                    : "Publish Product"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
