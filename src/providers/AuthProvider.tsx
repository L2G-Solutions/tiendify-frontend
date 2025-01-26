'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { createContext } from 'react';
import { getCurrentSession, logout } from '@/service/auth';
import { AxiosError } from 'axios';

interface IAuthContextProps {
  children: React.ReactNode;
}

interface IAuthContext {
  userData?: GetCurrentSessionResponse;
  setUserData: (userData: GetCurrentSessionResponse) => void;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthenticationProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const setUserData = (userData: GetCurrentSessionResponse | undefined) => {
    queryClient.setQueryData('current-user', userData);
  };

  const query = useQuery({
    queryFn: getCurrentSession,
    queryKey: 'current-user',
    onError: (error: AxiosError) => {
      if (error.response?.status === 403 && pathname !== '/auth/authorize') {
        const next = pathname;
        const redirect_uri = window.location.origin + '/auth/authorize';
        const searchParams = new URLSearchParams({
          next,
          redirect_uri,
        });
        window.location.href =
          process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL + '/auth/public/login?' + searchParams.toString();
      }
    },
    onSuccess: () => {
      if (pathname === '/login') {
        router.push('/');
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries('current-user');
      router.push('/');
    },
  });

  return (
    <AuthContext.Provider
      value={{
        userData: query.data,
        setUserData,
        status: query.isSuccess ? 'authenticated' : query.isLoading ? 'loading' : 'unauthenticated',
        logout: logoutMutation.mutate,
        refetch: query.refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
