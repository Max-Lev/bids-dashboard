import { Injectable, Signal, computed, signal } from "@angular/core";
import { Products, Product } from "../models/products";
import { ChartProducts } from "../models/chart-products.model";

@Injectable({ providedIn: 'root' })
export class GraphUtilService {


  createGraphData(products: Signal<Products>, prop: Signal<keyof Product>,
    order: Signal<{ title: string, value: string }>): Signal<ChartProducts> {
    return computed(() => {
      const currentProducts = products();
      const currentProp = (prop().length !== 0) ? prop() : 'price';
      const currentOrder = order().value as 'asc' | 'desc';
      const totalValue = currentProducts.reduce((acc, product) => acc + product.price, 0).toFixed(2);

      const dataNum: number[] = [];
      const titles: string[] = [];

      currentProducts.forEach(product => {
        dataNum.push(Number(product[currentProp]));
        titles.push(product.title);
      });
      
      let sum = currentProducts.reduce((acc, curr) => acc + Number(curr[currentProp]), 0);
      sum = Number((sum / currentProducts.length).toFixed(2));
      
      return {
        products: currentProducts,
        sum,
        dataNum,
        titles,
        totalValue,
        prop: currentProp,
        order: currentOrder
      };
    });
  }
}

