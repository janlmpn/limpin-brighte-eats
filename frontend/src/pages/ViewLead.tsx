
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import LeadDetail from '../components/LeadDetail';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import QueryResult from '../components/QueryResult';
import { GET_LEAD } from '../graphql/queries'
import { css } from '@emotion/react';

const ViewLead: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { loading, error, data } = useQuery(
    GET_LEAD, 
    {
      variables: { leadId: id || '' }
    }
  );

  const containerStyles = css`
    button {
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      background-color: #0070f3;
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    button:hover {
      background-color: #005bb5;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;

  // Example lead data (replace with data fetched from your API)

  return (
    <Layout>
      <Container css={containerStyles}>
        <button onClick={ () => navigate('/leads') }>Back to Leads</button>
        <QueryResult error={error} loading={loading} data={data}>
          <ContentSection>
            <LeadDetail lead={data?.lead} />
          </ContentSection>
        </QueryResult>
      </Container>
    </Layout>
  );
};

export default ViewLead;
