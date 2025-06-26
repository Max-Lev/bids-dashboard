import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';

export const dashboardResolver: ResolveFn<{ products: Product[]; categories: string[]; }> = () => {
  const productsService = inject(ProductsService).getFilteredProductsCategories();
  return productsService;
};
