import { createContext, useContext, useState } from "react";
import { useProducts } from "@/context/ProductContext";

const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
  const { products } = useProducts();
  const [previewProduct, setPreviewProduct] = useState(null);
  const [detailsProduct, setDetailsProduct] = useState(null);

  const openPreview = (productId) => {
    // If passed a product object directly or an ID string
    const product = typeof productId === "object"
      ? productId
      : products.find((p) => String(p.id) === String(productId)) ?? null;
    setPreviewProduct(product);
  };

  const openDetails = (productId) => {
    const product = typeof productId === "object"
      ? productId
      : products.find((p) => String(p.id) === String(productId)) ?? null;
    setDetailsProduct(product);
  };

  const closePreview = () => setPreviewProduct(null);
  const closeDetails = () => setDetailsProduct(null);

  return (
    <ModalContext.Provider
      value={{
        previewProduct,
        detailsProduct,
        openPreview,
        openDetails,
        closePreview,
        closeDetails,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};
