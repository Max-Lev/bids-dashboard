import { NgClass, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, DestroyRef, effect, inject, input, model, OnChanges, output, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { MessageService } from '../../providers/message.service';
@Component({
  selector: 'app-products-table-form',
  imports: [
    FormsModule,
    TitleCasePipe,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './products-table-form.component.html',
  styleUrl: './products-table-form.component.css'
})
export class ProductsTableFormComponent implements AfterViewInit, OnChanges {

  categoryOptions = input<string[]>();
  productDetailsOptions = input<{ title: string, value: string }[]>();
  selectedCategory = input<string[]>();
  selectedOrder = input<{ title: string, value: string }>();
  selectedLastDefaultCategory = input<string>('');
  productProperty = input<string>();


  propertyModel = model('');
  categoryModel = model<string>('');
  orderModel = model('');

  onFilterChange = output<{ category: string; prop: string; order: string }>();

  filterModel: Signal<{ category: string; prop: string; order: string; }> = computed(() => {
    return {
      category: this.categoryModel(),
      prop: this.propertyModel(),
      order: this.orderModel()
    }
  });

  isCategoryDisabled = input<boolean>(false);

  orderOptions = input<{ title: string, value: string }[]>([]);

  @ViewChild('form') form!: NgForm;

  destroy = inject(DestroyRef);
  #messageService = inject(MessageService);

  // isActive = true;

  constructor() {

    effect(() => {
      this.onFilterChange.emit(this.filterModel());
      // this.isActive = this.#messageService.isActive();
      // console.log(this.isActive, 'isActive');
      if(this.#messageService.resetFormState()){
        debugger
        this.form.form.markAsPristine();
        console.log(this.form.form)
      }
      // console.log('filterModel: ', this.filterModel());
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.categoryModel.set(this.selectedLastDefaultCategory());
    this.orderModel.set(this.selectedOrder()?.value!);
    this.propertyModel.set(this.productProperty() ?? '');
  }
  ngAfterViewInit(): void {

    this.form.valueChanges?.pipe(takeUntilDestroyed(this.destroy)).subscribe(v => {
      // if (this.form.dirty && this.isActive) {
      // if (this.form.dirty && this.#messageService.isActive()) {
      if (this.form.dirty) {
        this.#messageService.updateSaveState(true);
      }
    });
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.categoryModel.set(value);
    // this.#messageService.updateSaveState(true);


  }
  onProductDetailsChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.propertyModel.set(value);
    // this.#messageService.updateSaveState(true);

  }



}
