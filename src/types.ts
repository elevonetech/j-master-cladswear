export type ProductBadge =
  | "New"
  | "Sale"
  | "Best Seller"
  | "Limited Edition"
  | "Trending";

export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  collection: string;
  gender: "Men" | "Women" | "Unisex" | "Kids";
  sizes: string[];
  colors: string[];
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  badge: ProductBadge;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  images: string[];
  specs: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
