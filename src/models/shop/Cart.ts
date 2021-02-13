import mongoose, { Model, Document } from 'mongoose';
import ICart from '@interfaces/shop/CartInterface';

const CartSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  last_modified: {
    type: Date
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
      quantity: Number
    }]
  }
},
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});

const CartModel: Model<Document<ICart>> = mongoose.model('Cart', CartSchema);

export default CartModel;