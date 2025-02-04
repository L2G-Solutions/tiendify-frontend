'use client';

import { CircularProgress, Card, CardHeader, CardBody, CardFooter, Chip, Link } from '@nextui-org/react';
import { getOrders } from '@/service/orders';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { PaymentStatus } from '@/constants';
import { IconArrowRight, IconCreditCardFilled, IconTruckDelivery } from '@tabler/icons-react';

const PAGE_SIZE = 12;

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') === null ? 1 : Number(searchParams.get('page'));

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    trailingZeroDisplay: 'stripIfInteger',
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: async () =>
      await getOrders({
        pagination: {
          limit: PAGE_SIZE,
          offset: (page - 1) * PAGE_SIZE,
        },
      }),
    queryKey: ['orders'],
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="mb-2">Orders</h1>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress aria-label="Loading" />
          <p className="text-center">Loading orders...</p>
        </div>
      )}
      {isSuccess && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((order) => (
            <div key={order.id}>
              <Card className="p-6">
                <CardHeader>
                  <div className="flex justify-between w-full">
                    <Chip variant="shadow" color="primary" startContent={<IconTruckDelivery />}>
                      {order.shipping.status.slice(0, 1).toUpperCase() + order.shipping.status.slice(1).toLowerCase()}
                    </Chip>
                    <span className="font-bold text-emerald-500 text-lg">
                      {formatter.format(order.payments.amount)}
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Chip
                    variant="flat"
                    startContent={<IconCreditCardFilled size={18} />}
                    color={
                      order.payments.status === PaymentStatus.SUCCESS
                        ? 'success'
                        : order.payments.status === PaymentStatus.FAILED
                        ? 'danger'
                        : 'default'
                    }
                  >
                    Payment {order.payments.status.toLowerCase()}
                  </Chip>
                </CardBody>
                <CardFooter className="text-sm text-gray-500 gap-10">
                  <div>
                    <strong>Ordered at:</strong>
                    <p>{new Date(order.ordered_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <strong>Estimated Delivery:</strong>
                    <p>In {order.shipping.estimated_delivery} days</p>
                  </div>
                </CardFooter>
                <CardFooter className="justify-end">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    View details
                    <IconArrowRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
