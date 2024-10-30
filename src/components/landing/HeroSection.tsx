import { Button } from '@nextui-org/react';
import { IconArrowDown } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const LandingHeroSection = () => {
  return (
    <div className="relative w-full flex flex-col gap-9 items-center justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
      <h1 className="text-7xl text-center font-bold [&>span]:text-primary">
        <span>Turn</span> your business
        <br />
        <span>dreams</span> into an amazing
        <br />
        <span>reality!</span>
      </h1>
      <h2 className="text-center text-medium text-gray-500 max-w-[700px]">
        Transform your shopping experience with cutting-edge infrastructure that gives you complete control over your
        eCommerce vision. Build your dream store today!
      </h2>
      <Link href="/shop-setup">
        <Button variant="solid" color="primary" size="lg" radius="full">
          Start now!
        </Button>
      </Link>
      <p className="text-center text-medium text-gray-500">Or learn more about our platform</p>
      <Link href="#about">
        <IconArrowDown size={32} className=" text-gray-500 animate-bounce" />
      </Link>
      <div className="absolute top-0 left-0 -z-10 w-[25vw]">
        <img src="/illustrations/cart.png" alt="Cart" />
      </div>
      <div className="absolute bottom-0 -right-[15vw] -z-10 w-[45vw]">
        <img src="/illustrations/user-sitting.png" alt="User sitting" />
      </div>
    </div>
  );
};

export default LandingHeroSection;
