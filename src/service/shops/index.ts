export const getShopInfo = async (): Promise<Shop> => {
  // TODO: Fetch shop information from the API
  return {
    name: 'Nike',
    headline: "Yesterday's miles don't count today.",
    about:
      'Nike is a global brand that sells sports shoes, clothing, and equipment. It was founded in 1964 by Bill Bowerman and Phil Knight. The company is headquartered in Beaverton, Oregon, USA.',
    currency: 'COP',
    country: 'Colombia',
    bannerImg: 'https://images4.alphacoders.com/632/thumb-1920-632661.jpg',
    logoImg:
      'https://res.cloudinary.com/dmubfrefi/image/private/s--X0LLoOBX--/c_crop,h_2728,w_4090,x_334,y_0/f_auto/q_auto/v1/dee-about-cms-prod-medias/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?_a=BAAAV6Bs',
    status: 'active',
    verified: false,
    webpageLink: 'nike.com.co',
  };
};
