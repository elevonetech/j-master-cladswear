import { createContext, useContext, useState } from "react";
import type { Product } from "@/types";
import products from "@/data/products";

type ModalContextValue = {
  previewProduct: Product | null;
  detailsProduct: Product | null;
  openPreview: (productId: string) => void;
  openDetails: (productId: string) => void;
  closePreview: () => void;
  closeDetails: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);

  const openPreview = (productId: string) => {
    const product = products.find((p) => p.id === productId) ?? null;
    setPreviewProduct(product);
  };

  const openDetails = (productId: string) => {
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
