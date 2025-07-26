import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/core/models/products';
import { ButtonComponent } from '../../button/button.component'; // Assuming you have this
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { IProductFormGroup } from '../dialog.models';



@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, ButtonComponent
  ],
  templateUrl: './products-dialog.component.html',
})
export class ProductsDialogComponent {
  private dialogRef = inject(DialogRef);
  public data: { product: Product } = inject(DIALOG_DATA);

  productForm:FormGroup<IProductFormGroup> = new FormGroup({
    title: new FormControl(this.data?.product?.title || ''),
    category: new FormControl(this.data?.product?.category || ''),
    price: new FormControl(this.data?.product?.price || 0),
    description: new FormControl(this.data?.product?.description || ''),
  });

  save() {
    this.dialogRef.close(this.productForm.value);
  }

  close() {
    this.dialogRef.close();
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
