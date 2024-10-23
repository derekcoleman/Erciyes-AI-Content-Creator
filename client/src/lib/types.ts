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
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface UserInfo {
  email: string;
  name: string;
}

export { Field, Variant };
