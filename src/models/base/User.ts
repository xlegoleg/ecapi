import mongoose from 'mongoose';
import IUser from '@interfaces/base/UserInterface';

const UserSchema = new mongoose.Schema({
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
    enum: ['buyer', 'seller', 'admin']
  },
  location: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  }
}, 
{ toJSON: { virtuals: true }, toObject: { virtuals: true }
});

const UserModel = mongoose.model<IUser & mongoose.Document>('User', UserSchema);

export default UserModel;