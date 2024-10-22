enum Field {
  Password,
  RePassword,
}
enum Variant {
  contained,
  text,
  outlined,
}
export interface UserInfo {
  email: string;
  name: string;
}

export { Field, Variant };
