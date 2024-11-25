import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { css } from '@emotion/react';

const styles = css`
  h1 {
    padding-top: 2em;
    padding-bottom: 0.5em;
  }

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

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container css={styles} >
        <h1>Thank you for submitting your interest!</h1>
        <button onClick={ () => navigate('/leads') }>View Leads</button>
      </Container>
    </Layout>
  );
};

export default ThankYou;
