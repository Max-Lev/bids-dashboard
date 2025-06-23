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
import { MessageService } from 'src/app/shared/providers/message.service';
import { SaveBtnState } from 'src/app/core/models/saved-filter.model';


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

  #messageService = inject(MessageService);
  saveBtnState = computed(() => this.#messageService.saveBtnState());

  constructor() {

  }

  ngOnInit(): void {

  }

  onDeleteSelectedHandler(index: number) {
    this.productsService.deleteSavedFilter(index);
    this.#messageService.deleteState();
    
    const { count } = this.#messageService.saveBtnState();
    this.selectedFilterHandler(count-1);
    
  }

  onSaveFilterHandler() {
    this.#messageService.saveState();
    this.#messageService.notifyProductsHandler(true);
    setTimeout(() => { this.#messageService.notifyProductsHandler(false); }, 250);
  }

  selectedFilterHandler(index: number) {
    
    const data = this.productsService.getSelectedStateData(index);

    this.#messageService.resetFormState.set(true);

    this.productsService.productProperty.set(data?.prop ?? '');
    this.productsService.selectedCategoriesList.set(data?.categories ?? []);
    this.productsService.orderProp.set({ title: '', value: data?.order ?? 'asc' });

    this.#messageService.filterSelectedState(index);

  }

}
