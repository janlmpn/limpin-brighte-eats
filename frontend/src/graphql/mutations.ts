import { gql } from "../__generated__";

export const INSERT_LEAD = gql(`
  mutation InsertLead(
    $name: String!
    $email: String!
    $mobile: String!
    $postcode: String!
    $services: [String!]!
  ) {
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
`);
