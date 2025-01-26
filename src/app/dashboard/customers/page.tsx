'use client';

import { getCustomers } from '@/service/customers';
import {
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

const PAGE_SIZE = 12;

export default function CustomersPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') === null ? 1 : Number(searchParams.get('page'));
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: async () =>
      await getCustomers({
        pagination: {
          offset: (page - 1) * PAGE_SIZE,
          limit: PAGE_SIZE,
        },
      }),
    queryKey: 'customers',
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="mb-2">Your customers</h1>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress aria-label="Loading" />
          <p className="text-center">Loading orders...</p>
        </div>
      )}
      {isSuccess && (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Customer since</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  {customer.first_name} {customer.last_name}
                </TableCell>
                <TableCell>
                  <Link href={`mailto:${customer.email}`}>{customer.email}</Link>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
