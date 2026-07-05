import type { CartItem } from "@/types";
import { formatKes } from "@/utils/money";

const WHATSAPP_NUMBER = "254712643440";

export const buildOrderMessage = (items: CartItem[]) => {
  const lines = items.map(
    ({ product, quantity, selectedSize, selectedColor }) =>
      `• ${product.name} - Size ${selectedSize} - ${selectedColor} - Qty ${quantity} - ${formatKes(product.price * quantity)}`,
  );

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return [
    "Hello Kithome Shoe Collection,",
    "",
    "I'd like to order:",
    "",
    ...lines,
    "",
    `Total: ${formatKes(total)}`,
    "",
    "My Name:",
    "Delivery Location:",
    "Phone Number:",
    "",
    "Thank you.",
  ].join("\n");
};

export const buildWhatsAppUrl = (items: CartItem[]) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(items))}`;
