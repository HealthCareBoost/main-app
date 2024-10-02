"use client";
import { toast } from "../hooks/use-toast";
import { useSearchParams } from "next/navigation";

export const ErrorMap = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
} as const;

type SignInError = string | string[] | undefined;

export const SignInError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  console.log(error);
  const errorMessage = error
    ? ErrorMap[error as keyof typeof ErrorMap]
    : ErrorMap.default;
  console.log(errorMessage);

  return toast({
    title: "Something went wrong.",
    description: "Your sign in request failed.\n".concat(errorMessage),
    variant: "destructive",
  });
};
