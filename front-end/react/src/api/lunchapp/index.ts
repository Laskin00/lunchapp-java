import { AxiosError } from "axios";

export * from "./users";

export const extractError = (error: AxiosError) => {
  return error?.response?.data?.message || error?.message;
};
