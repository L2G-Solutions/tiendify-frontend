/**
 * The formatPrice function is a utility designed to format a given numeric price into a currency string,
 * according to a specified locale and currency.
 *
 * @param price The numeric price to be formatted.
 * @param locale The locale to be used for formatting the price.
 * @param currency Currency code to be used for formatting the price.
 * @returns The formatted price string.
 */
export const formatPrice = (price: number, locale: string = 'en-US', currency: string = 'USD') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });
  return formatter.format(price);
};
