import axios from "axios";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
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

export const signUp = async (data: ISignUpData): Promise<IUser> => {
  const response = await axios.post("/user/register", data);

  return response.data;
};

export const signOut = async (): Promise<SuccessResponse> => {
  const response = await axios.post("/user/logout");

  return response.data;
};

export const getMe = async (): Promise<IUser> => {
  const response = await axios.get("/get");

  return response.data;
};
