import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/Button";
import { getCsrfToken, getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { styles } from "@/styles/style";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Image from "next/image";

import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerAuthSession();
  if (session && session.user) {
    return redirect("/");
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <main className="min-h-screen">
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-12 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 text-lg md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className="relative col-span-5 hidden h-full bg-slate-100 lg:block">
          <Image
            fill={true}
            src="/register-bg.jpg"
            className="object-cover"
            sizes="(max-width: 1200px) 42vh"
            alt="left-filler"
            loading="lazy"
          />
        </div>
        <div className="col-span-7 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Image
                width={100}
                height={100}
                className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
                src="assets/orange.svg"
                alt="letmecook-logo"
                priority
              />
              <h1
                className={`${styles.heading2} uppercase lg:text-4xl`}
                // className="text-2xl font-semibold tracking-tight"
              >
                Create an account
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Enter your name and email below to create your account
              </p>
            </div>

            {providers && csrfToken && (
              <RegisterForm
                className=""
                csrfToken={csrfToken}
                providers={providers}
              />
            )}

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
