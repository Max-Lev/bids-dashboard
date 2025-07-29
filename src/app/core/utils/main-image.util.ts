import { ProductOptionsResult } from '../models/options.model';
import { Product } from '../models/products';

export function addMainImage<T extends { images: string[] }>(product: T): T & { mainImage: string } {
  return {
    ...product,
    mainImage: product.images?.[0] ?? '',
  };
}

export function ShippingOptionsFn<T extends Product>(products: T[]): ProductOptionsResult {
  const shippingSet = new Set<string>();
  const availabilitySet = new Set<string>();
  const returnPolicySet = new Set<string>();
  const warrantyInformation = new Set<string>();
  const brandSet = new Set<string>();

  for (const product of products) {
    shippingSet.add(product.shippingInformation);
    availabilitySet.add(product.availabilityStatus);
    returnPolicySet.add(product.returnPolicy);
    warrantyInformation.add(product.warrantyInformation);
    brandSet.add(product.brand);
  
  }
  

  const toKeyValueArray = (set: Set<string>) => Array.from(set).map((value, index) => ({ key: index, value }));

  return {
    shippingOptions: toKeyValueArray(shippingSet),
    availabilityStatusOptions: toKeyValueArray(availabilitySet),
    returnPolicyOptions: toKeyValueArray(returnPolicySet),
    warrantyOptions: toKeyValueArray(warrantyInformation),
    brandOptions: toKeyValueArray(brandSet),
  };
}
