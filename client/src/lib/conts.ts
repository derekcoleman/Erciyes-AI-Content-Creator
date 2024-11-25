import { Post } from "./types";

const API_BASE_URL = "http://192.168.197.116:8080/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  SETTNGS: `${API_BASE_URL}/settings/topic`,
  JOBS: `${API_BASE_URL}/settings`,
  FETCH_USER_INFO: `${API_BASE_URL}/user/info`,
  AI: `${API_BASE_URL}/ai`,
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

const DUMMY_BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum odio ex, elementum nec sagittis quis, aliquam vel risus. Duis cursus viverra ante sit amet molestie. Morbi risus libero, elementum sed dapibus sit amet, hendrerit non quam. Duis nec dui tempus, vehicula odio et, posuere metus. Proin venenatis dolor ac odio posuere congue. Ut scelerisque massa non dui eleifend, ut pellentesque lectus posuere. Mauris pulvinar metus in odio ornare, eget tempor ex ultricies. Phasellus lobortis purus at lacus iaculis, sit amet tempor velit hendrerit. Donec volutpat mauris semper ipsum euismod faucibus in a leo. Sed a sem hendrerit, efficitur nunc quis, condimentum justo. Donec vel est mattis, elementum ex nec, porta arcu. Nam elementum tincidunt neque sed pharetra. Mauris at euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum odio ex, elementum nec sagittis quis, aliquam vel risus. Duis cursus viverra ante sit amet molestie. Morbi risus libero, elementum sed dapibus sit amet, hendrerit non quam. Duis nec dui tempus, vehicula odio et, posuere metus. Proin venenatis dolor ac odio posuere congue. Ut scelerisque massa non dui eleifend, ut pellentesque lectus posuere. Mauris pulvinar metus in odio ornare, eget tempor ex ultricies. Phasellus lobortis purus at lacus iaculis, sit amet tempor velit hendrerit. Donec volutpat mauris semper ipsum euismod faucibus in a leo. Sed a sem hendrerit, efficitur nunc quis, condimentum justo. Donec vel est mattis, elementum ex nec, porta arcu. Nam elementum tincidunt neque sed pharetra. Mauris at euismod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum odio ex, elementum nec sagittis quis, aliquam vel risus. Duis cursus viverra ante sit amet molestie. Morbi risus libero, elementum sed dapibus sit amet, hendrerit non quam. Duis nec dui tempus, vehicula odio et, posuere metus. Proin venenatis dolor ac odio posuere congue. Ut scelerisque massa non dui eleifend, ut pellentesque lectus posuere. Mauris pulvinar metus in odio ornare, eget tempor ex ultricies. Phasellus lobortis purus at lacus iaculis, sit amet tempor velit hendrerit. Donec volutpat mauris semper ipsum euismod faucibus in a leo. Sed a sem hendrerit, efficitur nunc quis, condimentum justo. Donec vel est mattis, elementum ex nec, porta arcu. Nam elementum tincidunt neque sed pharetra. Mauris at euismod.";
export const DUMMYPOSTS: Post[] = [
  {
    code: 200,
    message: "message",
    status: true,
    post: { user_id: 1, title: "1th Title", body: DUMMY_BODY },
  },
  {
    code: 200,
    message: "message",
    status: true,
    post: { user_id: 1, title: "2nd Title", body: DUMMY_BODY },
  },
  {
    code: 200,
    message: "message",
    status: true,
    post: { user_id: 1, title: "3rd Title", body: DUMMY_BODY },
  },
  {
    code: 200,
    message: "message",
    status: true,
    post: { user_id: 1, title: "5th Title", body: DUMMY_BODY },
  },
  {
    code: 200,
    message: "message",
    status: true,
    post: { user_id: 1, title: "6th Title", body: DUMMY_BODY },
  },
];
export const DUMMYJOBS = [
  {
    title: "Test Title 1",
    platform: "Instagram",
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
    platform: "Facebook",
    days: ["Pazar", "Salı"],
    hour: "09.00",
  },
  {
    title: "Test Title 4",
    platform: "Twitter",
    days: ["Çarşamba", "Perşembe"],
    hour: "18.00",
  },
  {
    title: "Test Title 5",
    platform: "Snapchat",
    days: ["Cuma", "Cumartesi"],
    hour: "10.00",
  },
  {
    title: "Test Title 6",
    platform: "TikTok",
    days: ["Salı", "Perşembe"],
    hour: "13.00",
  },
  {
    title: "Test Title 7",
    platform: "YouTube",
    days: ["Çarşamba", "Pazar"],
    hour: "16.00",
  },
  {
    title: "Test Title 8",
    platform: "Pinterest",
    days: ["Pazartesi", "Perşembe"],
    hour: "11.00",
  },
];
export const platforms = ["Instagram", "LinkedIn", "Facebook", "Twitter"];
