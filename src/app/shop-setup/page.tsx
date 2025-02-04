'use client';
import { Globe } from '@/components/Globe';
import { RESOURCE_REGIONS, SHOP_COUNTRIES, SHOP_CURRENCIES, SHOP_LANGUAGES } from '@/constants/config';
import { createShop } from '@/service/shops';
import { Avatar, Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { IconBuildingStore } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';

const ShopSetupPage = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopDescription: '',
    shopLocation: '',
    shopCurrency: '',
    shopResourceRegion: '',
  });

  const router = useRouter();

  const { shopName, shopDescription, shopLocation, shopCurrency } = formData;

  const createShopMutation = useMutation({
    mutationFn: createShop,
    onSuccess: () => {
      router.push('/shop-setup/provisioning');
    },
  });

  return (
    <main className="px-12 py-8 flex flex-col gap-4">
      <h1 className="font-bold">
        <span className="text-primary">Set up</span> your new shop
      </h1>
      <p className="mb-4">Configure your shop settings and start selling your products online.</p>
      <div className="flex flex-col-reverse justify-between mt-6 md:flex-row">
        <div className="flex-1 max-w-[650px]">
          <form className="flex flex-col gap-6 px-8">
            <Input
              label="Shop name"
              variant="faded"
              placeholder="Enter your shop name"
              labelPlacement="outside"
              size="lg"
              isRequired
              value={shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
            />
            <Textarea
              label="Shop description"
              variant="faded"
              placeholder="Enter your shop description"
              labelPlacement="outside"
              size="lg"
              isRequired
              value={shopDescription}
              onChange={(e) => setFormData({ ...formData, shopDescription: e.target.value })}
            />
            <Select
              label="Shop location"
              variant="faded"
              placeholder="Enter your registered shop country"
              labelPlacement="outside"
              size="lg"
              isRequired
              value={shopLocation}
              onChange={(e) => setFormData({ ...formData, shopLocation: e.target.value })}
            >
              {SHOP_COUNTRIES.map((country) => (
                <SelectItem
                  key={country.key}
                  startContent={
                    <Avatar alt={country.label} className="w-6 h-6" src={`https://flagcdn.com/${country.key}.svg`} />
                  }
                >
                  {country.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Shop resource region"
              variant="faded"
              placeholder="Select your shop resource region"
              labelPlacement="outside"
              description="Choose the closest region to your shop location"
              size="lg"
              isRequired
              value={formData.shopResourceRegion}
              onChange={(e) => setFormData({ ...formData, shopResourceRegion: e.target.value })}
            >
              {RESOURCE_REGIONS.map((region) => (
                <SelectItem key={region.key}>{region.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="Shop currency"
              variant="faded"
              placeholder="Enter your preferred shop currency"
              labelPlacement="outside"
              size="lg"
              isRequired
              value={shopCurrency}
              onChange={(e) => setFormData({ ...formData, shopCurrency: e.target.value })}
            >
              {SHOP_CURRENCIES.map((currency) => (
                <SelectItem key={currency.key}>{currency.label}</SelectItem>
              ))}
            </Select>
            <Select
              label="Shop language"
              variant="faded"
              placeholder="Enter your shop language"
              labelPlacement="outside"
              size="lg"
              isRequired
            >
              {SHOP_LANGUAGES.map((language) => (
                <SelectItem key={language.key}>{language.label}</SelectItem>
              ))}
            </Select>
            <div className="flex justify-end gap-4">
              <Button color="default">Cancel</Button>
              <Button
                color="primary"
                startContent={<IconBuildingStore size={20} />}
                isLoading={createShopMutation.isLoading}
                onClick={() => {
                  createShopMutation.mutate({
                    name: formData.shopName,
                    about: formData.shopDescription,
                    country: formData.shopLocation,
                    currency: formData.shopCurrency,
                  });
                }}
              >
                Create Shop
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-1 -mt-8">
          <Globe
            globeConfig={{
              markers: RESOURCE_REGIONS.map((region) => ({
                location: [region.latitude, region.longitude],
                size: 0.1,
              })),
            }}
            selectedMarker={{
              latitude: RESOURCE_REGIONS.find((region) => region.key === formData.shopResourceRegion)?.latitude || 0,
              longitude: RESOURCE_REGIONS.find((region) => region.key === formData.shopResourceRegion)?.longitude || 0,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default ShopSetupPage;
