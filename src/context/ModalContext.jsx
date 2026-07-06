import { createContext, useContext, useState } from "react";
import products from "@/data/products";

const ModalContext = createContext(undefined);

export function ModalProvider({ children }) {
  const [previewProduct, setPreviewProduct] = useState(null);
  const [detailsProduct, setDetailsProduct] = useState(null);

  const openPreview = (productId) => {
    const product = products.find((p) => p.id === productId) ?? null;
    setPreviewProduct(product);
  };

  const openDetails = (productId) => {
    const product = products.find((p) => p.id === productId) ?? null;
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
