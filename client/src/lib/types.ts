enum Field {
  Password,
  RePassword,
}
enum Variant {
  contained,
  text,
  outlined,
}

enum specificHeaders {
  "Interaction",
  "Comments",
  "Likes",
  "Comments/Int.",
  "Likes/Int.",
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}

export interface SettingsFormData {
  language?: string;
  topic?: string;
  wantedWords?: string[];
  bannedWords?: string[];
  customTopic?: string;
  mood?: string;
  selectedInteractions?: string[];
}

export interface JobsFormData {
  platform: string;
  selectedDays: number[];
  hour: number;
}

export interface LoginInfo {
  code: number;
  message: string;
  status: boolean;
  token: string;
}
export interface RegisterInfo {
  code: number;
  message: string;
  status: boolean;
}

export interface SettingsInfo {
  code: number;
  message: string;
  status: boolean;
}

export interface JobsInfo {
  code: number;
  message: string;
  status: boolean;
}

export interface Job {
  platform_id: number;
  hour: number;
  day: number;
}

export interface JobData {
  platform: string;
  hour: string;
  day: string[];
  title: string;
}

export interface Post {
  code: number;
  message: string;
  status: boolean;
  post: { user_id: number; title: string; body: string };
}

export interface CustomCardProps {
  platform: string;
  postImage: string;
  title: string;
  content: string;
  hashtags: string[];
  likes: number;
  comments: number;
  date: string;
  height?: number;
  isInnerCard?: boolean;
}

export interface SpecificCustomCard extends CustomCardProps {
  specificHeader: specificHeaders;
}

export interface WordSettingsInfo {
  wantedWords: string[];
  bannedWords: string[];
}
export interface PromptSettingsInfo {
  customTopic: string;
  mood: string;
  selectedInteractions: string[];
}
export interface SettingsFormInfo {
  topic: string;
  language: string;
}

export interface Settings {
  code: number;
  message: string;
  status: boolean;
  language: string;
  topic: string;
  wantedWords?: string[];
  bannedWords?: string[];
  customTopic?: string;
  mood?: string;
  selectedInteractions?: string[];
  disabled?: boolean;
}

export interface ProfileInfoData {
  code: number;
  message: string;
  status: boolean;
  username: string;
  email: string;
  topixAPI: string;
  linkedinAPI: string;
  instagramAPI: string;
}

export interface ProfileAPIs {
  topixAPI: string;
  linkedinAPI: string;
  instagramAPI: string;
}
export interface ProfileInfo {
  code: number;
  message: string;
  status: boolean;
}

export { Field, Variant, specificHeaders };
