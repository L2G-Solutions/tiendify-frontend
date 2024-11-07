import ProvisioningSteps from '@/components/provisioning/ProvisioningSteps';
import { IconBell } from '@tabler/icons-react';

interface IShopProvisioningPageProps {
  params: { shopId: string };
}

const ShopProvisioningPage = async ({}: IShopProvisioningPageProps) => {
  return (
    <main className="py-8 px-12 md:px-24 flex flex-col gap-4">
      <h1 className="font-bold">
        <span className="text-primary">Aprovisioning</span> your new shop
      </h1>
      <p className="mb-4">Your shop has been created. Now, let&apos;s set up your shop resources.</p>

      <div
        className="
        inline-flex
        w-full
        p-4
        rounded-lg
        bg-amber-100
        text-amber-800
        gap-4
      "
      >
        <IconBell size={24} />
        Setting up your store&apos;s resources may take a few minutes. You’re welcome to wait here, or feel free to
        check back shortly. Everything will be ready soon!
      </div>
      <ProvisioningSteps />
    </main>
  );
};

export default ShopProvisioningPage;
