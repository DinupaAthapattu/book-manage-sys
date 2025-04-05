'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  console.log('ApolloWrapper: Rendering with client:', client);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}