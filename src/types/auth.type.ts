export interface ILogin {
  email: string;
  password: string;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export type TRole = "ADMIN" | "MODERATOR" | "USER";
