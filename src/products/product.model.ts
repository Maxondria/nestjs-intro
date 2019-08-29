import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public id: string = new Date().toString(),
  ) {}
}
