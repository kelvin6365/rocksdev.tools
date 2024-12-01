import API from "@/services/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";
import { JWT } from "next-auth/jwt";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: {},
        // password: {},
        username: {},
        password: {},
        accessToken: {},
        refreshToken: {},
        expiresIn: {},
        status: {},
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) return null;

          const { username, password } = credentials;
          //[1] Login API
          const { data: loginResponse } = (
            await API.auth.login(username, password)
          ).data;
          //[2] Get user info
          const { data: user } = (
            await API.user.profile(loginResponse.accessToken)
          ).data;

          return {
            id: user.id,
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.refreshToken,
            username: user.username,
            expiresIn: loginResponse.expiresIn,
            status: user.status as any,
          };
        } catch (e) {
          console.error("Authorize fail, ", e);
          throw new Error("Login Fail");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const updateToken = structuredClone(token);
      if (account && account.type === "credentials") {
        return {
          ...updateToken,
          ...user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (dayjs().isBefore(dayjs(updateToken.expiresIn))) {
        console.log("[Token valid]");
        //[2] Get user info
        const { data: user } = (await API.user.profile(updateToken.accessToken))
          .data;
        return {
          ...token,
          status: user.status as any,
        };
      }
      console.log("[Token expired]");
      // Access token has expired, try to update it
      return await refreshAccessToken(token);
      // return token;
    },
    async session({ session, token }) {
      session.user = token; //(3)
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const { data: loginResponse } = (
      await API.auth.refreshToken(token.refreshToken)
    ).data;
    return {
      ...token,
      accessToken: loginResponse.accessToken,
      accessTokenExpires: loginResponse.accessTokenExpires,
      refreshToken: loginResponse.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
