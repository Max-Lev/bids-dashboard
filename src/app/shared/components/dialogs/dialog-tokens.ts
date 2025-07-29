import { InjectionToken } from '@angular/core';

import { ProductsDialogComponent } from './products-dialog/products-dialog.component';
import { IProductFormGroup } from '../../../core/models/dialog.models';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');


export const DIALOG_COMPONENTS = new InjectionToken<Record<string, any>>('DIALOG_COMPONENTS', {
  factory: () => ({
    PRODUCT: ProductsDialogComponent,
  }),
});

export const PRODUCT_FORM_DATA = new InjectionToken<IProductFormGroup>('PRODUCT_FORM_DATA');
export const ON_SAVE = new InjectionToken<(data: any) => void>('ON_SAVE');
export const ON_CLOSE = new InjectionToken<() => void>('ON_CLOSE');
export const ON_DELETE = new InjectionToken<() => void>('ON_DELETE');