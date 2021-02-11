import { ObjectId, Document } from 'mongoose'

declare interface ISpecification extends Document {
  id: ObjectId;
  type: String;
  display_type: String;
  value: String | Number;
}

export default ISpecification;