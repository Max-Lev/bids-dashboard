import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFormData } from '../dialog.models';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-products-dialog',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './products-dialog.component.html',
  styleUrl: './products-dialog.component.css',
})
export class ProductsDialogComponent {
  isOpen = false;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  productForm: ProductFormData = {
    productName: '',
    category: '',
    price: 0,
    description: '',
  };

  close() {
    debugger;
    this.isOpen = false;
    this.resetForms();
    this.onClose.emit();
  }
  saveProduct() {
    debugger;
    this.onSave.emit({ type: 'product', data: this.productForm });
    this.close();
  }

  private resetForms() {
    this.productForm = { productName: '', category: '', price: 0, description: '' };
  }
}
