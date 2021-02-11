import mongoose, { Model, Document } from 'mongoose';
import ISpecification from '@interfaces/shop/SpecificationInterface';

const SpecificationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  type: {
    type: String,
    required: true
  },
  display_type: {
    type: String,
    required: true
  },
  value: {
    type: String || Number,
    required: true
  }
},
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});

const SpecificationModel: Model<Document<ISpecification>> = mongoose.model('Specification', SpecificationSchema);

export default SpecificationModel;