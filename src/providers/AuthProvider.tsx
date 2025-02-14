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

/**
 * Authentication context providing user session data and authentication-related actions.
 *
 * @typedef {Object} IAuthContext
 * @property {GetCurrentSessionResponse | undefined} userData - The current authenticated user data.
 * @property {(userData: GetCurrentSessionResponse) => void} setUserData - Function to update user data.
 * @property {'authenticated' | 'loading' | 'unauthenticated'} status - The authentication status.
 * @property {() => void} logout - Function to log out the user.
 * @property {() => void} refetch - Function to refetch authentication data.
 */
export const AuthContext = createContext({} as IAuthContext);

/**
 * Provides authentication state and functions to its children.
 *
 * - Fetches the current session using `react-query`.
 * - Handles authentication redirects based on session status.
 * - Manages user logout and state updates.
 *
 * @param {IAuthContextProps} props - The provider's props.
 * @returns {JSX.Element} The authentication context provider.
 */
export const AuthenticationProvider: React.FC<IAuthContextProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const setUserData = (userData: GetCurrentSessionResponse | undefined) => {
    queryClient.setQueryData('current-user', userData);
  };

  /**
   * This query fetches the current session data and ensures the user is authenticated.
   * if the user is not authenticated, or the session is expired, it redirects to authorize page,
   * were the user can login or refresh the session.
   *
   * If the user is authenticated but has no shop, it redirects to the shop setup page.
   */
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
    onSuccess: (data) => {
      if (pathname === '/login') {
        router.push('/');
      }
      if (!data.shop) {
        router.push('/shop-setup');
      }
    },
  });

  /**
   * Mutation to log out the user.
   * - Removes the current session data from the query cache.
   * - Redirects the user to the home page.
   */
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
