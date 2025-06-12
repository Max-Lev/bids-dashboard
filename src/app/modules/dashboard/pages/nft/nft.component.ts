import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
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
import { ColumnsChartComponent } from 'src/app/shared/graphs/columns-chart/columns-chart.component';


@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
    ColumnsChartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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

  graphData = this.productsService.graphData;
  cdr = inject(ChangeDetectorRef);


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

    });


  }

  ngOnInit(): void {
    // this.cdr.detectChanges();
  }

}
