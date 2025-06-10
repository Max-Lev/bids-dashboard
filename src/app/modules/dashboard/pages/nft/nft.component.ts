import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { Nft } from '../../models/nft';
import { ProductsService } from 'src/app/core/services/products.service';
import { provideHttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderOptions, Product, ProductDetailsOption as ProductDetailsOptions } from 'src/app/core/models/products';


@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
  ],
  providers: [

  ],
  // standalone: true,
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;

  productDetailsOptions = signal(ProductDetailsOptions);
  orderOptions = signal(OrderOptions);

  productsService = inject(ProductsService);

  filteredProductsCategories = toSignal(
    this.productsService.getFilteredProductsCategories(), {
    initialValue: { products: [], categories: [] }
  });

  category = computed(() => this.filteredProductsCategories().categories);
  products = computed(() => this.filteredProductsCategories().products);

  readonly filteredProducts = computed(() => this.productsService.filteredProducts());

  readonly productsHighDiscount = computed(() => this.productsService.productsHighDiscount());

  readonly isProductsExists = computed(() => {
    const items = this.products();
    return Array.isArray(items) && items.length > 0 ? items : null;
  });

  // filterType(prop: keyof Product, category: string[]) {

  //   return computed(() => {

  //     const products = this.filteredProductsCategories().products;

  //     if (!Array.isArray(products) || products.length === 0) {
  //       return [];
  //     }

  //     // Sort safely by numeric or string property
  //     const sorted = [...products].sort((a, b) => {
  //       const aVal = a[prop];
  //       const bVal = b[prop];

  //       if (typeof aVal === 'number' && typeof bVal === 'number') {
  //         return bVal - aVal; // descending numeric
  //       }

  //       if (typeof aVal === 'string' && typeof bVal === 'string') {
  //         return bVal.localeCompare(aVal); // descending string
  //       }

  //       return 0;
  //     });

  //     // Filter and slice
  //     const filtered = sorted.filter((item) => category.includes(item.category)).slice(0, 5);
  //     console.log('filterType', filtered)
  //     return filtered;
  //   });
  // }

  constructor() {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];

    effect(() => {

      const categoryData = this.category();
      // console.log('Categories:', categoryData);

      const productData = this.products();
      // console.log('Products:', productData);

      // console.log('productsHighDiscount ',this.productsHighDiscount());

      // this.filterType('price', ['beauty', 'fragrances'])();

      // console.log(this.productsService.filterType())

    });


  }

  ngOnInit(): void {


  }

  // addCategory(category: string) {
  //   this.productsService.updateProductsHighRating(category);
  // }


}
