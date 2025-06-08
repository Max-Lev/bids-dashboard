import { inject, Injectable, resource, ResourceRef } from '@angular/core';
import { Products } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);
  resource = resource;
  // rxResource = rxResource;

  constructor() { }


  rxProducts = rxResource<Products, string | undefined>({
    // request: () => this.query(),
    loader: ({ request }) =>
      this.#http.get<{ products: Products }>(environment.poductsApi).pipe(
        distinctUntilChanged(),
        map(({ products }) => {
          console.log('products ', products);
          return products;
        }),
        catchError((err) => {
          console.log('err ', err);
          throw Error('Unable to load!');
        })
      ),
  });


  rxCategories = rxResource<string[], string | undefined>({
    // request: () => this.query(),

    loader: ({ request }) =>
      this.#http.get<string[]>(`${environment.poductsApi}/category-list`).pipe(
        distinctUntilChanged(),

        map((categories) => {
          console.log('category-list ', categories);
          return categories;
        }),
        catchError((err) => {
          console.log('err ', err);
          throw Error('Unable to load!');
        })
      ),

  });



}
