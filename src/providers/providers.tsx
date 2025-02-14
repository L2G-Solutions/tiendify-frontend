'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

import { NextUIProvider } from '@nextui-org/react';
import { AuthenticationProvider } from './AuthProvider';
import { Suspense } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

/**
 * This provider component is a wrapper that integrates several essential providers and configurations for the application.
 * It ensures that the child components have access to all the necessary global configurations and context providers, such as
 * the UI theme provider, authentication provider, and the query client.
 *
 * @param {React.ReactNode} children The child components to be wrapped by the provider.
 * @return {JSX.Element} The provider component.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            color: '#171F2C',
            background: '#70A6FF',
            borderColor: '#212C3F',
            fontSize: '1.075rem',
            gap: '0.75rem',
          },
        }}
      />
      <NextUIProvider>
        <Suspense>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </Suspense>
      </NextUIProvider>
    </QueryClientProvider>
  );
};
