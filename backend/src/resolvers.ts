import { Resolvers } from "./types";
import { v4 as uuidv4  } from "uuid";

export const resolvers: Resolvers = {
  Query: {
    leads: (_, __, { dataSources }) =>{
      return dataSources.leadLoader.getLeads();
    },
    lead: (_, {id}, { dataSources }) =>{
      return dataSources.leadLoader.getLead(id);
    }
  },
  Mutation: {
    insertLead: async (_, { name, email, mobile, postcode, services }, { dataSources }) => {
      try {
        const newLead = {
          id: uuidv4(),
          name,
          email,
          mobile,
          postcode,
          services,
        };

        const lead = await dataSources.leadLoader.insertLead(newLead);

        return {
          code: 200,
          success: true,
          message: `Successfully added new lead ${newLead.id}`,
          lead,
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: err.sqlMessage || err,
          lead: null,
        };
      }
    },
  },
  Lead: {
    services: ({ id }, _, { dataSources }) => {
      return dataSources.leadLoader.getLeadServices(id);
    },
  },
};
