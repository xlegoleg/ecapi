import { Document, ObjectId } from 'mongoose';

declare interface IProduct extends Document {
  id: ObjectId;
  name: string;
  display_name: string;
  cathegories: ObjectId[];
  price: {
    list_price: number;
    sale_price: number;
  },
  quantity: number;
  inSale: boolean;
  image: string;
  specifications: ObjectId[];
}

export default IProduct;