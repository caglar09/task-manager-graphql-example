import { User, Workspace } from "@models";
import { PasswordHelper, generateToken } from "lib";
import { ObjectId } from "mongodb";

const pubsub = require("../../pubsub");

const Mutation = {
  // #region Users Mutaiton
  createUser: (_, { data: { full_name, age } }, { db }) => {
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
  updateUser: (_, { id, data }, { db }) => {
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
  login: async (_, { data: { username, password } }, { db, _db }) => {
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
  register: async (_, { data }, { _db }) => {
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
  // #endregion

  // #region Workspace
  createWorkspace: async (parent, { data }, { _db, user }) => {
    try {
      const { name } = data;

      const workspace = new Workspace({ name, user: ObjectId(user._id) });
      console.log(workspace);
      const authenticatedUser = await _db.User.findById(user._id);

      if (authenticatedUser) {
        authenticatedUser.workspaces.push(workspace);

        await workspace.save();
        await authenticatedUser.save();
        return workspace;
      }
      return null;
      // pubsub.publish("workspaceCreated", { workspaceCreated: user });
    } catch (error) {
      console.log(error);
    }
  },
  // #endregion
};

module.exports.Mutation = Mutation;
