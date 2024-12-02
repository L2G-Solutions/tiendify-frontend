import FeatureCard from '@/components/landing/FeatureCard';
import LandingHeroSection from '@/components/landing/HeroSection';
import ShadowElipse from '@/components/ShadowElipse';

import { FEATURES } from '@/constants/landingInfo';

export default function Home() {
  return (
    <>
      <LandingHeroSection />
      <h2 id="about" className="text-6xl text-primary font-bold text-center py-12">
        What we offer
      </h2>
      <div className='flex justify-center'>
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
      <ShadowElipse
        className="absolute -top-[50px] -left-[150px]"
        size="674px"
        internalColor="rgba(0, 111, 238, 0.40)"
        externalColor="rgba(125, 78, 255, 0.00)"
        internalStopColor="#006FEE"
        externalStopColor="#7D4EFF"
      />
      <ShadowElipse
        className="absolute bottom-0 -right-[100px]"
        size="1000px"
        internalColor="rgba(147, 83, 211, 0.80)"
        externalColor="rgba(125, 78, 255, 0.00)"
        internalStopColor="#9353D3"
        externalStopColor="#7D4EFF"
      />
      <ShadowElipse
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
