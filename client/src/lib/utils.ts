import { API_ENDPOINTS } from "./conts";
import {
  LoginFormData,
  LoginInfo,
  RegisterFormData,
  RegisterInfo,
} from "./types";

const loginUser = async (formData: LoginFormData): Promise<LoginInfo> => {
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

  const data: LoginInfo = await response.json();
  return data;
};

const registerUser = async (
  formData: RegisterFormData
): Promise<RegisterInfo> => {
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

  const data: RegisterInfo = await response.json();
  return data;
};

const getHourFromDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return null;
  }
  return date.getHours();
};

const textLimiter = (text: string): string => {
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

export { registerUser, loginUser, getHourFromDate, textLimiter };
