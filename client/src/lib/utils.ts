import { API_ENDPOINTS } from "./conts";
import {
  Job,
  JobsFormData,
  JobsInfo,
  LoginFormData,
  LoginInfo,
  Post,
  PromptSettingsInfo,
  RegisterFormData,
  RegisterInfo,
  Settings,
  SettingsFormData,
  SettingsInfo,
  WordSettingsInfo,
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

const addPromptSettings = async (formData: {
  customTopic: string;
  mood: string;
  selectedInteractions: string[];
}): Promise<PromptSettingsInfo> => {
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

  const data: PromptSettingsInfo = await response.json();
  return data;
};

const addWordSettings = async (formData: {
  wantedWords: string[];
  bannedWords: string[];
}): Promise<WordSettingsInfo> => {
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

  const data: WordSettingsInfo = await response.json();
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

const textLimiter = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
const platformMapping: { [key: string]: number } = {
  Topix: 1,
  Instagram: 2,
  LinkedIn: 3,
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

const getTheme = (): "Light" | "Dark" => {
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "Light";
  return theme === "Dark" ? "Dark" : "Light";
};

const abbreviateNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
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
  abbreviateNumber,
  addWordSettings,
  addPromptSettings,
};
