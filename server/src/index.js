import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/federation";
import { applyMiddleware } from "graphql-middleware";

import pubsub from "./pubsub";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/type-defs";

// TODO: kaldırılacak.
import db from "./data";

import mongoDb from "@db";
const client = mongoDb();

import { User, Workspace, WorkspaceUser } from "@models";
import { permissions } from "@q/index";
import { verifyToken } from "@lib";

const _db = {
  provider: client,
  User,
  Workspace,
  WorkspaceUser,
};

const subgraphSchema = buildSubgraphSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema: applyMiddleware(subgraphSchema, permissions),
  context: async ({ req, res, connection }) => {
    let authenticatedUser = null;
    const authorization = req.headers.authorization;
    const token = authorization?.split?.(" ")?.[1];
    if (token) {
      const verifyResult = verifyToken(token);

      if (verifyResult) {
        const { _id } = verifyResult;
        const findedUser = await User.findById(_id);
        if (findedUser) {
          authenticatedUser = findedUser.toJSON();
        }
      }
    }

    return { pubsub, db, _db, user: authenticatedUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
