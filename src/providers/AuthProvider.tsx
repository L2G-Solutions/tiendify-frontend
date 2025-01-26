'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';

import { Spinner } from '@nextui-org/react';
import { createContext } from 'react';
import { getCurrentSession } from '@/service/auth';
import { AxiosError } from 'axios';

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContext {
  userData?: GetCurrentSessionResponse;
  setUserData: (userData: GetCurrentSessionResponse) => void;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthenticationProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const setUserData = (userData: GetCurrentSessionResponse) => {
    queryClient.setQueryData('getUserData', userData);
  };

  const query = useQuery({
    queryFn: getCurrentSession,
    queryKey: 'current-user',
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (pathname !== '/login') {
          router.push('/login');
        }
      }
    },
    onSuccess: () => {
      if (pathname === '/login') {
        router.push('/');
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        userData: query.data,
        setUserData,
        status: query.isSuccess ? 'authenticated' : query.isLoading ? 'loading' : 'unauthenticated',
      }}
    >
      {query.isLoading && (
        <div className="flex justify-center items-center w-screen h-screen">
          <Spinner size="lg" />
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
