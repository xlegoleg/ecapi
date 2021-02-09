import { ObjectId, Document } from 'mongoose'

declare interface ICathegory extends Document {
  id: ObjectId;
  title: String;
  description: String;
  parents?: ObjectId[];
}

export default ICathegory;