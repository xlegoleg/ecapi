import { Document } from 'mongoose';
declare interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  role: String;
  location: String;
  created: Date;
}

export default IUser;