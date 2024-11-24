import React from "react";
import { createRoot } from "react-dom/client";
import globalStyles from './styles/stylesGlobal';
import Pages from "./pages";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_APOLLO_GQL_HOST,
  cache: new InMemoryCache(),
});
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {globalStyles}
      <Pages />
    </ApolloProvider>
  </React.StrictMode>
);




