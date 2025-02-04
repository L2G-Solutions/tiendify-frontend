import Link from 'next/link';

interface IFeatureCardProps {
  title: string;
  description: string;
  icon: string;
  redirectRoute: string;
}

const FeatureCard = ({ title, description, icon, redirectRoute }: IFeatureCardProps) => {
  return (
    <Link href={redirectRoute}>
      <article className="flex flex-col items-center text-center px-8 py-12 gap-y-8 shadow-xl rounded-3xl bg-white max-w-80 h-full hover:shadow-primary-100 hover:scale-[1.025] transition-transform">
        <div className="w-[90%]">
          <img src={icon} alt={title} />
        </div>
        <h3 className="text-4xl font-bold">{title}</h3>
        <p>{description}</p>
      </article>
    </Link>
  );
};

export default FeatureCard;
