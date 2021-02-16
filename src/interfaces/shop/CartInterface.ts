import { ObjectId, Document } from 'mongoose';

export interface ICartItem {
  _id: ObjectId;
  price: Number;
  quantity: Number;
}

declare interface ICart extends Document {
  id: ObjectId;
  last_modified: Date | String;
  status: String;
  items: ICartItem[];
  user: ObjectId;
}

export default ICart;