import mongoose, { Model, Document } from 'mongoose';
import ISpecification from '@interfaces/shop/SpecificationInterface';

const SpecificationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId
  },
  type: {
    type: String
  },
  value: {
    type: String || Number,
  }
});

const SpecificationModel: Model<Document<ISpecification>> = mongoose.model('Specification', SpecificationSchema);

export default SpecificationModel;