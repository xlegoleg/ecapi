import { ObjectId, Document } from 'mongoose'

declare interface ICathegory extends Document {
  id: ObjectId;
  title: string;
  description: string;
  parents?: ObjectId[];
}

export default ICathegory;