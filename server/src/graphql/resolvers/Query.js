const Query = {
  users: async (_, __, { _db, user }) => {
    try {
      const users = await _db.User.find().populate({
        path: "workspaces",
        populate: {
          path: "user",
          model: "User",
        },
      });
      console.log(JSON.stringify(users, null, 4));
      return users ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  user: async (_, args, { _db }) => {
    const user = await _db.User.findById(args.id).populate({
      path: "workspaces",
      populate: {
        path: "user",
      },
      options: { strictPopulate: true },
    });
    return user;
  },
  workspaces: async (_, __, { _db, user }) => {
    return await _db.Workspace.find({ user: user?._id }).populate("user");
  },
};

module.exports.Query = Query;
