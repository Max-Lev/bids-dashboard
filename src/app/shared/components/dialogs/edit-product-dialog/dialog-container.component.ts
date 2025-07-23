import { NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
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
    NgIf,
    ButtonComponent,
    ReactiveFormsModule
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
    if (event.target !== event.currentTarget) {
      this.close();
    }
  }

  saveUser() {
    this.onSave.emit({ type: 'user', data: this.userForm });
    this.close();
  }

  saveProduct() {
    debugger
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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isOpen) {
      this.close();
    }
  }

  prdForm = new FormGroup<{
    productName: FormControl<string | null>;
    category: FormControl<string | null>;
    price: FormControl<number | null>; description: FormControl<string | null>;
  }>({
    productName: new FormControl<string>('',),
    category: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl('')
  })




}
