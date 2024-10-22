import { API_ENDPOINTS } from "./conts";
import { UserInfo } from "./types";

export const loginUser = async (
  email: string,
  password: string
): Promise<UserInfo> => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: UserInfo = await response.json();
  return data;
};
