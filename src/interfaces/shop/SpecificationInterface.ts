import { ObjectId, Document } from 'mongoose'

declare interface ISpecification extends Document {
  id: ObjectId;
  type: string;
  display_type: string;
  value: string | number;
}

export default ISpecification;