'use client';
import React, { createContext, useReducer, useEffect, useContext } from 'react';

type User = {
  name: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
  uid: string;
};

type State = {
  user: User | null;
  token: string | null;
};

type Action =
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

const storedUser = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('user') : null;
const initialState: State = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null,
};

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      return { user: null, token: "" };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token || '');
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}