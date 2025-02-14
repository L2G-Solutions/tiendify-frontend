import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/auth',
  withCredentials: true,
});

/**
 * Retrieves the current session details for the logged-in user.
 * @returns The current session data
 */
export const getCurrentSession = async (): Promise<GetCurrentSessionResponse> => {
  return (await fetcher.get('/private/me')).data;
};

/**
 * Logs out the current user by invalidating the session.
 */
export const logout = async (): Promise<void> => {
  await fetcher.post('/private/logout');
};

/**
 * Authorizes a login request by passing query parameters and validation URI.
 * @param queryParams - The query parameters
 * @param validation_uri - The validation callback URI
 */
export const authorizeLogin = async (queryParams: URLSearchParams, validation_uri: string): Promise<void> => {
  const params = new URLSearchParams(queryParams);
  params.append('validation_uri', validation_uri);
  return (
    await fetcher.post(API_URL + '/auth/public/authorize', null, {
      params: params,
    })
  ).data;
};

/**
 * Creates a new user account with the provided data.
 * @param data - The user signup information
 * @returns The newly created user
 */
export const signup = async (data: SignUpPayload): Promise<User> => {
  return (await fetcher.post('/public/signup', data)).data;
};
