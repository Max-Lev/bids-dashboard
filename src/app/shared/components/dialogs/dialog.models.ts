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