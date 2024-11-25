import { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv/config'

const config: CodegenConfig = {
  schema: process.env.VITE_APOLLO_GQL_HOST,
  documents: ["./src/graphql/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql"
      }
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;