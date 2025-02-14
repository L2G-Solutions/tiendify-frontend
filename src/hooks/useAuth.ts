import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';

/**
 * Custom hook to access authentication context.
 *
 * @returns {Object} The authentication context value.
 *
 * @throws {Error} If used outside of an `AuthProvider`.
 *
 * This hook ensures that authentication-related state and functions are accessible
 * only within the `AuthProvider`.
 */
export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
};
