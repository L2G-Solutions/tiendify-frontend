import { Button } from '@nextui-org/button';
import { IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';

interface IPricingCardProps {
  planName: string;
  price: string;
  features: string[];
  ctaText: string;
  redirectRoute: string;
}

const PricingCard = ({ planName, price, features, ctaText, redirectRoute }: IPricingCardProps) => {
  return (
    <article className="flex flex-col items-center text-center px-12 py-12 gap-y-8 shadow-xl rounded-3xl bg-white max-w-80 hover:shadow-primary-100 hover:scale-[1.025] transition-transform">
      <h3 className="text-4xl font-bold">{planName}</h3>
      <p className="text-2xl font-semibold text-primary-600">{price}</p>
      <ul className="text-left list-disc list-inside self-start">
        {features.map((feature, index) => (
          <li key={index} className="text-base flex items-center gap-2 text-gray-700">
            <IconCircleCheck className="inline text-success-400" size="1rem" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href={redirectRoute}>
        <Button variant="ghost" color="primary">
          {ctaText}
        </Button>
      </Link>
    </article>
  );
};

export default PricingCard;
