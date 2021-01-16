import * as api from '../api/lunchapp';

export const useAuth = async () => {
  const user = await api.getUserByUuid();

  return {
    user: user,
    isAuthenticated: user ? true : false,
  };
};
