import { Document, ObjectId } from 'mongoose';

declare interface IProduct extends Document {
  id: ObjectId;
  name: String;
  display_name: String;
  cathegories: ObjectId[];
  price: {
    list_price: Number;
    sale_price: Number;
  }
  inSale: boolean;
  image: String;
  specifications: ObjectId[];
}

export default IProduct;