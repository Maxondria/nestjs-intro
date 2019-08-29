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
  addProduct(@Body()
  postBody: {
    title: string;
    description: string;
    price: number;
  }): { id: string } {
    const id = new Date().toString();
    this.ProductsService.addProduct({ ...postBody, id });
    return { id };
  }

  @Get('all')
  getAll() {
    return this.ProductsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Product {
    return this.ProductsService.getOne(id);
  }

  @Patch(':id')
  updateProd(
    @Body()
    postBody: {
      title: string;
      description: string;
      price: number;
    },
    @Param(':id') id: string,
  ) {
    this.ProductsService.updateProd({ ...postBody, id });
    return true;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): boolean {
    return this.ProductsService.deleteProd(id);
  }
}
