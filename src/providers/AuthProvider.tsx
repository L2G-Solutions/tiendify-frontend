'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';

import { Spinner } from '@nextui-org/react';
import { createContext } from 'react';
import { getCurrentSession } from '@/service/auth';

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContext {
  userData?: GetCurrentSessionResponse;
  setUserData: (userData?: GetCurrentSessionResponse) => void;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  accessToken?: string;
  refreshToken?: string;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthenticationProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const setUserData = (userData?: GetCurrentSessionResponse) => {
    queryClient.setQueryData('getCurrentUser', userData);
  };

  const query = useQuery({
    queryFn: async () => await getCurrentSession(window.localStorage.getItem('access_token') as string),
    queryKey: 'getCurrentUser',
    onSuccess: () => {
      if (pathname === '/login') {
        router.push('/dashboard');
      }
    },
    onError: () => {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
    },
    enabled: typeof window !== 'undefined' && window.localStorage.getItem('access_token') !== null,
  });

  if (searchParams.get('access_token') && window.localStorage.getItem('access_token') === null) {
    window.localStorage.setItem('access_token', searchParams.get('access_token') as string);
    window.localStorage.setItem('refresh_token', searchParams.get('refresh_token') as string);
    query.refetch();
  }

  return (
    <AuthContext.Provider
      value={{
        userData: query.data,
        setUserData,
        status: query.data ? 'authenticated' : query.isLoading ? 'loading' : 'unauthenticated',
      }}
    >
      {query.isLoading && (
        <div className="flex justify-center items-center w-screen h-screen">
          <Spinner size="lg" />
        </div>
      )}
      {pathname !== '/login' && query.isSuccess && children}
      {children}
    </AuthContext.Provider>
  );
};
