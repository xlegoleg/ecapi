import mongoose, { Document, Model } from 'mongoose';
import IPost from '@interfaces/blog/PostInterface';
import { dateWithCurrentTimeZone } from '@utils/dates';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  created: {
    type: String,
    default: dateWithCurrentTimeZone(),
  }
},
{ toJSON: { virtuals: true, versionKey: false }, toObject: { virtuals: true, versionKey: false }
});

const PostModel: Model<Document<IPost>> = mongoose.model('Post', PostSchema);

export default PostModel;