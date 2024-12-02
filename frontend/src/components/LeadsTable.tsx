import React, { useState } from 'react';
import { css } from '@emotion/react';
import { GetLeadsQuery } from '../__generated__/types'

const tableStyles = css`
  width: 100%;
  margin: 2rem auto;
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;

  th,
  td {
    padding: 1rem;
    border: 1px solid #ccc;
    overflow-wrap: break-word;

  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
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

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody tr {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
    }

    td {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      border: none;
    }

    td:before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 1rem;
    }
  }
  
`;

const paginationStyles = css`
  button {
    margin-left: 0.1rem;
    padding: 0.5rem;
    border-radius: 4px;
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
`

type Service = {
  id: string;
  name: string;
}
type Lead = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: Service[]
};

type LeadsTableProps = {
  leads: Lead[] | undefined | null;
  onViewLead: (id: string) => void;
  onPageChange: (page: number) => void;
  limit: number;
  totalCount: number | undefined;
};

const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads, 
  onViewLead,
  onPageChange,
  limit,
  totalCount
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState( Math.ceil (totalCount! / limit))
  
  const handlePageChange = (page: number)=>{
    setCurrentPage(page);
    onPageChange(page)
  }

  return (
    <>
      <table css={tableStyles}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Postcode</th>
            <th>Services</th>
            <th style={{width:"12%"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads?.map((lead) => (
            <tr key={lead.id}>
              <td data-label="Name">{lead.name}</td>
              <td data-label="Email">{lead.email}</td>
              <td data-label="Mobile">{lead.mobile}</td>
              <td data-label="Postcode">{lead.postcode}</td>
              <td data-label="Services">{lead.services?.map(({name}) => name + " ")}</td>
              <td data-label="Actions">
                <button onClick={() => onViewLead(lead.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div css={paginationStyles}>
        <button onClick={()=> handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={()=>handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default LeadsTable;
