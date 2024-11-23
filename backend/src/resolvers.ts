import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    leads: (_, __, { dataSources }) =>{
      return dataSources.leadLoader.getLeads();
    }
  },
};
