import mongoose, { Model, Document } from 'mongoose';
import ICart from '@interfaces/shop/CartInterface';
import { convertDateFromTimestamp } from '@utils/dates';

const CartSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  last_modified: {
    type: Date || String,
    default: convertDateFromTimestamp(Date.now())
  },
  status: {
    type: String,
    enum: ['active', 'wait', 'rejected'],
    required: true,
    default: 'active'
  },
  items: {
    type: [{
      id: mongoose.Types.ObjectId,
      price: Number,
      quantity: Number
    }]
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
},
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});

const CartModel: Model<Document<ICart>> = mongoose.model('Cart', CartSchema);

export default CartModel;