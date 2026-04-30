export interface InputCreateProductDto {
  id?: string;
  name: string;
  price: number;
  type: string;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
