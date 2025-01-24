export const getResources = async (): Promise<Resources> => {
  // TODO: Implement API call to get resources
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        apiUrl: 'https://api.cloud-resources.com',
      });
    }, 1000)
  );
};
