import { ObjectId, Document } from 'mongoose';

export interface ICartItem {
  _id: ObjectId;
  quantity: Number;
}

declare interface ICart extends Document {
  id: ObjectId;
  last_modified: Date;
  status: String;
  items: ICartItem[];
}

export default ICart;