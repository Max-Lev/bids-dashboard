import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, input, model, OnInit, Signal, signal } from '@angular/core';
import { Nft } from '../../../models/nft';
import { NftAuctionsTableItemComponent } from '../nft-auctions-table-item/nft-auctions-table-item.component';
import { Product } from 'src/app/core/models/products';
import { FormsModule } from '@angular/forms';
import { ProductsTableFormComponent } from 'src/app/shared/forms/products-table-form/products-table-form.component';
import { ProductsService } from 'src/app/core/services/products.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ChipsComponent } from 'src/app/shared/components/chips/chips.component';
import { MessageService } from 'src/app/shared/providers/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: '[nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
  imports: [
    NgFor,
    NftAuctionsTableItemComponent,
    NgIf,
    FormsModule,
    ProductsTableFormComponent,
    ChipsComponent,
    TitleCasePipe,
    AngularSvgIconModule,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftAuctionsTableComponent implements OnInit {

  cdr = inject(ChangeDetectorRef);
  #messageService = inject(MessageService);

  #productsService = inject(ProductsService);

  filteredProducts = input<Product[]>();
  categoryOptions = input<string[]>();
  orderOptions = input<{ title: string, value: string }[]>([]);
  productDetailsOptions = input<{ title: string, value: string }[]>();

  productProperty = this.#productsService.productProperty;
  selectedCategory = this.#productsService.selectedCategory;
  selectedOrder = this.#productsService.orderProp;
  selectedLastDefaultCategory = this.#productsService.selectedLastDefaultCategory;
  isCategoryDisabled = computed(() => (this.#productsService.selectedCategory().length > 4) ? true : false);

  constructor() {

  }

  ngOnInit(): void {
    
  }


  filterChangeHandler(event: { category: string; prop: string; order: string }) {
    const { category, prop, order } = event;
    this.#productsService.updateFilterHandler(category, prop as keyof Product, order);
  }

  onChipsSelected(item: string) {
    this.#productsService.removeSelectedCategory(item);
    this.#messageService.onChangeState();

  }

}
