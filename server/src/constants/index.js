import dotenv from "dotenv";
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_NAME = process.env.MONGODB_NAME;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export * from "./user-permission";
export {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MONGODB_URL,
  MONGODB_NAME,
  JWT_SECRET_KEY,
};
