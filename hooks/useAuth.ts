import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthState {
  loading: boolean;
  error: string | null;
}

interface LoginFunction {
  (username: string, password: string): Promise<void>;
}

interface LoginResponse {
  token: string;
}

export function useAuth(): [AuthState, LoginFunction] {
  const [state, setState] = useState<AuthState>({ loading: false, error: null });

  const login: LoginFunction = async (email: string, password: string) => {
    setState({ loading: true, error: null });

    try {
      const response: AxiosResponse<LoginResponse> = await axios.post('https://privatedevs.com/api-contest/api/v1/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setState({ loading: false, error: null });
    } catch (error: any) {
      setState({ loading: false, error: error.message });
    }
  };

  return [state, login];
}