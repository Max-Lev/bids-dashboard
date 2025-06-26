import { computed, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';

export const productResolver: ResolveFn<Product | undefined> = (route, state) => {

  const productsService = inject(ProductsService);
  const productId = Number(route.params['id']);
  const product = productsService.products().find((product: Product, index: number) => {
    if (product.id === productId) {
      return product;
    } else {
      return null;
    }
  });

  return product;
};
