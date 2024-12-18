import React, { PropsWithChildren} from 'react';
import { ApolloError } from '@apollo/client'


interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown,
}
/**
 * Query Results conditionally renders Apollo useQuery hooks states:
 * loading, error or its children when data is ready
 */
const QueryResult: React.FC<PropsWithChildren<QueryResultProps>> = ({ loading, error, data, children }): React.ReactElement<any, any> | null => {
  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }
  if (loading) {
    return <p>Loading data...</p>
  }
  if (data) {
    return <>{children}</>;
  }

  return <p>Nothing to show...</p>;
  
};

export default QueryResult;
