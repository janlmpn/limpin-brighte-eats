/** @jsxImportSource @emotion/react */
import React from 'react';
import Layout from '../components/Layout';
import Container from '../components/Container';
import ContentSection from '../components/ContentSection';
import { css } from '@emotion/react';

const styles = css`
  h1 {
    padding: 2em;
  }
`;

const ThankYou: React.FC = () => {
  return (
    <Layout>
      <Container css={styles} >
        <h1>Thank you for submitting your interest!</h1>
      </Container>
    </Layout>
  );
};

export default ThankYou;
