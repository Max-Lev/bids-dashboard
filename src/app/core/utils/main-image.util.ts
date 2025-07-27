export function addMainImage<T extends { images: string[] }>(product: T): T & { mainImage: string } {
    return {
      ...product,
      mainImage: product.images?.[0] ?? '',
    };
  }