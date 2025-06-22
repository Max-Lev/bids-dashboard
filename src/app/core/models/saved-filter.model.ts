import { Product } from "./products";

export type SavedFilter = {
    order: string; 
    prop: keyof Product; 
    categories: string[]
}