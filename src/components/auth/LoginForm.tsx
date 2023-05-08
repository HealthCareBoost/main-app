import React from "react";
import { Loader2 } from "lucide-react";
import type { AppProps } from "next/app";
import { LoginSchema } from "../../utils/validations/authSchema";
import { useZodForm } from "../../hooks/useZodFormHook";
import { signIn } from "next-auth/react";
import { cn } from "../../utils/cn";
import { Input } from "../ui/FormInput";
import { buttonVariants } from "../ui/Button";
import { GoogleIcon } from "../ui/GoogleIcon";
import { DiscordIcon } from "../ui/DiscordIcon";
import { Form } from "../ui/FormProvider";
import type { z } from "zod";
import { useToast } from "../../hooks/use-toast";

type ProviderName = "Discord" | "Google" | "Email";

type ProviderParams = {
  callbackUrl: string;
  name: string;
  signinUrl: string;
  type: string;
  id: string;
};

type FormData = z.infer<typeof LoginSchema>;

export const LoginForm: React.FC<{
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

    console.log("signInResult");
    console.log(signInResult);
    console.log("signInResult");

    if (!signInResult?.ok || signInResult.error) {
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
              "bg-orange-gradient hover:text-primaryDark"
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
        {providers &&
          Object.values(providers).map((provider: ProviderParams) => {
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
                  }).catch((error) => {
                    console.error(error);
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
