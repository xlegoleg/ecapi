import { Document, ObjectId } from 'mongoose';
declare interface IUser extends Document {
  id: ObjectId;
  name: String;
  email: String;
  password: String;
  role: String;
  location: String;
  created: Date;
}

export default IUser;