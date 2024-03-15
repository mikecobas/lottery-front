import React from "react";

// Definir la interfaz para el estado
interface State {
  status: number;
  error: boolean;
  msg: string;
  payload: {
    user: {
      name: string;
      email: string;
      role: string;
      status: boolean;
      createdAt: string;
      uid: string;
    };
    token: string;
  };
}

// Definir la interfaz para la acción
interface Action {
  type: string;
  payload: any;
}

// Crear el reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        status: 200,
        error: false,
        msg: '',
        payload: {
          user: {
            name: '',
            email: '',
            role: '',
            status: false,
            createdAt: '',
            uid: '',
          },
          token: '',
        },
      };
    default:
      return state;
  }
}

// Crear el contexto
const AuthContext = React.createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Crear el proveedor de contexto
const AuthProvider: React.FC = ({ children }:any) => {
  const [state, dispatch] = React.useReducer(reducer, {
    status: 200,
    error: false,
    msg: '',
    payload: {
      user: {
        name: '',
        email: '',
        role: '',
        status: false,
        createdAt: '',
        uid: '',
      },
      token: '',
    },
  });

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };