import { model } from "mongoose";
const emailValidate = {
  validator: async (value) => {
    const findedUser = await model("User").findOne({ email: value });
    return !findedUser;
  },
  message: "That Email is taked.",
};

const usernameValidate = {
  validator: async (value) => {
    const findedUser = await model("User").findOne({ username: value });
    return !findedUser;
  },
  message: "That username is taked.",
};

export { emailValidate, usernameValidate };
