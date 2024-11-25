import React from 'react';
import { css } from '@emotion/react';

const containerStyles = css`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 1rem;
    }
  }

  span {
    font-weight: bold;
  }
`;
type Service = {
  id: string;
  name: string;
}

type LeadDetails = {
  id: string ;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: Service[];
};

type LeadDetailProps = {
  lead: LeadDetails | undefined | null;
};

const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  
  if(!lead){
    return (<p> Lead not found. </p>)
  }

  return (
    <div css={containerStyles}>
      <h2>Lead Details</h2>
      <ul>
        <li>
          <span>Name:</span> {lead.name}
        </li>
        <li>
          <span>Email:</span> {lead.email}
        </li>
        <li>
          <span>Mobile:</span> {lead.mobile}
        </li>
        <li>
          <span>Postcode:</span> {lead.postcode}
        </li>
        <li>
          <span>Services:</span> {lead.services.map((({name})=>name)).join(', ')}
        </li>
      </ul>
    </div>
  )
};

export default LeadDetail;
