import { Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/core/models/products';
import { ButtonComponent } from '../../button/button.component'; // Assuming you have this
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { IProductFormGroup } from '../dialog.models';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    ButtonComponent,
    TitleCasePipe
  ],
  templateUrl: './products-dialog.component.html',
})
export class ProductsDialogComponent implements OnInit {
  private dialogRef = inject(DialogRef);
  public dialogData = inject(DIALOG_DATA) as { product: Product; categories: string[] };
  categories = computed(() => this.dialogData.categories);

  productForm: FormGroup<IProductFormGroup> = new FormGroup({
    title: new FormControl(this.dialogData?.product?.title || ''),
    category: new FormControl(this.dialogData?.product?.category || ''),
    price: new FormControl(this.dialogData?.product?.price || 0),
    description: new FormControl(this.dialogData?.product?.description || ''),
  });

  ngOnInit(): void {
    console.log(this.dialogData);
    console.log(this.dialogData.categories);
  }

  save() {
    this.dialogRef.close(this.productForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  compareFn(c1: string, c2: string): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
}

}

// import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DIALOG_TYPE, ProductFormData } from '../dialog.models';
// import { ButtonComponent } from '../../button/button.component';
// import { PRODUCT_FORM_DATA, ON_SAVE, ON_CLOSE } from '../dialog-tokens';

// @Component({
//   selector: 'app-products-dialog',
//   imports: [FormsModule, ButtonComponent],
//   templateUrl: './products-dialog.component.html',
//   styleUrl: './products-dialog.component.css',
// })
// export class ProductsDialogComponent implements OnInit, OnChanges {
//   form = inject(PRODUCT_FORM_DATA); // ✅ Now using typed token
//   private onSave = inject(ON_SAVE);
//   private onClose = inject(ON_CLOSE);

//   ngOnInit(): void {
//       console.log(this.form);
//       console.log(this.onSave);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     console.log(changes);
//   }

//   saveProduct() {
//     debugger
//     this.onSave({ type: DIALOG_TYPE.product, data: this.form });
//     this.onClose(); // Close the dialog
//   }

//   close() {
//     this.onClose(); // Close the dialog
//   }

// }
