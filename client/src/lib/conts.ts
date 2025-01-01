import { SpecificCustomCard, specificHeaders } from "./types";

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

export const DUMMYJOBS = [
  {
    title: "Test Title 1",
    platform: "Topix",
    days: ["Pazartesi", "Salı", "Cuma"],
    hour: "14.00",
  },
  {
    title: "Test Title 2",
    platform: "LinkedIn",
    days: [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
      "Pazar",
    ],
    hour: "17.00",
  },
  {
    title: "Test Title 3",
    platform: "Topix",
    days: ["Pazar", "Salı"],
    hour: "09.00",
  },
  {
    title: "Test Title 4",
    platform: "Topix",
    days: ["Çarşamba", "Perşembe"],
    hour: "18.00",
  },
  {
    title: "Test Title 5",
    platform: "Topix",
    days: ["Cuma", "Cumartesi"],
    hour: "10.00",
  },
  {
    title: "Test Title 6",
    platform: "Topix",
    days: ["Salı", "Perşembe"],
    hour: "13.00",
  },
  {
    title: "Test Title 7",
    platform: "Topix",
    days: ["Çarşamba", "Pazar"],
    hour: "16.00",
  },
  {
    title: "Test Title 8",
    platform: "Topix",
    days: ["Pazartesi", "Perşembe"],
    hour: "11.00",
  },
];
export const platforms = ["Topix", "Instagram", "LinkedIn"];

export const avg = {
  color: "#DA00FF",
  label: "Average",
  data: [3, 4, 2, 1, 3],
};

export const ALL_SERIES_SPESIFIC = [
  {
    color: "#72CCFF",
    label: "Interaction",
    data: [10, 5, 8, 4, 3],
  },

  {
    color: "#72CCFF",
    label: "Comments",
    data: [2, 6, 2, 4, 1],
  },

  {
    color: "#72CCFF",
    label: "Likes",
    data: [8, 5, 9, 4, 3],
  },

  {
    color: "#72CCFF",
    label: "Comments/Int.",
    data: [3, 3, 5, 2, 1],
  },

  {
    color: "#72CCFF",
    label: "Likes/Int.",
    data: [3, 4, 5, 2, 5],
  },
];
export const spesificPostCardFilters = [
  "Interaction",
  "Comments",
  "Likes",
  "Comments/Int.",
  "Likes/Int.",
];
export const performanceFilters = ["All", "Comments", "Likes", "Followers"];

export const ALL_SERIES_PERFORMANCE = [
  {
    color: "#02B2AF",
    label: "Comments",
    data: [12, 42, 24, 42, 57, 7, 78, 4, 12, 3, 21, 34, 29, 61, 55],
  },
  {
    color: "#72CCFF",
    label: "Likes",
    data: [55, 23, 34, 67, 89, 4, 15, 36, 98, 41, 60, 22, 38, 53, 82],
  },
  {
    color: "#DA00FF",
    label: "Followers",
    data: [5, 100, 78, 65, 42, 11, 30, 60, 71, 81, 22, 53, 30, 19, 80],
  },
];

export const PERORMANCESUM_DUMMY_DATA = [
  { count: 1233, title: "My Posts" },
  { count: 24215, title: "Likes" },
  { count: 3234, title: "Comments" },
  { count: 15234, title: "Followers" },
];
export const moods = [
  "",
  "Eğlenceli",
  "Hüzünlü",
  "Duygusal",
  "Gerçekçi",
  "Gergin",
];
