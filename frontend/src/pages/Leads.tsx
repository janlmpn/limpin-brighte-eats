import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import QueryResult from '../components/QueryResult';
import LeadsTable from '../components/LeadsTable'
import { LEADS } from '../graphql/queries'
import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const Leads: React.FC = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(LEADS);

  const handleViewLead = (id: string) => {
    navigate(`/leads/${id}`);
  };

  return (
    <Layout>
      <Container>
        <h1>Leads</h1>
        <QueryResult error={error} loading={loading} data={data}>
          <ContentSection>
            <LeadsTable leads={data?.leads} onViewLead={handleViewLead} />
          </ContentSection>
        </QueryResult>
      </Container>
    </Layout>
  );
};

export default Leads;
