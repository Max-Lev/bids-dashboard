import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
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

  savedFilterState: WritableSignal<{
    order: string;
    prop: keyof Product;
    categories: string[];
  }[]> = this.productsService.savedFilterState;


  constructor() {

  }

  ngOnInit(): void {

  }

}
