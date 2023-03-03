import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import React from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { type AppProps } from "next/app";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";

type ProviderParams = {
  callbackUrl: string;
  name: string;
  signinUrl: string;
  type: string;
  id: string;
};

const Register = ({ providers }: { providers: AppProps }) => {
  const { data: sessionData } = useSession();

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
        {/* <p className="text-sm text-slate-500 dark:text-slate-400">
          Make changes to your account here. Click save when you&apos;re done.
        </p> */}
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign in
        </button>
      </TabsContent>
      <TabsContent value="register">
        {/* <p className="text-sm text-slate-500 dark:text-slate-400">
          Change your password here. After saving, you&apos;ll be logged out.
        </p> */}
        {Object.values(providers).map((provider: ProviderParams) => (
          <button
            key={`${provider.id}`}
            onClick={() => {
              // sessionData
              //   ? () => void signOut()
              //   : () =>
              //       void signIn(provider.id, {
              //         callbackUrl: `${window.location.origin}`,
              //       })
              console.log(provider);
            }}
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default Register;
