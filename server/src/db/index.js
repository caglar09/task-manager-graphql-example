import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

import { MONGODB_URL, MONGODB_NAME } from "@constants";

export default () => {
  const client = mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
    dbName: MONGODB_NAME,
  });

  mongoose.connection.on("open", () => {
    console.log("mongodb connection successfully");
  });

  mongoose.connection.on("err", () => {
    console.log("mongodb connection closed");
  });

  return client;
};
