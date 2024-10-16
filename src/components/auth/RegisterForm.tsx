"use client";
import { api } from "@/utils/trpc/react";
import { Loader2 } from "lucide-react";
import { type BuiltInProviderType } from "next-auth/providers/index";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import React from "react";
import type { z } from "zod";
import { useToast } from "../../hooks/use-toast";
import { useZodForm } from "../../hooks/useZodFormHook";
import { cn } from "../../utils/cn";
import { RegisterSchema } from "../../utils/validations/authSchema";
import { buttonVariants } from "../ui/Button";
import { DiscordIcon } from "../ui/DiscordIcon";
import { Input } from "../ui/FormInput";
import { Form } from "../ui/FormProvider";
import { GoogleIcon } from "../ui/GoogleIcon";

interface RegisterFormParams {
  csrfToken: string;
  className: string;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

type ProviderName = "Discord" | "Google" | "Email";

type ProviderParams = {
  callbackUrl: string;
  name: string;
  signinUrl: string;
  type: string;
  id: string;
};

type FormData = z.infer<typeof RegisterSchema>;

export const RegisterForm = ({
  csrfToken,
  providers,
  className,
  ...props
}: RegisterFormParams) => {
  const saveName = api.user.saveName.useMutation();
  const { toast } = useToast();
  const [isProviderLoading, setIsProviderLoading] = React.useState<
    Record<ProviderName, boolean>
  >({
    Discord: false,
    Google: false,
    Email: false,
  });

  const form = useZodForm({
    schema: RegisterSchema,
    defaultValues: {
      csrfToken,
    },
  });

  async function onSubmitEmail(data: FormData) {
    setIsProviderLoading((prev: Record<ProviderName, boolean>) => ({
      ...prev,
      Email: true,
    }));
    // onSubmit={async (data) => {
    //   console.log(data);
    //   await saveName.mutateAsync({
    //     name: data.name,
    //     email: data.email,
    //   });
    //   await signIn("email", {
    //     email: data.email,
    //     // name: data.name,
    //     // redirect: false,
    //     // credentials: {
    //     // name: data.name,
    //     // email: data.email,
    //     // },
    //   });
    console.log(data);
    await saveName.mutateAsync({
      name: data.name,
      email: data.email,
    });
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
      <Form onSubmit={onSubmitEmail} form={form}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              label="csrf"
              hidden
              type="hidden"
              {...form.register("csrfToken")}
            />
            <Input
              label="Name"
              type="text"
              placeholder="John Smith"
              hiddenLabel={true}
              required
              {...form.register("name")}
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
              "bg-orange-gradient hover:text-primaryDark",
            )}
            disabled={isProviderLoading.Email}
          >
            {isProviderLoading.Email && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
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
          if (provider.name === "Email") {
            return;
          }
          return (
            <button
              key={`${provider.id}`}
              type="button"
              className={cn(buttonVariants({ variant: "outline" }), "h-full")}
              onClick={() => {
                try {
                  if (provider.name === "Google") {
                    setIsProviderLoading((prev) => ({
                      ...prev,
                      Google: true,
                    }));
                  } else {
                    setIsProviderLoading((prev) => ({
                      ...prev,
                      Discord: true,
                    }));
                  }
                  signIn(provider.id, {
                    redirect: true,
                  }).catch((error) => {
                    console.error(error);
                  });
                } catch (error) {
                  console.error(error);
                  return toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "",
                  });
                }
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
