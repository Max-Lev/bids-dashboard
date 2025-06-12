import { Product, Products } from "./products";

export type ChartProducts = {
    products: Products;
    sum: number;
    dataNum: number[];
    titles: string[];
    prop: keyof Product;
    order: "asc" | "desc";
}

export const EmptyChartProduct: ChartProducts = {
    products: [],           // Assuming Products is an array type
    sum: 0,
    dataNum: [],
    titles: [],
    prop: "id",             // Replace "id" with a valid key of Product
    order: "asc",           // Default to "asc" or "desc"
};