import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import React from "react";
import { type AppProps } from "next/app";
import { signIn, getProviders, getCsrfToken } from "next-auth/react";

import type { GetServerSidePropsContext } from "next";
import { LoginForm } from "../components/auth/LoginForm";
import { Separator } from "../components/ui/Separator";
import { getServerAuthSession } from "../server/auth";
import { useRouter } from "next/router";
import { SignInError } from "../components/AuthError";
import { RegisterForm } from "../components/auth/RegisterForm";
import { GoogleIcon } from "../components/ui/GoogleIcon";
import { DiscordIcon } from "../components/ui/DiscordIcon";

type ProviderParams = {
  callbackUrl: string;
  name: string;
  signinUrl: string;
  type: string;
  id: string;
};

const Register = ({
  providers,
  csrfToken,
}: {
  providers: AppProps;
  csrfToken: string;
}) => {
  const { error } = useRouter().query;
  // console.log(error);

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="flex items-center justify-center">
        <TabsTrigger className="w-full" value="signin">
          Sign In
        </TabsTrigger>
        <TabsTrigger className="w-full" value="register">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        {error ? (
          <SignInError
            error={error && typeof error === "string" ? error : "Error"}
          />
        ) : null}
        <LoginForm csrfToken={csrfToken} />
        <div className="flex w-full items-center justify-center">
          <Separator className="w-1/4 px-2" />
          <span className="mx-2 my-6 text-center">Or continue with</span>
          <Separator className="w-1/4 px-2" />
        </div>
        <div className="flex flex-row items-center justify-center">
          {Object.values(providers).map((provider: ProviderParams) => {
            if (provider.name === "Email") {
              return;
            }
            return (
              <button
                key={`${provider.id}`}
                onClick={() => {
                  signIn(provider.id, {
                    redirect: false,
                  }).catch((err) => {
                    console.log(err);
                  });
                }}
                type="submit"
                className="group relative m-2 flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {provider.name === "Google" && (
                  <GoogleIcon className={"h-5 w-5"} />
                )}
                {provider.name === "Discord" && (
                  <DiscordIcon className={"h-5 w-5"} />
                )}
                Sign in with {provider.name}
              </button>
            );
          })}
        </div>
      </TabsContent>
      <TabsContent value="register">
        {/* <p className="text-sm text-slate-500 dark:text-slate-400">
          Change your password here. After saving, you&apos;ll be logged out.
        </p> */}
        <RegisterForm csrfToken={csrfToken} />
      </TabsContent>
    </Tabs>
  );
};

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

  // console.log(providers);
  // console.log(session);
  // console.log(csrfToken);

  return {
    props: { providers, session, csrfToken },
  };
}

export default Register;
