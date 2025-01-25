'use client';
import { Suspense, useEffect } from 'react';
import { useMutation } from 'react-query';
import { authorizeLogin } from '@/service/auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useCurentUrl from '@/hooks/useCurentUrl';
import { Spinner } from '@nextui-org/react';

export default function AuthorizePage() {
  return (
    <Suspense fallback="Loading...">
      <AuthorizeLoginComponent />
    </Suspense>
  );
}

const AuthorizeLoginComponent = () => {
  const navigate = useRouter().push;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const { domainUrl } = useCurentUrl();
  const LOGIN_REDIRECT_URL = `${domainUrl}/auth/authorize`;

  params.append('redirect_uri', LOGIN_REDIRECT_URL);
  const authorizeMutation = useMutation({
    mutationFn: () => authorizeLogin(params, LOGIN_REDIRECT_URL),
    onSuccess: () => {
      const next_url = searchParams.get('next');
      if (next_url) {
        navigate(next_url);
        return;
      }

      navigate('/dashboard');
    },
  });

  useEffect(() => {
    authorizeMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <Spinner size="lg" />
      <p className="text-primary-500">Checking your credentials...</p>
    </main>
  );
};
