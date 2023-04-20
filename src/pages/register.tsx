import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "../utils/cn";
import { buttonVariants } from "../components/ui/Button";
import { getCsrfToken, getProviders } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import type { AppProps } from "next/app";
import { styles } from "../styles/style";
import { RegisterForm } from "../components/auth/RegisterForm";
import Image from "next/image";
import useQuery from "../hooks/useQuery";
import { SignInError } from "../components/AuthError";

export default function RegisterPage({
  providers,
  csrfToken,
}: {
  providers: AppProps;
  csrfToken: string;
}) {
  const query = useQuery();
  const [error, setError] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    if (!query) return;
    console.log(query);
    setError(query.error);
  }, [query]);

  useEffect(() => {
    if (!error) return;
    // console.log(query);
    // const { error } = query;
    // console.log(error);
    SignInError(error && typeof error === "string" ? error : "Error");
  }, [error]);

  return (
    <main className="min-h-screen">
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-12 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute top-4 right-4 text-lg md:top-8 md:right-8"
          )}
        >
          Login
        </Link>
        <div className="col-span-5 hidden h-full bg-slate-100 lg:block"></div>
        <div className="col-span-7 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Image
                width={100}
                height={100}
                className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
                src="assets/orange.svg"
                alt="letmecook-logo"
              />
              <h1
                className={`${styles.heading2} lg:text-4xl`}
                // className="text-2xl font-semibold tracking-tight"
              >
                Create an account
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Enter your email below to create your account
              </p>
            </div>
            <RegisterForm
              className=""
              csrfToken={csrfToken}
              providers={providers}
            />
            <p className="px-8 text-center text-lg text-slate-500 dark:text-slate-400">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-brand underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-brand underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
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
