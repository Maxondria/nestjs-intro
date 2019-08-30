import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post('add')
  async addProduct(@Body()
  postBody: {
    title: string;
    description: string;
    price: number;
  }): Promise<{ id: string }> {
    const result = await this.ProductsService.addProduct({ ...postBody });
    return result;
  }

  @Get('all')
  async getAll(): Promise<
    {
      id: any;
      title: any;
      price: any;
      description: any;
    }[]
  > {
    return await this.ProductsService.getAll();
  }

  @Get(':id')
  async getOne(
    @Param('id') id: string,
  ): Promise<{
    id: string;
    title: string;
    description: string;
    price: number;
  }> {
    return await this.ProductsService.getOne(id);
  }

  @Patch(':id')
  async updateProd(
    @Body()
    postBody: {
      title: string;
      description: string;
      price: number;
    },
    @Param('id') id: string,
  ): Promise<{
    id: string;
    title: string;
    description: string;
    price: number;
  }> {
    return await this.ProductsService.updateProd({ ...postBody, id });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<boolean> {
    return await this.ProductsService.deleteProd(id);
  }
}
