const { withFilter } = require("apollo-server");

const Subscription = {
  userCreated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("userCreated"),
  },
  userUpdated: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("userUpdated"),
  },
  userDeleted: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("userDeleted"),
  },
};
module.exports.Subscription = Subscription;
