
type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Meta = {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
};

type Review = {
  // Define the structure of a review based on your data, placeholder below:
  // Example:
  reviewer: string;
  rating: number;
  comment: string;
  // [key: string]: any;
};

export type ProductsDTO = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

export type Products = ProductsDTO[];
export type Product = ProductsDTO;