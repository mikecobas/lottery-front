import { useContext, useEffect } from "react";
import { ContestContext } from "@/contexts/ContestContext";

const useContestPost = (action: 'create' | 'edit', id?: string) => {
  const { dispatch } = useContext(ContestContext);

  const postContest = async (contestData: object): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const url = action === 'create' 
      ? "https://privatedevs.com/api-contest/api/v1/contests/create"
      : `https://privatedevs.com/api-contest/api/v1/contests/${id}`;

    const method = action === 'create' ? 'POST' : 'PUT';

    const response = await fetch(
      url,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contestData),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to ${action} contest`);
    }
  };

  return { postContest };
};

export default useContestPost;