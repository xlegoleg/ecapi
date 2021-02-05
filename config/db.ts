// mongod -f '/D/MongoDB/mongod.cfg' - to run local mongodb

import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({
  path: './config/config.env'
})

const MONGO_URL: string = process.env.MONGO_URL || '';
const DB_NAME: string = process.env.DB_NAME || '';

const DB_CONNECTOR = async () => {
  try {
    await mongoose.connect(`${MONGO_URL}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error('[MongoDB]',error.message);
    process.exit(1);
  }
};

export default DB_CONNECTOR;