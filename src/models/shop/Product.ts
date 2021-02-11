import mongoose, { Model, Document } from 'mongoose';
import IProduct from '@interfaces/shop/ProductInterface';

const ProductSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  cathegories: {
    type: [mongoose.Types.ObjectId]
  },
  display_name: {
    type: String,
    required: true
  },
  price: {
    list_price: {
      type: Number
    },
    sale_price: {
      type: Number
    }
  },
  quantity: {
    type: Number,
    default: 0,
    required: true
  },
  inSale: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  specifications: {
    type: [mongoose.Types.ObjectId]
  }
},
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});

const ProductModel :Model<Document<IProduct>> = mongoose.model('Product', ProductSchema);

export default ProductModel;