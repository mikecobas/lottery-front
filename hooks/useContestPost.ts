import { useContext, useEffect } from "react";
import { ContestContext } from "@/contexts/ContestContext";

const useContestPost = () => {
  const { dispatch } = useContext(ContestContext);

  const postContest = async (contestData: object): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      "https://privatedevs.com/api-contest/api/v1/contests/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contestData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to post contest");
    }
  };

  return { postContest };
};

export default useContestPost;
