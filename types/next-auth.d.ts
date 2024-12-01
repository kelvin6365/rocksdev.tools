import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { UserStatus } from "./UserStatus";
export interface CommonUserProperties {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;

  id?: string; // If id is common across all, include it here.
  username: string;
  status: UserStatus;
  error?: string;
}

declare module "next-auth" {
  type User = CommonUserProperties;
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = CommonUserProperties;
}
