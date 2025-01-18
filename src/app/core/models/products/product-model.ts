export interface ProductsModel {
  id: number,
  name: string,
  description: string,
  sku: string,
  cost: number,
  profile: ProfileTypeModel
}

export interface ProfileTypeModel {
  type: string;
}
