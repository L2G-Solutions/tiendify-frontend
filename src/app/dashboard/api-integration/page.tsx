'use client';

import { CircularProgress, Link, Snippet } from '@nextui-org/react';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { getResources } from '@/service/cloud-resources';
import ApiKeysTable from '@/components/dashboard/api-keys/ApiKeysTable';
import { getDocUrl } from '@/constants/docLinks';
/**
 * This page provides developers with the necessary information to integrate a shop with custom applications via API.
 * It displays API connection details, the table of API keys for the shop, ant the possibility to manage them.
 *
 * The API Keys of this page are defined only for admin tasks, such as creating, updating, and deleting products.
 *
 * @returns {JSX.Element} The API Integration page.
 */
export default function APIIntegrationPage() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'api-resources',
    queryFn: getResources,
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="mb-2">API Integration</h1>
      <blockquote className="text-sky-700 inline-flex items-center gap-3 text-sm border border-sky-200 bg-sky-100 p-4 rounded-2xl">
        <IconInfoCircleFilled />
        <p>
          This page is intended for developers. With the information provided here, you can integrate your shop with a
          custom website or application.
        </p>
      </blockquote>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress aria-label="Loading" />
          <p className="text-center">Loading API details...</p>
        </div>
      )}
      {isSuccess && (
        <>
          <h3>Your API URL</h3>
          <Snippet variant="flat">{data.apiUrl}</Snippet>
          <p>You can check the health status of your shop&apos;s backend server by calling the next endpoint.</p>
          <Snippet>{`curl ${data.apiUrl}/health`}</Snippet>
          <p>
            For more information about how to interact with the API, visit the{' '}
            <Link href={getDocUrl('docs')}>API Reference Documentation</Link>.
          </p>
        </>
      )}
      <ApiKeysTable />
    </section>
  );
}
