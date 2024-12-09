import React, { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import QueryResult from '../components/QueryResult';
import LeadsTable from '../components/LeadsTable'
import { LEADS } from '../graphql/queries'
import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { Lead } from '../__generated__/types'

const Leads: React.FC = () => {
  const navigate = useNavigate();

  const offset = useRef(0);
  const limit = 10;

  const { loading, error, data, refetch } = useQuery(LEADS, {
    variables: {
      limit,
      offset: offset.current
    }
  });

  const handleViewLead = (id: string) => {
    navigate(`/leads/${id}`);
  };

  const handlePageChange = (page: number) => {
    refetch(
      {
        offset: (page - 1) * limit
      }
    );
  }

  return (
    <Layout>
      <Container>
        <h1>Leads</h1>
        <QueryResult error={error} loading={loading} data={data}>
          <ContentSection>
            <LeadsTable 
              leads={data?.leads?.leads} 
              onViewLead={handleViewLead} 
              onPageChange={handlePageChange}
              limit={limit}
              totalCount={data?.leads?.totalCount}
            />
          </ContentSection>
        </QueryResult>
      </Container>
    </Layout>
  );
};

export default Leads;
