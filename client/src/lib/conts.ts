const API_BASE_URL = "localhost:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  FETCH_USER_INFO: `${API_BASE_URL}/user/info`,
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

export const platforms = ["Instagram", "LinkedIn", "Facebook", "Twitter"];
