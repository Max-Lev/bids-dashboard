import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { Nft } from '../../models/nft';
import { ProductsService } from 'src/app/core/services/products.service';
import { provideHttpClient } from '@angular/common/http';

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

  productsService = inject(ProductsService);

  // category = computed(()=>this.productsService.rxCategories.value());
  category = this.productsService.rxCategories.value;
  products = this.productsService.rxProducts.value;

  // Computed for loading states
  isLoadingProducts = computed(() => this.productsService.rxProducts.isLoading());
  isLoadingCategories = computed(() => this.productsService.rxCategories.isLoading());

  readonly isProductsExists = computed(() => {
    const items = this.products();
    // return Array.isArray(items) && items.length > 0 ? items[0] : null;
    return Array.isArray(items) && items.length > 0 ? items : null;
  });

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
      console.log(this.category());
      const categoryData = this.category();
      console.log('Categories:', categoryData);

      const productData = this.products();
      console.log('Products:', Array.isArray(productData) ? productData[0]:[]);

      console.log('Loading states:', {
        products: this.isLoadingProducts(),
        categories: this.isLoadingCategories()
      });

    });


  }

  ngOnInit(): void {

  }

  getCategory() {

  }


}
