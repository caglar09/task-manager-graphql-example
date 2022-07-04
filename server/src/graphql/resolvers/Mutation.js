import { User, Workspace, WorkspaceUser } from "@models";
import { PasswordHelper, generateToken } from "lib";
import { ObjectId } from "mongodb";

const pubsub = require("../../pubsub");

const Mutation = {
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
    try {
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
    } catch (error) {
      return new Error(error);
    }
  },
  // #endregion

  // #region Workspace
  createWorkspace: async (parent, { data }, { _db, user }) => {
    try {
      const { name } = data;

      const workspace = new Workspace({ name, user: ObjectId(user._id) });

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

  updateWorkspace: async (parent, { data }, { _db, user }) => {
    try {
      const { name, id } = data;

      const updateResult = await _db.Workspace.updateOne(
        { id, user: user._id },
        { $set: { name } }
      );

      if (updateResult.matchedCount === 0) {
        return new Error("Workspace Not Found");
      }

      if (updateResult.modifiedCount > 0) {
        const updatedWorkspace = await _db.Workspace.findById(id).populate(
          "user"
        );
        return updatedWorkspace.toJSON({ virtuals: true });
      }

      return new Error("Workspace not updated");
    } catch (error) {
      console.log(error);
    }
  },

  deleteWorkspace: async (parent, { data }, { _db, user }) => {
    const { id } = data;

    const authenticatedUser = await User.findById(user._id);

    if (authenticatedUser) {
      const deletingWorspaceIndex = authenticatedUser.workspaces.findIndex(
        (workspaceId) => workspaceId.toString?.() === id
      );

      const workspace = await Workspace.findOne({
        _id: id,
        user: user._id,
      });

      if (deletingWorspaceIndex === -1 || !workspace) {
        return new Error("Workspace Not Found");
      }

      authenticatedUser.workspaces.splice(deletingWorspaceIndex, 1);

      if (workspace) {
        const deletingWorkspace = await workspace.delete({
          returnOriginal: true,
        });

        await authenticatedUser.save();

        return workspace;
      }
    }
  },
  // #endregion

  // #region WorkspaceUser
  addUserOnTheWorkspace: async (parent, { data }, { _db, user }) => {
    try {
      const { workspaceId, userId, permissions = [] } = data;

      const findedWorkspace = await Workspace.findById(workspaceId);
      const findedUser = await User.findById(userId);

      if (!findedWorkspace) {
        return new Error("Workspace not found");
      }

      if (!findedUser) {
        return new Error("User not found");
      }

      if (!permissions || permissions?.length === 0) {
        return new Error("User permissions can't null");
      }

      const workspaceUser = new WorkspaceUser({
        user: userId,
        workspace: workspaceId,
        permissions,
      });

      const validationResult = await workspaceUser.validate();
      if (validationResult) {
        return validationResult;
      }

      findedWorkspace.workspaceUsers.push(workspaceUser.id);

      await workspaceUser.save();
      await findedWorkspace.save();

      return workspaceUser;
    } catch (error) {
      return error;
    }
  },
  // #endregion
};

module.exports.Mutation = Mutation;
