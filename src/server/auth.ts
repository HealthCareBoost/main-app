import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import { prisma } from "./db";
// import { signIn } from "next-auth/react";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      // console.log("session user");
      // console.log(session.user);
      // console.log(user);

      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    signIn({ user, account, profile, email, credentials }) {
      try {
        console.log("sign in callback");
        console.log(user);
        console.log(account);
        console.log(profile);
        console.log(email);
        console.log(credentials);
        // if (email === undefined && user && user.email) {
        //   console.log("test");
        //   const caller = userRouter.createCaller({
        //     prisma: prisma,
        //     session: null,
        //   });
        //   const res = await caller.mapUserToName({ email: user.email });
        //   console.log(res);
        // }
        return true;
      } catch (error) {
        console.error("sign in error");
        console.error(error);
        throw error;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      // authorization:
      //   "https://discord.com/api/oauth2/authorize?client_id=1073146961395466281&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email",
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.EMAIL_USER,
      server: env.EMAIL_SERVER,
    }),
    // CredentialsProvider({
    //   id: "domain-login",
    //   name: "Domain Account",
    //   async authorize(credentials, req) {
    //     console.log(credentials);
    //     if (credentials !== undefined) {
    //       await signIn("email", {
    //         email: credentials.email,
    //         name: credentials.name,
    //       });
    //     }
    //     return { id: "" };
    //   },
    //   credentials: {
    //     name: { label: "Name", type: "text ", placeholder: "John Doe" },
    //     email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
    //   },
    // }),

    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
