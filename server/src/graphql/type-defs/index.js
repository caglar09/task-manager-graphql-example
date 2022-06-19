// ./graphql/typeDefs.js
import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname), {
  extensions: ["graphql"],
});

// const typeDefs = mergeTypeDefs(typesArray);

// export { typeDefs };

module.exports = mergeTypeDefs(typesArray);
