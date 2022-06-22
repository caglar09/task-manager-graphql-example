import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const isNotAuthenticated = rule()((parent, args, { user }) => {
  return !user;
});

const permissions = shield({
  Query: {
    users: isAuthenticated,
    user: isAuthenticated,
    workspaces: isAuthenticated,
  },
  Mutation: {
    updateUser: isAuthenticated,
    createWorkspace: isAuthenticated,
    login: isNotAuthenticated,
    register: isNotAuthenticated,
  },
});

export { permissions };
