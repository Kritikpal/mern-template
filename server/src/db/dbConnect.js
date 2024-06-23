import mongoose from "mongoose";
import {
  MONGO_DATABASE,
  MONGO_FULL_CONNECTION_STRING,
} from "../config/mongoConfig.js";

const connectToMongoDb = async () => {
  await mongoose.connect(MONGO_FULL_CONNECTION_STRING);
};
// cereate indexs
export { connectToMongoDb };
