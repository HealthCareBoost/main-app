import React from "react";
import Link from "next/link";
import { BackButton } from "../components/ui/BackButton";
import Image from "next/image";
import { getCsrfToken, getProviders } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import type { AppProps } from "next/app";
import { styles } from "../styles/style";
import { LoginForm } from "../components/auth/LoginForm";

export default function LoginPage({
  providers,
  csrfToken,
}: {
  providers: AppProps;
  csrfToken: string;
}) {
  return (
    <main className="min-h-screen">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Image
              width={100}
              height={100}
              className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
              src="assets/orange.svg"
              alt="letmecook-logo"
            />
            <h1 className={styles.heading2}>Welcome back</h1>
            <p className="text-lg text-slate-500 dark:text-dimWhite">
              Enter your email to sign in to your account
            </p>
          </div>
          <LoginForm csrfToken={csrfToken} className="" providers={providers} />
          <p className="px-8 text-center text-lg text-slate-500 dark:text-dimWhite">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session && session.user) {
    console.log("session");
    console.log(session);
    return { redirect: { destination: "/" } };
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, session, csrfToken },
  };
}
