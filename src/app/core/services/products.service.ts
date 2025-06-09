import { computed, inject, Injectable, resource, ResourceRef, signal } from '@angular/core';
import { Product, Products } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError, forkJoin, Observable, of, defer, shareReplay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);

  private allProducts = signal<Product[]>([]);
  private products = signal<Product[]>([]);
  private categories = signal<string[]>([]);

  constructor() { }

  getFilteredProductsCategories(): Observable<{ products: Product[]; categories: string[]; }> {
    return defer(() => {
      if (this.products().length > 0 && this.categories().length > 0) {
        return of({
          products: this.products(),
          categories: this.categories()
        });
      }
      return this.loadData();
    });
  }

  private loadData() {
    return forkJoin({
      categories: this.#http.get<string[]>(`${environment.productsApi}/category-list`),
      products: this.#http.get<{ products: Products }>(`${environment.productsApi}?limit=0`)
    }).pipe(
      map(({ categories, products }) => {
        this.allProducts.set(products.products);
        const excludedCategories = ['groceries', 'furniture', 'tops'];
        const allowedCategories = this.excludeCategories(categories, excludedCategories);

        // Filter products by allowed categories
        const filteredProducts = products.products.filter(
          product => allowedCategories.includes(product.category));

        // console.log('filteredProducts ', filteredProducts);
        // console.log('allProducts ', this.allProducts());
        // console.log('allowedCategories ', allowedCategories);

        this.products.set(filteredProducts);
        this.categories.set(allowedCategories);
        return {
          categories: allowedCategories,
          products: filteredProducts
        };
      }),
      shareReplay(1)
    );
  }

  excludeCategories(categories: string[], exclude: string[]): string[] {
    const allowedCategories = categories.filter(cat => !exclude.includes(cat));
    return allowedCategories;
  }

  // getFilteredProductsCategories():Observable<{products: Products;categories: string[];}> {
  //   if(this.products().length > 0) {
  //     return of({products: this.products(),categories: this.categories()});
  //   }

  //   return forkJoin({
  //     categories: this.#http.get<string[]>(`${environment.productsApi}/category-list`),
  //     products: this.#http.get<{ products: Products }>(`${environment.productsApi}?limit=0`)
  //   }).pipe(
  //     map(({ categories, products }) => {
  //       // Filter categories (exclude groceries)
  //       const allowedCategories = categories.filter(cat => cat !== 'groceries' 
  //         && cat !== 'furniture' && cat !== 'tops'
  //       );

  //       // Filter products by allowed categories
  //       const filteredProducts = products.products.filter(product => 
  //         allowedCategories.includes(product.category)
  //       );
  //       console.log('filteredProducts ',filteredProducts);
  //       this.products.set(filteredProducts);
  //       this.categories.set(allowedCategories);
  //       return {
  //         categories: allowedCategories,
  //         products: filteredProducts
  //       };
  //     })
  //   );
  // }


  readonly productsHighDiscount = computed(() => {
    const items = this.products();
    if (Array.isArray(items) && items.length > 0) {
      return items.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      return [];
    }
  });


  readonly defaultProductsHighRating = computed(() => {
    const products = this.products();
    if (Array.isArray(products) && products.length > 0) {

      const defaultCategories = this.updateProductsHighRating('');

      return products.filter(prod => prod.stock > 0).sort((a, b) => b.rating - a.rating)
        .filter((item) => defaultCategories.includes(item.category))
        .slice(0, 5);
    } else {
      return [];
    }
  });

  readonly defaultCategories = signal<string[]>(['laptops', 'smartphones', 'tablets']);

  updateProductsHighRating(categoryToDisplay: string) {
    const current = this.defaultCategories();
  
    if (categoryToDisplay.length > 0) {
      const index = current.indexOf(categoryToDisplay);
      const updated = [...current];
  
      if (index > -1) {
        updated.splice(index, 1); // remove
      } else {
        updated.push(categoryToDisplay); // add
      }
  
      this.defaultCategories.set(updated); // update signal
    }
  
    console.log('Updated categories:', this.defaultCategories());
    return this.defaultCategories();
  }

  filterType(prop: keyof Product, category: string[]) {

    return computed(() => {

      const products = this.products();

      if (!Array.isArray(products) || products.length === 0) {
        return [];
      }

      // Sort safely by numeric or string property
      const sortedProducts = [...products].sort((a, b) => {
        const aVal = a[prop];
        const bVal = b[prop];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return bVal - aVal; // descending numeric
        }

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return bVal.localeCompare(aVal); // descending string
        }

        return 0;
      });

      // Filter and slice
      const filtered = sortedProducts.filter((item) => category.includes(item.category)).slice(0, 5);
      console.log('filterType', filtered)
      return filtered;
    });
  }
 


  // rxProducts = rxResource<Products, string | undefined>({
  //   // request: () => this.query(),
  //   loader: ({ request }) =>
  //     this.#http.get<{ products: Products }>(`${environment.productsApi}?limit=0`).pipe(
  //       distinctUntilChanged(),
  //       map(({ products }) => {
  //         console.log('products ', products);
  //         return products;
  //       }),
  //       catchError((err) => {
  //         console.log('err ', err);
  //         throw Error('Unable to load!');
  //       })
  //     ),
  // });

  // rxCategories = rxResource<string[], string | undefined>({
  //   // request: () => this.query(),

  //   loader: ({ request }) =>
  //     this.#http.get<string[]>(`${environment.productsApi}/category-list`).pipe(
  //       distinctUntilChanged(),

  //       map((categories) => {
  //         console.log('category-list ', categories);
  //         return categories;
  //       }),
  //       catchError((err) => {
  //         console.log('err ', err);
  //         throw Error('Unable to load!');
  //       })
  //     )

  // });

  // rxProductsHighRating = rxResource<Products, string | undefined>({
  //   // request: () => this.query(),
  //   loader: ({ request }) =>
  //     this.#http.get<{ products: Products }>(`${environment.productsApi}?sortBy=rating&order=desc&limit=0`).pipe(
  //       map(({ products }) => {
  //         console.log('rating high', products)
  //         return products;
  //       }),
  //       catchError((err) => {
  //         console.log('err ', err);
  //         throw Error('Unable to load!');
  //       })
  //     )
  // });

  // rxProductsInStock = rxResource<Products, string | undefined>({
  //   loader: () => {
  //     return this.#http.get<{ products: Products }>
  //       (`${environment.productsApi}?sortBy=availabilityStatus&order=asc&limit=0`).pipe(
  //         map(({ products }) => {
  //           console.log('in stock', products)
  //           return products;
  //         }),
  //         catchError((err) => {
  //           console.log('err ', err);
  //           throw Error('Unable to load!');
  //         })
  //       )
  //   }
  // });

  // rxProductsHighDiscount = rxResource<Products, string | undefined>({
  //   loader: () => {
  //     return this.#http.get<{ products: Products }>
  //       (`${environment.productsApi}?sortBy=discountPercentage&order=desc&limit=0`).pipe(
  //         map(({ products }) => {
  //           console.log('in stock', products)
  //           return products;
  //         }),
  //         catchError((err) => {
  //           console.log('err ', err);
  //           throw Error('Unable to load!');
  //         })
  //       )
  //   }
  // });





}
