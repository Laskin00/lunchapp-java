import React, { Component } from "react";
import { ISignInData, ISignUpData, IUser } from "../api/lunchapp";
import * as api from "../api/lunchapp";

type AuthContextValue = {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  signUp: (data: ISignUpData) => Promise<void>;
  signIn: (data: ISignInData) => Promise<void>;
  signOut: () => Promise<void>;
  getMe: () => Promise<void>;
};

const AuthContext = React.createContext({} as AuthContextValue);

type State = AuthContextValue;

export class AuthContextProvider extends Component<{}, State> {
  componentDidMount() {
    this.getMe().finally(() => {
      this.setState({ error: null });
    });
  }

  signIn = async (data: ISignInData) => {
    try {
      this.setState({ isLoading: true });
      const me = await api.signIn(data);
      this.setState({ user: me });
    } catch (error) {
      this.setState({ error: api.extractError(error) });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  signUp = async (data: ISignUpData) => {};

  signOut = async () => {};

  getMe = async () => {
    try {
      this.setState({ isLoading: true });
      const me = await api.getMe();
      this.setState({ user: me });
    } catch (error) {
      this.setState({ error: api.extractError(error) });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  state: State = {
    user: null,
    isLoading: false,
    error: null,
    signUp: this.signUp,
    signIn: this.signIn,
    signOut: this.signOut,
    getMe: this.getMe,
  };

  render() {
    return null;
    // return (
    //   <AuthContext.Provider value={this.state}>
    //     {this.props.children}
    //   </AuthContext.Provider>
    // );
  }
}
