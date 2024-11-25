/** @jsxImportSource @emotion/react */
import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import QueryResult from '../components/QueryResult';
import { gql } from "../__generated__";
import { useQuery } from "@apollo/client";

export const LEADS = gql(`
  query GetLeads{
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
  }
`);

const Leads: React.FC = () => {
  const { loading, error, data } = useQuery(LEADS);

  return (
    <Layout>
      <Container>
        <h1>Leads</h1>
        <QueryResult error={error} loading={loading} data={data}>
          <ContentSection>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {data?.leads?.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ContentSection>
        </QueryResult>
      </Container>
    </Layout>
  );
};

export default Leads;
