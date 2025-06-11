import { computed, inject, Injectable, resource, ResourceRef, signal } from '@angular/core';
import { Product, Products } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError, forkJoin, Observable, of, defer, shareReplay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { _ } from '@angular/cdk/number-property.d-CJVxXUcb';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);
  excludedCategories = ['groceries', 'furniture', 'tops'];

  private allProducts = signal<Product[]>([]);
  private products = signal<Product[]>([]);
  private categories = signal<string[]>([]);

  private readonly selectedCategories = signal<string[]>(['laptops', 'smartphones', 'tablets']);

  productProperty = signal<keyof Product>('rating');

  orderProp = signal<{ title: string, value: string }>({ title: 'High', value: 'desc' }); // 'asc' | 'desc';

  itemsSize = signal(5);

  selectedCategory = computed(() => this.selectedCategories());

  selectedLastDefaultCategory = computed(() => {
    const all = this.selectedCategories();
    const last = all.length - 1;
    return (last === -1) ? '' : all[last];
  });


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

        const allowedCategories = this.excludeCategories(categories, this.excludedCategories);

        // Filter products by allowed categories
        const filteredProducts = products.products.filter(
          product => allowedCategories.includes(product.category));

        console.log('filteredProducts ', filteredProducts);
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

  private excludeCategories(categories: string[], exclude: string[]): string[] {
    const allowedCategories = categories.filter(cat => !exclude.includes(cat));
    return allowedCategories;
  }

  readonly filteredProducts = computed(() => {
    const products = this.products(); // signal
    const selectedCategories = this.selectedCategories(); // signal
    const sortBy = this.productProperty(); // signal
    const order = this.orderProp().value as 'asc' | 'desc'; // signal

    return this.filterProducts(products, {
      categories: selectedCategories.length ? selectedCategories : undefined,
      sortBy: sortBy ?? 'id', // fallback to 'id' if null
      order,
    });
  });

  filterProducts(products: Products,
    options: {categories?: string[];sortBy?: keyof Product;order?: 'asc' | 'desc';}): Products {
    if (!Array.isArray(products) || products.length === 0) return [];

    let result = products.filter(p => p.stock > 0);

    if (options.categories?.length) {
      result = result.filter(p => options.categories!.includes(p.category));
    }

    if (options.sortBy) {
      result = this.sortByProperty(result, options.sortBy, options.order ?? 'desc');
    } else {
      // fallback to sorting by id
      result = result.sort((a, b) =>
        options.order === 'asc' ? a.id - b.id : b.id - a.id
      );
    }

    return result.slice(0, this.itemsSize());
  }
  private sortByProperty<T>(products: T[], prop: keyof T, order: 'asc' | 'desc'): T[] {
    return [...products].sort((a, b) => {
      const aVal = a[prop];
      const bVal = b[prop];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'desc' ? bVal - aVal : aVal - bVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      return 0;
    });
  }



  filterByCategoryProperty(products: Products,
    _selectedCategories: string[],
    _productProperty: keyof Product,
    _orderProp: { title: string; value: string; }) {
    if (Array.isArray(products) && products.length > 0) {

      const _products = products.filter(prod => prod.stock > 0).sort((a, b) => {
        const aVal = a[_productProperty];
        const bVal = b[_productProperty];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (_orderProp.value === 'desc') {
            return bVal - aVal; // descending order
          } else {
            return aVal - bVal; // ascending order
          }
        }
        // Fallback for non-numbers
        return 0;
      }).filter((item) => _selectedCategories.includes(item.category)).slice(0, this.itemsSize());

      return _products;
    } else {
      return this.products();
    }
  }
  filterByProperty(products: Products, _productProperty: keyof Product, _orderProp: { title: string; value: string; }) {
    if (Array.isArray(products) && products.length > 0) {

      const _products = products.filter(prod => prod.stock > 0).sort((a, b) => {
        const aVal = a[_productProperty];
        const bVal = b[_productProperty];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (_orderProp.value === 'desc') {
            return bVal - aVal; // descending order
          } else {
            return aVal - bVal; // ascending order
          }
        }
        // Fallback for non-numbers
        return 0;
      }).slice(0, this.itemsSize());

      return _products;
    } else {
      return this.products();
    }
  }
  filterByCategory(products: Products, _selectedCategories: string[], _orderProp: { title: string; value: string; }) {
    if (Array.isArray(products) && products.length > 0) {

      const _products = products.filter(prod => prod.stock > 0).sort((a, b) => {
        const aVal = a;
        const bVal = b;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (_orderProp.value === 'desc') {
            return bVal - aVal; // descending order
          } else {
            return aVal - bVal; // ascending order
          }
        }
        // Fallback for non-numbers
        return 0;
      }).filter((item) => _selectedCategories.includes(item.category)).slice(0, this.itemsSize());

      return _products;
    } else {
      return this.products();
    }
  }

  filterDefault(products: Products, _orderProp: { title: string; value: string; }) {
    if (Array.isArray(products) && products.length > 0) {

      const _products = products.filter(prod => prod.stock > 0).sort((a, b) => {
        const aVal = a;
        const bVal = b;

        // if (typeof aVal === 'number' && typeof bVal === 'number') {
        if (_orderProp.value === 'desc') {
          return bVal.id - aVal.id; // descending order
        } else {
          return aVal.id - bVal.id; // ascending order
        }
        // }

        // Fallback for non-numbers
        // return 0;
      }).slice(0, this.itemsSize());
      console.log(_products);
      return _products;
    } else {
      return this.products();
    }
  }

  updateFilter(category: string, prop: keyof Product, order: string) {

    if (category === '') {
      this.selectedCategories.set([]);
    }

    this.updateTopProductsCategories(category);
    this.productProperty.set(prop);
    const _orderProp = order === 'desc' ? { title: 'High', value: 'desc' } : { value: 'asc', title: 'Low' };
    this.orderProp.set(_orderProp);

  }

  // private readonly defaultCategories = signal<string[]>([]);
  // This function updates the top products categories
  updateTopProductsCategories(categoryToDisplay: string) {
    // Get the current categories
    const current = this.selectedCategories();

    // Check if the category to display is not empty
    if (categoryToDisplay.length > 0) {
      // Get the index of the category to display
      const index = current.indexOf(categoryToDisplay);
      // Create a new array with the current categories
      const updated = [...current];

      // Check if the category to display is already in the array
      if (index > -1) {
        // If it is, update the signal
        this.selectedCategories.set(updated); // update signal
      } else {
        // If it is not, add it to the array
        updated.push(categoryToDisplay); // add
      }

      // Update the signal with the new array
      this.selectedCategories.set(updated); // update signal
    }
    // Log the updated categories
    console.log('Updated categories:', this.selectedCategories());
    // Return the updated categories
    return this.selectedCategories();
  }

  removeSelectedCategory(category: string) {
    const current = this.selectedCategories();
    const index = current.indexOf(category);
    if (index > -1) {
      const updated = [...current];
      updated.splice(index, 1);
      this.selectedCategories.set(updated);
    }
  }

  readonly productsHighDiscount = computed(() => {
    const items = this.products();
    if (Array.isArray(items) && items.length > 0) {
      return items.sort((a, b) => b.discountPercentage - a.discountPercentage);
    } else {
      return [];
    }
  });


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
