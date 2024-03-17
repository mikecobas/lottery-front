import { ContestData } from "@/interfaces/prices.interface";
import { useEffect, useState } from "react";

const usePrices = (id:string) => {

    const [data, setData] = useState<ContestData>()

    useEffect(() => {
        getPrices();
    }, []);

    const getPrices = async (): Promise<void> => {
        const response = await fetch(
            `https://privatedevs.com/api-contest/api/v1/contests/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setData(data)
        } else {
            throw new Error("Failed to fetch contests");
        }
    };

    return {data, getPrices}
};

export default usePrices;