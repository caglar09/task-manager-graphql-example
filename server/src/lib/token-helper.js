import { sign, verify } from "jsonwebtoken";

import { JWT_SECRET_KEY } from "@constants";

const generateToken = (userData) => {
  let token = null;
  try {
    token = sign(userData, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log("generateToken içinde error", error, userData);
  }
  return token;
};

const verifyToken = (token) => {
  let verified;
  try {
    verified = verify(token, JWT_SECRET_KEY);
  } catch (error) {
    console.log("verifyToken içinde error", error, token);
  }
  return verified;
};

export { generateToken, verifyToken };
