export const formatPrice = (price: number, locale: string = 'en-US', currency: string = 'USD') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(price);
};
