import { NgClass, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, computed, DestroyRef, effect, inject, input, model, OnChanges, output, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuService } from 'src/app/modules/layout/services/menu.service';
import { debounceTime } from 'rxjs';
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


  propOption = model('');
  categoryOption = model('');
  orderOption = model('');

  onFilterChange = output<{ category: string; prop: string; order: string }>();

  filterModel: Signal<{ category: string; prop: string; order: string; }> = computed(() => {
    return {
      category: this.categoryOption(),
      prop: this.propOption(),
      order: this.orderOption()
    }
  });

  isCategoryDisabled = input<boolean>(false);

  orderOptions = input<{ title: string, value: string }[]>([]);

  @ViewChild('form') form!: NgForm;

  destroy = inject(DestroyRef);
  menuService = inject(MenuService);

  constructor() {

    effect(() => {
      this.onFilterChange.emit(this.filterModel());
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.categoryOption.set(this.selectedLastDefaultCategory());
    this.orderOption.set(this.selectedOrder()?.value!);
    this.propOption.set(this.productProperty() ?? '');
  }
  ngAfterViewInit(): void {

    this.form.valueChanges?.pipe(debounceTime(100), takeUntilDestroyed(this.destroy)).subscribe(v => {
      console.log(v);
      const isDirty = this.form.dirty;
      console.log(this.form.dirty);
      if (isDirty && !this.menuService.isNftSaveActive().active) {
        this.menuService.isNftSaveActive.update((value: { active: boolean; count: number; }) => {
          value = { ...value, ...{active: isDirty, 
            count: value.count+1
          } };
          return value;
        });
      }
    });
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value
    this.categoryOption.set(value);


  }
  onProductDetailsChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.propOption.set(value);

  }

}
