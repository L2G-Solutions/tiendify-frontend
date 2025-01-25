import LandingHeroSection from '@/components/landing/HeroSection';
import ShadowElipse from '@/components/ShadowElipse';

export default function Home() {
  return (
    <>
      <LandingHeroSection />
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
    </>
  );
}
