import { User } from "@models";
import { PasswordHelper, generateToken } from "lib";

const pubsub = require("../../pubsub");

const Mutation = {
  // Users Mutaiton
  createUser: (parent, { data: { full_name, age } }, { db }) => {
    // const user = {
    //   id: nanoid(),
    //   full_name: full_name,
    //   age: age,
    // };
    // db.users.push(user);
    // pubsub.publish("userCreated", { userCreated: user });
    // return user;
    return {};
  },
  updateUser: (parent, { id, data }, { db }) => {
    // const user_index = db.users.findIndex((user) => user.id === id);
    // if (user_index == -1) throw new Error("User not found");
    // const updated_user = (db.users[user_index] = {
    //   ...db.users[user_index],
    //   ...data,
    // });
    // pubsub.publish("userUpdated", { userUpdated: updated_user });
    // return updated_user;
    return {};
  },
  deleteUser: (_, { id }, { db }) => {
    return {};
  },
  login: async (parent, { data: { username, password } }, { db, _db }) => {
    const user = await _db.User.findOne({ username });
    if (!user) {
      return new Error("User Notfound");
    }

    const isPasswordMatch = await PasswordHelper.checkHashedPassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return new Error("Email or Password not match");
    }
    const userData = Object.assign({}, user._doc);
    delete userData.password;
    const token = generateToken(Object.assign({}, userData));

    return { user, token };
  },
  register: async (parent, { data }, { _db }) => {
    const { email, password, fullname, username } = data;

    const hashedPassword = await PasswordHelper.getHashedPassword(password);
    const user = new User({
      email,
      fullname,
      username,
      password: hashedPassword,
    });

    const userResult = await user.save();

    pubsub.publish("userCreated", { userCreated: user });

    return user;
  },
};

module.exports.Mutation = Mutation;
