import React from "react";

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

export const SignInError: React.FC<{ error: string }> = ({ error }) => {
  const errorMessage =
    error && (ErrorMap[error as keyof typeof ErrorMap] ?? ErrorMap.default);
  return <div>{errorMessage}</div>;
};
