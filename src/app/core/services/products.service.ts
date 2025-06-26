import { computed, effect, inject, Injectable, resource, ResourceRef, Signal, signal } from '@angular/core';
import { Product, Products } from '../models/products';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError, forkJoin, Observable, of, defer, shareReplay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { _ } from '@angular/cdk/number-property.d-CJVxXUcb';
import { GraphUtilService } from '../utils/graph-util.service';
import { ChartProducts } from '../models/chart-products.model';
import { MessageService } from 'src/app/shared/providers/message.service';
import { SavedFilter } from '../models/saved-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #http = inject(HttpClient);
  #graphUtilService = inject(GraphUtilService);
  #messageService = inject(MessageService);

  excludedCategories = ['groceries', 'furniture', 'tops'];

  private allProducts = signal<Product[]>([]);
  readonly products = signal<Product[]>([]);
  private categories = signal<string[]>([]);


  // private readonly 
  selectedCategoriesList = signal<string[]>(['laptops', 'smartphones', 'tablets']);
  productProperty = signal<keyof Product>('rating');
  orderProp = signal<{ title: string, value: string }>({ title: 'High', value: 'desc' }); // 'asc' | 'desc';
  itemsSize = signal(10);

  selectedCategory = computed(() => this.selectedCategoriesList());

  selectedLastDefaultCategory = computed(() => {
    const all = this.selectedCategoriesList();
    const last = all.length - 1;
    return (last === -1) ? '' : all[last];
  });

  savedFilterState = signal<SavedFilter[]>([]);

  savedFilterMap = signal<Map<string, SavedFilter>>(new Map());
  constructor() {
    this.savedFilter();
  }

  getFilteredProductsCategories(): Observable<{ products: Product[]; categories: string[]; }> {
    return defer(() => {
      if (this.products().length > 0 && this.categories().length > 0) {
        return of({
          products: this.products(),
          categories: this.categories()
        });
      }
      return this.getProductsData();
    });
  }

  private getProductsData(): Observable<{ categories: string[]; products: Products; }> {
    return forkJoin({
      categories: this.#http.get<string[]>(`${environment.productsApi}/category-list`),
      products: this.#http.get<{ products: Products }>(`${environment.productsApi}?limit=0`)
    }).pipe(
      map(({ categories, products }) => {
        products.products = products.products.map(product => ({ ...product, mainImage: product.images[0] }));
        return {
          categories: categories,
          products: products
        };
      }),
      map(({ categories, products }) => {
        this.allProducts.set(products.products);

        const allowedCategories = this.excludeCategories(categories, this.excludedCategories);

        // Filter products by allowed categories
        const filteredProducts = products.products.filter(product => allowedCategories.includes(product.category));

        this.products.set(filteredProducts);
        this.categories.set(allowedCategories);

        console.log('products ', this.products());
        console.log('all products ', this.allProducts());

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
    const selectedCategories = this.selectedCategoriesList(); // signal
    const prop = this.productProperty(); // signal

    const order = this.orderProp().value as 'asc' | 'desc'; // signal

    const _filterProducts = this.filterProducts(products, {
      categories: selectedCategories.length ? selectedCategories : undefined,
      sortBy: prop ?? 'id', // fallback to 'id' if null
      order,
    });
    return _filterProducts;

  });

  filterProducts(products: Products, options: {
    categories?: string[]; sortBy?: keyof Product; order?: 'asc' | 'desc';
  }): Products {
    if (!Array.isArray(products) || products.length === 0) return [];

    let result = products.filter(p => p.stock > 0);

    if (options.categories?.length) {
      result = result.filter(p => options.categories!.includes(p.category));
    }

    if (options.sortBy) {
      result = this.sortByProperty(result, options.sortBy, options.order ?? 'desc');
    } else {
      // fallback to sorting by id
      result = result.sort((a, b) => options.order === 'asc' ? a.id - b.id : b.id - a.id);
    }

    const _result = result.slice(0, this.itemsSize());
    return _result;
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


  updateFilterHandler(category: string, prop: keyof Product, order: string) {

    if (category === '') {
      this.selectedCategoriesList.set([]);
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
    const current = this.selectedCategoriesList();

    // Check if the category to display is not empty
    if (categoryToDisplay.length > 0) {
      // Get the index of the category to display
      const index = current.indexOf(categoryToDisplay);
      // Create a new array with the current categories
      const updated = [...current];

      // Check if the category to display is already in the array
      if (index > -1) {
        // If it is, update the signal
        this.selectedCategoriesList.set(updated);
        // update signal
      } else {
        // If it is not, add it to the array
        updated.push(categoryToDisplay); // add

      }
      // Update the signal with the new array
      this.selectedCategoriesList.set(updated); // update signal
    }

    return this.selectedCategoriesList();
  }

  removeSelectedCategory(category: string) {
    const current = this.selectedCategoriesList();
    const index = current.indexOf(category);
    if (index > -1) {
      const updated = [...current];
      updated.splice(index, 1);
      this.selectedCategoriesList.set(updated);
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

  readonly graphData: Signal<ChartProducts> = this.#graphUtilService.createGraphData(
    this.filteredProducts,
    this.productProperty,
    this.orderProp
  );

  private savedFilter() {
    effect(() => {
      if (this.#messageService.notifyProductsSrv()) {
        const snapshot: SavedFilter = {
          order: this.orderProp().value,
          prop: this.productProperty(),
          categories: this.selectedCategoriesList(),
        };

        if (this.savedFilterState().length <= 4) {
          const index = this.savedFilterState().length + 1;
          // localStorage.setItem(`data-${index}`, JSON.stringify(snapshot));

          this.savedFilterState.update(states => [...states, snapshot]);
          this.savedFilterMap.update(currentMap => {
            const newMap = new Map(currentMap);
            newMap.set(`S${index}`, snapshot);
            return newMap;
          });
        }
        // console.log(this.savedFilterMap().entries());

        // Reset flag
        this.#messageService.notifyProductsHandler(false);
      }
    });
  }

  deleteSavedFilter(index: number) {
    this.savedFilterState.update(states => states.filter((_, i) => i !== index - 1));
  }

  getSelectedStateData(index: number): SavedFilter {
    const savedStates = this.savedFilterState();
    const selected = savedStates[index];
    return selected;
  }



  // readonly graphData= computed(()=>this.#graphUtilService.createGraphData(
  //   this.filteredProducts,
  //   this.productProperty,
  //   this.orderProp
  // ));



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
