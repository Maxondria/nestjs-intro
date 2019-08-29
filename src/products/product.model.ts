export class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public id: string = new Date().toString(),
  ) {}
}
