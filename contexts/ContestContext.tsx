'use client'
import React, { useReducer, createContext, Dispatch } from 'react';

interface User {
    _id: string;
    name: string;
}

interface Contest {
    _id: string;
    name: string;
    status: boolean;
    rounds: number;
    contestDate: string;
    createdBy: User;
    image: string;
    createdAt: string;
    contestStatus: string;
}

interface State {
    status: number;
    error: boolean;
    msg: string;
    payload: Contest[];
}

interface Action {
    type: 'SET_CONTESTS';
    payload: Contest[];
}

const initialState: State = {
    status: 200,
    error: false,
    msg: '',
    payload: [],
};

// Crear el contexto
const ContestContext = createContext<{
    state: State;
    dispatch: Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

// Definir el reducer
const contestReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_CONTESTS':
            return {
                ...state,
                payload: action.payload,
            };
        default:
            return state;
    }
};

// Crear el proveedor del contexto
const ContestProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(contestReducer, initialState);
    return (
        <ContestContext.Provider value={{ state, dispatch }}>
            {children}
        </ContestContext.Provider>
    );
};

export { ContestContext, ContestProvider };