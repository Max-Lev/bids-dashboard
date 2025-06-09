import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, effect, input, model, output, Signal, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-products-table-form',
  imports: [
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './products-table-form.component.html',
  styleUrl: './products-table-form.component.css'
})
export class ProductsTableFormComponent implements AfterViewInit {

  categoryOptions = input<string[]>();
  productDetailsOptions = input<{ id: number, value: string }[]>();

  categoryOption = model('');
  detailsOption = model('');

  // onFilterChange = output<Signal<{ category: string; details: string; }>>();
  onFilterChange = output<{ category: string; details: string; }>();

  filterModel: Signal<{ category: string; details: string; }> = computed(() => {
    return {
      category: this.categoryOption(),
      details: this.detailsOption()
    }
  });

  @ViewChild('form') form!: NgForm;

  constructor() {
    effect(() => {
      // const model = this.filterModel;
      this.onFilterChange.emit(this.filterModel());
      // console.log(this.filterModel());
    });
  }
  ngAfterViewInit(): void {
    
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.categoryOption.set(value)

  }
  onProductDetailsChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.detailsOption.set(value);

  }

}
