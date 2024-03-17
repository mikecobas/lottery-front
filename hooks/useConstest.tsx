import { useContext, useEffect, useCallback } from "react";
import { ContestContext } from "@/contexts/ContestContext";

const useContest = () => {
    const { dispatch } = useContext(ContestContext);

    const getContests = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(
            "https://privatedevs.com/api-contest/api/v1/contests/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: "SET_CONTESTS",
                payload: data.payload,
            });
        } else {
            throw new Error("Failed to fetch contests");
        }
    }, [dispatch]);

    useEffect(() => {
        getContests();
    }, [getContests]);

    return { getContests };
};

export default useContest;