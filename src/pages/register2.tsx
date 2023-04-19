import React from "react";
import Link from "next/link";
import { cn } from "../../src/utils/cn";
import { buttonVariants } from "../components/ui/Button";
import { useZodForm } from "../utils/useZodFormHook";
import type { z } from "zod";
import Image from "next/image";
import { Form } from "../components/ui/FormProvider";
import { Input } from "../components/ui/FormInput";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "../server/auth";
import type { AppProps } from "next/app";
import { styles } from "../styles/style";
import { GoogleIcon } from "../components/ui/GoogleIcon";
import { DiscordIcon } from "../components/ui/DiscordIcon";
import { LoginSchema } from "../utils/validations/authSchema";
import { Loader2 } from "lucide-react";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useToast } from "../hooks/use-toast";

type ProviderName = "Discord" | "Google" | "Email";

type ProviderParams = {
  callbackUrl: string;
  name: string;
  signinUrl: string;
  type: string;
  id: string;
};

type FormData = z.infer<typeof LoginSchema>;

export const UserAuthForm: React.FC<{
  csrfToken: string;
  className: string;
  providers: AppProps;
}> = ({ csrfToken, providers, className, ...props }) => {
  const { toast } = useToast();

  const [isProviderLoading, setIsProviderLoading] = React.useState<
    Record<ProviderName, boolean>
  >({
    Discord: false,
    Google: false,
    Email: false,
  });

  const form = useZodForm({
    schema: LoginSchema,
    defaultValues: {
      csrfToken,
    },
  });

  async function onSubmitEmail(data: FormData) {
    setIsProviderLoading((prev: Record<ProviderName, boolean>) => ({
      ...prev,
      Email: true,
    }));

    console.log(data);
    const signInResult = await signIn("email", {
      email: data.email,
      redirect: false,
    });

    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/dashboard",
    // });

    setIsProviderLoading((prev: Record<ProviderName, boolean>) => ({
      ...prev,
      Email: false,
    }));

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form
        onSubmit={onSubmitEmail}
        // onSubmit={async (data) => {
        //   console.log(data);
        //   await signIn("email", { email: data.email });
        // }}
        form={form}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              label="csrf"
              hidden
              type="hidden"
              {...form.register("csrfToken")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="name@example.com"
              hiddenLabel={true}
              required
              {...form.register("email")}
            />
          </div>
          <button
            className={cn(
              buttonVariants(),
              "bg-orange-gradient hover:text-slate-400"
            )}
            disabled={isProviderLoading.Email}
          >
            {isProviderLoading.Email && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-dimWhite" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600 dark:bg-primaryDark dark:text-dimWhite">
            Or continue with
          </span>
        </div>
      </div>
      <>
        {Object.values(providers).map((provider: ProviderParams) => {
          console.log(provider.name);
          if (provider.name === "Email") {
            return;
          }
          return (
            <button
              key={`${provider.id}`}
              type="button"
              className={cn(buttonVariants({ variant: "outline" }), "h-full")}
              onClick={() => {
                provider.name === "Google"
                  ? setIsProviderLoading((prev) => ({
                      ...prev,
                      Google: true,
                    }))
                  : setIsProviderLoading((prev) => ({
                      ...prev,
                      Discord: true,
                    }));
                signIn(provider.id, {
                  redirect: false,
                }).catch((err) => {
                  console.log(err);
                });
              }}
              disabled={
                isProviderLoading.Email ||
                isProviderLoading.Discord ||
                isProviderLoading.Google
              }
            >
              {provider.name === "Google" && isProviderLoading.Google ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : provider.name === "Google" ? (
                <GoogleIcon className={"mr-2 h-5 w-5"} />
              ) : null}
              {provider.name === "Discord" && isProviderLoading.Discord ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : provider.name === "Discord" ? (
                <DiscordIcon className={"mr-2 h-5 w-5"} />
              ) : null}
              {provider.name}
            </button>
          );
        })}
      </>
    </div>
  );
};

export default function RegisterPage({
  providers,
  csrfToken,
}: {
  providers: AppProps;
  csrfToken: string;
}) {
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
