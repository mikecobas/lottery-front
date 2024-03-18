'use client'
import React, { createContext, useReducer, Dispatch } from 'react';


interface Prize {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    contestId: {
        _id: string;
        name: string;
    };
    orderToLot: number;
    image: string;
    markAsDelivery: boolean;
    createdAt: string;
    updatedAt: string;
    winner: string;
}

interface State {
    status: number;
    error: boolean;
    msg: string;
    payload: Prize[];
}


const initialState: State = {
    status: 0,
    error: false,
    msg: '',
    payload: [],
};


type Action =
    | { type: 'SET_PRIZES'; payload: State }
    | { type: 'SET_ERROR'; error: boolean };


const prizesReducer = (state: State, action: Action): State => {    switch (action.type) {
        case 'SET_PRIZES':
            return { ...state, payload: action.payload.payload };
        case 'SET_ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};


interface PrizesContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

export const PrizesContext = createContext<PrizesContextProps>({
    state: initialState,
    dispatch: () => null,
});


export const PrizesProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(prizesReducer, initialState);

    return (
        <PrizesContext.Provider value={{ state, dispatch }}>
            {children}
        </PrizesContext.Provider>
    );
};