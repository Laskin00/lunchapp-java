import { useQuery } from 'react-query';
import * as api from '../api/lunchapp';

const staleTimeValue = 100 * 60 * 5;

export const useAuth = () => {
  // if there is a session token in cookies
  // user is logged in.
  // if there is session token in cookies send /user/get request to retrieve user using session token

  // const { data, error, status } = useQuery('me', api.getMe, {
  //   retry: false,
  //   refetchOnWindowFocus: true,
  //   staleTime: staleTimeValue,
  // });

  const user = api.getUserByUuid();

  return {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: status === 'loading',
  };
};
