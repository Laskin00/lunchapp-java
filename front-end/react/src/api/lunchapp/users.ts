import axios from "axios";

export interface IUser {
  uuid: string;
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

export interface SuccessResponse {
  success: boolean;
}

export const signIn = async (data: ISignInData): Promise<IUser> => {
  const response = await axios.post("/user/login", data);

  return response.data;
};

export const signUp = async (data: ISignUpData): Promise<ISignUpResponse> => {
  const response = await axios.post("/user/register", data);

  return response.data;
};

export const signOut = async (
  sessionToken: string
): Promise<SuccessResponse> => {
  const response = await axios.post("/user/logout", sessionToken);

  return response.data;
};

export const getMe = async (): Promise<IUser> => {
  const response = await axios.get("/get");

  return response.data;
};
