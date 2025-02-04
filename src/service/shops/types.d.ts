type Shop = {
  name: string;
  headline: string;
  about: string;
  currency: string;
  logoimg?: string;
  bannerimg?: string;
  country: string;
  status: string;
  verified: boolean; // Email verification
  webpageLink?: string;
};

type CreateShopPayload = {
  name: string;
  headline?: string;
  about?: string;
  currency: string;
  country: string;
};
