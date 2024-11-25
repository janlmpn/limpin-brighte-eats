/** @jsxImportSource @emotion/react */
import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import RegistrationForm from '../components/RegistrationForm';

const Registration: React.FC = () => {
  return (
    <Layout>
      <Container>
        <h1>Register your interest to Brighte Eats</h1>
        <RegistrationForm />
      </Container>
    </Layout>
  );
};

export default Registration;
