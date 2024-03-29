import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from '@interfaces/base/UserInterface';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dateWithCurrentTimeZone } from '@utils/dates';

dotenv.config({
  path: './config/config.env'
})

const UserSchema = new mongoose.Schema<IUser & IUserModel>({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email exists in database'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true
  },
  role: {
    type: String,
    default: 'buyer',
    enum: ['buyer', 'admin']
  },
  location: {
    type: String
  },
  created: {
    type: String,
    default: dateWithCurrentTimeZone()
  }
}, 
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});


UserSchema.pre<IUser>("save", async function(next) {
  if (!this.modifiedPaths().includes("password")) {
    next();
  }
  const saltedPass = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltedPass);
  next();
});

UserSchema.methods.verifyPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getAuthToken = function (userId: ObjectId) {
  const secretKey: string = String(process.env.JWT_SECRET);
  const lifeCycle: string = String(process.env.JWT_LIFE);
  return {
    token: jwt.sign({ data: userId }, secretKey, {
      expiresIn: lifeCycle,
    }),
    expiresIn: lifeCycle,
  }
};

const UserModel: Model<IUser & IUserModel> = mongoose.model<IUser & IUserModel>('User', UserSchema);

export default UserModel;