import { ObjectId, Document } from 'mongoose'

declare interface ISpecification extends Document {
  id: ObjectId;
  type: String;
  value: String | Number;
}

export default ISpecification;