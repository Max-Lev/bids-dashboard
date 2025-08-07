import { Product } from "./products";

export type SavedFilter = {
    order: string; 
    prop: keyof Product; 
    categories: string[],
    products?: Product[];
}

export type SaveBtnState = {
    isSaveActive: boolean;
    count: number;
    isDeleteActive?:boolean,
    deleteIndex?:number;
    isChangeActive?:boolean;
}