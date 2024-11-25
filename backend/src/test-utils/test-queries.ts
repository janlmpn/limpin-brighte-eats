import gql from 'graphql-tag';

export const insertLeadGQL = gql`
  mutation InsertLead($name: String!, $email: String!, $mobile: String!, $postcode: String!, $services: [String!]!) {
    insertLead(
      name: $name
      email: $email
      mobile: $mobile
      postcode: $postcode
      services: $services
    ) {
      code
      success
      message
      lead {
        id
        name
        email
        mobile
        postcode
        services {
          id
          name
        }
      }
    }
  }
`;
export const getLeadsGQL = gql`
  query Leads {
    leads {
      id
      name
      email
      mobile
      postcode
      services {
        id
        name
      }
    }
  }
`;

export const getSpecificLead = gql`
  query Lead($leadId: ID!) {
    lead(id: $leadId) {
      id
      name
      email
      mobile
      postcode
      services {
        id
        name
      }
    }
  }
`;