import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DIALOG_TYPE, ProductFormData } from '../dialog.models';
import { ButtonComponent } from '../../button/button.component';
import { PRODUCT_FORM_DATA, ON_SAVE, ON_CLOSE } from '../dialog-tokens';

@Component({
  selector: 'app-products-dialog',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.css',
})
export class ProductsDialogComponent implements OnInit, OnChanges {
  form = inject(PRODUCT_FORM_DATA); // ✅ Now using typed token
  private onSave = inject(ON_SAVE);
  private onClose = inject(ON_CLOSE);

  ngOnInit(): void {
      console.log(this.form);
      console.log(this.onSave);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  saveProduct() {
    debugger
    this.onSave({ type: DIALOG_TYPE.product, data: this.form });
    this.onClose(); // Close the dialog
  }

  close() {
    this.onClose(); // Close the dialog
  }

}
