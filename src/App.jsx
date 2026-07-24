import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { StoreProvider } from "@/context/StoreContext";
import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { ProductPreviewModal } from "@/components/ProductPreviewModal";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Animated ring */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, rgba(200,168,75,0) 0%, rgba(200,168,75,0.8) 100%)",
            mask: "radial-gradient(transparent 60%, black 61%)",
            WebkitMask: "radial-gradient(transparent 60%, black 61%)",
          }}
        />
        <div className="h-8 w-8 rounded-full bg-champagne/15 border border-champagne/30 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-champagne" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="text-2xl font-bold tracking-tight text-white font-heading"
        >
          J. MASTER CLADSWEAR
        </motion.h2>
      </div>
    </motion.div>
  );
}

function RoutedApp() {
  const { previewProduct, detailsProduct, closePreview, closeDetails } = useModal();

  return (
    <>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Public Store Routes */}
        <Route element={<Layout />}>
          <Route path="/"            element={<HomePage />} />
          <Route path="/shop"        element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart"        element={<CartPage />} />
          <Route path="/wishlist"    element={<WishlistPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about"       element={<AboutPage />} />
          <Route path="/contact"     element={<ContactPage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ProductPreviewModal product={previewProduct} onClose={closePreview} />
      <ProductDetailsModal product={detailsProduct} onClose={closeDetails} />
    </>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <StoreProvider>
            <ModalProvider>
              <RoutedApp />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#ffffff",
                    color: "#111111",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                    fontSize: "0.8rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    padding: "12px 16px",
                  },
                  success: {
                    iconTheme: {
                      primary: "hsl(43,68%,40%)",
                      secondary: "#ffffff",
                    },
                  },
                }}
              />
            </ModalProvider>
          </StoreProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
