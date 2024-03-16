'use client'
import React, { createContext, useReducer } from 'react';
import { Skeleton } from '@mantine/core';


const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };


type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_STATUS'; payload: string }
    | { type: 'SET_ROUNDS'; payload: number }
    | { type: 'SET_DATE'; payload: string }
    | { type: 'SET_PREVIEW_IMG'; payload: any };

// Crear el reducer
const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_STATUS':
            return { ...state, contestStatus: action.payload };
        case 'SET_ROUNDS':
            return { ...state, rounds: action.payload };
        case 'SET_DATE':
            return { ...state, contestDate: action.payload };
        case 'SET_PREVIEW_IMG':
            return { ...state, previewImg: action.payload };
        default:
            return state;
    }
};

// Crear el contexto
const SorteoContext = createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

// Crear el proveedor de contexto
const SorteoProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SorteoContext.Provider value={{ state, dispatch }}>
            {children}
        </SorteoContext.Provider>
    );
};

export { SorteoContext, SorteoProvider };