import { AfterViewInit, Component, computed, DestroyRef, effect, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/products';
import { ButtonComponent } from '../../button/button.component'; // Assuming you have this
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { IProductFormGroup, ProductDialogDataType } from '../../../../core/models/dialog.models';
import { TitleCasePipe } from '@angular/common';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormErrorComponent } from '../../form-error/form-error.component';
import { KeyValue } from 'src/app/core/models/options.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TitleCasePipe, FormErrorComponent],
  templateUrl: './products-dialog.component.html',
})
export class ProductsDialogComponent implements OnInit, AfterViewInit {
  destroyRef = inject(DestroyRef);
  private dialogRef = inject(DialogRef);
  public dialogData = inject(DIALOG_DATA) as ProductDialogDataType;
  categories = computed(() => this.dialogData.categories);
  availability: Signal<KeyValue[]> = computed(() => this.dialogData.availabilityStatus);
  warrantyOptions: Signal<KeyValue[]> = computed(() => this.dialogData.warrantyOptions);
  returnPolicyOptions: Signal<KeyValue[]> = computed(() => this.dialogData.returnPolicyOptions);
  shippingOptions: Signal<KeyValue[]> = computed(() => this.dialogData.shippingOptions);
  brandOptions: Signal<KeyValue[]> = computed(() => this.dialogData.brandOptions);

  productForm: FormGroup<IProductFormGroup> = new FormGroup(
    {
      title: new FormControl<string>(this.dialogData?.product?.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      category: new FormControl<string>(this.dialogData?.product?.category || '', [Validators.required]),
      brand: new FormControl<string>(this.dialogData?.product?.brand || '', [Validators.required]),
      price: new FormControl<number>(this.dialogData?.product?.price || 0, [Validators.required, Validators.min(0)]),
      discountPercentage: new FormControl<number>(this.dialogData?.product?.discountPercentage || 0, [
        Validators.min(0),
        Validators.max(100),
        Validators.required,
      ]),
      stock: new FormControl<number>(this.dialogData?.product?.stock || 0, [Validators.required, Validators.min(0)]),

      availabilityStatus: new FormControl<string>(this.dialogData?.product?.availabilityStatus, [Validators.required]),
      warrantyInformation: new FormControl<string>(this.dialogData?.product?.warrantyInformation, [Validators.required]),
      returnPolicy: new FormControl<string>(this.dialogData?.product?.returnPolicy, [Validators.required]),
      shippingInformation: new FormControl<string>(this.dialogData?.product?.shippingInformation, [Validators.required]),

      description: new FormControl(this.dialogData?.product?.description || ''),
    },
    {
      validators: (group: AbstractControl) => {
        const price = group.get('price')?.value;
        const category = group.get('category')?.value;
        const stock = group.get('stock')?.value;
        const availabilityStatus = group.get('availabilityStatus');
        if (price < 0) {
          return { minPrice: true };
        }
        if (category === '') {
          return { categoryRequired: true };
        }

        return null;
      },
    },
  );

  readonly #form = toSignal(this.productForm.statusChanges, { initialValue: this.productForm.status });

  isSubmitDisabled = computed(() => (this.#form() === 'INVALID' ? true : false));

  constructor() {
    effect(() => {
      console.log(this.productForm);
    });
  }

  categoryCtrl = signal<{ [key: string]: any } | null>(null);
  cntl!: AbstractControl<string | null, string | null> | null;

  ngAfterViewInit(): void {
    this.productForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      // console.log(this.productForm.errors);
      // console.log(this.productForm.value);
      // console.log(this.productForm.getRawValue());
    });
  }

  ngOnInit(): void {
    // console.log('dialogData: ', this.dialogData);
    this.availabilityCondition();
    this.stockCondition();
  }

  private stockCondition() {
    const stockControl = this.productForm.get('stock')!;
    const availabilityControl = this.productForm.get('availabilityStatus')!;

    // Initial sync
    if (availabilityControl.value === 'Out of Stock') {
      stockControl.enable({ emitEvent: false });
      stockControl.setValue(0, { emitEvent: false });
      stockControl.disable({ emitEvent: false });
    }

    availabilityControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((availability) => {
        if (availability === 'Out of Stock') {
          if (stockControl.disabled || stockControl.value !== 0) {
            stockControl.enable({ emitEvent: false });
            stockControl.setValue(0, { emitEvent: false });
            stockControl.disable({ emitEvent: false });
          }
        } else if (availabilityControl.valid) {
          stockControl.enable({ emitEvent: false });
        }
      });
  }

  private availabilityCondition() {
    const availabilityControl = this.productForm.get('availabilityStatus')!;
    const stockControl = this.productForm.get('stock')!;

    // Initial sync
    if (stockControl.value === 0 && availabilityControl.value !== 'Out of Stock') {
      availabilityControl.enable({ emitEvent: false });
      availabilityControl.setValue('Out of Stock', { emitEvent: false });
      availabilityControl.disable({ emitEvent: false });
    }

    stockControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((stock) => {
        if (stock === 0) {
          if (availabilityControl.disabled || availabilityControl.value !== 'Out of Stock') {
            availabilityControl.enable({ emitEvent: false });
            availabilityControl.setValue('Out of Stock', { emitEvent: false });
            availabilityControl.disable({ emitEvent: false });
          }
        } else if (stockControl.valid) {
          availabilityControl.enable({ emitEvent: false });
        }
      });
  }


  save() {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.dialogRef.close(this.productForm.getRawValue());
  }

  close() {
    this.dialogRef.close();
  }
}
