import { API_ENDPOINTS, daysOfWeek } from "./conts";
import {
  Job,
  Job_Backend,
  JobData,
  JobsFormData,
  FetchInfo,
  LoginFormData,
  LoginInfo,
  Post,
  Post_Backend,
  ProfileAPIs_Backend,
  ProfileInfoData_Backend,
  RegisterFormData,
  Settings,
  Settings_Backend,
  SettingsFormData,
  SettingsFormData_Backend,
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

const registerUser = async (formData: RegisterFormData): Promise<FetchInfo> => {
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

  const data: FetchInfo = await response.json();
  return data;
};

const addSettings = async (
  formData: SettingsFormData_Backend
): Promise<FetchInfo> => {
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

  const data: FetchInfo = await response.json();
  console.log("data: ", data);
  return data;
};

const addJobs = async (job: Job): Promise<FetchInfo> => {
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

  const data: FetchInfo = await response.json();
  console.log("data: ", data);
  return data;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const getPostWithAI = async (): Promise<Post> => {
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

const getHome = async (): Promise<Post_Backend> => {
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

    const data: Post_Backend = await response.json();
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

const getJobs = async (): Promise<Job_Backend> => {
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

    const data: Job_Backend = await response.json();
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

const getSettings = async (): Promise<Settings_Backend> => {
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

const getProfile = async (): Promise<ProfileInfoData_Backend> => {
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

    const data: ProfileInfoData_Backend = await response.json();
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
  profileData: ProfileAPIs_Backend
): Promise<FetchInfo> => {
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

    const data: FetchInfo = await response.json();
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
  const platform_id =
    platformMapping[platform] !== undefined ? platformMapping[platform] : -1;

  return selectedDays.map((day) => ({
    platform_id,
    hour,
    day,
  }));
};

const textLimiter = (text: string | undefined, length: number): string => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const platformMapping: { [key: string]: number } = {
  Topix: 0,
  Instagram: 1,
  LinkedIn: 2,
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

const transformSettingsFromBackend = (
  backendSettings: Settings_Backend
): Settings => {
  const interactionMapping: { [key: string]: string } = {
    like: "Beğeni",
    comment: "Yorum",
    interaction: "Etkileşim",
    frequency: "Sık Kelimeler",
  };

  const moodMapping: { [key: string]: string } = {
    funny: "Eğlenceli",
    sad: "Hüzünlü",
    romantic: "Duygusal",
    realistic: "Gerçekçi",
    nervous: "Gergin",
  };

  const selectedInteractions = [];

  if (backendSettings.like) selectedInteractions.push(interactionMapping.like);
  if (backendSettings.comment)
    selectedInteractions.push(interactionMapping.comment);
  if (backendSettings.interaction)
    selectedInteractions.push(interactionMapping.interaction);
  if (backendSettings.frequency)
    selectedInteractions.push(interactionMapping.frequency);

  const moodInTurkish =
    moodMapping[backendSettings.mood || ""] || backendSettings.mood;

  return {
    code: backendSettings.code,
    message: backendSettings.message,
    status: backendSettings.status,
    language: backendSettings.language,
    topic: backendSettings.topic,
    wantedWords: backendSettings.wantedWords,
    bannedWords: backendSettings.bannedWords,
    sub_topic: backendSettings.sub_topic,
    mood: moodInTurkish,
    selectedInteractions: selectedInteractions,
    disabled: backendSettings.disabled,
  };
};

// Frontend ve Backend arasındaki dönüşümü sağlamak için parser fonksiyonu
const transformSettingsToBackend = (
  settingsData: SettingsFormData
): SettingsFormData_Backend => {
  const moodMapping: { [key: string]: string } = {
    Eğlenceli: "funny",
    Hüzünlü: "sad",
    Duygusal: "romantic",
    Gerçekçi: "realistic",
    Gergin: "nervous",
  };

  const selectedInteractions = settingsData.selectedInteractions || [];

  const backendData: SettingsFormData_Backend = {
    language: settingsData.language,
    topic: settingsData.topic,
    wantedWords: settingsData.wantedWords,
    bannedWords: settingsData.bannedWords,
    sub_topic: settingsData.sub_topic,
    mood: moodMapping[settingsData.mood || ""] || settingsData.mood,

    like: selectedInteractions.includes("Beğeni") ? 1 : 0,
    comment: selectedInteractions.includes("Yorum") ? 1 : 0,
    interaction: selectedInteractions.includes("Etkileşim") ? 1 : 0,
    frequency: selectedInteractions.includes("Sık Kelimeler") ? 1 : 0,
  };

  return backendData;
};

const addPostManuel = async (post_id: number): Promise<FetchInfo> => {
  const token = getCookie("token");

  if (!token) {
    throw new Error("No token found, please login.");
  }

  const response = await fetch(API_ENDPOINTS.TOPİX, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ post_id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save settings");
  }

  const data: FetchInfo = await response.json();
  console.log("data: ", data);
  return data;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString); // ISO string'i Date nesnesine dönüştür
  const day = date.getDate().toString().padStart(2, "0"); // Gün
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ay, 1'den başlar, +1 ekliyoruz
  const year = date.getFullYear(); // Yıl
  return `${day}/${month}/${year}`; // Format: "gg/aa/yyyy"
};

export {
  loginUser,
  registerUser,
  getHome,
  getJobs,
  getPostWithAI,
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
  transformSettingsFromBackend,
  transformSettingsToBackend,
  addPostManuel,
  formatDate,
};
