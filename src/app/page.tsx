import FeatureCard from '@/components/landing/FeatureCard';
import LandingHeroSection from '@/components/landing/HeroSection';
import PricingCard from '@/components/landing/PricingCard';
import ShadowEllipse from '@/components/ShadowEllipse';

import { FEATURES, PRICING_PLANS } from '@/constants/landingInfo';

/**
 * The page serves as the main landing page for the website, introducing users to the core offerings and pricing plans.
 * It begins with the hero section, which welcomes visitors with a prominent introductory section.
 * Following this, the page presents a clear and visually appealing overview of the services under "What We Offer,"
 * showcasing key features using feature cards.
 *
 * The page then highlights the available pricing plans through cards, offering detailed information about different tiers,
 * their features, pricing, and a call-to-action (CTA) to encourage users to explore further.
 *
 * @returns {JSX.Element} The landing page component.
 */
export default function Home() {
  return (
    <>
      <LandingHeroSection />
      <h2 id="about" className="text-6xl text-primary font-bold text-center py-12">
        What we offer
      </h2>
      <div className="flex justify-center">
        <section className="px-8 lg:px-32 grid grid-cols-1 gap-12 py-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.illustrationPath}
              redirectRoute={feature.redirectRoute}
            />
          ))}
        </section>
      </div>
      <h2 id="about" className="text-6xl text-primary font-bold text-center py-12">
        Our pricing plans
      </h2>
      <div className="flex justify-center">
        <section className="px-8 lg:px-32 grid grid-cols-1 gap-12 py-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={index}
              planName={plan.planName}
              features={plan.features}
              price={plan.price}
              ctaText={plan.cta}
              redirectRoute={plan.redirectRoute}
            />
          ))}
        </section>
      </div>
      <ShadowEllipse
        className="absolute -top-[50px] -left-[150px]"
        size="674px"
        internalColor="rgba(0, 111, 238, 0.40)"
        externalColor="rgba(125, 78, 255, 0.00)"
        internalStopColor="#006FEE"
        externalStopColor="#7D4EFF"
      />
      <ShadowEllipse
        className="absolute bottom-0 -right-[100px]"
        size="1000px"
        internalColor="rgba(147, 83, 211, 0.80)"
        externalColor="rgba(125, 78, 255, 0.00)"
        internalStopColor="#9353D3"
        externalStopColor="#7D4EFF"
      />
      <ShadowEllipse
        className="absolute top-[100vh] -left-[500px]"
        size="674px"
        internalColor="rgba(0, 111, 238, 0.40)"
        externalColor="rgba(125, 78, 255, 0.00)"
        internalStopColor="#006FEE"
        externalStopColor="#7D4EFF"
      />
    </>
  );
}
