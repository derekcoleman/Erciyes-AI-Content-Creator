export const API_BASE_URL = "http://192.168.1.20:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  SETTINGS: `${API_BASE_URL}/settings/topic`,
  JOBS: `${API_BASE_URL}/settings`,
  FETCH_USER_INFO: `${API_BASE_URL}/user/info`,
  AI: `${API_BASE_URL}/ai`,
  ALL_JOBS: `${API_BASE_URL}/settings/getjob`,
  HOME: `${API_BASE_URL}/homepage`,
  PROFILE: `${API_BASE_URL}/profile`,
  TOPİX: `${API_BASE_URL}/topix`,
  STATISTICS: `${API_BASE_URL}/statistics`,
  DELETEJOB: `${API_BASE_URL}/settings/delete/job`,
};

export const daysOfWeek = [
  { label: "Pazartesi", value: 1 },
  { label: "Salı", value: 2 },
  { label: "Çarşamba", value: 3 },
  { label: "Perşembe", value: 4 },
  { label: "Cuma", value: 5 },
  { label: "Cumartesi", value: 6 },
  { label: "Pazar", value: 7 },
];
export const INTERACTIONLIST = [
  "Beğeni",
  "Yorum",
  "Etkileşim",
  "Sık Kelimeler",
];

export const platforms = ["Topix", "Instagram", "LinkedIn"];

export const spesificPostCardFilters = [
  "Interaction",
  "Comments",
  "Likes",
  "Views",
  "Comments/Int.",
  "Likes/Int.",
];
export const performanceFilters = ["All", "Comments", "Likes", "Followers"];

export const moods = [
  "",
  "Eğlenceli",
  "Hüzünlü",
  "Duygusal",
  "Gerçekçi",
  "Gergin",
];
