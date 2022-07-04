import { Schema, model, SchemaTypes } from "mongoose";
import { emailValidate, usernameValidate } from "@validators";
const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidate,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: usernameValidate,
    },
    password: {
      type: String,
      required: true,
    },
    workspaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
