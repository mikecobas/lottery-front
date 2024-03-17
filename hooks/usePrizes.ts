import { PrizesContext } from "@/contexts/PrizesContext";
import { useEffect, useContext } from "react";

const usePrizes = () => {
  const { dispatch } = useContext(PrizesContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://privatedevs.com/api-contest/api/v1/prizes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_PRIZES", payload: data });
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch({ type: "SET_ERROR", error: true });
      });
  }, [dispatch]);

  return;
};

export default usePrizes;
