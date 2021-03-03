import { Document, ObjectId } from 'mongoose';

declare interface IPost extends Document {
  id: ObjectId;
  title: string;
  description: string;
  image: string;
  created: string;
}

 export default IPost;