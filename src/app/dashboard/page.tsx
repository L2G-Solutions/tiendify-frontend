'use client';

import { getShopInfo } from '@/service/shops';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from '@nextui-org/react';
import { IconChecks, IconMailFilled, IconPointFilled } from '@tabler/icons-react';
import { useQuery } from 'react-query';

export default function DashboardPage() {
  const { data, isSuccess } = useQuery({
    queryFn: getShopInfo,
    queryKey: 'shop-info',
  });

  return (
    <>
      <h1>My shop</h1>
      <p>
        Here you can find general information about your shop.{' '}
        <Link href="/dashboard/shop-info/edit">Click here to edit your shop information.</Link>
      </p>
      {isSuccess && (
        <>
          <div className="flex gap-10 flex-wrap">
            <Card className="max-w-[600px]">
              <CardHeader className="flex gap-3">
                <Image alt="Shop logo" height={40} radius="sm" src={data.logoImg} width={40} />
                <div className="flex flex-col">
                  <p className="text-md">{data.name}</p>
                  <p className="text-small text-default-500">{data.headline}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <span>Shop link:</span>
                <Link href={data.webpageLink} showAnchorIcon>
                  {data.webpageLink}
                </Link>
              </CardBody>
              <Divider />
              <CardFooter className="justify-end text-gray-500 gap-2">
                {data.currency} <IconPointFilled size={16} /> {data.country}
              </CardFooter>
            </Card>
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image alt="Shop banner" className="object-cover" height={192} src={data.bannerImg} width={384} />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <span className="text-tiny text-white/80">Shop banner</span>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >
                  Change
                </Button>
              </CardFooter>
            </Card>
          </div>
          <h2>About</h2>
          <p className="text-balance">{data.about}</p>
          <h2>Email verification</h2>
          {data.verified ? (
            <>
              <Chip color="success" variant="flat" startContent={<IconChecks size={18} />}>
                Email verified
              </Chip>
              <p className="text-balance">
                Your email address has already been verified. You can update your contact information in{' '}
                <Link href="/dashboard/account">your account page.</Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-balance">
                Your email is not verified yet. In order to access Tiendify features, you <b>must</b> verify your email
                address.
              </p>
              <Button className="w-fit font-bold" color="primary" startContent={<IconMailFilled size={18} />}>
                Resend verification email
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
