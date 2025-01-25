'use client';
import { Globe } from '@/components/Globe';
import { RESOURCE_REGIONS, SHOP_COUNTRIES, SHOP_CURRENCIES, SHOP_LANGUAGES } from '@/constants/config';
import { Avatar, Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { IconBuildingStore } from '@tabler/icons-react';
import { useState } from 'react';

const ShopSetupPage = () => {
  const [resourceRegion, setResourceRegion] = useState<string>('');

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
            />
            <Textarea
              label="Shop description"
              variant="faded"
              placeholder="Enter your shop description"
              labelPlacement="outside"
              size="lg"
              isRequired
            />
            <Select
              label="Shop location"
              variant="faded"
              placeholder="Enter your registered shop country"
              labelPlacement="outside"
              size="lg"
              isRequired
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
              value={resourceRegion}
              onChange={(e) => setResourceRegion(e.target.value)}
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
              <Button color="primary" startContent={<IconBuildingStore size={20} />}>
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
              latitude: RESOURCE_REGIONS.find((region) => region.key === resourceRegion)?.latitude || 0,
              longitude: RESOURCE_REGIONS.find((region) => region.key === resourceRegion)?.longitude || 0,
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default ShopSetupPage;
