export const RESOURCE_REGIONS = [
  { key: 'useast', label: 'US East', latitude: 37.7749, longitude: -79.3832 },
  { key: 'uswest', label: 'US West', latitude: 43.872984, longitude: -121.253567 },
  { key: 'uscentral', label: 'US Central', latitude: 41.8781, longitude: -93.0977 },
  { key: 'europewest', label: 'West Europe', latitude: 52.376, longitude: 4.8947 },
  { key: 'europeeast', label: 'East Europe', latitude: 52.52, longitude: 13.405 },
  { key: 'asiaeast', label: 'East Asia', latitude: 22.377493, longitude: 114.149714 },
  { key: 'brasil', label: 'Brasil', latitude: -15.826691, longitude: -47.921822 },
];

export const SHOP_COUNTRIES = [
  { key: 'co', label: 'Colombia' },
  { key: 'mx', label: 'Mexico' },
  { key: 'ca', label: 'Canada' },
  { key: 'us', label: 'United States' },
  { key: 'br', label: 'Brasil' },
  { key: 'es', label: 'Spain' },
  { key: 'fr', label: 'France' },
];

export const SHOP_CURRENCIES = [
  { key: 'usd', label: '$ USD - United States Dollar' },
  { key: 'cop', label: '$ COP - Colombian Peso' },
  { key: 'eur', label: '€ EUR - Euro' },
  { key: 'gbp', label: '£ GBP - British Pound' },
  { key: 'brl', label: 'R$ BRL - Brazilian Real' },
  { key: 'mxn', label: '$ MXN - Mexican Peso' },
  { key: 'cad', label: '$ CAD - Canadian Dollar' },
];

export const SHOP_LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish' },
  { key: 'fr', label: 'French' },
  { key: 'pt', label: 'Portuguese' },
];

export const PROVISION_STEPS = [
  {
    title: 'Creating Resource Group',
    description:
      'We’re setting up a dedicated space for all the resources your store will need. This step ensures that everything your store requires is organized and securely contained within its own resource group',
    illustrationPath: '/illustrations/server-provisioning-step-1.svg',
    isLoading: true,
  },
  {
    title: 'Provisioning IAM (Identity and Access Management)',
    description:
      'Lastly, we’re setting up Identity and Access Management to protect your store’s resources. This allows us to control who has access to each resource, adding a strong layer of security.',
    illustrationPath: '/illustrations/server-provisioning-step-5.svg',
    isLoading: true,
  },
  {
    title: 'Setting Up the Database',
    description:
      'We’re initializing the main database where all of your store’s important data will be stored, including product details, customer information, and order history. This ensures your store’s data is structured and easily accessible.',
    illustrationPath: '/illustrations/server-provisioning-step-4.svg',
    isLoading: true,
  },
  {
    title: 'Configuring Cloud Storage',
    description:
      'Now we’re creating a secure storage solution for your store’s media and data files, such as images, documents, and backups. This helps to ensure fast and reliable access to your files.',
    illustrationPath: '/illustrations/server-provisioning-step-3.svg',
    isLoading: true,
  },
  {
    title: 'Setting Up Web App',
    description:
      'Next, we’re configuring the core web app. This forms the foundation of your store’s functionality, managing all of the operations behind the scenes to keep everything running smoothly.',
    illustrationPath: '/illustrations/server-provisioning-step-2.svg',
    isLoading: true,
  },
  {
    title: 'Success!',
    description:
      'Your store has been successfully provisioned. You can now start customizing your store, adding products, and setting up your payment gateway. If you need any help, feel free to reach out to our support team.',
    illustrationPath: '/illustrations/server-provisioning-success.svg',
    hideStepIndicator: true,
  },
];
