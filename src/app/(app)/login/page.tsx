import React from "react";
import Link from "next/link";
import Image from "next/image";
import { styles } from "@/styles/style";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { getCsrfToken, getProviders } from "next-auth/react";
import { LoginForm } from "@/components/auth/LoginForm";
import { BackButton } from "@/components/ui/BackButton";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session && session.user) {
    return redirect("/");
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <main className="relative flex flex-col items-center justify-center py-12 lg:py-16">
      <BackButton />
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
          <h1 className={`${styles.heading2} uppercase lg:text-4xl`}>
            Welcome back
          </h1>
          <p className="text-lg text-slate-500 dark:text-dimWhite">
            Enter your email to sign in to your account
          </p>
        </div>
        {providers && csrfToken && (
          <LoginForm providers={providers} csrfToken={csrfToken} className="" />
        )}
        <p className="px-8 text-center text-lg text-slate-500 dark:text-dimWhite">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
