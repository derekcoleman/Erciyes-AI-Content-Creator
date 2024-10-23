import { API_ENDPOINTS } from "./conts";
import { LoginFormData, RegisterFormData, UserInfo } from "./types";

const loginUser = async (formData: LoginFormData): Promise<UserInfo> => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: UserInfo = await response.json();
  return data;
};

const registerUser = async (formData: RegisterFormData): Promise<UserInfo> => {
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  const data: UserInfo = await response.json();
  return data;
};

export { registerUser, loginUser };
