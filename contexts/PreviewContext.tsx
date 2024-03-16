'use client'
import React, { createContext, useReducer } from 'react';
import { Skeleton } from '@mantine/core';

// Definir el estado inicial
const initialState = { name: "", status: true, rounds: 0, description: "", previewImg: <Skeleton height={160} /> };

// Definir los tipos de acciones
type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_STATUS'; payload: boolean }
    | { type: 'SET_ROUNDS'; payload: number }
    | { type: 'SET_DESCRIPTION'; payload: string }
    | { type: 'SET_PREVIEW_IMG'; payload: any };

// Crear el reducer
const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_STATUS':
            return { ...state, status: action.payload };
        case 'SET_ROUNDS':
            return { ...state, rounds: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
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