import { FormControl } from '@angular/forms';
import { KeyValue } from 'src/app/core/models/options.model';
import { Product } from 'src/app/core/models/products';

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
  discountPercentage: FormControl<number | null>;
  description: FormControl<string | null>;
  stock: FormControl<number | null>;
  availabilityStatus: FormControl<string | null>;
  warrantyInformation: FormControl<string | null>;
  returnPolicy: FormControl<string | null>;
  shippingInformation: FormControl<string | null>;
  brand: FormControl<string | null>;
}
export interface IProductFormData {
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  description: string;
  stock: number;
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  brand: string;
}

export type ProductDialogDataType = {
  product: Product;
  categories: string[];
  availabilityStatus: KeyValue[];
  shippingOptions: KeyValue[];
  returnPolicyOptions: KeyValue[];
  warrantyOptions: KeyValue[];
  brandOptions: KeyValue[];
};
