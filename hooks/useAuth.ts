import { AuthContext } from "@/contexts/AuthContext";
import { useState, useContext } from "react";
import { AuthResponse, Payload, User } from "@/interfaces/auth.interface";
const useAuth = () => {
  const { dispatch } = useContext(AuthContext);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await fetch(
      "https://privatedevs.com/api-contest/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (response.ok) {
      const data: AuthResponse = await response.json();
      const { payload } = data;
      dispatch({
        type: "LOGIN",
        payload: { user: payload.user, token: payload.token },
      });
      return data;
    } else {
      throw new Error("Failed to authenticate");
    }
  };

  return { login };
};

export default useAuth;
