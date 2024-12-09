import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    "Fetch leads"
    leads(offset: Int, limit: Int): LeadsPagination
    "Fetch a single lead by its ID"
    lead(id: ID!): Lead
    "Fetch a single lead by its email"
    leadByEmail(email: String!): Lead
    "Get valid options for services"
    services: [Service!]!
  }
  type Mutation {
    insertLead(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      services: [String!]!
    ): InsertLeadResponse!
  }
  type InsertLeadResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly added or updated after a successful mutation"
    lead: Lead
  }
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service!]!
  }
  type LeadsPagination {
    leads: [Lead!]
    totalCount: Int!
  }
  type Service {
    id: ID!
    name: String!
  }
`;
