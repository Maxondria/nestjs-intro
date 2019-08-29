import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';

interface Prod {
  title?: string;
  description?: string;
  price?: number;
  id?: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(
    id: string,
  ): {
    product: Product;
    productIndex: number;
  } {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find product');
    return { product, productIndex };
  }

  addProduct({ title, description, price, id }: Prod): void {
    const newProduct = new Product(title, description, price, id);
    this.products.push(newProduct);
  }

  getAll(): Product[] {
    return [...this.products];
  }

  getOne(id: string): Product {
    return this.findProduct(id).product;
  }

  updateProd({ title, description, price, id }: Prod): void {
    const { product, productIndex } = this.findProduct(id);
    const updatedProduct = { ...product };

    if (title) updatedProduct!.title = title;
    if (price) updatedProduct.price = price;
    if (description) updatedProduct.description = description;

    this.products[productIndex] = updatedProduct;
  }

  deleteProd(id: string): boolean {
    const { productIndex } = this.findProduct(id);
    this.products.splice(productIndex, 1);
    return true;
  }
}
