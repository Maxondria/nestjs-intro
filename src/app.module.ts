import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://max:maxondria@cluster0-uuz34.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
