const Query = {
  users: async (parent, args, { db, _db }) => {
    const users = await _db.User.find();
    return users ?? [];
  },
  user: async (parent, args, { db, _db }) => await _db.User.findById(args.id),
};

module.exports.Query = Query;
