import { Product } from "./products";

export type SavedFilter = {
    order: string; 
    prop: keyof Product; 
    categories: string[]
}

export type SaveBtnState = {
    isSaveActive: boolean;
    count: number;
    isDeleteActive?:boolean,
    deleteIndex?:number;
    isUpdateActive?:boolean;
}