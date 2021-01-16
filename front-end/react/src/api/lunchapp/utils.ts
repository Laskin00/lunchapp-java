import { AxiosError } from 'axios';

export type ErrorResponse = {
  statusCode: number;
  message: string;
  details: {};
};

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

function isAxiosError(error: unknown): error is AxiosError<any> {
  return isError(error) && !!(error as AxiosError<any>)?.response?.data;
}

export const extractErrorMsg = (error: unknown): string | null => {
  if (isAxiosError(error)) {
    return error.response?.data?.message;
  }

  if (isError(error)) {
    return error.message;
  }

  return null;
};

export const extractApiError = (error: unknown): ErrorResponse | null => {
  if (isAxiosError(error)) {
    return error?.response?.data;
  }

  return null;
};
