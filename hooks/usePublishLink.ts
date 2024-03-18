import { ContestData } from "@/interfaces/prices.interface";
import { useState } from "react";

const usePublishLink = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No se encontró token");
    }

    const [data, setData] = useState<ContestData>()

    const publishLink = async (id:string): Promise<void> => {
        const response = await fetch(
            `https://privatedevs.com/api-contest/api/v1/contests/promotion/${id}`,
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
            setData(data)
        } else {
            throw new Error("Failed to fetch contests");
        }
    };

    return {data, publishLink}
};

export default usePublishLink;