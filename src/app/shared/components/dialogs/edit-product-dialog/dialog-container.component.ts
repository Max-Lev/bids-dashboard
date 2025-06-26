import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface DialogData {
  type: 'user' | 'product' | 'delete';
  title: string;
  data?: any;
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
}

export interface ProductFormData {
  productName: string;
  category: string;
  price: number;
  description: string;
}
@Component({
  selector: 'dialog-container',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.css'
})
export class DialogContainer {
  @Input() isOpen = false;
  @Input() dialogData: DialogData = { type: 'user', title: '' };
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<void>();

  userForm: UserFormData = {
    name: '',
    email: '',
    role: 'user'
  };

  productForm: ProductFormData = {
    productName: '',
    category: '',
    price: 0,
    description: ''
  };

  close() {
    this.isOpen = false;
    this.resetForms();
    this.onClose.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  saveUser() {
    this.onSave.emit({ type: 'user', data: this.userForm });
    this.close();
  }

  saveProduct() {
    this.onSave.emit({ type: 'product', data: this.productForm });
    this.close();
  }

  confirmDelete() {
    this.onDelete.emit();
    this.close();
  }

  private resetForms() {
    this.userForm = { name: '', email: '', role: 'user' };
    this.productForm = { productName: '', category: '', price: 0, description: '' };
  }
}
