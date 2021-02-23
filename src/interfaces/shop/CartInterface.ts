import { ObjectId, Document } from 'mongoose';

export interface ICartItem {
  _id: ObjectId;
  price: number;
  quantity: number;
}

declare interface ICart extends Document {
  id: ObjectId;
  last_modified: Date | string;
  status: string;
  items: ICartItem[];
  user: ObjectId;
}

export default ICart;