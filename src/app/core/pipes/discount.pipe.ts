import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: Product, ...args: unknown[]): number | null {
    // return null;
    if (value?.price || value?.discountPercentage)
      return +(value?.price - (value?.price * value?.discountPercentage / 100)).toFixed(2);
    return value.price;
  }

}
