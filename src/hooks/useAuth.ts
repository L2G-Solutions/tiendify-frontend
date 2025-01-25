import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
};
