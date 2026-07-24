import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { isSupabaseConfigured, supabase, uploadProductImage } from "@/lib/supabase";
import { initialTestProducts } from "@/data/products";
import toast from "react-hot-toast";

const ProductContext = createContext(undefined);

const LOCAL_PRODUCTS_KEY = "dapper_local_products";

// Helper to map DB row to JS product object
function formatProductFromDb(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price || 0),
    brand: row.brand || "",
    category: row.category || "Sneakers",
    collection: row.collection || "General",
    gender: row.gender || "Unisex",
    sizes: Array.isArray(row.sizes)
      ? row.sizes
      : typeof row.sizes === "string"
      ? JSON.parse(row.sizes || "[]")
      : [],
    colors: Array.isArray(row.colors)
      ? row.colors
      : typeof row.colors === "string"
      ? JSON.parse(row.colors || "[]")
      : [],
    description: row.description || "",
    rating: Number(row.rating || 5.0),
    reviews: Number(row.reviews || 0),
    stock: Number(row.stock || 0),
    badge: row.badge || "",
    featured: Boolean(row.featured),
    bestSeller: Boolean(row.best_seller ?? row.bestSeller ?? false),
    newArrival: Boolean(row.new_arrival ?? row.newArrival ?? false),
    tags: Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === "string"
      ? JSON.parse(row.tags || "[]")
      : [],
    images: Array.isArray(row.images)
      ? row.images
      : typeof row.images === "string"
      ? JSON.parse(row.images || "[]")
      : [],
    specs: Array.isArray(row.specs)
      ? row.specs
      : typeof row.specs === "string"
      ? JSON.parse(row.specs || "[]")
      : [],
  };
}

// Helper to map JS product object to DB row
function formatProductForDb(product) {
  return {
    name: product.name,
    price: Number(product.price || 0),
    brand: product.brand || "",
    category: product.category || "Sneakers",
    collection: product.collection || "General",
    gender: product.gender || "Unisex",
    sizes: product.sizes || [],
    colors: product.colors || [],
    description: product.description || "",
    rating: Number(product.rating || 5.0),
    reviews: Number(product.reviews || 0),
    stock: Number(product.stock || 0),
    badge: product.badge || "",
    featured: Boolean(product.featured),
    best_seller: Boolean(product.bestSeller),
    new_arrival: Boolean(product.newArrival),
    tags: product.tags || [],
    images: product.images || [],
    specs: product.specs || [],
    updated_at: new Date().toISOString(),
  };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching products from Supabase:", error);
          // Fallback to local storage or initial test data
          loadLocalProducts();
        } else if (data && data.length > 0) {
          setProducts(data.map(formatProductFromDb));
        } else {
          // Table is empty, initialize with initialTestProducts
          setProducts(initialTestProducts);
        }
      } else {
        loadLocalProducts();
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      loadLocalProducts();
    } finally {
      setLoading(false);
    }
  }, []);

  const loadLocalProducts = () => {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
        return;
      } catch {
        // use default
      }
    }
    setProducts(initialTestProducts);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(initialTestProducts));
  };

  const saveLocalProducts = (newList) => {
    setProducts(newList);
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(newList));
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * Seed Initial Products to Supabase
   */
  const seedInitialProducts = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        // Insert sample products into Supabase
        const dbPayloads = initialTestProducts.map(formatProductForDb);
        const { data, error } = await supabase
          .from("products")
          .insert(dbPayloads)
          .select();

        if (error) {
          toast.error("Failed to seed products to Supabase: " + error.message);
        } else {
          toast.success("Successfully seeded 5 test products to Supabase!");
          if (data) {
            setProducts(data.map(formatProductFromDb));
          } else {
            fetchProducts();
          }
        }
      } else {
        saveLocalProducts(initialTestProducts);
        toast.success("Seeded 5 test products locally");
      }
    } catch (err) {
      toast.error("Error seeding products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new product (CREATE)
   */
  const addProduct = async (productData, imageFiles = []) => {
    try {
      let imageUrls = productData.images || [];

      // If new image files uploaded, process them
      if (imageFiles.length > 0) {
        const uploaded = await Promise.all(
          imageFiles.map((file) => uploadProductImage(file))
        );
        const validUploaded = uploaded.filter(Boolean);
        if (validUploaded.length > 0) {
          imageUrls = validUploaded;
        }
      }

      const newProductPayload = {
        ...productData,
        images: imageUrls.length > 0 ? imageUrls : [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        ],
      };

      if (isSupabaseConfigured && supabase) {
        const dbPayload = formatProductForDb(newProductPayload);
        const { data, error } = await supabase
          .from("products")
          .insert([dbPayload])
          .select();

        if (error) {
          toast.error("Failed to add product: " + error.message);
          throw error;
        }

        const created = formatProductFromDb(data[0]);
        setProducts((prev) => [created, ...prev]);
        toast.success("Product added successfully!");
        return created;
      } else {
        const created = {
          ...newProductPayload,
          id: `product-local-${Date.now()}`,
        };
        const updated = [created, ...products];
        saveLocalProducts(updated);
        toast.success("Product added locally!");
        return created;
      }
    } catch (err) {
      console.error("Add product failed:", err);
      throw err;
    }
  };

  /**
   * Update existing product (UPDATE)
   * CRITICAL REQUIREMENT:
   * If a user edits a product and fails to change the image, the image remains as it was.
   * If user uploads a new image, it replaces the existing image.
   */
  const updateProduct = async (id, updatedFields, newImageFiles = []) => {
    try {
      const existing = products.find((p) => p.id === id);
      if (!existing) {
        throw new Error("Product not found");
      }

      let finalImages = existing.images;

      // Handle image updates
      if (newImageFiles && newImageFiles.length > 0) {
        const uploaded = await Promise.all(
          newImageFiles.map((file) => uploadProductImage(file))
        );
        const validUploaded = uploaded.filter(Boolean);
        if (validUploaded.length > 0) {
          finalImages = validUploaded;
        }
      } else if (updatedFields.images && updatedFields.images.length > 0) {
        // If explicit new image URLs were provided in form
        finalImages = updatedFields.images;
      }

      const mergedProduct = {
        ...existing,
        ...updatedFields,
        images: finalImages,
      };

      if (isSupabaseConfigured && supabase) {
        const dbPayload = formatProductForDb(mergedProduct);
        const { error } = await supabase
          .from("products")
          .update(dbPayload)
          .eq("id", id);

        if (error) {
          toast.error("Failed to update product: " + error.message);
          throw error;
        }

        setProducts((prev) =>
          prev.map((p) => (p.id === id ? mergedProduct : p))
        );
        toast.success("Product updated successfully!");
        return mergedProduct;
      } else {
        const updatedList = products.map((p) =>
          p.id === id ? mergedProduct : p
        );
        saveLocalProducts(updatedList);
        toast.success("Product updated locally!");
        return mergedProduct;
      }
    } catch (err) {
      console.error("Update product failed:", err);
      throw err;
    }
  };

  /**
   * Delete product (DELETE)
   */
  const deleteProduct = async (id) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id);

        if (error) {
          toast.error("Failed to delete product: " + error.message);
          throw error;
        }

        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
      } else {
        const updatedList = products.filter((p) => p.id !== id);
        saveLocalProducts(updatedList);
        toast.success("Product deleted locally");
      }
    } catch (err) {
      console.error("Delete product failed:", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        seedInitialProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
}
