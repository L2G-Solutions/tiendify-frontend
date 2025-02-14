import ProvisioningSteps from '@/components/provisioning/ProvisioningSteps';
import { IconBell } from '@tabler/icons-react';
/**
 * The provisioning page provides users with an informative and interactive experience during the provisioning phase
 * of their newly created online shop. After the shop is created, users are guided through the process of setting up shop resources.
 *
 * The page includes a notification, alerting users that the provisioning process might take a few minutes, with a friendly message to reassure them.
 * Additionally, the component integrates a ProvisioningSteps component that visually tracks the progress of the provisioning process.
 * This ensures users stay informed as their shop is being set up.
 *
 * @returns {JSX.Element} The Shop Provisioning page layout.
 */
const ShopProvisioningPage = () => {
  return (
    <main className="py-8 px-12 md:px-24 flex flex-col gap-4">
      <h1 className="font-bold">
        <span className="text-primary">Provisioning</span> your new shop
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
