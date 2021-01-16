import axios from 'axios';
import { getSessionCookie } from '../../session';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  sessionToken: string;
}

export interface ISignUpResponse {
  message?: string;
  error?: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISignOutData {
  sessionToken: string;
}

export interface SuccessResponse {
  success: boolean;
}

const userUuid = getSessionCookie();

export const signIn = async (data: ISignInData): Promise<IUser> => {
  const response = await axios.post('/user/login', data);

  return response.data;
};

export const signUp = async (data: ISignUpData): Promise<ISignUpResponse> => {
  const response = await axios.post('/user/register', data);
  console.log(response);

  return response.data;
};

export const signOut = async (
  sessionToken: ISignOutData
): Promise<SuccessResponse> => {
  console.log(sessionToken);
  const response = await axios.post('/user/logout', sessionToken);

  console.log(response);

  return response.data;
};

export const getUserByUuid = async (): Promise<IUser> => {
  const response = await axios.get(`/user/${userUuid}`);

  return response.data;
};
