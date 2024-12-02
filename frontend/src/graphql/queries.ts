import { gql } from "../__generated__";

export const GET_SERVICES = gql(`
  query GetServices {
    services {
      id
      name
    }
  }
`);

export const LEADS = gql(`
  query GetLeads($limit: Int!, $offset: Int!){
    leads(limit: $limit, offset: $offset) {
      leads {
        id
        email
        name
        mobile
        postcode
        services  {
          id
          name
        }
      }
      totalCount
    }
    
  }
`);

export const GET_LEAD_BY_EMAIL = gql(`
  query LeadByEmail($email: String!) {
    leadByEmail(email: $email) {
      id
      email
      name
      mobile
      postcode
      services  {
        id
        name
      }
    }
  }
`);

export const GET_LEAD = gql(`
  query LeadByID($leadId: ID!) {
    lead(id: $leadId) {
      id
      email
      name
      mobile
      postcode
      services  {
        id
        name
      }
    }
  }
`);