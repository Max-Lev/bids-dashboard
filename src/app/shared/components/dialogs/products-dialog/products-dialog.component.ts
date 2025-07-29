import { AfterViewInit, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/products';
import { ButtonComponent } from '../../button/button.component'; // Assuming you have this
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { IProductFormGroup, ProductDialogDataType } from '../../../../core/models/dialog.models';
import { TitleCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormErrorComponent } from '../../form-error/form-error.component';
import { KeyValue } from 'src/app/core/models/options.model';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TitleCasePipe, FormErrorComponent],
  templateUrl: './products-dialog.component.html',
})
export class ProductsDialogComponent implements OnInit, AfterViewInit {
  private dialogRef = inject(DialogRef);
  public dialogData = inject(DIALOG_DATA) as ProductDialogDataType;
  categories = computed(() => this.dialogData.categories);
  availability = computed(() => this.dialogData.availabilityStatus);

  productForm: FormGroup<IProductFormGroup> = new FormGroup(
    {
      title: new FormControl<string>(this.dialogData?.product?.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      category: new FormControl<string>(this.dialogData?.product?.category || '', [Validators.required]),
      price: new FormControl<number>(this.dialogData?.product?.price || 0, [Validators.required, Validators.min(0)]),
      discountPercentage: new FormControl<number>(this.dialogData?.product?.discountPercentage || 0, [
        Validators.min(0),
        Validators.max(100),
        Validators.required,
      ]),
      stock: new FormControl<number>(this.dialogData?.product?.stock || 0, [Validators.required, Validators.min(0)]),
      availabilityStatus: new FormControl<string>(this.dialogData?.product?.availabilityStatus, [Validators.required]),
      description: new FormControl(this.dialogData?.product?.description || ''),
    },
    {
      validators: (group: AbstractControl) => {
        const price = group.get('price')?.value;
        const category = group.get('category')?.value;
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
    this.productForm.statusChanges.subscribe((status) => {
      // console.log(this.productForm.errors);
      console.log(this.productForm);
    });
  }

  ngOnInit(): void {
    console.log(this.dialogData);
    console.log(this.dialogData.categories);
  }

  save() {
    if (this.isSubmitDisabled()) {
      return;
    }
    this.dialogRef.close(this.productForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
