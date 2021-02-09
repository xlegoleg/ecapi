import mongoose, { Model, Document } from 'mongoose';
import ICathegory from '@interfaces/shop/CathegoryInterface';

const CathegorySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  parents: {
    type: [mongoose.Schema.Types.ObjectId]
  },
},
{ toJSON: { virtuals: true }, toObject: { virtuals: true }
});

const CathegoryModel :Model<Document<ICathegory>> = mongoose.model('Cathegory', CathegorySchema);

export default CathegoryModel;