import { FormControl } from '@angular/forms';

export interface DialogData {
  type: 'USER' | 'PRODUCT' | 'DELETE';
  title: string;
  data?: any;
}

export enum DIALOG_TYPE {
  product = 'PRODUCT',
  user = 'USER',
  delete = 'DELETE',
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
}

export interface IProductFormGroup {
  title: FormControl<string | null>;
  category: FormControl<string | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
}
export interface IProductFormData {
  title: string;
  category: string;
  price: number;
  description: string;
}
