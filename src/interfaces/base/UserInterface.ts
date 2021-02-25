import { Document, ObjectId, Model } from 'mongoose';
import { ITokenObject } from '@interfaces/eva/TokenObjectInterface';
export interface IUser extends Document {
  id: ObjectId;
  name: string;
  email:string;
  password: string;
  role: string;
  location: string;
  created: Date;
}

export interface IUserModel extends Model<IUser> {
  verifyPassword(password: string): Promise<boolean>;
  getAuthToken(userId: string): ITokenObject;
}
