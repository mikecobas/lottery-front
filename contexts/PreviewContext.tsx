'use client'
import React, { createContext, useReducer } from 'react';
import { Skeleton } from '@mantine/core';


const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };


type Action =
    | { type: 'SET_PREVIEW'; payload: {} }


const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
    case 'SET_PREVIEW':
        return {
            ...state,
            ...action.payload,
        };
        default:
            return state;
    }
};


const SorteoContext = createContext<{
    state: typeof initialState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});


const SorteoProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SorteoContext.Provider value={{ state, dispatch }}>
            {children}
        </SorteoContext.Provider>
    );
};

export { SorteoContext, SorteoProvider };