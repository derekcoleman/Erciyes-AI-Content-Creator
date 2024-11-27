import { API_ENDPOINTS } from "./conts";
import {
  Job,
  JobsFormData,
  JobsInfo,
  LoginFormData,
  LoginInfo,
  Post,
  RegisterFormData,
  RegisterInfo,
  Settings,
  SettingsFormData,
  SettingsInfo,
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
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data: LoginInfo = await response.json();
  return data;
};

const registerUser = async (
  formData: RegisterFormData
): Promise<RegisterInfo> => {
  console.log(JSON.stringify(formData));
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
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

const addSettings = async (
  formData: SettingsFormData
): Promise<SettingsInfo> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  const response = await fetch(API_ENDPOINTS.SETTNGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save settings");
  }

  const data: SettingsInfo = await response.json();
  console.log("data: ", data);
  return data;
};

const addJobs = async (job: Job): Promise<JobsInfo> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  const response = await fetch(API_ENDPOINTS.JOBS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save job");
  }

  const data: JobsInfo = await response.json();
  console.log("data: ", data);
  return data;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const textLimiter = (text: string): string => {
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};
const platformMapping: { [key: string]: number } = {
  Instagram: 1,
  LinkedIn: 2,
  Facebook: 3,
  Twitter: 4,
};

const jobDataParser = ({
  platform,
  selectedDays,
  hour,
}: JobsFormData): Job[] => {
  const platform_id = platformMapping[platform] || -1;

  return selectedDays.map((day) => ({
    platform_id,
    hour,
    day,
  }));
};

const getPosts = async (): Promise<Post> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.AI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch post");
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching post."
      );
    }
    throw new Error("Unknown error occurred while fetching post.");
  }
};

const getSettings = async (): Promise<Settings> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch("endpoint", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch post");
    }

    const data: Settings = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching post."
      );
    }
    throw new Error("Unknown error occurred while fetching post.");
  }
};

const getTheme = (): string => {
  const theme = localStorage.getItem("theme");
  return theme ?? "Light";
};

export {
  registerUser,
  loginUser,
  getHourFromDate,
  textLimiter,
  addSettings,
  jobDataParser,
  addJobs,
  getPosts,
  getSettings,
  getTheme,
};
