import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, Input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { NftAuctionsTableComponent } from '../../components/nft/nft-auctions-table/nft-auctions-table.component';
import { NftChartCardComponent } from '../../components/nft/nft-chart-card/nft-chart-card.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderOptions, Product, ProductDetailsOption as ProductDetailsOptions, Products } from 'src/app/core/models/products';
import { ColumnsChartComponent } from 'src/app/shared/graphs/columns-chart/columns-chart.component';
import { MessageService } from 'src/app/shared/providers/message.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [
    NftHeaderComponent,
    NftDualCardComponent,
    NftSingleCardComponent,
    NftChartCardComponent,
    NftAuctionsTableComponent,
    ColumnsChartComponent,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductsComponent implements OnInit,OnChanges {

  productDetailsOptions = signal(ProductDetailsOptions);
  orderOptions = signal(OrderOptions);

  productsService = inject(ProductsService);

  router = inject(Router);

  filteredProductsCategories = toSignal(
    this.productsService.getFilteredProductsCategories(), {
    initialValue: { products: [], categories: [] }
  });

  category = computed(() => this.filteredProductsCategories()?.categories);
  products = computed(() => this.filteredProductsCategories()?.products);

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

  topResults = computed(() => this.filteredProducts().slice(0, 3));

  constructor() {

    effect(() => {
      const data = this.graphData();
      if (data?.products?.length > 0) {
        this.cdr.markForCheck();
      }
    });
    effect(() => {
      // console.log('filteredProducts ',this.filteredProducts());
      console.log('filteredProductsCategories ',this.filteredProductsCategories());
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('dashboardResolver ',this.dashboardResolver);
  }

  ngOnInit(): void {

  }

  onDeleteSelectedHandler(index: number) {

    this.productsService.deleteSavedFilter(index);
    this.#messageService.deleteState();

    const { count } = this.#messageService.saveBtnState();
    this.filterSelectedHandler(count - 1);

  }

  onSaveFilterHandler() {
    this.#messageService.saveState();
    this.#messageService.notifyProductsHandler(true);
    setTimeout(() => { this.#messageService.notifyProductsHandler(false); }, 250);
  }

  filterSelectedHandler(index: number) {
    const { length } = this.productsService.savedFilterState();
    this.#messageService.saveBtnState.update(state => ({ ...state, count: length }));

    this.#messageService.resetFormState.set(true);

    const data = this.productsService.getSelectedStateData(index);
    this.productsService.productProperty.set(data?.prop ?? '');
    this.productsService.selectedCategoriesList.set(data?.categories ?? []);
    this.productsService.orderProp.set({ title: '', value: data?.order ?? 'asc' });

    this.#messageService.onSaveBtnSelectedState(index);

  }

  onMainBtnClickHandler(product:Product){
    this.router.navigateByUrl('/dashboard/products/' + product!.id)
  }

}
