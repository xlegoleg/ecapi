// mongod -f '/D/MongoDB/mongod.cfg' - to run local mongodb

import mongoose from 'mongoose'

const MONGO_URL: string = process.env.MONGO_URL || '';

const DB_CONNECTOR = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = DB_CONNECTOR;