import { useContext, useEffect, useCallback } from "react";
import { PrizesContext } from "@/contexts/PrizesContext";

const usePrizes = () => {
    const { dispatch } = useContext(PrizesContext);

    const getPrizes = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No se encontró token");
        }

        const response = await fetch(
            "https://privatedevs.com/api-contest/api/v1/prizes/",
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
                type: "SET_PRIZES",
                payload: data,
            });
        } else {
            throw new Error("Error al obtener los premios");
        }
    }, [dispatch]);

    useEffect(() => {
        getPrizes();
    }, [getPrizes]);

    return { getPrizes };
};

export default usePrizes;