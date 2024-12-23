import { API_ENDPOINTS, daysOfWeek } from "./conts";
import {
  Job,
  JobData,
  JobsFormData,
  JobsInfo,
  LoginFormData,
  LoginInfo,
  Post,
  ProfileAPIs,
  ProfileInfo,
  ProfileInfoData,
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

const addSettings = async (
  formData: SettingsFormData
): Promise<SettingsInfo> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  const response = await fetch(API_ENDPOINTS.SETTINGS, {
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

const getHome = async (): Promise<Post[]> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.HOME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching posts."
      );
    }
    throw new Error("Unknown error occurred while fetching posts.");
  }
};

const getJobs = async (): Promise<Job[]> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.ALL_JOBS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch jobs");
    }

    const data: Job[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching jobs."
      );
    }
    throw new Error("Unknown error occurred while fetching jobs.");
  }
};

const getSettings = async (): Promise<Settings> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.JOBS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch settings");
    }

    const data: Settings = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching settings."
      );
    }
    throw new Error("Unknown error occurred while fetching settings.");
  }
};

const getProfile = async (): Promise<ProfileInfoData> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    const data: ProfileInfoData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching profile."
      );
    }
    throw new Error("Unknown error occurred while fetching profile.");
  }
};

const updateProfile = async (
  profileData: ProfileAPIs
): Promise<ProfileInfo> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch(API_ENDPOINTS.PROFILE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    const data: ProfileInfo = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "Unknown error occurred while fetching profile."
      );
    }
    throw new Error("Unknown error occurred while fetching profile.");
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

const textLimiter = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const platformMapping: { [key: string]: number } = {
  Topix: 1,
  Instagram: 2,
  LinkedIn: 3,
};

const getHourFromDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return null;
  }
  return date.getHours();
};

//günler kısmı sıkınıtlı array gelemsi gerekli
const jobToJobData = (jobs: Job[]): JobData[] => {
  return jobs.map((job) => {
    const platform_id = job.platform_id;
    const hour = job.hour;
    const day = job.day;

    const platform =
      Object.keys(platformMapping).find(
        (key) => platformMapping[key] === platform_id
      ) || "Unknown";

    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;

    const dayLabel =
      daysOfWeek.find((d) => d.value === day)?.label || "Unknown";

    const title = `Job at ${platform}`;

    return {
      platform,
      hour: formattedHour,
      day: [dayLabel],
      title,
    };
  });
};

export {
  loginUser,
  registerUser,
  getHome,
  getJobs,
  getPosts,
  getSettings,
  getProfile,
  addJobs,
  addSettings,
  updateProfile,
  jobDataParser,
  textLimiter,
  abbreviateNumber,
  getHourFromDate,
  getTheme,
  jobToJobData,
};
