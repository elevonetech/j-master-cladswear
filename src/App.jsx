import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { StoreProvider } from "@/context/StoreContext";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { ProductPreviewModal } from "@/components/ProductPreviewModal";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 18%), linear-gradient(180deg, #060606 0%, #111111 46%, #090909 100%)",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 shadow-2xl shadow-black/40"
      >
        <div className="h-5 w-5 rounded-full bg-white" />
      </motion.div>
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-[0.5em] text-white/50"
        >
          Loading
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-2xl font-semibold tracking-tight text-white font-heading"
        >
          Dapper Footwear
        </motion.h2>
      </div>
    </motion.div>
  );
}

function RoutedApp() {
  const { previewProduct, detailsProduct, closePreview, closeDetails } =
    useModal();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
    const timer = window.setTimeout(() => setReady(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <StoreProvider>
        <ModalProvider>
          <RoutedApp />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111111",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "18px",
              },
            }}
          />
        </ModalProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}
