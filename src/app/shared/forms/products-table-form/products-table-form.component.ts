import { NgClass, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, input, model, OnChanges, output, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-products-table-form',
  imports: [
    FormsModule,
    TitleCasePipe,
    MatSelectModule,
    MatChipsModule,
    NgClass
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

  detailsOption = model('rating');
  categoryOption = model('');
  orderOption = model('');

  onFilterChange = output<{ category: string; details: string; order: string }>();

  filterModel: Signal<{ category: string; details: string; order: string; }> = computed(() => {
    return {
      category: this.categoryOption(),
      details: this.detailsOption(),
      order: this.orderOption()
    }
  });

  isCategoryDisabled = input<boolean>(false);

  orderOptions = input<{ title: string, value: string }[]>([]);

  @ViewChild('form') form!: NgForm;

  constructor() {

    effect(() => {
      this.onFilterChange.emit(this.filterModel());
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.categoryOption.set(this.selectedLastDefaultCategory());
    this.orderOption.set(this.selectedOrder()?.value!);
  }
  ngAfterViewInit(): void {

  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.categoryOption.set(value);


  }
  onProductDetailsChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.detailsOption.set(value);

  }

}
