'use client';

import { PaymentStatus } from '@/constants';
import { cancelOrder, getOrder } from '@/service/orders';
import { Button, Chip, CircularProgress, Link } from '@nextui-org/react';
import { IconCreditCardFilled, IconTruckDelivery } from '@tabler/icons-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

type OrderDetailsProps = {
  params: { orderId: string };
};

export default function OrderPage({ params }: OrderDetailsProps) {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryFn: async () =>
      await getOrder({
        orderId: params.orderId,
      }),
    queryKey: ['order', params.orderId],
  });

  const cancelMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success('Order canceled successfully');
      refetch();
    },
    onError: () => {
      toast.error('An error occurred while canceling the order');
    },
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    trailingZeroDisplay: 'stripIfInteger',
  });

  return (
    <section className="flex flex-col gap-6">
      <h1 className="mb-2">Order Details</h1>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <CircularProgress aria-label="Loading" />
          <p className="text-center">Loading order...</p>
        </div>
      )}
      {isSuccess && (
        <>
          <Button
            className="w-fit"
            variant="faded"
            color="danger"
            onClick={() =>
              cancelMutation.mutate({
                orderId: data.id,
              })
            }
          >
            Cancel order
          </Button>
          <p>
            <span className="font-bold">Order number:</span> {data.id}
          </p>
          <p>
            <span className="font-bold">Order date:</span> {new Date(data.ordered_at).toLocaleString()}
          </p>
          <h3 className="mt-6">Shipping details</h3>
          <div className="flex items-center gap-4">
            <span className="font-bold">Status:</span>
            <Chip variant="flat" color="primary" startContent={<IconTruckDelivery />}>
              {data.shipping.status.slice(0, 1).toUpperCase() + data.shipping.status.slice(1).toLowerCase()}
            </Chip>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Address:</span>
            <p>
              {data.shipping.addresses?.address_label}, {data.shipping.addresses?.zip_code},&nbsp;
              {data.shipping.addresses?.city},&nbsp;
              {data.shipping.addresses?.state}, {data.shipping.addresses?.country}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Estimated delivery:</span>
            <p>In {data.shipping.estimated_delivery} days</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Shipped at:</span>
            <p>
              {data.shipping.shipped_at ? new Date(data.shipping.shipped_at).toLocaleDateString() : 'Not shipped yet'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Delivered at:</span>
            <p>
              {data.shipping.delivered_at
                ? new Date(data.shipping.delivered_at).toLocaleDateString()
                : 'Not delivered yet'}
            </p>
          </div>
          <h3 className="mt-6">Payment details</h3>
          <div className="flex items-center gap-4">
            <span className="font-bold">Status:</span>
            <Chip
              variant="flat"
              startContent={<IconCreditCardFilled size={18} />}
              color={
                data.payments.status === PaymentStatus.SUCCESS
                  ? 'success'
                  : data.payments.status === PaymentStatus.FAILED
                  ? 'danger'
                  : 'default'
              }
            >
              {data.payments.status.slice(0, 1).toUpperCase() + data.payments.status.slice(1).toLowerCase()}
            </Chip>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Amount:</span>
            <span className="inline-flex items-center gap-2">
              {data.payments.method} <IconCreditCardFilled className="text-primary" />{' '}
              {formatter.format(data.payments.amount)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="inline-flex items-center gap-2">
              {data.payments.paid_at
                ? new Date(data.payments.paid_at).toLocaleDateString()
                : 'Payment not approved yet'}
            </span>
          </div>
          <h3 className="mt-6">Customer contact</h3>
          <div className="flex items-center gap-4">
            <span className="font-bold">Name:</span>
            <p>
              {data.customers.first_name} {data.customers.last_name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Email:</span>
            <Link href={`mailto:${data.customers.email}`}>{data.customers.email}</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold">Phone:</span>
            <p>{data.customers.phone}</p>
          </div>
        </>
      )}
    </section>
  );
}
