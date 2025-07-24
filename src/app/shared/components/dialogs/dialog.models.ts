export interface DialogData {
  type: 'USER' | 'PRODUCT' | 'DELETE';
  title: string;
  data?: any;
}

export enum DIALOG_TYPE 
{
  product = 'PRODUCT',
  user='USER',
  delete='DELETE'
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