enum Field {
  Password,
  RePassword,
}
enum Variant {
  contained,
  text,
  outlined,
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
  topic: string;
  language: string;
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

export interface Post {
  code: number;
  message: string;
  status: boolean;
  post: { user_id: number; title: string; body: string };
}

export interface Settings {
  code: number;
  message: string;
  status: boolean;
  language: string;
  topic: string;
}

export { Field, Variant };
