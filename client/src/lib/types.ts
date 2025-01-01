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
  sub_topic?: string;
  mood?: string;
  selectedInteractions?: string[];
}
export interface SettingsFormData_Backend {
  language?: string;
  topic?: string;
  wantedWords?: string[];
  bannedWords?: string[];
  sub_topic?: string;
  mood?: string;
  like?: number;
  comment?: number;
  interaction?: number;
  frequency?: number;
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

export interface FetchInfo {
  code: number;
  message: string;
  status: boolean;
}

export interface Job {
  platform_id: number;
  hour: number;
  day: number;
}

export interface Job_Backend {
  data: Job[];
  code: number;
  message: string;
  status: boolean;
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
  post_id: number;
  created_at?: string;
}
export interface Post_Backend {
  code: number;
  message: string;
  status: boolean;
  posts: {
    id: number;
    user_id: number;
    title: string;
    body: string;
    photos?: object;
    status?: number;
    created_at: string;
  }[];
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
  id: number;
  isShared: number;
}

export interface SpecificCustomCard extends CustomCardProps {
  specificHeader: specificHeaders;
}

export interface WordSettingsInfo {
  wantedWords: string[];
  bannedWords: string[];
}
export interface PromptSettingsInfo {
  sub_topic: string;
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
  sub_topic?: string;
  mood?: string;
  selectedInteractions?: string[];
  disabled?: boolean;
}

export interface Settings_Backend {
  code: number;
  message: string;
  status: boolean;
  language: string;
  topic: string;
  wantedWords?: string[];
  bannedWords?: string[];
  sub_topic?: string;
  mood?: string;
  like?: number;
  comment?: number;
  interaction?: number;
  frequency?: number;
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

export interface ProfileAPIs_Backend {
  topix_api_key: string;
  linkedin_api_key: string;
  instagram_api_key: string;
}
export interface ProfileInfo {
  code: number;
  message: string;
  status: boolean;
}

export interface ProfileInfoData_Backend {
  code: number;
  message: string;
  status: boolean;
  username: string;
  email: string;
  instagram_api_key: string;
  linkedin_api_key: string;
  topix_api_key: string;
}

export { Field, Variant, specificHeaders };
