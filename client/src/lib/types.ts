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

export { Field, Variant };
