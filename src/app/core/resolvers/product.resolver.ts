import { computed, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/products';
import { StrictUser } from '../models/user.model';

export const productResolver: ResolveFn<{product: Product; users: (StrictUser | undefined)[]}> = (route, state) => {

  const productsService = inject(ProductsService);
  const productId = Number(route.params['id']);

  return productsService.getProductById(productId);


  // const product = productsService.products().find((product: Product, index: number) => {
  //   if (product.id === productId) {
  //     return product;
  //   } else {
  //     return null;
  //   }
  // });

  // return product;
};
