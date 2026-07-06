import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(undefined);

const readStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStorage("kithome-cart", []),
  );
  const [wishlist, setWishlist] = useState(() =>
    readStorage("kithome-wishlist", []),
  );
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    readStorage("kithome-recent", []),
  );

  useEffect(() => {
    window.localStorage.setItem("kithome-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem("kithome-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem(
      "kithome-recent",
      JSON.stringify(recentlyViewed),
    );
  }, [recentlyViewed]);

  const addToCart = (
    product,
    quantity,
    selectedSize,
    selectedColor,
  ) => {
    setCartItems((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor,
      );

      if (existing) {
        return current.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { product, quantity, selectedSize, selectedColor }];
    });
  };

  const updateQuantity = (
    productId,
    selectedSize,
    selectedColor,
    quantity,
  ) => {
    if (quantity < 1) {
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const removeFromCart = (
    productId,
    selectedSize,
    selectedColor,
  ) => {
    setCartItems((current) =>
      current.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          ),
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [productId, ...current],
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const markViewed = (productId) => {
    setRecentlyViewed((current) => {
      const next = [productId, ...current.filter((id) => id !== productId)];
      return next.slice(0, 6);
    });
  };

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      wishlist,
      recentlyViewed,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      markViewed,
      cartCount,
      cartSubtotal,
    }),
    [cartItems, wishlist, recentlyViewed, cartCount, cartSubtotal],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
};
