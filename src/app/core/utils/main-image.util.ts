import { ProductOptionsResult } from '../models/options.model';
import { Product } from '../models/products';

export function addMainImage<T extends { images: string[] }>(product: T): T & { mainImage: string } {
  return {
    ...product,
    mainImage: product.images?.[0] ?? '',
  };
}

export function GetOptionsFn<T extends Product>(products: T[]): ProductOptionsResult {
  const shippingSet = new Set<string>();
  const availabilitySet = new Set<string>();
  const returnPolicySet = new Set<string>();
  const warrantyInformation = new Set<string>();
  const brandSet = new Set<string>();
  const brandByCategory = new Map<string,string[]>();

  for (const product of products) {
    shippingSet.add(product.shippingInformation);
    availabilitySet.add(product.availabilityStatus);
    returnPolicySet.add(product.returnPolicy);
    warrantyInformation.add(product.warrantyInformation);
    
  

    const catName = product.category;
    const brand = product.brand;
   if(brand!==undefined){
    brandSet.add(product.brand);
    if (!brandByCategory.has(catName) && 'brand' in product && product.brand) {
      brandByCategory.set(catName, []);
    }
    // Add only unique brands if needed:
    const arr = brandByCategory.get(catName)!;
    
    if (!arr.includes(brand)) {
      arr.push(brand);
    }
   }    
  }
  

  // This function takes a set of strings as an argument and returns an array of objects
  // Each object has a key and value property
  const toKeyValueArray = (set: Set<string>) => Array.from(set).map((value, index) => ({ key: index, value }));

  return {
    shippingOptions: toKeyValueArray(shippingSet),
    availabilityStatusOptions: toKeyValueArray(availabilitySet),
    returnPolicyOptions: toKeyValueArray(returnPolicySet),
    warrantyOptions: toKeyValueArray(warrantyInformation),
    brandOptions: toKeyValueArray(brandSet),
  };
}
