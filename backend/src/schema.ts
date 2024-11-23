import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    "Fetch leads"
    leads: [Lead!]!
  }
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [String!]!
  }
`;
