// types/product.ts - Product type definitions

export interface ProductColor {
  name: string; // Color identifier (e.g., "red", "blue")
  displayName: string; // Human-readable color name (e.g., "Red", "Blue")
  colorCode: string; // Hex color code for displaying the color circle
  image: string; // Path to the color-specific product image
}

export interface Product {
  id: string; // Unique product identifier
  name: string; // Product name
  description: string; // Product description
  defaultImage: string; // Default/fallback image path
  hasColorVariants: boolean; // Whether this product has color variants
  colors?: ProductColor[]; // Array of available colors (optional)
}

export interface CategoryData {
  headerImage: string; // Category header image path
  products: Product[]; // Array of products in this category
}

export interface ProductsData {
  [categoryKey: string]: CategoryData;
}

// Extended product interface for cart and display purposes
export interface ProductWithVariant extends Product {
  selectedColor?: ProductColor; // Currently selected color variant
  currentImage: string; // Current image being displayed
}
