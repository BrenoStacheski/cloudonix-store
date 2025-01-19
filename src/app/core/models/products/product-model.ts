export interface ProductsModel {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: { [key: string]: string };
}
