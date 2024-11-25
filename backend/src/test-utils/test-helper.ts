import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from '..';
import { LeadLoader } from '../dataloaders'

interface ContextValue {
  dataSources: {
    leadLoader: LeadLoader;
  };
}
export const createTestServer = async () => {
  const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
    stopOnTerminationSignals: true
  });
  await server.start();

  return server;
};
