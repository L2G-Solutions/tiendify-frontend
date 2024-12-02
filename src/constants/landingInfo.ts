export const FEATURES = [
  {
    title: 'Make your own view',
    description:
      'Unleash your creativity with our powerful API! Build your own unique front-end and customize every aspect of your eCommerce experience.',
    illustrationPath: '/illustrations/features/details.svg',
    redirectRoute: '/docs',
  },
  {
    title: 'Sell products globally',
    description:
      'Expand your reach with our multi-language and multi-currency features! Sell to anyone, anywhere in the world.',
    illustrationPath: '/illustrations/features/connected-world.svg',
    redirectRoute: '/docs',
  },
  {
    title: 'Secure payments',
    description:
      'Rest easy knowing that your payments are secure with our PCI-compliant payment gateway. We support all major credit cards and PayPal.',
    illustrationPath: '/illustrations/features/online-payments.svg',
    redirectRoute: '/docs',
  },
  {
    title: '24/7 online support',
    description:
      'Our team of experts is here to help you with any questions you may have. Get in touch with us anytime, day or night!',
    illustrationPath: '/illustrations/features/active-support.svg',
    redirectRoute: '/docs',
  },
  {
    title: 'Powerful analytics',
    description:
      'Track your store’s performance with our powerful analytics tools. Monitor your sales, customer behavior, and more to make informed decisions.',
    illustrationPath: '/illustrations/features/real-time-analytics.svg',
    redirectRoute: '/docs',
  },
  {
    title: 'Easy integrations',
    description:
      'Easily connect your store with your favorite tools and services. We offer seamless integrations with popular platforms like Mailchimp, Google Analytics, and more.',
    illustrationPath: '/illustrations/features/online-connection.svg',
    redirectRoute: '/docs',
  },
];

export const PRICING_PLANS = [
  {
    planName: 'Starter',
    price: '$14.99/month',
    features: [
      'Up to 100 products',
      'Basic analytics',
      'Email support',
      'Single language',
      'Single currency',
      'Order tracking',
    ],
    cta: 'Get Started',
    redirectRoute: '/checkout/starter',
  },
  {
    planName: 'Professional',
    price: '$39.99/month',
    features: [
      'All Starter features',
      'Unlimited products',
      'Advanced analytics',
      'Priority email support',
      'Multi-language support',
      'Multi-currency support',
      'Custom domain support',
    ],
    cta: 'Upgrade Now',
    redirectRoute: '/checkout/professional',
  },
  {
    planName: 'Enterprise',
    price: 'Custom Pricing',
    features: [
      'All Professional features',
      'Dedicated account manager',
      'Custom integrations',
      'Full API access',
      'Unlimited everything',
      '24/7 online support',
    ],
    cta: 'Contact Sales',
    redirectRoute: '/contact-sales',
  },
];
