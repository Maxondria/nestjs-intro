import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly ProductModel: Model<Product>,
  ) {}

  private async findProduct(id: string): Promise<Product> {
    try {
      return await this.ProductModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
  }

  async addProduct({ title, description, price }): Promise<{ id: string }> {
    const newProduct = new this.ProductModel({ title, description, price });
    const result = await newProduct.save();
    return { id: result.id };
  }

  async getAll(): Promise<
    {
      id: any;
      title: any;
      price: any;
      description: any;
    }[]
  > {
    const products = await this.ProductModel.find().exec();
    const cleanData = product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
    });
    return products.map(cleanData);
  }

  async getOne(
    id: string,
  ): Promise<{
    id: string;
    title: string;
    description: string;
    price: number;
  }> {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProd({ title, description, price, id }) {
    const product = await this.findProduct(id);

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    product.save();

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async deleteProd(_id: string): Promise<boolean> {
    await this.ProductModel.deleteOne({ _id }).exec();
    return true;
  }
}
